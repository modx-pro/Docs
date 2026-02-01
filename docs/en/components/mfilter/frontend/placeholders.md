# Placeholders

All mFilter placeholders.

## Global placeholders

Set on the page and available everywhere.

### Main

| Placeholder | Description |
|-------------|----------|
| `[[+mfilter.total]]` | Total result count |
| `[[+mfilter.page]]` | Current page |
| `[[+mfilter.pages]]` | Total pages |
| `[[+mfilter.limit]]` | Items per page |
| `[[+mfilter.offset]]` | Offset |

### URL and navigation

| Placeholder | Description |
|-------------|----------|
| `[[+mfilter.url]]` | Current URL with filters |
| `[[+mfilter.canonical]]` | Canonical URL |
| `[[+mfilter.baseUrl]]` | Base URL without filters |

### Active filters

| Placeholder | Description |
|-------------|----------|
| `[[+mfilter.hasFilters]]` | Any active filters (1/0) |
| `[[+mfilter.activeFilters]]` | JSON of active filters |
| `[[+mfilter.filterCount]]` | Number of active filters |

### SEO

| Placeholder | Description |
|-------------|----------|
| `[[+mfilter.seo.title]]` | SEO title |
| `[[+mfilter.seo.h1]]` | SEO H1 |
| `[[+mfilter.seo.description]]` | Meta description |
| `[[+mfilter.seo.text]]` | SEO text |
| `[[+mfilter.seo.noindex]]` | noindex flag (1/0) |

## Fenom variables

In Fenom templates the `$mfilter` object is available.

### Accessing data

```html
{* Count *}
{$mfilter.total}

{* SEO *}
{$mfilter.seo.title}
{$mfilter.seo.h1}

{* Active filters *}
{if $mfilter.hasFilters}
    <div class="active-filters">
        {foreach $mfilter.filters as $key => $values}
            {$key}: {$values|join:', '}
        {/foreach}
    </div>
{/if}

{* URL *}
{$mfilter.url}
{$mfilter.canonical}
```

## Form placeholders (mFilterForm)

### tplOuter

| Variable | Description |
|------------|----------|
| `{$filters}` | Compiled HTML of all filters |
| `{$hash}` | Config hash for AJAX |
| `{$resource_id}` | Current resource ID |
| `{$total}` | Result count |
| `{$config}` | Config array |

### tplFilter.outer

| Variable | Description |
|------------|----------|
| `{$key}` | Filter key (vendor, color...) |
| `{$label}` | Filter label |
| `{$type}` | Filter type (default, number...) |
| `{$content}` | Filter values HTML |
| `{$selected}` | Any value selected |
| `{$config}` | Filter config |

### tplFilter.default / tplFilter.colors

| Variable | Description |
|------------|----------|
| `{$key}` | Filter key |
| `{$values}` | Values array |
| `{$values[].value}` | Value |
| `{$values[].label}` | Display text |
| `{$values[].count}` | Product count |
| `{$values[].selected}` | Selected |
| `{$values[].disabled}` | Disabled |
| `{$values[].hex}` | Color HEX (for colors) |

### tplFilter.number

| Variable | Description |
|------------|----------|
| `{$key}` | Filter key |
| `{$min}` | Min value |
| `{$max}` | Max value |
| `{$step}` | Step |
| `{$selected.min}` | Selected min |
| `{$selected.max}` | Selected max |

### tplFilter.boolean

| Variable | Description |
|------------|----------|
| `{$key}` | Filter key |
| `{$label}` | Label |
| `{$selected}` | Selected (true/false) |
| `{$count}` | Product count |

### tplValue.default

| Variable | Description |
|------------|----------|
| `{$key}` | Filter key |
| `{$value}` | Value |
| `{$label}` | Display text |
| `{$count}` | Count |
| `{$selected}` | Selected |
| `{$disabled}` | Disabled |
| `{$showCount}` | Show count |

## Result placeholders (mFilter)

### Global (set in MODX)

```html
{* In page template *}
<h1>{$mfilter.seo.h1 ?: $pagetitle}</h1>

<div class="catalog-info">
    Found: {$mfilter.total}
</div>

{if $mfilter.seo.text}
    <div class="seo-text">
        {$mfilter.seo.text}
    </div>
{/if}
```

### In product template (tpl)

Standard element placeholders (msProducts, pdoResources):

```html
{* @FILE chunks/product.card.tpl *}
<div class="product-card" data-id="{$id}">
    <img src="{$image}" alt="{$pagetitle}">
    <h3>{$pagetitle}</h3>
    <div class="price">{$price|number:0}</div>
</div>
```

## Use in JavaScript

### Data via data attributes

```html
<div data-mfilter-config='{$config|json_encode}'></div>
```

```javascript
const config = JSON.parse(
    document.querySelector('[data-mfilter-config]').dataset.mfilterConfig
);
```

### Global object

```javascript
// After init
const total = window.mFilter?.getInstance()?.getState().total;
```

## Examples

### Breadcrumbs with filters

```html
<nav class="breadcrumbs">
    <a href="/">Home</a> /
    <a href="{$mfilter.baseUrl}">{$pagetitle}</a>
    {if $mfilter.hasFilters}
        / <span>{$mfilter.seo.h1}</span>
    {/if}
</nav>
```

### "Selected" block

```html
{if $mfilter.hasFilters}
    <div class="selected-filters">
        <span>Selected:</span>
        {foreach $mfilter.activeFilters as $key => $filter}
            {foreach $filter.values as $v}
                <span class="tag">
                    {$v.label}
                    <a href="{$v.removeUrl}">×</a>
                </span>
            {/foreach}
        {/foreach}
        <a href="{$mfilter.baseUrl}" class="clear-all">Clear all</a>
    </div>
{/if}
```

### Meta tags

```html
<head>
    {if $mfilter.seo.title}
        <title>{$mfilter.seo.title}</title>
    {else}
        <title>{$pagetitle} | {$site_name}</title>
    {/if}

    {if $mfilter.seo.description}
        <meta name="description" content="{$mfilter.seo.description}">
    {/if}

    {if $mfilter.seo.noindex}
        <meta name="robots" content="noindex, follow">
    {/if}

    <link rel="canonical" href="{$mfilter.canonical}">
</head>
```

### Empty results

```html
{if $mfilter.total == 0}
    <div class="empty-results">
        <p>No results for your query.</p>
        {if $mfilter.hasFilters}
            <p>Try <a href="{$mfilter.baseUrl}">resetting filters</a>.</p>
        {/if}
    </div>
{/if}
```
