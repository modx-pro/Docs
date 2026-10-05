<script setup lang="ts">
import { useData } from 'vitepress'

import DocsButton from './DocsButton.vue'

const { theme } = useData()
</script>

<template>
  <section class="DocsSupport">
    <div class="container">
      <span class="vpi-heart icon" aria-hidden="true" />
      <h2 v-if="theme.sponsor.message" class="message">{{ theme.sponsor.message }}</h2>

      <div v-if="theme.sponsor.link" class="action">
        <DocsButton theme="sponsor" :href="theme.sponsor.link" :text="theme.sponsor.linkText" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.DocsSupport {
  margin-top: 112px;
  border-top: 1px solid var(--vp-c-gutter);
  padding: 88px 24px 0;
  background-color: var(--vp-c-bg);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 640px;
  text-align: center;
}

.icon {
  font-size: 28px;
  color: var(--vp-c-text-3);
}

.message {
  margin: 0;
  padding-top: 10px;
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.action {
  padding-top: 24px;
}
</style>
