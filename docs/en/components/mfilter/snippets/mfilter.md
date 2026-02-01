# mFilter

Main snippet for outputting filtered results.

## Parameters

### Element/Paginator mode

| Parameter | Default | Description |
|----------|--------------|----------|
| `element` | — | Snippet for data (msProducts, pdoResources, getTickets) |
| `paginator` | `pdoPage` | Pagination snippet |
| `lexicons` | — | Extra lexicons to load (comma-separated) |

### Data selection

| Parameter | Default | Description |
|----------|--------------|----------|
| `parents` | current resource | Parent resource IDs (comma-separated) |
| `depth` | `10` | Depth for child categories |
| `limit` | `20` | Items per page |
| `offset` | `0` | Starting offset |
| `sortby` | `pagetitle` | Sort field |
| `sortdir` | `ASC` | Sort direction (ASC, DESC) |
| `where` | — | Extra conditions (JSON) |
| `select` | — | Fields to select (JSON) |

### Templates

| Parameter | Default | Description |
|----------|--------------|----------|
| `tpl` | `mfilter.row` | Single result row template |
| `tplOuter` | `mfilter.outer` | Outer wrapper template |
| `tplEmpty` | — | Template for empty results |
| `tplPagination` | `mfilter.pagination` | Pagination template |
| `tpls` | — | JSON with alternate templates for view switching |

### TV and fields

| Parameter | Default | Description |
|----------|--------------|----------|
| `includeTVs` | `false` | Include TVs in results |
| `processTVs` | — | TV names to process (comma-separated) |

### Display

| Parameter | Default | Description |
|----------|--------------|----------|
| `showHidden` | `false` | Show hidden resources |
| `showUnpublished` | `false` | Show unpublished |
| `showDeleted` | `false` | Show deleted |

### AJAX

| Parameter | Default | Description |
|----------|--------------|----------|
| `ajax` | `false` | Return JSON for AJAX requests |
| `ajaxMode` | `full` | AJAX mode: results, suggestions, full |

### Pagination

| Parameter | Default | Description |
|----------|--------------|----------|
| `pageParam` | `page` | GET parameter name for page |
| `totalVar` | `mfilter.total` | Placeholder for total count |
| `pageCountVar` | `mfilter.pageCount` | Placeholder for page count |

### Output

| Parameter | Default | Description |
|----------|--------------|----------|
| `toPlaceholders` | `false` | Output results to placeholders |
| `outputSeparator` | `\n` | Separator between rows |

## Examples

### Basic call with MiniShop3

```fenom
{'!mFilter' | snippet: [
    'element' => 'msProducts',
    'paginator' => 'pdoPage',
    'parents' => $_modx->resource.id,
    'limit' => 24,
    'tpl' => 'mfilter.row'
]}
```

### With pdoResources (without MS3)

```fenom
{'!mFilter' | snippet: [
    'element' => 'pdoResources',
    'paginator' => 'pdoPage',
    'parents' => $_modx->resource.id,
    'includeTVs' => 'image,price',
    'limit' => 20,
    'tpl' => 'catalog.row'
]}
```

### View toggle (grid/list)

```fenom
{* Toggle buttons *}
<div class="view-toggle">
    <a href="?tpl=grid" data-mfilter-tpl="grid">Grid</a>
    <a href="?tpl=list" data-mfilter-tpl="list">List</a>
</div>

{'!mFilter' | snippet: [
    'element' => 'msProducts',
    'paginator' => 'pdoPage',
    'parents' => $_modx->resource.id,
    'tpl' => 'mfilter.grid',
    'tpls' => ['grid' => 'mfilter.grid', 'list' => 'mfilter.row']
]}
```

### Sort from URL

Sort is taken from SEO URL or GET parameter `sort`:

```
/catalog/sort_price-asc/     → sort by price (ascending)
/catalog/?sort=price-desc   → sort by price (descending)
```

```fenom
{* Sort dropdown *}
<select data-mfilter-sort>
    <option value="pagetitle-asc">By name</option>
    <option value="price-asc">Price: low to high</option>
    <option value="price-desc">Price: high to low</option>
    <option value="createdon-desc">Newest</option>
</select>

{'!mFilter' | snippet: [
    'element' => 'msProducts',
    'sortby' => 'pagetitle',
    'sortdir' => 'ASC'
]}
```

### Limit from URL

```
/catalog/limit_48/           → 48 products per page
/catalog/?limit=96           → 96 products per page
```

```fenom
<select data-mfilter-limit>
    <option value="24">24</option>
    <option value="48">48</option>
    <option value="96">96</option>
</select>

{'!mFilter' | snippet: [
    'element' => 'msProducts',
    'limit' => 24
]}
```

### Extra conditions

```fenom
{'!mFilter' | snippet: [
    'element' => 'msProducts',
    'parents' => $_modx->resource.id,
    'where' => ['Data.price:>' => 0, 'Data.favorite' => 1]
]}
```

### Empty results

```fenom
{'!mFilter' | snippet: [
    'element' => 'msProducts',
    'tplEmpty' => '@INLINE <p>No products found. Try changing the filter.</p>'
]}
```

### Legacy mode (no element)

```fenom
{'!mFilter' | snippet: [
    'parents' => $_modx->resource.id,
    'class' => 'msProduct',
    'sortby' => 'pagetitle',
    'limit' => 20,
    'tpl' => 'msProducts.row',
    'includeTVs' => 'image'
]}
```

## Placeholders

After the snippet runs, these placeholders are available:

| Placeholder | Description |
|-------------|----------|
| `[[+mfilter.total]]` | Total result count |
| `[[+mfilter.pageCount]]` | Page count |
| `[[+mfilter.page]]` | Current page |
| `[[+mfilter.limit]]` | Items per page |
| `[[+mfilter.sort]]` | Current sort (`price-asc`) |
| `[[+mfilter.sortBy]]` | Sort field (`price`) |
| `[[+mfilter.sortDir]]` | Direction (`asc`) |

For pdoPage pagination:

| Placeholder | Description |
|-------------|----------|
| `[[+page.nav]]` | Pagination HTML |
| `[[+page.total]]` | Total items |
| `[[+page.pages]]` | Total pages |

## mSearch integration

```fenom
{'!mFilter' | snippet: [
    'element' => 'msProducts',
    'paginator' => 'pdoPage',
    'parents' => $_modx->resource.id,
    'search' => $_GET['mse_query']
]}
```

See: [mSearch integration](/en/components/mfilter/integration/msearch)
