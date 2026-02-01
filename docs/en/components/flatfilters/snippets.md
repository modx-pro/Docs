# Snippets

## ffConnector

### Purpose

Handles component requests.

### Parameters

None.

### Output

Returns JSON to the frontend.

### Usage

Used internally; not for direct calls.

## ffGetGroupName

### Purpose

Gets a user group name by ID.

### Parameters

None.

### Output

Returns the user group name.

### Usage

Used internally; not for direct calls.

## ffGetFilterForm

### Purpose

Renders the filter form.

### Parameters

* `configId` — Filter configuration ID to use.
* `wrapper` — Wrapper chunk for the form.
* `defaultTplOuter` — Chunk for each filter wrapper.
* `defaultTplRow` — Chunk for each filter value.

:::tip
To use different chunks per filter, name parameters: *filter-key*TplOuter (wrapper), *filter-key*TplRow (value).
:::

### Output

Returns the filter form HTML.

### Usage

:::danger
Do not mix syntax when using the component.
:::

```fenom:line-numbers
{set $pageLimit = 8}
{set $configId = 1}
{'!ffGetFilterForm' | snippet: [
    'configId' => $configId,
    'pagination' => 'filters',
    'wrapper' => 'tpl.ffForm',
    'priceTplOuter' => 'tpl.ffRange',
    'favoriteTplOuter' => 'tpl.ffCheckbox',
    'newTplOuter' => 'tpl.ffCheckbox',
    'popularTplOuter' => 'tpl.ffCheckbox',
    'colorTplOuter' => 'tpl.ffCheckboxGroupOuter',
    'colorTplRow' => 'tpl.ffCheckboxGroup',
    'defaultTplOuter' => 'tpl.ffSelect',
    'defaultTplRow' => 'tpl.ffOption',
    'createdonTplOuter' => 'tpl.ffDateRange',
]}
```

```modx:line-numbers
[[!ffGetFilterForm?
    &configId=1
    &wrapper=`tpl.ffForm`
    &priceTplOuter=`tpl.ffRange`
    &favoriteTplOuter=`tpl.ffCheckbox`
    &newTplOuter=`tpl.ffCheckbox`
    &popularTplOuter=`tpl.ffCheckbox`
    &colorTplOuter=`tpl.ffCheckboxGroupOuter`
    &colorTplRow=`tpl.ffCheckboxGroup`
    &defaultTplOuter=`tpl.ffSelect`
    &defaultTplRow=`tpl.ffOption`
    &createdonTplOuter=`tpl.ffDateRange`
]]
```
