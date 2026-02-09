---
title: msProductOptions
---
# msProductOptions

Snippet for outputting all or filtered product options with full metadata (categories, types).

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **product** | current resource | Product ID |
| **tpl** | `tpl.msProductOptions` | Layout chunk |
| **onlyOptions** | | Comma-separated options to show only |
| **ignoreOptions** | | Comma-separated options to ignore |
| **groups** | | Show only options from these groups |
| **ignoreGroups** | | Ignore these groups |
| **sortOptions** | | Comma-separated option sort order |
| **sortGroups** | | Comma-separated group sort order |
| **sortOptionValues** | | Sort values within options (see [msOptions](msoptions#option-value-sorting)) |
| **return** | `tpl` | Format: `tpl`, `data`, `array` |

::: tip Auto sort
If `onlyOptions` is set but not `sortOptions`, options are sorted in the order given in `onlyOptions`.
:::

### Deprecated parameters

::: warning Backward compatibility
Parameter `&input` is deprecated. Use `&product`.
:::

## Examples

### All product options

```fenom
{'msProductOptions' | snippet}
```

### For specific product

```fenom
{'msProductOptions' | snippet: [
    'product' => 15
]}
```

### Only certain options

```fenom
{'msProductOptions' | snippet: [
    'onlyOptions' => 'color,size,material,weight'
]}
```

### Exclude options

```fenom
{'msProductOptions' | snippet: [
    'ignoreOptions' => 'internal_code,supplier_id'
]}
```

### Only from certain groups

```fenom
{'msProductOptions' | snippet: [
    'groups' => 'Main,Dimensions'
]}
```

### With group and option sorting

```fenom
{'msProductOptions' | snippet: [
    'sortGroups' => 'Main,Dimensions,Extra',
    'sortOptions' => 'weight,dimensions,material,color'
]}
```
