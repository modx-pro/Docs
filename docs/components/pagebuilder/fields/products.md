---
title: "products"
description: "Список ID товаров miniShop3 через запятую. Capability minishop3. Слой Pro."
---

# Поле products

Версия: **Pro**, capability `minishop3`.

В инспекторе ID вводят через запятую в многострочном поле, в данных секции — массив строк. Зависимость `minishop3` в дескрипторе есть, но Pro capability не выдаётся: тип не попадает в диалог нового поля, даже с установленным miniShop3.

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

Ключ `product_ids` — массив строк ID:

```json
{
  "product_ids": ["12", "18", "24"]
}
```

## Пример в chunk

В chunk — массив строк ID, не объекты `{ id, pagetitle }`. Цикл — во вкладке Fenom; теги MODX массив секции не обходят: см. [обзор полей](overview#фронт-и-enrich).

::: code-group

```modx
[[+product_ids.0]]
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
