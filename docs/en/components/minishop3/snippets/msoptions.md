---
title: msOptions
---
# msOptions

Snippet for outputting specific product options. When you know which options you need, use this snippet for best performance.

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **product** | current resource | Product ID |
| **options** | | Comma-separated option list |
| **tpl** | `tpl.msOptions` | Layout chunk |
| **sortOptionValues** | | Sort option values (see below) |

### Deprecated parameters

::: warning Backward compatibility
These parameters are deprecated and will be removed in future versions:

- `&input` → use `&product`
- `&name` → use `&options`
:::

## Examples

### Output color and size for current product

```fenom
{'msOptions' | snippet: [
    'options' => 'color,size'
]}
```

### For specific product

```fenom
{'msOptions' | snippet: [
    'product' => 123,
    'options' => 'color,size,material'
]}
```

### Uncached call

```fenom
{'!msOptions' | snippet: [
    'options' => 'color,size'
]}
```

### Custom chunk

```fenom
{'msOptions' | snippet: [
    'options' => 'color,size',
    'tpl' => 'myOptionsChunk'
]}
```

### With value sorting

```fenom
{'msOptions' | snippet: [
    'options' => 'color,size',
    'sortOptionValues' => 'size:SORT_ASC:SORT_STRING:M'
]}
```

## Option value sorting

The `sortOptionValues` parameter sorts values within each option.

### Format

```
option_name:direction:type:first_value
```

- **direction:** `SORT_ASC` or `SORT_DESC`
- **type:** `SORT_STRING`, `SORT_NUMERIC`, `SORT_NATURAL`
- **first_value:** (optional) value to show first

Example: `size:SORT_ASC:SORT_STRING:M` — sort size values ascending, put M first.
