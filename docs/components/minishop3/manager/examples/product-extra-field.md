---
title: Поле «Оптовая цена» у товара
description: End-to-end — extra field на msProductData, раскладка вкладки «Данные» и колонка в гриде категории
---

# Поле «Оптовая цена» у товара

Добавьте числовое extra field к данным товара и настройте, где оно появится в менеджере.

## Цель

Менеджер вводит оптовую цену на вкладке **Данные**. Значение лежит в `ms3_product_data` и сохраняется вместе с карточкой товара.

## Что понадобится

- MiniShop3 1.13.x
- Право `mssetting_save`
- Право редактирования ресурса товара

## Шаг 1. Создайте extra field

1. **Extras → MiniShop3 → Утилиты → Дополнительные поля**.
2. Класс **msProductData (Данные товара)**.
3. **Создать поле**:

| Параметр | Значение |
| --- | --- |
| Ключ | `wholesale_price` |
| Название | Оптовая цена |
| xtype | `numberfield` |
| dbtype | `decimal` |
| precision | `12,2` |
| phptype | `float` |
| Активно | да |

Пакет добавит колонку в таблицу и строку в `ms3_product_fields`.

::: tip Класс в БД
В UI класс сохраняется как `MiniShop3\Model\msProductData`. В POST укажите то же значение в поле `class`.
:::

## Шаг 2. Раскладка на вкладке «Данные»

1. **Утилиты → Поля товара**.
2. Найдите **Оптовая цена** (или перенесите из «Без секции»).
3. Положите поле в секцию **Основные данные** или создайте секцию **Цены**.
4. Включите **Видимость**, задайте порядок.
5. Перезагрузите карточку товара.

Подробнее: [Cookbook полей товара](/components/minishop3/manager/product-fields/cookbook).

## Шаг 3. Колонка в таблице категории (опционально)

1. **Утилиты → Колонки гридов** → грид **category-products**.
2. Добавьте колонку `wholesale_price`, тип **price**.
3. В **displayConfig** задайте формат, например:

```json
{
  "decimals": 2,
  "currency": "₽",
  "currency_position": "after",
  "thousands_separator": " "
}
```

См. [Cookbook колонок грида](/components/minishop3/manager/grid-config/cookbook).

## Шаг 4. Проверка

```http
GET /api/mgr/extra-fields?class=MiniShop3\Model\msProductData
```

Откройте товар, введите значение, сохраните. В ответе `GET` карточки товара должно быть `"wholesale_price": 1200.5`.

## Импорт CSV

Колонку `wholesale_price` можно сопоставить в **Утилиты → Импорт**, если поле уже создано и миграция прошла. Repeater и key-value в CSV не поддерживаются.

## Отличие от полей модели

Extra field **создаёт колонку**. [Поля модели](/components/minishop3/manager/model-fields/cookbook) меняют форму заказа и других сущностей MS3, но не раскладку вкладки «Данные» товара. Для новой колонки в `ms3_product_data` берите extra fields, затем **Поля товара**.

## API appendix

| Метод | Путь | Права |
| --- | --- | --- |
| POST | `/api/mgr/extra-fields` | `mssetting_save` |
| PUT | `/api/mgr/config/page-fields/product_data` | `mssetting_save` |
| PUT | `/api/mgr/grid-config/category-products` | `mssetting_save` |

## Troubleshooting

| Симптом | Что проверить |
| --- | --- |
| Поле в утилите, но не на вкладке | `visible` в **Поля товара**, перезагрузка страницы |
| Нет в списке **Поля товара** | Запись в `ms3_product_fields` после POST extra field |
| Колонка пустая в гриде | Тип **price** или **model**, имя совпадает с ключом extra field |
| Ошибка миграции | Лог MODX, права на `core/components/minishop3/migrations` |

См. [Cookbook extra fields](/components/minishop3/manager/extra-fields/cookbook), [Товар](/components/minishop3/interface/product).
