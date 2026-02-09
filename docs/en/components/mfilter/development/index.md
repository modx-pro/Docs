# Development

Documentation for extending and customizing mFilter.

## Sections

| Section | Description |
|--------|----------|
| [JavaScript](javascript) | Frontend architecture, script loading |
| [JS API](js-api) | Programmatic filter control |
| [Headless API](headless) | REST API for SPA apps |
| [Services](services) | PHP services and Dependency Injection |
| [Filter types](filter-types) | Custom filter types |
| [Events](events) | Plugin and system events |
| [Models and DB](models) | Database tables |

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend                            │
├─────────────────┬───────────────────────────────────────┤
│   SSR mode      │           Headless mode               │
│  (FilterUI)     │    (ApiClient + FilterAPI)            │
├─────────────────┴───────────────────────────────────────┤
│                    Hooks System                          │
│            beforeApply → apply → afterApply             │
├─────────────────────────────────────────────────────────┤
│                    REST API Router                       │
├─────────────────────────────────────────────────────────┤
│                     Controllers                          │
│              FilterController, SlugController           │
├─────────────────────────────────────────────────────────┤
│                       Services                           │
│   Filter │ FilterSet │ SlugManager │ UrlRouter │ SEO   │
├─────────────────────────────────────────────────────────┤
│                      Handlers                            │
│        FilterTypes │ Sources │ FilterHandler            │
├─────────────────────────────────────────────────────────┤
│                       Models                             │
│   FilterSet │ Slug │ Pattern │ WordForm │ SeoTemplate   │
└─────────────────────────────────────────────────────────┘
```

## Extension points

### 1. Frontend (JavaScript)

- **Hooks** — intercept filter operations
- **Events** — subscribe to UI events
- **Custom sliders** — via MFilterSlider API

### 2. Backend (PHP)

- **Filter types** — custom filter logic
- **Data sources** — custom tables
- **MODX events** — OnMFilterInit, OnHandleRequest
- **DI service override** — via config

### 3. Templates

- **Chunks** — custom filter templates
- **Fenom** — full access to filter data

## Quick examples

### Programmatic filter control

```javascript
const filter = mfilterGet('mfilter-form');
filter.setFilter('brand', ['apple', 'samsung']);
filter.submit();
```

### Hook on filter apply

```javascript
mfilterHooks.add('beforeApply', (ctx) => {
    console.log('Filters:', ctx.params.filters);
    // You can modify ctx.params
});
```

### Register custom filter type

```php
// In plugin on OnMFilterInit
$mfilter->getFilterTypeRegistry()->register('mytype', new MyFilterType($modx));
```

### Override service via DI

```php
// core/components/mfilter/config/services.php
return [
    'slugManager' => MyCustomSlugManager::class,
];
```
