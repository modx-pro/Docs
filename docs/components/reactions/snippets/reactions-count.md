---
title: Сниппет ReactionsCount
---
# Сниппет ReactionsCount

Текстовые счётчики без кнопок — для карточек, списков, мета-строк.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `class` | `modResource` | Класс объекта (`class_key` в API) |
| `object` | ID текущего ресурса | ID объекта |
| `context` | ключ текущего контекста | Контекст MODX |
| `format` | `{TOTAL}` | Строка с плейсхолдерами |
| `type` | *(пусто)* | Узкий фильтр по имени типа (`like`, `love`…) |
| `toPlaceholder` | *(пусто)* | Имя плейсхолдера вместо прямого вывода |

## Плейсхолдеры формата

| Плейсхолдер | Описание |
| --- | --- |
| `{TOTAL}` | Сумма всех реакций |
| `{LIKES}` | Сумма `like` + `up` |
| `{DISLIKES}` | Сумма `dislike` + `down` |
| `{RATING}` | `LIKES − DISLIKES` |
| `{PCT_UP}` | Доля лайков от общего, 0–100 |
| `{PCT_DOWN}` | Доля дизлайков от общего, 0–100 |
| `{like}`, `{love}`, `{funny}`… | Счётчик типа. Нет данных → `0`, не сырой `{love}` |

## Примеры

### По умолчанию: только `{TOTAL}`

::: code-group

```modx
[[!ReactionsCount]]
```

```fenom
{'!ReactionsCount' | snippet : [
    'class'  => 'modResource',
    'object' => $_modx->resource.id,
]}
```

:::

Пример вывода: `15`.

### TOTAL / LIKES / DISLIKES одной строкой

::: code-group

```modx
[[!ReactionsCount?
    &format=`Всего {TOTAL}: 👍 {LIKES} / 👎 {DISLIKES}`
]]
```

```fenom
{'!ReactionsCount' | snippet : [
    'format' => 'Всего {TOTAL}: 👍 {LIKES} / 👎 {DISLIKES}',
]}
```

:::

### Рейтинг и проценты

::: code-group

```modx
[[!ReactionsCount?
    &format=`Рейтинг {RATING} · ↑{PCT_UP}% · ↓{PCT_DOWN}%`
]]
```

```fenom
{'!ReactionsCount' | snippet : [
    'format' => 'Рейтинг {RATING} · ↑{PCT_UP}% · ↓{PCT_DOWN}%',
]}
```

:::

### Один тип через `&type=`

::: code-group

```modx
[[!ReactionsCount?
    &type=`like`
    &format=`Лайков: {like}`
]]
```

```fenom
{'!ReactionsCount' | snippet : [
    'type'   => 'like',
    'format' => 'Лайков: {like}',
]}
```

:::

### Несколько именованных типов в `format`

Имена без отдельного `&type=`:

::: code-group

```modx
[[!ReactionsCount?
    &format=`❤️ {love} · 🔥 {fire} · ⭐ {star} · 🚀 {rocket}`
]]
```

```fenom
{'!ReactionsCount' | snippet : [
    'format' => '❤️ {love} · 🔥 {fire} · ⭐ {star} · 🚀 {rocket}',
]}
```

:::

Нулевые и отсутствующие типы печатаются как `0`.

### Только лайки

::: code-group

```modx
[[!ReactionsCount? &format=`{LIKES}`]]
```

```fenom
{'!ReactionsCount' | snippet : ['format' => '{LIKES}']}
```

:::

### Товар miniShop3

::: code-group

```modx
[[!ReactionsCount?
    &class=`msProduct`
    &object=`[[*id]]`
    &format=`Товар: 👍 {LIKES} · всего {TOTAL}`
]]
```

```fenom
{'!ReactionsCount' | snippet : [
    'class'  => 'msProduct',
    'object' => $product.id,
    'format' => 'Товар: 👍 {LIKES} · всего {TOTAL}',
]}
```

:::

### В плейсхолдер (pdoResources / карточка)

::: code-group

```modx
[[!ReactionsCount?
    &object=`[[+id]]`
    &format=`Всего {TOTAL}: 👍 {LIKES} / 👎 {DISLIKES}`
    &toPlaceholder=`rx.count`
]]
[[+rx.count]]
```

```fenom
{'!ReactionsCount' | snippet : [
    'object' => $id,
    'format' => 'Всего {TOTAL}: 👍 {LIKES} / 👎 {DISLIKES}',
    'toPlaceholder' => 'rx.count',
]}
{$_modx->getPlaceholder('rx.count')}
```

:::

### Комментарий Tickets

На MODX 3 не проверено. Вызов:

::: code-group

```modx
[[!ReactionsCount?
    &class=`TicketComment`
    &object=`[[+id]]`
    &format=`{LIKES}`
]]
```

```fenom
{'!ReactionsCount' | snippet : [
    'class'  => 'TicketComment',
    'object' => $comment.id,
    'format' => '{LIKES}',
]}
```

:::
