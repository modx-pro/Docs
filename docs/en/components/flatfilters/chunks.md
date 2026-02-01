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
* `data-si-preset` — Preset name from **ff_preset_names** (key **filtering**).
* `data-ff-filter` — Marks a field that triggers filtering on change.

### Example

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

Single checkbox chunk. Placeholders: `$key`, `$.get`. Attribute: `data-ff-filter`.

## tpl.ffCheckboxGroupOuter

Wrapper for a group of checkboxes. Placeholder: `$options`.

## tpl.ffCheckboxGroup

Single checkbox in a group. Placeholders: `$key`, `$.get`, `$idx`. Attribute: `data-ff-filter`.

## tpl.ffDateRange

:::tip
Uses [Air DatePicker](https://air-datepicker.com/ru) for the date range.
:::

Date range chunk. Placeholders: `$key`, `$.get`, `$min`, `$max`. Attributes: `data-ff-filter`, `data-ff-datepicker`, `data-ff-min`, `data-ff-max`.

## tpl.ffRange

:::tip
Uses [noUiSlider](https://refreshless.com/nouislider/) for the range.
:::

Numeric range chunk. Placeholders: `$key`, `$.get`, `$min`, `$max`. Attributes: `data-ff-filter`, `data-ff-range`, `data-ff-start`, `data-ff-end`, `data-ff-min`, `data-ff-max`.

## tpl.ffSelectMultiple

Multi-select list wrapper. Placeholders: `$key`, `$.get`, `$options`. Attribute: `data-ff-filter`.

## tpl.ffSelect

Single-select list wrapper. Placeholders: `$key`, `$.get`, `$options`. Attribute: `data-ff-filter`.

## tpl.ffOption

Single option chunk. Placeholders: `$key`, `$.get`, `$value`.

## tpl.Info

:::tip
Selected filter values are shown via JavaScript using a `<template>` element.
:::

Filter meta chunk. Attributes: `data-ff-total`, `data-ff-time`, `data-ff-reset`, `data-ff-selected`, `data-ff-tpl`, `data-ff-item`.

Example:

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
