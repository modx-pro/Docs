---
title: Интеграция вкладок заказа
description: Руководство по добавлению собственных вкладок на страницу заказа
---

# Интеграция вкладок заказа

MiniShop3 предоставляет API для добавления собственных вкладок на страницу заказа в админке. Вы можете интегрировать как Vue компоненты, так и ExtJS панели.

::: info Аналогичный API
Для вкладок товара используйте [`MS3ProductTabsRegistry`](/components/minishop3/development/product-tabs-integration).
:::

## Архитектура

Страница заказа — полностью Vue-приложение (в отличие от товара, где Vue встроен в ExtJS):

```
Vue OrderView (корневой компонент)
├── Информация (position: 0)
├── Товары (position: 1, скрыта при создании)
├── Адрес (position: 2)
├── История (position: 3, скрыта при создании)
└── [Ваши вкладки] (position: 4+)
```

## Registry API

Для регистрации вкладок используется глобальный объект `window.MS3OrderTabsRegistry`.

### `register(tabConfig)`

Регистрирует новую вкладку.

**Параметры:**

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `key` | string | Да | Уникальный идентификатор вкладки |
| `title` | string | Да | Заголовок вкладки |
| `type` | string | Нет | `'vue'` (по умолчанию) или `'extjs'` |
| `component` | object/string | Для Vue | Vue компонент (SFC объект или имя) |
| `xtype` | string | Для ExtJS | xtype ExtJS компонента |
| `extConfig` | object | Нет | Дополнительная конфигурация для ExtJS |
| `props` | object | Нет | Дополнительные props для Vue компонента |
| `position` | number | Нет | Позиция вкладки (по умолчанию `100`) |
| `hideOnCreate` | boolean | Нет | Скрыть при создании нового заказа |

**Возвращает:** `boolean` — успешность регистрации.

**Зарезервированные ключи:** `info`, `products`, `address`, `history` — использовать нельзя.

### Данные, передаваемые в компонент

Каждая плагин-вкладка автоматически получает:

| Параметр | Тип | Описание |
|----------|-----|----------|
| `orderId` | number | ID заказа (0 при создании) |
| `order` | object | Данные заказа |
| `config` | object | Конфигурация ms3 (`ms3.config`) |
| `isCreateMode` | boolean | Режим создания нового заказа |

## Подключение через MODX плагин

Вкладки регистрируются через событие `msOnManagerCustomCssJs` с проверкой `page === 'order'`:

```php
<?php
/**
 * Событие: msOnManagerCustomCssJs
 */

$page = $scriptProperties['page'] ?? '';
if ($page !== 'order') {
    return;
}

/** @var msManagerController $controller */
$controller = $scriptProperties['controller'];

// Подключаем скрипт с регистрацией вкладки
$controller->addHtml('
<script>
// ... регистрация вкладки (см. примеры ниже)
</script>
');
```

::: warning Порядок загрузки
Скрипт из `msOnManagerCustomCssJs` выполняется **до** загрузки Vue-модуля (`order.min.js`).
В этот момент `MS3OrderTabsRegistry` ещё не существует — необходимо создать заглушку с очередью (см. примеры ниже). Vue-модуль при загрузке подхватит `pendingTabs` из заглушки.
:::

## Интеграция Vue компонента

### Inline-компонент (простой вариант)

Подходит для простых вкладок без сборки:

```php
<?php
// Плагин MODX — событие: msOnManagerCustomCssJs

$page = $scriptProperties['page'] ?? '';
if ($page !== 'order') {
    return;
}

$controller = $scriptProperties['controller'];

$controller->addHtml('
<script>
(function() {
    if (!window.MS3OrderTabsRegistry) {
        window.MS3OrderTabsRegistry = {
            pendingTabs: [],
            register: function(c) { this.pendingTabs.push(c); return true; }
        };
    }

    window.MS3OrderTabsRegistry.register({
        key: "delivery-tracking",
        title: "Отслеживание",
        type: "vue",
        component: {
            props: ["orderId", "order", "config", "isCreateMode"],
            template: "<div style=\"padding: 20px\">"
                + "<h3>Отслеживание доставки</h3>"
                + "<p>Заказ #{{ order?.num }}, ID: {{ orderId }}</p>"
                + "</div>"
        },
        position: 5,
        hideOnCreate: true
    });
})();
</script>
');
```

### SFC-компонент (рекомендуемый вариант)

Для полноценных компонентов со сборкой через Vite/Webpack:

**1. Создайте Vue компонент:**

```vue
<!-- my-addon/src/OrderTrackingTab.vue -->
<template>
  <div class="tracking-tab">
    <h3>Отслеживание доставки</h3>
    <p>Заказ #{{ order?.num }}</p>
    <p>Статус: {{ trackingStatus }}</p>
    <button @click="refreshTracking">Обновить</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  orderId: { type: Number, required: true },
  order: { type: Object, default: null },
  config: { type: Object, default: () => ({}) },
  isCreateMode: { type: Boolean, default: false }
})

const trackingStatus = ref('Загрузка...')

async function refreshTracking() {
  // Ваша логика получения данных
  const response = await fetch(`/api/tracking/${props.orderId}`)
  const data = await response.json()
  trackingStatus.value = data.status
}

onMounted(() => {
  if (props.orderId) {
    refreshTracking()
  }
})
</script>
```

**2. Создайте entry point:**

```javascript
// my-addon/src/entries/order-tab.js
import OrderTrackingTab from '../components/OrderTrackingTab.vue'

;(function() {
  if (!window.MS3OrderTabsRegistry) {
    window.MS3OrderTabsRegistry = {
      pendingTabs: [],
      register: function(c) { this.pendingTabs.push(c); return true; }
    }
  }

  window.MS3OrderTabsRegistry.register({
    key: 'tracking',
    title: 'Отслеживание',
    type: 'vue',
    component: OrderTrackingTab, // объект SFC, не строка
    position: 5,
    hideOnCreate: true
  })
})()
```

**3. Подключите в MODX плагине:**

```php
<?php
// Событие: msOnManagerCustomCssJs

$page = $scriptProperties['page'] ?? '';
if ($page !== 'order') {
    return;
}

$controller = $scriptProperties['controller'];
$assetsUrl = MODX_ASSETS_URL . 'components/myaddon/';

// ES-модуль со сборкой
$controller->addHtml(
    '<script type="module" src="' . $assetsUrl . 'js/order-tab.min.js"></script>'
);
```

::: tip Реактивность
Vue-вкладки получают **реактивные** props. При загрузке заказа, сохранении или редактировании — props обновляются автоматически. Ваш компонент может использовать `watch` и `computed` для реакции на изменения.
:::

## Интеграция ExtJS компонента

### 1. Создайте ExtJS панель

```javascript
// assets/components/myaddon/js/mgr/delivery-panel.js
Ext.define('MyAddon.panel.DeliveryInfo', {
  extend: 'Ext.Panel',
  xtype: 'myaddon-delivery-panel',

  initComponent: function() {
    // this.orderId, this.order, this.config, this.isCreateMode
    // доступны из конфигурации
    Ext.apply(this, {
      border: false,
      bodyStyle: 'padding: 15px',
      html: '<h3>Информация о доставке</h3>'
          + '<p>Заказ ID: ' + this.orderId + '</p>'
    })

    MyAddon.panel.DeliveryInfo.superclass.initComponent.call(this)
  }
})
```

### 2. Зарегистрируйте вкладку и подключите скрипты

```php
<?php
// Плагин — событие: msOnManagerCustomCssJs

$page = $scriptProperties['page'] ?? '';
if ($page !== 'order') {
    return;
}

$controller = $scriptProperties['controller'];
$assetsUrl = MODX_ASSETS_URL . 'components/myaddon/';

// Сначала панель
$controller->addJavascript($assetsUrl . 'js/mgr/delivery-panel.js');

// Затем регистрация
$controller->addHtml('
<script>
(function() {
    if (!window.MS3OrderTabsRegistry) {
        window.MS3OrderTabsRegistry = {
            pendingTabs: [],
            register: function(c) { this.pendingTabs.push(c); return true; }
        };
    }

    window.MS3OrderTabsRegistry.register({
        key: "delivery-info",
        title: "Доставка",
        type: "extjs",
        xtype: "myaddon-delivery-panel",
        extConfig: {
            customParam: "value"
        },
        position: 6,
        hideOnCreate: true
    });
})();
</script>
');
```

::: warning Снимок данных
ExtJS-вкладка создаётся **один раз** при первом переключении на неё. Значения `order`, `orderId`, `config`, `isCreateMode` — это снимок на момент создания. Если заказ будет сохранён или изменён, ExtJS-панель **не получит** обновлённые данные автоматически. Для обновления данных реализуйте собственную логику (polling, подписка на события).
:::

## Позиционирование вкладок

Встроенные вкладки имеют фиксированные позиции:

| Вкладка | Позиция | Скрыта при создании |
|---------|---------|---------------------|
| Информация | 0 | Нет |
| Товары | 1 | Да |
| Адрес | 2 | Нет |
| История | 3 | Да |

Рекомендуемые позиции для кастомных вкладок: **4–99**.

Вкладки с одинаковой позицией сортируются в порядке регистрации.

## Валидация

Registry проверяет конфигурацию при регистрации:

- `key` и `title` — обязательны
- `key` не должен совпадать с зарезервированными (`info`, `products`, `address`, `history`)
- `type: 'vue'` требует `component`
- `type: 'extjs'` требует `xtype`
- Дубликат `key` — регистрация отклоняется

При ошибке `register()` возвращает `false` и выводит `console.error`.

## Отладка

```javascript
// Состояние registry
console.log(window.MS3OrderTabsRegistry)

// Проверить: Vue замонтирован?
console.log(window.MS3OrderTabsRegistry._mounted)

// Экземпляр OrderView
console.log(window.MS3OrderTabsRegistry._instance)

// Очередь до маунта (должна быть пуста после загрузки)
console.log(window.MS3OrderTabsRegistry.pendingTabs)
```

## Полный пример: плагин доставки

```php
<?php
/**
 * Плагин: Вкладка отслеживания доставки в заказе
 * Событие: msOnManagerCustomCssJs
 */

$page = $scriptProperties['page'] ?? '';
if ($page !== 'order') {
    return;
}

$controller = $scriptProperties['controller'];
$assetsUrl = MODX_ASSETS_URL . 'components/mydelivery/';

// Конфигурация для JS
$orderId = (int)($_GET['id'] ?? 0);
$deliveryConfig = [
    'apiUrl' => $assetsUrl . 'connector.php',
    'orderId' => $orderId,
    'apiKey' => $modx->getOption('mydelivery_api_key'),
];

// Передаём конфигурацию и регистрируем вкладку
$controller->addHtml('
<script>
    window.MyDeliveryConfig = ' . json_encode($deliveryConfig) . ';

    (function() {
        if (!window.MS3OrderTabsRegistry) {
            window.MS3OrderTabsRegistry = {
                pendingTabs: [],
                register: function(c) { this.pendingTabs.push(c); return true; }
            };
        }

        window.MS3OrderTabsRegistry.register({
            key: "delivery-tracking",
            title: "' . $modx->lexicon('mydelivery_tab_title') . '",
            type: "vue",
            component: {
                props: ["orderId", "order", "config", "isCreateMode"],
                data: function() {
                    return { status: "Загрузка...", tracking: null }
                },
                template: "<div style=\"padding: 20px\">"
                    + "<h3>' . $modx->lexicon('mydelivery_tracking') . '</h3>"
                    + "<p><b>Заказ:</b> #{{ order?.num }}</p>"
                    + "<p><b>Статус:</b> {{ status }}</p>"
                    + "<pre v-if=\"tracking\">{{ JSON.stringify(tracking, null, 2) }}</pre>"
                    + "<button @click=\"refresh\">Обновить</button>"
                    + "</div>",
                methods: {
                    refresh: function() {
                        var self = this;
                        var cfg = window.MyDeliveryConfig || {};
                        fetch(cfg.apiUrl + "?action=track&order_id=" + this.orderId)
                            .then(function(r) { return r.json() })
                            .then(function(data) {
                                self.status = data.status || "Неизвестно";
                                self.tracking = data;
                            });
                    }
                },
                mounted: function() {
                    if (this.orderId) this.refresh();
                }
            },
            position: 5,
            hideOnCreate: true
        });
    })();
</script>
');
```
