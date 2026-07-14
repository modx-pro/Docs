---
title: Интеграция с pdoTools
---
# Интеграция с pdoTools

Сортировка и вывод ресурсов, товаров и других объектов по реакциям через `leftJoin` на модель `ReactionAggregate`.

## Модель ReactionAggregate

Таблица `reactions_aggregates` хранит предрассчитанные метрики:

| Поле | Описание |
| --- | --- |
| `object_class` | Класс объекта (`modResource`, `msProduct`…) |
| `object_id` | ID объекта |
| `context` | Контекст MODX |
| `counts` | JSON со счётчиками по типам |
| `likes` | Сумма `like` + `up` |
| `dislikes` | Сумма `dislike` + `down` |
| `rating` | `likes − dislikes` |
| `total` | Сумма всех реакций |
| `trending_score` | Оценка trending |

## Сортировка ресурсов по лайкам

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

## Сортировка по рейтингу

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

## Сортировка по trending

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

## Вывод счётчиков в чанке pdoResources

В чанке `tpl.article.card`:

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

Или через плейсхолдер:

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

## Список через pdoPage

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

В Fenom-шаблоне строки (если результаты в `$results`):

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

## Фильтр: только объекты с реакциями

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

## Примечания

- Убедитесь, что пакет `Reactions` зарегистрирован в xPDO: класс `ReactionAggregate` доступен по полному имени `Reactions\Model\ReactionAggregate`.
- Если агрегат для объекта отсутствует, `leftJoin` вернёт `NULL` — такие записи окажутся в конце при `DESC` или в начале при `ASC`.
- После массового импорта реакций запустите `php core/components/reactions/cli.php recount`.
