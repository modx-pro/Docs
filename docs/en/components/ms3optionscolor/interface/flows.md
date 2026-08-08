---
title: Flows
description: Flows A–I for ms3OptionsColor manager and storefront
---

# Flows

Short flows for the manager and storefront. If you have not installed the package yet, start with [quick start](/components/ms3optionscolor/quick-start).

| Flow | Scenario |
| --- | --- |
| A | Assign HEX to an option value |
| B | Pattern instead of solid color |
| C | Find unset in the dictionary and assign |
| D | Add a color to RAL |
| E | Select on the product page |
| F | Cart via byOptions |
| G | Catalog filter with mFilter |
| H | Catalog card grid |
| I | Variant colors in the catalog (ms3variants) |

## Flow A. Assign HEX to an option value

1. Open product → **Product properties** → value for `color` → save.
2. Tab **Swatches** → **Assign** on the target row.
3. Enter HEX or pick RAL → save.

![Swatches tab](/components/ms3optionscolor/screenshots/product-tab.png)

![Color dialog](/components/ms3optionscolor/screenshots/color-edit.png)

An active record appears in the dictionary. Other products with the same `option_key` + `value` show the same swatch. On **Product properties**, assigned values get a color square in the chips:

![Option chips with swatch](/components/ms3optionscolor/screenshots/product-options-chips.png)

## Flow B. Pattern instead of solid color

1. In the dialog switch mode to **Pattern**.
2. Enter image URL in the pattern field.
3. Save.

When you switch to **Pattern** mode the form removes the previous RAL from the saved record. On the storefront the chunk renders `background-image`. Select uses `data-pattern`.

![Pattern dialog](/components/ms3optionscolor/screenshots/pattern-edit.png)

## Flow C. Dictionary: find unset and assign

1. **Components → ms3OptionsColor** → **Dictionary** tab.
2. In the status filter choose **Not set**.
3. Open the row with the pencil → HEX / RAL / pattern → save.

![Unset filter](/components/ms3optionscolor/screenshots/dictionary-filter.png)

![Assign dialog](/components/ms3optionscolor/screenshots/dictionary-assign.png)

Search by value:

![Dictionary search](/components/ms3optionscolor/screenshots/dictionary.png)

## Flow D. Add a color to RAL

1. **RAL** tab.
2. **Add** → code, name, HEX → save.
3. Search by code to verify the row in the table.

![RAL tab](/components/ms3optionscolor/screenshots/ral.png)

![RAL dialog](/components/ms3optionscolor/screenshots/ral-add.png)

## Flow E. Select on the product page

1. Confirm `ms3optionscolor_frontend_css` is enabled (or load CSS manually).
2. Include `js/web/select.js`.
3. Call chunk `tplMs3OptionsColorSelect`.

::: code-group

```fenom
<script src="{'assets_url' | option}components/ms3optionscolor/js/web/select.js"></script>
{$_modx->getChunk('tplMs3OptionsColorSelect', [
  'product' => $_modx->resource.id,
  'option_key' => 'color',
  'caption' => 'Цвет',
  'native' => 1
])}
```

```modx
<script src="[[++assets_url]]components/ms3optionscolor/js/web/select.js"></script>
[[$tplMs3OptionsColorSelect?
  &product=`[[*id]]`
  &option_key=`color`
  &caption=`Цвет`
  &native=`1`
]]
```

:::

![Closed select](/components/ms3optionscolor/screenshots/storefront-select.png)

![Open list](/components/ms3optionscolor/screenshots/storefront-select-open.png)

The value goes into `options[color]` with the miniShop3 form.

## Flow F. Cart via byOptions

In the cart row chunk values already sit in `$product.options`. Do not read options from the database again:

::: code-group

```fenom
{set $colors = $_modx->runSnippet('!ms3OptionsColor', [
  'product' => $product.id,
  'byOptions' => json_encode($product.options),
  'return' => 'data'
])}
```

```modx
[[!ms3OptionsColor?
  &product=`[[+id]]`
  &byOptions=`{"color":["Синий","Чёрный"]}`
  &return=`data`
]]
```

:::

Ready example chunk: `tplMs3OptionsColorCart`. Details: [Frontend](/components/ms3optionscolor/frontend#cart).

![byOptions](/components/ms3optionscolor/screenshots/storefront-byoptions.png)

## Flow G. Catalog filter with mFilter

In the filter set JSON:

```json
{
  "color": {
    "type": "ms3oc",
    "source": "option",
    "field": "color",
    "label": "Цвет",
    "tpl": "tplMFilterMs3OptionsColor"
  }
}
```

The built-in `colors` type is unchanged. Use `ms3oc` for dictionary swatches. Details: [mFilter](/components/ms3optionscolor/mfilter).

![mFilter ms3oc](/components/ms3optionscolor/screenshots/storefront-mfilter.png)

## Flow H. Catalog card grid

On listing rows call the snippet with `product` = row product ID:

::: code-group

```fenom
{'!ms3OptionsColor' | snippet : [
  'product' => $id,
  'options' => 'color',
  'tpl' => 'tplMs3OptionsColor',
  'limit' => 6
]}
```

```modx
[[!ms3OptionsColor?
  &product=`[[+id]]`
  &options=`color`
  &tpl=`tplMs3OptionsColor`
  &limit=`6`
]]
```

:::

![Grid](/components/ms3optionscolor/screenshots/storefront-grid.png)

![Catalog](/components/ms3optionscolor/screenshots/storefront-catalog.png)

## Flow I. Variant colors in the catalog

In `msProducts` set `usePackages=ms3Variants`. Catalog variants get colors from the dictionary. Details: [ms3variants](/components/ms3optionscolor/ms3variants).

![Variants swatches](/components/ms3optionscolor/screenshots/storefront-variants.png)
