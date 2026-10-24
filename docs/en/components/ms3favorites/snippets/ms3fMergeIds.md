---
title: ms3fMergeIds
---
# Snippet ms3fMergeIds

Joins several ID lists into one string without duplicates. Available since 1.1.5.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **ids**, **ids1**, **ids2**, … | Comma-separated IDs. The name is `ids` or `ids` plus a number | — |
| **sortBy** | `none` keeps the first-seen order. `asc` or `desc` sorts numerically | `none` |
| **toPlaceholder** | Placeholder name. When set, the snippet writes the string there and returns empty output | — |

Each input string contributes at most 100 IDs. An empty result is an empty string. Merge order follows the parameter number: `ids`, then `ids1`, `ids2`.

## Example

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

Pass the string to `msProducts`. A full call is in [Integration](../integration).
