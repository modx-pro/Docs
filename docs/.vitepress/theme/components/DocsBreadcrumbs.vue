<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { useBreadcrumbs } from '../composables/breadcrumbs'

const { page, site } = useData()
const data = useBreadcrumbs(page, site)
</script>

<template v-if="data.length">
  <ol
    class="DocsBreadcrumbs"
    itemscope itemtype="https://schema.org/BreadcrumbList"
  >
    <li
      v-for="(breadcrumb, idx) in data"
      :key="idx"
      itemscope itemprop="itemListElement" itemtype="https://schema.org/ListItem"
      class="item"
      :class="{ 'last': data.length > 1 && idx === data.length - 1 }"
    >
      <template v-if="breadcrumb.link && idx !== data.length - 1">
        <a
          :href="withBase(breadcrumb.link)"
          :title="breadcrumb.text"
          itemprop="item"
          class="link"
        >
          <span itemprop="name" class="name">{{ breadcrumb.text }}</span>
        </a>
      </template>
      <template v-else>
        <span itemprop="name" class="name" :title="breadcrumb.text">{{ breadcrumb.text }}</span>
        <link
          v-if="breadcrumb.link"
          :href="withBase(breadcrumb.link)"
          itemprop="item"
        >
      </template>
      <meta
        itemprop="position"
        :content="idx"
      >
    </li>
  </ol>
</template>

<style scoped>
.DocsBreadcrumbs {
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  column-gap: 10px;

  color: var(--vp-c-text-2);
  margin-bottom: 10px;
  font-size: .9rem;
}

.DocsBreadcrumbs > li + li::before {
  content: '/';
  display: inline-block;
  margin-right: 8px;
}

.item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 0 1000 auto;
  display: inline-block;
}

.name {
  flex: 0 1 auto;
}

.link {
  transition: color 0.25s;
}
.link:hover {
  color: var(--vp-c-green);
}

.last {
  font-weight: bold;
  color: var(--vp-c-text-1);
}
</style>
