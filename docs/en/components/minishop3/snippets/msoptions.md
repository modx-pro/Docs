---
title: msOptions
---
# msOptions

Outputs the named product options by their keys. If the keys are not known in advance, all options are needed, or a selection by group — [msProductOptions](msproductoptions).

::: warning The option must exist and be enabled for the category
An option reaches `$options` under two conditions: it is created in the admin and enabled for the category the product belongs to. A key that does not exist is not created by the snippet — it is silently skipped.

A clean installation has no options at all; the component does not add them. So the first call on a new site returns nothing, and that is not a misconfiguration.
:::

::: danger The names `color` and `size` cannot be used for options
These are columns of the product table, and `msProduct::get()` checks them **before** options. An option with such a key is silently shadowed: the output carries the product field value, not the option value.

The full list of taken names is in the `reserved` rule of the `msOption` model: it covers every MODX resource field plus `article`, `price`, `old_price`, `weight`, `image`, `thumb`, `vendor`, `made_in`, `new`, `popular`, `favorite`, `tags`, `color`, `size`, `source`, `action`.
:::

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| **product** | current resource | Product ID |
| **options** | | Comma-separated list of options |
| **tpl** | `tpl.msOptions` | Layout chunk |
| **sortOptionValues** | | [Sorting of option values](#sorting-option-values) |

Options whose first value is empty do not reach `$options` in the chunk.

### Deprecated parameters

| Parameter | Replacement |
| --- | --- |
| `&input` | `&product` |
| `&name` | `&options` |

Both still work, but will be removed in future versions.

## Examples

### Options of the current product

:::code-group

```modx
[[msOptions? &options=`material,length`]]
```

```fenom
{'msOptions' | snippet : [
    'options' => 'material,length'
]}
```

:::

### For a specific product

:::code-group

```modx
[[msOptions? &product=`123` &options=`material,length`]]
```

```fenom
{'msOptions' | snippet : [
    'product' => 123,
    'options' => 'material,length'
]}
```

:::

### Uncached call

:::code-group

```modx
[[!msOptions? &options=`material,length`]]
```

```fenom
{'!msOptions' | snippet : [
    'options' => 'material,length'
]}
```

:::

::: warning The prefix works differently in the two syntaxes
`[[!msOptions]]` stays in the page cache as a tag and runs on every request — that is a real uncached call.

In Fenom `{'!msOptions' | snippet}` execution is not deferred: the snippet runs where it stands, and the finished result is what goes into the page cache. On the next request the template is not executed, so neither is the snippet.

If the options output has to be recalculated on every request, it is safer to untick «Cacheable» on the resource — that works with either call syntax.
:::

### With your own chunk

:::code-group

```modx
[[msOptions? &options=`material,length` &tpl=`myOptionsChunk`]]
```

```fenom
{'msOptions' | snippet : [
    'options' => 'material,length',
    'tpl' => 'myOptionsChunk'
]}
```

:::

### With value sorting

:::code-group

```modx
[[msOptions? &options=`material,length` &sortOptionValues=`length:SORT_ASC:SORT_NATURAL`]]
```

```fenom
{'msOptions' | snippet : [
    'options' => 'material,length',
    'sortOptionValues' => 'length:SORT_ASC:SORT_NATURAL'
]}
```

:::

## Sorting option values

`sortOptionValues` sorts the values inside each option. Format:

```text
option_name:direction:type:first_value
```

| Part | Description | Possible values |
| --- | --- | --- |
| option_name | Option key to sort | the key of any existing option |
| direction | Sort direction | `SORT_ASC`, `SORT_DESC` |
| type | Sort type | `SORT_STRING`, `SORT_NUMERIC`, `SORT_NATURAL` |
| first_value | Value to put first (not required) | any value from the list |

### Sorting examples

```fenom
{* Alphabetically *}
'sortOptionValues' => 'material:SORT_ASC:SORT_STRING'

{* Alphabetically, but «cotton» first *}
'sortOptionValues' => 'material:SORT_ASC:SORT_STRING:cotton'

{* Several options *}
'sortOptionValues' => 'length:SORT_ASC:SORT_NATURAL, material:SORT_DESC:SORT_STRING'
```

## Placeholders in the chunk

| Placeholder | Description |
| --- | --- |
| `{$id}` | Product ID |
| `{$options}` | Array of options with their values |

## Data structure

Under the option key sits the array of its values, and next to it the metadata with a dot in the name:

```php
[
    'material'              => ['cotton', 'linen'],
    'material.caption'      => 'Material',
    'material.description'  => 'Fabric composition',
    'material.type'         => 'select',
    'material.measure_unit' => '',
    'material.group_name'   => 'Specifications',
]
```

The metadata is available both in the chunk and directly on the product: `{$product['material.caption']}`. It can also be requested explicitly by listing it in `options` alongside the option key: `material,material.caption`.

## Default chunk

The default `tpl.msOptions` chunk renders options as select elements:

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

```fenom
{* tpl.myOptions *}
{if $options?}
    {foreach $options as $key => $values}
        <strong>{$key}:</strong>
        {* option values arrive as an array, metadata as separate keys *}
        {if $values is iterable}
            {$values | join : ', '}
        {else}
            {$values}
        {/if}
    {/foreach}
{/if}
```
