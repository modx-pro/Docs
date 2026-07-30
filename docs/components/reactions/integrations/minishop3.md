---
title: Интеграция с miniShop3
---
# Интеграция с miniShop3

В сниппетах и API передавайте короткий класс `msProduct` и ID товара (`&object=` / `object_id`). Сервер находит товар через FQCN (`MiniShop3\Model\msProduct`) и STI `modResource`, короткое имя в xPDO не дергает — без шума в error.log.

В агрегатах поле `object_class` хранится как `msProduct` (то, что вы передали в `class` / `class_key`). Join в каталоге стройте по этой же строке.

## Блок реакций на карточке товара

`github` в режиме picker (чипы + `+`):

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

Только 👍/👎:

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

## Счётчик в каталоге

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

## Сортировка каталога по популярности

Через `msProducts` и `leftJoin`. Из‑за `GROUP BY msProduct.id` в msProducts используйте `MAX(Aggregate.likes)`, не `Aggregate.likes` (см. [pdoTools](pdotools)).

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

## Топ товаров

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

Трендовые товары:

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

## Счётчик в чанке msProducts

В `tpl.msProduct.card`:

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

## Контекст

Товары обычно живут в контексте `web`. Если каталог в отдельном контексте, передайте `context`:

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

## JSON-LD на карточке товара

Только при наличии like/dislike у товара. В Fenom — через `{raw …}`:

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

## Пересчёт агрегатов

После миграции или импорта:

```bash
php core/components/reactions/cli.php recount --class-key=msProduct
```
