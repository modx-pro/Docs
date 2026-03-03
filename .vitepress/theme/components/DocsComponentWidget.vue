<script setup lang="ts">
import { computed } from 'vue'
import { DefaultTheme, useData } from 'vitepress'

import { VPImage } from 'vitepress/theme-without-fonts'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import DocsList from './DocsList.vue'

const { page, theme, lang } = useData()

const component = computed(() => {
  if (!page.value?.component) {
    return null
  }

  return {
    ...page.value.component,
    logo: page.value.component.logo || page.value.frontmatter.logo,
    description: page.value.component.description || page.value.frontmatter.description,
    modstore: page.value.component.modstore || page.value.frontmatter.modstore,
    modx: page.value.component.modx || page.value.frontmatter.modx,
    repository: page.value.component.repository || page.value.frontmatter.repository,
  }
})

const links = computed<DefaultTheme.SidebarItem[]>(() => {
  if (!component.value) {
    return []
  }

  return links.value = ['modstore', 'modx', 'repository']
    .reduce((filtered, key) => {
      if (Object.prototype.hasOwnProperty.call(component.value, key)) {
        const link = component.value[key]
        if (typeof link !== 'string' || !link) {
          return filtered
        }

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
  return component.value &&
    (
      component.value.logo ||
      component.value.description ||
      page.value?.component.dependencies.length ||
      links.value.length
    )
})
</script>

<template>
  <article v-if="show" class="DocsComponentWidget">
    <figure v-if="component?.logo" class="figure">
      <VPImage :image="component.logo" :alt="component.title" class="image" />
    </figure>
    <div class="body">
      <VPLink v-if="component?.title" :href="component.link" class="title">
        {{ component.title }}
      </VPLink>
      <div v-if="component?.description" class="description">
        {{ component.description }}
      </div>
      <DocsList v-if="links.length" :items="links" class="list" />
    </div>
    <div v-if="dependencies.length" class="footer">
      <span class="title">{{ lang.value === 'ru' ? 'Зависимости' : 'Dependencies' }}</span>
      <DocsList :items="dependencies" class="list" />
    </div>
  </article>
</template>

<style scoped>
.DocsComponentWidget {
  border: 4px solid var(--vp-c-bg-soft);
  border-radius: var(--vp-border-radius);
  margin-top: 20px;
  overflow: hidden;
  background-color: var(--vp-c-bg-soft);
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
  color: var(--vp-c-brand-1);
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
