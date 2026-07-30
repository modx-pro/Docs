---
title: Collections integration
---
# Collections integration

Reactions on Collections resources work the same as on plain `modResource`. Collections does not need a separate `class_key`.

## Reaction block on a collection page

::: code-group

```modx
[[!Reactions? &set=`github`]]
```

```fenom
{'!Reactions' | snippet : ['set' => 'github']}
```

:::

## Counter in the child resource list

::: code-group

```modx
<article class="collection-item">
    <h2><a href="[[~[[+id]]]]">[[+pagetitle]]</a></h2>
    [[!ReactionsCount?
        &object=`[[+id]]`
        &format=`👍 {LIKES} · 💬 {TOTAL}`
    ]]
</article>
```

```fenom
<article class="collection-item">
    <h2><a href="{$id | url}">{$pagetitle}</a></h2>
    {'!ReactionsCount' | snippet : [
        'object' => $id,
        'format' => '👍 {LIKES} · 💬 {TOTAL}',
    ]}
</article>
```

:::

## Sort children by popularity

Use pdoResources with a `leftJoin` on `ReactionAggregate`.

::: code-group

```modx
[[!pdoResources?
    &parents=`[[*id]]`
    &depth=`1`
    &leftJoin=`{"Aggregate":{"class":"Reactions\\\\Model\\\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource'"}}`
    &sortby=`Aggregate.likes`
    &sortdir=`DESC`
    &tpl=`@INLINE <li><a href="[[+uri]]">[[+pagetitle]]</a> — [[!ReactionsCount? &object=`[[+id]]` &format=`{LIKES}`]]</li>`
]]
```

```fenom
{'!pdoResources' | snippet : [
    'parents' => $_modx->resource.id,
    'depth' => 1,
    'leftJoin' => [
        'Aggregate' => [
            'class' => 'Reactions\Model\ReactionAggregate',
            'on' => "Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource'",
        ],
    ],
    'sortby' => 'Aggregate.likes',
    'sortdir' => 'DESC',
    'tpl' => '@INLINE <li><a href="[[+uri]]">[[+pagetitle]]</a> — [[!ReactionsCount? &object=`[[+id]]` &format=`{LIKES}`]]</li>',
]}
```

:::

## Top items in a collection

Limit the selection by parent with pdoResources, not with `TopLiked` alone. `TopLiked` sorts globally by `class_key` and has no parent filter.

Option: pdoResources + sortby `Aggregate.likes` (see above).

Global top (all resources in the context):

::: code-group

```modx
[[!TopLiked?
    &class=`modResource`
    &period=`month`
    &limit=`10`
    &context=`web`
]]
```

```fenom
{'!TopLiked' | snippet : [
    'class'   => 'modResource',
    'period'  => 'month',
    'limit'   => 10,
    'context' => 'web',
]}
```

:::

## Collection template with trending

On a “Popular in this section” page:

::: code-group

```modx
<h2>Hot items</h2>
[[!pdoResources?
    &parents=`[[*id]]`
    &depth=`2`
    &leftJoin=`{"Aggregate":{"class":"Reactions\\\\Model\\\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource'"}}`
    &sortby=`Aggregate.trending_score`
    &sortdir=`DESC`
    &limit=`6`
    &tpl=`tpl.collection.trending`
]]
```

```fenom
<h2>Hot items</h2>
{'!pdoResources' | snippet : [
    'parents' => $_modx->resource.id,
    'depth' => 2,
    'leftJoin' => [
        'Aggregate' => [
            'class' => 'Reactions\Model\ReactionAggregate',
            'on' => "Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource'",
        ],
    ],
    'sortby' => 'Aggregate.trending_score',
    'sortdir' => 'DESC',
    'limit' => 6,
    'tpl' => 'tpl.collection.trending',
]}
```

:::

## Schema.org

Add `ReactionsSchema` to the collection resource template.

::: code-group

```modx
[[!ReactionsSchema]]
```

```fenom
{'!ReactionsSchema' | snippet}
```

:::

Details: [SEO and Schema.org](seo).
