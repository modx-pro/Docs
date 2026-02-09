# Filter values sorting

Controlling the order in which filter values are displayed.

## Sorting levels

Filter value sorting is configured at two levels:

1. **Filter configuration** (in the filter set) — JSON settings
2. **mFilterForm snippet parameters** — override for output

## Default order

By default values are sorted **by product count (DESC)** — most popular first.

## Settings in filter configuration

In the admin **mFilter → Filter sets** you can set sort parameters for each filter:

```json
{
    "color": {
        "type": "default",
        "source": "option",
        "field": "color",
        "label": "Color",
        "sort": "value",
        "sort_dir": "asc"
    }
}
```

### Sort parameters

| Parameter | Description | Values |
|----------|----------|----------|
| `sort` | Sort field | `count` (default), `value` |
| `sort_dir` | Direction | `desc` (default), `asc` |
| `selected_first` | Selected at top | `true`, `false` |
| `pinned` | Pinned values | Array of values |
| `custom_order` | Full custom order | Array of values |

## Configuration examples

### Alphabetical (A–Z)

```json
{
    "brand": {
        "type": "default",
        "source": "option",
        "label": "Brand",
        "sort": "value",
        "sort_dir": "asc"
    }
}
```

### Alphabetical (Z–A)

```json
{
    "brand": {
        "type": "default",
        "source": "option",
        "label": "Brand",
        "sort": "value",
        "sort_dir": "desc"
    }
}
```

### By product count (high → low)

```json
{
    "color": {
        "type": "default",
        "source": "option",
        "label": "Color",
        "sort": "count",
        "sort_dir": "desc"
    }
}
```

### By product count (low → high)

```json
{
    "color": {
        "type": "default",
        "source": "option",
        "label": "Color",
        "sort": "count",
        "sort_dir": "asc"
    }
}
```

### Selected values at top

Values selected by the user move to the top of the list:

```json
{
    "size": {
        "type": "default",
        "source": "option",
        "label": "Size",
        "sort": "value",
        "sort_dir": "asc",
        "selected_first": true
    }
}
```

### Pinned values

Certain values stay at the top; the rest are sorted normally:

```json
{
    "brand": {
        "type": "default",
        "source": "option",
        "label": "Brand",
        "pinned": ["Apple", "Samsung", "Xiaomi"],
        "sort": "count",
        "sort_dir": "desc"
    }
}
```

Result:

1. Apple
2. Samsung
3. Xiaomi
4. (others by count descending)

### Fully custom order

Explicit order for all values:

```json
{
    "size": {
        "type": "default",
        "source": "option",
        "label": "Size",
        "custom_order": ["XS", "S", "M", "L", "XL", "XXL"]
    }
}
```

Values not listed in `custom_order` are appended at the end.

## mFilterForm snippet parameters

### sortByCount

Overrides sorting — values with more products go to the top:

```fenom
{'!mFilterForm' | snippet: [
    'resourceId' => $_modx->resource.id,
    'sortByCount' => 1
]}
```

::: warning Priority
The `sortByCount` snippet parameter is applied **after** the filter configuration sort and overrides it.
:::

### hideZero

Hides values with zero product count:

```fenom
{'!mFilterForm' | snippet: [
    'resourceId' => $_modx->resource.id,
    'hideZero' => 1
]}
```

Default `hideZero` = `true`.

## Combining settings

### Brands: popular + alphabetical

```json
{
    "brand": {
        "type": "default",
        "source": "option",
        "label": "Brand",
        "pinned": ["Apple", "Samsung"],
        "sort": "value",
        "sort_dir": "asc"
    }
}
```

Result:

1. Apple (pinned)
2. Samsung (pinned)
3. ASUS (alphabetical)
4. Dell (alphabetical)
5. HP (alphabetical)
6. ...

### Sizes: custom order + selected at top

```json
{
    "size": {
        "type": "default",
        "source": "option",
        "label": "Size",
        "custom_order": ["XS", "S", "M", "L", "XL", "XXL"],
        "selected_first": true
    }
}
```

## Application order

Sorting is applied in this order:

1. **custom_order** — if set, defines the full order
2. **sort + sort_dir** — standard sort (when no custom_order)
3. **selected_first** — selected values move to top
4. **pinned** — pinned values move to the start
5. **sortByCount** (snippet) — final re-sort by count

## Natural sort

For the `value` field **natural sort** (`strnatcasecmp`) is used, so numbers in strings sort correctly:

- Regular: `1, 10, 2, 20, 3`
- Natural: `1, 2, 3, 10, 20`

This matters for sizes (e.g. S, M, L, XL) and numeric values in strings.

## Examples for different filter types

### Colors — by popularity

```json
{
    "color": {
        "type": "colors",
        "source": "option",
        "label": "Color",
        "sort": "count",
        "sort_dir": "desc"
    }
}
```

### Vendors — alphabetical with top 3 pinned

```json
{
    "vendor": {
        "type": "vendors",
        "source": "ms3",
        "label": "Vendor",
        "pinned": ["Apple", "Samsung", "Sony"],
        "sort": "value",
        "sort_dir": "asc"
    }
}
```

### Years — newest to oldest

```json
{
    "year": {
        "type": "year",
        "source": "field",
        "field": "publishedon",
        "label": "Year",
        "sort": "value",
        "sort_dir": "desc"
    }
}
```

### Clothing sizes — custom order

```json
{
    "size": {
        "type": "default",
        "source": "option",
        "field": "size",
        "label": "Size",
        "custom_order": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"]
    }
}
```
