<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
import { ref, watchPostEffect } from 'vue'
import { useData } from 'vitepress'
import { useLayout } from 'vitepress/theme'
import { provideNavOverflow } from 'vitepress/dist/client/theme-default/composables/nav-overflow'
import VPNavAppearance from 'vitepress/dist/client/theme-default/components/VPNavAppearance.vue'
import VPNavBarExtra from 'vitepress/dist/client/theme-default/components/VPNavBarExtra.vue'
import VPNavBarHamburger from 'vitepress/dist/client/theme-default/components/VPNavBarHamburger.vue'
import VPNavBarSearch from 'vitepress/dist/client/theme-default/components/VPNavBarSearch.vue'
import VPNavBarTitle from 'vitepress/dist/client/theme-default/components/VPNavBarTitle.vue'
import VPNavMenu from 'vitepress/dist/client/theme-default/components/VPNavMenu.vue'
import VPNavSocialLinks from 'vitepress/dist/client/theme-default/components/VPNavSocialLinks.vue'
import VPNavTranslations from 'vitepress/dist/client/theme-default/components/VPNavTranslations.vue'

defineProps<{
  isScreenOpen: boolean
}>()

defineEmits<{
  (e: 'toggle-screen'): void
}>()

const { y } = useWindowScroll()
const { isHome, hasSidebar, hasLocalNav } = useLayout()
const { theme } = useData()
const overflow = provideNavOverflow({ itemsKey: () => JSON.stringify(theme.value.nav ?? null) })

const classes = ref<Record<string, boolean>>({})

watchPostEffect(() => {
  classes.value = {
    'has-sidebar': hasSidebar.value,
    'has-local-nav': hasLocalNav.value,
    top: isHome.value && y.value === 0,
  }
})
</script>

<template>
  <div class="VPNavBar" :class="classes">
    <div class="wrapper">
      <div class="container">
        <div class="title">
          <VPNavBarTitle>
            <template #nav-bar-title-before>
              <slot name="nav-bar-title-before" />
            </template>
            <template #nav-bar-title-after>
              <slot name="nav-bar-title-after" />
            </template>
          </VPNavBarTitle>
        </div>

        <div class="content">
          <div class="content-body" :ref="(el) => overflow.setContainerEl(el as HTMLElement | null)">
            <slot name="nav-bar-content-before" />
            <VPNavBarSearch class="search" />
            <VPNavMenu class="menu" />
            <VPNavTranslations class="translations" />
            <VPNavAppearance class="appearance" />
            <VPNavSocialLinks class="social-links" />
            <VPNavBarExtra class="extra" />
            <slot name="nav-bar-content-after" />
            <VPNavBarHamburger class="hamburger" :active="isScreenOpen" @click="$emit('toggle-screen')" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPNavBar {
  position: relative;
  /* above the nav screen, which is fixed from the very top since VitePress 2 */
  z-index: 1;
  border-bottom: 1px solid transparent;
  height: var(--vp-nav-height);
  pointer-events: none;
  white-space: nowrap;
  transition: background-color 0.5s;
}

.VPNavBar.has-local-nav {
  background-color: var(--vp-nav-bg-color);
}

@media (min-width: 960px) {
  .VPNavBar.has-local-nav {
    background-color: transparent;
  }

  .VPNavBar:not(.has-sidebar):not(.top) {
    background-color: var(--vp-nav-bg-color);
  }
}

.wrapper {
  padding: 0 8px 0 24px;
}

@media (min-width: 768px) {
  .wrapper {
    padding: 0 32px;
  }
}

@media (min-width: 960px) {
  .VPNavBar:not(.has-sidebar):not(.top) {
    border-bottom-color: var(--vp-c-gutter);
    background-color: var(--vp-nav-bg-color);
  }
}

.container {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: calc(var(--vp-layout-max-width) - 64px);
  height: var(--vp-nav-height);
  pointer-events: none;
}

.container>.title,
.container>.content {
  pointer-events: none;
}

.container :deep(*) {
  pointer-events: auto;
}

@media (min-width: 960px) {
  .VPNavBar.has-sidebar .container {
    max-width: 100%;
  }
}

.title {
  flex-shrink: 0;
  height: calc(var(--vp-nav-height) - 1px);
  transition: background-color 0.5s;
}

@media (min-width: 1440px) {
  .VPNavBar.has-sidebar .title {
    padding-left: max(32px, calc((100% - (var(--vp-layout-max-width) - 64px)) / 2));
  }
}

.content {
  flex-grow: 1;
}

/* the overflow engine measures the free space, so the controls must be able to shrink */
@media (min-width: 768px) {
  .content {
    flex-shrink: 1;
    min-width: 0;
  }
}

@media (min-width: 1280px) {
  .VPNolebaseEnhancedReadabilitiesLayoutSwitchFullWidth .VPNavBar.has-sidebar>.wrapper>.container>.content {
    padding-left: 0 !important;
  }

  .VPNolebaseEnhancedReadabilitiesLayoutSwitchFullWidth .VPNavBar.has-sidebar>.wrapper>.container>.title {
    width: unset !important;
  }
}

@media (min-width: 1440px) {
  .VPNavBar.has-sidebar .content {
    padding-right: calc((100vw - var(--vp-layout-max-width)) / 2 + 32px);
  }
}

.content-body {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: var(--vp-nav-height);
  transition: background-color 0.5s;
}

@media (min-width: 960px) {
  .VPNavBar:not(.top) .content-body {
    background-color: var(--vp-nav-bg-color);
  }

  .VPNavBar:not(.has-sidebar):not(.top) .content-body {
    background-color: transparent;
  }
}

@media (max-width: 767px) {
  .content-body {
    column-gap: 0.5rem;
  }
}

/* collapsed into the `⋯` menu — kept mounted (hidden) so its natural width stays measurable */
.content-body>.collapsed {
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%;
  overflow: hidden;
}

.menu+.translations::before,
.menu+.appearance::before,
.menu+.social-links::before,
.translations+.appearance::before,
.appearance+.social-links::before {
  margin-right: 8px;
  margin-left: 8px;
  width: 1px;
  height: 24px;
  background-color: var(--vp-c-divider);
  content: "";
}

.menu+.appearance::before,
.translations+.appearance::before {
  margin-right: 16px;
}

.appearance+.social-links::before {
  margin-left: 16px;
}

.social-links {
  margin-right: -8px;
}
</style>
