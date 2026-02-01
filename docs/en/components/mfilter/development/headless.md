# Headless API

REST API for integration with SPA applications (Vue, React, Svelte, etc.).

## Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│  Your App       │────▶│  FilterAPI   │────▶│  Server     │
│  (Vue/React)    │◀────│  (JS Client) │◀────│  REST API   │
└─────────────────┘     └──────────────┘     └─────────────┘
         │                     │
         │              ┌──────┴──────┐
         │              │   Hooks     │
         │              │  (events)   │
         │              └─────────────┘
         │
    ┌────┴────┐
    │ Custom  │
    │   UI    │
    └─────────┘
```

## Setup

### Minimal set (API only)

```html
<script src="/assets/components/mfilter/js/web/core/ApiClient.js"></script>
<script src="/assets/components/mfilter/js/web/core/FilterAPI.js"></script>
<script src="/assets/components/mfilter/js/web/modules/hooks.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.headless.js"></script>
```

### Configuration

```html
<script>
window.mfilterConfig = {
    apiUrl: '/assets/components/mfilter/api.php',
    resourceId: 5,  // Category ID
    debug: false
};
</script>
```

## JavaScript API

### Initialization

```javascript
// Wait for ready
document.addEventListener('mfilter:ready', async () => {
    // mfilter is ready to use
});

// Or manual initialization
await mfilter.init({ resourceId: 5 });
```

### Getting filter schema

```javascript
const response = await mfilter.getSchema(resourceId);

if (response.success) {
    const { filters, sort_options, limit_options } = response.data;

    // filters = {
    //     color: {
    //         key: 'color',
    //         type: 'checkbox',
    //         label: 'Color',
    //         values: [
    //             { value: 'red', label: 'Red', count: 15 },
    //             { value: 'blue', label: 'Blue', count: 8 }
    //         ]
    //     },
    //     price: {
    //         key: 'price',
    //         type: 'range',
    //         label: 'Price',
    //         min: 100,
    //         max: 50000,
    //         step: 100
    //     }
    // }
}
```

### Applying filters

```javascript
const response = await mfilter.apply(
    { color: ['red', 'blue'], price: { min: 1000, max: 5000 } },
    { sort: 'price-asc', page: 1, limit: 24 }
);

if (response.success) {
    const { items, total, page, pageCount, suggestions, seo, urls } = response.data;

    // items — products (JSON or HTML)
    // total — total count
    // suggestions — updated counts
    // seo — SEO data
    // urls — SEO URLs
}
```

### Getting suggestions (counts)

```javascript
// Lightweight request without loading products
const response = await mfilter.getSuggestions({ color: ['red'] });

// response.data = {
//     color: [{ value: 'red', count: 15 }, { value: 'blue', count: 8 }],
//     size: [...],
//     total: 150
// }
```

### Building SEO URL

```javascript
const response = await mfilter.buildUrl(
    { color: ['red'] },
    { sort: 'price-asc', page: 2 }
);

// response.data = {
//     url: '/electronics/color_red/sort_price-asc/page_2/',
//     canonical: '/electronics/',
//     prev: '/electronics/color_red/sort_price-asc/'
// }
```

### Parsing URL

```javascript
const response = await mfilter.parseUrl('/catalog/brand_apple/color_red/');

// response.data = {
//     filters: { brand: ['apple'], color: ['red'] },
//     tech: { sort: null, page: 1 },
//     page: 1
// }
```

## REST API Endpoints

### GET /api/v1/filter/schema

Get filter schema.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `resource_id` | int | Resource/category ID (required) |
| `filters` | object | Current filter state |
| `with_values` | bool | Include values (default: true) |
| `with_counts` | bool | Include counts (default: true) |

**Response:**

```json
{
    "success": true,
    "data": {
        "filters": {
            "brand": {
                "key": "brand",
                "type": "checkbox",
                "label": "Brand",
                "values": [
                    { "value": "apple", "label": "Apple", "count": 25 }
                ]
            },
            "price": {
                "key": "price",
                "type": "range",
                "label": "Price",
                "min": 1000,
                "max": 100000,
                "step": 100
            }
        },
        "sort_options": [
            { "value": "price-asc", "label": "Price: low to high" }
        ],
        "limit_options": [12, 24, 48, 96],
        "resource_id": 5
    }
}
```

### POST /api/v1/filter/apply

Apply filters and get results.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `resource_id` | int | Resource ID (required) |
| `filters` | object | Filter values |
| `sort` | string | Sort order |
| `page` | int | Page number |
| `limit` | int | Items per page |
| `format` | string | Format: json or html |

**Response:**

```json
{
    "success": true,
    "data": {
        "items": [...],
        "total": 150,
        "page": 1,
        "pageCount": 7,
        "limit": 24,
        "suggestions": { ... },
        "seo": {
            "title": "Apple — buy in Moscow",
            "h1": "Apple",
            "description": "..."
        },
        "urls": {
            "current": "/category/brand_apple/",
            "canonical": "/category/",
            "prev": null,
            "next": "/category/brand_apple/page_2/"
        }
    }
}
```

### POST /api/v1/filter/suggestions

Get suggestions only, without products.

### POST /api/v1/filter/build-url

Build SEO URL from parameters.

### POST /api/v1/filter/parse-url

Parse URL into parameters.

### GET /api/v1/filter/values

Get values for a single filter (lazy loading).

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `resource_id` | int | Resource ID |
| `filter_key` | string | Filter key |
| `search` | string | Search query |
| `limit` | int | Max values |

## Hook system

### Registering hooks

```javascript
// Before applying filters
mfilterHooks.add('beforeApply', async (context) => {
    console.log('Params:', context.params);

    // Modify parameters
    context.params.limit = 24;

    // Cancel request
    // context.cancel = true;
    // context.cancelReason = 'Validation failed';
});

// After applying
mfilterHooks.add('afterApply', async (context) => {
    console.log('Result:', context.result);

    // Analytics
    analytics.track('filter_applied', {
        filters: context.params.filters,
        total: context.result.data.total
    });
});

// Error handling
mfilterHooks.add('onError', async (context) => {
    console.error('Error in', context.hookName, context.error);
});
```

### Available hooks

| Hook | Description | context |
|------|-------------|---------|
| `beforeGetSchema` | Before getting schema | `{ resourceId, params, cancel }` |
| `afterGetSchema` | After getting schema | `{ resourceId, params, result }` |
| `beforeApply` | Before applying | `{ params, cancel }` |
| `afterApply` | After applying | `{ params, result }` |
| `beforeGetSuggestions` | Before suggestions | `{ params, cancel }` |
| `afterGetSuggestions` | After suggestions | `{ params, result }` |
| `beforeBuildUrl` | Before building URL | `{ params, cancel }` |
| `afterBuildUrl` | After building URL | `{ params, result }` |
| `onError` | On error | `{ error, hookName, context }` |

### Priorities

```javascript
// High priority (runs earlier)
mfilterHooks.add('beforeApply', handler1, 5);

// Default priority (10)
mfilterHooks.add('beforeApply', handler2);

// Low priority (runs later)
mfilterHooks.add('beforeApply', handler3, 20);
```

### Removing hooks

```javascript
const unsubscribe = mfilterHooks.add('beforeApply', handler);
unsubscribe(); // Unsubscribe

mfilterHooks.remove('beforeApply', handler);
mfilterHooks.clear('beforeApply'); // All hooks for event
mfilterHooks.clear(); // All hooks
```

## Example: Vue 3

```vue
<script setup>
import { ref, onMounted } from 'vue'

const filters = ref({})
const products = ref([])
const total = ref(0)
const loading = ref(false)
const schema = ref(null)

onMounted(async () => {
    // Wait for mfilter ready
    if (!window.mfilter?.initialized) {
        await new Promise(resolve => {
            document.addEventListener('mfilter:ready', resolve, { once: true })
        })
    }

    // Load schema
    const schemaResponse = await mfilter.getSchema()
    if (schemaResponse.success) {
        schema.value = schemaResponse.data.filters
    }

    // Load initial results
    await applyFilters()
})

async function applyFilters() {
    loading.value = true

    const response = await mfilter.apply(filters.value, {
        sort: 'price-asc',
        page: 1,
        limit: 24
    })

    if (response.success) {
        products.value = response.data.items
        total.value = response.data.total
        history.pushState({}, '', response.data.urls.current)
    }

    loading.value = false
}

function toggleFilter(key, value) {
    if (!filters.value[key]) {
        filters.value[key] = []
    }

    const index = filters.value[key].indexOf(value)
    if (index === -1) {
        filters.value[key].push(value)
    } else {
        filters.value[key].splice(index, 1)
    }

    applyFilters()
}
</script>

<template>
    <div class="filter-page">
        <aside v-if="schema">
            <div v-for="(filter, key) in schema" :key="key">
                <h3>{{ filter.label }}</h3>

                <template v-if="filter.type === 'checkbox'">
                    <label v-for="opt in filter.values" :key="opt.value">
                        <input
                            type="checkbox"
                            :checked="filters[key]?.includes(opt.value)"
                            @change="toggleFilter(key, opt.value)"
                        >
                        {{ opt.label }} ({{ opt.count }})
                    </label>
                </template>
            </div>
        </aside>

        <main>
            <div v-if="loading">Loading...</div>
            <div v-else class="products">
                <div v-for="product in products" :key="product.id">
                    {{ product.pagetitle }}
                </div>
            </div>
            <p>Total: {{ total }}</p>
        </main>
    </div>
</template>
```

## Compatibility

- Headless API works in parallel with SSR mode
- One backend serves both modes
- You can use both approaches on different pages
