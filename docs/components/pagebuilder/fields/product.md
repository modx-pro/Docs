---
title: "product"
description: "ID одного товара miniShop3. Capability minishop3. Слой Pro."
---

# Поле product

Версия: **Pro**, capability `minishop3`.

Строка с ID товара. Тип появляется в диалоге нового поля, когда miniShop3 доступен: в сервисах есть `MiniShop3` или существует каталог `components/minishop3`. Тогда `ProFeatureProvider` добавляет capability `minishop3`.

Готовые секции магазина берут товар через [relation](relation) и [multirelation](multirelation). Чанк не получает цену и кнопку корзины. Карточка miniShop3: [сетка товаров](../sections/products_grid) или [product spotlight](../sections/product_spotlight).

## Похожие типы

- [products](products) для нескольких ID
- [relation](relation) для связи с произвольным классом

## Настройка

```json
{
  "name": "product_id",
  "type": "product",
  "label": "Товар"
}
```

## Данные секции {#vyvod-v-section-data}

В инспекторе и в данных секции строка ID (`InputText`), не объект как у [relation](relation). В чанке опирайтесь на строку. Объект вместо строки даёт в инспекторе `[object Object]`.

```json
{
  "product_id": "42"
}
```
