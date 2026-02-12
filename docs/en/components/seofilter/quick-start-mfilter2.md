# Quick start with mFilter2

Set up one rule for "color" field from miniShop2 options. Assume you already filter by this field in [mFilter2](/en/components/msearch2/snippets/mfilter2).

## Setup

Check **aliases** in mFilter2 snippet call. Example:

```modx
[[!mFilter2?
  &class=`msProduct`
  &element=`msProducts`
  &setMeta=`1`
  &filters=`
    ms|price:number,
    parent:categories,
    msoption|color`
  &aliases=`
    ms|price==price,
    resource|parent==category,
    msoption|color==cvet`
  &tplFilter.outer.price=`tpl.mFilter2.filter.slider`
  &tplFilter.row.price=`tpl.mFilter2.filter.number`
]]
```

For color option: **msoption|color==cvet**. Right side (**cvet**) is the alias. With filter "blue" → **/razdel/?cvet=blue**. **Parameter** = cvet, **value** = blue.

Check SeoFilter system settings. Declensions are off by default; see [Additional features](/en/components/seofilter/additional-features).

## Add field to SeoFilter

Go to Applications → SeoFilter. Add field; values (blue, green...) use your friendly URL translit.

![Add field](https://file.modx.pro/files/5/d/a/5daf33200bf56620e40a0d0ea3cd4a52.jpg)

Field settings:
- **Name** - for your reference.
- **Class** - msProductData, modResource, msVendor, msProductOption, modTemplateVar.
- **Key** - field name; right of **msoption|** in filters, e.g. **color**.
- **Alias** - right side of **aliases**, i.e. **cvet**.

::: warning
All other settings optional
:::

URLs will be: "cvet-sinij", "cvet-krasnyij" etc.

- **Value in other table** - see [Additional features](/en/components/seofilter/additional-features).
- **Hide param in URL** - use value only, e.g. "sinij", "krasnyij".
- **Value before param** - URLs like "sinij-cvet", "krasnyij-cvet".
- **Exact match** - when field stores ids or numbers only.

### Dictionary

After save, color values from products are collected into **Dictionary**. Fix misrecognized values, change aliases.

![Dictionary](https://file.modx.pro/files/1/2/d/12d81bd0afc94802f3f48ce9b45945a7.jpg)

## Create rule

Add rule with **Name** and **Page**. Fill SEO tags if needed.

### Terms

- **Base rule** - keep pretty URL, add other filter values as GET (**/cvet-krasnyij?size=M**). Use for fields filled in all items (e.g. color). Important when rule has one field used in multi-field rules.
- **Priority** - for conflicts (0 = highest). See [Additional features](/en/components/seofilter/additional-features).

### Add field to rule

Save rule, then edit. Add field via "Add field", choose Color.

- **Order** - auto, from 0.
- **Condition** - optional.

### SEO templates

In SEO tab, add texts for **Page title** and **H1**. [Fenom](/en/components/pdotools/parser#fenom-templating-engine) handles them. Use `{$cvet_r}` (genitive) with declensions, or `{$cvet}` / `{$value}`.

> For single-field rules you can use **{$value_r}** etc.

See [Substitutions in SEO texts](/en/components/seofilter/substitutions-in-seo). Save rule and check **URL table**.

## URL table

If done correctly, click eye icon to open page. URL is pretty, filter checked, results correct; texts not replaced yet (templates need placeholders).

> In URL table: custom address, meta tags, view counters, menu control.

## Layout and AJAX

For page title:

```modx
<title>[[!+sf.title:default=`[[*pagetitle]]`]]</title>
```

With pdoTitle (AJAX pagination in title):

```modx
<title>[[!+sf.title:notempty=`[[!+sf.title]] / `]][[!pdoTitle? &registerJs=`1` &limit=`2`]]</title>
```

> Enable **Add SEO title with separator**.

For H1:

```modx
<h1 class="sf_h1">[[!+sf.h1:default=`[[*pagetitle]]`]]</h1>
```

> Adjust "Default substitution fields" in settings. Used when filter is reset or no rule matches.

## Summary

Visit generated pages; content and AJAX replacements work. For more, see [Additional features](/en/components/seofilter/additional-features).
