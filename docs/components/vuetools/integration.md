# Интеграция в компонент

Пошаговое руководство по интеграции Vue 3 + PrimeVue в компонент MODX 3 с использованием VueTools.

## Настройка Vite

В `vite.config.js` укажите внешние зависимости, которые **не должны** включаться в бандл:

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import prefixSelector from 'postcss-prefix-selector'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      // Эти модули НЕ бандлятся — берутся из Import Map
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
  // Изоляция стилей от ExtJS
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

::: info Ключевой момент
Массив `external` указывает Vite **НЕ включать** эти зависимости в бандл. Браузер загрузит их из Import Map, зарегистрированного VueTools.
:::

### Установка зависимостей

```bash
npm install postcss-prefix-selector --save-dev
```

## Загрузка скриптов в PHP контроллере

### Базовый подход

```php
<?php
class MyComponentManagerController extends modExtraManagerController
{
    public function loadCustomCssJs()
    {
        $assetsUrl = $this->myComponent->config['assetsUrl'];

        // CSS вашего компонента (идёт в <head>)
        $this->addCss($assetsUrl . 'css/mgr/vue-dist/my-widget.min.css');

        // ES modules ОБЯЗАТЕЛЬНО через regClientStartupHTMLBlock
        $this->modx->regClientStartupHTMLBlock(
            '<script type="module" src="' . $assetsUrl . 'js/mgr/vue-dist/my-widget.min.js"></script>'
        );
    }
}
```

::: danger Критично

- Используйте `regClientStartupHTMLBlock()` для `<script type="module">`
- **НЕ** используйте `addJavascript()` или `addLastJavascript()` для ES modules — они не поддерживают `type="module"`
:::

### Правильная регистрация нескольких скриптов

```php
// ✅ ПРАВИЛЬНО — отдельные вызовы
$this->modx->regClientStartupHTMLBlock(
    '<script type="module" src="' . $assetsUrl . 'js/mgr/vue-dist/widget1.min.js"></script>'
);
$this->modx->regClientStartupHTMLBlock(
    '<script type="module" src="' . $assetsUrl . 'js/mgr/vue-dist/widget2.min.js"></script>'
);

// ❌ НЕПРАВИЛЬНО — multiline строка с несколькими тегами
$this->modx->regClientStartupHTMLBlock('
    <script type="module" src="' . $assetsUrl . 'js/mgr/vue-dist/widget1.min.js"></script>
    <script type="module" src="' . $assetsUrl . 'js/mgr/vue-dist/widget2.min.js"></script>
');
```

## Проверка наличия VueTools

При отсутствии VueTools на сайте Vue модули не загрузятся, а в консоли появятся ошибки. Рекомендуется реализовать проверку и показывать понятное сообщение пользователю.

### Метод addVueModule()

Создайте метод в базовом контроллере:

```php
<?php
class MyComponentManagerController extends modExtraManagerController
{
    /**
     * Флаг регистрации скрипта проверки (один раз на страницу)
     */
    protected static $vueCoreCheckRegistered = false;

    /**
     * Регистрация Vue ES module с проверкой зависимости VueTools
     *
     * @param string $src URL скрипта модуля
     */
    public function addVueModule(string $src): void
    {
        // Регистрируем скрипт проверки только один раз на страницу
        if (!self::$vueCoreCheckRegistered) {
            $this->registerVueCoreCheck();
            self::$vueCoreCheckRegistered = true;
        }

        // Добавляем версию для сброса кэша
        $src = $src . '?v=' . $this->myComponent->version;

        // Регистрируем модуль с атрибутом data-vue-module
        $this->modx->regClientStartupHTMLBlock(
            '<script type="module" data-vue-module src="' . $src . '"></script>'
        );
    }

    /**
     * Регистрация inline скрипта проверки Import Map
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
        // Удаляем все скрипты с атрибутом data-vue-module
        document.querySelectorAll('script[type="module"][data-vue-module]').forEach(function(el) {
            el.remove();
        });

        // Показываем MODX алерт
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

### Использование

```php
public function loadCustomCssJs()
{
    $assetsUrl = $this->myComponent->config['assetsUrl'];

    // CSS (как обычно)
    $this->addCss($assetsUrl . 'css/mgr/vue-dist/my-widget.min.css');

    // ✅ С проверкой зависимости
    $this->addVueModule($assetsUrl . 'js/mgr/vue-dist/my-widget.min.js');
    $this->addVueModule($assetsUrl . 'js/mgr/vue-dist/another-widget.min.js');
}
```

### Лексиконы

Добавьте лексиконы для сообщения об ошибке:

```php
// lexicon/ru/default.inc.php
$_lang['mycomponent_error'] = 'Ошибка';
$_lang['mycomponent_vuetools_required'] = 'Для работы требуется пакет VueTools. Установите его через Менеджер пакетов.';

// lexicon/en/default.inc.php
$_lang['mycomponent_error'] = 'Error';
$_lang['mycomponent_vuetools_required'] = 'VueTools package is required. Please install it via Package Manager.';
```

### Результат

| Без проверки | С проверкой |
|--------------|-------------|
| Ошибки `Failed to resolve module specifier "vue"` в консоли | Чистая консоль |
| Vue виджеты не работают | Понятный MODX алерт с инструкцией |
| Пользователь не понимает проблему | Пользователь знает что делать |

## Использование в Vue компонентах

```vue
<script setup>
// Vue импортируется из Import Map (не бандлится)
import { ref, computed, onMounted } from 'vue'

// Pinia из Import Map
import { createPinia } from 'pinia'

// PrimeVue компоненты из Import Map
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

// Composables из VueTools
import { useLexicon } from '@vuetools/useLexicon'
import { useModx } from '@vuetools/useModx'
import { usePermission } from '@vuetools/usePermission'

const { _ } = useLexicon()
const { modx, config } = useModx()
const { hasPermission } = usePermission()

// Ваш код компонента
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

## Entry Point (точка входа)

Создайте entry point для инициализации Vue приложения:

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

  // Предотвращаем повторную инициализацию
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

// Export для глобального доступа из ExtJS
window.MyComponentWidget = { init, destroy }
```

## Интеграция в ExtJS вкладку

```javascript
// В ExtJS панели
{
  title: _('my_tab_title'),
  id: 'my-vue-tab',
  html: '<div id="my-vue-widget" class="vueApp"></div>',
  listeners: {
    activate: function() {
      // Инициализация при активации вкладки
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

::: warning Важно
Не забудьте добавить класс `vueApp` к контейнеру — без него стили PrimeVue не применятся.
:::

## Собственный API клиент

Если ваш компонент использует **собственный роутер** (не стандартный MODX connector), создайте локальный `request.js`:

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

    // Ваш процессор-роутер
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

Использование:

```javascript
// Вместо useApi из VueTools
import request from '../request.js'

const products = await request.get('/api/products', { limit: 20 })
await request.post('/api/products', { name: 'New Product' })
```

## Чеклист интеграции

- [ ] Добавить `vuetools` в зависимости пакета (setup options)
- [ ] Настроить `external` в vite.config.js
- [ ] Настроить postcss prefix selector для изоляции стилей
- [ ] Реализовать `addVueModule()` с проверкой зависимости
- [ ] Добавить лексиконы для сообщения об ошибке
- [ ] Использовать `addVueModule()` вместо `regClientStartupHTMLBlock()`
- [ ] Добавить `class="vueApp"` к контейнерам Vue
- [ ] Загрузить топики лексиконов в контроллере
- [ ] Создать локальный `request.js` если используете собственный роутер

## Примеры

- **[MiniShop3](https://github.com/modx-pro/MiniShop3)** — полная интеграция с собственным роутером
