---
title: ReactionsCount snippet
---
# ReactionsCount snippet

Text counters without buttons, for cards, lists, and meta rows.

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `class` | `modResource` | Object class (`class_key` in the API) |
| `object` | current resource ID | Object ID |
| `context` | current context key | MODX context |
| `format` | `{TOTAL}` | String with placeholders |
| `type` | *(empty)* | Narrow filter by type name (`like`, `love`…) |
| `toPlaceholder` | *(empty)* | Placeholder name instead of direct output |

## Format placeholders

| Placeholder | Description |
| --- | --- |
| `{TOTAL}` | Sum of all reactions |
| `{LIKES}` | Sum of `like` + `up` |
| `{DISLIKES}` | Sum of `dislike` + `down` |
| `{RATING}` | `LIKES − DISLIKES` |
| `{PCT_UP}` | Like share of the total, 0–100 |
| `{PCT_DOWN}` | Dislike share of the total, 0–100 |
| `{like}`, `{love}`, `{funny}`… | Count for that type. No data → `0`, not a raw `{love}` |

## Examples

### Default: `{TOTAL}` only

::: code-group

```modx
[[!ReactionsCount]]
```

```fenom
{'!ReactionsCount' | snippet}
```

:::

Sample output: `15`.

### TOTAL / LIKES / DISLIKES in one line

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

### Rating and percentages

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

### Single type via `&type=`

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

### Several named types in `format`

Names without a separate `&type=`:

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

Zero and missing types print as `0`.

### Likes only

::: code-group

```modx
[[!ReactionsCount? &format=`{LIKES}`]]
```

```fenom
{'!ReactionsCount' | snippet : ['format' => '{LIKES}']}
```

:::

### miniShop3 product

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
    'object' => $_modx->resource.id,
    'format' => 'Товар: 👍 {LIKES} · всего {TOTAL}',
]}
```

:::

### To a placeholder (pdoResources / card)

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

### Tickets comment

Not verified on MODX 3. Call:

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
    'object' => $id,
    'format' => '{LIKES}',
]}
```

:::
