---
title: getLocalizedResources snippet
description: Parameters and examples for getLocalizedResources, getLocalizedField, and Fenom modifiers
---

# getLocalizedResources snippet

Selects resources for the current localization and runs another snippet (pdoResources, pdoMenu, msProducts, ms3Products, and others) that joins the localizations table.

Fields `pagetitle`, `longtitle`, `menutitle`, `description`, `introtext`, `content` come from `localizator3_content`. Without `localizator3_default_from_resource`, an empty cell uses the document. With that setting on and a non-base key, an empty cell stays empty; a missing row (`id IS NULL`) uses the document. Empty `menutitle` uses localized `pagetitle`, otherwise the document `menutitle`. `seotitle` and `keywords` are not in the listing SELECT.

Direct `pdoResources` / `pdoMenu` with fetch class `ModxPro\PdoTools\FetchLocalizator` join the same fields (if a `localizator` join is not already present). The `getLocalizedResources` wrapper adds the join itself. Legacy `pdoFetchLocalizator` does not.

Listing `uri` has no leading slash (`en/page.html`); `link` from `makeUrl` has a leading slash. Base `/` gets no language prefix. Only `FetchLocalizator` writes the prefix.

## Parameters

| Name | Default | Description |
| --- | --- | --- |
| **snippet** | `pdoResources` | Snippet to run. `name@propertySet` is allowed |
| **class** | `modResource` | Object class. For `msProducts` and `ms3Products` the MiniShop3 product class is used |
| **localizator3_key** | current | Language key. Inserted into SQL as-is; case is not normalized |
| **onlyWithLocalization** | No | INNER JOIN only to rows with the same key and `active = 1`. With `localizator3_default_from_resource` and the default key, `getListingQuery` builds no join: the parameter filters nothing |

Other parameters are passed to the inner snippet.

## Examples

### Output via pdoMenu

::: code-group

```fenom
{'!getLocalizedResources' | snippet : [
  'snippet' => 'pdoMenu',
  'parents' => 0,
  'level' => 1,
]}
```

```modx
[[!getLocalizedResources?
  &snippet=`pdoMenu`
  &parents=`0`
  &level=`1`
]]
```

:::

### Resources via pdoPage

::: code-group

```fenom
{'!pdoPage' | snippet : [
  'element' => 'getLocalizedResources',
  'snippet' => 'pdoResources',
  'parents' => 0,
  'limit' => 10,
  'tpl' => '@INLINE <li><a href="/{$uri}">{$pagetitle}</a></li>',
]}
```

```modx
[[!pdoPage?
  &element=`getLocalizedResources`
  &snippet=`pdoResources`
  &parents=`0`
  &limit=`10`
  &tpl=`@INLINE <li><a href="/[[+uri]]">[[+pagetitle]]</a></li>`
]]
```

:::

### MiniShop3 products

`msProducts` and `ms3Products` are handled the same way. A product inherits the resource: localization lives in `localizator3_content` by `resource_id`. The **Localization** tab opens for `msProduct` as well.

::: code-group

```fenom
{'!getLocalizedResources' | snippet : [
  'snippet' => 'ms3Products',
  'parents' => 5,
  'tpl' => '@INLINE <div><a href="/{$uri}">{$pagetitle}</a></div>',
  'onlyWithLocalization' => 1,
]}
```

```modx
[[!getLocalizedResources?
  &snippet=`ms3Products`
  &parents=`5`
  &tpl=`@INLINE <div><a href="/[[+uri]]">[[+pagetitle]]</a></div>`
  &onlyWithLocalization=`1`
]]
```

:::

## MiniShop3 options

| Model | Purpose |
| --- | --- |
| `locOption` | Option caption and description by `option_id` and language |
| `locProductOption` | Product option value by `product_option_id` and language |

```fenom
{$option_id | locoptioncaption}
{$option_id | locoptioncaption : 'Default'}
{$product_option_id | locproductoptionvalue}
{$product_option_id | locproductoptionvalue : '—'}
```

Option `description` via PHP `localizator::getLocalizedOptionDescription($option_id, $default)`. There is no Fenom modifier for it.

With `localizator3_default_from_resource` and the default language key, `locoptioncaption` and `locproductoptionvalue` return the second argument or an empty string and do not read `locOption` / `locProductOption`.

## mSearch

On mSearch events the plugin adds index fields like `{key}-{field}`: `en-pagetitle`, `en-content`. After editing a localization, reindex the catalog in mSearch.

For a language other than `localizator3_default_language`, the mSearch call usually needs a `fields` parameter with key prefixes. Check the mSearch snippet contract in its docs.

## Field of another resource

The `getLocalizedField` snippet:

| Name | Default | Description |
| --- | --- | --- |
| **id** | current resource | Resource ID. Empty `null` and `''` use the current resource. Pass `&id` for another resource |
| **field** | `pagetitle` | Field or TV |
| **language** | current | Language key |
| **default** | empty | Fallback. Setting off: after an empty active localization and an empty document field. Setting on and non-base key: `default` even if the document field is filled. Setting on and base key: localization is not read; an empty resource field returns `default` |

::: code-group

```fenom
{'!getLocalizedField' | snippet : [
  'id' => 12,
  'field' => 'pagetitle',
  'language' => 'en',
]}
```

```modx
[[!getLocalizedField?
  &id=`12`
  &field=`pagetitle`
  &language=`en`
]]
```

:::

With `localizator3_default_from_resource = true` and key `localizator3_default_language`, the value comes from resource fields: the `localizator3_content` row is not read, even when `active` = 1. For another key the query requires `active` = 1. An empty or inactive localization returns `default`, not the document field/TV. For TVs: the `localizator3_enabled` flag is required to read `locTemplateVarResource` (not on the base language when `localizator3_default_from_resource` is on). On the base language in that mode the document TV is used without the flag. Another key without the flag, without a published row, or with an empty cell returns `default`. An empty string is not a value; `0` is.

In a web context an unpublished or deleted resource returns `default` immediately (before reading localization). The `locfield` modifier does not repeat that filter. The `language` argument / key in `locfield` goes through `resolveLanguageKey`: `EN` and `en` look up the stored key.

## locfield modifier

A non-numeric first argument is the field name of the current resource.

```fenom
{'pagetitle' | locfield}
{$id | locfield : 'pagetitle'}
{$id | locfield : 'introtext'}
```

## TVs in localizations

On the TV form enable «TV available in localizations». The field then appears on the **Localization** tab. In listings, `includeTVs` on `pdoResources` reads the localized value by TV name when the flag is on and the fetch class is `FetchLocalizator`. Without the flag the document TV remains. Auto-translation walks nested MIGX fields only if the TV name is listed in `localizator3_translate_fields`. The default list has no TV names.
