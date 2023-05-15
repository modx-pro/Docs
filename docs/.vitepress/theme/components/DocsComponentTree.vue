<script setup lang="ts">
import type { DocsPageData } from '../plugins/component'
import { computed } from 'vue'
import type { Ref } from 'vue'
import { useData } from 'vitepress'
import DocsList from '../components/DocsList.vue'

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
    <DocsList
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
