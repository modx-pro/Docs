# Интеграция в компонент

Как подключить Vue 3 + PrimeVue в компонент MODX 3 через VueTools: настройка сборки, загрузка модулей, точка входа.

## Настройка Vite

В `vite.config.js` перечислите внешние зависимости — их даёт VueTools через Import Map, в сборку компонента они не попадают:

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

PrimeVue импортируйте только через `primevue` (barrel), без путей вида `primevue/button`: subpath-импорт тянет в сборку второй экземпляр PrimeVue, и тема перестаёт применяться к его компонентам.

## Загрузка модулей в контроллере

ES-модули регистрируются через `regClientStartupHTMLBlock` — так они грузятся после Import Map. Каждый скрипт — отдельным вызовом.

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
`addJavascript()` и `addLastJavascript()` не ставят `type="module"` — для ES-модулей они не годятся. Несколько тегов в одной строке с переносами MODX разобьёт неправильно: регистрируйте каждый отдельным вызовом.
:::

## Проверка наличия VueTools {#vuetools-check}

Без VueTools модули не разрешатся: в консоли появится `Failed to resolve module specifier "vue"`, а контейнер виджета останется пустым. Проверка находит Import Map и показывает понятное сообщение.

Метод `addVueModule()` в контроллере регистрирует модуль и один раз на страницу — скрипт-проверку:

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
        ?: 'Требуется пакет VueTools. Установите его через Менеджер пакетов.';

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

Атрибут `data-vue-module` нужен, чтобы при отсутствии VueTools удалить именно модули и не сыпать ошибками в консоль. Если компонент использует тему через `getActiveTheme()`, проверяйте ещё и ключ `vuetools/theme` — см. [Тема](theme#version).

Загрузку ведите через `addVueModule()`:

```php
$this->addVueModule($assetsUrl . 'js/mgr/vue-dist/my-widget.min.js');
```

Лексикон сообщения (на двух языках):

```php
$_lang['mycomponent_vuetools_required'] = 'Требуется пакет VueTools. Установите его через Менеджер пакетов.';
```

## Использование в компоненте

Vue, composable и компоненты PrimeVue импортируются из Import Map:

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

## Точка входа

Entry point создаёт приложение, задаёт тему через `getActiveTheme()` и монтирует виджет:

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

`dataset.vApp` защищает от повторного монтирования при повторной активации вкладки.

## Вкладка ExtJS

Контейнер обязан иметь класс `vueApp`, инициализация — при активации вкладки:

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
Без класса `vueApp` на контейнере стили PrimeVue не применятся.
:::

## Собственный API-клиент {#own-api-client}

`useApi` рассчитан на стандартный connector MODX. Если у компонента свой роутер, заведите локальный `request.js` — он собирает URL под ваш процессор-роутер и добавляет токен `HTTP_MODAUTH`:

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

## Чеклист

- [ ] `external` в `vite.config.js`: `vue`, `pinia`, `primevue`, используемые `@vuetools/*`.
- [ ] PrimeVue импортируется только через `primevue`, без subpath.
- [ ] Тема через `getActiveTheme()`, не жёстко прописанный пресет.
- [ ] `addVueModule()` с проверкой зависимости вместо прямого `regClientStartupHTMLBlock()`.
- [ ] Лексиконы сообщения об ошибке на двух языках.
- [ ] `class="vueApp"` на контейнерах виджетов.
- [ ] Топики лексиконов загружены в контроллере.
- [ ] Свой `request.js`, если у компонента свой роутер.

## Пример

[MiniShop3](https://github.com/modx-pro/MiniShop3) — интеграция со своим роутером.
