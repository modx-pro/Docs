<script setup lang="ts">
import type { DocsTheme } from '../types'
import type { DocsPageData } from '../plugins/component'
import { computed } from 'vue'
import type { Ref } from 'vue'
import { DefaultTheme, useData } from 'vitepress'
import DocsList from './DocsList.vue'
import VPImage from 'vitepress/dist/client/theme-default/components/VPImage.vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'

export interface Data {
  page: Ref<DocsPageData>
  theme: Ref<DocsTheme.Config>
  lang: Ref<string>
}

const { page, theme, lang }: Data = useData()

const links = computed<DefaultTheme.SidebarItem[]>(() => {
  if (!page.value.component) {
    return []
  }

  return links.value = ['modstore', 'modx', 'repository']
    .reduce((filtered, key) => {
      if (Object.prototype.hasOwnProperty.call(page.value.component, key)) {
        const link = page.value.component[key]

        filtered.push({
          text: link.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1].split('.').slice(-2).join('.'),
          link,
        })
      }

      return filtered
    }, [] as DefaultTheme.SidebarItem[])
})

const dependencies = computed<DefaultTheme.SidebarItem[]>(() => {
  if (!page.value.component.dependencies.length) {
    return []
  }

  return page.value.component.dependencies.map(name => {
    const component = theme.value.components.find(component => component.title === name)
    return {
      text: component?.title || name,
      link: component?.link || '',
    }
  })
})

const show = computed<boolean>(() => {
  return page.value?.component &&
      (
        page.value?.component.logo ||
        page.value?.component.description ||
        page.value?.component.dependencies.length ||
        links.value.length
      )
})
</script>

<template>
  <article
    v-if="show"
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
        v-if="page.component.title"
        :href="page.component.link"
        class="title"
      >
        {{ page.component.title }}
      </VPLink>
      <div v-if="page.component.description" class="description">
        {{ page.component.description }}
      </div>
      <DocsList
        v-if="links.length"
        :items="links"
        class="list"
      />
    </div>
    <div
      v-if="dependencies.length"
      class="footer"
    >
      <span class="title">{{ lang === 'ru' ? 'Зависимости' : 'Dependencies' }}</span>
      <DocsList :items="dependencies" class="list" />
    </div>
  </article>
</template>

<style scoped>
.DocsComponentWidget {
  border: 4px solid var(--vp-sidebar-bg-color);
  border-radius: var(--vp-border-radius);
  margin-top: 20px;
  overflow: hidden;
  background-color: var(--vp-sidebar-bg-color);
}

.figure {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image {
  width: 100%;
}

.footer,
.body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
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

.footer {
  border-top: 1px solid var(--vp-c-divider);
}

:deep(.list .item:not(.has-link)) {
  color: var(--vp-c-text-3);
}
</style>
