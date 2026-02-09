# External filters

Placing individual filters outside the main form.

## Task

Place some filters (e.g. sort or quick filters) separately from the main filter form.

## Solution

Use the JavaScript API to control filters from anywhere on the page.

## Example: Sort in header

### HTML

```html
<!-- Catalog header (outside form) -->
<div class="catalog-header">
    <div class="catalog-header__sort">
        <label>Sort:</label>
        <select id="external-sort">
            <option value="pagetitle-asc">By name (A–Z)</option>
            <option value="pagetitle-desc">By name (Z–A)</option>
            <option value="Data.price-asc">Price: low to high</option>
            <option value="Data.price-desc">Price: high to low</option>
            <option value="publishedon-desc">Newest first</option>
        </select>
    </div>

    <div class="catalog-header__total">
        Found: <span data-mfilter-total></span>
    </div>
</div>

<!-- Main form in sidebar -->
<aside class="catalog-sidebar">
    [[!mFilterForm]]
</aside>

<!-- Results -->
<main class="catalog-content">
    <div data-mfilter-results>
        [[!mFilter? ...]]
    </div>
</main>
```

### JavaScript

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('external-sort');

    sortSelect.addEventListener('change', function() {
        const [field, dir] = this.value.split('-');
        const mfilter = window.mFilter.getInstance();

        // Set sort via tech params
        mfilter.setTechParam('sort', this.value);
        mfilter.submit();
    });

    // Sync on load
    document.addEventListener('mfilter:success', function(e) {
        if (e.detail.tech?.sort) {
            sortSelect.value = e.detail.tech.sort;
        }
    });
});
```

## Example: Quick filter buttons

### HTML

```html
<!-- Quick filters (outside form) -->
<div class="quick-filters">
    <button class="quick-filter" data-filter="new" data-value="1">
        New
    </button>
    <button class="quick-filter" data-filter="popular" data-value="1">
        Popular
    </button>
    <button class="quick-filter" data-filter="sale" data-value="1">
        On sale
    </button>
</div>

<!-- Main form -->
[[!mFilterForm]]
```

### JavaScript

```javascript
document.querySelectorAll('.quick-filter').forEach(button => {
    button.addEventListener('click', function() {
        const key = this.dataset.filter;
        const value = this.dataset.value;
        const mfilter = window.mFilter.getInstance();

        // Toggle filter
        const current = mfilter.getState().filters[key];

        if (current && current.includes(value)) {
            mfilter.removeFilter(key);
            this.classList.remove('active');
        } else {
            mfilter.setFilter(key, [value]);
            this.classList.add('active');
        }

        mfilter.submit();
    });
});

// Sync button state
document.addEventListener('mfilter:success', function(e) {
    document.querySelectorAll('.quick-filter').forEach(button => {
        const key = button.dataset.filter;
        const value = button.dataset.value;
        const active = e.detail.filters[key]?.includes(value);
        button.classList.toggle('active', active);
    });
});
```

## Example: Search by name

### HTML

```html
<!-- Search outside form -->
<div class="catalog-search">
    <input type="text" id="catalog-search-input" placeholder="Search products...">
    <button id="catalog-search-btn">Search</button>
</div>

[[!mFilterForm]]
```

### JavaScript

```javascript
const searchInput = document.getElementById('catalog-search-input');
const searchBtn = document.getElementById('catalog-search-btn');

function doSearch() {
    const query = searchInput.value.trim();
    const mfilter = window.mFilter.getInstance();

    if (query) {
        mfilter.setFilter('pagetitle', query);
    } else {
        mfilter.removeFilter('pagetitle');
    }

    mfilter.submit();
}

searchBtn.addEventListener('click', doSearch);
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        doSearch();
    }
});
```

## Example: Price range in separate block

### HTML

```html
<!-- Separate price block -->
<div class="price-filter-external">
    <h4>Price</h4>
    <div class="price-inputs">
        <input type="number" id="price-min" placeholder="From">
        <span>—</span>
        <input type="number" id="price-max" placeholder="To">
    </div>
    <button id="price-apply">Apply</button>
</div>

<!-- Form without price filter -->
[[!mFilterForm?
    &filters=`vendor,color,size`
]]
```

### JavaScript

```javascript
const priceMin = document.getElementById('price-min');
const priceMax = document.getElementById('price-max');
const priceApply = document.getElementById('price-apply');

priceApply.addEventListener('click', function() {
    const mfilter = window.mFilter.getInstance();

    const min = priceMin.value ? parseInt(priceMin.value) : null;
    const max = priceMax.value ? parseInt(priceMax.value) : null;

    if (min !== null || max !== null) {
        mfilter.setFilter('price', {
            min: min,
            max: max
        });
    } else {
        mfilter.removeFilter('price');
    }

    mfilter.submit();
});

// Sync on load and after AJAX
document.addEventListener('mfilter:success', function(e) {
    const price = e.detail.filters.price;
    if (price) {
        priceMin.value = price.min || '';
        priceMax.value = price.max || '';
    } else {
        priceMin.value = '';
        priceMax.value = '';
    }
});
```

## Example: Vendor in dropdown menu

### HTML

```html
<!-- Category menu with vendors -->
<nav class="category-menu">
    <div class="category-menu__item">
        <a href="/catalog/electronics/">Electronics</a>
        <ul class="vendor-submenu">
            <li><a href="#" data-vendor="apple">Apple</a></li>
            <li><a href="#" data-vendor="samsung">Samsung</a></li>
            <li><a href="#" data-vendor="xiaomi">Xiaomi</a></li>
        </ul>
    </div>
</nav>
```

### JavaScript

```javascript
document.querySelectorAll('[data-vendor]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const vendor = this.dataset.vendor;
        const mfilter = window.mFilter.getInstance();

        // Reset all filters and set only vendor
        mfilter.reset();
        mfilter.setFilter('vendor', [vendor]);
        mfilter.submit();
    });
});
```

## Syncing with the form

If a filter exists both in the form and outside, sync their state:

```javascript
document.addEventListener('mfilter:success', function(e) {
    // Update external elements
    syncExternalFilters(e.detail.filters);

    // Update counters
    document.querySelectorAll('[data-mfilter-total]').forEach(el => {
        el.textContent = e.detail.total;
    });
});

function syncExternalFilters(filters) {
    // Sync sort select
    const sortSelect = document.getElementById('external-sort');
    if (sortSelect && filters.sort) {
        sortSelect.value = filters.sort;
    }

    // Sync quick filters
    document.querySelectorAll('.quick-filter').forEach(btn => {
        const key = btn.dataset.filter;
        const value = btn.dataset.value;
        btn.classList.toggle('active', filters[key]?.includes(value));
    });
}
```

## Tips

1. **Use events** — subscribe to `mfilter:success` for syncing
2. **Avoid duplication** — if the filter is in the form, hide it and control via JS
3. **Preserve UX** — external filters should visually reflect current state
4. **Test without JS** — provide fallback for SEO and accessibility
