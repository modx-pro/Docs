---
title: TopRated snippet
---
# TopRated snippet

Lists objects with the highest rating. Rating = `likes − dislikes` (up/down balance).

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `class` | `modResource` | `class_key` of objects in the selection |
| `period` | `all` | Period: `day`, `week`, `month`, `year`, `all` |
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
| `[[+trending_score]]` | Trending score |

## Examples

Sorted by `rating` (= likes − dislikes). Same periods as `TopLiked`: `day` / `week` / `month` / `year` / `all`.

### Resources for a chosen period

::: code-group

```modx
<ul class="reactions-top">
[[!TopRated?
    &class=`modResource`
    &period=`week`
    &limit=`5`
]]
</ul>
```

```fenom
<ul class="reactions-top">
{'!TopRated' | snippet : [
    'class'  => 'modResource',
    'period' => 'week',
    'limit'  => 5,
]}
</ul>
```

:::

### Month and year

::: code-group

```modx
[[!TopRated? &period=`month` &limit=`10`]]
[[!TopRated? &period=`year` &limit=`10`]]
```

```fenom
{'!TopRated' | snippet : ['period' => 'month', 'limit' => 10]}
{'!TopRated' | snippet : ['period' => 'year', 'limit' => 10]}
```

:::

### miniShop3 products

::: code-group

```modx
<ul class="reactions-top">
[[!TopRated?
    &class=`msProduct`
    &period=`year`
    &limit=`8`
]]
</ul>
```

```fenom
<ul class="reactions-top">
{'!TopRated' | snippet : [
    'class'  => 'msProduct',
    'period' => 'year',
    'limit'  => 8,
]}
</ul>
```

:::

### To a placeholder + custom chunk

::: code-group

```modx
[[!TopRated?
    &period=`all`
    &limit=`3`
    &tpl=`myTopRatedRow`
    &toPlaceholder=`rx.rated`
]]
<ul class="reactions-top">[[+rx.rated]]</ul>
```

```fenom
{'!TopRated' | snippet : [
    'period' => 'all',
    'limit'  => 3,
    'tpl' => 'myTopRatedRow',
    'toPlaceholder' => 'rx.rated',
]}
<ul class="reactions-top">{$_modx->getPlaceholder('rx.rated')}</ul>
```

:::

### `web` context

```modx
[[!TopRated? &period=`all` &context=`web` &limit=`20`]]
```

### Tickets comments

Not verified on MODX 3:

```modx
[[!TopRated? &class=`TicketComment` &period=`week` &limit=`3`]]
```

## TopLiked vs TopRated

| Snippet | Sort | When to use |
| --- | --- | --- |
| `TopLiked` | By `likes` | “Most popular”: many positive reactions |
| `TopRated` | By `rating` | “Best”: high like/dislike balance |

An article with 100 likes and 95 dislikes ranks in `TopLiked` but not in `TopRated`.
