---
title: msProductOptions
---
# msProductOptions

Outputs all product options together with their metadata — caption, group, field type. If the option keys are known in advance, take [msOptions](msoptions): it returns the metadata as flat keys like `material.caption`.

::: warning The option must be created and enabled for the category
Only options enabled for the category the product belongs to reach the output. A clean installation has no options at all — the component does not add them, so the first call on a new site returns nothing.

Product field names are taken: `color`, `size`, `weight`, `article`, `price`, `vendor`, `description`, `source`, `action` and the rest from the `reserved` rule of the `msOption` model. An option with such a key is silently shadowed by the product field.
:::

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| **product** | current resource | Product ID |
| **tpl** | `tpl.msProductOptions` | Layout chunk |
| **onlyOptions** | | Output only the specified options (comma-separated) |
| **ignoreOptions** | | Ignore the specified options |
| **groups** | | Only options from groups (`group_name` from msOptionGroup, comma-separated) |
| **ignoreGroups** | | Exclude groups (`group_name`) |
| **sortOptions** | | Option sort order (comma-separated) |
| **sortGroups** | | Group sort order (comma-separated) |
| **sortOptionValues** | | Sort values within options (see [msOptions](msoptions#sorting-option-values)) |
| **return** | `tpl` | Output format: `tpl`, `data`, `array`. Not declared in the snippet properties ([#805](https://github.com/modx-pro/MiniShop3/issues/805)) |

::: tip Auto sort
If `onlyOptions` is set but `sortOptions` is not, options are automatically sorted in the order given in `onlyOptions`.
:::

An option with no stored values does not reach the output. But an option holding a saved empty string passes the filter and renders empty — the check looks at the array of values, not at their contents.

::: warning Filters are case-sensitive, sorting is not
`groups`, `ignoreGroups`, `onlyOptions` and `ignoreOptions` compare strings as they are: `Main` and `main` are different groups to them, and a wrong case silently leaves the output empty.

Meanwhile `sortGroups` and `sortOptions` lowercase their values, so they work with any spelling. Because of this difference the same group name can behave differently in two parameters.
:::

::: tip A stray comma switches `onlyOptions` off
A value like `,material,length` — with a leading comma — silently drops the filtering, and every option of the product is printed ([#842](https://github.com/modx-pro/MiniShop3/issues/842)). Check the list if you see the whole set instead of the chosen options.
:::

### Deprecated parameters

| Parameter | Replacement |
| --- | --- |
| `&input` | `&product` |

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
    'onlyOptions' => 'material,length,season'
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
    'sortOptions' => 'material,length,season'
]}
```

::: warning The two sorting parameters do not combine into a hierarchy
`sortGroups` runs first, then `sortOptions` re-sorts the **whole** list again. Options listed in `sortOptions` move to the front regardless of their group, and the group order falls apart.

Use one or the other: either the order of groups, or the order of options.
:::

### Return data for processing

```fenom
{set $options = 'msProductOptions' | snippet: [
    'return' => 'data'
]}

{foreach $options as $key => $option}
    <div class="option">
        <strong>{$option.caption}:</strong>
        {$option.value | join: ', '}
    </div>
{/foreach}
```

## Data structure

With `return=data` or `return=array`, an associative array is returned where the key is the option name:

```php
[
    'material' => [
        'caption' => 'Material',
        'value' => ['cotton', 'linen'],
        'group_name' => 'Main specs',
        'type' => 'comboOptions',
        'properties' => '{"source":"manual"}',
    ],
    'length' => [
        'caption' => 'Length',
        'value' => ['120 cm'],
        'group_name' => 'Main specs',
        'type' => 'textfield',
    ],
    'season' => [
        'caption' => 'Season',
        'value' => ['winter'],
        'group_name' => 'Specs',
        'type' => 'combobox',
    ],
]
```

::: warning `value` is always an array, even for a single value
Option values are collected into an array for every field type — there is no scalar path in the code. So the `{else}` branch of `{if $option.value is iterable}` never runs, and `{$option.value}` without a loop prints `Array`.
:::

::: info Option key
Walk the array with `{foreach $options as $key => $option}` — `$key` holds the option name. It is also duplicated by the `{$option.key}` field, so both ways work inside the loop.
:::

## Placeholders in chunk

| Placeholder | Description |
| --- | --- |
| `{$options}` | Associative array of product options |

### Fields per option

| Field | Description |
| --- | --- |
| `{$option.caption}` | Option label (human-readable) |
| `{$option.value}` | Option values — always an array |
| `{$option.group_name}` | Group name |
| `{$option.type}` | Field type: `textfield`, `numberfield`, `textarea`, `checkbox`, `combobox`, `comboBoolean`, `comboColors`, `comboMultiple`, `comboOptions`, `datefield` |
| `{$option.measure_unit}` | Unit of measurement |
| `{$option.description}` | Option description |
| `{$option.properties}` | Additional properties — a JSON string, not an array |
| `{$option.key}` | Option name, the same as the array key |
| `{$option.option_group_id}` | Option group ID |
| `{$option.id}` | ID of the option itself |

::: tip The caption and description can be overridden per category
`caption` and `description` come from the option, but if the category defines its own, those are what reach the output. The same option can therefore read differently in different parts of the catalogue.
:::

Use foreach to get the option key:

```fenom
{foreach $options as $key => $option}
    {* $key = 'material', 'length', etc. *}
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
            {$option.value | join: ', '}
        </div>
    </div>
{/foreach}
```

## Your own chunks

### Grouping by group

```fenom
{* tpl.myProductOptions.grouped *}
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
                            {$option.value | join: ', '}
                        </td>
                    </tr>
                {/foreach}
            </table>
        </div>
    {/foreach}
{/if}
```

## Selecting options when adding to cart

When options are selectable (for example, material and length):

```fenom
<form method="post" class="ms3_form" data-ms3-form>
    <input type="hidden" name="id" value="{$_modx->resource.id}">
    <input type="hidden" name="count" value="1">
    <input type="hidden" name="ms3_action" value="cart/add">

    {set $options = 'msProductOptions' | snippet : [
        'return' => 'data',
        'onlyOptions' => 'material,length'
    ]}

    {foreach $options as $key => $option}
        <div class="form-group">
            <label>{$option.caption}</label>
            <select name="options[{$key}]" required>
                <option value="">Select {$option.caption | lower}</option>
                {foreach $option.value as $val}
                    <option value="{$val}">{$val}</option>
                {/foreach}
            </select>
        </div>
    {/foreach}

    <button type="submit">Add to cart</button>
</form>
```
