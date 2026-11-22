---
title: "products"
description: "Список ID товаров miniShop3 через запятую. Capability minishop3. Слой Pro."
---

# Поле products

Версия: **Pro**, capability `minishop3`.

В инспекторе ID вводят через запятую, в данных секции лежит массив строк. Тип появляется в диалоге нового поля, когда miniShop3 доступен: в сервисах есть `MiniShop3` или существует каталог `components/minishop3`. Тогда `ProFeatureProvider` добавляет capability `minishop3`.

Готовые секции магазина, например [сравнение](../sections/product_comparison), хранят товары в [multirelation](multirelation). Этот тип цену и кнопку корзины в чанк не кладёт.

## Похожие типы

- [product](product) для одного ID
- [multirelation](multirelation) для нескольких связей произвольного класса

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

В чанке массив строк ID, не объекты `{ id, pagetitle }`. Цикл пишите во вкладке Fenom. Теги MODX массив секции не обходят: см. [обзор полей](overview#фронт-и-enrich).

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
