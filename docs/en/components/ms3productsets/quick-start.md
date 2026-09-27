---
title: Quick start
---
# Quick start

Wire recommendation blocks (sets) on a MiniShop3 site.

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

1. [Connect ModStore repository](https://modstore.pro/info/connection). Encrypted transport needs provider [modstore.pro/extras](https://modstore.pro/extras/) or install fails with `Package provider not found`.
2. Go to **Extras → Installer** and click **Download Extras**.
3. Ensure **MiniShop3**, **pdoTools** and **VueTools** are installed.
4. Find **ms3ProductSets**, click **Download**, then **Install**.
5. **Settings → Clear cache**.

Open **Components → Product sets** and create the first template. Walkthroughs: [manager scenarios](/en/components/ms3productsets/interface/flows).

![Product sets manager](/components/ms3productsets/screenshots/page-overview.png)

Package is available at [modstore.pro](https://modstore.pro/).

### After installation

Load lexicon, CSS and JS. Place **`ms3ProductSets`** in the product card template.

## Step 1: Lexicon, styles and script

Load **lexicon first**, then CSS and JS, in the template (or shared head/footer).

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

Call **`ms3ProductSets`** on the product page template (or in the product card chunk inside a listing).

### The `type` parameter

**`type`** selects the scenario: which manual links to read from `ms3_product_sets`, and which auto logic to run when those links are missing. Shared rules: [Set types](types), “Common rules (all types)”.

| `type` | Purpose |
|--------|---------|
| **`buy_together`** | “Frequently bought together”. Auto: co-purchase, then category. |
| **`similar`** | Similar products from the same category. |
| **`popcorn`** | Compact impulse add-ons. Extra fallback if the category path is empty. |
| **`cart_suggestion`** | Cart / checkout suggestions. Often with `category_id`. |
| **`auto_sales`** | Order-statistics set. Falls back to **`similar`** when data is thin. |
| **`vip`** | Promo set from `vip_set_*`. Missing `set_id` uses `vip_set_1`. |
| **`auto`** | Generic blocks (home, landings). Often **`category_id`** and/or **`resource_id`**. |

The example below uses **`buy_together`**.

Other call parameters:

- **`resource_id`:** product ID the set is built for. On the product page, the current resource.
- **`max_items`:** max items in the block (range **1…100**).
- **`tpl`:** chunk for one product row. Package default **`tplSetItem`**.

If the set is empty, the snippet returns an empty string (`hideIfEmpty=true`). Wrap heading and markup in a conditional, or use a placeholder. See [Site integration](integration). Per-type details: [Set types](types).

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
- Manual links: the block shows them.
- No manual links: auto logic for the chosen type runs.
- Empty set: no output (`hideIfEmpty=true`).

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
- [Manager guide](/en/components/ms3productsets/admin)
