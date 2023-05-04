<script setup lang="ts">
import type { ComponentLinks, DocsPageData } from '../plugins/component'
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { withBase, useData } from 'vitepress'
import VPImage from 'vitepress/dist/client/theme-default/components/VPImage.vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'

const pageData: Ref<DocsPageData> = useData().page
const links = ref<ComponentLinks[]>([])

onMounted(() => {
  links.value = [
    { key: 'modstore', label: 'modstore.pro' },
    { key: 'modx', label: 'modx.com' },
    { key: 'repository', label: 'github.com' },
  ]
  .reduce((filtered, { key, label }) => {
    if (pageData.value.component && Object.prototype.hasOwnProperty.call(pageData.value.component, key)) {
      filtered.push({
        label,
        link: pageData.value.component[key],
      })
    }

    return filtered
  }, [] as ComponentLinks[])
})
</script>

<template>
  <div
    v-if="pageData.component && pageData.component.author"
    class="DocsComponentWidget"
  >
    <VPLink
      v-if="pageData.component.title"
      :href="pageData.component.link"
      class="title"
    >
      {{ pageData.component.title }}
    </VPLink>
    <div
      v-if="links.length"
      class="body"
    >
      <ul class="list">
        <li
          v-for="item in links"
          :key="item.label"
        >
          <VPLink
            :href="withBase(item.link)"
            :no-icon="true"
            class="link"
          >
            {{ item.label }}
          </VPLink>
        </li>
      </ul>
    </div>
    <template v-if="pageData.component.author">
      <VPLink
        :href="pageData.component.author.github"
        :no-icon="true"
        class="footer"
      >
        <VPImage
          v-if="pageData.component.author.avatar"
          class="avatar"
          :image="pageData.component.author.avatar"
        />
        <div class="info">
          <div class="name">{{ pageData.component.author.name }}</div>
          <div class="label">Автор</div>
        </div>
      </VPLink>
    </template>
  </div>
</template>

<style scoped>
.DocsComponentWidget {
  background-color: var(--vp-sidebar-bg-color);
  border-radius: var(--vp-border-radius);
  margin-top: 20px;
  padding: 24px;

  display: flex;
  flex-direction: column;
  row-gap: 16px;
}


.title {
  letter-spacing: 0.4px;
  font-size: 13px;
  font-weight: 600;
}

.footer {
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
  font-size: 14px;
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
  color: var(--vp-c-green);
}

.list {
  list-style: disc;
  padding-left: 1.25rem;
}
</style>
