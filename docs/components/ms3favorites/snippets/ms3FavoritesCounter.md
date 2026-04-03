---
title: ms3FavoritesCounter
---
# Сниппет ms3FavoritesCounter

Выводит счётчик количества элементов в избранном. Используется в шапке, меню, иконке «Избранное».

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **id** | ID страницы, на которой выводится список (опционально) | — |
| **list** | Список (`default`): пусто или `all` — сумма по всем спискам | `default` |
| **resource_type** | Тип ресурсов: `products`, `resources` | `products` |
| **tpl** | Чанк | `tplMs3fCounter` |

## Плейсхолдеры в чанке

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+ms3f_count]]` | Количество элементов |
| `[[+ms3f_page_id]]` | ID страницы (если передан) |

## Примеры

::: code-group
```modx
[[!ms3FavoritesCounter]]
```

```fenom
{'!ms3FavoritesCounter' | snippet}
```
:::

**Сумма по всем спискам:**

::: code-group
```modx
[[!ms3FavoritesCounter? &list=`all`]]
```

```fenom
{'!ms3FavoritesCounter' | snippet}
```
:::

**Альтернатива — клиентский счётчик:**

```html
<span data-favorites-count style="display: none;">0</span>
```

После загрузки страницы скрипт подставит число 1–99 или «99+» при большем количестве; при нуле позиций элемент не показывается.
