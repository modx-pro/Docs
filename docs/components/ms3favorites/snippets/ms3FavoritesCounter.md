---
title: ms3FavoritesCounter
---
# Сниппет ms3FavoritesCounter

Выводит счётчик элементов в избранном. Ставят в шапку, меню или иконку «Избранное».

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **id** | ID страницы, на которой выводится список (опционально) | — |
| **list** | Список. Пусто или `all`: сумма списков выбранного типа. При `resource_type=all` список тоже считается как `all` | `default` |
| **resource_type** | Тип: `products`, `resources`, `articles`, `pages`, `custom` или `all` (сумма всех типов) | `products` |
| **tpl** | Чанк. Поддерживает `@FILE path.tpl` (pdoTools, путь от `pdotools_elements_path`) | `tplMs3fCounter` |

## Плейсхолдеры в чанке

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+ms3f_count]]` | Количество элементов |
| `[[+ms3f_list]]` | Список для атрибута `data-list` (`all`, если суммируются списки) |
| `[[+ms3f_resource_type]]` | Тип для атрибута `data-resource-type` |
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

**Клиентский счётчик:**

```html
<span data-favorites-count style="display: none;">0</span>
```

После загрузки скрипт подставит число 1–99 или «99+» при большем количестве. При нуле позиций элемент не показывается.

Штатный чанк `tplMs3fCounter` ставит `data-resource-type` и `data-list` из параметров сниппета. Тогда `favorites.js` считает тот же набор.

У своего узла без `data-resource-type` или со значением `all` скрипт суммирует все типы. Тип задан, список пуст или `all`: сумма списков этого типа. Оба атрибута заданы: длина одного списка.
