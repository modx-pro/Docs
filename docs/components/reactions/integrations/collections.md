---
title: Интеграция с Collections
---
# Интеграция с Collections

Реакции на ресурсы Collections работают как на обычных `modResource`. Collections не требует отдельного `class_key`.

## Блок реакций на странице коллекции

::: code-group

```modx
[[!Reactions? &set=`github`]]
```

```fenom
{'!Reactions' | snippet : ['set' => 'github']}
```

:::

## Счётчик в списке дочерних ресурсов

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

## Сортировка дочерних по популярности

Через pdoResources с `leftJoin` на `ReactionAggregate`.

::: code-group

```modx
[[!pdoResources?
    &parents=`[[*id]]`
    &depth=`1`
    &leftJoin=`{"Aggregate":{"class":"Reactions\\Model\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource'"}}`
    &sortby=`Aggregate.likes`
    &sortdir=`DESC`
    &tpl=`@INLINE <li><a href="[[+uri]]">[[+pagetitle]]</a> — [[!ReactionsCount? &object=`[[+id]]` &format=`{LIKES}`]]</li>`
]]
```

```fenom
{'!pdoResources' | snippet : [
    'parents' => $_modx->resource.id,
    'depth' => 1,
    'leftJoin' => '{"Aggregate":{"class":"Reactions\\Model\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = \'modResource\'"}}',
    'sortby' => 'Aggregate.likes',
    'sortdir' => 'DESC',
    'tpl' => '@INLINE <li><a href="[[+uri]]">[[+pagetitle]]</a> — [[!ReactionsCount? &object=`[[+id]]` &format=`{LIKES}`]]</li>',
]}
```

:::

## Топ материалов коллекции

Ограничьте выборку родителем через pdoResources, а не через `TopLiked` напрямую. `TopLiked` сортирует глобально по `class_key`, без фильтра по родителю.

Вариант: pdoResources + sortby `Aggregate.likes` (см. выше).

Глобальный топ (все ресурсы контекста):

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

## Шаблон коллекции с trending

На странице «Популярное в разделе»:

::: code-group

```modx
<h2>Горячие материалы</h2>
[[!pdoResources?
    &parents=`[[*id]]`
    &depth=`2`
    &leftJoin=`{"Aggregate":{"class":"Reactions\\Model\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = 'modResource'"}}`
    &sortby=`Aggregate.trending_score`
    &sortdir=`DESC`
    &limit=`6`
    &tpl=`tpl.collection.trending`
]]
```

```fenom
<h2>Горячие материалы</h2>
{'!pdoResources' | snippet : [
    'parents' => $_modx->resource.id,
    'depth' => 2,
    'leftJoin' => '{"Aggregate":{"class":"Reactions\\Model\\ReactionAggregate","on":"Aggregate.object_id = modResource.id AND Aggregate.object_class = \'modResource\'"}}',
    'sortby' => 'Aggregate.trending_score',
    'sortdir' => 'DESC',
    'limit' => 6,
    'tpl' => 'tpl.collection.trending',
]}
```

:::

## Schema.org

Добавьте `ReactionsSchema` в шаблон ресурса коллекции.

::: code-group

```modx
[[!ReactionsSchema]]
```

```fenom
{'!ReactionsSchema' | snippet}
```

:::

Подробнее — в [seo.md](seo).
