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
| **indexSelector** | CSS-селектор поля почтового индекса | пусто, работает автопоиск |
| **debug** | `1` / `true` / `yes` — расширенный лог в консоли | выкл |

`connectorUrl` и `indexSelector` объявлены в свойствах сниппета, `debug` там не объявлен: его задают только в вызове или через `?msrp_debug=1` (см. [Отладка](../integration#отладка)).

## Автопоиск поля индекса {#автопоиск-поля-индекса}

Если **`indexSelector`** задан, скрипт берёт значение **только** из этого элемента: его `value`, а при пустом `value` — атрибут `data-msrp-index`. Остальные поля он не смотрит.

Если **`indexSelector`** пусто, скрипт делает один проход по всем `input`, `textarea` и `select` страницы и берёт значение первого, у которого `name` совпадает с `index` или `order[data][index]`. Следующий шаг — первый элемент с атрибутом **`data-msrp-index`** (его `value`, иначе сам атрибут). Если не найдено ни того, ни другого, индекс пустой и виджет показывает лексикон `msrussianpost_error_no_index`.

Расчёт запускается только для шести цифр, лишние символы отбрасываются (`russianpost.js`).

## Примеры

### Базовый вызов

::: code-group

```modx
[[!msRussianPost]]
```

```fenom
{'msRussianPost' | snippet}
```

:::

### Кастомный URL коннектора и селектор индекса

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

### Отладка

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

Пример `window.msRussianPostConfig` без параметров в вызове:

```json
{
  "connectorUrl": "https://example.com/assets/components/msrussianpost/connector.php",
  "deliveryIds": [5],
  "deliveryIdsSource": "auto",
  "debug": false
}
```

Поле `indexSelector` попадает в объект только когда параметр задан.

## Зависимости от настроек

Список **`deliveryIds`** в конфиге формируется из системной настройки `msrussianpost_delivery_id` или автоматически из доставок с классом `msrussianpost\Delivery\RussianPostDelivery`. Поле **`deliveryIdsSource`** в JSON отражает источник: `setting`, `auto` или `any`.

Если настройка пустая и подходящих доставок в MiniShop3 нет, сниппет пишет `deliveryIds: []` и `deliveryIdsSource: "any"` — виджет считается активным для любой доставки.
