---
title: getLocalizedResources snippet
description: Parameters and examples for getLocalizedResources, getLocalizedField, and Fenom modifiers
---

# getLocalizedResources snippet

Selects resources for the current localization. Runs another snippet (pdoResources, pdoMenu, msProducts, ms3Products, and others) and joins the localizations table.

## Parameters

| Name | Default | Description |
| --- | --- | --- |
| **snippet** | `pdoResources` | Snippet to run. `name@propertySet` is allowed |
| **class** | `modResource` | Object class. For `msProducts` and `ms3Products` the MiniShop3 product class is used |
| **localizator3_key** | current | Language key |
| **onlyWithLocalization** | No | Only resources with a localization row (INNER JOIN) |

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
  'tpl' => '@INLINE <li><a href="{$uri}">{$pagetitle}</a></li>',
]}
```

```modx
[[!pdoPage?
  &element=`getLocalizedResources`
  &snippet=`pdoResources`
  &parents=`0`
  &limit=`10`
  &tpl=`@INLINE <li><a href="[[+uri]]">[[+pagetitle]]</a></li>`
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
  'tpl' => '@INLINE <div><a href="{$uri}">{$pagetitle}</a></div>',
  'onlyWithLocalization' => 1,
]}
```

```modx
[[!getLocalizedResources?
  &snippet=`ms3Products`
  &parents=`5`
  &tpl=`@INLINE <div><a href="[[+uri]]">[[+pagetitle]]</a></div>`
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

**getLocalizedField** snippet:

| Name | Default | Description |
| --- | --- | --- |
| **id** | current resource | Resource ID. Empty `null` and `''` use the current resource. Pass `&id` for another resource |
| **field** | `pagetitle` | Field or TV |
| **language** | current | Language key |
| **default** | empty | Fallback. For a normal key: when there is no active localization and the resource field is empty. With `localizator3_default_from_resource` and the default key, localization is not read: an empty resource field returns `default` even if a localization row is filled |

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

With `localizator3_default_from_resource = true` and key `localizator3_default_language`, the value comes from resource fields: the `localizator3_content` row is not read, even when `active` = 1. For another key the query requires `active` = 1; an empty or inactive row falls back to the resource field, then `default`. For TVs the `localizator3_enabled` flag is required; otherwise the resource TV is used.

## locfield modifier

A non-numeric first argument is the field name of the current resource.

```fenom
{'pagetitle' | locfield}
{$id | locfield : 'pagetitle'}
{$id | locfield : 'introtext'}
```

## TVs in localizations

On the TV form enable «TV available in localizations». The field then appears on the **Localization** tab. Auto-translation walks nested MIGX fields only if the TV name is listed in `localizator3_translate_fields`. The default list has no TV names.
