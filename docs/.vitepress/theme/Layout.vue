<script setup>
import DefaultTheme from 'vitepress/theme'
import DocsEcosystem from './components/DocsEcosystem.vue'

const { Layout } = DefaultTheme
</script>

<template>
    <Layout>
        <template #nav-bar-content-before>
            <DocsEcosystem />
        </template>
    </Layout>
</template>
