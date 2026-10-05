---
title: "product"
description: "ID одного товара miniShop3. Capability minishop3. Слой Pro."
---

# Поле product

Версия: **Pro**, capability `minishop3`.

Строка с ID товара. В дескрипторе типа указана зависимость `minishop3`, но `ProFeatureProvider` не выдаёт эту capability: тип не попадает в диалог нового поля, даже с установленным miniShop3.

Готовые секции магазина берут товар через [relation](relation) и [multirelation](multirelation), не через этот тип. Чанк цену и кнопку корзины не получает: для карточки miniShop3 используйте [сетку товаров](../sections/products_grid) или [product spotlight](../sections/product_spotlight).

## Настройка

```json
{
  "name": "product_id",
  "type": "product",
  "label": "Товар"
}
```

## Данные секции {#vyvod-v-section-data}

В инспекторе и в данных секции — строка ID (`InputText`), не объект, как у [relation](relation). В chunk опирайтесь на строку: объект вместо строки даст в инспекторе `[object Object]`.

```json
{
  "product_id": "42"
}
```

## Похожие типы

- [products](products) для нескольких ID
- [relation](relation) для связи с произвольным классом
