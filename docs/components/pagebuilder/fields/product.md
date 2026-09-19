---
title: "product"
description: "ID одного товара miniShop3. Capability minishop3. Слой Pro."
---

# Поле product

Версия: **Pro**, capability `minishop3`.

Строка с ID товара. Без miniShop3 тип в инспекторе нового поля не предлагается.

Готовые секции магазина берут товар через [relation](relation) и [multirelation](multirelation), не через этот тип. Чанк сам цену и кнопку корзины не получает. Для карточки miniShop3 используйте [сетку товаров](../sections/products_grid) или [product spotlight](../sections/product_spotlight).

## Настройка

```json
{
  "name": "product_id",
  "type": "product",
  "label": "Товар"
}
```

## Данные секции {#vyvod-v-section-data}

```json
{
  "product_id": "42"
}
```

## Похожие типы

- [products](products) для нескольких ID
- [relation](relation) для связи с произвольным классом
