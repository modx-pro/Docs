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

| Part | Description | Values |
|------|-------------|--------|
| option_name | Option key to sort | `color`, `size`, etc. |
| direction | Sort direction | `SORT_ASC`, `SORT_DESC` |
| type | Sort type | `SORT_STRING`, `SORT_NUMERIC`, `SORT_NATURAL` |
| first_value | (optional) Value to put first | Any value from the list |

### Sorting examples

```fenom
{* Sizes alphabetically *}
'sortOptionValues' => 'size:SORT_ASC:SORT_STRING'

{* Sizes alphabetically, M first *}
'sortOptionValues' => 'size:SORT_ASC:SORT_STRING:M'

{* Multiple options *}
'sortOptionValues' => 'size:SORT_ASC:SORT_STRING, color:SORT_DESC:SORT_STRING'
```

## Placeholders in chunk

| Placeholder | Description |
|-------------|-------------|
| `{$id}` | Product ID |
| `{$options}` | Array of options and their values |

## Data structure

Returns an array of option values **without metadata**:

```php
[
    'color' => ['Red', 'Blue'],
    'size' => ['S', 'M', 'L']
]
```

## Default chunk

The default chunk `tpl.msOptions` outputs options as select elements:

```fenom
{* tpl.msOptions *}
{foreach $options as $name => $values}
    <div class="form-group row align-items-center mb-4">
        <label class="col-6 col-md-3 text-right text-md-left col-form-label"
               for="option_{$name}">
            {('ms3_product_' ~ $name) | lexicon}:
        </label>
        <div class="col-6 col-md-9">
            <select name="options[{$name}]" class="form-select col-md-6" id="option_{$name}">
                {foreach $values as $value}
                    <option value="{$value}">{$value}</option>
                {/foreach}
            </select>
        </div>
    </div>
{/foreach}
```

## Alternative chunk

Simple list output example:

```fenom
{* tpl.myOptions *}
{if $options?}
    <div class="product-options">
        {foreach $options as $key => $values}
            <div class="option">
                <strong>{$key}:</strong>
                {if $values is iterable}
                    {$values | join: ', '}
                {else}
                    {$values}
                {/if}
            </div>
        {/foreach}
    </div>
{/if}
```

## When to use

| Use msOptions | Use msProductOptions instead |
|---------------|------------------------------|
| Only specific options needed | Need ALL product options |
| No metadata needed | Filter by groups |
| Best performance | Need option labels, categories |

## Comparison with msProductOptions

| Criteria | msOptions | msProductOptions |
|----------|-----------|------------------|
| **Speed** | Faster | Slower |
| **Filtering** | Option list only | Groups, options, sort |
| **Metadata** | None | Full (category, type) |
| **Flexibility** | Simple | Advanced |
| **Use case** | Fixed list | Dynamic list |

For option metadata (categories, types, labels) use [msProductOptions](msproductoptions).
