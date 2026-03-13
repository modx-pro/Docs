# sfWord

A simple snippet for quickly getting **Value** and **Alias** from the Dictionary. It can also be called as a modifier.

If no value is found for the word with the given field id, it will be created. So use with care. It is useful wherever you need the synonym and value of a word regardless of page.

By default it returns an array (for use in Fenom), but it can return processed output if you pass the **tpl** parameter.

If you need to build one or more full links with the correct URL, use snippet [sfLink](/en/components/seofilter/snippets/sflink).

If you need to output many links (e.g. a full menu) with result counts and extra conditions, use [sfMenu](/en/components/seofilter/snippets/sfmenu).

## Parameters

It accepts 2 to 3 parameters. By default none of them have values.

| Parameter | Description | Example |
| --- | --- | --- |
| **&field_id** or **&options** | Required. Field ID from the first tab of SeoFilter. | 5 |
| **&input** | Required. The original value (query) from the resource field. | `[[*color]]` |
| **&tpl** | Optional. Used to process the result. Processed via pdoTools; INLINE chunks supported. | `@INLINE <a href="{$15 \| url}color-{$alias}">{$value}</a>` |

::: warning
If no value is found for the given field, it will be created and written to the dictionary. The alias is created automatically and the word is declined if that option is enabled in settings.
:::

## Examples

All examples assume you know the page id, the rule that builds links, and that you are not using custom addresses for SEO pages.

1. Generating color links from miniShop2 options in chunk **tpl.msProducts.row** (13 is the Color field id in SeoFilter):

```fenom
{if $color | iterable?}
  {foreach $color as $c}
    {var $word = $c | sfWord : 13}
    <a href="{9 | url}cvet-{$word.alias}" class="label label-info">{$word.value}</a>
  {/foreach}
{/if}
```

2. Building links in an article catalog on the demo site (TV type: Auto-tag, output with comma separator):

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

The snippet is simple to use and fast, and it can add new words from the frontend. For more complex links and any links that respect field conditions, use [sfLink](/en/components/seofilter/snippets/sflink).
