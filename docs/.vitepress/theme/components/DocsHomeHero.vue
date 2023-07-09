<script setup lang="ts">
import DocsButton from './DocsButton.vue'

export interface HeroAction {
  theme?: 'brand' | 'alt'
  text: string
  link: string
}

export interface Data {
  title: string
  tagline: string
  actions: HeroAction[]
}

defineProps<{
  data: Data
}>()
</script>

<template>
  <div v-if="data" class="hero">
    <h1 class="title">{{ data.title }}</h1>
    <p class="tagline">{{ data.tagline }}</p>

    <div v-if="data.actions" class="actions">
      <div v-for="action in data.actions" :key="action.link" class="action">
        <DocsButton
          tag="a"
          :theme="action.theme"
          :text="action.text"
          :href="action.link"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  padding: 20px;
  text-align: center;
}

.title {
  letter-spacing: -0.4px;
  font-size: 24px;
  line-height: 110%;
  font-weight: 700;
  white-space: pre-wrap;
}

.tagline {
  padding-top: 8px;
  font-size: 14px;
  line-height: 150%;
  font-weight: 500;
  white-space: pre-wrap;
  color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
  .hero {
    padding: 40px 20px;
  }

  .title {
    font-size: 32px;
  }

  .tagline {
    padding-top: 12px;
    font-size: 18px;
  }
}

@media (min-width: 960px) {
  .hero {
    padding: 60px 20px;
  }

  .title {
    font-size: 48px;
  }

  .tagline {
    font-size: 20px;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: -6px;
  padding-top: 24px;
}

@media (min-width: 640px) {
  .actions {
    padding-top: 32px;
  }
}

.action {
  flex-shrink: 0;
  padding: 6px;
}
</style>
