<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase, useRoute } from 'vitepress'

import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'

const { page } = useData()
const route = useRoute()
const breadcrumbs = computed(() => page.value.breadcrumbs ?? [])
</script>

<template>
  <ol v-if="breadcrumbs.length" class="DocsBreadcrumbs">
    <li v-for="(item, idx) in breadcrumbs" :key="idx" class="item" :class="{
      active: item.link && withBase(item.link) === route.path,
    }">
      <VPLink v-if="item.link && idx < breadcrumbs.length - 1" :href="item.link" :title="item.text" class="link">
        <span class="name" v-text="item.text" />
      </VPLink>
      <span v-else :title="item.text" class="name" v-text="item.text" />
    </li>
  </ol>
</template>

<style scoped>
.DocsBreadcrumbs {
  display: flex;
  white-space: nowrap;
  column-gap: 10px;

  color: var(--vp-c-text-2);
  margin-bottom: 10px;
  font-size: .9rem;
}

.item {
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

@media (max-width: 767px) {
  .item:last-child {
    display: none;
  }
}

.item+.item::before {
  content: '/';
  font-weight: normal;
  margin-right: 8px;
}

.link {
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.link:hover {
  color: var(--vp-c-brand-1);
}

.name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
