---
title: Сниппет TopRated
---
# Сниппет TopRated

Выводит список объектов с наивысшим рейтингом. Рейтинг = `likes − dislikes` (баланс up/down).

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `class` | `modResource` | `class_key` объектов в выборке |
| `period` | `all` | Период: `day`, `week`, `month`, `year`, `all` |
| `limit` | `10` | Максимум элементов |
| `context` | *(пусто)* | Фильтр по контексту |
| `tpl` | `tpl.Reactions.top` | Чанк одной строки списка |
| `toPlaceholder` | *(пусто)* | Имя плейсхолдера вместо прямого вывода |

## Плейсхолдеры чанка

| Плейсхолдер | Описание |
| --- | --- |
| `[[+idx]]` | Порядковый номер |
| `[[+object_id]]` | ID объекта |
| `[[+class_key]]` | Класс объекта (в БД: `object_class`) |
| `[[+pagetitle]]` | Заголовок ресурса / name товара |
| `[[+uri]]` | URL объекта (или пусто) |
| `[[+likes]]` | Количество лайков |
| `[[+dislikes]]` | Количество дизлайков |
| `[[+total]]` | Сумма всех реакций |
| `[[+rating]]` | Рейтинг (likes − dislikes) |
| `[[+trending_score]]` | Оценка trending |

## Примеры

Сортировка по `rating` (= likes − dislikes). Те же периоды, что у `TopLiked`: `day` / `week` / `month` / `year` / `all`.

### Ресурсы за выбранный период

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

### Месяц и год

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

### Товары miniShop3

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

### В плейсхолдер + свой чанк

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

### Контекст `web`

::: code-group

```modx
[[!TopRated? &period=`all` &context=`web` &limit=`20`]]
```

```fenom
{'!TopRated' | snippet : [
    'period'  => 'all',
    'context' => 'web',
    'limit'   => 20,
]}
```

:::

### Комментарии Tickets

На MODX 3 не проверено:

::: code-group

```modx
[[!TopRated? &class=`TicketComment` &period=`week` &limit=`3`]]
```

```fenom
{'!TopRated' | snippet : [
    'class'  => 'TicketComment',
    'period' => 'week',
    'limit'  => 3,
]}
```

:::

## TopLiked vs TopRated

| Сниппет | Сортировка | Когда использовать |
| --- | --- | --- |
| `TopLiked` | По `likes` | «Самые популярные» — много положительных реакций |
| `TopRated` | По `rating` | «Лучшие» — высокий баланс лайков и дизлайков |

Статья с 100 лайками и 95 дизлайками попадёт в `TopLiked`, но не в `TopRated`.
