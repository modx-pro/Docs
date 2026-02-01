---
title: VueTools
description: Base Vue 3 stack package for MODX 3 components
logo: https://modstore.pro/assets/extras/vuetools/logo-lg.png
author: modx-pro
repository: https://github.com/modx-pro/vuetools

items:
  - text: Integration
    link: integration
  - text: API Composables
    link: composables
---

# VueTools

Base package providing **Vue 3 stack** for MODX 3.x components via ES Modules Import Map.

## Purpose

VueTools solves the **library duplication** problem when using Vue 3 in multiple MODX components. Instead of each component including its own copy of Vue, Pinia and PrimeVue, they all use **shared libraries** from VueTools.

### Advantages

- **Single library version** — all components use the same versions of Vue, Pinia, PrimeVue
- **Smaller load size** — libraries load once and are cached by the browser
- **Isolated styles** — PrimeVue styles don't conflict with MODX admin ExtJS
- **Ready composables** — useLexicon, useApi, useModx, usePermission for working with MODX

::: info Renaming
The package was previously called **ModxProVueCore**. As of version 2.0 it was renamed to **VueTools** for brevity.
:::

## Package contents

| Library | Version | Purpose |
|---------|---------|---------|
| Vue 3 | 3.5.x | Reactive framework |
| Pinia | 3.0.x | State management |
| PrimeVue | 4.3.x | UI components |
| PrimeIcons | 7.0.x | Icons |

### Composables (helpers)

| Module | Purpose |
|--------|---------|
| `useLexicon` | Working with MODX lexicons |
| `useApi` | HTTP client for standard MODX API |
| `useModx` | Access to global MODx object |
| `usePermission` | User permission check |

## System requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| Browser | ES Modules support (Chrome 89+, Firefox 108+, Safari 16.4+, Edge 89+) |

## Installation

### Via package manager

1. Go to **Extras → Installer**
2. Click **Download Extras**
3. Find **VueTools** in the list
4. Click **Download** then **Install**

::: info Automatic activation
After installation the package activates automatically. Import Map and PrimeVue styles are registered on all MODX admin pages.
:::

## Architecture

### Import Map

VueTools uses [Import Map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) — standard browser technology for resolving ES Module imports.

The `VueToolsManager` plugin fires on `OnManagerPageInit` and registers Import Map in the page `<head>`:

```json
{
  "imports": {
    "vue": "/assets/components/vuetools/vendor/vue.min.js",
    "pinia": "/assets/components/vuetools/vendor/pinia.min.js",
    "primevue": "/assets/components/vuetools/vendor/primevue.min.js",
    "@vuetools/useApi": "/assets/components/vuetools/composables/useApi.min.js",
    "@vuetools/useLexicon": "/assets/components/vuetools/composables/useLexicon.min.js",
    "@vuetools/useModx": "/assets/components/vuetools/composables/useModx.min.js",
    "@vuetools/usePermission": "/assets/components/vuetools/composables/usePermission.min.js"
  }
}
```

### How it works

```
1. VueToolsManager plugin (OnManagerPageInit)
   ↓
2. Registers Import Map in <head> (before ES modules)
   ↓
3. Connects PrimeVue CSS styles (isolated with .vueApp)
   ↓
4. Your component loads ES modules
   ↓
5. Browser resolves imports via Import Map
```

When a Vue component runs `import { ref } from 'vue'`, the browser finds the `vue` key in Import Map and loads the file at the specified path.

## Style isolation

PrimeVue styles are isolated using the CSS prefix `.vueApp`. This prevents conflicts with MODX admin ExtJS styles.

All Vue widget containers **must** have the `vueApp` class:

```html
<!-- In ExtJS panel or HTML -->
<div id="my-vue-app" class="vueApp"></div>
```

::: warning Important
Without the `vueApp` class, PrimeVue styles will not be applied to your components.
:::

## Components using VueTools

- **[MiniShop3](/en/components/minishop3/)** — modern e-commerce for MODX 3

## For developers

If you are developing a MODX component and want to use Vue 3 + PrimeVue:

- [Integration into component](integration) — step-by-step guide
- [API Composables](composables) — helper documentation

## Support

- GitHub Issues: [modx-pro/vuetools](https://github.com/modx-pro/vuetools/issues)
