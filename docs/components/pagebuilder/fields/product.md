---
title: "product"
description: "ID одного товара miniShop3. Capability minishop3. Слой Pro."
---

# Поле product

Версия: **Pro**, capability `minishop3`.

Строка с ID товара. В дескрипторе типа указана зависимость `minishop3`, но `ProFeatureProvider` сейчас не выдаёт эту capability: тип не попадает в диалог нового поля ни с установленным miniShop3, ни без него.

Готовые секции магазина берут товар через [relation](relation) и [multirelation](multirelation), не через этот тип. Чанк сам цену и кнопку корзины не получает. Для карточки miniShop3 используйте [сетку товаров](../sections/products_grid) или [product spotlight](../sections/product_spotlight).

## Настройка

```json
{
  "name": "product_id",
  "type": "product",
  "label": "Товар"
}
```

## Значение

В инспекторе и в сохранённых данных секции — строка ID (`InputText`). Демо-матрица и sample-данные могут подставлять объект как у `relation`. В chunk опирайтесь на строку ID. Объект в поле даст в инспекторе `[object Object]`.

## Данные секции {#vyvod-v-section-data}

```json
{
  "product_id": "42"
}
```

## Похожие типы

- [products](products) для нескольких ID
- [relation](relation) для связи с произвольным классом
