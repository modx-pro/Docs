---
title: Сниппеты
---
# Сниппеты MiniShop3

MiniShop3 предоставляет набор сниппетов для построения интернет-магазина на фронтенде. Все сниппеты работают через pdoTools и поддерживают шаблонизатор Fenom.

## Обзор сниппетов

| Сниппет | Назначение |
|---------|------------|
| [msProducts](msproducts) | Вывод списка товаров с фильтрацией и сортировкой |
| [msCart](mscart) | Отображение корзины покупок |
| [msOrder](msorder) | Форма оформления заказа |
| [msGetOrder](msgetorder) | Получение информации о заказе |
| [msGallery](msgallery) | Галерея изображений товара |
| [msOptions](msoptions) | Вывод опций для фильтрации товаров |
| [msProductOptions](msproductoptions) | Характеристики конкретного товара |
| [msCustomer](mscustomer) | Личный кабинет покупателя |
| [msOrderTotal](msordertotal) | Итоговая сумма заказа |

## Общие принципы

### Вызов сниппетов

Все сниппеты можно вызывать через Fenom:

```fenom
{'msProducts' | snippet : [
    'parents' => 5,
    'limit' => 10
]}
```

Или через стандартный синтаксис MODX:

```modx
[[!msProducts?
    &parents=`5`
    &limit=`10`
]]
```

::: tip Кэширование
Сниппеты, работающие с сессией пользователя (`msCart`, `msOrder`, `msCustomer`), должны вызываться **некэшированно** (с `!`).
:::

### Параметр return

Большинство сниппетов поддерживают параметр `return`, определяющий формат вывода:

| Значение | Описание |
|----------|----------|
| `tpl` | Обработка через чанк (по умолчанию) |
| `data` | Возврат массива данных |
| `json` | Возврат JSON-строки |
| `ids` | Только ID записей через запятую |

### Параметр toPlaceholder

Вместо прямого вывода можно сохранить результат в плейсхолдер:

```fenom
{'msProducts' | snippet : [
    'toPlaceholder' => 'products'
]}

{* Позже использовать *}
{$_modx->getPlaceholder('products')}
```

## Чанки по умолчанию

MiniShop3 устанавливает набор готовых чанков:

| Сниппет | Чанк по умолчанию |
|---------|-------------------|
| msProducts | `tpl.msProducts.row` |
| msCart | `tpl.msCart` |
| msOrder | `tpl.msOrder` |
| msGetOrder | `tpl.msGetOrder` |
| msGallery | `tpl.msGallery` |
| msOptions | `tpl.msOptions` |
| msProductOptions | `tpl.msProductOptions` |

Чанки можно переопределить, создав свои версии или указав другой чанк в параметре `tpl`.
