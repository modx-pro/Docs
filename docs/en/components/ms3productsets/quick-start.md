---
title: Quick start
---
# Quick start

Step-by-step wiring of product recommendation blocks (sets) on a MiniShop3 site.

**Snippet names:** `ms3ProductSets`, `mspsLexiconScript`.

**Fenom** examples require [pdoTools](/en/components/pdotools/) **3.x**.

## Installation

### Requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0+ |
| PHP | 8.1+ |
| MiniShop3 | installed |
| pdoTools | 3.0.0+ |
| VueTools | installed (“Product sets” manager page) |

### Via ModStore

1. [Connect ModStore repository](https://modstore.pro/info/connection)
2. Go to **Extras → Installer** and click **Download Extras**
3. Ensure **MiniShop3**, **pdoTools** and **VueTools** are installed
4. Find **ms3ProductSets**, click **Download**, then **Install**
5. **Settings → Clear cache**

Package is available at [modstore.pro](https://modstore.pro/).

### After installation

Load lexicon, CSS and JS on the site, place the recommendation block in the product card template (**`ms3ProductSets`** snippet). Details below.

---

## Step 1: Lexicon, styles and script

In the template (or shared head/footer), load **lexicon first**, then CSS and JS.

::: code-group

```fenom
{'mspsLexiconScript' | snippet}
<link rel="stylesheet" href="{'assets_url' | option}components/ms3productsets/css/productsets.css">
<script src="{'assets_url' | option}components/ms3productsets/js/productsets.js" defer></script>
```

```modx
[[!mspsLexiconScript]]
<link rel="stylesheet" href="[[++assets_url]]components/ms3productsets/css/productsets.css">
<script src="[[++assets_url]]components/ms3productsets/js/productsets.js" defer></script>
```

:::

## Step 2: Block in the product card

On the product page template (or in the product card chunk inside a listing), call the **`ms3ProductSets`** snippet.

### The `type` parameter

**`type`** selects the recommendation scenario: it determines which manual links are read from `ms3_product_sets` and which auto logic runs when manual links are missing. The shared rules for all values are in [Set types](types) (section “Common rules (all types)”).

| `type` | Purpose (short) |
|--------|-----------------|
| **`buy_together`** | “Frequently bought together” on the product card; auto by product category. |
| **`similar`** | Similar products from the same category. |
| **`popcorn`** | Compact impulse add-ons; extra fallback if the category path is empty. |
| **`cart_suggestion`** | Cart / checkout suggestions; often with `category_id`. |
| **`auto_sales`** | Order-statistics based set; falls back to **`similar`** when data is thin. |
| **`vip`** | Fixed promo sets from `vip_set_*` settings; requires **`set_id`**. |
| **`auto`** | Generic blocks (home, landings); often **`category_id`** and/or **`resource_id`**. |

This quick start uses **`buy_together`** for a typical product card.

Other call parameters:

- **`resource_id`** — product ID the set is built for (on the product page, the current resource).
- **`max_items`** — max items in the block (allowed range **1…100**).
- **`tpl`** — chunk for one product row; the package default **`tplSetItem`** is a good starting point.

If the set is empty, the snippet returns an empty string by default (`hideIfEmpty=true`) — wrap the output in a conditional or use a placeholder for heading and markup; see [Site integration](integration). Per-type details: [Set types](types).

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'buy_together',
  'resource_id' => $_modx->resource.id,
  'max_items' => 6,
  'tpl' => 'tplSetItem'
]}
```

```modx
[[!ms3ProductSets?
  &type=`buy_together`
  &resource_id=`[[*id]]`
  &max_items=`6`
  &tpl=`tplSetItem`
]]
```

:::

## Step 3: Verify

- Open a product page.
- If the product has manual links, the block shows them.
- If not, auto logic for the chosen type runs.
- If the set is empty, the block is not output (default `hideIfEmpty=true`).

## Step 4: VIP set (optional)

1. Set `ms3productsets.vip_set_1` (e.g. `12,34,56`).
2. Output the block:

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'vip',
  'set_id' => 1,
  'tpl' => 'tplSetVIP'
]}
```

```modx
[[!ms3ProductSets?
  &type=`vip`
  &set_id=`1`
  &tpl=`tplSetVIP`
]]
```

:::

## Next steps

- [Set types](/en/components/ms3productsets/types)
- [Site integration](/en/components/ms3productsets/integration)
- [API and interfaces](/en/components/ms3productsets/api)
- [Admin guide](/en/components/ms3productsets/admin)
