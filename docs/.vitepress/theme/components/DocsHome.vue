<script setup lang="ts">
import { useData } from 'vitepress'

import DocsHomeHero from './DocsHomeHero.vue'
import DocsFeatures from './DocsFeatures.vue'
import DocsTeam from './DocsTeam.vue'
import DocsSponsors from './DocsSponsors.vue'

const { frontmatter: fm } = useData()
</script>

<template>
  <template v-if="fm.main">
    <div class="container">
      <DocsHomeHero :data="fm.main" />
      <DocsFeatures :features="fm.main.features" />
      <DocsTeam />
    </div>
    <DocsSponsors />
  </template>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1152px;
}
</style>
