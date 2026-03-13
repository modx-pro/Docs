---
title: Site integration
---
# Site integration

For managers and developers: how to add mxQuickView and use it in the catalog.

## 1. Load resources (required)

First include `mxQuickView.initialize` once in the template.

::: code-group

```modx
[[!mxQuickView.initialize]]
```

```fenom
{'!mxQuickView.initialize'|snippet}
```

:::

### Example with parameters

::: code-group

```modx
[[!mxQuickView.initialize?
  &modalSize=`modal-xl`
  &mouseoverDelay=`350`
]]
```

```fenom
{'!mxQuickView.initialize'|snippet:[
  'modalSize' => 'modal-xl',
  'mouseoverDelay' => 350
]}
```

:::

### Modal library choice

#### `native`

::: code-group

```modx
[[!mxQuickView.initialize?
  &modalLibrary=`native`
]]
```

```fenom
{'!mxQuickView.initialize'|snippet:[
  'modalLibrary' => 'native'
]}
```

:::

#### `fancybox`

::: code-group

```modx
[[!mxQuickView.initialize?
  &modalLibrary=`fancybox`
]]
```

```fenom
{'!mxQuickView.initialize'|snippet:[
  'modalLibrary' => 'fancybox'
]}
```

:::

#### `bootstrap`

::: code-group

```modx
[[!mxQuickView.initialize?
  &modalLibrary=`bootstrap`
]]
```

```fenom
{'!mxQuickView.initialize'|snippet:[
  'modalLibrary' => 'bootstrap'
]}
```

:::

`fancybox` uses `window.Fancybox.show()`.
mxQuickView ships with local Fancybox files:

- `assets/components/mxquickview/vendor/fancybox/fancybox.css`
- `assets/components/mxquickview/vendor/fancybox/fancybox.umd.js`

For `modalLibrary=bootstrap` local files are also included:

- `assets/components/mxquickview/vendor/bootstrap/bootstrap.min.css`
- `assets/components/mxquickview/vendor/bootstrap/bootstrap.min.js`

If local files are missing, CDN is used (Fancybox: `@fancyapps/ui`, Bootstrap: `bootstrap`).

You can set paths explicitly:

::: code-group

```modx
[[!mxQuickView.initialize?
  &modalLibrary=`fancybox`
  &fancyboxCss=`/assets/components/mxquickview/vendor/fancybox/fancybox.css`
  &fancyboxJs=`/assets/components/mxquickview/vendor/fancybox/fancybox.umd.js`
]]
```

```fenom
{'!mxQuickView.initialize'|snippet:[
  'modalLibrary' => 'fancybox',
  'fancyboxCss' => '/assets/components/mxquickview/vendor/fancybox/fancybox.css',
  'fancyboxJs' => '/assets/components/mxquickview/vendor/fancybox/fancybox.umd.js'
]}
```

:::

## 2. Quick view for any resource (news, articles, pages)

Chunk `mxqv_resource` is generic for any resource (pagetitle, introtext, content). Add it to `mxquickview_allowed_chunk`.

::: code-group

```modx
<button type="button"
  data-mxqv-click
  data-mxqv-mode="modal"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_resource"
  data-mxqv-id="[[+id]]"
  data-mxqv-title="[[+pagetitle]]">
  Quick view
</button>
```

```fenom
<button type="button"
  data-mxqv-click
  data-mxqv-mode="modal"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_resource"
  data-mxqv-id="{$id}"
  data-mxqv-title="{$pagetitle}">
  Quick view
</button>
```

:::

## 3. mxQuickView button on product card (modal + chunk)

::: code-group

```modx
<button type="button"
  data-mxqv-click
  data-mxqv-mode="modal"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="[[+id]]"
  data-mxqv-title="[[+pagetitle]]">
  Quick view
</button>
```

```fenom
<button type="button"
  data-mxqv-click
  data-mxqv-mode="modal"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="{$id}"
  data-mxqv-title="{$pagetitle}">
  Quick view
</button>
```

:::

## 4. Click + `modal` + `snippet` (e.g. `msCart` and wide modal)

::: code-group

```modx
[[!mxQuickView.initialize?
  &modalSize=`modal-xl`
]]

<button type="button"
  data-mxqv-click
  data-mxqv-mode="modal"
  data-mxqv-action="snippet"
  data-mxqv-element="msCart"
  data-mxqv-id="[[+id]]"
  data-mxqv-title="[[+pagetitle]]">
  Quick view cart
</button>
```

```fenom
{'!mxQuickView.initialize'|snippet:[
  'modalSize' => 'modal-xl'
]}

<button type="button"
  data-mxqv-click
  data-mxqv-mode="modal"
  data-mxqv-action="snippet"
  data-mxqv-element="msCart"
  data-mxqv-id="{$id}"
  data-mxqv-title="{$pagetitle}">
  Quick view cart
</button>
```

:::

Requirement: `msCart` must be in `mxquickview_allowed_snippet`.

MiniShop3 note: compact mini-cart in quick view is rendered as `msCart` + `tpl.msMiniCart` (per docs.modx.pro). `data-mxqv-element="msMiniCart"` is supported as an alias.

## 5. Render on mouseover

::: code-group

```modx
<a href="#"
  data-mxqv-mouseover
  data-mxqv-mode="modal"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="[[+id]]"
  data-mxqv-title="[[+pagetitle]]">Hover</a>
```

```fenom
<a href="#"
  data-mxqv-mouseover
  data-mxqv-mode="modal"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="{$id}"
  data-mxqv-title="{$pagetitle}">Hover</a>
```

:::

Delay comes from `mxquickview_mouseover_delay` or `mouseoverDelay` in `initialize`.

## 6. `selector` mode (custom container)

::: code-group

```modx
<button type="button"
  data-mxqv-click
  data-mxqv-mode="selector"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="[[+id]]"
  data-mxqv-output=".quickview-output">
  Load into block
</button>

<div class="quickview-output"></div>
```

```fenom
<button type="button"
  data-mxqv-click
  data-mxqv-mode="selector"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="{$id}"
  data-mxqv-output=".quickview-output">
  Load into block
</button>

<div class="quickview-output"></div>
```

:::

## 7. Combined: mouseover + selector

::: code-group

```modx
<a href="#"
  data-mxqv-mouseover
  data-mxqv-mode="selector"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="[[+id]]"
  data-mxqv-output=".quickview-output">
  Hover to load
</a>

<div class="quickview-output"></div>
```

```fenom
<a href="#"
  data-mxqv-mouseover
  data-mxqv-mode="selector"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="{$id}"
  data-mxqv-output=".quickview-output">
  Hover to load
</a>

<div class="quickview-output"></div>
```

:::

Delay from `mxquickview_mouseover_delay` or `mouseoverDelay` in `initialize`.

### Bootstrap 5 modal via selector

::: code-group

```modx
<button type="button"
  data-bs-toggle="modal"
  data-bs-target="#qvBootstrapModal"
  data-mxqv-click
  data-mxqv-mode="selector"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="[[+id]]"
  data-mxqv-output="#qvBootstrapModal .modal-body">
  Quick view
</button>

<div class="modal fade" id="qvBootstrapModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Quick view</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body"></div>
    </div>
  </div>
</div>
```

```fenom
<button type="button"
  data-bs-toggle="modal"
  data-bs-target="#qvBootstrapModal"
  data-mxqv-click
  data-mxqv-mode="selector"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="{$id}"
  data-mxqv-output="#qvBootstrapModal .modal-body">
  Quick view
</button>

<div class="modal fade" id="qvBootstrapModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Quick view</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body"></div>
    </div>
  </div>
</div>
```

:::

## 8. Prev/next navigation in product list

::: code-group

```modx
<div data-mxqv-parent data-mxqv-loop="true">
  <button type="button"
    data-mxqv-click
    data-mxqv-mode="modal"
    data-mxqv-action="chunk"
    data-mxqv-element="mxqv_product"
    data-mxqv-id="[[+id]]"
    data-mxqv-title="[[+pagetitle]]">
    Quick view
  </button>
</div>
```

```fenom
<div data-mxqv-parent data-mxqv-loop="true">
  <button type="button"
    data-mxqv-click
    data-mxqv-mode="modal"
    data-mxqv-action="chunk"
    data-mxqv-element="mxqv_product"
    data-mxqv-id="{$id}"
    data-mxqv-title="{$pagetitle}">
    Quick view
  </button>
</div>
```

:::

Requirement: each trigger inside must have its own `data-mxqv-action`, `data-mxqv-element`, `data-mxqv-id`.

## 9. MiniShop3 and ms3Variants integration

- In the quick view chunk use the `ms3-add-to-cart` form (`data-ms3-form`, `ms3_action=cart/add`).
- After content loads the component calls `ms3.productCardUI.reinit()` (if MiniShop3 is available).
- With ms3Variants installed, placeholders `[[+variants_html]]`, `[[+variants_json]]`, `[[+has_variants]]` are available.

### What mxQuickView does on the server

1. For `msProduct` it calls `msProductVariants` with `productId`, `product_id`, `id`.
2. Chunk receives `[[+has_variants]]` as string `true|false`.
3. Chunk receives `[[+variants_html]]` as variant selector HTML from `msProductVariants`.
4. Chunk receives `[[+variants_json]]` as JSON array of variants (`id`, `price`, `old_price`, `sku`, `count`, `file_id`, `options`).

### What the quick view chunk should contain

::: code-group

```modx
<div class="qv-product"
  data-mxqv-variants="[[+has_variants]]"
  data-mxqv-variants-json="[[+variants_json:htmlent]]">
  <form method="post" class="ms3_form ms3-add-to-cart qv-product__form" data-ms3-form data-cart-state="add">
    <input type="hidden" name="id" value="[[+id]]">
    <input type="hidden" name="count" value="1">
    <input type="hidden" name="options" value="[]">
    <input type="hidden" name="ms3_action" value="cart/add">
    <div class="qv-product__variants">[[+variants_html]]</div>
    <button type="submit" class="qv-product__btn-cart">Add to cart</button>
  </form>
</div>
```

```fenom
<div class="qv-product"
  data-mxqv-variants="{$has_variants}"
  data-mxqv-variants-json="{$variants_json|escape:'html'}">
  <form method="post" class="ms3_form ms3-add-to-cart qv-product__form" data-ms3-form data-cart-state="add">
    <input type="hidden" name="id" value="{$id}">
    <input type="hidden" name="count" value="1">
    <input type="hidden" name="options" value="[]">
    <input type="hidden" name="ms3_action" value="cart/add">
    <div class="qv-product__variants">{$variants_html}</div>
    <button type="submit" class="qv-product__btn-cart">Add to cart</button>
  </form>
</div>
```

:::

### What mxQuickView frontend does

1. Finds `.qv-product[data-mxqv-variants]` and checks flag (`true|1|yes|on`).
2. Parses `data-mxqv-variants-json`.
3. Listens for variant selection in `.qv-product__variants`.
4. Handles click on elements with `data-variant-id`.
5. Handles `change` on `select/input` when variant id is in `value` or `data-variant-id`.
6. On variant change updates price (`[data-mxqv-price]`), old price (`.qv-product__price-old`) and image (`.qv-product__thumb`, if `data-thumb|data-image` present).

### UX flow

1. Open quick view for a product with variants.
2. Variant block `[[+variants_html]]` is visible.
3. On variant change, price/old price/image in the modal update without reload.
4. “Add to cart” submits the ms3 form with selected variant/options.

### MiniShop3/ms3Variants docs

- For variant data in lists/cards use `&includeThumbs` and ms3Variants in `usePackages` for `msProducts`/`pdoPage` (see docs.modx.pro).
- ms3Variants component and snippets: <https://docs.modx.pro/components/ms3variants/>
- MiniShop3 integration and `usePackages`: <https://docs.modx.pro/components/minishop3/development/product-tabs-integration>

## 10. Why the block may not work

1. `mxQuickView.initialize` not included.
2. Element not in whitelist (`allowed_chunk`, `allowed_snippet`, `allowed_template`).
3. Missing or invalid `data-mxqv-id`.
4. In `selector` mode, target container `data-mxqv-output` is missing.
5. Resource not viewable (response `Access denied`).
