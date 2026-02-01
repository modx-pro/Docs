# Additional features

All previously unrevealed features. May not apply to everyone but can be very helpful. Used in production projects; universal.

## Automatic actions

### Automatic new word collection

After adding fields in SeoFilter first tab, component tracks resource changes. Settings:

| Setting | Default | Description |
| --- | --- | --- |
| **seofilter_classes** | `msProduct` | Resource class_key for tracking; comma for multiple |
| **seofilter_templates** | | Template ids for tracking; comma for multiple |

Also add words via [sfWord](/en/components/seofilter/snippets/sfword). If tracking disabled and sfWord not called, words come from mFilter2 Ajax. If Ajax disabled - add manually. Alias auto-generated if not set.

#### Alias auto-update on field/dictionary change

If you used `{$color}` and later renamed alias to **cvet**, all mentions in texts and URLs update. Experimental; verify after major changes. Same for word alias - URL table regenerates; old URLs return 404.

## Word declensions

Via morpher.ru. Settings: **seofilter_decline** (enable), **seofilter_morpher_token** (token). Free limit 1000/day. New words auto-decline when enabled. Errors in error log.

## Field values in other tables

Store IDs from other tables in msProductData. Dictionary shows IDs in queries, human names in values. Declensions from **Value**. Example: [customExtra](/en/components/customextra), msFieldsManager.

## Dependent fields and words

Two extra inputs. Example: cars - Brand (marka) and Model. In "Depends on" select Brand, in "By column" enter marka. Prevents invalid combos (BMW Q5, UAZ X5). Words depend on other words when field depends on another.

## Field conditions in rules

Rules from specific field values. Example: vendors (Apple, Epson) and categories (phones, laptops, printers). Apple has no printers; Epson has no phones. Create rules "Apple tech", "Epson printers", add Category and Vendor, limit each field, write SEO texts, save.

### Comparison operators

- **Contains** - words listed below.
- **Not contains** - words NOT listed.
- **Greater** - numeric > value.
- **Less** - numeric < value.
- **In range** - two numbers, between them.

Value: one or more, comma-separated. Text: `red,green` (no quotes). Greater/Less/Range for "cheap" pages. Extra links auto-removed when limiting.

## Child count in rules

For texts like "150 phones in catalog". Default off. Uses pdoFetch. Setting **seofilter_count** enables `{$count}`.

- **Count condition** - JSON, e.g. `{"published":1,"deleted":0}`.
- **Parents** - like pdoResources parents param; required when items from multiple parents or filter not by page children.

## Min/max selections

Default off; needs count enabled. Texts like "150 phones from 1000". pdoFetch handles. Settings:

| Setting | Description | Example |
| --- | --- | --- |
| **seofilter_choose** | Fields for min/max | `msProductData.price` |
| **seofilter_select** | Fields to select | `id,msProductData.price,msProductData.made_in` |

Placeholders: 2(min,max) × choose × select. Example: `{$min_price_id}`, `{$min_price_price}`, `{$max_price_id}`...

Aliases: in choose `msProductData.old_price=op` → `{$max_op_price_id}`. In select `id,msProductData.old_price as op`.

## PrepareSnippet for texts

Extra processing before Fenom. Same principle as pdoTools. Receives param array; return **serialize($row)**.

| Param | Description |
| --- | --- |
| **$row** | Replacements array; modify here |
| **$rule_id** | Rule id |
| **$page_id** | Page id |
| **$input** | Word query (single-field) |
| **$pdoTools** / **$pdoFetch** | pdoFetch instance |
| **$seoFilter** | SeoFilter instance |

Setting **seofilter_snippet** - snippet name. Errors in log.

## URL table

- Custom addresses, ignore nesting.
- Custom meta tags.
- View counts.
- Disable empty/single-item pages.
- Menu control (future).

### Show in menu

Links are objects with fields (see schema). Snippet for menu/sitemap planned.

### Reset view counters

Table: More → Reset counters. Clears view counts.

### Recalculate results

Table: More → Recalculate. Recalculates all links. Ensure count enabled, correct conditions. Results saved for fast menu/sitemap mode.

## AJAX breadcrumbs

Default chunk tpl.SeoFilter.crumbs.current. For pdoCrumbs:

```modx
[[!pdoCrumbs?
  ...
  &tplCurrent=`tpl.SeoFilter.crumbs.current`
]]
```

Optional idx for semantic crumbs. Disable via **seofilter_crumbs_replace**.

## tvSuperSelect integration

[tvSuperSelect](https://modstore.pro/packages/other/tvsuperselect) - TV like miniShop2 tags; words in external table. Add Field with class **modTemplateVar**, key = TV name. Check **Value in other table**, enter **tvsuperselect** in component field.

## FrontendManager integration

[FrontendManager](https://modstore.pro/packages/utilities/frontendmanager) - edit pages/settings from frontend. Custom controller for SEO page editing. Manual setup:

1. Override top panel chunk and admin JS in FrontendManager settings.
2. In chunk **tpl.frontendmanager.seo** add:

```modx
<a href="[[++manager_url]]?a=seoedit&namespace=seofilter&id={$_modx->getPlaceholder('sf.seo_id')}" data-action="iframe" data-url="[[++manager_url]]?a=seoedit&namespace=seofilter&id=" class="fm-seofilter {if $_modx->getPlaceholder('sf.seo_id')?}{else}hidden{/if}"><span>SEO</span></a>
```

3. In manager.js after `Ext.onReady(function() {` add:

```js
if (Ext.getCmp('seofilter-panel-seoedit')) {
  Ext.getCmp('seofilter-panel-seoedit').on('success', function (e) {
    if (e.result.message) {
      top.window.location.href = e.result.message;
    } else {
      reloadFrontendManager();
    }
  });
}
```

Flow: SeoFilter sets **sf.seo_id** when page matches rule. AJAX updates panel link. Hidden class hides SEO when no match. JS reloads after edit; redirect on URL change via result.message.

::: warning
Editing SEO fields auto-checks "Use custom meta tags". Uncheck manually or close without saving to cancel.
:::
