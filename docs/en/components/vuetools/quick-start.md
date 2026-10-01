---
title: VueTools Quick Start
description: From installing VueTools to a widget on a manager tab
---

# Quick Start

Goal: a Vue widget on a manager tab without bundling your own copy of Vue, Pinia, or PrimeVue.

## 1. Install VueTools

**Extras → Installer → Download Extras → VueTools**.

The `VueCoreManager` plugin injects the Import Map and `window.VueTools`. Check: manager HTML includes `script type="importmap"` with keys `vue`, `pinia`, `primevue`.

## 2. Build the Extra

In `vite.config.js`, mark runtime as `external` (see [Integration](integration)). Minimum set:

```javascript
external: [
  'vue',
  'pinia',
  'primevue',
  '@vuetools/useTheme',
  '@vuetools/useApi',
  '@vuetools/useLexicon',
  '@vuetools/usePermission'
]
```

Import PrimeVue only from `primevue` (not subpaths). Theme: `getActiveTheme()` from `@vuetools/useTheme`.

## 3. Entry point

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { PrimeVue, ToastService } from 'primevue'
import { getActiveTheme } from '@vuetools/useTheme'
import { getPrimeVueLocale } from '@vuetools/usePrimeVueLocale'
import MyWidget from '../components/MyWidget.vue'

let app = null

export function init(selector = '#my-vue-widget') {
  const el = document.querySelector(selector)
  if (!el || el.dataset.vApp === 'true') return app

  app = createApp(MyWidget)
  app.use(createPinia())
  app.use(PrimeVue, { ...getActiveTheme(), locale: getPrimeVueLocale() })
  app.use(ToastService)
  app.mount(selector)
  el.dataset.vApp = 'true'
  return app
}

window.MyComponentWidget = { init }
```

## 4. Controller

```php
public function loadCustomCssJs()
{
    $assetsUrl = $this->myComponent->config['assetsUrl'];

    $this->addCss($assetsUrl . 'css/mgr/vue-dist/my-widget.min.css');
    $this->modx->regClientStartupHTMLBlock(
        '<script type="module" src="' . $assetsUrl . 'js/mgr/vue-dist/my-widget.min.js"></script>'
    );
}
```

Do not use `addJavascript()` for ES modules. Full template with Import Map check: [Integration](integration#vuetools-check).

Transport package dependency signature: **`vuetools`**.

## 5. ExtJS tab

```javascript
{
  title: _('my_tab_title'),
  html: '<div id="my-vue-widget" class="vueApp"></div>',
  listeners: {
    activate: function () {
      if (window.MyComponentWidget) {
        window.MyComponentWidget.init('#my-vue-widget')
      }
    }
  }
}
```

The `vueApp` class is required for PrimeIcons.

## 6. First check

1. Open the component page in the manager.
2. Activate the tab.
3. Console has no `Failed to resolve module specifier "vue"`.
4. PrimeVue button or table renders in the theme from `vuetools.theme` (`aura` or `modx`).

Next: [Practices and CRUD](practices), [API Composables](composables), [Theme](theme).
