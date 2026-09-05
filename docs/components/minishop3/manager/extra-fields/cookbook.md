---
title: Cookbook дополнительных полей
description: Создание extra fields, xtype, repeater и key-value для заказа и товара
---

# Cookbook дополнительных полей

Extra field добавляет колонку в таблицу модели и виджет в Vue-форме. Справочник всех параметров: [Дополнительные поля](/components/minishop3/interface/utilities/extra-fields).

<!-- ![Утилита «Дополнительные поля»](/components/minishop3/screenshots/mgr-extra-fields.png) -->

## Цель

Вы выбираете модель, ключ и xtype. После миграции поле доступно в менеджере и (для `msProductData`) может попасть в импорт CSV.

## Когда использовать

| Задача | Extra field |
| --- | --- |
| Новая колонка «оптовая цена» на товаре | да |
| Комментарий менеджера на заказе | да |
| Перенести `price` в другую секцию без новой колонки | нет → [поля модели](/components/minishop3/manager/model-fields/cookbook) |
| Изменить порядок полей на вкладке «Данные» | нет → [поля товара](/components/minishop3/interface/utilities/product-fields) |

## Модели (class)

В UI и в POST указывайте полное имя класса:

| Модель в UI | class |
| --- | --- |
| msProductData | `MiniShop3\Model\msProductData` |
| msOrder | `MiniShop3\Model\msOrder` |
| msOrderAddress | `MiniShop3\Model\msOrderAddress` |
| msVendor | `MiniShop3\Model\msVendor` |
| msCategory | `MiniShop3\Model\msCategory` |

Для заказа есть [сквозной пример](/components/minishop3/manager/examples/order-custom-field).

## xtype в 1.13

| xtype | Назначение |
| --- | --- |
| `textfield` | Строка |
| `numberfield` | Число |
| `textarea` | Многострочный текст |
| `xcheckbox` | Да/нет |
| `ms3-combo-select` | Select из `select_options` |
| `ms3-repeater` | Таблица строк (JSON) |
| `ms3-key-value` | Пары ключ → значение (JSON) |
| `ms3-combo-vendor` | Производитель |
| `ms3-combo-autocomplete` | Autocomplete по API |
| `ms3-combo-options` | Опция товара |

Типы «текстовый редактор» и «дата» в 1.13 в UI extra fields не входят. Следите за [issue #610](https://github.com/modx-pro/MiniShop3/issues/610) и [#612](https://github.com/modx-pro/MiniShop3/issues/612).

## Кейс: select на товаре

1. **Утилиты → Дополнительные поля** → класс **msProductData**.
2. Ключ `supply_type`, xtype `ms3-combo-select`.
3. В **select_options** (JSON или текст в UI):

```json
[
  ["stock", "Со склада"],
  ["on_request", "Под заказ"]
]
```

Укажите dbtype `varchar` и phptype `string`.

Для `msProductData` пакет создаёт связанную запись в `ms3_product_fields`, чтобы поле появилось на вкладке «Данные».

## Кейс: repeater

1. xtype `ms3-repeater`, dbtype/phptype `json`.
2. Конфиг **repeater_config**:

```json
{
  "columns": [
    { "key": "name", "label": "Название" },
    { "key": "qty", "label": "Кол-во", "type": "number" }
  ],
  "minRows": 0,
  "maxRows": 50,
  "sortable": true,
  "rankField": "rank"
}
```

Repeater в CSV-импорт не попадает.

## Кейс: key-value

1. xtype `ms3-key-value`, dbtype/phptype `json`.
2. Конфиг **key_value_config**:

```json
{
  "mode": "fixed",
  "keys": [
    { "key": "width", "label": "Ширина", "valueType": "number", "required": false },
    { "key": "material", "label": "Материал", "valueType": "string", "required": true }
  ]
}
```

`mode: free` разрешает добавлять пары в форме.

## Вывод на форме заказа

После создания поля для `MiniShop3\Model\msOrder` откройте карточку заказа. Секция **Дополнительные поля заказа** строится из `GET /api/mgr/extra-fields` и `OrderExtraFieldsSection.vue`.

Сохранение: ключ поля на верхнем уровне `PUT /api/mgr/orders/{id}` (см. [пример](/components/minishop3/manager/examples/order-custom-field)).

<!-- ![Дополнительные поля заказа на карточке](/components/minishop3/screenshots/mgr-order-extra-field.png) -->

## API appendix

| Метод | Путь | Права |
| --- | --- | --- |
| GET | `/api/mgr/extra-fields?class={class}` | `mssetting_save` |
| GET | `/api/mgr/extra-fields/{id}` | `mssetting_save` |
| POST | `/api/mgr/extra-fields` | `mssetting_save` |
| PUT | `/api/mgr/extra-fields/{id}` | `mssetting_save` |
| DELETE | `/api/mgr/extra-fields/{id}` | `mssetting_save` |

После POST/DELETE пакет прогоняет Phinx-миграцию. Не прерывайте процесс и проверьте лог MODX при ошибке.

## Troubleshooting

| Симптом | Действие |
| --- | --- |
| «Column already exists» | Колонка уже в таблице или дубликат ключа |
| Поле не на карточке товара | Для `msProductData` проверьте `ms3_product_fields` и `visible`. См. [product-fields cookbook](/components/minishop3/manager/product-fields/cookbook) |
| Секция заказа пустая при active=1 | Форма: `class=msOrder`. БД: `MiniShop3\Model\msOrder`. API фильтрует по точному совпадению |
| Repeater/key-value не сохраняется | JSON-схема в конфиге, dbtype должен быть `json` |
| 403 | `mssetting_save` |

Справочник: [extra-fields](/components/minishop3/interface/utilities/extra-fields).
