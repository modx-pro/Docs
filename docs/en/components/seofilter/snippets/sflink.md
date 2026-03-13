# sfLink

A more advanced snippet for building links from the parameters you pass. Unlike [sfWord](/en/components/seofilter/snippets/sfword), it returns full links from the URL table; it is a bit more complex but lets you get links that respect the conditions of fields added to rules.

If no link is found, the snippet does not create or return anything. sfLink looks up the link against all rules you pass, substituting the parameters you provide. As soon as a matching link is found, the search stops. So it always returns exactly one link.

::: tip
To output many links (e.g. a full menu) with result counts and extra conditions, use [sfMenu](/en/components/seofilter/snippets/sfmenu).
:::

By default the link is wrapped in the standard chunk `<a href="[[+url]]">[[+name]]</a>`. Make sure all links have names in the component admin. If they do not, when editing the rule set the link template, check **Regenerate link names**, and save; otherwise you will get links without names.

**Why search by several rules?** Suppose for one page you have two rules made of category and brand, and the rules have restrictions by brand or category. You need to output the correct link to the SEO category from the product page and you always have two params: brand and category. Instead of extra conditions in code (if brand is X then use rule Y, etc.), you can pass several rule ids in the **rules** parameter.

Field conditions in rules are described in more detail on the [Additional features](/en/components/seofilter/additional-features) page, in "Field conditions in rules", using the Apple and Epson example (where we could have different field order or different link name templates, and thus different URLs).

You must pass at least 2 required parameters to sfLink. Below we describe how the snippet works for building links for two rules, with this setup:

1. Rule id "Apple tech" (2 fields with conditions) — **7**
2. Rule id "Epson printers" (2 fields with conditions) — **6**
3. Rule id "Brands" (1 field) — **2**, and it is base (so it works with other fields, adding them as GET params)

## Parameters

| Parameter | Description | Example |
| --- | --- | --- |
| **&rules** | Required. Comma-separated rule ids to check against the input params. Checking starts from the first rule (e.g. 7) and continues until a rule matching the params is found. The last rule should be one that will always match (e.g. one field and base). | 7,6,2 |
| **&tpl** | Default `@INLINE <a href="[[+url]]">[[+name]]</a>`. Wraps the result as a link. Processed via pdoTools; INLINE chunks supported. Pass an empty string to see available placeholders. | |
| **&toPlaceholder** | Optional. Instead of outputting the result, set a placeholder with the name you pass. | seoLink |
| *&brand* | Example-only param; must match a field synonym. Pass all field synonyms used in the rules you listed. | `$vendor.id` |
| *&category* | Second example param; matches the "Category" field synonym. | `$parent` |

With the same call `[[!sfLink?&brand=`[[+vendor]]` &category=`[[+parent]]`]]` you can get very different URLs and link names:

* Product 1: brand='1' (Apple), category='3' (Phones) → e.g. `<a href="/catalog/apple/telephony">Apple Phones</a>`
* Product 2: brand='2' (Epson), category='4' (Printers) → e.g. `<a href="/catalog/printery/epson">Epson Printers</a>`
* Product 3: brand='3' (Xiaomi), category='5' (Routers) → e.g. `<a href="/catalog/xiaomi">Xiaomi Tech</a>`

## Usage examples

1. Link to SEO category by color (miniShop2 color option on product page):

```fenom
{foreach $_modx->resource.color as $cvet}
  {'!sfLink' | snippet : [
    'rules' => 17,
    'cvet' => $cvet,
  ]}
{/foreach}
```

2. Standard MODX call:

```modx
Vendor link: [[!sfLink? &rules=`5` &vendor=`[[+vendor]]`]]
```

3. From a real project: metro stations combined with room types. Links needed both relative `/type1/metro-kolomenskaya` and plain `/metro-kolomenskaya`.

```fenom
{'!sfLink' | snippet : [
  'rules' => '18,6',  // rule ids: 18 (metro + type with type condition), 6 (metro only)
  'types' => $_modx->resource.type_of_room,
  'metro' => $_modx->resource.metropoliten,
  'tpl' => '@INLINE <a href="{$url}" class="station">{$name}</a></span>',
]}
```
