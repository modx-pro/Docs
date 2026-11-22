---
title: ms3fMergeIds
---
# Сниппет ms3fMergeIds

Склеивает несколько списков ID в одну строку без дублей. Сниппет есть с версии 1.1.5.

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **ids**, **ids1**, **ids2**, … | Строки ID через запятую. Имя параметра: `ids` или `ids` и номер | — |
| **sortBy** | `none`: порядок первого появления. `asc` или `desc`: числовая сортировка | `none` |
| **toPlaceholder** | Имя плейсхолдера. Если задано, сниппет пишет туда строку и возвращает пустой вывод | — |

Из каждой строки берутся не больше 100 ID. Пустой результат: пустая строка. Порядок слияния идёт по номеру параметра: `ids`, затем `ids1`, `ids2`.

## Пример

::: code-group

```modx
[[!ms3FavoritesIds? &list=`default` &toPlaceholder=`ids_default`]]
[[!ms3FavoritesIds? &list=`gifts` &toPlaceholder=`ids_gifts`]]
[[!ms3fMergeIds? &ids1=`[[+ids_default]]` &ids2=`[[+ids_gifts]]` &toPlaceholder=`all_ids`]]
```

```fenom
{'!ms3FavoritesIds' | snippet : ['list' => 'default', 'toPlaceholder' => 'ids_default']}
{'!ms3FavoritesIds' | snippet : ['list' => 'gifts', 'toPlaceholder' => 'ids_gifts']}
{set $allIds = '!ms3fMergeIds' | snippet : [
  'ids1' => $_modx->getPlaceholder('ids_default'),
  'ids2' => $_modx->getPlaceholder('ids_gifts')
]}
```

:::

Дальше строку можно отдать в `msProducts`. Готовый вызов есть в [интеграции](../integration).
