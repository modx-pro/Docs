<script setup>
import { ref } from 'vue'
import { useData } from 'vitepress'
import VPImage from 'vitepress/dist/client/theme-default/components/VPImage.vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import { normalizeLink } from 'vitepress/dist/client/theme-default/support/utils'
import { onClickOutside } from '@vueuse/core'

const button = ref(null)
const active = ref(false)

onClickOutside(button, () => { active.value = false })

const { theme } = useData()
</script>

<template>
  <nav
    v-if="theme.ecosystem"
    class="DocsEcosystem"
    :class="{ active }"
  >
    <span
      ref="button"
      class="title"
      @click="active = !active"
    >
      <div class="burger">
        <span class="top"></span>
        <span class="middle"></span>
        <span class="bottom"></span>
      </div>
      {{ theme.ecosystemLabel }}
    </span>
    <div class="dropdown">
      <ul class="menu">
        <li
          v-for="product, idx in theme.ecosystem"
          :key="idx"
        >
          <VPLink
            :href="normalizeLink(product.link)"
            class="link"
          >
            <VPImage
              v-if="product.logo"
              class="logo"
              :image="product.logo"
            />
            {{ product.text }}
          </VPLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
  .DocsEcosystem {
    position: relative;
    height: 100%;
    min-width: 215px;
  }

  .title {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 20px;
    height: 100%;

    font-weight: 500;
    text-transform: uppercase;
    white-space: nowrap;

    cursor: pointer;
    user-select: none;
  }

  .dropdown {
    display: none;
    position: absolute;
    top: 0;
    padding: calc(var(--vp-nav-height) - var(--vp-border-width)) 16px 20px;
    width: 100%;
    box-shadow: var(--vp-shadow-6);
    border: var(--vp-border);
    border-radius: var(--vp-border-radius);
    background-color: var(--vp-c-bg-elv);
  }

  .active .dropdown {
    display: block;
  }

  .menu {
    padding-top: 16px;

    display: flex;
    flex-direction: column;
    gap: 16px;

    border-top: 4px solid var(--vp-c-divider)
  }

  .link {
    display: flex;
    align-items: center;

    gap: 10px;
  }

  :deep(.logo) {
    width: 32px;
  }

  .burger {
    position: relative;
    width: 15px;
    height: 12px;

    display: flex;
    flex-direction: column;
    gap: 3px;
    overflow: hidden;
  }

  .DocsEcosystem.active .top    { top: 5px; transform: translateX(0) rotate(225deg); }
  .DocsEcosystem.active .middle { top: 5px; transform: translateX(16px); }
  .DocsEcosystem.active .bottom { top: 5px; transform: translateX(0) rotate(135deg); }

  .top,
  .middle,
  .bottom {
    position: absolute;
    width: 16px;
    height: 2px;
    background-color: var(--vp-c-text-1);
    transition: top .25s, background-color .5s, transform .25s;
  }

  .top    { top: 0; left: 0; transform: translateX(0); }
  .middle { top: 5px; left: 0; transform: translateX(0); }
  .bottom { top: 10px; left: 0; transform: translateX(0); }
</style>
