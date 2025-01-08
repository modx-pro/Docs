<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

import DocsButton from './DocsButton.vue'

const { site, theme } = useData()

const root = computed(() => {
  return site.value.localeIndex !== 'root' ? (site.value.base + site.value.localeIndex + '/') : site.value.base
})
</script>

<template>
  <div class="DocsNotFound">
    <p class="code">{{ theme.notFound?.code ?? '404' }}</p>
    <h1 class="title">{{ theme.notFound?.title ?? 'Страница не найдена' }}</h1>
    <div class="divider" />
    <blockquote class="quote">
      <div v-if="theme.notFound?.quote" v-html="theme.notFound?.quote" />
      <template v-else>
        <p>Похоже, что вы перешли по неверной или устаревшей ссылке.</p>
        <p>Информация, которую вы искали, где-то здесь. Вы можете воспользоваться поиском.</p>
        <br>
        <p>Этот сайт автоматически генерируется из файлов, расположенных на GitHub, поэтому адреса могут иногда меняться.</p>
      </template>
    </blockquote>
    <div class="action">
      <DocsButton
        class="link"
        :href="root"
        theme="alt"
        :text="theme.notFound?.linkText ?? 'Вернуться на главную'"
      />
    </div>
  </div>
</template>

<style scoped>
.DocsNotFound {
  padding: 64px 24px 96px;
  text-align: center;
}
@media (min-width: 768px) {
  .DocsNotFound {
    padding: 96px 32px 168px;
  }
}
.code {
  line-height: 64px;
  font-size: 64px;
  font-weight: 600;
}
.title {
  padding-top: 12px;
  letter-spacing: 2px;
  line-height: 20px;
  font-size: 20px;
  font-weight: 700;
}
.divider {
  margin: 24px auto 18px;
  width: 64px;
  height: 1px;
  background-color: var(--vp-c-divider);
}
.quote {
  margin: 0 auto;
  max-width: 512px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
.action {
  padding-top: 20px;
}
</style>
