---
title: Интеграция вкладок товара
description: Руководство по добавлению собственных вкладок на страницу редактирования товара
---

# Интеграция вкладок товара

Свою вкладку на страницу редактирования товара в админке добавляет плагин MODX: он регистрирует Vue-компонент или панель ExtJS в `window.MS3ProductTabsRegistry`.

::: info Аналогичный API
Для вкладок заказа используйте [`MS3OrderTabsRegistry`](/components/minishop3/development/order-tabs-integration).
:::

## Архитектура

Страница редактирования товара гибридная: Vue-вкладки работают внутри ExtJS TabPanel.

```
ExtJS TabPanel (верхний уровень)
├── Документ (системная вкладка MODX)
├── Товар (Vue ProductTabs)
│   ├── Свойства товара (Vue)
│   ├── Галерея (Vue)
│   ├── Категории (Vue ProductCategoriesTab)
│   ├── Связи (Vue ProductLinksTab)
│   ├── Опции товара (Vue)
│   └── [Ваши вкладки]
├── Дополнительные поля (TV) (системная вкладка MODX)
├── Настройки (системная вкладка MODX)
└── Группы ресурсов (системная вкладка MODX)
```

Встроенные вкладки показываются не все и не всегда:

| Вкладка | Ключ | Позиция | Когда показывается |
| --- | --- | --- | --- |
| Свойства товара | `properties` | 0 | Всегда |
| Галерея | `gallery` | 1 | Если `show_gallery` не выключена |
| Категории | `categories` | 2 | Если `show_categories` не выключена |
| Связи | `links` | 3 | Если `show_links` не выключена |
| Опции товара | `options` | 4 | Если `show_options` не выключена и у товара есть опции |

## Регистрация вкладки

Метод `window.MS3ProductTabsRegistry.register(tabConfig)` принимает:

| Параметр | Тип | Обязательный | Описание |
| --- | --- | --- | --- |
| `key` | string | Да | Уникальный идентификатор вкладки |
| `title` | string | Да | Заголовок вкладки |
| `type` | string | Нет | `'vue'` (по умолчанию) или `'extjs'` |
| `component` | object | Для Vue | Объект компонента — например, импортированный SFC. Строковое имя подойдёт только если компонент уже зарегистрирован в приложении через `app.component()`; имена из `window` ядро не ищет |
| `xtype` | string | Для ExtJS | xtype ExtJS компонента |
| `extConfig` | object | Нет | Дополнительная конфигурация для ExtJS |
| `props` | object | Нет | Дополнительные props для Vue-компонента |
| `position` | number | Нет | Позиция вкладки среди остальных (по умолчанию `100`) |

**Возвращает:** `boolean` — успешность регистрации.

**Ключи встроенных вкладок** (`properties`, `gallery`, `categories`, `links`, `options`) занимать нельзя: ядро проверяет повторы только среди вкладок плагинов и такое совпадение не отлавливает.

## Что получает компонент

Эти данные вкладка получает автоматически:

| Параметр | Тип | Описание | Где доступен |
| --- | --- | --- | --- |
| `productId` | number | ID товара | props Vue-компонента |
| `record` | object | Данные товара | props Vue-компонента, `config.record` у панели ExtJS |

Для ExtJS-вкладок `record` подставляет в `extConfig` само ядро — передавать его не нужно.

## Порядок загрузки

`product-tabs.min.js` подключается как ES-модуль, а модули выполняются после разбора страницы. Поэтому обычный скрипт плагина всегда работает раньше, и в момент его выполнения `window.MS3ProductTabsRegistry` ещё не существует.

::: warning Заглушку создавать нельзя
На [странице заказа](/components/minishop3/development/order-tabs-integration#registry-stub) принят приём с заглушкой и очередью. Здесь он не работает: реестр создаётся как `window.MS3ProductTabsRegistry || new ProductTabsRegistry()`, то есть ваш объект-заглушка останется на месте настоящего реестра. Инициализация вкладок вызовет у него `_onMounted()`, которого нет, и ни одна вкладка из очереди не появится.

Вместо этого дождитесь появления реестра — см. [функцию ниже](#waiting-for-registry).
:::

<!-- MEDIA: diagram | must | Порядок загрузки двумя дорожками с общим началом: скрипт плагина выполняется раньше `product-tabs.min.js`, объекта `window.MS3ProductTabsRegistry` ещё нет. Верхняя дорожка с пометкой «нельзя»: плагин кладёт на его место заглушку → модуль создаёт `new ProductTabsRegistry()` только когда объекта нет, поэтому заглушка остаётся → инициализация вкладок вызывает у неё `_onMounted()` → `TypeError`, вкладки из очереди не появляются. Нижняя дорожка с пометкой «так надо»: плагин вызывает `whenRegistryReady` → объекта нет, повтор через 100 мс → модуль создаёт настоящий объект → следующий опрос его находит → вызывается `register()`. Только шаги, названные в тексте раздела. | Нарисовать по тексту предупреждения «Заглушку создавать нельзя» и подраздела «Ожидание реестра», а не по коду. SVG, фон прозрачный; две версии (русская и английская) из одного источника; имена из кода не переводить. Оформить так же, как схему порядка загрузки на странице заказа: обе страницы читаются парой. Не рисовать монтирование Vue-приложения и передачу очереди в него: в тексте раздела этого нет. -->

### Ожидание реестра {#waiting-for-registry}

Регистрацию откладывает эта функция — она годится и для Vue-, и для ExtJS-вкладок:

```javascript
function whenRegistryReady(callback, attemptsLeft) {
    if (window.MS3ProductTabsRegistry) {
        callback(window.MS3ProductTabsRegistry)
        return
    }
    if (attemptsLeft === undefined) attemptsLeft = 50 // ~5 секунд
    if (attemptsLeft <= 0) return
    setTimeout(function() { whenRegistryReady(callback, attemptsLeft - 1) }, 100)
}
```

Ограничение попыток обязательно: без него опрос не остановится там, где реестра не бывает — например, на странице создания товара.

В примерах ниже она вызывается по имени.

## Интеграция Vue-компонента

### 1. Создайте компонент

```vue
<!-- my-component/src/components/VariantsTab.vue -->
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

### 2. Создайте точку входа

```javascript
// my-component/src/entries/variants-tab.js
import VariantsTab from '../components/VariantsTab.vue'

whenRegistryReady(registry => {
  registry.register({
    key: 'variants',
    title: 'Варианты',
    type: 'vue',
    component: VariantsTab, // объект компонента, не строка
    position: 5, // после «Опций товара»
  })
})
```

### 3. Подключите скрипт плагином MODX

```php
<?php
// Плагин MODX — событие: msOnManagerCustomCssJs

$page = $scriptProperties['page'] ?? '';
if ($page !== 'product_update') {
    return;
}

$controller = $scriptProperties['controller'];
$assetsUrl = MODX_ASSETS_URL . 'components/mycomponent/';

$controller->addHtml(
    '<script type="module" src="' . $assetsUrl . 'js/variants-tab.min.js"></script>'
);
```

::: warning При создании товара вкладок нет
Событие поднимается и на странице создания, с `page => 'product_create'`, но `product-tabs.min.js` там не подключается, вкладки «Товар» на странице нет и реестр не появляется. Поэтому проверять `product_create` незачем: скрипт отработает впустую, а ожидание реестра будет опрашивать страницу до её закрытия. Свои вкладки доступны только у сохранённого товара.
:::

Vue-компонент внутри `ProductTabs` наследует стили контейнера `.vueApp`.

## Интеграция ExtJS-компонента

### 1. Создайте панель ExtJS

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

### 2. Зарегистрируйте вкладку

```javascript
// assets/components/mycomponent/js/mgr/product-integration.js
whenRegistryReady(function(registry) {
    registry.register({
        key: 'custom',
        title: 'Своя вкладка',
        type: 'extjs',
        xtype: 'mycomponent-custom-tab',
        extConfig: {
            // record ядро подставляет само, здесь — только свои параметры
            myParam: 'value'
        },
        position: 6
    });
});
```

`Ext.onReady()` для регистрации не годится: он срабатывает раньше, чем выполнится ES-модуль с реестром. Дождитесь реестра [функцией из раздела выше](#waiting-for-registry).

### 3. Подключите скрипты

```php
<?php
// Плагин MODX — событие: msOnManagerCustomCssJs

$page = $scriptProperties['page'] ?? '';
if ($page !== 'product_update' && $page !== 'product_create') {
    return;
}

$controller = $scriptProperties['controller'];
$assetsUrl = MODX_ASSETS_URL . 'components/mycomponent/';

// Сначала панель, затем регистрацию
$controller->addLastJavascript($assetsUrl . 'js/mgr/widgets/custom.panel.js');
$controller->addLastJavascript($assetsUrl . 'js/mgr/product-integration.js');
```

Панель ExtJS монтируется только при переключении на вкладку и уничтожается вместе со страницей.

## Позиционирование вкладок

Встроенные вкладки занимают позиции 0–4, своя вкладка без `position` получает `100`. Чтобы встать сразу за встроенными, задайте значение из диапазона 5–99.

`position: 0` до вкладки не доедет: ядро читает значение как `position || 100` и подставит `100`. Чтобы встать перед «Свойствами товара», нужно отрицательное число.

## Если вкладка не появилась

Причину ядро пишет в консоль, и префикс зависит от того, когда вкладку отклонили:

| Сообщение | Когда |
| --- | --- |
| `[ProductTabsRegistry] Tab must have key and title` | Не задан `key` или `title` |
| `[ProductTabsRegistry] Tab "…" already registered` | Повтор ключа в очереди, до передачи в Vue |
| `[ProductTabs] Tab with key "…" already registered` | Повтор ключа при регистрации на уже открытой странице |
| `TypeError: … _onMounted is not a function` | Вы создали заглушку — см. предупреждение в «Порядке загрузки» |

Фильтровать консоль по `[ProductTabs]` недостаточно: часть сообщений приходит с префиксом `[ProductTabsRegistry]`.

Что смотреть в консоли браузера:

```javascript
// Очередь вкладок, ещё не переданных в Vue
console.log(window.MS3ProductTabsRegistry.pendingTabs);
```

Непустая очередь после загрузки страницы означает, что вкладки не дошли до Vue.

<!-- MEDIA: output | must | Что пишет консоль браузера в случаях из этого раздела: по одной строке на причину с пометкой `console.error` или `console.warn` (нет `key` или `title`; повторный ключ) и строка `TypeError`, когда вместо `MS3ProductTabsRegistry` стоит заглушка. Рядом вывод `console.log(window.MS3ProductTabsRegistry.pendingTabs)`: пустой список при верной регистрации и непустой при заглушке. | Текстовый блок, не кадр. На стенде: временный плагин на событии `msOnManagerCustomCssJs` с проверкой `page === 'product_update'`. Первый заход: регистрация через `whenRegistryReady`, по одному ошибочному вызову на случай, открыть товар, скопировать строки из консоли. Второй заход: плагин создаёт заглушку `window.MS3ProductTabsRegistry = {pendingTabs: [], register: …}` и регистрирует верную вкладку; взять строку `TypeError` и вывод `pendingTabs`. Префиксы записать так, как они напечатаны, и проверить, зависят ли они от момента вызова. Второй аргумент с настройками вкладки заменить на `{…}`; у `TypeError` оставить первую строку без пути стенда. Плагин после съёмки удалить. -->
