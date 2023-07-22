<script setup lang="ts">
import { type Ref, computed } from 'vue'
import { useData } from 'vitepress'
import type { DocsPageData } from '../plugins/component'

import DocsTree from './DocsTree.vue'

export interface Data {
  page: Ref<DocsPageData>
  lang: Ref<string>
}

const { page, lang }: Data = useData()
const show = computed<boolean>(() => {
  return !!page.value?.component?.items?.length
})
</script>

<template>
  <nav v-if="show" class="vp-doc">
    <hr />
    <h3>{{ lang === 'ru' ? 'Меню компонента' : 'Component menu' }}</h3>
    <DocsTree
      :items="page.component.items"
      class="DocsList"
    />
  </nav>
</template>

<style scoped>
.DocsList {
  margin-bottom: 64px;
}
</style>
