# Templates

Customizing mFilter templates.

## Template structure

### mFilterForm

| Parameter | Description | Default |
|----------|----------|--------------|
| `tplOuter` | Form wrapper | `@INLINE ...` |
| `tplFilter.outer` | Filter wrapper | `@INLINE ...` |
| `tplFilter.default` | Default filter | `@INLINE ...` |
| `tplFilter.number` | Number filter | `@INLINE ...` |
| `tplFilter.boolean` | Boolean filter | `@INLINE ...` |
| `tplFilter.colors` | Color filter | `@INLINE ...` |
| `tplValue.default` | Value (checkbox) | `@INLINE ...` |
| `tplValue.radio` | Value (radio) | `@INLINE ...` |
| `tplValue.color` | Color value | `@INLINE ...` |

## Form wrapper (tplOuter)

```html
{* @FILE chunks/mfilter/form.outer.tpl *}

<form id="mfilter-form"
      class="mfilter-form"
      data-mfilter-form
      data-mfilter-hash="{$hash}">

    {* Hidden fields *}
    <input type="hidden" name="resource_id" value="{$resource_id}">

    {* Filters *}
    {$filters}

    {* Buttons *}
    <div class="mfilter-form__actions">
        <button type="submit" class="btn btn-primary">
            Apply
        </button>
        <button type="reset" class="btn btn-secondary" data-mfilter-reset>
            Reset
        </button>
    </div>

    {* Result count *}
    <div class="mfilter-form__total">
        Found: <span data-mfilter-total>{$total}</span>
    </div>
</form>
```

### tplOuter placeholders

| Placeholder | Description |
|-------------|----------|
| `{$filters}` | HTML of all filters |
| `{$hash}` | Config hash |
| `{$resource_id}` | Resource ID |
| `{$total}` | Result count |

## Filter wrapper (tplFilter.outer)

```html
{* @FILE chunks/mfilter/filter.outer.tpl *}

<fieldset class="mfilter-filter mfilter-filter--{$key}"
          data-mfilter-filter="{$key}">

    <legend class="mfilter-filter__title">
        {$label}
        {if $selected}
            <span class="mfilter-filter__clear"
                  data-mfilter-clear="{$key}">×</span>
        {/if}
    </legend>

    <div class="mfilter-filter__content">
        {$content}
    </div>
</fieldset>
```

### tplFilter.outer placeholders

| Placeholder | Description |
|-------------|----------|
| `{$key}` | Filter key |
| `{$label}` | Filter label |
| `{$content}` | HTML of values |
| `{$type}` | Filter type |
| `{$selected}` | Any value selected |

## Default filter (tplFilter.default)

```html
{* @FILE chunks/mfilter/filter.default.tpl *}

<div class="mfilter-values">
    {foreach $values as $item}
        <label class="mfilter-value {$item.selected ? 'mfilter-value--selected' : ''} {$item.disabled ? 'mfilter-value--disabled' : ''}">
            <input type="checkbox"
                   name="{$key}[]"
                   value="{$item.value}"
                   {$item.selected ? 'checked' : ''}
                   {$item.disabled ? 'disabled' : ''}>
            <span class="mfilter-value__label">{$item.label}</span>
            <span class="mfilter-value__count">({$item.count})</span>
        </label>
    {/foreach}
</div>
```

### tplFilter.default placeholders

| Placeholder | Description |
|-------------|----------|
| `{$values}` | Values array |
| `{$key}` | Filter key |
| `{$item.value}` | Value |
| `{$item.label}` | Display text |
| `{$item.count}` | Product count |
| `{$item.selected}` | Selected |
| `{$item.disabled}` | Disabled |

## Number filter (tplFilter.number)

```html
{* @FILE chunks/mfilter/filter.number.tpl *}

<div class="mfilter-range" data-mfilter-range="{$key}">
    {* Inputs *}
    <div class="mfilter-range__inputs">
        <input type="number"
               name="{$key}[min]"
               value="{$selected.min ?: ''}"
               min="{$min}"
               max="{$max}"
               placeholder="from {$min}"
               class="mfilter-range__input mfilter-range__input--min">
        <span class="mfilter-range__separator">—</span>
        <input type="number"
               name="{$key}[max]"
               value="{$selected.max ?: ''}"
               min="{$min}"
               max="{$max}"
               placeholder="to {$max}"
               class="mfilter-range__input mfilter-range__input--max">
    </div>

    {* Slider (noUiSlider) *}
    <div class="mfilter-range__slider"
         data-mfilter-slider
         data-min="{$min}"
         data-max="{$max}"
         data-start="{$selected.min ?: $min}"
         data-end="{$selected.max ?: $max}">
    </div>
</div>
```

### tplFilter.number placeholders

| Placeholder | Description |
|-------------|----------|
| `{$min}` | Min value |
| `{$max}` | Max value |
| `{$selected.min}` | Selected min |
| `{$selected.max}` | Selected max |
| `{$step}` | Slider step |

## Boolean filter (tplFilter.boolean)

```html
{* @FILE chunks/mfilter/filter.boolean.tpl *}

<div class="mfilter-boolean">
    <label class="mfilter-switch">
        <input type="checkbox"
               name="{$key}"
               value="1"
               {$selected ? 'checked' : ''}>
        <span class="mfilter-switch__slider"></span>
        <span class="mfilter-switch__label">{$label}</span>
    </label>
</div>
```

## Color filter (tplFilter.colors)

```html
{* @FILE chunks/mfilter/filter.colors.tpl *}

<div class="mfilter-colors">
    {foreach $values as $item}
        <label class="mfilter-color {$item.selected ? 'mfilter-color--selected' : ''}">
            <input type="checkbox"
                   name="{$key}[]"
                   value="{$item.value}"
                   {$item.selected ? 'checked' : ''}>
            <span class="mfilter-color__swatch"
                  style="background-color: {$item.hex}"
                  title="{$item.label}"></span>
        </label>
    {/foreach}
</div>
```

### tplFilter.colors placeholders

| Placeholder | Description |
|-------------|----------|
| `{$item.hex}` | Color HEX |
| `{$item.label}` | Color name |

## Value (tplValue.default)

```html
{* @FILE chunks/mfilter/value.default.tpl *}

<label class="mfilter-value {$selected ? 'mfilter-value--selected' : ''}">
    <input type="checkbox"
           name="{$key}[]"
           value="{$value}"
           {$selected ? 'checked' : ''}>
    <span class="mfilter-value__label">{$label}</span>
    {if $showCount}
        <span class="mfilter-value__count">({$count})</span>
    {/if}
</label>
```

## Using file templates

### Syntax

```php
[[!mFilterForm?
    &tplOuter=`@FILE chunks/mfilter/form.outer.tpl`
    &tplFilter.default=`@FILE chunks/mfilter/filter.default.tpl`
    &tplFilter.number=`@FILE chunks/mfilter/filter.number.tpl`
]]
```

### File layout

```
core/
  elements/
    chunks/
      mfilter/
        form.outer.tpl
        filter.outer.tpl
        filter.default.tpl
        filter.number.tpl
        filter.boolean.tpl
        filter.colors.tpl
```

## Inline templates

```php
[[!mFilterForm?
    &tplFilter.default=`@INLINE
        <div class="filter-item">
            {foreach $values as $v}
                <label>
                    <input type="checkbox" name="{$key}[]" value="{$v.value}">
                    {$v.label}
                </label>
            {/foreach}
        </div>
    `
]]
```

## Tips

1. **Start by copying** — copy built-in templates and modify
2. **Keep data attributes** — they are required for JS
3. **Test AJAX** — ensure templates update correctly
4. **Use BEM** — structure CSS classes
