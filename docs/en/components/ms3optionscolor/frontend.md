---
title: Frontend
description: Select, cart, CSS, and JS for ms3OptionsColor on the storefront
---

# Frontend

On the storefront snippet `ms3OptionsColor` draws swatches. Chunk `tplMs3OptionsColorSelect` builds the select. Type `ms3oc` draws the filter. Snippet parameters and chunks: [Snippets](snippets/). Styles read data attributes: `[data-ms3oc-swatch]`, `[data-empty]`, `[data-size]`. Theme classes are optional.

After AJAX insert of `[data-ms3oc-select]`, call `window.ms3ocInitColorSelects()`.

```mermaid
flowchart TB
  Dict[(Color dictionary)]
  subgraph pages [Site pages]
    PDP[Product page]
    Cat[Catalog]
    Cart[Cart]
    Filter[mFilter ms3oc]
  end
  Snip[ms3OptionsColor snippet]
  Dict --> Snip
  Snip --> PDP
  Snip --> Cat
  Snip --> Cart
  Dict --> Filter
```

## CSS and JS

When `ms3optionscolor_frontend_css=Yes` the plugin and snippet load `css/web/main.css`. Select needs a separate include:

::: code-group

```fenom
<link rel="stylesheet" href="{'assets_url' | option}components/ms3optionscolor/css/web/main.css">
<script src="{'assets_url' | option}components/ms3optionscolor/js/web/select.js"></script>
```

```modx
<link rel="stylesheet" href="[[++assets_url]]components/ms3optionscolor/css/web/main.css">
<script src="[[++assets_url]]components/ms3optionscolor/js/web/select.js"></script>
```

:::

`select.js` finds `[data-ms3oc-select]`. With jQuery + Select2 it builds a dropdown with swatches. Otherwise you keep a plain `<select>` with `data-ms3oc-select-plain` (`native=1` / `data-ms3oc-native`).

```mermaid
flowchart LR
  Markup["select data-ms3oc-select"]
  Check{jQuery and Select2?}
  S2[Select2 dropdown with swatch]
  Native[Plain select]
  Markup --> Check
  Check -->|yes and native not 1| S2
  Check -->|no or native=1| Native
```

Set swatch size with `data-size`: `sm`, `md`, `lg`. Without the attribute the size is 1.75rem.

![Select](/components/ms3optionscolor/screenshots/storefront-select.png)

![Open Select2](/components/ms3optionscolor/screenshots/storefront-select-open.png)

## Product page

::: code-group

```fenom
{'!ms3OptionsColor' | snippet : [
  'product' => $_modx->resource.id,
  'options' => 'color',
  'tpl' => 'tplMs3OptionsColor'
]}
```

```modx
[[!ms3OptionsColor?
  &product=`[[*id]]`
  &options=`color`
  &tpl=`tplMs3OptionsColor`
]]
```

:::

Default `tplMs3OptionsColor` renders `<span data-ms3oc-swatch>` with `data-color`, `data-pattern`, `data-ral`, `data-status`. An empty swatch gets `data-empty`.

Parameters and row fields: [ms3OptionsColor snippet](snippets/ms3OptionsColor).

### Select

::: code-group

```fenom
{$_modx->getChunk('tplMs3OptionsColorSelect', [
  'product' => $_modx->resource.id,
  'option_key' => 'color',
  'caption' => 'Цвет',
  'placeholder' => 'Выберите цвет',
  'native' => 1
])}
```

```modx
[[$tplMs3OptionsColorSelect?
  &product=`[[*id]]`
  &option_key=`color`
  &caption=`Цвет`
  &placeholder=`Выберите цвет`
  &native=`1`
]]
```

:::

The chunk calls the snippet with `tplMs3OptionsColorSelectOption`. Parameters `tpl` / `optionTpl` override the single-option chunk. Form field name: `options[color]` (or your `option_key`).

| Chunk parameter | Purpose |
| --- | --- |
| `product` | Product ID |
| `option_key` | Option key, default `color` |
| `caption` | Label text |
| `placeholder` | Empty option at the top |
| `native` | `1` disables Select2 |
| `selected` / `selectedValue` | Preselected value |
| `activeOnly` | Same as snippet |
| `includeUnset` | Chunk default `1`. Snippet auto: `1` only with `byOptions`, else `0` |
| `multiple` / `required` | `<select>` attributes |
| `field_id` | Element id |

## Catalog

On listing rows pass the product ID:

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

## byOptions

When values already exist (cart, custom JSON), do not read product options from the database:

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

`byOptions` is a JSON string. In a cart chunk Fenom/`runSnippet` is easier. In MODX tags pass already serialized JSON.

## Cart

Example chunk `tplMs3OptionsColorCart` has three branches:

| Cart line | Behavior |
| --- | --- |
| Has `options._variant_id` | Swatch for `color` with no option change (+ `size` label when present). Without color the swatch block is not rendered. **No** `cart/changeOption`. Link "change variant" goes to the product page `?variant=ID` |
| Bundle (`options.msbundles` / `bundle_hash`) | No option change. Swatch when `options.color`. Otherwise one color from `product.color` or all product colors. **No** `cart/changeOption` |
| Regular line | When the product has option `color`, `<select>` + `cart/changeOption` shows even without `options.color` on the line. Swatch and label only when color is already selected. Size select only when `options.size` is already set |

Storefront CSS must be loaded. Otherwise the cart swatch often stays zero width.

The chunk outputs a color swatch and a size label. It does not show other option keys. Variant fields `_variant_id`, price, and canonical options stay with ms3variants.

`tplMs3OptionsColorCart` is a **full** `tpl.msCart` stand-in (`$products`, qty, `cart/clean`). Assign it as the cart snippet `tpl`, do not include it inside a row. There is no row-only fragment in the package.

## mFilter and ms3variants

- [mFilter](mfilter) — filter type `ms3oc`, Filter Set, row chunk
- [ms3variants](ms3variants) — `variants[].swatches` in the catalog

## Custom swatch chunk

Minimum contract for CSS and select:

::: code-group

```fenom
<span data-ms3oc-swatch
      {if !$color && !$pattern}data-empty{/if}
      {if $pattern}data-has-pattern{/if}
      title="{($title ?: $value) | escape}"
      data-option="{$option_key | escape}"
      data-value="{$value | escape}"
      data-color="{if $color}#{$color | escape}{/if}"
      data-pattern="{$pattern | escape}"
      data-ral="{$ral | escape}"
      data-status="{$status ?: 'active'}"
      style="{if $color}background-color:#{$color | escape};{/if}{if $pattern}background-image:url('{$pattern | escape}');background-size:cover;{/if}">
</span>
```

```modx
<span data-ms3oc-swatch[[+color:empty=`[[+pattern:empty=` data-empty`]]`]][[+pattern:notempty=` data-has-pattern`]]
      title="[[+title:default=`[[+value]]`]]"
      data-option="[[+option_key]]"
      data-value="[[+value]]"
      data-color="[[+color:notempty=`#[[+color]]`]]"
      data-pattern="[[+pattern]]"
      data-ral="[[+ral]]"
      data-status="[[+status:default=`active`]]"
      style="[[+color:notempty=`background-color:#[[+color]];`]][[+pattern:notempty=`background-image:url('[[+pattern]]');background-size:cover;`]]"></span>
```

:::

You can change theme classes. Select JS and default CSS rely on `data-ms3oc-*`. Stock package chunks are Fenom.
