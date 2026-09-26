---
title: ms3FavoritesCounter
---
# Сниппет ms3FavoritesCounter

Выводит счётчик элементов в избранном. Ставят в шапку, меню или иконку «Избранное».

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **id** | ID страницы, на которой выводится список (опционально) | — |
| **list** | Список (`default`): пусто или `all` — сумма по всем спискам | `default` |
| **resource_type** | Тип ресурсов: `products`, `resources`, `articles`, `pages`, `custom` | `products` |
| **tpl** | Чанк. Поддерживает `@FILE path.tpl` (pdoTools, путь от `pdotools_elements_path`) | `tplMs3fCounter` |

## Плейсхолдеры в чанке

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+ms3f_count]]` | Количество элементов |
| `[[+ms3f_page_id]]` | ID страницы (если передан). При непустом значении в разметку чанка добавляется атрибут `data-ms3f-page-id` |

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
{'!ms3FavoritesCounter' | snippet : ['list' => 'all']}
```
:::

**Альтернатива — клиентский счётчик:**

```html
<span data-favorites-count style="display: none;">0</span>
```

После загрузки скрипт подставит число 1–99 или «99+» при большем количестве. При нуле позиций элемент не показывается.
