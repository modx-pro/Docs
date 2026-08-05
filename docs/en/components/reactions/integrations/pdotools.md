---
title: pdoTools integration
---
# pdoTools integration

Sort and list resources, products, and other objects by reactions with a `leftJoin` on the `ReactionAggregate` model.

## leftJoin: JSON and Fenom

pdoTools accepts `leftJoin` as an **array** or a JSON string. In JSON, escape the model class as `"Reactions\\Model\\ReactionAggregate"` (two `\` characters before `Model` in the final string).

| Approach | Example |
| --- | --- |
| MODX tag | `"class":"Reactions\\\\Model\\\\ReactionAggregate"` — **four** `\` in the template, two remain in JSON |
| Fenom | array `'class' => 'Reactions\Model\ReactionAggregate'` — preferred, no JSON |
| PHP / snippet | `'class' => ReactionAggregate::class` or a join array |

If the JSON is invalid, `json_decode` in msProducts/pdoResources silently skips the join. Then the log shows:

`Unknown column 'Aggregate.likes' in 'order clause'`

### msProducts and ONLY_FULL_GROUP_BY

`msProducts` always groups by `msProduct.id`. On MySQL with `ONLY_FULL_GROUP_BY` you cannot sort by plain `Aggregate.likes` — use an aggregate:

`&sortby=`MAX(Aggregate.likes)`` or `'sortby' => 'MAX(Aggregate.likes)'`

For `pdoResources` without `GROUP BY`, `Aggregate.likes` is enough.

## ReactionAggregate model

The `reactions_aggregates` table stores precomputed metrics:

| Field | Description |
| --- | --- |
| `object_class` | Object class (`modResource`, `msProduct`, …) |
| `object_id` | Object ID |
| `context` | MODX context |
| `counts` | JSON with per-type counters |
| `likes` | Sum of `like` + `up` |
| `dislikes` | Sum of `dislike` + `down` |
| `rating` | `likes − dislikes` |
| `total` | Sum of all reactions |
| `trending_score` | Trending score |

## Sort resources by likes

::: code-group

```modx
[[!pdoResources?
    &parents=`0`
    &depth=`10`
    &limit=`12`
    &leftJoin=`{"Aggregate":{"class":"Reactions\\\\Model\\\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource' AND Aggregate.context = 'web'"}}`
    &sortby=`Aggregate.likes`
    &sortdir=`DESC`
    &tpl=`tpl.article.card`
]]
```

```fenom
{'!pdoResources' | snippet : [
    'parents' => 0,
    'depth' => 10,
    'limit' => 12,
    'leftJoin' => [
        'Aggregate' => [
            'class' => 'Reactions\Model\ReactionAggregate',
            'on' => "Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource' AND Aggregate.context = 'web'",
        ],
    ],
    'sortby' => 'Aggregate.likes',
    'sortdir' => 'DESC',
    'tpl' => 'tpl.article.card',
]}
```

:::

## Sort by rating

::: code-group

```modx
[[!pdoResources?
    &parents=`5`
    &leftJoin=`{"Aggregate":{"class":"Reactions\\\\Model\\\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource'"}}`
    &sortby=`Aggregate.rating`
    &sortdir=`DESC`
    &limit=`10`
]]
```

```fenom
{'!pdoResources' | snippet : [
    'parents' => 5,
    'leftJoin' => [
        'Aggregate' => [
            'class' => 'Reactions\Model\ReactionAggregate',
            'on' => "Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource'",
        ],
    ],
    'sortby' => 'Aggregate.rating',
    'sortdir' => 'DESC',
    'limit' => 10,
]}
```

:::

## Sort by trending

::: code-group

```modx
[[!pdoResources?
    &parents=`0`
    &leftJoin=`{"Aggregate":{"class":"Reactions\\\\Model\\\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource'"}}`
    &sortby=`Aggregate.trending_score`
    &sortdir=`DESC`
    &limit=`8`
]]
```

```fenom
{'!pdoResources' | snippet : [
    'parents' => 0,
    'leftJoin' => [
        'Aggregate' => [
            'class' => 'Reactions\Model\ReactionAggregate',
            'on' => "Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource'",
        ],
    ],
    'sortby' => 'Aggregate.trending_score',
    'sortdir' => 'DESC',
    'limit' => 8,
]}
```

:::

## Counters in the pdoResources chunk

In the `tpl.article.card` chunk:

::: code-group

```modx
<h3>[[+pagetitle]]</h3>
<p>👍 [[!ReactionsCount? &object=`[[+id]]` &format=`{LIKES}`]]</p>
```

```fenom
<h3>{$pagetitle}</h3>
<p>👍 {'!ReactionsCount' | snippet : ['object' => $id, 'format' => '{LIKES}']}</p>
```

:::

Or via a placeholder:

::: code-group

```modx
[[!ReactionsCount? &object=`[[+id]]` &format=`{LIKES}` &toPlaceholder=`likes_[[+id]]`]]
<span>[[+likes_[[+id]]]]</span>
```

```fenom
{'!ReactionsCount' | snippet : [
    'object' => $id,
    'format' => '{LIKES}',
    'toPlaceholder' => ('likes_' ~ $id),
]}
<span>{$_modx->getPlaceholder('likes_' ~ $id)}</span>
```

:::

## List with pdoPage

::: code-group

```modx
[[!pdoPage?
    &element=`pdoResources`
    &parents=`0`
    &leftJoin=`{"Aggregate":{"class":"Reactions\\\\Model\\\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource'"}}`
    &sortby=`Aggregate.likes`
    &sortdir=`DESC`
    &tpl=`tpl.article.card`
]]
[[!+page.nav]]
```

```fenom
{'!pdoPage' | snippet : [
    'element' => 'pdoResources',
    'parents' => 0,
    'leftJoin' => [
        'Aggregate' => [
            'class' => 'Reactions\Model\ReactionAggregate',
            'on' => "Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource'",
        ],
    ],
    'sortby' => 'Aggregate.likes',
    'sortdir' => 'DESC',
    'tpl' => 'tpl.article.card',
]}
{$_modx->getPlaceholder('page.nav')}
```

:::

In a list row template (chunk `tpl` / `$results` loop):

::: code-group

```modx
<article>
    <h2><a href="[[~[[+id]]]]">[[+pagetitle]]</a></h2>
    [[!ReactionsCount?
        &object=`[[+id]]`
        &format=`👍 {LIKES}`
    ]]
</article>
```

```fenom
{foreach $results as $row}
    <article>
        <h2><a href="{$row.id | url}">{$row.pagetitle}</a></h2>
        {'!ReactionsCount' | snippet : [
            'object' => $row.id,
            'format' => '👍 {LIKES}',
        ]}
    </article>
{/foreach}
```

:::

## Filter: only objects with reactions

::: code-group

```modx
[[!pdoResources?
    &parents=`0`
    &leftJoin=`{"Aggregate":{"class":"Reactions\\\\Model\\\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource'"}}`
    &where=`{"Aggregate.likes:>":0}`
    &sortby=`Aggregate.likes`
    &sortdir=`DESC`
]]
```

```fenom
{'!pdoResources' | snippet : [
    'parents' => 0,
    'leftJoin' => [
        'Aggregate' => [
            'class' => 'Reactions\Model\ReactionAggregate',
            'on' => "Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource'",
        ],
    ],
    'where' => '{"Aggregate.likes:>":0}',
    'sortby' => 'Aggregate.likes',
    'sortdir' => 'DESC',
]}
```

:::

## Notes

- Make sure the `Reactions` package is registered in xPDO: the `ReactionAggregate` class is available under the full name `Reactions\Model\ReactionAggregate`.
- If an object has no aggregate, `leftJoin` returns `NULL`. Those rows end up last with `DESC` or first with `ASC`.
- After a bulk import of reactions, run `php core/components/reactions/cli.php recount`.
