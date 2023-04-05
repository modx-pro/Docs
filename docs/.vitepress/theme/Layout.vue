<script setup>
import DefaultTheme from 'vitepress/theme'
import DocsEcosystem from './components/DocsEcosystem.vue'
import NotFound from './components/NotFound.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-content-before>
      <DocsEcosystem />
    </template>
    <template #not-found>
      <NotFound />
    </template>
  </Layout>
</template>
