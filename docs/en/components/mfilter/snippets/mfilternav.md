# mFilterNav

Snippet for building SEO navigation from filter values.

## Description

mFilterNav generates navigation menus from filter values — e.g. list of colors, brands, or categories with links to filtered pages. Parameters follow pdoMenu style for convenience.

**Use cases:**
- SEO internal linking in footer or sidebar
- Brand / vendor navigation
- Tag clouds / attribute links
- Link-based filters instead of checkboxes

## Parameters

### Main

| Parameter | Default | Description |
|-----------|---------|-------------|
| `parents` | `0` (current) | Parent resource ID |
| `filterKeys` | — | Filter keys to display (comma-separated) |

### Data source (for counts)

| Parameter | Default | Description |
|-----------|---------|-------------|
| `element` | — | Snippet for getting IDs (msProducts, pdoResources) |
| `depth` | `10` | Search depth for element |

### Templates (pdoMenu style)

| Parameter | Default | Description |
|-----------|---------|-------------|
| `tpl` | built-in | Link item template |
| `tplOuter` | `@INLINE <ul>{$output}</ul>` | Outer wrapper |
| `tplGroup` | — | Group wrapper (for grouping by filterKey) |
| `tplHere` | — | Active item template |

### CSS classes (pdoMenu style)

| Parameter | Default | Description |
|-----------|---------|-------------|
| `firstClass` | `first` | First item class |
| `lastClass` | `last` | Last item class |
| `hereClass` | `active` | Active item class |
| `rowClass` | — | Class for all items |
| `outerClass` | — | Outer wrapper class |

### Behavior

| Parameter | Default | Description |
|-----------|---------|-------------|
| `showCount` | `false` | Show product count |
| `hideEmpty` | `true` | Hide items with count=0 |
| `sortBy` | `label` | Sort: label, count, sort_order |
| `sortDir` | `ASC` | Direction: ASC, DESC |
| `limit` | `0` | Item limit (0 = no limit) |

### Caching

| Parameter | Default | Description |
|-----------|---------|-------------|
| `cache` | `false` | Enable caching |
| `cacheTime` | `3600` | Cache TTL (seconds) |

## Placeholders in templates

### tpl / tplHere

| Placeholder | Description |
|-------------|-------------|
| `{$url}` | Filtered page URL |
| `{$label}` | Value label |
| `{$value}` | Raw value |
| `{$slug}` | Value slug |
| `{$filterKey}` | Filter key |
| `{$count}` | Product count |
| `{$hasCount}` | true if count is available |
| `{$showCount}` | Value of showCount parameter |
| `{$idx}` | Index (from 1) |
| `{$isActive}` | true if filter is active |
| `{$isFirst}` | true if first item |
| `{$isLast}` | true if last item |
| `{$classNames}` | Combined CSS classes |

### tplOuter

| Placeholder | Description |
|-------------|-------------|
| `{$output}` | HTML of all items |
| `{$outerClass}` | Wrapper class |

### tplGroup

| Placeholder | Description |
|-------------|-------------|
| `{$output}` | HTML of group items |
| `{$filterKey}` | Filter key |
| `{$count}` | Item count in group |

## Examples

### Brand navigation

```fenom
<nav class="brands-nav">
    <h3>Brands</h3>
    {'!mFilterNav' | snippet: [
        'parents' => $_modx->resource.id,
        'filterKeys' => 'vendor_id',
        'sortBy' => 'label'
    ]}
</nav>
```

### Color navigation with count

```fenom
{'!mFilterNav' | snippet: [
    'parents' => $_modx->resource.id,
    'filterKeys' => 'color',
    'element' => 'msProducts',
    'showCount' => true,
    'hideEmpty' => true,
    'tpl' => '@INLINE <li class="{$classNames}">
        <a href="{$url}">{$label} ({$count})</a>
    </li>'
]}
```

### Multiple filters with grouping

```fenom
{'!mFilterNav' | snippet: [
    'parents' => $_modx->resource.id,
    'filterKeys' => 'brand,color,size',
    'tplGroup' => '@INLINE <div class="filter-group">
        <h4>{$filterKey}</h4>
        <ul>{$output}</ul>
    </div>',
    'tplOuter' => '@INLINE <div class="filter-nav">{$output}</div>'
]}
```

### Top 10 popular values

```fenom
{'!mFilterNav' | snippet: [
    'parents' => $_modx->resource.id,
    'filterKeys' => 'brand',
    'element' => 'msProducts',
    'showCount' => true,
    'sortBy' => 'count',
    'sortDir' => 'DESC',
    'limit' => 10
]}
```

### Horizontal menu

```fenom
{'!mFilterNav' | snippet: [
    'parents' => $_modx->resource.id,
    'filterKeys' => 'category',
    'outerClass' => 'nav nav-pills',
    'rowClass' => 'nav-item',
    'hereClass' => 'active',
    'tpl' => '@INLINE <li class="{$classNames}">
        <a class="nav-link{if $isActive} active{/if}" href="{$url}">{$label}</a>
    </li>'
]}
```

### Custom active item template

```fenom
{'!mFilterNav' | snippet: [
    'parents' => $_modx->resource.id,
    'filterKeys' => 'color',
    'hereClass' => 'is-selected',
    'tplHere' => '@INLINE <li class="{$classNames}">
        <span class="current">{$label}</span>
    </li>'
]}
```

### Alphabetical index

```fenom
{* Sort by name *}
{'!mFilterNav' | snippet: [
    'parents' => $_modx->resource.id,
    'filterKeys' => 'brand',
    'sortBy' => 'label',
    'sortDir' => 'ASC',
    'outerClass' => 'brand-index'
]}
```

## SEO use

### Footer internal links

```fenom
<footer>
    <div class="footer-links">
        <div class="footer-col">
            <h4>Popular brands</h4>
            {'!mFilterNav' | snippet: [
                'parents' => 5,
                'filterKeys' => 'vendor_id',
                'limit' => 10,
                'sortBy' => 'count',
                'sortDir' => 'DESC',
                'element' => 'msProducts'
            ]}
        </div>
        <div class="footer-col">
            <h4>By color</h4>
            {'!mFilterNav' | snippet: [
                'parents' => 5,
                'filterKeys' => 'color',
                'element' => 'msProducts',
                'hideEmpty' => true
            ]}
        </div>
    </div>
</footer>
```

### Sidebar navigation

```fenom
<aside class="catalog-sidebar">
    {* Main filter form *}
    {'!mFilterForm' | snippet}

    {* Extra link-based navigation *}
    <div class="sidebar-links">
        <h4>Quick select</h4>
        {'!mFilterNav' | snippet: [
            'filterKeys' => 'brand,color',
            'limit' => 5,
            'showCount' => true,
            'element' => 'msProducts'
        ]}
    </div>
</aside>
```

## mFilterForm vs mFilterNav

| mFilterForm | mFilterNav |
|-------------|------------|
| Interactive form | Static links |
| Checkboxes, sliders | Links only |
| AJAX update | URL navigation |
| Combine filters | One filter per link |
| For users | For SEO / navigation |

## Recommendations

- Use `hideEmpty` to hide empty values
- `element` is only needed when using `showCount` or `hideEmpty`
- For SEO navigation, caching (`cache => true`) is recommended
- Use `limit` for long lists
