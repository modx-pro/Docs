<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { watch } from 'vue'
import { useRouter, inBrowser, withBase } from 'vitepress'
import { normalize } from 'vitepress/dist/client/shared'

import DocsEcosystem from './DocsEcosystem.vue'
import DocsComponentWidget from './DocsComponentWidget.vue'
import DocsBreadcrumbs from './DocsBreadcrumbs.vue'
import DocsPrevNext from './DocsPrevNext.vue'
import DocsNotFound from './DocsNotFound.vue'

const { Layout } = DefaultTheme
const router = useRouter()

if (inBrowser) {
  watch(() => router.route.data.relativePath, (to, from) => {
    if (!from) {
      return
    }

    const fromLink: string = normalize(from)
    if (!fromLink.endsWith('components/')) {
      return
    }

    const toLink: string = withBase(normalize(to))
    const sidebar = document.documentElement.querySelector('.VPSidebar')
    if (!sidebar) {
      return
    }

    const activeLink = sidebar.querySelector(`a[href="${toLink}"]`)
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--vp-nav-height'))
    sidebar.scrollTo({
      top: activeLink.getBoundingClientRect().top - offset
    })
  }, { immediate: true, flush: 'post' })
}
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
