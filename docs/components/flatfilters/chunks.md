# Чанки

## tpl.ffForm

### Описание

Содержит форму фильтрации.

### Плейсхолдеры

* `$configId` - ID конфигурации фильтров.
* `$filters` - список фильтров.
* `$.get` - массив $_GET.

### Атрибуты

* `data-ff-form` - отмечает форму как форму для фильтрации.
* `data-si-preset` - содержит имя пресета указанное в системной настройке **ff_preset_names** для ключа **filtering**.
* `data-ff-filter` - отмечает поле, изменение в котором должно запускать фильтрацию.

### Пример разметки

```fenom:line-numbers
<form id="filterForm" class="row py-5" action="#" data-ff-form="filterForm" data-si-preset="flatfilters">
    <input type="hidden" name="configId" value="{$configId}">
    {$filters}
    <div class="col-md-3 mb-3">
        <select class="form-select" data-ff-filter="sortby" name="sortby">
            <option value="">Сортировать</option>
            <option value="Data.price|ASC" {$.get['sortby'] == 'Data.price|ASC' ? 'selected' : ''}>Сначала дешёвые</option>
            <option value="Data.price|DESC" {$.get['sortby'] == 'Data.price|DESC' ? 'selected' : ''}>Сначала дорогие</option>
        </select>
    </div>
</form>
```

## tpl.ffCheckbox

### Описание

Чанк одиночного чекбокса.

### Плейсхолдеры

* `$key` - ключ фильтра.
* `$.get` - массив $_GET.

### Атрибуты

* `data-ff-filter` - отмечает поле, изменение в котором должно запускать фильтрацию.

### Пример разметки

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

### Описание

Чанк-обёртка группы чекбоксов.

### Плейсхолдеры

* `$options` - список чекбоксов.

### Атрибуты

Отсутствуют.

### Пример разметки

```fenom:line-numbers
<div class="col-md-3 mb-3">
    <div class="row">
        {$options}
    </div>
</div>
```

## tpl.ffCheckboxGroup

### Описание

Чанк отдельного чекбокса в группе.

### Плейсхолдеры

* `$key` - ключ фильтра.
* `$.get` - массив $_GET.
* `$idx` - номер итерации, начиная с 0.

### Атрибуты

* `data-ff-filter` - отмечает поле, изменение в котором должно запускать фильтрацию.

### Пример разметки

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
Для выбора периода используется JavaScript плагин [Air DatePicker](https://air-datepicker.com/ru).
:::

### Описание

Чанк выбора периода.

### Плейсхолдеры

* `$key` - ключ фильтра.
* `$.get` - массив $_GET.
* `$min` - минимальная дата.
* `$max` - максимальная дата.

### Атрибуты

* `data-ff-filter` - отмечает поле, изменение в котором должно запускать фильтрацию.
* `data-ff-datepicker` - отмечает поле, на котором будет работать Air DatePicker.
* `data-ff-min` - атрибут для минимальной даты.
* `data-ff-max` - атрибут для максимальной даты.

### Пример разметки

```fenom:line-numbers
<div class="col-md-3 mb-3">
    <input type="text" placeholder="{('ff_frontend_'~$key) | lexicon}" class="form-control" data-ff-filter="{$key}" data-ff-datepicker data-ff-min="{$min}" data-ff-max="{$max}" name="{$key}" value="{$.get[$key]}">
</div>
```

## tpl.ffRange

:::tip
За работу слайдера отвечает JavaScript плагин [noUiSlider](https://refreshless.com/nouislider/).
:::

### Описание

Чанк выбора диапазона чисел.

### Плейсхолдеры

* `$key` - ключ фильтра.
* `$.get` - массив $_GET.
* `$min` - минимальное число.
* `$max` - максимальное число.

### Атрибуты

* `data-ff-filter` - отмечает поле, изменение в котором должно запускать фильтрацию.
* `data-ff-range` - отмечает поле, на котором будет работать noUiSlider.
* `data-ff-start` - атрибут для стартового значения.
* `data-ff-end` - атрибут для конечного значения.
* `data-ff-min` - атрибут для минимального числа.
* `data-ff-max` - атрибут для максимального числа.

### Пример разметки

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

### Описание

Чанк-обёртка списка со множественным выбором.

### Плейсхолдеры

* `$key` - ключ фильтра.
* `$.get` - массив $_GET.
* `$options` - список опций.

### Атрибуты

* `data-ff-filter` - отмечает поле, изменение в котором должно запускать фильтрацию.

### Пример разметки

```fenom:line-numbers
<div class="col-md-3 mb-3">
    <select class="form-select" multiple data-ff-filter="{$key}" name="{$key}[]">
        <option value="" {!$.get[$key] ? 'selected' : ''}>{('ff_frontend_'~$key) | lexicon}</option>
        {$options}
    </select>
</div>
```

## tpl.ffSelect

### Описание

Чанк-обёртка списка со одиночным выбором.

### Плейсхолдеры

* `$key` - ключ фильтра.
* `$.get` - массив $_GET.
* `$options` - список опций.

### Атрибуты

* `data-ff-filter` - отмечает поле, изменение в котором должно запускать фильтрацию.

### Пример разметки

```fenom:line-numbers
<div class="col-md-3 mb-3">
    <select class="form-select" data-ff-filter="{$key}" name="{$key}">
        <option value="" {!$.get[$key] ? 'selected' : ''}>{('ff_frontend_'~$key) | lexicon}</option>
        {$options}
    </select>
</div>
```

## tpl.ffOption

### Описание

Чанк отдельной опции.

### Плейсхолдеры

* `$key` - ключ фильтра.
* `$.get` - массив $_GET.
* `$value` - значение фильтра.

### Атрибуты

Отсутствуют.

### Пример разметки

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
Выбранные значения фильтров отображаются при помощи JavaScript, который обрабатывает содержимое тега `<template>`.
:::

### Описание

Чанк метаинформации о фильтрации.

### Плейсхолдеры

Отсутствуют.

### Атрибуты

* `data-ff-total` - блок вывода общего числа результатов, в качестве значения принимает значения параметра **totalVar**.
* `data-ff-time` - блок вывода времени фильтрации.
* `data-ff-reset` - обязательный атрибут кнопки сброса формы фильтрации, если сама кнопка находится вне формы укажите атрибут `form` со значением равным id формы фильтрации.
* `data-ff-selected` - блок-обёртка для вывода выбранных значений.
* `data-ff-tpl` - атрибут элемента template для показа выбранных значений.
* `data-ff-item` - атрибут кнопки сброса отдельного значения фильтра.

### Пример разметки

```fenom:line-numbers
<div class="d-flex justify-content-between align-items-center">
    <div>
        <p>Найдено: <span data-ff-total="total"></span></p>
        <p><span data-ff-time></span></p>
    </div>
    <button type="reset" class="btn-secondary btn" form="filterForm" data-ff-reset>Сбросить</button>
</div>
<div class="d-flex align-items-center mb-3" style="gap:20px;" data-ff-selected>
    <template data-ff-tpl>
        <button class="btn-dark btn" data-ff-item="$key-$value">$caption</button>
    </template>
</div>
```
