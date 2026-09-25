---
title: VueTools Theme
description: Switch and apply the PrimeVue theme
---

# Theme

The PrimeVue theme is set by one system setting, `vuetools.theme` — for every component that supports it at once. Since 1.2.0.

## Switch the theme

Setting: **System → System Settings → `vuetools.theme`**.

| Value | Theme |
|-------|-------|
| `aura` | `Aura` — the standard PrimeVue theme (default) |
| `modx` | `Modx` — the MODX Revolution 3 manager look |

Changing the value switches the theme for every component that reads it through `getActiveTheme()` — with no rebuild of those components.

## Apply in a component

Pass `getActiveTheme()` to `app.use(PrimeVue, …)`:

```javascript
import { PrimeVue } from 'primevue'
import { getActiveTheme } from '@vuetools/useTheme'

app.use(PrimeVue, getActiveTheme())
```

With a locale:

```javascript
import { getPrimeVueLocale } from '@vuetools/usePrimeVueLocale'

app.use(PrimeVue, { ...getActiveTheme(), locale: getPrimeVueLocale() })
```

`getActiveTheme()` reads the value from `window.VueTools.theme` (injected by the `VueCoreManager` plugin next to the Import Map) and returns `{ theme }` for the active theme. An unknown setting value falls back to `Aura`.

Don't set the theme by hand (`{ theme: { preset: Aura } }`) — a component with a hardcoded theme won't follow the setting.

## Version requirement {#version}

`getActiveTheme()` and the `@vuetools/useTheme` key appeared in VueTools 1.2.0. On an older package that key is missing from the Import Map and the component module fails on import — the console shows a module resolution error and the widget never appears.

The theme-capable version is marked by the `vuetools/theme` key in the Import Map. For a themed component extend the dependency check (see [VueTools presence check](integration#vuetools-check)) with that key:

```javascript
hasVueCore = mapContent.imports
    && mapContent.imports.vue
    && mapContent.imports['vuetools/theme'];
```

Then on an older package the reader sees a clear "update VueTools" message instead of a console error. Name the minimum version in the message — VueTools 1.2.0.

## Existing components

Updating VueTools alone changes nothing visually: `Aura` is active by default. A component that sets the theme the old way (`Aura` or `ModxManagerTheme` in code) keeps working and does not follow the setting until it moves to `getActiveTheme()`.

## Custom theme

You can extend the `Modx` preset without copying it:

```javascript
import { definePreset, Modx } from 'primevue'

const MyPreset = definePreset(Modx, {
  semantic: { primary: { 500: '#1a3a5c' } }
})
```

New themes register in a registry inside VueTools, while components keep calling `getActiveTheme()` — their code doesn't change.
