# mFilterForm

Snippet for rendering the filter form.

## Parameters

### Main

| Parameter | Default | Description |
|----------|--------------|----------|
| `resourceId` | current resource | Resource ID for filter configuration |
| `filters` | — | Show only these filters (comma-separated) |
| `exclude` | — | Exclude these filters (comma-separated) |

### Templates

| Parameter | Default | Description |
|----------|--------------|----------|
| `tpl` | `mfilter.filter` | Filter block template |
| `tplOuter` | `@INLINE` | Outer form template |
| `tplItem` | — | Filter item template (checkbox/radio) |
| `tplSlider` | — | Range slider template |
| `tplColor` | — | Color filter template |
| `tplBoolean` | — | Boolean toggle template |

### Value display

| Parameter | Default | Description |
|----------|--------------|----------|
| `showCounts` | `true` | Show result counts |
| `hideZero` | `true` | Hide values with zero count |
| `hideEmpty` | `false` | Hide empty filters (no values) |
| `sortByCount` | `false` | Sort values by count (DESC) |

### Form

| Parameter | Default | Description |
|----------|--------------|----------|
| `formId` | — | Form HTML id |
| `formClass` | — | Form CSS class |
| `actionUrl` | current URL | Form action URL |
| `method` | `POST` | Form method (GET, POST) |

### AJAX

| Parameter | Default | Description |
|----------|--------------|----------|
| `ajax` | `true` | Enable AJAX filtering |
| `ajaxMode` | `form` | Mode: `form` (on button) or `instant` (on change) |

### Output

| Parameter | Default | Description |
|----------|--------------|----------|
| `outputSeparator` | `\n` | Separator between filter blocks |
| `toPlaceholder` | `false` | Output to placeholder |
| `placeholderPrefix` | `mfilter.` | Placeholder prefix |

## Examples

### Basic call

```fenom
{'!mFilterForm' | snippet}
```

### Only specific filters

```fenom
{'!mFilterForm' | snippet: [
    'filters' => 'vendor,color,price'
]}
```

### Exclude filters

```fenom
{'!mFilterForm' | snippet: [
    'exclude' => 'size,weight'
]}
```

### Instant filtering

```fenom
{'!mFilterForm' | snippet: [
    'ajaxMode' => 'instant'
]}
```

### Sort values by popularity

```fenom
{'!mFilterForm' | snippet: [
    'sortByCount' => 1,
    'hideZero' => 1
]}
```

### Custom form wrapper

```fenom
{'!mFilterForm' | snippet: [
    'tplOuter' => '@INLINE <form id="catalog-filter" class="filter-sidebar" data-mfilter>{$output}</form>'
]}
```

### Output to placeholder

```fenom
{'!mFilterForm' | snippet: [
    'toPlaceholder' => 'sidebar.filters'
]}

{* Use elsewhere *}
<aside>
    {$_modx->getPlaceholder('sidebar.filters')}
</aside>
```

### Form for another resource

```fenom
{* Filter form for category ID=5 *}
{'!mFilterForm' | snippet: [
    'resourceId' => 5
]}
```

## Templates

### Default structure

```html
<form data-mfilter data-mfilter-results=".mfilter-results">
    <!-- Filter "Brand" -->
    <div class="mfilter-filter" data-filter="vendor">
        <div class="mfilter-filter-title">Brand</div>
        <div class="mfilter-filter-content">
            <label class="mfilter-item">
                <input type="checkbox" name="vendor[]" value="apple">
                <span class="mfilter-label">Apple</span>
                <span class="mfilter-count">15</span>
            </label>
            <!-- ... -->
        </div>
    </div>

    <!-- Filter "Price" (range) -->
    <div class="mfilter-filter mfilter-range" data-filter="price">
        <div class="mfilter-filter-title">Price</div>
        <div class="mfilter-filter-content">
            <input type="number" name="price|min" data-range="min" min="0" max="100000">
            <input type="number" name="price|max" data-range="max" min="0" max="100000">
            <div data-mfilter-slider></div>
        </div>
    </div>

    <button type="submit">Apply</button>
    <button type="reset" class="mfilter-reset">Reset</button>
</form>
```

### Custom filter template

```fenom
{'!mFilterForm' | snippet: [
    'tpl' => '@FILE chunks/filter.custom.tpl'
]}
```

**chunks/filter.custom.tpl:**

```html
<div class="filter-block filter-{$key}" data-filter="{$key}">
    <h4 class="filter-title">{$label}</h4>

    {if $type == 'number'}
        <div class="filter-range">
            <input type="number" name="{$key}|min" value="{$min}" min="{$filterMin}" max="{$filterMax}">
            <span>—</span>
            <input type="number" name="{$key}|max" value="{$max}" min="{$filterMin}" max="{$filterMax}">
        </div>
    {else}
        <ul class="filter-values">
            {foreach $values as $item}
                <li class="filter-value {$item.active ? 'active' : ''}">
                    <label>
                        <input type="checkbox" name="{$key}[]" value="{$item.value}" {$item.active ? 'checked' : ''}>
                        {$item.label}
                        {if $showCounts}
                            <span class="count">({$item.count})</span>
                        {/if}
                    </label>
                </li>
            {/foreach}
        </ul>
    {/if}
</div>
```

### Placeholders in filter template

| Placeholder | Description |
|-------------|----------|
| `{$key}` | Filter key (vendor, color, price) |
| `{$label}` | Filter label |
| `{$type}` | Type (default, number, boolean, vendors, colors) |
| `{$source}` | Source (option, tv, field, resource) |
| `{$values}` | Values array |
| `{$min}`, `{$max}` | Current range values |
| `{$filterMin}`, `{$filterMax}` | Range bounds |
| `{$active}` | Whether any value is selected |

### Placeholders in value item

| Placeholder | Description |
|-------------|----------|
| `{$item.value}` | Value |
| `{$item.label}` | Display label |
| `{$item.count}` | Result count |
| `{$item.active}` | Whether value is selected |
| `{$item.slug}` | SEO slug for value |
| `{$item.hex}` | HEX color (for colors type) |

## Data attributes

The form uses data attributes for JavaScript:

| Attribute | Description |
|---------|----------|
| `data-mfilter` | mFilter form marker |
| `data-mfilter-results` | Results block selector |
| `data-mfilter-ajax` | Enable AJAX (true/false) |
| `data-mfilter-mode` | Mode: form or instant |
| `data-mfilter-auto-submit` | Auto-submit on change |
| `data-mfilter-hash` | Config hash for AJAX |
| `data-filter` | Filter key (on block) |
| `data-range` | Range field type (min/max) |
| `data-mfilter-slider` | Marker for noUiSlider |

## CSS classes

| Class | Description |
|-------|----------|
| `.mfilter-form` | Filter form |
| `.mfilter-filter` | Single filter block |
| `.mfilter-filter-title` | Filter title |
| `.mfilter-filter-content` | Filter content |
| `.mfilter-item` | Filter item (label) |
| `.mfilter-label` | Item text |
| `.mfilter-count` | Result count |
| `.mfilter-range` | Range block |
| `.mfilter-reset` | Reset button |
| `.mfilter-loading` | Loading state |
| `.mfilter-disabled` | Disabled item |

## Filters outside the form

You can place individual filters outside the main form and control them via JS API:

```fenom
{* Main form without brand filter *}
{'!mFilterForm' | snippet: [
    'exclude' => 'vendor',
    'formId' => 'main-filter'
]}

{* Separate brand filter in header *}
<select id="header-brand">
    <option value="">All brands</option>
    <option value="apple">Apple</option>
    <option value="samsung">Samsung</option>
</select>

<script>
document.getElementById('header-brand').addEventListener('change', (e) => {
    const filter = mfilterGet('main-filter');
    if (e.target.value) {
        filter.setFilter('vendor', e.target.value);
    } else {
        filter.removeFilter('vendor');
    }
    filter.submit();
});
</script>
```

See: [External filters](/en/components/mfilter/cookbook/external-filters)
