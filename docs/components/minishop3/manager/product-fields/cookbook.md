---
title: Cookbook полей товара
description: Секции, visible и page_key product_data на вкладке «Данные»
---

# Cookbook полей товара

**Поля товара** задают раскладку вкладки **Данные** на карточке товара. Колонку в БД создают через [extra fields](/components/minishop3/manager/extra-fields/cookbook).

Справочник: [Поля товара](/components/minishop3/interface/utilities/product-fields).

## Цель

Вы группируете `article`, `price`, extra-поля по секциям, скрываете лишнее, меняете порядок. Vue-компонент вкладки читает `GET /api/mgr/config/page-fields/product_data`.

## page_key

| page_key | Экран |
| --- | --- |
| `product_data` | Вкладка «Данные товара» |

Других page_key в 1.13.x для этой утилиты нет.

## Связь с extra fields

1. POST в **Дополнительные поля** для `MiniShop3\Model\msProductData` создаёт колонку и строку в `ms3_product_fields`.
2. **Поля товара** меняют секцию, label, xtype, `visible`, `sort_order`. Новую колонку здесь не создают.

Полный пример: [Оптовая цена](/components/minishop3/manager/examples/product-extra-field).

## Кейс: секция «Цены»

1. **Утилиты → Поля товара** → **Добавить секцию**.
2. Ключ `prices`, название **Цены**, `sort_order` после «Основные данные».
3. Перенесите `price`, `old_price`, extra `wholesale_price` в секцию **Цены**.
4. Сохраните, перезагрузите карточку товара.

## Кейс: скрыть color и size

Если размер и цвет идут через опции:

1. Откройте поле `color` → снимите **Видимость**.
2. То же для `size`.
3. Поля остаются в БД, на вкладке не показываются.

## Кейс: SEO-блок

1. Секция `seo`, название **SEO**.
2. Перенесите `tags` или кастомные extra-поля метаданных.
3. Поднимите секцию в списке drag-and-drop.

## API appendix

```http
GET /api/mgr/config/page-fields/product_data
GET /api/mgr/config/sections/product_data
PUT /api/mgr/config/page-fields/product_data
POST /api/mgr/config/sections/product_data
```

Пример PUT поля:

```json
{
  "name": "wholesale_price",
  "label": "Оптовая цена",
  "section": 2,
  "visible": true,
  "sort_order": 10
}
```

Запись: `mssetting_save`.

## Troubleshooting

| Симптом | Действие |
| --- | --- |
| Изменения не видны | Жёсткая перезагрузка карточки товара |
| Поля нет в списке | Сначала extra field для `msProductData` |
| Путаете с model fields | Model fields — заказ, vendor. Product fields — только вкладка «Данные» |
| xtype не тот | Редактирование поля в утилите или через PUT page-fields |

См. [Cookbook менеджера](/components/minishop3/manager/), [model-fields](/components/minishop3/manager/model-fields/cookbook).
