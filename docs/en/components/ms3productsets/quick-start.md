---
title: Quick start
---
# Quick start

Minimal setup to show your first product set on the site in 5–10 minutes.

## 1. Install dependencies

1. In **Extras → Installer** install **MiniShop3**, **pdoTools**, **VueTools**.
2. Install **ms3ProductSets**.
3. Clear MODX cache.

## 2. Load frontend assets

::: code-group

```fenom
{'mspsLexiconScript' | snippet}
<link rel="stylesheet" href="{'assets_url' | option}components/ms3productsets/css/productsets.css">
<script src="{'assets_url' | option}components/ms3productsets/js/productsets.js"></script>
```

```modx
[[!mspsLexiconScript]]
<link rel="stylesheet" href="[[++assets_url]]components/ms3productsets/css/productsets.css">
<script src="[[++assets_url]]components/ms3productsets/js/productsets.js"></script>
```

:::

## 3. Output the block in the product card template

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

## 4. Check the result

- Open a product page.
- If the product has manual links, the block will show them.
- If not, auto logic for the chosen type runs.
- If the set is empty, the block is not output (default `hideIfEmpty=true`).

## 5. Add a VIP set (optional)

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
