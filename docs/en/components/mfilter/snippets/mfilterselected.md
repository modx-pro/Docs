# mFilterSelected

Snippet for displaying selected (active) filters with the ability to remove them.

## Description

mFilterSelected shows a block with current active filters. The user can remove individual filters or reset all at once. The component integrates with JavaScript for live updates during AJAX filtering.

**Features:**
- Grouping by filter key
- Automatic labels from lexicons and configuration
- Reset-all button
- Integration with SelectedFilters JS component
- SEO URL and plain GET parameter support

## Parameters

### Main

| Parameter | Default | Description |
|-----------|---------|-------------|
| `resourceId` | current resource | Resource ID for filter configuration |

### Templates

| Parameter | Default | Description |
|-----------|---------|-------------|
| `tplOuter` | `mfilter.selected.outer` | Outer container |
| `tplGroup` | `mfilter.selected.group` | Group template (for grouping by filterKey) |
| `tplItem` | `mfilter.selected.item` | Single filter item template |
| `tplReset` | `mfilter.selected.reset` | Reset button template |

### Behavior

| Parameter | Default | Description |
|-----------|---------|-------------|
| `grouped` | `true` | Group items by filter key |
| `showLabels` | `true` | Show filter labels (Color:, Size:) |
| `showReset` | `true` | Show "Reset all" button |
| `hideWhenEmpty` | `true` | Hide block when no filters selected |
| `resetText` | from lexicon | Reset button text |

### Output

| Parameter | Default | Description |
|-----------|---------|-------------|
| `toPlaceholder` | — | Output to placeholder |

## Placeholders in templates

### tplOuter

| Placeholder | Description |
|-------------|-------------|
| `{$items}` | HTML of all items/groups |
| `{$reset}` | HTML of reset button |
| `{$count}` | Number of active filters |
| `{$empty}` | true if no filters selected |
| `{$hidden}` | true if block should be hidden |
| `{$filterLabels}` | JSON object of labels for JS |

### tplGroup

| Placeholder | Description |
|-------------|-------------|
| `{$key}` | Filter key |
| `{$label}` | Filter label |
| `{$items}` | HTML of group items |
| `{$count}` | Number of values in group |
| `{$showLabel}` | Whether to show label |

### tplItem

| Placeholder | Description |
|-------------|-------------|
| `{$key}` | Filter key |
| `{$value}` | Filter value |
| `{$filterLabel}` | Filter label |
| `{$valueLabel}` | Value label |
| `{$label}` | Alias for valueLabel |

### tplReset

| Placeholder | Description |
|-------------|-------------|
| `{$text}` | Button text |

## Examples

### Basic call

```fenom
{'!mFilterSelected' | snippet}
```

### Without grouping

```fenom
{'!mFilterSelected' | snippet: [
    'grouped' => false
]}
```

### Without labels and reset button

```fenom
{'!mFilterSelected' | snippet: [
    'showLabels' => false,
    'showReset' => false
]}
```

### Custom reset text

```fenom
{'!mFilterSelected' | snippet: [
    'resetText' => 'Clear filters'
]}
```

### Custom templates

```fenom
{'!mFilterSelected' | snippet: [
    'tplOuter' => '@INLINE
        <div class="selected-filters" data-mfilter-selected>
            {$items}
            {$reset}
        </div>',
    'tplItem' => '@INLINE
        <span class="filter-tag" data-mfilter-remove="{$key}" data-value="{$value}">
            {$label} <button type="button">&times;</button>
        </span>',
    'tplReset' => '@INLINE
        <button type="button" data-mfilter-reset class="btn btn-link">{$text}</button>'
]}
```

## Integration with form

Recommended to place above filter results:

```fenom
<div class="catalog">
    <aside class="catalog-sidebar">
        {'!mFilterForm' | snippet}
    </aside>

    <main class="catalog-content">
        {* Selected filters *}
        {'!mFilterSelected' | snippet}

        {* Results *}
        {'!mFilter' | snippet: [
            'element' => 'msProducts',
            'paginator' => 'pdoPage',
            'parents' => $_modx->resource.id
        ]}
    </main>
</div>
```

## JavaScript integration

The block updates automatically on AJAX filtering via the `SelectedFilters` JS component.

### Data attributes

| Attribute | Description |
|-----------|-------------|
| `data-mfilter-selected` | Selected filters container |
| `data-mfilter-remove="{key}"` | Remove value button |
| `data-value="{value}"` | Value to remove |
| `data-mfilter-reset` | Reset all filters button |

### Example HTML markup

```html
<div class="selected-filters" data-mfilter-selected>
    <div class="filter-group">
        <span class="filter-label">Color:</span>
        <span class="filter-tag" data-mfilter-remove="color" data-value="red">
            Red <button>&times;</button>
        </span>
        <span class="filter-tag" data-mfilter-remove="color" data-value="blue">
            Blue <button>&times;</button>
        </span>
    </div>
    <button data-mfilter-reset>Reset all</button>
</div>
```

## Default chunks

### mfilter.selected.outer

```html
<div class="mfilter-selected{if $hidden} mfilter-selected--hidden{/if}"
     data-mfilter-selected
     data-filter-labels='{$filterLabels}'>
    {if !$empty}
        <div class="mfilter-selected__items">
            {$items}
        </div>
        {$reset}
    {/if}
</div>
```

### mfilter.selected.item

```html
<span class="mfilter-selected__tag"
      data-mfilter-remove="{$key}"
      data-value="{$value}">
    {$label}
    <button type="button" class="mfilter-selected__remove" aria-label="Remove">&times;</button>
</span>
```

### mfilter.selected.reset

```html
<button type="button" class="mfilter-selected__reset" data-mfilter-reset>
    {$text}
</button>
```
