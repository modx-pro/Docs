---
title: Чанки
description: Чанки mxqv_product и mxqv_resource для отрисовки контента в quick view
---
<!-- TODO: translate from docs/components/mxquickview/chunks.md -->


# Чанки

Компонент включает два готовых чанка для быстрой отрисовки контента в модальном окне.

## mxqv_product

![Чанк mxqv_product в админке MODX](screenshots/mxqv_product_admin.png)

**Путь:** `core/components/mxquickview/elements/chunks/mxqv_product.tpl`

**Назначение:** Отрисовка карточки товара в quick view. Использует Fenom-синтаксис (требуется pdoTools).

**Входные данные:**

| Переменная | Тип | Описание |
| --- | --- | --- |
| `$id` | int | ID ресурса/товара |
| `$pagetitle` | string | Название товара |
| `$price` | float | Цена |
| `$old_price` | float | Старая цена |
| `$image` | string | URL изображения |
| `$introtext` | string | Краткое описание |
| `$content` | string | Полное описание |
| `$vendor` | string | Производитель |
| `$article` | string | Артикул |
| `$weight` | float | Вес |
| `$remains` | int | Остаток на складе |
| `$variants_html` | string | HTML выбора вариантов (если ms3Variants) |
| `$variants_json` | string | JSON вариантов для JS |
| `$has_variants` | bool | Есть ли варианты |

**Пример использования:**

::: code-group

```fenom
{'mxqv_product' | chunk : [
  'id' => $product.id,
  'pagetitle' => $product.pagetitle,
  'price' => $product.price,
  'image' => $product.image,
]}
```

```modx
[[!pdoFetch?
  &tpl=`mxqv_product`
  &resources=`[[+id]]`
]]
```

:::

## mxqv_resource

![Чанк mxqv_resource в админке MODX](screenshots/mxqv_resource_admin.png)

**Путь:** `core/components/mxquickview/elements/chunks/mxqv_resource.tpl`

**Назначение:** Отрисовка произвольного ресурса (не товара) в quick view.

**Входные данные:**

| Переменная | Тип | Описание |
| --- | --- | --- |
| `$id` | int | ID ресурса |
| `$pagetitle` | string | Заголовок |
| `$introtext` | string | Вступление |
| `$content` | string | Контент |
| `$image` | string | Изображение |
| `$publishedon` | string | Дата публикации |
| `$author` | string | Автор |

**Пример использования:**

```fenom
{'mxqv_resource' | chunk : [
  'id' => $resource.id,
  'pagetitle' => $resource.pagetitle,
  'content' => $resource.content,
]}
```

## Добавление своих чанков

1. Создайте чанк в `core/components/mxquickview/elements/chunks/` или в админке MODX.
2. Добавьте имя чанка в белый список: **Системные настройки** → `mxquickview_allowed_chunk`.
3. Используйте в триггере: `data-mxqv-action="chunk" data-mxqv-element="ваш_чанк"`.

::: tip
Для ресурсов, не являющихся товарами, обязательно добавьте `mxqv_resource` в `mxquickview_allowed_chunk`.
:::
