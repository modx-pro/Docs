---
title: msRussianPost
---
# Сниппет msRussianPost

Подключает **стили**, **скрипт** `russianpost.js` (с атрибутом `defer`) и глобальный объект **`window.msRussianPostConfig`**: URL коннектора, список ID доставок MiniShop3, признак источника списка (`setting` / `auto` / `any`), флаг отладки, при необходимости — селектор поля индекса.

Вызывать **после** [msrpLexiconScript](msrpLexiconScript), в одной обёртке с чанками `tplRussianPostStatus` и `tplRussianPostMethods`.

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|---------------|
| **connectorUrl** | Полный URL `connector.php`, если отличается от авто | авто из `assets_url` |
| **indexSelector** | CSS-селектор поля почтового индекса | см. автопоиск ниже |
| **debug** | `1` / `true` / `yes` — расширенный лог в консоли | выкл. |

Если **`indexSelector`** не задан, скрипт ищет поле в порядке: значение из конфига → `[name="index"]` → `[name="order[data][index]"]` → `[data-msrp-index]`.

## Примеры

**Базовый вызов**

::: code-group

```modx
[[!msRussianPost]]
```

```fenom
{'msRussianPost' | snippet}
```

:::

**Кастомный URL коннектора и селектор индекса**

::: code-group

```modx
[[!msRussianPost?
    &connectorUrl=`https://example.com/assets/components/msrussianpost/connector.php`
    &indexSelector=`#order-zip`
]]
```

```fenom
{'msRussianPost' | snippet : [
    'connectorUrl' => 'https://example.com/assets/components/msrussianpost/connector.php',
    'indexSelector' => '#order-zip',
]}
```

:::

**Отладка**

::: code-group

```modx
[[!msRussianPost? &debug=`1`]]
```

```fenom
{'msRussianPost' | snippet : ['debug' => 1]}
```

:::

## Выход

HTML: тег `link` на `russianpost.css` (в URL добавлен параметр версии по `filemtime`), встроенный `script` с `window.msRussianPostConfig=…`, затем тег `script` с `src="…/russianpost.js"` и атрибутом `defer`.

## Зависимости от настроек

Список **`deliveryIds`** в конфиге формируется из системной настройки `msrussianpost_delivery_id` или автоматически из доставок с классом `msrussianpost\Delivery\RussianPostDelivery`. Поле **`deliveryIdsSource`** в JSON отражает источник: `setting`, `auto` или `any`.
