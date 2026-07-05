---
title: msProductOptions
---
# msProductOptions

Extended snippet for outputting all or filtered product options with full information for each (metadata, categories, types).

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **product** | current resource | Product ID |
| **tpl** | `tpl.msProductOptions` | Layout chunk |
| **onlyOptions** | | Output only the specified options (comma-separated) |
| **ignoreOptions** | | Ignore the specified options |
| **groups** | | Output only options from the specified groups |
| **ignoreGroups** | | Ignore the specified groups |
| **sortOptions** | | Option sort order (comma-separated) |
| **sortGroups** | | Group sort order (comma-separated) |
| **sortOptionValues** | | Sort values within options (see [msOptions](msoptions#sorting-option-values)) |
| **return** | `tpl` | Output format: `tpl`, `data`, `array` |

::: tip Auto sort
If `onlyOptions` is set but `sortOptions` is not, options are automatically sorted in the order given in `onlyOptions`.
:::

### Deprecated parameters

::: warning Backward compatibility
The `&input` parameter is deprecated. Use `&product`.
:::

## Examples

### All product options

```fenom
{'msProductOptions' | snippet}
```

### For a specific product

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
    'sortGroups' => 'Main,Dimensions,Additional',
    'sortOptions' => 'weight,dimensions,material,color'
]}
```

### Return data for processing

```fenom
{set $options = 'msProductOptions' | snippet: [
    'return' => 'data'
]}

{foreach $options as $key => $option}
    <div class="option">
        <strong>{$option.caption}:</strong>
        {if $option.value is array}
            {$option.value | join: ', '}
        {else}
            {$option.value}
        {/if}
    </div>
{/foreach}
```

## Data structure

With `return=data` or `return=array`, an associative array is returned where the key is the option name:

```php
[
    'color' => [
        'caption' => 'Color',
        'value' => ['Red', 'Blue'],
        'category' => 'main',
        'group_name' => 'Main specs',
        'type' => 'combo-options',
        'properties' => [...]
    ],
    'size' => [
        'caption' => 'Size',
        'value' => 'M',
        'category' => 'main',
        'group_name' => 'Main specs'
    ],
    'weight' => [
        'caption' => 'Weight',
        'value' => '250 g',
        'category' => 'specs',
        'group_name' => 'Specs'
    ]
]
```

::: info Option key
The option name (`color`, `size`, `weight`) is the array key, not a field inside the option. To access it, use `{foreach $options as $key => $option}`.
:::

## Placeholders in chunk

| Placeholder | Description |
|-------------|-------------|
| `{$options}` | Associative array of product options |

### Fields per option

| Field | Description |
|-------|-------------|
| `{$option.caption}` | Option label (human-readable) |
| `{$option.value}` | Value (string or array) |
| `{$option.category}` | Option group key |
| `{$option.group_name}` | Group name |
| `{$option.type}` | Field type (textfield, combo-options, etc.) |
| `{$option.properties}` | Additional option properties |

Use foreach to get the option key:

```fenom
{foreach $options as $key => $option}
    {* $key = 'color', 'size', etc. *}
    <div data-option="{$key}">{$option.caption}: {$option.value}</div>
{/foreach}
```

## Default chunk

The default chunk `tpl.msProductOptions` outputs options as rows:

```fenom
{* tpl.msProductOptions *}
{foreach $options as $option}
    <div class="form-group row align-items-center">
        <label class="col-6 col-md-3 text-right text-md-left col-form-label">
            {$option.caption}:
        </label>
        <div class="col-6 col-md-9">
            {if $option.value is array}
                {$option.value | join: ', '}
            {else}
                {$option.value}
            {/if}
        </div>
    </div>
{/foreach}
```

## Alternative chunk — table

```fenom
{* tpl.msProductOptions.table *}
{if $options?}
    <table class="product-options">
        <tbody>
            {foreach $options as $option}
                <tr>
                    <th>{$option.caption}</th>
                    <td>
                        {if $option.value is array}
                            {$option.value | join: ', '}
                        {else}
                            {$option.value}
                        {/if}
                    </td>
                </tr>
            {/foreach}
        </tbody>
    </table>
{/if}
```

## Grouping by category

```fenom
{* tpl.msProductOptions.grouped *}
{if $options?}
    {set $grouped = []}

    {* Group options by category *}
    {foreach $options as $option}
        {set $cat = $option.group_name ?: 'Main'}
        {set $grouped[$cat][] = $option}
    {/foreach}

    {* Output grouped options *}
    {foreach $grouped as $groupName => $groupOptions}
        <div class="options-group">
            <h4>{$groupName}</h4>
            <table>
                {foreach $groupOptions as $option}
                    <tr>
                        <th>{$option.caption}</th>
                        <td>
                            {if $option.value is array}
                                {$option.value | join: ', '}
                            {else}
                                {$option.value}
                            {/if}
                        </td>
                    </tr>
                {/foreach}
            </table>
        </div>
    {/foreach}
{/if}
```

## Selecting options when adding to cart

When options are selectable (for example, color and size):

```fenom
<form class="product-form">
    {set $options = 'msProductOptions' | snippet: [
        'return' => 'data',
        'onlyOptions' => 'color,size'
    ]}

    {foreach $options as $key => $option}
        <div class="form-group">
            <label>{$option.caption}</label>
            <select name="options[{$key}]" required>
                <option value="">Select {$option.caption | lower}</option>
                {if $option.value is array}
                    {foreach $option.value as $val}
                        <option value="{$val}">{$val}</option>
                    {/foreach}
                {/if}
            </select>
        </div>
    {/foreach}

    <button type="button"
            data-ms-action="cart/add"
            data-id="{$_modx->resource.id}">
        Add to cart
    </button>
</form>
```

## When to use

| Suitable | Not suitable |
|----------|--------------|
| You need ALL product options | Only 2–3 specific options needed |
| Metadata is required | Maximum speed matters |
| Filtering by groups | Simple fixed list |
| Flexible sorting is required | |
| Options are built dynamically | |

For simple output of specific options without metadata, use [msOptions](msoptions).
