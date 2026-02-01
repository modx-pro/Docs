---
title: Интеграция вкладок товара
description: Руководство по добавлению собственных вкладок на страницу редактирования товара
---

# Интеграция вкладок товара

MiniShop3 предоставляет API для добавления собственных вкладок на страницу редактирования товара. Вы можете интегрировать как Vue компоненты, так и ExtJS панели.

## Архитектура

Страница редактирования товара использует гибридную архитектуру:

```
ExtJS TabPanel (верхний уровень)
├── Document (системная вкладка MODX)
├── Товар (Vue ProductTabs)
│   ├── Свойства (Vue)
│   ├── Галерея (ExtJS + Vue uploader)
│   ├── Категории (ExtJS)
│   ├── Связи (ExtJS)
│   ├── Опции (ExtJS)
│   └── [Ваши вкладки]
├── Page Settings (системная вкладка MODX)
└── Access Permissions (системная вкладка MODX)
```

Вкладка "Товар" содержит Vue компонент `ProductTabs` с PrimeVue TabView, который управляет вложенными вкладками.

## Plugin Registry API

Для регистрации вкладок используется глобальный объект `window.MS3ProductTabsRegistry`.

### Методы

#### `register(tabConfig)`

Регистрирует новую вкладку.

**Параметры:**

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `key` | string | Да | Уникальный идентификатор вкладки |
| `title` | string | Да | Заголовок вкладки (отображается в табе) |
| `type` | string | Нет | Тип вкладки: `'vue'` или `'extjs'` (по умолчанию `'vue'`) |
| `component` | string | Для Vue | Имя Vue компонента |
| `xtype` | string | Для ExtJS | xtype ExtJS компонента |
| `extConfig` | object | Нет | Дополнительная конфигурация для ExtJS компонента |
| `props` | object | Нет | Props для Vue компонента |
| `position` | number | Нет | Позиция вкладки (по умолчанию `100`) |

**Возвращает:** `boolean` - успешность регистрации

## Интеграция Vue компонента

### Шаг 1: Создайте Vue компонент

```javascript
// my-component/src/VariantsTab.vue
<template>
  <div class="variants-tab">
    <h3>Варианты товара #{{ productId }}</h3>
    <!-- Ваш контент -->
  </div>
</template>

<script setup>
defineProps({
  productId: {
    type: Number,
    required: true
  },
  record: {
    type: Object,
    required: true
  }
})
</script>
```

### Шаг 2: Создайте entry point

```javascript
// my-component/src/entries/variants-tab.js
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import VariantsTab from '../components/VariantsTab.vue'

// Регистрируем компонент глобально
window.MS3VariantsTab = VariantsTab

// Регистрируем вкладку
if (window.MS3ProductTabsRegistry) {
  window.MS3ProductTabsRegistry.register({
    key: 'variants',
    title: 'Варианты',
    type: 'vue',
    component: 'MS3VariantsTab',
    position: 5 // После Опций
  })
}
```

### Шаг 3: Подключите скрипт в контроллере MODX

```php
// core/components/mycomponent/controllers/product.class.php
public function loadCustomCssJs()
{
    $assetsUrl = $this->modx->getOption('mycomponent.assets_url');

    // Подключаем после product-tabs.min.js
    $this->addLastJavascript($assetsUrl . 'js/variants-tab.min.js');
}
```

### Шаг 4: Обработка в ProductTabs

Для полной интеграции Vue компонента, вам нужно зарегистрировать его в ProductTabs. Добавьте обработку в шаблоне:

```vue
<!-- В ProductTabs.vue уже есть поддержка plugin компонентов -->
<template v-else-if="tab.type === 'vue' && tab.component">
  <component
    :is="getComponent(tab.component)"
    v-bind="tab.props"
    :product-id="productId"
    :record="record"
  />
</template>
```

```javascript
// В script setup
function getComponent(name) {
  // Ищем компонент в глобальном scope
  return window[name] || null
}
```

## Интеграция ExtJS компонента

### Шаг 1: Создайте ExtJS панель

```javascript
// assets/components/mycomponent/js/mgr/widgets/custom.panel.js
MyComponent.panel.CustomTab = function(config) {
    config = config || {};

    Ext.apply(config, {
        border: false,
        layout: 'anchor',
        items: [{
            xtype: 'modx-grid',
            // ... конфигурация грида
        }]
    });

    MyComponent.panel.CustomTab.superclass.constructor.call(this, config);
};
Ext.extend(MyComponent.panel.CustomTab, MODx.Panel);
Ext.reg('mycomponent-custom-tab', MyComponent.panel.CustomTab);
```

### Шаг 2: Зарегистрируйте вкладку

```javascript
// assets/components/mycomponent/js/mgr/product-integration.js
Ext.onReady(function() {
    if (window.MS3ProductTabsRegistry) {
        window.MS3ProductTabsRegistry.register({
            key: 'custom',
            title: 'Кастомная вкладка',
            type: 'extjs',
            xtype: 'mycomponent-custom-tab',
            extConfig: {
                // record передаётся автоматически!
                // Дополнительные параметры:
                myParam: 'value'
            },
            position: 6
        });
    }
});
```

::: tip Автоматическая передача record
Для ExtJS вкладок `record` с данными товара передаётся автоматически в `extConfig`. Вам не нужно указывать его явно.
:::
```

### Шаг 3: Подключите скрипты

```php
public function loadCustomCssJs()
{
    $assetsUrl = $this->modx->getOption('mycomponent.assets_url');

    // Сначала панель
    $this->addLastJavascript($assetsUrl . 'js/mgr/widgets/custom.panel.js');
    // Затем интеграцию
    $this->addLastJavascript($assetsUrl . 'js/mgr/product-integration.js');
}
```

## Позиционирование вкладок

Встроенные вкладки имеют следующие позиции:

| Вкладка | Позиция |
|---------|---------|
| Свойства | 0 |
| Галерея | 1 |
| Категории | 2 |
| Связи | 3 |
| Опции | 4 |

Рекомендуемые позиции для кастомных вкладок: **5-99**.

## Доступ к данным товара

Ваш компонент автоматически получает:

### Vue компоненты

```javascript
const props = defineProps({
  productId: Number,  // ID товара
  record: Object      // Полные данные товара
})

// Использование
console.log(props.record.pagetitle)
console.log(props.record.price)
```

### ExtJS компоненты

```javascript
MyComponent.panel.CustomTab = function(config) {
    // config.record содержит данные товара
    console.log(config.record.id);
    console.log(config.record.pagetitle);

    // ...
};
```

## Пример: Интеграция ms3Variants

```javascript
// variants.wrapper.js
(function() {
    'use strict';

    // Ждём загрузки MS3ProductTabsRegistry
    function registerVariantsTab() {
        if (!window.MS3ProductTabsRegistry) {
            setTimeout(registerVariantsTab, 100);
            return;
        }

        window.MS3ProductTabsRegistry.register({
            key: 'variants',
            title: _('ms3variants_tab_title') || 'Варианты',
            type: 'extjs',
            xtype: 'ms3variants-product-panel',
            extConfig: {
                // record передаётся автоматически
            },
            position: 5
        });

        console.log('[ms3Variants] Tab registered');
    }

    // Запускаем регистрацию
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerVariantsTab);
    } else {
        registerVariantsTab();
    }
})();
```

## Важные замечания

1. **Порядок загрузки**: Ваши скрипты должны загружаться ПОСЛЕ `product-tabs.min.js`

2. **Уникальность ключей**: Каждая вкладка должна иметь уникальный `key`

3. **Ленивая загрузка**: ExtJS компоненты монтируются только при переключении на вкладку

4. **Очистка ресурсов**: При уничтожении страницы ExtJS компоненты автоматически уничтожаются

5. **CSS изоляция**: Vue компоненты внутри ProductTabs наследуют стили из `.vueApp` контейнера

## Отладка

Проверьте регистрацию вкладки в консоли:

```javascript
// Проверить зарегистрированные вкладки
console.log(window.MS3ProductTabsRegistry.pendingTabs);

// Проверить экземпляр ProductTabs
console.log(window.MS3ProductTabsRegistry._instance);
```
