<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

import DocsEcosystem from './DocsEcosystem.vue'
import DocsComponentWidget from './DocsComponentWidget.vue'
import DocsBreadcrumbs from './DocsBreadcrumbs.vue'
import DocsNotFound from './DocsNotFound.vue'
import { useSyntaxSwitcher } from '../composables/syntax-switcher'

const { Layout } = DefaultTheme
useSyntaxSwitcher('vitepress:default-syntax', ['modx', 'fenom'])
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
    <template #not-found>
      <DocsNotFound />
    </template>
  </Layout>
</template>
