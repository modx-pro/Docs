---
title: "products"
description: "Список ID товаров miniShop3 через запятую. Capability minishop3. Слой Pro."
---

# Поле products

Версия: **Pro**, capability `minishop3`.

В инспекторе ID вводят через запятую в многострочном поле. В данных секции — массив строк. Зависимость `minishop3` в дескрипторе есть, но capability не выдаётся в Pro: тип не попадает в диалог нового поля ни с miniShop3, ни без него.

Готовые секции магазина, например [сравнение](../sections/product_comparison), хранят товары в [multirelation](multirelation). Этот тип цену и кнопку корзины в чанк не кладёт.

## Настройка

```json
{
  "name": "product_ids",
  "type": "products",
  "label": "Товары"
}
```

## Значение

Массив строк ID. Демо-матрица может показывать объекты relation. В chunk — массив строк; не смешивайте с объектами `{ id, pagetitle }`.

## Данные секции {#vyvod-v-section-data}

```json
{
  "product_ids": ["12", "18", "24"]
}
```

## Пример в chunk

Цикл по массиву — во вкладке Fenom. Теги MODX массив секции не обходят: см. [обзор полей](overview#фронт-и-enrich).

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
