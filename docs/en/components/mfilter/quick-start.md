# Quick start

Step-by-step guide to setting up faceted filtering for a MiniShop3 product catalog.

## Step 1: Installation

1. Install mFilter via the MODX package manager
2. Ensure dependencies are installed: pdoTools 3.x, VueTools

## Step 2: Create a filter set

1. Go to **Extras → mFilter → Filter sets**
2. Click **Create**
3. Fill in:
   - **Name** — e.g. "Electronics catalog"
   - **Active** — Yes
4. Save the set

### Adding filters

In the created set, open the **Filters** tab and add the ones you need:

| Key | Type | Source | Description |
|------|-----|----------|----------|
| `vendor` | vendors | ms3 | MS3 vendors |
| `color` | default | option | Option "Color" |
| `size` | default | option | Option "Size" |
| `price` | number | field | Price field (range) |
| `new` | boolean | field | "New" flag |

### Binding to categories

On the **Bindings** tab:

1. Select catalog categories in the resource tree
2. The filter set will apply to the selected pages and their children

## Step 3: Adding snippets

mFilter includes a ready-made catalog template. Create a category page template based on it:

```fenom
<div class="catalog-wrapper">
    <!-- Sidebar with filters -->
    <aside class="catalog-sidebar">
        {'!mFilterForm' | snippet: [
            'resourceId' => $_modx->resource.id
        ]}
    </aside>

    <!-- Main content with products -->
    <div class="catalog-content">
        {'!mFilter' | snippet: [
            'element' => 'msProducts',
            'parents' => $_modx->resource.id,
            'includeThumbs' => 'small,medium',
            'limit' => 12,
            'sortby' => 'menuindex',
            'sortdir' => 'ASC',
            'tplOuter' => 'mfilter.outer',
            'tpl' => 'tpl.msProducts.row',
            'tpls' => ['tpl1' => 'mfilter.grid', 'tpl2' => 'mfilter.row']
        ]}
    </div>
</div>
```

### Including styles and scripts

In template `<head>`:

```html
<!-- noUISlider for range sliders -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nouislider@15/dist/nouislider.min.css">

<!-- mFilter CSS -->
<link rel="stylesheet" href="/assets/components/mfilter/css/web/mfilter.css">
```

Before `</body>`:

```html
<!-- noUISlider JS -->
<script src="https://cdn.jsdelivr.net/npm/nouislider@15/dist/nouislider.min.js"></script>

<!-- mFilter JS (order matters!) -->
<script src="/assets/components/mfilter/js/web/mfilter.core.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.api.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.ui.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.slider.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.js"></script>
```

::: tip Ready-made template
Full template example: `core/components/mfilter/elements/templates/catalog.tpl`
:::

## Step 4: Basic styling

mFilter loads base styles automatically. Override CSS classes to customize:

```css
/* Filter form */
.mfilter-form { }

/* Single filter block */
.mfilter-filter { }
.mfilter-filter-title { }

/* Filter items */
.mfilter-item { }
.mfilter-item label { }
.mfilter-count { }

/* Range (slider) */
.mfilter-range { }

/* Loading state */
.mfilter-loading { }
```

## Step 5: Verify

1. Open a category page on the site
2. Select values in the filters
3. Results should update via AJAX
4. URL should change to SEO-friendly format

## SEO setup (optional)

### SEO templates

For dynamic title/description go to **mFilter → SEO templates**:

```
Title: {$resource.pagetitle} {$filters.vendor} {$filters.color} — buy in Moscow
Description: {$filters.vendor} {$filters.color} in stock. Prices from {$price.min} rub.
H1: {$filters.vendor} {$filters.color}
```

### Word forms

For correct declension create word forms in **mFilter → Word forms**:

| Word | Genitive | Dative | Accusative | Instrumental | Prepositional |
|-------|-------------|-----------|-------------|--------------|------------|
| Apple | Apple | Apple | Apple | Apple | Apple |
| red | red's | red | red | red | red |

## Call examples

### Minimal call

```fenom
{'!mFilterForm' | snippet: ['resourceId' => $_modx->resource.id]}
{'!mFilter' | snippet: ['element' => 'msProducts']}
```

### With pdoResources (without MS3)

```fenom
{'!mFilterForm' | snippet: ['resourceId' => $_modx->resource.id]}
{'!mFilter' | snippet: [
    'element' => 'pdoResources',
    'paginator' => 'pdoPage',
    'parents' => $_modx->resource.id,
    'includeTVs' => 'image,price,brand',
    'tpl' => 'mfilter.grid'
]}
```

### With custom parameters

```fenom
{'!mFilterForm' | snippet: [
    'resourceId' => $_modx->resource.id,
    'filters' => 'vendor,color,price',
    'exclude' => 'size',
    'tpl' => 'mfilter.filter',
    'sortByCount' => 1
]}

{'!mFilter' | snippet: [
    'element' => 'msProducts',
    'paginator' => 'pdoPage',
    'parents' => $_modx->resource.id,
    'limit' => 24,
    'sortby' => 'price',
    'sortdir' => 'ASC',
    'tpl' => 'mfilter.row',
    'tpls' => ['grid' => 'mfilter.grid', 'list' => 'mfilter.row']
]}
```

## Next steps

- [System settings](settings) — all available settings
- [mFilter snippet](snippets/mfilter) — parameter reference
- [mFilterForm snippet](snippets/mfilterform) — filter form configuration
- [mSearch integration](integration/msearch) — search + filtering
- [JS API](development/js-api) — programmatic filter control
