# Snippets

mFilter provides a set of snippets for filtering, navigation, and SEO.

## Overview

| Snippet | Purpose |
|---------|---------|
| [mFilter](mfilter) | Output filtered results |
| [mFilterForm](mfilterform) | Render the filter form |
| [mFilterSelected](mfilterselected) | Show selected filters |
| [mFilterCrumbs](mfiltercrumbs) | Breadcrumbs with filters |
| [mFilterNav](mfilternav) | SEO navigation by filter values |
| [mFilterSitemap](mfiltersitemap) | Generate sitemap for filters |

## Main snippets

### mFilter + mFilterForm

The main combination for product filtering:

```fenom
{* Filter form in sidebar *}
<aside>
    {'!mFilterForm' | snippet}
</aside>

{* Filter results *}
<main>
    {'!mFilter' | snippet: [
        'element' => 'msProducts',
        'paginator' => 'pdoPage',
        'parents' => $_modx->resource.id,
        'limit' => 24
    ]}

    {$_modx->getPlaceholder('page.nav')}
</main>
```

### mFilterSelected

Shows current active filters with the ability to remove them:

```fenom
<main>
    {'!mFilterSelected' | snippet}

    {'!mFilter' | snippet: [...]}
</main>
```

## Helper snippets

### mFilterCrumbs

Breadcrumbs with filter segment support:

```fenom
{'!mFilterCrumbs' | snippet: [
    'schemaJsonLd' => true
]}
```

On page `/catalog/color_red/` it will output:
```
Home / Catalog / Red
```

### mFilterNav

SEO navigation by filter values:

```fenom
<nav class="brands">
    <h3>Brands</h3>
    {'!mFilterNav' | snippet: [
        'filterKeys' => 'vendor_id',
        'showCount' => true,
        'element' => 'msProducts'
    ]}
</nav>
```

### mFilterSitemap

Generate XML sitemap for filtered pages:

```fenom
{'!mFilterSitemap' | snippet: [
    'priority' => '0.6',
    'changefreq' => 'weekly'
]}
```

## mFilter operating modes

### Element/Paginator mode (recommended)

Delegates data fetching and rendering to external snippets:

```fenom
{'!mFilter' | snippet: [
    'element' => 'msProducts',      {* Data snippet *}
    'paginator' => 'pdoPage',       {* Pagination snippet *}
    'parents' => 5,
    'limit' => 24,
    'tpl' => 'mfilter.row'
]}
```

**How it works:**

1. mFilter gets all product IDs via `element` with `returnIds=1`
2. Applies filters to those IDs
3. Passes filtered IDs to `paginator`
4. `paginator` calls `element` for rendering

### Legacy mode

mFilter runs queries and rendering itself (no external snippets):

```fenom
{'!mFilter' | snippet: [
    'parents' => 5,
    'limit' => 24,
    'tpl' => 'product.row',
    'class' => 'msProduct'
]}
```

Use when you need full control over the query.

## AJAX

All snippets support AJAX updates without page reload.

### Automatic AJAX

Enabled by default. The form is submitted via JavaScript; results update dynamically.

### Disabling AJAX

```fenom
{'!mFilterForm' | snippet: ['ajax' => 0]}
{'!mFilter' | snippet: ['ajax' => 0]}
```

### AJAX modes

| Mode | Description |
|------|-------------|
| `form` | Submit on button click |
| `instant` | Submit when any filter changes |

```fenom
{'!mFilterForm' | snippet: ['ajaxMode' => 'instant']}
```

## Full catalog page example

```fenom
{* Breadcrumbs *}
{'!mFilterCrumbs' | snippet: ['schemaJsonLd' => true]}

<div class="catalog">
    <aside class="catalog-sidebar">
        {* Filter form *}
        {'!mFilterForm' | snippet}

        {* SEO navigation by brands *}
        <nav class="brands-nav">
            <h4>Popular brands</h4>
            {'!mFilterNav' | snippet: [
                'filterKeys' => 'vendor_id',
                'limit' => 10,
                'element' => 'msProducts'
            ]}
        </nav>
    </aside>

    <main class="catalog-content">
        {* Selected filters *}
        {'!mFilterSelected' | snippet}

        {* Sort and view *}
        <div class="catalog-toolbar">
            <select data-mfilter-sort>
                <option value="pagetitle-asc">By name</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
            </select>
        </div>

        {* Results *}
        {'!mFilter' | snippet: [
            'element' => 'msProducts',
            'paginator' => 'pdoPage',
            'parents' => $_modx->resource.id,
            'limit' => 24
        ]}

        {* Pagination *}
        {$_modx->getPlaceholder('page.nav')}
    </main>
</div>
```
