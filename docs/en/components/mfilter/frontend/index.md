# Frontend

Documentation for mFilter frontend templates and layout.

## Structure

| Section | Description |
|--------|----------|
| [Templates](templates) | Chunks and markup |
| [Placeholders](placeholders) | Template variables |

## Overview

mFilter uses Fenom for templating. Main frontend parts:

### Filter form

```html
<form id="mfilter-form" data-mfilter-form>
    <!-- Filters -->
</form>
```

### Results

```html
<div id="mfilter-results" data-mfilter-results>
    <!-- Products/resources -->
</div>
```

### Pagination

```html
<div id="mfilter-pagination" data-mfilter-pagination>
    <!-- Page navigation -->
</div>
```

## Quick start

### Basic markup

```html
<!-- Form snippet -->
[[!mFilterForm]]

<!-- Results snippet -->
[[!mFilter?
    &element=`msProducts`
    &paginator=`pdoPage`
    &parents=`5`
]]
```

### Custom markup

```html
<div class="catalog">
    <aside class="catalog__sidebar">
        [[!mFilterForm?
            &tplOuter=`@FILE chunks/mfilter/form.outer.tpl`
            &tplFilter.default=`@FILE chunks/mfilter/filter.default.tpl`
        ]]
    </aside>

    <main class="catalog__content">
        <div data-mfilter-results>
            [[!mFilter?
                &element=`msProducts`
                &paginator=`pdoPage`
                &tpl=`@FILE chunks/product.card.tpl`
            ]]
        </div>

        <div data-mfilter-pagination>
            [[!+page.nav]]
        </div>
    </main>
</div>
```

## Data attributes

### Required

| Attribute | Element | Description |
|---------|---------|----------|
| `data-mfilter-form` | form | Form container |
| `data-mfilter-results` | div | Results container |

### Optional

| Attribute | Element | Description |
|---------|---------|----------|
| `data-mfilter-pagination` | div | Pagination container |
| `data-mfilter-total` | span | Result count |
| `data-mfilter-filter` | fieldset | Filter block |
| `data-mfilter-key` | input | Filter key |

## CSS classes

### States

| Class | Description |
|-------|----------|
| `mfilter-loading` | Loading data |
| `mfilter-empty` | No results |
| `mfilter-active` | Has active filters |

### Form elements

| Class | Description |
|-------|----------|
| `mfilter-filter` | Filter block |
| `mfilter-filter--disabled` | Disabled filter |
| `mfilter-value` | Filter value |
| `mfilter-value--selected` | Selected value |
| `mfilter-value--disabled` | Disabled value |
| `mfilter-count` | Product count |

## Default templates

Built-in templates are in:

```
core/components/mfilter/elements/chunks/
```

To customize, copy to your folder and set the path via `tpl*` parameters.
