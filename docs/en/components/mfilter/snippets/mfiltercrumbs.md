# mFilterCrumbs

Snippet for breadcrumbs with filter segment support and SEO markup.

## Description

mFilterCrumbs extends pdoCrumbs by adding filter segments to breadcrumbs on pages with active filters.

**Features:**
- On normal pages — works like pdoCrumbs
- On filtered pages — adds filter segments as extra items
- Schema.org Microdata support
- Optional JSON-LD structured output
- Full compatibility with all pdoCrumbs parameters

## Parameters

### Specific parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `showFilterCrumbs` | `true` | Show filter segments in breadcrumbs |
| `tplFilterCrumb` | from `&tpl` | Template for filter item |
| `schemaJsonLd` | `false` | Add JSON-LD markup at end of output |

### Templates (pdoCrumbs)

| Parameter | Default | Description |
|-----------|---------|-------------|
| `tpl` | built-in with Microdata | Crumb item template |
| `tplCurrent` | built-in | Current item (no link) |
| `tplHome` | — | Home page template |
| `tplWrapper` | built-in nav/ol | Wrapper for full list |

### Behavior (pdoCrumbs)

| Parameter | Default | Description |
|-----------|---------|-------------|
| `showCurrent` | `true` (on filtered) | Show current item |
| `showHome` | `true` | Show home page |
| `fastMode` | `false` | Fast chunk parsing mode |
| `outputSeparator` | (empty) | Separator between items |

### Output

| Parameter | Default | Description |
|-----------|---------|-------------|
| `toPlaceholder` | — | Output to placeholder instead of return |
| `return` | — | `data` — return array instead of HTML |

## Placeholders in templates

### Standard (from pdoCrumbs)

| Placeholder | Description |
|-------------|-------------|
| `{$id}` | Resource ID (0 for filters) |
| `{$pagetitle}` | Page title / filter value |
| `{$menutitle}` | Menu title / filter value |
| `{$longtitle}` | Long title |
| `{$link}` | Item URL |
| `{$idx}` | Index number |
| `{$position}` | Position for Schema.org |

### Filter-specific

| Placeholder | Description |
|-------------|-------------|
| `{$is_filter}` | true if this is a filter item |
| `{$filter_key}` | Filter key (color, size, price...) |
| `{$filter_label}` | Localized filter label |
| `{$filter_values}` | Filter values array |

## Examples

### Basic call

```fenom
{'!mFilterCrumbs' | snippet}
```

### With JSON-LD markup

```fenom
{'!mFilterCrumbs' | snippet: [
    'schemaJsonLd' => true
]}
```

Outputs additionally:

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://site.com/"},
        {"@type": "ListItem", "position": 2, "name": "Catalog", "item": "https://site.com/catalog/"},
        {"@type": "ListItem", "position": 3, "name": "Red"}
    ]
}
</script>
```

### Custom templates

```fenom
{'!mFilterCrumbs' | snippet: [
    'tpl' => '@INLINE <li><a href="{$link}">{$menutitle}</a></li>',
    'tplCurrent' => '@INLINE <li class="active">{$menutitle}</li>',
    'tplWrapper' => '@INLINE <nav><ul class="breadcrumb">{$output}</ul></nav>'
]}
```

### Without filters in breadcrumbs

```fenom
{'!mFilterCrumbs' | snippet: [
    'showFilterCrumbs' => false
]}
```

### Output to placeholder

```fenom
{'!mFilterCrumbs' | snippet: [
    'toPlaceholder' => 'crumbs'
]}

{* Later in template *}
{$_modx->getPlaceholder('crumbs')}
```

### Get data as array

```fenom
{set $crumbs = '!mFilterCrumbs' | snippet: ['return' => 'data']}
{foreach $crumbs as $crumb}
    {$crumb.menutitle} ({$crumb.link})
{/foreach}
```

## SEO markup

By default the snippet outputs Schema.org Microdata:

```html
<nav class="mfilter-crumbs" aria-label="Breadcrumb">
<ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="/"><span itemprop="name">Home</span></a>
        <meta itemprop="position" content="1">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="/catalog/"><span itemprop="name">Catalog</span></a>
        <meta itemprop="position" content="2">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <span itemprop="name">Red</span>
        <meta itemprop="position" content="3">
    </li>
</ol>
</nav>
```

## CSS styles

Basic styles are included in `mfilter.css`:

```css
.mfilter-crumbs ol {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
}

.mfilter-crumbs li:not(:last-child)::after {
    content: '/';
    margin-left: 0.5rem;
    color: var(--mfilter-text-muted, #6c757d);
}
```
