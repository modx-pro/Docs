<script setup lang="ts">
import type { ComponentLinks, DocsPageData } from '../plugins/component'
import { computed } from 'vue'
import type { Ref } from 'vue'
import { useData } from 'vitepress'
import VPImage from 'vitepress/dist/client/theme-default/components/VPImage.vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'

const { page }: { page: Ref<DocsPageData> } = useData()

const links = computed<ComponentLinks[]>(() => {
  if (!page.value.component) {
    return
  }

  return links.value = ['modstore', 'modx', 'repository']
    .reduce((filtered, key) => {
      if (Object.prototype.hasOwnProperty.call(page.value.component, key)) {
        const link = page.value.component[key]

        filtered.push({
          label: link.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1].split('.').slice(-2).join('.'),
          link,
        })
      }

      return filtered
    }, [] as ComponentLinks[])
})
</script>

<template>
  <article
    v-if="page.component && !page.component.hidden"
    class="DocsComponentWidget"
  >
    <figure
      v-if="page.component.logo"
      class="figure"
    >
      <VPImage
        :image="page.component.logo"
        :alt="page.component.title"
        class="image"
      />
    </figure>
    <div class="body">
      <VPLink
        :href="page.component.link"
        class="title"
        v-text="page.component.title"
      />
      <div v-if="page.component.description" class="description">
        {{ page.component.description }}
      </div>
      <ul
        v-if="links.length"
        class="list"
      >
        <li
          v-for="item in links"
          :key="item.label"
        >
          <VPLink
            :href="item.link"
            :no-icon="true"
            class="link"
          >
            {{ item.label }}
          </VPLink>
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.DocsComponentWidget {
  border: 4px solid var(--vp-sidebar-bg-color);
  border-radius: var(--vp-border-radius);
  margin-top: 20px;
  overflow: hidden;
}

.figure {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image {
  width: 100%;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: var(--vp-sidebar-bg-color);
}

.title {
  letter-spacing: -0.4px;
  line-height: normal;
  font-size: 16px;
  font-weight: bold;
  white-space: pre-wrap;
}

.description {
  font-size: 13px;
  line-height: 18px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

:deep(.link) {
  transition: color 0.25s;
}

:deep(.link):hover {
  color: var(--vp-c-green);
}

.list {
  list-style: disc;
  padding-left: 15px;
}
</style>
