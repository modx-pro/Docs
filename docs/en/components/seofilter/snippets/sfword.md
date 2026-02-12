# sfWord

Simple snippet for Value and Alias from Dictionary. Callable as modifier.

If value not found for given field id, it will be created. Use with care. Use when you need synonym and value regardless of page.

Returns array (Fenom) by default; returns processed result if **tpl** passed.

For full links use [sfLink](/en/components/seofilter/snippets/sflink). For menu with counts and conditions use [sfMenu](/en/components/seofilter/snippets/sfmenu).

## Parameters

| Parameter | Description | Example |
| --- | --- | --- |
| **&field_id** or **&options** | Required. Field ID from SeoFilter first tab. | 5 |
| **&input** | Required. Original value (query) from resource field | `[[*color]]` |
| **&tpl** | Optional. Result wrapper. pdoTools, INLINE chunks. | `@INLINE <a href="{$15 \| url}color-{$alias}">{$value}</a>` |

::: warning
If value not found, it will be created in dictionary. Alias auto-created; declension if enabled.
:::

## Examples

1. Color links from miniShop2 in **tpl.msProducts.row** (13 = Color field id):

```fenom
{if $color | iterable?}
  {foreach $color as $c}
    {var $word = $c | sfWord : 13}
    <a href="{9 | url}cvet-{$word.alias}" class="label label-info">{$word.value}</a>
  {/foreach}
{/if}
```

2. Tag links in article catalog (TV: Auto-tag, comma separator):

```fenom
{if $tags?}
  {var $tags_a = $tags | split}
  {foreach $tags_a as $tag}
    {set $word = $tag | sfWord : 14}
    <a href="{31 | url}{$word.alias}" class="label label-success">{$word.value}</a>
  {/foreach}
{/if}
```

3. MODX call:

```modx
[[!sfWord? &input=`[[*parent]]` &field_id=`12` &tpl=`@INLINE <a href="{9 | url}{$alias}">{$value}</a>`]]
```

For complex links with field conditions use [sfLink](/en/components/seofilter/snippets/sflink).
