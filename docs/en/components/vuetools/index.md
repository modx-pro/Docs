---
title: VueTools
description: Base Vue 3 stack package for MODX 3 components
categories: utilities
logo: https://modstore.pro/assets/extras/vuetools/logo.png
author: modx-pro
repository: https://github.com/modx-pro/vuetools

compatibility:
  - modx3
  - php81
  - vue3
items:
  - text: Integration
    link: integration
  - text: Theme
    link: theme
  - text: API Composables
    link: composables
---

# VueTools

Base package: gives MODX 3.x components a shared Vue 3 stack (Vue, Pinia, PrimeVue) through the ES Modules Import Map. Several components use the same libraries instead of bundling their own copies.

## What it solves

Without a shared package, every component ships its own copy of Vue, Pinia and PrimeVue. VueTools serves them once for the whole manager.

- One library version across all components.
- Libraries load once and stay in the browser cache.
- PrimeVue styles isolated from the MODX ExtJS manager.
- Ready composables for MODX: `useLexicon`, `useApi`, `useModx`, `usePermission`, `usePrimeVueLocale`, `useTheme`.
- A single theme switched by one system setting (since 1.2.0).

## What's inside

| Library | Version | Purpose |
|---------|---------|---------|
| Vue 3 | 3.5.x | Reactive framework |
| Pinia | 3.0.x | State management |
| PrimeVue | 4.5.x | UI components, `Aura` and `Modx` themes |
| PrimeIcons | 7.0.x | Icons |

| Composable | Purpose |
|--------|---------|
| `useLexicon` | MODX lexicons |
| `useApi` | HTTP client for the standard MODX connector API |
| `useModx` | Access to `window.MODx` |
| `usePermission` | User permission checks |
| `usePrimeVueLocale` | PrimeVue locales for DataTable, DatePicker, Calendar |
| `useTheme` | Active theme from the `vuetools.theme` setting |

## Requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| Browser | ES Modules (Chrome 89+, Firefox 108+, Safari 16.4+, Edge 89+) |

## Installation

1. Open **Extras → Installer**.
2. Click **Download Extras**.
3. Find **VueTools**, click **Download**, then **Install**.

After install the package activates itself: the Import Map, PrimeVue styles and the client theme setting register on every manager page.

## How the Import Map works

The `VueCoreManager` plugin fires on `OnManagerPageBeforeRender` and prepends two blocks to `<head>`: the Import Map and the `window.VueTools` client theme config.

```json
{
  "imports": {
    "vue": "/assets/components/vuetools/vendor/vue.min.js",
    "pinia": "/assets/components/vuetools/vendor/pinia.min.js",
    "primevue": "/assets/components/vuetools/vendor/primevue.min.js",
    "vuetools": "/assets/components/vuetools/vendor/primevue.min.js",
    "vuetools/theme": "/assets/components/vuetools/vendor/primevue.min.js",
    "@vuetools/useApi": "/assets/components/vuetools/composables/useApi.min.js",
    "@vuetools/useLexicon": "/assets/components/vuetools/composables/useLexicon.min.js",
    "@vuetools/useModx": "/assets/components/vuetools/composables/useModx.min.js",
    "@vuetools/usePermission": "/assets/components/vuetools/composables/usePermission.min.js",
    "@vuetools/usePrimeVueLocale": "/assets/components/vuetools/composables/usePrimeVueLocale.min.js",
    "@vuetools/useTheme": "/assets/components/vuetools/composables/useTheme.min.js"
  }
}
```

When a component module runs `import { ref } from 'vue'`, the browser finds the `vue` key and loads the file. Each URL carries a `?v=` query based on the file modification time, so after an update the browser fetches the fresh build instead of a cached one.

The `vuetools/theme` key points to the same bundle as `primevue` and marks a theme-capable version: a component uses it to tell VueTools 1.2.0+ from an older one (see [Theme](theme)).

## Style isolation

PrimeVue styles are isolated with the `.vueApp` prefix so they don't clash with ExtJS. Every Vue widget container must have the `vueApp` class:

```html
<div id="my-vue-app" class="vueApp"></div>
```

::: warning
Without the `vueApp` class PrimeVue styles won't apply to the widget.
:::

::: info Former name
The package was previously called **ModxProVueCore** and was renamed to **VueTools**.
:::

## Next

- [Integration](integration) — step by step: Vite, module loading, entry point.
- [Theme](theme) — switch and apply the theme.
- [API Composables](composables) — helper reference.

## Support

GitHub Issues: [modx-pro/vuetools](https://github.com/modx-pro/vuetools/issues)
