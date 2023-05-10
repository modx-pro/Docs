<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import mirl from 'markdown-it-replace-link'
import mila from 'markdown-it-link-attributes'
import { withBase } from 'vitepress'
import { EXTERNAL_URL_RE } from 'vitepress/dist/client/shared'

const md = new MarkdownIt()
md.use(mirl, { replaceLink: link => withBase(link) })
md.use(mila, {
  matcher: href => href && EXTERNAL_URL_RE.test(href),
  attrs: { target: '_blank', rel: 'noopener' },
})

const props = defineProps<{
  title: string
  details?: string
}>()

const mdDetails = computed(() => md.render(props.details))
</script>

<template>
  <div class="DocsFeature">
    <article class="box">
      <h2 class="title" v-html="title"></h2>
      <p v-if="mdDetails" class="details" v-html="mdDetails"></p>
    </article>
  </div>
</template>

<style scoped>
.DocsFeature {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
}

.box {
  display: flex;
  flex-direction: column;
  padding: 24px;
  height: 100%;
}

.title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
}

.details {
  flex-grow: 1;
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.details:deep(a) {
  color: var(--vp-c-brand);
}

.details:deep(a:hover) {
  text-decoration: underline;
}
</style>
