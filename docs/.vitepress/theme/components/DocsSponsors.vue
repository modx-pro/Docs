<script setup lang="ts">
import { useData } from 'vitepress'
import { useSponsor } from '../composables/sponsor'
import DocsButton from './DocsButton.vue'
import VPIconHeart from 'vitepress/dist/client/theme-default/components/icons/VPIconHeart.vue'
import VPSponsors from 'vitepress/dist/client/theme-default/components/VPSponsors.vue'

const { theme, lang } = useData()
const sponsors = useSponsor(lang)
</script>

<template>
  <section class="VPHomeSponsors">
    <div class="container">
      <div class="header">
        <div class="love"><VPIconHeart class="icon" /></div>
        <h2 v-if="theme.sponsor.message" class="message">{{ theme.sponsor.message }}</h2>
      </div>

      <div class="sponsors">
        <VPSponsors :data="sponsors" />
      </div>

      <div
        v-if="theme.sponsor.link"
        class="action"
      >
        <DocsButton
          theme="sponsor"
          :href="theme.sponsor.link"
          :text="theme.sponsor.linkText"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.VPHomeSponsors {
  border-top: 1px solid var(--vp-c-gutter);
  padding: 88px 24px 96px;
  background-color: var(--vp-c-bg);
}

.container {
  margin: 0 auto;
  max-width: 1152px;
}

.love {
  margin: 0 auto;
  width: 28px;
  height: 28px;
  color: var(--vp-c-text-3);
}

.icon {
  width: 28px;
  height: 28px;
  fill: currentColor;
}

.message {
  margin: 0 auto;
  padding-top: 10px;
  text-align: center;
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.sponsors {
  padding-top: 32px;
}

.action {
  padding-top: 40px;
  text-align: center;
}
</style>
