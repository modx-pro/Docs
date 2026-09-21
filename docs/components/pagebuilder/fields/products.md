---
title: "products"
description: "Список ID товаров miniShop3 через запятую. Capability minishop3. Слой Pro."
---

# Поле products

Версия: **Pro**, capability `minishop3`.

В инспекторе ID вводят через запятую. В данных секции это массив строк. Без miniShop3 тип для нового поля не предлагается.

Готовые секции магазина, например [сравнение](../sections/product_comparison), хранят товары в [multirelation](multirelation). Этот тип цену и кнопку корзины в чанк не кладёт.

## Настройка

```json
{
  "name": "product_ids",
  "type": "products",
  "label": "Товары"
}
```

## Данные секции {#vyvod-v-section-data}

```json
{
  "product_ids": ["12", "18", "24"]
}
```

## Пример в chunk

::: code-group

```modx
{foreach $product_ids as $id}
  <span>{$id|escape}</span>
{/foreach}
```

```fenom
{foreach $product_ids as $id}
  <span>{$id|escape}</span>
{/foreach}
```

:::

## Похожие типы

- [product](product) для одного ID
- [multirelation](multirelation) для нескольких связей произвольного класса
