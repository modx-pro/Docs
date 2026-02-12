# Cookbook

Practical examples for common mFilter tasks.

## Contents

| Recipe | Description |
|--------|----------|
| [Filter values sorting](filter-values-sorting) | Controlling value order in filters |
| [External filters](external-filters) | Filters outside the main form |
| [Custom filter type](custom-filter-type) | Creating a custom filter type |

## Quick recipes

### Sort via select

```html
<select data-mfilter-sort onchange="mFilter.getInstance().submit()">
    <option value="pagetitle-asc">By name (A–Z)</option>
    <option value="Data.price-asc">Price: low to high</option>
    <option value="Data.price-desc">Price: high to low</option>
</select>
```

### Items per page

```html
<select data-mfilter-limit onchange="mFilter.getInstance().submit()">
    <option value="12">12</option>
    <option value="24" selected>24</option>
    <option value="48">48</option>
    <option value="96">96</option>
</select>
```

### View toggle

```html
<div class="view-switcher">
    <button data-mfilter-view="grid" class="active">Grid</button>
    <button data-mfilter-view="list">List</button>
</div>

<script>
document.querySelectorAll('[data-mfilter-view]').forEach(btn => {
    btn.addEventListener('click', function() {
        const view = this.dataset.mfilterView;
        const mfilter = window.mFilter.getInstance();

        mfilter.setTpl(view);
        mfilter.submit();

        document.querySelectorAll('[data-mfilter-view]').forEach(b =>
            b.classList.toggle('active', b === this)
        );
    });
});
</script>
```

### Reset all filters

```html
<button onclick="mFilter.getInstance().reset()">
    Reset filters
</button>
```

### Reset one filter

```html
<button onclick="mFilter.getInstance().removeFilter('vendor')">
    Reset vendor
</button>
```

### Show active filter count

```html
<span class="filter-badge" data-mfilter-active-count>
    {$mfilter.filterCount}
</span>

<script>
document.addEventListener('mfilter:success', function(e) {
    const count = Object.keys(e.detail.filters).length;
    document.querySelector('[data-mfilter-active-count]').textContent = count;
});
</script>
```

### Auto-submit on change

```javascript
// Already on by default for checkboxes and radio
// For select add:
document.querySelectorAll('[data-mfilter-form] select').forEach(select => {
    select.addEventListener('change', () => {
        window.mFilter.getInstance().submit();
    });
});
```

### Disable auto-submit

```php
[[!mFilterForm?
    &autoSubmit=`0`
]]
```

### Show loader

```html
<style>
.mfilter-loading [data-mfilter-results] {
    opacity: 0.5;
    pointer-events: none;
}

.mfilter-loading::after {
    content: '';
    position: fixed;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    border: 3px solid #ccc;
    border-top-color: #333;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
</style>
```

### Scroll to results

```javascript
document.addEventListener('mfilter:success', function() {
    document.querySelector('[data-mfilter-results]').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});
```

### Filter tracking (Google Analytics)

```javascript
document.addEventListener('mfilter:success', function(e) {
    gtag('event', 'filter', {
        'event_category': 'catalog',
        'event_label': JSON.stringify(e.detail.filters),
        'value': e.detail.total
    });
});
```

### Save filters in localStorage

```javascript
// Save
document.addEventListener('mfilter:success', function(e) {
    localStorage.setItem('mfilter_state', JSON.stringify(e.detail.filters));
});

// Restore
window.addEventListener('load', function() {
    const saved = localStorage.getItem('mfilter_state');
    if (saved) {
        const mfilter = window.mFilter.getInstance();
        const filters = JSON.parse(saved);

        Object.entries(filters).forEach(([key, values]) => {
            mfilter.setFilter(key, values);
        });

        mfilter.submit();
    }
});
```

### Filter in modal (mobile)

```html
<!-- Open button -->
<button class="mobile-filter-btn" onclick="openFilterModal()">
    Filters
    <span data-mfilter-active-count></span>
</button>

<!-- Modal -->
<div id="filter-modal" class="filter-modal">
    <div class="filter-modal__header">
        <span>Filters</span>
        <button onclick="closeFilterModal()">×</button>
    </div>
    <div class="filter-modal__body">
        [[!mFilterForm]]
    </div>
    <div class="filter-modal__footer">
        <button onclick="mFilter.getInstance().submit(); closeFilterModal();">
            Show products
        </button>
    </div>
</div>

<script>
function openFilterModal() {
    document.getElementById('filter-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFilterModal() {
    document.getElementById('filter-modal').classList.remove('active');
    document.body.style.overflow = '';
}
</script>
```

### Conditional filter display

```html
{* In filter template *}
{if count($values) > 1}
    <fieldset class="mfilter-filter">
        {* ... *}
    </fieldset>
{/if}
```
