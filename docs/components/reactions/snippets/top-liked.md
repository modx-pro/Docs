---
title: Сниппет TopLiked
---
# Сниппет TopLiked

Выводит список объектов с наибольшим числом лайков. Сортировка по полю `likes` в таблице агрегатов.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `class` | `modResource` | `class_key` объектов в выборке |
| `period` | `all` | Период: `day`, `week`, `month`, `year`, `all` |
| `limit` | `10` | Максимум элементов |
| `context` | *(пусто)* | Фильтр по контексту. Пустое значение — все контексты |
| `tpl` | `tpl.Reactions.top` | Чанк одной строки списка |
| `toPlaceholder` | *(пусто)* | Имя плейсхолдера вместо прямого вывода |

## Плейсхолдеры чанка

| Плейсхолдер | Описание |
| --- | --- |
| `[[+idx]]` | Порядковый номер (1, 2, 3…) |
| `[[+object_id]]` | ID объекта |
| `[[+class_key]]` | Класс объекта (в БД: `object_class`) |
| `[[+pagetitle]]` | Заголовок ресурса / name товара |
| `[[+uri]]` | URL объекта (или пусто) |
| `[[+likes]]` | Количество лайков |
| `[[+dislikes]]` | Количество дизлайков |
| `[[+total]]` | Сумма всех реакций |
| `[[+rating]]` | Рейтинг (likes − dislikes) |
| `[[+trending_score]]` | Оценка trending |

## Периоды

| Значение | Окно |
| --- | --- |
| `day` | Последние 24 часа |
| `week` | Последние 7 дней |
| `month` | Последние 30 дней |
| `year` | Последние 365 дней |
| `all` | Всё время (из таблицы агрегатов) |

Для периодов кроме `all` компонент пересчитывает топ по сырым записям реакций за окно.

## Примеры

Обёртку `<ul class="reactions-top">` ставьте сами: чанк строки выводит `<li>…</li>`.

### Ресурсы: неделя / лимит

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

### Периоды `day` · `week` · `month` · `year` · `all`

Один и тот же вызов, меняете только `period`:

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

### Товары miniShop3

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

Заголовок и URI строки берёт `ObjectLookup` / ресурс STI — короткий `msProduct` подходит.

### Фильтр контекста `web`

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

### В плейсхолдер

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

### Свой чанк строки

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

### Комментарии Tickets

На MODX 3 не проверено:

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
