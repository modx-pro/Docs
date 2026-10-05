<script setup lang="ts">
import type { ComponentData } from '../plugins/component'
import { ellipsis } from '../utils'

import { VPImage } from 'vitepress/theme-without-fonts'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import DocsCompatibility from './DocsCompatibility.vue'

defineProps<{
  component: ComponentData
}>()
</script>

<template>
  <VPLink :href="component.link" class="DocsComponentCard">
    <VPImage :image="component.logo || '/placeholder-logo.png'" class="logo" loading="lazy" />
    <div class="body">
      <span class="name">{{ component.title }}</span>
      <p v-if="component.description" class="description">
        {{ ellipsis(component.description, 80) }}
      </p>
      <DocsCompatibility class="badges" :values="component.compatibility" />
    </div>
  </VPLink>
</template>

<style scoped>
.DocsComponentCard {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
  column-gap: 12px;
  padding: 18px;
  border: 1px solid var(--vp-c-gray-soft);
  border-radius: 8px;
  transition: border-color 0.25s;
  color: inherit;
  font-weight: bold;
  box-shadow: var(--vp-shadow-1);
  text-decoration: none;
  background-color: var(--vp-c-bg-elv);
}

.DocsComponentCard:hover {
  border-color: var(--vp-c-brand-1);
  text-decoration: none;
}

.DocsComponentCard:hover .name {
  color: var(--vp-c-brand-1);
}

.name {
  transition: color 0.25s;
}

.description {
  font-size: 13px;
  line-height: normal;
  margin: 0;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.badges {
  margin-top: 8px;
}

:deep(.logo) {
  width: 100%;
}

@media (min-width: 960px) {
  .DocsComponentCard {
    grid-template-columns: 100px 1fr;
  }
}
</style>
