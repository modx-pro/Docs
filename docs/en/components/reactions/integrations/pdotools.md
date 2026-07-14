---
title: pdoTools integration
---
# pdoTools integration

Sort and list resources, products, and other objects by reactions with a `leftJoin` on the `ReactionAggregate` model.

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

```json
[[!pdoResources?
    &parents=`0`
    &depth=`10`
    &limit=`12`
    &leftJoin=`{"Aggregate":{"class":"Reactions\\Model\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource' AND Aggregate.context = 'web'"}}`
    &sortby=`Aggregate.likes`
    &sortdir=`DESC`
    &tpl=`tpl.article.card`
]]
```

```json
{'!pdoResources' | snippet : [
    'parents' => 0,
    'depth' => 10,
    'limit' => 12,
    'leftJoin' => '{"Aggregate":{"class":"Reactions\\Model\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = \'modResource\' AND Aggregate.context = \'web\'"}}',
    'sortby' => 'Aggregate.likes',
    'sortdir' => 'DESC',
    'tpl' => 'tpl.article.card',
]}
```

:::

## Sort by rating

::: code-group

```json
[[!pdoResources?
    &parents=`5`
    &leftJoin=`{"Aggregate":{"class":"Reactions\\Model\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource'"}}`
    &sortby=`Aggregate.rating`
    &sortdir=`DESC`
    &limit=`10`
]]
```

```json
{'!pdoResources' | snippet : [
    'parents' => 5,
    'leftJoin' => '{"Aggregate":{"class":"Reactions\\Model\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = \'modResource\'"}}',
    'sortby' => 'Aggregate.rating',
    'sortdir' => 'DESC',
    'limit' => 10,
]}
```

:::

## Sort by trending

::: code-group

```json
[[!pdoResources?
    &parents=`0`
    &leftJoin=`{"Aggregate":{"class":"Reactions\\Model\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource'"}}`
    &sortby=`Aggregate.trending_score`
    &sortdir=`DESC`
    &limit=`8`
]]
```

```json
{'!pdoResources' | snippet : [
    'parents' => 0,
    'leftJoin' => '{"Aggregate":{"class":"Reactions\\Model\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = \'modResource\'"}}',
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

```json
[[!pdoPage?
    &element=`pdoResources`
    &parents=`0`
    &leftJoin=`{"Aggregate":{"class":"Reactions\\Model\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource'"}}`
    &sortby=`Aggregate.likes`
    &sortdir=`DESC`
    &tpl=`tpl.article.card`
]]
[[!+page.nav]]
```

```json
{'!pdoPage' | snippet : [
    'element' => 'pdoResources',
    'parents' => 0,
    'leftJoin' => '{"Aggregate":{"class":"Reactions\\Model\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = \'modResource\'"}}',
    'sortby' => 'Aggregate.likes',
    'sortdir' => 'DESC',
    'tpl' => 'tpl.article.card',
]}
{$_modx->getPlaceholder('page.nav')}
```

:::

In a Fenom row template (when results are in `$results`):

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

## Filter: only objects with reactions

::: code-group

```json
[[!pdoResources?
    &parents=`0`
    &leftJoin=`{"Aggregate":{"class":"Reactions\\Model\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource'"}}`
    &where=`{"Aggregate.likes:>":0}`
    &sortby=`Aggregate.likes`
    &sortdir=`DESC`
]]
```

```json
{'!pdoResources' | snippet : [
    'parents' => 0,
    'leftJoin' => '{"Aggregate":{"class":"Reactions\\Model\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = \'modResource\'"}}',
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
