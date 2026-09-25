<script setup lang="ts">
import { computed } from 'vue'
import { DefaultTheme, useData } from 'vitepress'

import { VPImage } from 'vitepress/theme-without-fonts'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import DocsList from './DocsList.vue'
import DocsCompatibility from './DocsCompatibility.vue'
import { normalizeCompatibility } from '../compatibility'

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
      if (!Object.prototype.hasOwnProperty.call(component.value, key)) {
        return filtered
      }

      const value = component.value[key]
      const urls = Array.isArray(value)
        ? value.filter((link): link is string => typeof link === 'string' && !!link)
        : (typeof value === 'string' && value ? [value] : [])

      for (const link of urls) {
        const match = link.match(/^https?\:\/\/([^\/?#]+)(?:\/([^\/?#]+\/[^\/?#]+))?/i)
        if (!match) {
          continue
        }

        const host = match[1].split('.').slice(-2).join('.')
        const repoPath = match[2]

        filtered.push({
          text: repoPath || host,
          link,
        })
      }

      return filtered
    }, [] as DefaultTheme.SidebarItem[])
})

const dependencies = computed<DefaultTheme.SidebarItem[]>(() => {
  const names = page.value.component?.dependencies
  if (!names?.length) {
    return []
  }

  return names.map(name => {
    const match = theme.value.components.find(item => item.title === name)
    return {
      text: match?.title || name,
      link: match?.link || '',
    }
  })
})

const usedBy = computed<DefaultTheme.SidebarItem[]>(() => {
  const items = page.value.component?.usedBy
  if (!items?.length) return []

  return items.map(item => ({
    text: item.title,
    link: item.link,
  }))
})

const compatibility = computed(() => {
  const fromPage = normalizeCompatibility(page.value.frontmatter?.compatibility)
  if (fromPage.length) return fromPage
  return page.value.component?.compatibility ?? []
})

const show = computed<boolean>(() => {
  return component.value &&
    (
      component.value.logo ||
      component.value.description ||
    page.value?.component?.dependencies?.length ||
    page.value?.component?.usedBy?.length ||
    compatibility.value.length ||
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
      <DocsCompatibility :values="compatibility" />
      <DocsList v-if="links.length" :items="links" class="list" />
    </div>
    <div v-if="dependencies.length" class="footer">
      <span class="label">{{ lang === 'ru' ? 'Зависимости' : 'Dependencies' }}</span>
      <DocsList :items="dependencies" class="list" />
    </div>
    <div v-if="usedBy.length" class="footer">
      <span class="label">{{ lang === 'ru' ? 'Используется в' : 'Used by' }}</span>
      <DocsList :items="usedBy" class="list" />
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

.label {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: var(--vp-c-text-2);
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
