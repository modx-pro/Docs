---
title: TopLiked snippet
---
# TopLiked snippet

Lists objects with the highest like counts. Sorted by the `likes` field in the aggregates table.

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `class` | `modResource` | `class_key` of objects in the selection |
| `period` | `all` | Period: `day`, `week`, `month`, `year`, `all` |
| `limit` | `10` | Maximum items |
| `context` | *(empty)* | Context filter. Empty value means all contexts |
| `tpl` | `tpl.Reactions.top` | Chunk for one list row |
| `toPlaceholder` | *(empty)* | Placeholder name instead of direct output |

## Chunk placeholders

| Placeholder | Description |
| --- | --- |
| `[[+idx]]` | Row number (1, 2, 3…) |
| `[[+object_id]]` | Object ID |
| `[[+class_key]]` | Object class (in the DB: `object_class`) |
| `[[+pagetitle]]` | Resource title / product name |
| `[[+uri]]` | Object URL (or empty) |
| `[[+likes]]` | Like count |
| `[[+dislikes]]` | Dislike count |
| `[[+total]]` | Sum of all reactions |
| `[[+rating]]` | Rating (likes − dislikes) |
| `[[+trending_score]]` | Trending score |

## Periods

| Value | Window |
| --- | --- |
| `day` | Last 24 hours |
| `week` | Last 7 days |
| `month` | Last 30 days |
| `year` | Last 365 days |
| `all` | All time (from the aggregates table) |

For periods other than `all`, the component rebuilds the top from raw reaction rows in that window.

## Examples

Add the `<ul class="reactions-top">` wrapper yourself: the row chunk outputs `<li>…</li>`.

### Resources: week / limit

::: code-group

```modx
<ul class="reactions-top">
[[!TopLiked?
    &class=`modResource`
    &period=`week`
    &limit=`5`
]]
</ul>
```

```fenom
<ul class="reactions-top">
{'!TopLiked' | snippet : [
    'class'  => 'modResource',
    'period' => 'week',
    'limit'  => 5,
]}
</ul>
```

:::

### Periods `day` · `week` · `month` · `year` · `all`

Same call, only `period` changes:

::: code-group

```modx
[[!TopLiked? &period=`day` &limit=`5`]]
[[!TopLiked? &period=`month` &limit=`5`]]
[[!TopLiked? &period=`all` &limit=`10`]]
```

```fenom
{'!TopLiked' | snippet : ['period' => 'day', 'limit' => 5]}
{'!TopLiked' | snippet : ['period' => 'month', 'limit' => 5]}
{'!TopLiked' | snippet : ['period' => 'all', 'limit' => 10]}
```

:::

### miniShop3 products

::: code-group

```modx
<ul class="reactions-top">
[[!TopLiked?
    &class=`msProduct`
    &period=`month`
    &limit=`5`
]]
</ul>
```

```fenom
<ul class="reactions-top">
{'!TopLiked' | snippet : [
    'class'  => 'msProduct',
    'period' => 'month',
    'limit'  => 5,
]}
</ul>
```

:::

Row title and URI come from `ObjectLookup` / the STI resource. Short `msProduct` is fine.

### `web` context filter

::: code-group

```modx
[[!TopLiked?
    &period=`all`
    &context=`web`
    &limit=`20`
]]
```

```fenom
{'!TopLiked' | snippet : [
    'period'  => 'all',
    'context' => 'web',
    'limit'   => 20,
]}
```

:::

### To a placeholder

::: code-group

```modx
[[!TopLiked?
    &period=`all`
    &limit=`3`
    &toPlaceholder=`rx.top`
]]
<ul class="reactions-top">[[+rx.top]]</ul>
```

```fenom
{'!TopLiked' | snippet : [
    'period' => 'all',
    'limit'  => 3,
    'toPlaceholder' => 'rx.top',
]}
<ul class="reactions-top">{$_modx->getPlaceholder('rx.top')}</ul>
```

:::

### Custom row chunk

::: code-group

```modx
<ul class="top-liked">
[[!TopLiked?
    &period=`week`
    &limit=`10`
    &tpl=`tpl.top.row`
]]
</ul>
```

```fenom
<ul class="top-liked">
{'!TopLiked' | snippet : [
    'period' => 'week',
    'limit'  => 10,
    'tpl'    => 'tpl.top.row',
]}
</ul>
```

:::

### Tickets comments

Not verified on MODX 3:

::: code-group

```modx
[[!TopLiked? &class=`TicketComment` &period=`month` &limit=`5`]]
```

```fenom
{'!TopLiked' | snippet : [
    'class'  => 'TicketComment',
    'period' => 'month',
    'limit'  => 5,
]}
```

:::
