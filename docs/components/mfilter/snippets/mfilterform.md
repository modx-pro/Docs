# mFilterForm

Сниппет для рендеринга формы фильтров.

## Параметры

### Основные

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `resourceId` | текущий ресурс | ID ресурса для получения конфигурации фильтров |
| `filters` | — | Вывести только эти фильтры (через запятую) |
| `exclude` | — | Исключить эти фильтры (через запятую) |

### Шаблоны

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `tpl` | `mfilter.filter` | Шаблон блока фильтра |
| `tplOuter` | `@INLINE` | Внешний шаблон формы |
| `tplItem` | — | Шаблон элемента фильтра (чекбокс/радио) |
| `tplSlider` | — | Шаблон слайдера (range) |
| `tplColor` | — | Шаблон цветового фильтра |
| `tplBoolean` | — | Шаблон boolean переключателя |

### Отображение значений

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `showCounts` | `true` | Показывать количество результатов |
| `hideZero` | `true` | Скрывать значения с нулевым счётчиком |
| `hideEmpty` | `false` | Скрывать пустые фильтры (без значений) |
| `sortByCount` | `false` | Сортировать значения по количеству (DESC) |

### Форма

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `formId` | — | HTML id формы |
| `formClass` | — | CSS класс формы |
| `actionUrl` | текущий URL | URL отправки формы |
| `method` | `POST` | Метод формы (GET, POST) |

### AJAX

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `ajax` | `true` | Включить AJAX-фильтрацию |
| `ajaxMode` | `form` | Режим: `form` (по кнопке) или `instant` (при изменении) |

### Вывод

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `outputSeparator` | `\n` | Разделитель между блоками фильтров |
| `toPlaceholder` | `false` | Вывести в плейсхолдер |
| `placeholderPrefix` | `mfilter.` | Префикс плейсхолдеров |

## Примеры

### Базовый вызов

```fenom
{'!mFilterForm' | snippet}
```

### Только определённые фильтры

```fenom
{'!mFilterForm' | snippet : [
    'filters' => 'vendor,color,price'
]}
```

### Исключить фильтры

```fenom
{'!mFilterForm' | snippet : [
    'exclude' => 'size,weight'
]}
```

### Мгновенная фильтрация

```fenom
{'!mFilterForm' | snippet : [
    'ajaxMode' => 'instant'
]}
```

### Сортировка значений по популярности

```fenom
{'!mFilterForm' | snippet : [
    'sortByCount' => 1,
    'hideZero' => 1
]}
```

### Кастомная обёртка формы

```fenom
{'!mFilterForm' | snippet : [
    'tplOuter' => '@INLINE <form id="catalog-filter" class="filter-sidebar" data-mfilter>{$output}</form>'
]}
```

### Вывод в плейсхолдер

```fenom
{'!mFilterForm' | snippet : [
    'toPlaceholder' => 'sidebar.filters'
]}

{* Использование в другом месте *}
<aside>
    {$_modx->getPlaceholder('sidebar.filters')}
</aside>
```

### Форма для другого ресурса

```fenom
{* Форма фильтров для категории ID=5 *}
{'!mFilterForm' | snippet : [
    'resourceId' => 5
]}
```

## Шаблоны

### Структура по умолчанию

```html
<form data-mfilter data-mfilter-results=".mfilter-results">
    <!-- Фильтр "Бренд" -->
    <div class="mfilter-filter" data-filter="vendor">
        <div class="mfilter-filter-title">Бренд</div>
        <div class="mfilter-filter-content">
            <label class="mfilter-item">
                <input type="checkbox" name="vendor[]" value="apple">
                <span class="mfilter-label">Apple</span>
                <span class="mfilter-count">15</span>
            </label>
            <!-- ... -->
        </div>
    </div>

    <!-- Фильтр "Цена" (диапазон) -->
    <div class="mfilter-filter mfilter-range" data-filter="price">
        <div class="mfilter-filter-title">Цена</div>
        <div class="mfilter-filter-content">
            <input type="number" name="price|min" data-range="min" min="0" max="100000">
            <input type="number" name="price|max" data-range="max" min="0" max="100000">
            <div data-mfilter-slider></div>
        </div>
    </div>

    <button type="submit">Применить</button>
    <button type="reset" class="mfilter-reset">Сбросить</button>
</form>
```

### Кастомный шаблон фильтра

```fenom
{'!mFilterForm' | snippet : [
    'tpl' => '@FILE chunks/filter.custom.tpl'
]}
```

**chunks/filter.custom.tpl:**

```html
<div class="filter-block filter-{$key}" data-filter="{$key}">
    <h4 class="filter-title">{$label}</h4>

    {if $type == 'number'}
        <div class="filter-range">
            <input type="number" name="{$key}|min" value="{$min}" min="{$filterMin}" max="{$filterMax}">
            <span>—</span>
            <input type="number" name="{$key}|max" value="{$max}" min="{$filterMin}" max="{$filterMax}">
        </div>
    {else}
        <ul class="filter-values">
            {foreach $values as $item}
                <li class="filter-value {$item.active ? 'active' : ''}">
                    <label>
                        <input type="checkbox" name="{$key}[]" value="{$item.value}" {$item.active ? 'checked' : ''}>
                        {$item.label}
                        {if $showCounts}
                            <span class="count">({$item.count})</span>
                        {/if}
                    </label>
                </li>
            {/foreach}
        </ul>
    {/if}
</div>
```

### Плейсхолдеры в шаблоне фильтра

| Плейсхолдер | Описание |
|-------------|----------|
| `{$key}` | Ключ фильтра (vendor, color, price) |
| `{$label}` | Название фильтра |
| `{$type}` | Тип (default, number, boolean, vendors, colors) |
| `{$source}` | Источник (option, tv, field, resource) |
| `{$values}` | Массив значений |
| `{$min}`, `{$max}` | Текущие значения диапазона |
| `{$filterMin}`, `{$filterMax}` | Границы диапазона |
| `{$active}` | Есть ли активные значения |

### Плейсхолдеры в элементе значения

| Плейсхолдер | Описание |
|-------------|----------|
| `{$item.value}` | Значение |
| `{$item.label}` | Отображаемое название |
| `{$item.count}` | Количество результатов |
| `{$item.active}` | Выбрано ли значение |
| `{$item.slug}` | SEO-slug значения |
| `{$item.hex}` | HEX цвета (для типа colors) |

## Data-атрибуты

Форма использует data-атрибуты для JavaScript:

| Атрибут | Описание |
|---------|----------|
| `data-mfilter` | Маркер формы mFilter |
| `data-mfilter-results` | Селектор блока результатов |
| `data-mfilter-ajax` | Включить AJAX (true/false) |
| `data-mfilter-mode` | Режим: form или instant |
| `data-mfilter-auto-submit` | Авто-отправка при изменении |
| `data-mfilter-hash` | Хеш конфигурации для AJAX |
| `data-filter` | Ключ фильтра (на блоке) |
| `data-range` | Тип поля диапазона (min/max) |
| `data-mfilter-slider` | Маркер для noUiSlider |

## CSS классы

| Класс | Описание |
|-------|----------|
| `.mfilter-form` | Форма фильтров |
| `.mfilter-filter` | Блок одного фильтра |
| `.mfilter-filter-title` | Заголовок фильтра |
| `.mfilter-filter-content` | Содержимое фильтра |
| `.mfilter-item` | Элемент фильтра (label) |
| `.mfilter-label` | Текст элемента |
| `.mfilter-count` | Счётчик результатов |
| `.mfilter-range` | Блок диапазона |
| `.mfilter-reset` | Кнопка сброса |
| `.mfilter-loading` | Состояние загрузки |
| `.mfilter-disabled` | Недоступный элемент |

## Вынос фильтров за пределы формы

Можно вынести отдельные фильтры за пределы основной формы и управлять ими через JS API:

```fenom
{* Основная форма без фильтра бренда *}
{'!mFilterForm' | snippet : [
    'exclude' => 'vendor',
    'formId' => 'main-filter'
]}

{* Отдельный фильтр бренда в шапке *}
<select id="header-brand">
    <option value="">Все бренды</option>
    <option value="apple">Apple</option>
    <option value="samsung">Samsung</option>
</select>

<script>
document.getElementById('header-brand').addEventListener('change', (e) => {
    const filter = mfilterGet('main-filter');
    if (e.target.value) {
        filter.setFilter('vendor', e.target.value);
    } else {
        filter.removeFilter('vendor');
    }
    filter.submit();
});
</script>
```

Подробнее: [Внешние фильтры](/components/mfilter/cookbook/external-filters)
