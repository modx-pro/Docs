# Snippets

mFilter provides two main snippets for filtering.

## Overview

| Snippet | Purpose |
|---------|------------|
| [mFilter](mfilter) | Output filtered results |
| [mFilterForm](mfilterform) | Render the filter form |

## Typical usage

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

## Operating modes

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

Both snippets support AJAX updates without page reload.

### Automatic AJAX

Enabled by default. The form is submitted via JavaScript; results update dynamically.

### Disabling AJAX

```fenom
{'!mFilterForm' | snippet: ['ajax' => 0]}
{'!mFilter' | snippet: ['ajax' => 0]}
```

### AJAX modes

| Mode | Description |
|-------|----------|
| `form` | Submit on button click |
| `instant` | Submit when any filter changes |

```fenom
{'!mFilterForm' | snippet: ['ajaxMode' => 'instant']}
```
