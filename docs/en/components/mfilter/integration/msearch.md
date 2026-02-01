# mSearch

Integration of mFilter with mSearch — filtering full-text search results.

## How it works

1. mSearch finds resources by search query
2. mFilter filters the found results
3. User refines the output via filters

## Basic setup

### Snippet

```php
{* Search page *}
[[!mFilterForm]]

[[!mFilter?
    &element=`mSearch`
    &paginator=`pdoPage`
    &limit=`20`
    &tpl=`mfilter.row`
]]
```

### Search form

```html
<form action="[[~15]]" method="get">
    <input type="text" name="query" value="{$_GET.query}" placeholder="Search...">
    <button type="submit">Search</button>
</form>
```

## mSearch parameters

```php
[[!mFilter?
    &element=`mSearch`
    &paginator=`pdoPage`

    // mSearch parameters
    &queryVar=`query`
    &minQuery=`3`
    &htagOpen=`<mark>`
    &htagClose=`</mark>`

    // Where to search
    &resources=``
    &parents=`0`
    &includeTVs=`product_brand,product_material`

    // mFilter parameters
    &limit=`20`
    &tpl=`mfilter.row`
]]
```

### mSearch parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `queryVar` | GET variable for the query | `query` |
| `minQuery` | Minimum query length | `3` |
| `htagOpen` | Opening highlight tag | `<b>` |
| `htagClose` | Closing highlight tag | `</b>` |
| `includeTVs` | TVs to search | `` |

## Filter set

Create a filter set for the search page:

```json
{
    "category": {
        "type": "parents",
        "source": "resource",
        "label": "Category"
    },
    "template": {
        "type": "default",
        "source": "field",
        "field": "template",
        "label": "Content type"
    },
    "date": {
        "type": "month",
        "source": "field",
        "field": "publishedon",
        "label": "Publication date"
    }
}
```

## Result template

```html
{* @FILE chunks/search.result.tpl *}
<article class="search-result">
    <h3 class="search-result__title">
        <a href="{$uri}">{$pagetitle}</a>
    </h3>

    {if $introtext}
        <p class="search-result__excerpt">{$introtext}</p>
    {/if}

    <div class="search-result__meta">
        <span class="search-result__date">
            {$publishedon|date:'d.m.Y'}
        </span>
        {if $parent_pagetitle}
            <span class="search-result__category">
                {$parent_pagetitle}
            </span>
        {/if}
    </div>
</article>
```

## Advanced search

### With filters on a single page

```html
<div class="search-page">
    {* Search bar *}
    <form action="" method="get" class="search-form">
        <input type="text" name="query" value="{$_GET.query}">
        <button type="submit">Search</button>
    </form>

    {* Results with filters *}
    <div class="search-content">
        <aside class="search-filters">
            [[!mFilterForm]]
        </aside>

        <main class="search-results">
            <div data-mfilter-results>
                [[!mFilter?
                    &element=`mSearch`
                    &paginator=`pdoPage`
                    &tpl=`mfilter.row`
                ]]
            </div>

            <div data-mfilter-pagination>
                [[!+page.nav]]
            </div>
        </main>
    </div>
</div>
```

### Filters by content type

```json
{
    "content_type": {
        "type": "default",
        "source": "field",
        "field": "template",
        "label": "Type",
        "values": {
            "1": "Articles",
            "2": "News",
            "3": "Products"
        }
    }
}
```

## AJAX search

### JavaScript

```javascript
const searchForm = document.querySelector('.search-form');
const mfilter = window.mFilter.getInstance();

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const query = this.querySelector('input[name="query"]').value;

    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('query', query);
    window.history.pushState({}, '', url);

    // Reload filters with new query
    mfilter.submit();
});
```

### Preserving query when filtering

```html
<form data-mfilter-form>
    {* Hidden field with search query *}
    <input type="hidden" name="query" value="{$_GET.query}">

    {* Filters *}
    {$filters}
</form>
```

## Combination with MS3

### Product search with filters

```php
[[!mFilter?
    &element=`mSearch`
    &paginator=`pdoPage`

    // Limit search to products
    &parents=`5`
    &where=`['class_key' => 'msProduct']`

    // Enable MS3 fields
    &includeTVs=``
    &tpl=`tpl.msProducts.row`
]]
```

### Filters for products in search

```json
{
    "vendor": {
        "type": "vendors",
        "source": "ms3",
        "label": "Vendor"
    },
    "price": {
        "type": "number",
        "source": "resource",
        "field": "Data.price",
        "label": "Price"
    },
    "category": {
        "type": "parents",
        "source": "resource",
        "label": "Category"
    }
}
```

## SEO

### Noindex for search pages

Add to the SEO template:

```json
{
    "conditions": {
        "search": true
    },
    "noindex": true
}
```

### Or in the page template

```html
{if $_GET.query}
    <meta name="robots" content="noindex, follow">
{/if}
```

## Performance

### mSearch indexes

mSearch creates indexes automatically. Ensure they are up to date:

```
Components → mSearch → Reindex
```

### Caching

```php
[[!mFilter?
    &element=`mSearch`
    &cache=`1`
    &cacheTime=`1800`
]]
```

## Debugging

### Checking the search query

```php
{if $_GET.query}
    <p>Search: {$_GET.query|escape}</p>
    <p>Found: {$mfilter.total}</p>
{/if}
```

### Logging

Enable `mfilter.debug` to view:

- Which IDs mSearch returned
- Which IDs remained after filtering
