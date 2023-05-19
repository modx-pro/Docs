<script setup lang="ts">
import { Ref, ref, computed } from 'vue'
import { useData, withBase, useRoute } from 'vitepress'
import { useMediaQuery } from '@vueuse/core'
import type { DocsPageData } from '../plugins/component'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'

const isSmallScreen = useMediaQuery('(max-width: 1024px)')
const { page }: { page: Ref<DocsPageData> } = useData()
const route = useRoute()

const breadcrumbs = computed(() => {
  if (!page.value.breadcrumbs.length) {
    return []
  }

  if (isSmallScreen.value) {
    const tmp = [...page.value.breadcrumbs]
    tmp.shift()
    tmp.pop()
    return tmp
  }

  return page.value.breadcrumbs
})
</script>

<template>
  <ol
    v-if="breadcrumbs.length"
    class="DocsBreadcrumbs"
    itemscope itemtype="https://schema.org/BreadcrumbList"
  >
    <li
      v-for="(item, idx) in breadcrumbs"
      :key="idx"
      itemscope itemprop="itemListElement" itemtype="https://schema.org/ListItem"
      class="item"
      :class="{
        active: item.link && withBase(item.link) === route.path,
        'has-children': !isSmallScreen && item.items && item.items.some(item => item.link && withBase(item.link) !== route.path),
      }"
    >
      <template v-if="item.link && withBase(item.link) !== route.path">
        <VPLink :href="item.link" :title="item.text" itemprop="item" class="link">
          <span itemprop="name" class="name" v-text="item.text" />
        </VPLink>
      </template>
      <template v-else>
        <span itemprop="name" class="name" :title="item.text" v-text="item.text" />
        <link v-if="item.link" :href="withBase(item.link)" itemprop="item">
      </template>
      <ul
        v-if="
          !isSmallScreen
          && item.items
          && item.items.some(item => item.link && withBase(item.link) !== route.path)
        "
        class="dropdown"
      >
        <li v-for="i in item.items" class="dropdown-item">
          <template v-if="i.link">
            <VPLink
              v-if="route.path !== withBase(i.link)"
              :href="i.link"
              :title="i.text"
              itemprop="item"
              class="link"
              v-text="i.text"
            />
            <span
              v-else
              class="active"
              v-text="i.text"
            />
          </template>
        </li>
      </ul>
      <meta itemprop="position" :content="idx.toString()">
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
}

@media (max-width: 1024px) {
  .DocsBreadcrumbs {
    overflow-x: hidden;
  }

  .item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 0 1000 auto;
  }
}

.item + .item::before {
  content: '/';
  font-weight: normal;
  margin-right: 8px;
}

.item.has-children::after {
  content: '';
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid var(--vp-c-text-3);
}

.item:hover .dropdown {
  display: block;
}

.item:hover .name {
  position: relative;
  z-index: 10;
}

.item:not(:last-child):hover .name {
  overflow: visible;
}

.dropdown {
  z-index: 5;
  display: none;
  position: absolute;
  top: -12px;
  left: -8px;
  right: -8px;
  min-width: fit-content;
  padding: 40px 20px 20px;
  background-color: var(--vp-c-bg-elv);
  border-radius: var(--vp-border-radius);
  box-shadow: 0px 4px 15px rgba(47, 63, 147, 0.08);
}

.link {
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.link:hover {
  color: var(--vp-c-green);
}


.dropdown-item,
.name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
