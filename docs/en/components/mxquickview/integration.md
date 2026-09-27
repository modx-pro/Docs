---
title: Site integration
---
# Site integration

## 1. Load resources (required)

Include `mxQuickView.initialize` once in the template.

::: code-group

```modx
[[!mxQuickView.initialize]]
```

```fenom
{'!mxQuickView.initialize'|snippet}
```

:::

Default asset base and `connector.php`: `[[++assets_url]]components/mxquickview/`. Override with system setting `mxquickview.assets_url`.

Bundled chunks (`mxqv_product`, `mxqv_resource`) use **Fenom**. Install pdoTools 3.x: the processor parses Fenom on chunk/template render. Without pdoTools, raw `{$…}` remains in the response.

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

`fancybox` calls `window.Fancybox.show()`. If the Fancybox API is missing, the mode **does not** fall back to `native` (unlike bootstrap). See [issue #3](https://github.com/Ibochkarev/mxQuickView/issues/3).
The package ships with local Fancybox files:

- `assets/components/mxquickview/vendor/fancybox/fancybox.css`
- `assets/components/mxquickview/vendor/fancybox/fancybox.umd.js`

For `modalLibrary=bootstrap` the package also includes:

- `assets/components/mxquickview/vendor/bootstrap/bootstrap.min.css`
- `assets/components/mxquickview/vendor/bootstrap/bootstrap.min.js`

If local files are missing, a CDN is used (Fancybox: `@fancyapps/ui`, Bootstrap: `bootstrap`).

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

Chunk `mxqv_resource` works for any resource (pagetitle, introtext, content). Add it to `mxquickview_allowed_chunk`.

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

`msCart` must be in `mxquickview_allowed_snippet`.

A compact mini-cart in quick view is built as `msCart` + `tpl.msMiniCart` (per docs.modx.pro). `data-mxqv-element="msMiniCart"` works as an alias.

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

Delay: snippet `mouseoverDelay` overrides `mxquickview_mouseover_delay`. Empty transport property → `(int)'' = 0`, then 300 ms in JS ([issue #1](https://github.com/Ibochkarev/mxQuickView/issues/1)).

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

Hover delay is the same as in section 5 ([issue #1](https://github.com/Ibochkarev/mxQuickView/issues/1)).

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

Only with `modalLibrary` `native` or `bootstrap`. Fancybox has no `[data-mxqv-nav]` buttons or ←/→ keys.

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

Each trigger inside must have its own `data-mxqv-action`, `data-mxqv-element`, `data-mxqv-id`.

## 9. MiniShop3 and ms3Variants integration

- In the quick view chunk use the `ms3-add-to-cart` form (`data-ms3-form`, `ms3_action=cart/add`).
- After HTML insert: `ms3.cartUI.init`/`reinit`, `ms3.quantityUI.reinit`/`init`, `ms3.productCardUI.reinit()` and `ms3:cart:updated` (`source: 'mxqv'`) when MiniShop3 is on the page.
- With ms3Variants installed, `[[+variants_html]]`, `[[+variants_json]]`, `[[+has_variants]]` are available.

### What mxQuickView does on the server

1. For `msProduct` it calls `msProductVariants` with `productId`, `product_id`, `id`.
2. Chunk receives `[[+has_variants]]` as string `true|false`.
3. Chunk receives `[[+variants_html]]` as variant selector HTML from `msProductVariants`.
4. Chunk receives `[[+variants_json]]` as JSON array of variants (`id`, `price`, `old_price`, `sku`, `count`, `file_id`, `options`).

### What the quick view chunk should contain

::: code-group

```modx
<div class="qv-product"
  data-ms3-product-id="[[+id]]"
  data-mxqv-variants="[[+has_variants]]"
  data-mxqv-variants-json="[[+variants_json:htmlent]]">
  <form method="post" class="ms3_form ms3-add-to-cart" data-ms3-form data-cart-state="add">
    <input type="hidden" name="id" value="[[+id]]">
    <input type="hidden" name="count" value="1">
    <input type="hidden" name="options" value="[]">
    <input type="hidden" name="ms3_action" value="cart/add">
    <div class="qv-product__variants">[[+variants_html]]</div>
    <button type="submit">Add to cart</button>
  </form>
</div>
```

```fenom
<div class="qv-product"
  data-ms3-product-id="{$id}"
  data-mxqv-variants="{$has_variants}"
  data-mxqv-variants-json="{$variants_json|escape:'html'}">
  <form method="post" class="ms3_form ms3-add-to-cart" data-ms3-form data-cart-state="add">
    <input type="hidden" name="id" value="{$id}">
    <input type="hidden" name="count" value="1">
    <input type="hidden" name="options" value="[]">
    <input type="hidden" name="ms3_action" value="cart/add">
    <div class="qv-product__variants">{$variants_html}</div>
    <button type="submit">Add to cart</button>
  </form>
</div>
```

:::

### What mxQuickView frontend does

Variant switching (`initVariantsInContent`) runs on **modal** insert, not in `mode=selector` ([issue #2](https://github.com/Ibochkarev/mxQuickView/issues/2)).

1. Finds `.qv-product[data-mxqv-variants]` and checks flag (`true|1|yes|on`).
2. Parses `data-mxqv-variants-json`.
3. Listens for variant selection in `.qv-product__variants`.
4. Handles click on elements with `data-variant-id`.
5. Handles `change` on `select/input` when variant id is in `value` or `data-variant-id`.
6. On variant change updates price (`[data-mxqv-price]`), old price (`.qv-product__price-old`) and image (`.qv-product__thumb`, if `data-thumb|data-image` present).

### What the shopper sees

1. Open quick view for a product with variants.
2. Variant block `[[+variants_html]]` is visible.
3. On variant change, price/old price/image in the modal update without reload.
4. “Add to cart” submits the ms3 form with selected variant/options.

### MiniShop3 and ms3Variants

- For variant data in lists and cards: `&includeThumbs` and ms3Variants in `usePackages` for `msProducts`/`pdoPage`.
- [ms3Variants](/en/components/ms3variants/)
- [MiniShop3: product tabs and `usePackages`](/en/components/minishop3/development/product-tabs-integration)

## 10. Why the block does not work

1. `mxQuickView.initialize` not included.
2. Element not in whitelist (`allowed_chunk`, `allowed_snippet`, `allowed_template`).
3. Missing or invalid `data-mxqv-id`.
4. In `selector` mode, target container `data-mxqv-output` is missing.
5. Resource not viewable (response `Access denied`).
