---
title: Trending snippet
---
# Trending snippet

Lists “hot” items with the Reddit hot-ranking formula. Sorted by the `trending_score` field.

## Formula

```text
sign = +1 if rating > 0, −1 if rating < 0, 0 if rating = 0
order = log10(max(|rating|, 1))
age = (time_of_last_reaction − epoch) / 45000
trending_score = sign × order + age
```

Fresh items with a high rating rise higher. Epoch is fixed: `1134028003` (27 December 2005).

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `class` | `modResource` | `class_key` of objects in the selection |
| `period` | `all` | Period (trending always uses `all`) |
| `limit` | `10` | Maximum items |
| `context` | *(empty)* | Context filter |
| `tpl` | `tpl.Reactions.top` | Chunk for one list row |
| `toPlaceholder` | *(empty)* | Placeholder name instead of direct output |

## Chunk placeholders

| Placeholder | Description |
| --- | --- |
| `[[+idx]]` | Row number |
| `[[+object_id]]` | Object ID |
| `[[+class_key]]` | Object class (in the DB: `object_class`) |
| `[[+pagetitle]]` | Resource title / product name |
| `[[+uri]]` | Object URL (or empty) |
| `[[+likes]]` | Like count |
| `[[+dislikes]]` | Dislike count |
| `[[+total]]` | Sum of all reactions |
| `[[+rating]]` | Rating (likes − dislikes) |
| `[[+trending_score]]` | Trending score (for debug and sorting) |

## Examples

The `period` parameter does not narrow the window for trending sort: the score already lives in aggregates (`period=all`). Pass `period` only if it keeps the call aligned with `TopLiked` / `TopRated` in the same template.

### Resources on the home page

::: code-group

```modx
<ul class="reactions-top">
[[!Trending?
    &class=`modResource`
    &period=`all`
    &limit=`5`
]]
</ul>
```

```fenom
<ul class="reactions-top">
{'!Trending' | snippet : [
    'class'  => 'modResource',
    'period' => 'all',
    'limit'  => 5,
]}
</ul>
```

:::

### Short block (limit=3)

::: code-group

```modx
[[!Trending? &period=`all` &limit=`3`]]
```

```fenom
{'!Trending' | snippet : ['period' => 'all', 'limit' => 3]}
```

:::

### miniShop3 products

::: code-group

```modx
<ul class="reactions-top">
[[!Trending?
    &class=`msProduct`
    &limit=`6`
]]
</ul>
```

```fenom
<ul class="reactions-top">
{'!Trending' | snippet : [
    'class' => 'msProduct',
    'limit' => 6,
]}
</ul>
```

:::

### To a placeholder

::: code-group

```modx
[[!Trending?
    &limit=`3`
    &toPlaceholder=`rx.trend`
]]
<ul class="reactions-top">[[+rx.trend]]</ul>
```

```fenom
{'!Trending' | snippet : [
    'limit' => 3,
    'toPlaceholder' => 'rx.trend',
]}
<ul class="reactions-top">{$_modx->getPlaceholder('rx.trend')}</ul>
```

:::

### Custom chunk

::: code-group

```modx
<ul class="trending-list">
[[!Trending? &limit=`10` &tpl=`tpl.trending.row`]]
</ul>
```

```fenom
<ul class="trending-list">
{'!Trending' | snippet : [
    'limit' => 10,
    'tpl'   => 'tpl.trending.row',
]}
</ul>
```

:::

### `web` context

```modx
[[!Trending? &context=`web` &limit=`12`]]
```

### Tickets comments

Not verified on MODX 3:

```modx
[[!Trending? &class=`TicketComment` &limit=`5`]]
```

## Updating trending_score

The `trending_score` field is recalculated on every reaction (in `AggregateService::recount`). For a bulk recount:

```bash
php core/components/reactions/cli.php recount
```
