<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { type Author, authors } from '../../../docs/authors'

import { VPImage } from 'vitepress/theme-without-fonts'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'

const { page, frontmatter, lang } = useData()

const authorLabel = computed<string>(() => lang.value === 'ru' ? 'Автор' : 'Author')
const author = computed<Author>(() => {
  const data = page.value?.component?.author || authors[frontmatter.value.author]

  if (!data) {
    return
  }

  return {
    ...data,
    name: typeof data.name === 'string' ? data.name : data.name[lang.value]
  }
})
</script>

<template>
  <article v-if="author" class="DocsAuthorWidget">
    <VPLink :href="author.github" :no-icon="true" class="body">
      <VPImage v-if="author.avatar" class="avatar" :image="author.avatar" />
      <div class="info">
        <div class="name">{{ author.name }}</div>
        <div class="label">{{ authorLabel }}</div>
      </div>
    </VPLink>
  </article>
</template>


<style scoped>
.DocsAuthorWidget {
  background-color: var(--vp-c-bg-soft);
  border-radius: var(--vp-border-radius);
  margin-top: 20px;
  padding: 20px;
}

.body {
  display: flex;
  align-items: center;
}

:deep(.avatar) {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 12px;
}

:deep(.name) {
  font-size: 13px;
  font-weight: bold;
  line-height: normal;
}

:deep(.label) {
  font-size: 14px;
  line-height: normal;
}

:deep(.link) {
  transition: color 0.25s;
}

:deep(.link):hover {
  color: var(--vp-c-brand-1);
}
</style>
