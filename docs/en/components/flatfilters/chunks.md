# Chunks

## tpl.ffForm

### Description

Contains the filter form.

### Placeholders

* `$configId` — Filter configuration ID.
* `$filters` — List of filters.
* `$.get` — $_GET array.

### Attributes

* `data-ff-form` — Marks the form as the filter form.
* `data-si-preset` — Preset name from system setting **ff_preset_names** (key **filtering**).
* `data-ff-filter` — Marks a field that triggers filtering on change.

### Example markup

```fenom:line-numbers
<form id="filterForm" class="row py-5" action="#" data-ff-form="filterForm" data-si-preset="flatfilters">
    <input type="hidden" name="configId" value="{$configId}">
    {$filters}
    <div class="col-md-3 mb-3">
        <select class="form-select" data-ff-filter="sortby" name="sortby">
            <option value="">Sort</option>
            <option value="Data.price|ASC" {$.get['sortby'] == 'Data.price|ASC' ? 'selected' : ''}>Price: low to high</option>
            <option value="Data.price|DESC" {$.get['sortby'] == 'Data.price|DESC' ? 'selected' : ''}>Price: high to low</option>
        </select>
    </div>
</form>
```

## tpl.ffCheckbox

### Description

Single checkbox chunk.

### Placeholders

* `$key` — Filter key.
* `$.get` — $_GET array.

### Attributes

* `data-ff-filter` — Marks a field that triggers filtering on change.

### Example markup

```fenom:line-numbers
<div class="col-md-3 mb-3">
    <div class="form-check col-auto">
        <input class="form-check-input" type="checkbox" data-ff-filter="{$key}" name="{$key}" value="1" id="{$key}" {$.get[$key] ? 'checked' : ''}>
        <label class="form-check-label" for="{$key}">
            {('ff_frontend_'~$key) | lexicon}
        </label>
    </div>
</div>
```

## tpl.ffCheckboxGroupOuter

### Description

Wrapper chunk for a group of checkboxes.

### Placeholders

* `$options` — List of checkboxes.

### Attributes

None.

### Example markup

```fenom:line-numbers
<div class="col-md-3 mb-3">
    <div class="row">
        {$options}
    </div>
</div>
```

## tpl.ffCheckboxGroup

### Description

Single checkbox in a group.

### Placeholders

* `$key` — Filter key.
* `$.get` — $_GET array.
* `$idx` — Iteration index (from 0).

### Attributes

* `data-ff-filter` — Marks a field that triggers filtering on change.

### Example markup

```fenom:line-numbers
{if $value != '0'}
    {set $values = $.get[$key] | split: ','}
    <div class="form-check col-auto">
        <input class="form-check-input" type="checkbox" data-ff-filter="{$key}" name="{$key}[]" value="{$value}" id="{$key}-{$idx}" {($value in list $values) ? 'checked' : ''}>
        <label class="form-check-label" for="{$key}-{$idx}">
            {$value}
        </label>
    </div>
{/if}
```

## tpl.ffDateRange

:::tip
The [Air DatePicker](https://air-datepicker.com/ru) JavaScript plugin is used for the date range.
:::

### Description

Date range selection chunk.

### Placeholders

* `$key` — Filter key.
* `$.get` — $_GET array.
* `$min` — Minimum date.
* `$max` — Maximum date.

### Attributes

* `data-ff-filter` — Marks a field that triggers filtering on change.
* `data-ff-datepicker` — Marks the field used by Air DatePicker.
* `data-ff-min` — Attribute for minimum date.
* `data-ff-max` — Attribute for maximum date.

### Example markup

```fenom:line-numbers
<div class="col-md-3 mb-3">
    <input type="text" placeholder="{('ff_frontend_'~$key) | lexicon}" class="form-control" data-ff-filter="{$key}" data-ff-datepicker data-ff-min="{$min}" data-ff-max="{$max}" name="{$key}" value="{$.get[$key]}">
</div>
```

## tpl.ffRange

:::tip
The [noUiSlider](https://refreshless.com/nouislider/) JavaScript plugin is used for the range slider.
:::

### Description

Numeric range selection chunk.

### Placeholders

* `$key` — Filter key.
* `$.get` — $_GET array.
* `$min` — Minimum value.
* `$max` — Maximum value.

### Attributes

* `data-ff-filter` — Marks a field that triggers filtering on change.
* `data-ff-range` — Marks the field used by noUiSlider.
* `data-ff-start` — Attribute for start value.
* `data-ff-end` — Attribute for end value.
* `data-ff-min` — Attribute for minimum value.
* `data-ff-max` — Attribute for maximum value.

### Example markup

```fenom:line-numbers
{if $.get[$key]}
    {set $vals = $.get[$key] | split}
{/if}
{set $start = $vals[0]?:$min}
{set $end = $vals[1]?:$max}
<div class="col-md-3 mb-3">
    <div class="row">
        <div class="col-5">
            <input type="number" value="{$start}" data-ff-start="{$key}" data-ff-filter="{$key}" name="{$key}[]">
        </div>
        <div class="col-5">
            <input type="number" value="{$end}" data-ff-end="{$key}" data-ff-filter="{$key}" name="{$key}[]">
        </div>
    </div>
    <div data-ff-range="{$key}" data-ff-min="{$min}" data-ff-max="{$max}"></div>
</div>
```

## tpl.ffSelectMultiple

### Description

Multi-select list wrapper chunk.

### Placeholders

* `$key` — Filter key.
* `$.get` — $_GET array.
* `$options` — List of options.

### Attributes

* `data-ff-filter` — Marks a field that triggers filtering on change.

### Example markup

```fenom:line-numbers
<div class="col-md-3 mb-3">
    <select class="form-select" multiple data-ff-filter="{$key}" name="{$key}[]">
        <option value="" {!$.get[$key] ? 'selected' : ''}>{('ff_frontend_'~$key) | lexicon}</option>
        {$options}
    </select>
</div>
```

## tpl.ffSelect

### Description

Single-select list wrapper chunk.

### Placeholders

* `$key` — Filter key.
* `$.get` — $_GET array.
* `$options` — List of options.

### Attributes

* `data-ff-filter` — Marks a field that triggers filtering on change.

### Example markup

```fenom:line-numbers
<div class="col-md-3 mb-3">
    <select class="form-select" data-ff-filter="{$key}" name="{$key}">
        <option value="" {!$.get[$key] ? 'selected' : ''}>{('ff_frontend_'~$key) | lexicon}</option>
        {$options}
    </select>
</div>
```

## tpl.ffOption

### Description

Single option chunk.

### Placeholders

* `$key` — Filter key.
* `$.get` — $_GET array.
* `$value` — Filter value.

### Attributes

None.

### Example markup

```fenom:line-numbers
{if $value != '0'}
    {switch $key}
    {case 'parent'}
    {set $caption = ($value | resource: 'pagetitle')}
    {case 'vendor'}
    {set $caption = ($value | vendor: 'name')}
    {default}
    {set $caption = $value}
    {/switch}
    {set $values = $.get[$key] | split: ','}
    <option value="{$value}" {($value in list $values) ? 'selected' : ''}>{$caption}</option>
{/if}
```

## tpl.Info

:::tip
Selected filter values are displayed via JavaScript that processes the content of the `<template>` tag.
:::

### Description

Filter meta information chunk.

### Placeholders

None.

### Attributes

* `data-ff-total` — Block for total result count; value is the **totalVar** parameter value.
* `data-ff-time` — Block for filter execution time.
* `data-ff-reset` — Required attribute for the filter form reset button; if the button is outside the form, set the `form` attribute to the filter form id.
* `data-ff-selected` — Wrapper block for selected values.
* `data-ff-tpl` — Attribute on the template element for selected values.
* `data-ff-item` — Attribute for the button that clears a single filter value.

### Example markup

```fenom:line-numbers
<div class="d-flex justify-content-between align-items-center">
    <div>
        <p>Found: <span data-ff-total="total"></span></p>
        <p><span data-ff-time></span></p>
    </div>
    <button type="reset" class="btn-secondary btn" form="filterForm" data-ff-reset>Reset</button>
</div>
<div class="d-flex align-items-center mb-3" style="gap:20px;" data-ff-selected>
    <template data-ff-tpl>
        <button class="btn-dark btn" data-ff-item="$key-$value">$caption</button>
    </template>
</div>
```
