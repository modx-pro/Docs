# sfLink

Snippet for building links from params. Unlike [sfWord](/en/components/seofilter/snippets/sfword), returns full links from URL table; respects rule field conditions.

If link not found - returns nothing. Searches by rules in order; returns first match (one link).

::: tip
For menu with counts and conditions use [sfMenu](/en/components/seofilter/snippets/sfmenu).
:::

Default chunk: `<a href="[[+url]]">[[+name]]</a>`. Ensure link names exist in admin; else edit rule, set link template, check **Regenerate link names**, save.

**Multi-rule search?** Example: one page, two rules (category + brand) with conditions. Product page: brand + category. Pass several rule ids to **rules** instead of branching in code. See [Additional features](/en/components/seofilter/additional-features) "Field conditions in rules".

Min 2 required params. Example: "Apple tech" rule 7, "Epson printers" 6, "Brands" base rule 2.

## Parameters

| Parameter | Description | Example |
| --- | --- | --- |
| **&rules** | Required. Comma-separated rule ids. First match wins. Last should be base (always found). | 7,6,2 |
| **&tpl** | Default `@INLINE <a href="[[+url]]">[[+name]]</a>`. Result wrapper. Pass empty to see placeholders. | |
| **&toPlaceholder** | Optional. Output to placeholder instead. | seoLink |
| *field aliases* | Pass all field aliases used in rules. | `$vendor.id`, `$parent` |

Example `[[!sfLink?&brand=`[[+vendor]]` &category=`[[+parent]]`]]`:

* brand=1 (Apple) category=3 (Phones) → `<a href="/catalog/apple/telephony">Apple Phones</a>`
* brand=2 (Epson) category=4 (Printers) → `<a href="/catalog/printery/epson">Epson Printers</a>`
* brand=3 (Xiaomi) category=5 (Routers) → `<a href="/catalog/xiaomi">Xiaomi Tech</a>`

## Examples

1. Color links (miniShop2 color option):

```fenom
{foreach $_modx->resource.color as $cvet}
  {'!sfLink' | snippet: [
    'rules' => 17,
    'cvet' => $cvet,
  ]}
{/foreach}
```

2. MODX:

```modx
Vendor link: [[!sfLink? &rules=`5` &vendor=`[[+vendor]]`]]
```

3. Metro + room type (relative `/type1/metro-kolomenskaya` and `/metro-kolomenskaya`):

```fenom
{'!sfLink' | snippet: [
  'rules' => '18,6',
  'types' => $_modx->resource.type_of_room,
  'metro' => $_modx->resource.metropoliten,
  'tpl' => '@INLINE <a href="{$url}" class="station">{$name}</a></span>',
]}
```
