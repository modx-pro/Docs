<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

import DocsTree from './DocsTree.vue'

const { page, lang } = useData()
const items = computed(() => page.value?.component?.items ?? [])
const show = computed<boolean>(() => items.value.length > 0)
</script>

<template>
  <nav v-if="show" class="vp-doc">
    <hr />
    <h3>{{ lang === 'ru' ? 'Меню компонента' : 'Component menu' }}</h3>
    <DocsTree :items="items" class="DocsList" />
  </nav>
</template>

<style scoped>
.DocsList {
  margin-bottom: 64px;
}
</style>
