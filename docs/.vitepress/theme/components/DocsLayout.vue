<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

import DocsEcosystem from './DocsEcosystem.vue'
import DocsComponentWidget from './DocsComponentWidget.vue'
import DocsBreadcrumbs from './DocsBreadcrumbs.vue'
import DocsPrevNext from './DocsPrevNext.vue'
import DocsNotFound from './DocsNotFound.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-content-before>
      <DocsEcosystem />
    </template>
    <template #aside-outline-after>
      <DocsComponentWidget />
    </template>
    <template #doc-before>
      <DocsBreadcrumbs />
    </template>
    <template #doc-after>
      <DocsPrevNext />
    </template>
    <template #not-found>
      <DocsNotFound />
    </template>
  </Layout>
</template>
