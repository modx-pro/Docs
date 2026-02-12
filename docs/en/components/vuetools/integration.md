# Component integration

Step-by-step guide for integrating Vue 3 + PrimeVue into MODX 3 components using VueTools.

## Vite setup

In `vite.config.js` specify external dependencies that **should not** be bundled:

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import prefixSelector from 'postcss-prefix-selector'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      // These modules are NOT bundled — loaded from Import Map
      external: [
        'vue',
        'pinia',
        'primevue',
        '@vuetools/useApi',
        '@vuetools/useLexicon',
        '@vuetools/useModx',
        '@vuetools/usePermission'
      ],
      output: {
        format: 'es',
        entryFileNames: '[name].min.js',
        chunkFileNames: '[name].min.js'
      }
    }
  },
  // Style isolation from ExtJS
  css: {
    postcss: {
      plugins: [
        prefixSelector({
          prefix: '.vueApp',
          exclude: [/^:root/, /^\.p-/, /^\.pi/, /^\[data-p-/]
        })
      ]
    }
  }
})
```

::: info Key point
The `external` array tells Vite **not to bundle** these dependencies. The browser loads them from the Import Map registered by VueTools.
:::

### Install dependencies

```bash
npm install postcss-prefix-selector --save-dev
```

## Loading scripts in PHP controller

### Basic approach

```php
<?php
class MyComponentManagerController extends modExtraManagerController
{
    public function loadCustomCssJs()
    {
        $assetsUrl = $this->myComponent->config['assetsUrl'];

        // Component CSS (in <head>)
        $this->addCss($assetsUrl . 'css/mgr/vue-dist/my-widget.min.css');

        // ES modules MUST use regClientStartupHTMLBlock
        $this->modx->regClientStartupHTMLBlock(
            '<script type="module" src="' . $assetsUrl . 'js/mgr/vue-dist/my-widget.min.js"></script>'
        );
    }
}
```

::: danger Critical

- Use `regClientStartupHTMLBlock()` for `<script type="module">`
- **Do NOT** use `addJavascript()` or `addLastJavascript()` for ES modules — they don't support `type="module"`
:::

### Correct registration of multiple scripts

```php
// ✅ CORRECT — separate calls
$this->modx->regClientStartupHTMLBlock(
    '<script type="module" src="' . $assetsUrl . 'js/mgr/vue-dist/widget1.min.js"></script>'
);
$this->modx->regClientStartupHTMLBlock(
    '<script type="module" src="' . $assetsUrl . 'js/mgr/vue-dist/widget2.min.js"></script>'
);

// ❌ WRONG — multiline string with multiple tags
$this->modx->regClientStartupHTMLBlock('
    <script type="module" src="' . $assetsUrl . 'js/mgr/vue-dist/widget1.min.js"></script>
    <script type="module" src="' . $assetsUrl . 'js/mgr/vue-dist/widget2.min.js"></script>
');
```

## VueTools availability check

Without VueTools, Vue modules won't load and console errors will appear. Implement a check and show a clear message to the user.

### addVueModule() method

Create this method in the base controller:

```php
<?php
class MyComponentManagerController extends modExtraManagerController
{
    /**
     * Flag for check script registration (once per page)
     */
    protected static $vueCoreCheckRegistered = false;

    /**
     * Register Vue ES module with VueTools dependency check
     *
     * @param string $src Module script URL
     */
    public function addVueModule(string $src): void
    {
        // Register check script only once per page
        if (!self::$vueCoreCheckRegistered) {
            $this->registerVueCoreCheck();
            self::$vueCoreCheckRegistered = true;
        }

        // Add version for cache busting
        $src = $src . '?v=' . $this->myComponent->version;

        // Register module with data-vue-module attribute
        $this->modx->regClientStartupHTMLBlock(
            '<script type="module" data-vue-module src="' . $src . '"></script>'
        );
    }

    /**
     * Register inline Import Map check script
     */
    protected function registerVueCoreCheck(): void
    {
        $alertTitle = $this->modx->lexicon('mycomponent_error') ?: 'Error';
        $alertMessage = $this->modx->lexicon('mycomponent_vuetools_required')
            ?: 'VueTools package is required. Please install it from Package Manager.';

        $script = <<<JS
<script>
(function() {
    var importMap = document.querySelector('script[type="importmap"]');
    var hasVueCore = false;

    if (importMap) {
        try {
            var mapContent = JSON.parse(importMap.textContent);
            hasVueCore = mapContent.imports && mapContent.imports.vue;
        } catch (e) {
            hasVueCore = false;
        }
    }

    if (!hasVueCore) {
        // Remove all scripts with data-vue-module attribute
        document.querySelectorAll('script[type="module"][data-vue-module]').forEach(function(el) {
            el.remove();
        });

        // Show MODX alert
        if (typeof Ext !== 'undefined') {
            Ext.onReady(function() {
                if (typeof MODx !== 'undefined' && MODx.msg) {
                    MODx.msg.alert('{$alertTitle}', '{$alertMessage}');
                } else {
                    alert('{$alertMessage}');
                }
            });
        } else {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(function() {
                    if (typeof MODx !== 'undefined' && MODx.msg) {
                        MODx.msg.alert('{$alertTitle}', '{$alertMessage}');
                    } else {
                        alert('{$alertMessage}');
                    }
                }, 500);
            });
        }

        window.MY_COMPONENT_VUE_CORE_MISSING = true;
    }
})();
</script>
JS;

        $this->modx->regClientStartupHTMLBlock($script);
    }
}
```

### Usage

```php
public function loadCustomCssJs()
{
    $assetsUrl = $this->myComponent->config['assetsUrl'];

    // CSS (as usual)
    $this->addCss($assetsUrl . 'css/mgr/vue-dist/my-widget.min.css');

    // ✅ With dependency check
    $this->addVueModule($assetsUrl . 'js/mgr/vue-dist/my-widget.min.js');
    $this->addVueModule($assetsUrl . 'js/mgr/vue-dist/another-widget.min.js');
}
```

### Lexicons

Add lexicons for the error message:

```php
// lexicon/ru/default.inc.php
$_lang['mycomponent_error'] = 'Error';
$_lang['mycomponent_vuetools_required'] = 'VueTools package is required. Please install it via Package Manager.';  // or Russian equivalent

// lexicon/en/default.inc.php
$_lang['mycomponent_error'] = 'Error';
$_lang['mycomponent_vuetools_required'] = 'VueTools package is required. Please install it via Package Manager.';
```

### Result

| Without check | With check |
|---------------|------------|
| Console errors `Failed to resolve module specifier "vue"` | Clean console |
| Vue widgets don't work | Clear MODX alert with instructions |
| User doesn't understand the issue | User knows what to do |

## Use in Vue components

```vue
<script setup>
// Vue imported from Import Map (not bundled)
import { ref, computed, onMounted } from 'vue'

// Pinia from Import Map
import { createPinia } from 'pinia'

// PrimeVue components from Import Map
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

// Composables from VueTools
import { useLexicon } from '@vuetools/useLexicon'
import { useModx } from '@vuetools/useModx'
import { usePermission } from '@vuetools/usePermission'

const { _ } = useLexicon()
const { modx, config } = useModx()
const { hasPermission } = usePermission()

// Your component code
const items = ref([])
const canEdit = computed(() => hasPermission('my_component_edit'))
</script>

<template>
  <div class="my-component">
    <h1>{{ _('my_component_title') }}</h1>

    <Button
      v-if="canEdit"
      :label="_('my_component_add')"
      icon="pi pi-plus"
    />

    <DataTable :value="items">
      <Column field="name" :header="_('my_component_name')" />
    </DataTable>
  </div>
</template>
```

## Entry Point

Create an entry point to initialize the Vue app:

```javascript
// src/entries/my-widget.js
import '../scss/styles.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

import MyWidget from '../components/MyWidget.vue'

let appInstance = null

function createVueApp(props = {}) {
  const app = createApp(MyWidget, props)

  app.use(createPinia())

  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: 'none'
      }
    }
  })

  app.use(ToastService)
  app.use(ConfirmationService)

  return app
}

export function init(selector = '#my-vue-widget', props = {}) {
  const el = document.querySelector(selector)

  if (!el) {
    console.warn(`[MyWidget] Element ${selector} not found`)
    return null
  }

  // Prevent re-initialization
  if (el.dataset.vApp === 'true') {
    return appInstance
  }

  appInstance = createVueApp(props)
  appInstance.mount(selector)
  el.dataset.vApp = 'true'

  return appInstance
}

export function destroy() {
  if (appInstance) {
    appInstance.unmount()
    appInstance = null
  }
}

// Export for global access from ExtJS
window.MyComponentWidget = { init, destroy }
```

## ExtJS tab integration

```javascript
// In ExtJS panel
{
  title: _('my_tab_title'),
  id: 'my-vue-tab',
  html: '<div id="my-vue-widget" class="vueApp"></div>',
  listeners: {
    activate: function() {
      // Initialize when tab activates
      if (window.MyComponentWidget) {
        const el = document.querySelector('#my-vue-widget')
        if (el && el.dataset.vApp !== 'true') {
          window.MyComponentWidget.init('#my-vue-widget', {
            someId: config.record.id
          })
        }
      }
    }
  }
}
```

::: warning Important
Add `vueApp` class to the container — without it PrimeVue styles won't apply.
:::

## Custom API client

If your component uses a **custom router** (not standard MODX connector), create local `request.js`:

```javascript
// src/request.js
class Request {
  getConnectorUrl() {
    return window.myComponent?.config?.connector_url
      || '/assets/components/mycomponent/connector.php'
  }

  getModAuthToken() {
    return window.MODx?.siteId || null
  }

  buildUrl(route, params = {}) {
    const url = new URL(this.getConnectorUrl(), window.location.origin)

    // Your router processor
    url.searchParams.set('action', 'MyComponent\\Processors\\Api\\Index')
    url.searchParams.set('route', route)

    const token = this.getModAuthToken()
    if (token) {
      url.searchParams.set('HTTP_MODAUTH', token)
    }

    Object.entries(params).forEach(([key, value]) => {
      if (value != null) url.searchParams.set(key, value)
    })

    return url.toString()
  }

  async request(method, route, data = null) {
    const options = {
      method,
      headers: { 'Accept': 'application/json' },
      credentials: 'same-origin'
    }

    let url
    if (method === 'GET' && data) {
      url = this.buildUrl(route, data)
    } else {
      url = this.buildUrl(route)
      if (data) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(data)
      }
    }

    const response = await fetch(url, options)
    const result = await response.json()

    if (!result.success) {
      throw new Error(result.message || 'Request failed')
    }

    return result.object || result.data || result
  }

  get(route, params) { return this.request('GET', route, params) }
  post(route, data) { return this.request('POST', route, data) }
  put(route, data) { return this.request('PUT', route, data) }
  delete(route, data) { return this.request('DELETE', route, data) }
}

export default new Request()
```

Usage:

```javascript
// Instead of useApi from VueTools
import request from '../request.js'

const products = await request.get('/api/products', { limit: 20 })
await request.post('/api/products', { name: 'New Product' })
```

## Integration checklist

- [ ] Add `vuetools` to package dependencies (setup options)
- [ ] Configure `external` in vite.config.js
- [ ] Configure postcss prefix selector for style isolation
- [ ] Implement `addVueModule()` with dependency check
- [ ] Add lexicons for error message
- [ ] Use `addVueModule()` instead of `regClientStartupHTMLBlock()`
- [ ] Add `class="vueApp"` to Vue containers
- [ ] Load lexicon topics in controller
- [ ] Create local `request.js` if using custom router

## Examples

- **[MiniShop3](https://github.com/modx-pro/MiniShop3)** — full integration with custom router
