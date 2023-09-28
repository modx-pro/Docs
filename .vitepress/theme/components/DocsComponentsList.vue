<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ComponentData } from '../plugins/component'
import { useData } from 'vitepress'
import { ellipsis } from '../utils'

import { VPImage } from 'vitepress/theme-without-fonts'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import DocsSearchBar from './DocsSearchBar.vue'

const { site, frontmatter, localeIndex } = useData()
const props = defineProps<{
  title?: string
  dependency?: string
  category?: string
  excludeCategory?: string
  search?: boolean
}>()

const query = ref<string>('')

const components = computed<ComponentData[]>(() => {
  let filtered: ComponentData[] = site.value.themeConfig.components

  if (props.dependency) {
    filtered = filtered.filter(component => component.dependencies?.includes(props.dependency))
  }

  if (props.category) {
    filtered = filtered.filter(component => component.categories?.includes(props.category))
  }

  if (props.excludeCategory) {
    filtered = filtered.filter(component => !component.categories?.includes(props.excludeCategory))
  }

  if (query.value) {
    filtered = filtered.filter(component => component.title.toLowerCase().includes(query.value.replace(/\s/, '').toLowerCase()))
  }

  return filtered
})

const placeholder = computed(() => localeIndex.value === 'en' ? 'Search by name' : 'Поиск по названию')
const emptyTitle = computed(() => localeIndex.value === 'en'
    ? `No results were found for the query <b>"${query.value}"</b>`
    : `По запросу <b>«${query.value}»</b> ничего не найдено`)
const emptyText = computed(() => localeIndex.value === 'en'
    ? 'Check if the query is written without errors'
    : 'Проверьте написан ли запрос без ошибок')
</script>

<template>
  <div
    class="DocsComponentsList"
    :class="{ 'is-home': frontmatter.layout === 'home' }"
  >
    <div class="container">
      <h1
        v-if="props.title"
        class="title"
      >
        {{ props.title }}
      </h1>
      <div
        v-if="search"
        class="filter"
      >
        <DocsSearchBar
          v-model.trim="query"
          :placeholder="placeholder"
          :backButton="!search"
        />
      </div>
      <div
        v-if="components.length"
        class="list"
        :class="{ slim: search }"
      >
        <VPLink
          v-for="component, index in components"
          :key="index"
          :href="component.link"
          class="component"
        >
          <VPImage
            :image="component.logo || '/placeholder-logo.png'"
            class="logo"
            loading="lazy"
          />
          <div class="body">
            <span class="name">{{ component.title }}</span>
            <p
              v-if="component.description"
              class="description"
            >
              {{ ellipsis(component.description, 80) }}
            </p>
          </div>
        </VPLink>
      </div>
      <div
        v-else-if="
          search
          && query.length
          && !components.length
        "
        class="empty"
      >
        <div
          class="empty-title"
          v-html="emptyTitle"
        />
        <div
          class="empty-text"
          v-html="emptyText"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.list {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(272px, auto));
  gap: 24px;
}

.component {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
  column-gap: 12px;
  padding: 18px;
  border: 1px solid var(--vp-c-gray-soft);
  border-radius: 8px;
  transition: border-color 0.25s;
  color: inherit;
  font-weight: bold;
  box-shadow: var(--vp-shadow-1);
  text-decoration: none;
  background-color: var(--vp-c-bg-elv);
}

.component:hover {
  border-color: var(--vp-c-brand-1);
  text-decoration: none;
}

.component:hover .name {
  color: var(--vp-c-brand-1);
}

.name {
  transition: color 0.25s;
}

.description {
  font-size: 13px;
  line-height: normal;
  margin: 0;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

:deep(.logo) {
  width: 100%;
}

.title {
  max-width: 392px;
  letter-spacing: -0.4px;
  line-height: normal;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  white-space: pre-wrap;
  margin: 2rem auto;
}

@media (min-width: 640px) {
  .title {
    max-width: 576px;
    line-height: 56px;
    font-size: 48px;
  }
}

@media (min-width: 960px) {
  .title {
    line-height: 64px;
    font-size: 56px;
  }

  .list {
    grid-template-columns: repeat(auto-fit, minmax(350px, auto));
  }

  .list.slim {
    grid-template-columns: repeat(3, 1fr);
  }

  .component {
    grid-template-columns: 100px 1fr;
  }
}

.is-home.DocsComponentsList {
  padding: 0 24px;
}

.is-home .container {
  margin: 0 auto;
  width: 100%;
  max-width: calc(var(--vp-layout-max-width) - 64px);
}

.empty {
  padding-block: 40px;
  text-align: center;
  line-height: normal;
}

.empty-title {
  display: block;
  font-size: 1.5rem;
}

.empty-text {
  display: block;
  margin-top: 1rem;
}
</style>
