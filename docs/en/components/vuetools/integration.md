# Integration

How to add Vue 3 + PrimeVue to a MODX 3 component through VueTools: build setup, module loading, entry point.

## Vite setup

In `vite.config.js` list the external dependencies — VueTools serves them through the Import Map, so they stay out of the component bundle:

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import prefixSelector from 'postcss-prefix-selector'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      external: [
        'vue',
        'pinia',
        'primevue',
        '@vuetools/useTheme',
        '@vuetools/useApi',
        '@vuetools/useLexicon',
        '@vuetools/useModx',
        '@vuetools/usePermission',
        '@vuetools/usePrimeVueLocale'
      ],
      output: { format: 'es', entryFileNames: '[name].min.js' }
    }
  },
  css: {
    postcss: {
      plugins: [prefixSelector({ prefix: '.vueApp', exclude: [/^:root/, /^\.p-/, /^\.pi/, /^\[data-p-/] })]
    }
  }
})
```

Import PrimeVue only through `primevue` (barrel), never through paths like `primevue/button`: a subpath import pulls a second PrimeVue copy into the bundle, and the theme stops applying to its components.

## Module loading in the controller

Register ES modules with `regClientStartupHTMLBlock` so they load after the Import Map. One script per call.

```php
class MyComponentManagerController extends modExtraManagerController
{
    public function loadCustomCssJs()
    {
        $assetsUrl = $this->myComponent->config['assetsUrl'];

        $this->addCss($assetsUrl . 'css/mgr/vue-dist/my-widget.min.css');
        $this->modx->regClientStartupHTMLBlock(
            '<script type="module" src="' . $assetsUrl . 'js/mgr/vue-dist/my-widget.min.js"></script>'
        );
    }
}
```

::: danger
`addJavascript()` and `addLastJavascript()` don't add `type="module"` — they can't load ES modules. Several tags in one multiline string get split incorrectly by MODX: register each with its own call.
:::

## VueTools presence check {#vuetools-check}

Without VueTools the modules won't resolve: the console shows `Failed to resolve module specifier "vue"` and the widget container stays empty. The check finds the Import Map and shows a clear message.

An `addVueModule()` method registers the module and, once per page, the check script:

```php
protected static $vueCoreCheckRegistered = false;

public function addVueModule(string $src): void
{
    if (!self::$vueCoreCheckRegistered) {
        $this->registerVueCoreCheck();
        self::$vueCoreCheckRegistered = true;
    }
    $this->modx->regClientStartupHTMLBlock(
        '<script type="module" data-vue-module src="' . $src . '"></script>'
    );
}

protected function registerVueCoreCheck(): void
{
    $message = $this->modx->lexicon('mycomponent_vuetools_required')
        ?: 'VueTools package is required. Install it from Package Manager.';

    $script = <<<JS
<script>
(function () {
    var map = document.querySelector('script[type="importmap"]');
    var ok = false;
    if (map) {
        try {
            var imports = JSON.parse(map.textContent).imports;
            ok = imports && imports.vue;
        } catch (e) { ok = false; }
    }
    if (!ok) {
        document.querySelectorAll('script[type="module"][data-vue-module]').forEach(function (el) { el.remove(); });
        if (typeof MODx !== 'undefined' && MODx.msg) { MODx.msg.alert('', '{$message}'); }
        window.MY_COMPONENT_VUE_CORE_MISSING = true;
    }
})();
</script>
JS;
    $this->modx->regClientStartupHTMLBlock($script);
}
```

The `data-vue-module` attribute lets the check remove exactly the modules when VueTools is absent, instead of flooding the console. If the component uses the theme through `getActiveTheme()`, also check the `vuetools/theme` key — see [Theme](theme#version).

Load modules through `addVueModule()`:

```php
$this->addVueModule($assetsUrl . 'js/mgr/vue-dist/my-widget.min.js');
```

Message lexicon:

```php
$_lang['mycomponent_vuetools_required'] = 'VueTools package is required. Install it from Package Manager.';
```

## Using in a component

Vue, composables and PrimeVue components are imported from the Import Map:

```vue
<script setup>
import { ref, computed } from 'vue'
import { Button, DataTable, Column } from 'primevue'
import { useLexicon } from '@vuetools/useLexicon'
import { usePermission } from '@vuetools/usePermission'

const { _ } = useLexicon()
const { can } = usePermission()

const items = ref([])
const canEdit = computed(() => can('my_component_edit'))
</script>

<template>
  <div class="my-component">
    <Button v-if="canEdit" :label="_('my_component_add')" />
    <DataTable :value="items">
      <Column field="name" :header="_('my_component_name')" />
    </DataTable>
  </div>
</template>
```

## Entry point

The entry point creates the app, sets the theme through `getActiveTheme()` and mounts the widget:

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { PrimeVue, ToastService } from 'primevue'
import { getActiveTheme } from '@vuetools/useTheme'
import MyWidget from '../components/MyWidget.vue'

let app = null

export function init(selector = '#my-vue-widget') {
  const el = document.querySelector(selector)
  if (!el || el.dataset.vApp === 'true') return app

  app = createApp(MyWidget)
  app.use(createPinia())
  app.use(PrimeVue, getActiveTheme())
  app.use(ToastService)
  app.mount(selector)
  el.dataset.vApp = 'true'
  return app
}

window.MyComponentWidget = { init }
```

`dataset.vApp` guards against a second mount when the ExtJS tab is re-activated.

## ExtJS tab

The container must have the `vueApp` class; init on tab activation:

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

::: warning
Without the `vueApp` class on the container PrimeVue styles won't apply.
:::

## Custom API client {#own-api-client}

`useApi` targets the standard MODX connector. If your component has its own router, add a local `request.js` — it builds the URL for your router processor and adds the `HTTP_MODAUTH` token:

```javascript
class Request {
  buildUrl(route, params = {}) {
    const url = new URL(window.myComponent.config.connector_url, window.location.origin)
    url.searchParams.set('action', 'MyComponent\\Processors\\Api\\Index')
    url.searchParams.set('route', route)
    const token = window.MODx?.siteId
    if (token) url.searchParams.set('HTTP_MODAUTH', token)
    Object.entries(params).forEach(([k, v]) => { if (v != null) url.searchParams.set(k, v) })
    return url.toString()
  }

  async request(method, route, data = null) {
    const options = { method, headers: { Accept: 'application/json' }, credentials: 'same-origin' }
    let url = this.buildUrl(route, method === 'GET' ? data : {})
    if (method !== 'GET' && data) {
      options.headers['Content-Type'] = 'application/json'
      options.body = JSON.stringify(data)
    }
    const result = await (await fetch(url, options)).json()
    if (!result.success) throw new Error(result.message || 'Request failed')
    return result.object || result.data || result
  }

  get(route, params) { return this.request('GET', route, params) }
  post(route, data) { return this.request('POST', route, data) }
}

export default new Request()
```

## Checklist

- [ ] `external` in `vite.config.js`: `vue`, `pinia`, `primevue`, the `@vuetools/*` you use.
- [ ] PrimeVue imported only through `primevue`, no subpath.
- [ ] Theme via `getActiveTheme()`, not a hardcoded preset.
- [ ] `addVueModule()` with the dependency check instead of a bare `regClientStartupHTMLBlock()`.
- [ ] Error message lexicons in both languages.
- [ ] `class="vueApp"` on widget containers.
- [ ] Lexicon topics loaded in the controller.
- [ ] A local `request.js` if the component has its own router.

## Example

[MiniShop3](https://github.com/modx-pro/MiniShop3) — integration with a custom router.
