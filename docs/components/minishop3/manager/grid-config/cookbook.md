---
title: Cookbook колонок грида
description: Badge в списке заказов и inline-edit с select в category-products
---

# Cookbook колонок грида

Настройка колонок административных таблиц: видимость, тип, badge, relation, inline-edit.

Полный справочник: [Колонки гридов](/components/minishop3/interface/utilities/grid-columns).

<!-- ![Утилита «Колонки гридов»](/components/minishop3/screenshots/mgr-grid-columns.png) -->

## Цель

Вы меняете список заказов, покупателей или товаров в категории без правки Vue-компонентов. Конфиг хранится в `ms3_grid_fields`.

## grid_key в 1.13

| grid_key | Экран |
| --- | --- |
| `orders` | Список заказов |
| `order_products` | Товары внутри заказа |
| `customers` | Покупатели |
| `vendors` | Производители |
| `category-products` | Таблица товаров на ресурсе категории |

::: warning Inline-edit
Редактирование ячейки в гриде включено **только** для `category-products`. В `orders` inline-edit в 1.13 нет. Для списка заказов используйте badge, relation или model-колонки.
:::

## Кейс: badge статуса в заказах

В поставке MS3 колонка `order_status` показывает цветной статус:

- скрытые relation-колонки `status_name` и `status_color` подтягивают текст и HEX из `msOrderStatus`
- видимая колонка `order_status` с типом `badge`

Конфиг badge (фрагмент из `ms3_grid_fields`):

```json
{
  "type": "badge",
  "source_field": "status_name",
  "color_field": "status_color"
}
```

### Своя badge-колонка

1. **Утилиты → Колонки гридов** → грид **orders**.
2. Добавьте скрытые relation-колонки, если нужны `source_field` / `color_field` из связанной таблицы.
3. Добавьте колонку с типом **Badge**:
   - **Поле-источник** — имя колонки с текстом
   - **Поле цвета** — колонка с HEX (например `#3b82f6`)
4. Сохраните порядок колонок.

Через API:

```http
POST /api/mgr/grid-config/orders/field
```

```json
{
  "field_name": "my_badge",
  "label": "Метка",
  "type": "badge",
  "config": {
    "type": "badge",
    "source_field": "status_name",
    "color_field": "status_color"
  },
  "visible": true
}
```

<!-- ![Badge статуса в списке заказов](/components/minishop3/screenshots/mgr-orders.png) -->

## Кейс: relation с агрегацией (customers)

Колонка «Число заказов» у покупателя:

1. Грид **customers** → новая колонка, тип **relation**.
2. Параметры:
   - table: `msOrder`
   - foreignKey: `customer_id`
   - displayField: `id`
   - aggregation: `COUNT`

Агрегации: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`. Для `category-products` aggregation в relation **не поддерживается**.

## Кейс: inline-edit + select (category-products)

1. Грид **category-products** → выберите колонку (например `vendor_name` или extra-поле товара).
2. Включите **Редактирование в ячейке**.
3. **Тип редактора**: `select`.
4. **editor_options** — массив пар `[value, label]`:

```json
[
  ["1", "Склад A"],
  ["2", "Склад B"]
]
```

Для combo-редактора с API справочником используйте `editor_type: combo` и ключ из `editor_references` в ответе `GET /api/mgr/grid-config/category-products`.

<!-- ![Inline-edit в таблице товаров категории](/components/minishop3/screenshots/mgr-category-products.png) -->

## Кейс: колонка опции товара

1. Грид **category-products** → добавить колонку.
2. Тип **option**, в конфиге `option.key` = ключ опции (например `color`).
3. Имя колонки не должно совпадать со встроенными полями товара (используйте префикс `option_color` при конфликте).

## Кейс: price, weight, datetime

Типы **price**, **weight**, **datetime** форматируют значение model-колонки без PHP.

**Цена в гриде category-products:**

1. Колонка `price`, тип **price**.
2. displayConfig:

```json
{
  "decimals": 2,
  "currency": "₽",
  "currency_position": "after",
  "thousands_separator": " "
}
```

**Вес:**

```json
{
  "decimals": 2,
  "unit": "кг",
  "unit_position": "after"
}
```

**Дата создания заказа** (грид `orders`, поле `createdon`):

```json
{
  "format": "dd.MM.yyyy HH:mm"
}
```

## Кейс: computed-колонка

Тип **computed** вызывает PHP-класс на сервере. В config обязателен **`computed.className`**:

```json
{
  "type": "computed",
  "computed": {
    "className": "MyVendor\\Ms3\\Columns\\MarginColumn"
  }
}
```

Класс должен быть в autoload MODX и реализовывать `ComputedFieldInterface`. Для простого форматирования цены или даты достаточно типов **price** / **datetime**.

## API appendix

**Чтение** (`view_document`):

```http
GET /api/mgr/grid-config/orders?include_hidden=1
```

Ответ:

```json
{
  "columns": [ ... ],
  "direct_filter_keys": ["query", "status_id", "delivery_id"],
  "editor_references": []
}
```

`direct_filter_keys` — фильтры без префикса `filter_` в query списка. Для `orders` источник — `OrdersController::getDirectFilterKeys()`.

**Сохранение порядка и метаданных** (`mssetting_save`):

```http
PUT /api/mgr/grid-config/orders
```

```json
{
  "fields": [
    { "name": "id", "label": "ID", "visible": true, "sortable": true, "type": "model" },
    { "name": "order_status", "label": "Статус", "visible": true, "type": "badge", "source_field": "status_name", "color_field": "status_color" }
  ]
}
```

Тело PUT принимает массив **`fields`**, не `columns`.

| Метод | Путь |
| --- | --- |
| POST | `/api/mgr/grid-config/{grid_key}/field` |
| PUT | `/api/mgr/grid-config/{grid_key}/field/{field_name}` |
| DELETE | `/api/mgr/grid-config/{grid_key}/{field_name}` |

## Troubleshooting

| Симптом | Действие |
| --- | --- |
| 403 на PUT | `mssetting_save` |
| Badge без цвета | Проверьте `color_field` и HEX в данных строки |
| Combo editor ошибка | Whitelist `editor_references` только для category-products |
| Колонка не в списке заказов | `visible: true`, перезагрузите грид |

См. [routing: grid-config](/components/minishop3/development/routing.md), [Cookbook менеджера](/components/minishop3/manager/).
