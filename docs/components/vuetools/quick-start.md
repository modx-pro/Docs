---
title: Быстрый старт VueTools
description: От установки VueTools до виджета на вкладке менеджера
---

# Быстрый старт

Цель: виджет Vue на вкладке менеджера без своей копии Vue / Pinia / PrimeVue.

## 1. Установите VueTools

**Приложения → Установщик → Загрузить дополнения → VueTools**.

Плагин `VueCoreManager` вставит Import Map и `window.VueTools`. Проверка: в HTML менеджера есть `script type="importmap"` с ключами `vue`, `pinia`, `primevue`.

## 2. Сборка Extra

В `vite.config.js` вынесите runtime во `external` (см. [Интеграция](integration)). Минимальный набор:

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

PrimeVue только из `primevue` (не subpath). Тема: `getActiveTheme()` из `@vuetools/useTheme`.

## 3. Точка входа

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

## 4. Контроллер

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

Не используйте `addJavascript()` для ES-модулей. Полный шаблон с проверкой Import Map: [Интеграция](integration#vuetools-check).

Зависимость transport-пакета Extra: сигнатура **`vuetools`**.

## 5. Вкладка ExtJS

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

Класс `vueApp` нужен для иконок PrimeIcons.

## 6. Первая проверка

1. Откройте страницу компонента в менеджере.
2. Активируйте вкладку.
3. В консоли нет `Failed to resolve module specifier "vue"`.
4. Кнопка / таблица PrimeVue рисуются в теме из `vuetools.theme` (`aura` или `modx`).

Дальше: [Практики и CRUD](practices), [API Composables](composables), [Тема](theme).
