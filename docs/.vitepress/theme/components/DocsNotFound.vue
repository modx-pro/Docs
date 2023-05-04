<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { withBase, useData } from 'vitepress'
import { useLangs } from 'vitepress/dist/client/theme-default/composables/langs'

const { site } = useData()
const { localeLinks } = useLangs({ removeCurrent: false })
const root = ref<string>('/')

onMounted(() => {
  const path = window.location.pathname
    .replace(site.value.base, '')
    .replace(/(^.*?\/).*$/, '/$1')

  if (localeLinks.value.length) {
    root.value =
      localeLinks.value.find(({ link }) => link.startsWith(path))?.link ||
      localeLinks.value[0].link
  }
})
</script>

<template>
  <div class="DocsNotFound">
    <p class="code">404</p>
    <h1 class="title">Страница не найдена</h1>
    <div class="divider" />
    <blockquote class="quote">
      <p>Похоже, что вы перешли по неверной или устаревшей ссылке.</p>
      <p>Информация, которую вы искали, где-то здесь. Вы можете воспользоваться поиском.</p>
      <br>
      <p>Этот сайт автоматически генерируется из файлов, расположенных на GitHub, поэтому адреса могут иногда меняться.</p>
    </blockquote>
    <div class="action">
      <a
        class="link"
        :href="withBase(root)"
        aria-label="Вернуться на главную"
      >
        Вернуться на главную
      </a>
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
.link {
  display: inline-block;
  border: 4px solid #F7F8F9;
  border-radius: 8px;
  padding: 12px 18px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.25s, color 0.25s;
}
.link:hover {
  background-color: #F7F8F9;
  color: var(--vp-c-black);
}
.link:active {
  border-color: var(--vp-c-black);
  background-color: var(--vp-c-black);
  color: var(--vp-c-white);
}
</style>
