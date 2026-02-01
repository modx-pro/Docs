# Quick start without mFilter2 and miniShop2

Read [Quick start with mFilter2](/en/components/seofilter/quick-start-mfilter2) first; this is a condensed guide for non-mFilter2 setup.

## Setup

Articles as resources, pdoTools, TV fields for values. Example: TV **tags** with **Auto-tag** input (comma separator). Filter via tvFilters.

![Setup](https://file.modx.pro/files/d/3/9/d39ef4f0a1fb83a077cfd33f696e5cd0.jpg)

### Snippet call

```modx
[[!pdoPage?
  &element=`pdoResources`
  &includeTVs=`tags`
  &tvPrefix=``
  &tpl=`tpl.statya`
  &tvFilters=`[[!#GET.tag:notempty=`tags==%[[!#GET.tag]]%`]]`
]]
```

Shows all resources; with GET `tag` filters by TV. **/articles/?tag=space** works.

### SeoFilter settings

Disable AJAX via **seofilter_ajax**. Enable declensions. Set **seofilter_classes** to **modDocument** (comma for multiple). Optionally limit to article templates in **seofilter_templates**.

## Add field to SeoFilter

Class **modTemplateVar**, key **tags**. Alias **tag** (as in pdoPage). Check **Hide param in URL** for URLs like **/articles/kosmos**.

![Add field](https://file.modx.pro/files/3/2/f/32ffc5cf2374885299ccceb3693c6dc8.jpg)

Words go to dictionary and get declensions.

## Create rule

One rule, one field. Select correct page.

### SEO texts

Example H1:

```fenom
Articles about {$tag | lower}
```

Save; links go to URL table.

## Layout

Use two placeholders: page title and H1. Replace pagetitle:

```modx
[[!+sf.h1:default=`[[*pagetitle]]`]]
```

## Summary

Friendly URLs with human-readable texts in article catalog.
