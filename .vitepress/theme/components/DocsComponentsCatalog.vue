<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ComponentData } from '../plugins/component'
import { useData } from 'vitepress'
import { categoryKeys, categoryLabel } from '../categories'

import DocsSearchBar from './DocsSearchBar.vue'
import DocsComponentCard from './DocsComponentCard.vue'

const NEW_SIZE = 6

const { site, localeIndex } = useData()
const props = defineProps<{
  title?: string
}>()

const t = computed(() => localeIndex.value === 'en'
  ? {
      placeholder: 'Search by name or description',
      popular: 'Popular',
      fresh: 'New',
      emptyBefore: 'No results were found for the query "',
      emptyAfter: '"',
      emptyText: 'Check if the query is written without errors',
    }
  : {
      placeholder: 'Поиск по названию или описанию',
      popular: 'Популярные',
      fresh: 'Новые',
      emptyBefore: 'По запросу «',
      emptyAfter: '» ничего не найдено',
      emptyText: 'Проверьте, написан ли запрос без ошибок',
    })

const all = computed<ComponentData[]>(() => site.value.themeConfig.components ?? [])

const popular = computed(() => all.value.filter(component => component.popular))

const fresh = computed(() => all.value
  .filter(component => component.addedAt)
  .sort((a, b) => b.addedAt!.localeCompare(a.addedAt!) || a.title.localeCompare(b.title))
  .slice(0, NEW_SIZE))

const groups = computed(() => {
  const map = new Map<string, ComponentData[]>(categoryKeys.map(key => [key, []]))
  for (const component of all.value) {
    const key = component.categories?.find(item => map.has(item)) ?? 'other'
    map.get(key)!.push(component)
  }
  return categoryKeys
    .map(key => ({ key, label: categoryLabel(key, localeIndex.value), items: map.get(key)! }))
    .filter(group => group.items.length)
})

const query = ref('')

// Совпадения по названию (без учёта пробелов) выше совпадений по описанию
const results = computed(() => {
  const needle = query.value.toLowerCase().replace(/\s+/g, ' ').trim()
  if (!needle) return []

  const compact = needle.replace(/\s/g, '')
  const byTitle: ComponentData[] = []
  const byDescription: ComponentData[] = []
  for (const component of all.value) {
    if (component.title.toLowerCase().replace(/\s/g, '').includes(compact)) {
      byTitle.push(component)
    } else if (component.description?.toLowerCase().includes(needle)) {
      byDescription.push(component)
    }
  }
  return [...byTitle, ...byDescription]
})
</script>

<template>
  <div class="DocsComponentsCatalog">
    <h1 v-if="props.title" class="title">
      {{ props.title }}
    </h1>
    <div class="filter">
      <DocsSearchBar v-model="query" :placeholder="t.placeholder" :back-button="false" />
    </div>

    <template v-if="query.trim()">
      <div v-if="results.length" class="list">
        <DocsComponentCard v-for="component in results" :key="component.link" :component="component" />
      </div>
      <div v-else class="empty">
        <div class="empty-title">
          {{ t.emptyBefore }}<b>{{ query.trim() }}</b>{{ t.emptyAfter }}
        </div>
        <div class="empty-text">
          {{ t.emptyText }}
        </div>
      </div>
    </template>

    <template v-else>
      <section v-if="popular.length" class="section">
        <h2 class="section-title">
          {{ t.popular }}
        </h2>
        <div class="list">
          <DocsComponentCard v-for="component in popular" :key="component.link" :component="component" />
        </div>
      </section>

      <section v-if="fresh.length" class="section">
        <h2 class="section-title">
          {{ t.fresh }}
        </h2>
        <div class="list">
          <DocsComponentCard v-for="component in fresh" :key="component.link" :component="component" />
        </div>
      </section>

      <section v-for="group in groups" :id="group.key" :key="group.key" class="section">
        <h2 class="section-title">
          {{ group.label }}
          <span class="count">{{ group.items.length }}</span>
        </h2>
        <div class="list">
          <DocsComponentCard v-for="component in group.items" :key="component.link" :component="component" />
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.DocsComponentsCatalog {
  margin: 0 auto 96px;
  padding-inline: 24px;
  width: 100%;
  max-width: calc(var(--vp-layout-max-width) - 64px);
}

@media (min-width: 768px) {
  .DocsComponentsCatalog {
    margin-bottom: 128px;
  }
}

.title {
  margin: 32px 0 24px;
  font-size: 28px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.02em;
}

@media (min-width: 768px) {
  .title {
    margin-top: 48px;
    font-size: 36px;
    line-height: 44px;
  }
}

.section {
  margin-top: 48px;
  scroll-margin-top: calc(var(--vp-nav-height) + 24px);
}

.section-title {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 0 0 20px;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.02em;
}

.count {
  font-size: 16px;
  font-weight: 500;
  color: var(--vp-c-text-3);
}

.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  gap: 24px;
}

.filter + .list,
.filter + .empty {
  margin-top: 24px;
}

@media (min-width: 960px) {
  .list {
    grid-template-columns: repeat(3, 1fr);
  }
}

.empty {
  padding-block: 40px;
  text-align: center;
  line-height: normal;
}

.empty-title {
  font-size: 1.5rem;
}

.empty-text {
  margin-top: 1rem;
}
</style>
