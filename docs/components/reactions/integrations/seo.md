---
title: SEO и Schema.org
---
# SEO: ReactionsSchema

Сниппет `ReactionsSchema` выводит JSON-LD разметку `AggregateRating` для поисковых систем.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `class` | `modResource` | Класс объекта |
| `object` | ID текущего ресурса | ID объекта |
| `context` | ключ текущего контекста | Контекст MODX |
| `toPlaceholder` | *(пусто)* | Имя плейсхолдера вместо прямого вывода |

## Логика расчёта

Сниппет берёт счётчики `like` и `dislike` (также учитывает `up`/`down`):

| Условие | Вывод |
| --- | --- |
| Есть и лайки, и дизлайки | `ratingValue` = 1…5 по формуле `1 + 4 × (likes / voted)`, `ratingCount` = likes + dislikes |
| Только лайки, без дизлайков | `ratingCount` = likes (без `ratingValue`) |
| Нет реакций | Пустая строка, тег не выводится |

Пример JSON-LD при 80 лайках и 20 дизлайках:

```json
{
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "ratingValue": 4.2,
  "ratingCount": 100,
  "bestRating": 5,
  "worstRating": 1
}
```

## Примеры

JSON-LD появляется только при ненулевых `like`/`up` или `dislike`/`down`. Одни эмодзи вроде `love` без like/dislike разметку не дают.

### Ресурс с голосами

В `<head>` или перед `</body>`:

::: code-group

```modx
[[!ReactionsSchema?
    &class=`modResource`
    &object=`[[*id]]`
    &context=`web`
]]
```

```fenom
{raw ('!ReactionsSchema' | snippet : [
    'class'   => 'modResource',
    'object'  => $_modx->resource.id,
    'context' => 'web',
])}
```

:::

### Пустой объект — пустой output

Нет like/dislike → сниппет возвращает пустую строку (удобно в условии шаблона):

```fenom
{set $schema = '!ReactionsSchema' | snippet : [
    'class'   => 'modResource',
    'object'  => 999999001,
    'context' => 'web',
]}
{if $schema}{raw $schema}{/if}
```

### Товар miniShop3

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
    'object'  => $product.id,
    'context' => 'web',
])}
```

:::

### В плейсхолдер

::: code-group

```modx
[[!ReactionsSchema?
    &object=`[[*id]]`
    &context=`web`
    &toPlaceholder=`rx.schema`
]]
[[+rx.schema]]
```

```fenom
{'!ReactionsSchema' | snippet : [
    'object'  => $_modx->resource.id,
    'context' => 'web',
    'toPlaceholder' => 'rx.schema',
]}
{raw ($_modx->getPlaceholder('rx.schema'))}
```

:::

## Связь с основным типом Schema.org

`AggregateRating` должен быть вложен в объект с `@type` (`Article`, `Product`, `BlogPosting` и т.д.). Сниппет выводит только блок рейтинга.

Вариант 1: оберните в свой сниппет или шаблон.

::: code-group

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[[*pagetitle]]",
  "aggregateRating": {
    "ratingValue": 4.2,
    "ratingCount": 100,
    "bestRating": 5,
    "worstRating": 1
  }
}
</script>
```

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{$_modx->resource.pagetitle | escape}",
  "aggregateRating": {
    "ratingValue": 4.2,
    "ratingCount": 100,
    "bestRating": 5,
    "worstRating": 1
  }
}
</script>
```

:::

Вариант 2: выведите `ReactionsSchema` рядом с основной разметкой. Google объединяет блоки на одной странице, но вложенная структура надёжнее.

## Интеграция с SEO-плагинами

Если SEO-плагин уже генерирует JSON-LD, отключите дублирование `AggregateRating` в одном из источников. Проверьте результат в [Rich Results Test](https://search.google.com/test/rich-results).

## Когда разметка не появится

- На объекте нет ни одной реакции.
- Все реакции типов, отличных от like/dislike (например, только `love` в наборе `github`), без парных up/down — сниппет выведет `ratingCount` только при наличии лайков без дизлайков.

Для SEO на GitHub-наборе учитывайте, что `ratingValue` считается только из like/dislike.
