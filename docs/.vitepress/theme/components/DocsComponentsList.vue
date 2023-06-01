<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { ComponentData } from '../plugins/component'
import { useData } from 'vitepress'
import { ellipsis } from '../utils'
import VPImage from 'vitepress/dist/client/theme-default/components/VPImage.vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import DocsSearchBar from './DocsSearchBar.vue'

const { site, frontmatter, localeIndex } = useData()
const props = defineProps<{
  title?: string
  dependency?: string
  category?: string
  excludeCategory?: string
  withFilter?: boolean
}>()

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

  if (search.value) {
    filtered = filtered.filter(component => component.title.toLowerCase().includes(search.value))
  }

  return filtered
})

const search = ref<string>('')
const placeholder = computed(() => localeIndex.value === 'en' ? 'Search by name' : 'Поиск по названию')
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
        v-if="withFilter"
        class="filter"
      >
        <DocsSearchBar
          v-model="search"
          :placeholder="placeholder"
          :backButton="!withFilter"
        />
      </div>
      <div
        class="list"
        :class="{ slim: withFilter }"
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
  border: var(--vp-border-width) solid var(--vp-c-divider);
  border-radius: 8px;
  transition: border-color 0.25s;
  color: inherit;
  font-weight: bold;
}

.component:hover {
  border-color: var(--vp-c-green);
  text-decoration: none;
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
</style>
