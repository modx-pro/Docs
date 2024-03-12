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
  <article v-if="author" class="DocsScreenAuthorWidget">
    <VPLink :href="author.github" :no-icon="true" class="body">
      <VPImage v-if="author.avatar" class="avatar" :image="author.avatar" />
      <div class="info">
        <span class="label">{{ authorLabel }}:</span>
        <span class="name">{{ author.name }}</span>
      </div>
    </VPLink>
  </article>
</template>


<style scoped>
.DocsScreenAuthorWidget {
  margin-bottom: 20px;
}

@media (min-width: 1280px) {
  .DocsScreenAuthorWidget {
    display: none;
  }
}

.body {
  display: flex;
  align-items: center;
}

.info {
  display: flex;
  font-size: 13px;
  gap: 5px;
}

:deep(.avatar) {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 5px;
}

:deep(.name) {
  font-weight: bold;
  line-height: normal;
}

:deep(.label) {
  line-height: normal;
}

:deep(.link) {
  transition: color 0.25s;
}

:deep(.link):hover {
  color: var(--vp-c-brand-1);
}
</style>
