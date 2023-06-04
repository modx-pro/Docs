<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

import DocsHome from './DocsHome.vue'
import DocsComponentWidget from './DocsComponentWidget.vue'
import DocsAuthorWidget from './DocsAuthorWidget.vue'
import DocsBreadcrumbs from './DocsBreadcrumbs.vue'
// import DocsComponentTree from './DocsComponentTree.vue'
import DocsNotFound from './DocsNotFound.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-before>
      <DocsHome />
    </template>
    <template #aside-outline-after>
      <DocsComponentWidget />
      <DocsAuthorWidget />
    </template>
    <template #doc-before>
      <DocsBreadcrumbs />
    </template>
    <!-- <template #doc-footer-before>
      <DocsComponentTree />
    </template> -->
    <template #not-found>
      <DocsNotFound />
    </template>
  </Layout>
</template>
