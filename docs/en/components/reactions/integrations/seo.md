---
title: SEO and Schema.org
---
# SEO: ReactionsSchema

The `ReactionsSchema` snippet outputs JSON-LD `AggregateRating` markup for search engines.

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `class` | `modResource` | Object class |
| `object` | current resource ID | Object ID |
| `context` | current context key | MODX context |
| `toPlaceholder` | *(empty)* | Placeholder name instead of direct output |

## Calculation logic

The snippet reads `like` and `dislike` counts (also counts `up`/`down`):

| Condition | Output |
| --- | --- |
| Both likes and dislikes | `ratingValue` = 1…5 via `1 + 4 × (likes / voted)`, `ratingCount` = likes + dislikes |
| Likes only, no dislikes | `ratingCount` = likes (no `ratingValue`) |
| No reactions | Empty string, no tag |

Sample JSON-LD with 80 likes and 20 dislikes:

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

## Examples

JSON-LD appears only when `like`/`up` or `dislike`/`down` is non-zero. Emoji-only types such as `love` without like/dislike do not produce markup.

### Resource with votes

In `<head>` or before `</body>`:

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

### Empty object — empty output

No like/dislike → the snippet returns an empty string (handy in a template condition):

```fenom
{set $schema = '!ReactionsSchema' | snippet : [
    'class'   => 'modResource',
    'object'  => 999999001,
    'context' => 'web',
]}
{if $schema}{raw $schema}{/if}
```

### miniShop3 product

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

### Into a placeholder

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

## Relation to the main Schema.org type

`AggregateRating` must sit inside an object with `@type` (`Article`, `Product`, `BlogPosting`, and so on). The snippet outputs only the rating block.

Option 1: wrap it in your own snippet or template.

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

Option 2: output `ReactionsSchema` next to the main markup. Google merges blocks on the same page, but a nested structure is more reliable.

## Integration with SEO plugins

If an SEO plugin already generates JSON-LD, turn off duplicate `AggregateRating` in one of the sources. Check the result in [Rich Results Test](https://search.google.com/test/rich-results).

## When markup does not appear

- The object has no reactions.
- All reactions are types other than like/dislike (for example only `love` in the `github` set), with no paired up/down. The snippet outputs `ratingCount` only when there are likes and no dislikes.

For SEO with the GitHub set, remember that `ratingValue` is computed only from like/dislike.
