# Шаблоны

Кастомизация шаблонов mFilter.

## Структура шаблонов

### mFilterForm

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| `tplOuter` | Обёртка формы | `@INLINE ...` |
| `tplFilter.outer` | Обёртка фильтра | `@INLINE ...` |
| `tplFilter.default` | Стандартный фильтр | `@INLINE ...` |
| `tplFilter.number` | Числовой фильтр | `@INLINE ...` |
| `tplFilter.boolean` | Булевый фильтр | `@INLINE ...` |
| `tplFilter.colors` | Цветовой фильтр | `@INLINE ...` |
| `tplValue.default` | Значение (checkbox) | `@INLINE ...` |
| `tplValue.radio` | Значение (radio) | `@INLINE ...` |
| `tplValue.color` | Цветовое значение | `@INLINE ...` |

## Обёртка формы (tplOuter)

```html
{* @FILE chunks/mfilter/form.outer.tpl *}

<form id="mfilter-form"
      class="mfilter-form"
      data-mfilter-form
      data-mfilter-hash="{$hash}">

    {* Скрытые поля *}
    <input type="hidden" name="resource_id" value="{$resource_id}">

    {* Фильтры *}
    {$filters}

    {* Кнопки *}
    <div class="mfilter-form__actions">
        <button type="submit" class="btn btn-primary">
            Применить
        </button>
        <button type="reset" class="btn btn-secondary" data-mfilter-reset>
            Сбросить
        </button>
    </div>

    {* Счётчик результатов *}
    <div class="mfilter-form__total">
        Найдено: <span data-mfilter-total>{$total}</span>
    </div>
</form>
```

### Плейсхолдеры tplOuter

| Плейсхолдер | Описание |
|-------------|----------|
| `{$filters}` | HTML всех фильтров |
| `{$hash}` | Хэш конфигурации |
| `{$resource_id}` | ID ресурса |
| `{$total}` | Количество результатов |

## Обёртка фильтра (tplFilter.outer)

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

### Плейсхолдеры tplFilter.outer

| Плейсхолдер | Описание |
|-------------|----------|
| `{$key}` | Ключ фильтра |
| `{$label}` | Название фильтра |
| `{$content}` | HTML значений |
| `{$type}` | Тип фильтра |
| `{$selected}` | Есть ли выбранные значения |

## Стандартный фильтр (tplFilter.default)

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

### Плейсхолдеры tplFilter.default

| Плейсхолдер | Описание |
|-------------|----------|
| `{$values}` | Массив значений |
| `{$key}` | Ключ фильтра |
| `{$item.value}` | Значение |
| `{$item.label}` | Отображаемый текст |
| `{$item.count}` | Количество товаров |
| `{$item.selected}` | Выбрано ли |
| `{$item.disabled}` | Недоступно ли |

## Числовой фильтр (tplFilter.number)

```html
{* @FILE chunks/mfilter/filter.number.tpl *}

<div class="mfilter-range" data-mfilter-range="{$key}">
    {* Инпуты *}
    <div class="mfilter-range__inputs">
        <input type="number"
               name="{$key}[min]"
               value="{$selected.min ?: ''}"
               min="{$min}"
               max="{$max}"
               placeholder="от {$min}"
               class="mfilter-range__input mfilter-range__input--min">
        <span class="mfilter-range__separator">—</span>
        <input type="number"
               name="{$key}[max]"
               value="{$selected.max ?: ''}"
               min="{$min}"
               max="{$max}"
               placeholder="до {$max}"
               class="mfilter-range__input mfilter-range__input--max">
    </div>

    {* Слайдер (noUiSlider) *}
    <div class="mfilter-range__slider"
         data-mfilter-slider
         data-min="{$min}"
         data-max="{$max}"
         data-start="{$selected.min ?: $min}"
         data-end="{$selected.max ?: $max}">
    </div>
</div>
```

### Плейсхолдеры tplFilter.number

| Плейсхолдер | Описание |
|-------------|----------|
| `{$min}` | Минимальное значение |
| `{$max}` | Максимальное значение |
| `{$selected.min}` | Выбранный минимум |
| `{$selected.max}` | Выбранный максимум |
| `{$step}` | Шаг слайдера |

## Булевый фильтр (tplFilter.boolean)

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

## Цветовой фильтр (tplFilter.colors)

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

### Плейсхолдеры tplFilter.colors

| Плейсхолдер | Описание |
|-------------|----------|
| `{$item.hex}` | HEX-код цвета |
| `{$item.label}` | Название цвета |

## Значение (tplValue.default)

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

## Использование файловых шаблонов

### Синтаксис

```php
[[!mFilterForm?
    &tplOuter=`@FILE chunks/mfilter/form.outer.tpl`
    &tplFilter.default=`@FILE chunks/mfilter/filter.default.tpl`
    &tplFilter.number=`@FILE chunks/mfilter/filter.number.tpl`
]]
```

### Расположение файлов

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

## Inline-шаблоны

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

## Советы

1. **Начните с копирования** — скопируйте встроенные шаблоны и модифицируйте
2. **Сохраняйте data-атрибуты** — они нужны для работы JS
3. **Тестируйте AJAX** — убедитесь, что шаблоны корректно обновляются
4. **Используйте BEM** — структурируйте CSS-классы
