<script setup lang="ts">
import DefaultTheme from 'vitepress/theme-without-fonts'
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'

import DocsHome from './DocsHome.vue'
import DocsComponentWidget from './DocsComponentWidget.vue'
import DocsAuthorWidget from './DocsAuthorWidget.vue'
import DocsScreenAuthorWidget from './DocsScreenAuthorWidget.vue'
import DocsBreadcrumbs from './DocsBreadcrumbs.vue'
import DocsComponentTree from './DocsComponentTree.vue'
import DocsNotFound from './DocsNotFound.vue'
import { useSyntaxSwitcher } from '../composables/syntax-switcher'

import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

const { Layout } = DefaultTheme
useSyntaxSwitcher('vitepress:default-syntax', ['modx', 'fenom'])
</script>

<template>
  <Layout>
    <template #home-hero-before>
      <DocsHome />
    </template>
    <template #nav-bar-content-after>
      <NolebaseEnhancedReadabilitiesMenu />
    </template>
    <template #nav-screen-content-after>
      <NolebaseEnhancedReadabilitiesScreenMenu />
    </template>
    <template #aside-outline-after>
      <DocsComponentWidget />
      <DocsAuthorWidget />
    </template>
    <template #doc-before>
      <DocsBreadcrumbs />
    </template>
    <template #doc-footer-before>
      <DocsScreenAuthorWidget />
      <DocsComponentTree />
    </template>
    <template #not-found>
      <DocsNotFound />
    </template>
  </Layout>
</template>
