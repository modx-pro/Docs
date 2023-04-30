<script setup lang="ts">
import type { Ref } from 'vue'
import type { DocsPageData } from '../plugins/component'
import { useData } from 'vitepress'
import { normalizeLink } from 'vitepress/dist/client/theme-default/support/utils'
import { usePrevNext } from '../composables/prev-next'

interface Data {
  theme: Ref<any>
  page: Ref<DocsPageData>
}

const { theme, page }: Data = useData()

const control = usePrevNext()
</script>

<template>
  <div v-if="page.component">
    <div v-if="control.prev?.link || control.next?.link" class="prev-next">
      <div class="pager">
        <a v-if="control.prev?.link" class="pager-link prev" :href="normalizeLink(control.prev.link)">
          <span class="desc" v-html="theme.docFooter?.prev || 'Previous page'"></span>
          <span class="title" v-html="control.prev.text"></span>
        </a>
      </div>
      <div class="pager" :class="{ 'has-prev': control.prev?.link }">
        <a v-if="control.next?.link" class="pager-link next" :href="normalizeLink(control.next.link)">
          <span class="desc" v-html="theme.docFooter?.next || 'Next page'"></span>
          <span class="title" v-html="control.next.text"></span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prev-next {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
}

@media (min-width: 640px) {
  .prev-next {
    display: flex;
  }
}

.pager.has-prev {
  padding-top: 8px;
}

@media (min-width: 640px) {
  .pager {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 50%;
  }

  .pager.has-prev {
    padding-top: 0;
    padding-left: 16px;
  }
}

.pager-link {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 11px 16px 13px;
  width: 100%;
  height: 100%;
  transition: border-color 0.25s;
}

.pager-link:hover {
  border-color: var(--vp-c-brand);
}

.pager-link.next {
  margin-left: auto;
  text-align: right;
}

.desc {
  display: block;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.title {
  display: block;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand);
  transition: color 0.25s;
}
</style>
