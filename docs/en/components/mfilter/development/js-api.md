# JS API

Programmatic control of filters via the JavaScript API.

## Getting an instance

```javascript
// By element ID
const filter = mfilterGet('mfilter-form');

// Via MFilterUI
const filter = MFilterUI.get('mfilter-form');

// All instances
const all = MFilterUI.instances; // Map
```

## Instance methods

### Filter control

```javascript
// Set filter value
filter.setFilter('brand', 'apple');
filter.setFilter('brand', ['apple', 'samsung']); // multiple

// Remove value
filter.removeFilter('brand', 'apple');

// Remove entire filter
filter.removeFilter('brand');

// Reset all filters
filter.reset();

// Get current filters
const filters = filter.getFilters();
// { brand: ['apple'], color: ['red', 'blue'] }

// Get full state
const state = filter.getState();
// { filters: {...}, page: 1, sort: 'price-asc', limit: 24 }
```

### Sort and pagination

```javascript
// Set sort
filter.setSort('price-asc');
filter.setSort('price-desc');

// Set limit
filter.setLimit(48);

// Go to page
filter.goToPage(3);

// Load more (for infinite scroll)
filter.loadMore();
```

### Submit

```javascript
// Submit form (collects data from DOM)
filter.submit();

// Submit without collecting (uses current state)
filter.submitWithoutCollect();
```

### Sync

```javascript
// Sync form with internal state
filter.syncFormWithState();
```

### Events

```javascript
// Subscribe to event
filter.on('change', (data) => {
    console.log('Change:', data.field, data.value);
});

filter.on('success', (data) => {
    console.log('Results:', data.response);
});

filter.on('error', (data) => {
    console.error('Error:', data.error);
});

// Unsubscribe
filter.off('change', handler);
filter.off('change'); // all handlers for event
```

### Instance events

| Event | Description | Data |
|-------|-------------|------|
| `init` | Initialization | `{ instance }` |
| `change` | Field change | `{ field, name, value, state }` |
| `beforeSubmit` | Before submit | `{ state, instance, cancel }` |
| `afterSubmit` | After submit | `{ state, instance }` |
| `success` | Success response | `{ response, instance }` |
| `error` | Error | `{ error, instance }` |
| `seoUpdate` | SEO update | `{ seoData, instance }` |
| `destroy` | Destroy | `{ instance }` |

## Examples

### External filter

```html
<select id="quick-brand">
    <option value="">All brands</option>
    <option value="apple">Apple</option>
    <option value="samsung">Samsung</option>
</select>

<script>
document.getElementById('quick-brand').addEventListener('change', (e) => {
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

### Reset on button click

```html
<button id="clear-filters">Reset all filters</button>

<script>
document.getElementById('clear-filters').addEventListener('click', () => {
    const filter = mfilterGet('mfilter-form');
    filter.reset();
});
</script>
```

### Programmatic filtering

```javascript
const filter = mfilterGet('mfilter-form');

// Set multiple filters
filter.setFilter('brand', ['apple', 'samsung']);
filter.setFilter('price', { min: 10000, max: 50000 });
filter.setSort('price-asc');
filter.setLimit(24);

// Submit
filter.submit();
```

### Tracking changes

```javascript
const filter = mfilterGet('mfilter-form');

filter.on('success', ({ response }) => {
    // Send to analytics
    gtag('event', 'filter_applied', {
        filters: JSON.stringify(filter.getFilters()),
        results_count: response.total
    });
});
```

### Canceling submit

```javascript
const filter = mfilterGet('mfilter-form');

filter.on('beforeSubmit', (data) => {
    const filters = data.state.filters;

    // Cancel if too many filters selected
    if (Object.keys(filters).length > 5) {
        data.cancel = true;
        alert('Select no more than 5 filters');
    }
});
```

### Custom result handling

```javascript
const filter = mfilterGet('mfilter-form');

filter.on('success', ({ response }) => {
    // Update header counter
    document.querySelector('.header-count').textContent = response.total;

    // Update URL without built-in pushState
    if (response.urls?.current) {
        window.history.replaceState({}, '', response.urls.current);
    }
});
```

### Syncing two forms

```javascript
const mainFilter = mfilterGet('main-filter');
const mobileFilter = mfilterGet('mobile-filter');

// When main form changes — update mobile
mainFilter.on('success', () => {
    const state = mainFilter.getState();

    // Manually update mobile form state
    Object.entries(state.filters).forEach(([key, values]) => {
        mobileFilter.setFilter(key, values);
    });
    mobileFilter.syncFormWithState();
});
```

## Creating an instance

```javascript
// Create new instance
const instance = mfilterInit('#my-element', {
    ajax: true,
    seoUrl: true,
    pushState: true,
    autoSubmit: true,
    autoSubmitDelay: 500,
    resultsSelector: '.my-results',
    paginationSelector: '.my-pagination',
    scrollToResults: true,
    scrollOffset: 100,

    // Callbacks
    onInit: function(instance) {
        console.log('Initialized');
    },
    onChange: function(field, state) {
        console.log('Changed:', field.name);
    },
    onBeforeSubmit: function(state) {
        console.log('Submitting...');
    },
    onSuccess: function(response) {
        console.log('Results:', response);
    },
    onError: function(error) {
        console.error('Error:', error);
    }
});
```

## Instance options

| Option | Default | Description |
|--------|---------|-------------|
| `ajax` | `true` | Use AJAX |
| `ajaxMode` | `form` | Mode: form or instant |
| `seoUrl` | `true` | SEO-friendly URL |
| `pushState` | `true` | Update browser URL |
| `autoSubmit` | `false` | Auto-submit on change |
| `autoSubmitDelay` | `500` | Auto-submit delay (ms) |
| `resetPage` | `true` | Reset page on filter change |
| `scrollToResults` | `true` | Scroll to results |
| `scrollOffset` | `100` | Scroll offset (px) |
| `loadingClass` | `mfilter-loading` | Loading CSS class |
| `loadingOverlay` | `true` | Show overlay |
| `resultsSelector` | `.mfilter-results` | Results selector |
| `paginationSelector` | `.mfilter-pagination` | Pagination selector |
| `paginationMode` | `links` | Mode: links, loadmore, infinite |
| `debug` | `false` | Debug mode |

## Destroying

```javascript
// By ID
mfilterDestroy('mfilter-form');

// Via MFilterUI
MFilterUI.destroy('mfilter-form');
```
