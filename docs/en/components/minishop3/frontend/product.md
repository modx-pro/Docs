---
title: Product page
---
# Product page

The product page shows a single product in detail: gallery, price, options, and add-to-cart form.

<!-- ![Storefront product page](/components/minishop3/screenshots/fe-product.png) -->

[![](https://file.modx.pro/files/2/5/a/25aa24b8959c026826d65090b57111c8s.jpg)](https://file.modx.pro/files/2/5/a/25aa24b8959c026826d65090b57111c8.png)

## Page structure

| Component | File | Purpose |
| --- | --- | --- |
| Page template | `elements/templates/product.tpl` | Product page layout |
| Gallery | `tpl.msGallery` | Image slider with lightbox |

The attribute table is rendered by the [`msProductOptions`](/en/components/minishop3/snippets/msproductoptions) snippet with its own `tpl.msProductOptions` chunk. The demo template does not call it — add the call to your own template.

## Page template

**Path:** `core/components/minishop3/elements/templates/product.tpl`

The template extends the base template (`base.tpl`) and contains these sections:

```fenom
{extends 'file:templates/base.tpl'}
{block 'pagecontent'}
    <div class="container py-4">
        {* Breadcrumbs *}
        {* Main info (gallery + card) *}
        {* Tabs (description, specs, delivery) *}
        {* Related products *}
    </div>
{/block}
```

## Page sections

### Breadcrumbs

Navigation trail from home to the current product:

```fenom
<nav aria-label="breadcrumb" class="mb-4">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/">Home</a></li>
        {if $_modx->resource.parent > 0}
            <li class="breadcrumb-item">
                <a href="/{$_modx->resource.parent | resource : 'uri'}">
                    {$_modx->resource.parent | resource : 'pagetitle'}
                </a>
            </li>
        {/if}
        <li class="breadcrumb-item active">{$_modx->resource.pagetitle}</li>
    </ol>
</nav>
```

---

### Product gallery

The gallery uses [Splide](https://splidejs.com/) for the slider and [GLightbox](https://biati-digital.github.io/glightbox/) for full-size viewing.

```fenom
{'!msGallery'|snippet: [
    'tpl' => 'tpl.msGallery'
]}
```

#### Gallery features

- **Main slider** — large images with fade effect
- **Thumbnails** — image navigation (hidden when there is only one photo)
- **Lightbox** — full-size view on click
- **Lazy loading** — deferred image loading
- **Placeholder** — shown when there are no images

#### What the stock chunk uses

The chunk iterates the `{$files}` array and takes five fields from each item: `url` for the lightbox link, `medium` and `small` for the main slider and the thumbnails, `name` and `description` for the captions. Each size has a fallback — `{$file['medium'] ?: $file['url']}` — so the slider works even without generated thumbnails.

The full list of fields available for each file, including `thumb` / `large` and the thumbnail dimensions, is on the [msGallery](/en/components/minishop3/snippets/msgallery) snippet page.

---

### Product information

Product data is rendered in the right column.

#### Vendor and name

```fenom
{if $vendor_name?}
    <div class="text-muted text-uppercase mb-2">
        {$vendor_name}
    </div>
{/if}

<h1 class="mb-3">{$_modx->resource.pagetitle}</h1>
```

#### SKU and stock status

```fenom
<div class="d-flex align-items-center gap-3 mb-3">
    {if $article?}
        <span class="text-muted">SKU: <strong>{$article}</strong></span>
    {/if}

    {if $stock? && $stock > 0}
        <span class="badge bg-success">In stock</span>
    {else}
        <span class="badge bg-secondary">On order</span>
    {/if}
</div>
```

#### Product badges

| Badge | Condition | Style |
| --- | --- | --- |
| NEW | `{$new?}` | `badge bg-primary` |
| BESTSELLER | `{$popular?}` | `badge bg-warning text-dark` |
| RECOMMENDED | `{$favorite?}` | `badge bg-danger` |

---

### Price block

Price is shown in a separate block with background:

```fenom
<div class="product-price mb-4 p-4 bg-light rounded">
    {if $old_price? && $old_price > 0}
        <div class="old-price text-muted text-decoration-line-through mb-2">
            {$old_price} ₽
        </div>

        {if $discount?}
            <div class="badge bg-danger mb-2">
                Discount {$discount}%
            </div>
        {/if}
    {/if}

    <div class="current-price display-4 fw-bold text-primary">
        {$price ?: 0} ₽
    </div>
</div>
```

::: tip Discount calculation
The `{$discount}` percentage is filled only by the **msProducts** loop (catalog cards): `(old_price - price) / old_price * 100`. On the product page the placeholder stays empty until the template calculates the same expression itself. The "Discount {$discount}%" block in the demo `product.tpl` does not work without that extra step ([issue #814](https://github.com/modx-pro/MiniShop3/issues/814)).
:::

---

### Product options

If the product has `color` or `size` options, they are rendered as buttons:

```fenom
{if $_modx->resource.color?}
    <div class="option-group mb-3">
        <label class="form-label fw-semibold">Color:</label>
        <div class="d-flex flex-wrap gap-2">
            {foreach $_modx->resource.color as $colorOption}
                <button type="button" class="btn btn-outline-secondary btn-sm option-btn">
                    {$colorOption}
                </button>
            {/foreach}
        </div>
    </div>
{/if}
```

JavaScript activates the first option by default and handles clicks for switching.

---

### Add to cart form

The page contains two forms with state switching. Both sit inside a shared wrapper — that is how the JavaScript finds the card:

```fenom
<div class="ms3-product-card" data-product-id="{$_modx->resource.id}" data-ms3-product-card>
    {* both forms go in here *}
</div>
```

#### "Add" state

Shown when the product is not in the cart:

```fenom
<form method="post" class="ms3_form" data-cart-state="add" data-ms3-form>
    <input type="hidden" name="id" value="{$_modx->resource.id}">
    <input type="hidden" name="ms3_action" value="cart/add">

    <div class="row g-3 align-items-end">
        <div class="col-auto">
            <label class="form-label">{'ms3_cart_count' | lexicon}:</label>
            <input type="number" name="count" value="1" min="1" class="form-control">
        </div>
        <div class="col">
            <button type="submit" class="btn btn-primary btn-lg w-100">
                {'ms3_cart_add' | lexicon}
            </button>
        </div>
    </div>
</form>
```

#### "In cart" state

Shown when the product is already in the cart:

```fenom
<form method="post" class="ms3_form product-cart-controls-hidden" data-cart-state="change" data-ms3-form>
    <input type="hidden" name="product_key" value="">
    <input type="hidden" name="ms3_action" value="cart/change">

    <div class="row g-3 align-items-end">
        <div class="col-auto">
            <div class="input-group">
                <button class="btn btn-outline-primary dec-qty" type="button">−</button>
                <input type="number" name="count" value="1" min="0" class="form-control text-center">
                <button class="btn btn-outline-primary inc-qty" type="button">+</button>
            </div>
        </div>
        <div class="col">
            <button type="button" class="btn btn-success btn-lg w-100" disabled>
                ✓ {'ms3_cart_in_cart' | lexicon}
            </button>
        </div>
    </div>
</form>
```

The `ProductCardUI` JavaScript module switches the forms on the `ms3:cart:updated` event.

---

### Additional information

Block with icons for weight, country of origin, and delivery:

```fenom
<ul class="list-unstyled mb-0">
    {if $weight? && $weight > 0}
        <li class="mb-2">
            <svg width="16" height="16"><use href="#icon-box"/></svg>
            <span class="text-muted">Weight:</span> <strong>{$weight} kg</strong>
        </li>
    {/if}
    {if $made_in?}
        <li class="mb-2">
            <svg width="16" height="16"><use href="#icon-globe"/></svg>
            <span class="text-muted">Country of origin:</span> <strong>{$made_in}</strong>
        </li>
    {/if}
    <li>
        <svg width="16" height="16"><use href="#icon-truck"/></svg>
        <span class="text-muted">Delivery:</span> <strong>1-3 business days</strong>
    </li>
</ul>
```

The delivery line is always printed and its caption is hardcoded in the template: it is not tied to the delivery methods configured in MiniShop3.

---

### Information tabs

| Tab | Content |
| --- | --- |
| **Description** | Full description from `{$_modx->resource.description}`, or a "no detailed description" message when empty |
| **Specifications** | Product properties table |
| **Delivery** | Two static placeholder blocks |

::: warning The "Delivery" tab is a stub
In the demo template this is hardcoded markup: "Courier delivery — from 300 ₽" and "Pickup — Free". The delivery methods configured in MiniShop3 and their costs are not rendered here. Replace the block with your own or remove it.
:::

```fenom
<ul class="nav nav-tabs mb-4" role="tablist">
    <li class="nav-item">
        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#description">
            Description
        </button>
    </li>
    <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#specs">
            Specifications
        </button>
    </li>
    <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#delivery">
            Delivery
        </button>
    </li>
</ul>

<div class="tab-content">
    <div class="tab-pane fade show active" id="description">
        {$_modx->resource.description}
    </div>
    <!-- ... other tabs ... -->
</div>
```

#### Specifications table

Filled automatically from product fields:

| Field | Placeholder |
| --- | --- |
| SKU | `{$article}` |
| Vendor | `{$vendor_name}` |
| Country of origin | `{$made_in}` |
| Weight | `{$weight}` |
| Available colors | `{$_modx->resource.color}` (array) |
| Available sizes | `{$_modx->resource.size}` (array) |

---

### Related products

Block with products from the same category:

```fenom
<div class="related-products mt-5">
    <h3 class="mb-4">Related products</h3>
    <div class="row">
        {'!msProducts' | snippet : [
            'tpl' => 'tpl.msProducts.row',
            'parents' => $_modx->resource.parent,
            'resources' => '-' ~ $_modx->resource.id,
            'limit' => 4,
            'formatPrices' => 1,
            'withCurrency' => 0
        ]}
    </div>
</div>
```

| Parameter | Value | Purpose |
| --- | --- | --- |
| `parents` | Parent category ID | Products from the same category |
| `resources` | `-` current product ID | Exclude the current product |
| `limit` | `4` | Show 4 products |
| `withCurrency` | `0` | No currency symbol in `{$price_formatted}` |

As in `catalog.tpl`, `formatPrices` is passed here too — msProducts has no such parameter and ignores it ([issue #818](https://github.com/modx-pro/MiniShop3/issues/818)).

## Product placeholders

The product page exposes all fields from the msProduct and msProductData tables.

The placeholders are set by `ProductService::processForDisplay()`, called from `msProduct::process()` — that is, on every product page render. It publishes all `msProductData` columns (except `id`), the product options, and the vendor fields prefixed with `vendor_`.

### Main fields

| Placeholder | Type | Description |
| --- | --- | --- |
| `{$_modx->resource.id}` | int | Product resource ID |
| `{$_modx->resource.pagetitle}` | string | Product name |
| `{$_modx->resource.introtext}` | string | Short description |
| `{$_modx->resource.description}` | string | Full description |
| `{$_modx->resource.parent}` | int | Parent category ID |
| `{$_modx->resource.uri}` | string | Product URL |

### msProductData fields

| Placeholder | Type | Description |
| --- | --- | --- |
| `{$article}` | string | SKU |
| `{$price}` | string | Price, **already formatted** per `ms3_price_format` |
| `{$old_price}` | string | Old price, formatted as well |
| `{$weight}` | string | Weight, formatted per `ms3_weight_format` |
| `{$stock}` | string | Stock quantity (`decimal` column) |
| `{$image}` | string | Main image URL |
| `{$thumb}` | string | Thumbnail URL |
| `{$tags}` | mixed | Tags |
| `{$source_id}` | int | Media Source ID |
| `{$preview_file_id}` | int | Gallery preview file ID |
| `{$vendor_id}` | int | Vendor ID |
| `{$made_in}` | string | Country of origin |
| `{$new}` | bool | "New" flag |
| `{$popular}` | bool | "Popular" flag |
| `{$favorite}` | bool | "Recommended" flag |

`{$vendor_name}` is not an `msProductData` column: the name comes from the `msVendor` relation via `vendor_id`. In the `msProducts` snippet the `vendor_`-prefixed fields appear when `includeVendorFields` is set.

::: warning Price and weight arrive as strings
`price`, `old_price` and `weight` pass through `Format::price()` and `Format::weight()` before they reach the placeholders, so they carry the thousand separators from the system settings. Arithmetic and comparisons in the template (`{if $price > 1000}`, `{$price * $count}`) will not work on them — read the value from `$_modx->resource` for calculations, or compute it in the snippet. The currency symbol is not added: the demo template appends `₽` by hand.

Inside the `msProducts` loop the same names mean something else: there `price` and `weight` stay numeric, and the formatted values live separately in `price_formatted` and `weight_formatted`. Code moved from the catalog card chunk to the product page can therefore behave differently.
:::

### Product options

| Placeholder | Type | Description |
| --- | --- | --- |
| `{$_modx->resource.color}` | array | Available colors |
| `{$_modx->resource.size}` | array | Available sizes |
| `{$discount}` | int | Discount percentage: only from `msProducts`, never filled on the product page |

## Customization

### Creating a custom template

1. Copy `product.tpl` to your theme
2. Make your changes
3. Assign the template to products in the Manager

### Changing the gallery

Create your own chunk and specify it in the call:

```fenom
{'!msGallery'|snippet: [
    'tpl' => 'myCustomGallery'
]}
```

The stock chunk loads Splide and GLightbox from the CDN itself. In your own chunk either repeat those tags or drop the slider: without the libraries the slider and the lightbox never initialize. There is no error — the gallery falls back to a static list.

### Adding custom tabs

Extend the tabs block in the template. MiniShop3 ships no reviews snippet — add your own extra or your own markup:

```fenom
<li class="nav-item">
    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#reviews">
        Reviews
    </button>
</li>

<div class="tab-pane fade" id="reviews">
    {* your own reviews snippet or chunk — not part of MiniShop3 *}
</div>
```

::: warning color/size options in the demo template
The color and size buttons in `product.tpl` only toggle the `active` class and never write the values into the `cart/add` form. The options do not reach the cart until you add a hidden input or JavaScript ([issue #815](https://github.com/modx-pro/MiniShop3/issues/815)). The API side is ready: `cart/add` accepts an `options` parameter.
:::

## CSS classes

| Class | Element |
| --- | --- |
| `.product-info` | Product information container |
| `.product-price` | Price block |
| `.product-options` | Options container |
| `.option-group` | Option group (color, size) |
| `.option-btn` | Option selection button |
| `.product-meta` | Additional information |
| `.product-tabs` | Tabs container |
| `.related-products` | Related products block |
| `.ms3-gallery` | Gallery container |
| `.ms3-gallery-main` | Main slider |
| `.ms3-gallery-thumbs` | Thumbnail slider (only with two or more images) |
| `.ms3-gallery-empty` | Gallery container with no images |
| `.ms3-gallery-placeholder` | Wrapper for the `ms3_medium.png` placeholder |
| `.ms3-product-card` | Cart forms wrapper that `ProductCardUI` binds to |

## Dependencies

| Library | Version | Purpose | Loaded in |
| --- | --- | --- | --- |
| Bootstrap 5 | 5.3.3 | CSS framework | `base.tpl` |
| Bootstrap Icons | 1.11.0 | Icon font | `base.tpl` |
| Splide | 4.1.4 | Gallery slider | `tpl.msGallery` |
| GLightbox | 3.3.0 | Image lightbox | `tpl.msGallery` |

All four are loaded from the jsdelivr CDN. On a live site replace them with local copies.

In the gallery chunk Splide and GLightbox are loaded inside the `{if $files?}` branch, so a product with no images does not load them.
