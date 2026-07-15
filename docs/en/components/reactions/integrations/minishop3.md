---
title: miniShop3 integration
---
# miniShop3 integration

In snippets and the API pass the short class `msProduct` and the product ID (`&object=` / `object_id`). The server resolves the product via FQCN (`MiniShop3\Model\msProduct`) and STI `modResource`. It does not look up the short name in xPDO, so error.log stays clean.

Aggregates store `object_class` as `msProduct` (whatever you passed in `class` / `class_key`). Build catalog joins on that same string.

## Reaction block on the product card

`github` in picker mode (chips + `+`):

::: code-group

```modx
[[!Reactions?
    &class=`msProduct`
    &object=`[[*id]]`
    &set=`github`
    &context=`web`
]]
```

```fenom
{'!Reactions' | snippet : [
    'class'   => 'msProduct',
    'object'  => $_modx->resource.id,
    'set'     => 'github',
    'context' => 'web',
]}
```

:::

👍/👎 only:

::: code-group

```modx
[[!Reactions?
    &class=`msProduct`
    &object=`[[*id]]`
    &set=`updown`
]]
```

```fenom
{'!Reactions' | snippet : [
    'class'  => 'msProduct',
    'object' => $_modx->resource.id,
    'set'    => 'updown',
]}
```

:::

## Counter in the catalog

::: code-group

```modx
[[!ReactionsCount?
    &class=`msProduct`
    &object=`[[+id]]`
    &format=`👍 {LIKES}`
]]
```

```fenom
{'!ReactionsCount' | snippet : [
    'class'  => 'msProduct',
    'object' => $id,
    'format' => '👍 {LIKES}',
]}
```

:::

## Sort the catalog by popularity

Use `msProducts` with `leftJoin`. Because msProducts uses `GROUP BY msProduct.id`, sort with `MAX(Aggregate.likes)`, not `Aggregate.likes` (see [pdoTools](pdotools)).

::: code-group

```modx
[[!msProducts?
    &parents=`10`
    &limit=`12`
    &leftJoin=`{"Aggregate":{"class":"Reactions\\\\Model\\\\ReactionAggregate","on":"Aggregate.object_id = msProduct.id AND Aggregate.object_class = 'msProduct'"}}`
    &sortby=`MAX(Aggregate.likes)`
    &sortdir=`DESC`
    &tpl=`tpl.msProduct.card`
]]
```

```fenom
{set $rxProductJoin = [
    'Aggregate' => [
        'class' => 'Reactions\Model\ReactionAggregate',
        'on' => "Aggregate.object_id = msProduct.id AND Aggregate.object_class = 'msProduct'",
    ],
]}
{'!msProducts' | snippet : [
    'parents' => 10,
    'limit' => 12,
    'leftJoin' => $rxProductJoin,
    'sortby' => 'MAX(Aggregate.likes)',
    'sortdir' => 'DESC',
    'tpl' => 'tpl.msProduct.card',
]}
```

:::

## Top products

::: code-group

```modx
[[!TopLiked?
    &class=`msProduct`
    &period=`month`
    &limit=`6`
    &tpl=`tpl.top.product`
]]
```

```fenom
{'!TopLiked' | snippet : [
    'class'  => 'msProduct',
    'period' => 'month',
    'limit'  => 6,
    'tpl'    => 'tpl.top.product',
]}
```

:::

Trending products:

::: code-group

```modx
[[!Trending?
    &class=`msProduct`
    &limit=`8`
]]
```

```fenom
{'!Trending' | snippet : [
    'class' => 'msProduct',
    'limit' => 8,
]}
```

:::

## Counter in the msProducts chunk

In `tpl.msProduct.card`:

::: code-group

```modx
<div class="product-card">
    <h3>[[+pagetitle]]</h3>
    <p class="product-price">[[+price]] ₽</p>
    [[!ReactionsCount?
        &class=`msProduct`
        &object=`[[+id]]`
        &format=`❤️ {TOTAL}`
    ]]
</div>
```

```fenom
<div class="product-card">
    <h3>{$pagetitle}</h3>
    <p class="product-price">{$price} ₽</p>
    {'!ReactionsCount' | snippet : [
        'class'  => 'msProduct',
        'object' => $id,
        'format' => '❤️ {TOTAL}',
    ]}
</div>
```

:::

## Context

Products usually live in the `web` context. If the catalog uses a separate context, pass `context`:

::: code-group

```modx
[[!Reactions?
    &class=`msProduct`
    &object=`[[*id]]`
    &context=`catalog`
    &set=`updown`
]]
```

```fenom
{'!Reactions' | snippet : [
    'class'   => 'msProduct',
    'object'  => $_modx->resource.id,
    'context' => 'catalog',
    'set'     => 'updown',
]}
```

:::

## JSON-LD on the product card

Only when the product has like/dislike votes. In Fenom use `{raw …}`:

::: code-group

```modx
[[!ReactionsSchema?
    &class=`msProduct`
    &object=`[[*id]]`
    &context=`web`
]]
```

```fenom
{raw ('!ReactionsSchema' | snippet : [
    'class'   => 'msProduct',
    'object'  => $_modx->resource.id,
    'context' => 'web',
])}
```

:::

## Recount aggregates

After a migration or import:

```bash
php core/components/reactions/cli.php recount --class-key=msProduct
```
