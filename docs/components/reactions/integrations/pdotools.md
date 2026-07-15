---
title: Интеграция с pdoTools
---
# Интеграция с pdoTools

Сортировка и вывод ресурсов, товаров и других объектов по реакциям через `leftJoin` на модель `ReactionAggregate`.

## leftJoin: JSON и Fenom

`leftJoin` передаётся в pdoTools как **массив** или JSON-строка. Класс модели в JSON пишется с экранированием: `"Reactions\\Model\\ReactionAggregate"` (в итоговой строке два символа `\` перед `Model`).

| Способ | Пример |
| --- | --- |
| MODX-тег | `"class":"Reactions\\\\Model\\\\ReactionAggregate"` — **четыре** `\` в шаблоне, в JSON остаётся два |
| Fenom | массив `'class' => 'Reactions\Model\ReactionAggregate'` — предпочтительно, без JSON |
| PHP / сниппет | `'class' => ReactionAggregate::class` или массив join |

Если JSON невалиден, `json_decode` в msProducts/pdoResources молча не добавит join. Тогда в логе:

`Unknown column 'Aggregate.likes' in 'order clause'`

### msProducts и ONLY_FULL_GROUP_BY

`msProducts` всегда группирует по `msProduct.id`. На MySQL с `ONLY_FULL_GROUP_BY` нельзя сортировать просто по `Aggregate.likes` — используйте агрегат:

`&sortby=`MAX(Aggregate.likes)`` или `'sortby' => 'MAX(Aggregate.likes)'`

Для `pdoResources` без `GROUP BY` достаточно `Aggregate.likes`.

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

## Сортировка по рейтингу

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

## Сортировка по trending

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

В шаблоне строки списка (чанк `tpl` / цикл `$results`):

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

## Фильтр: только объекты с реакциями

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

## Примечания

- Убедитесь, что пакет `Reactions` зарегистрирован в xPDO: класс `ReactionAggregate` доступен по полному имени `Reactions\Model\ReactionAggregate`.
- Если агрегат для объекта отсутствует, `leftJoin` вернёт `NULL` — такие записи окажутся в конце при `DESC` или в начале при `ASC`.
- После массового импорта реакций запустите `php core/components/reactions/cli.php recount`.
