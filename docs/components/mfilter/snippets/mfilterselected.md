# mFilterSelected

Сниппет для отображения выбранных (активных) фильтров с возможностью их сброса.

## Описание

mFilterSelected показывает блок с текущими активными фильтрами. Пользователь может удалить отдельные фильтры или сбросить все сразу. Компонент интегрируется с JavaScript для live-обновлений при AJAX-фильтрации.

**Особенности:**
- Группировка фильтров по ключам
- Автоматическое определение меток из лексиконов и конфигурации
- Кнопка сброса всех фильтров
- Интеграция с JS-компонентом SelectedFilters
- Поддержка SEO URL и обычных GET-параметров

## Параметры

### Основные

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `resourceId` | текущий ресурс | ID ресурса для получения конфигурации фильтров |

### Шаблоны

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `tplOuter` | `mfilter.selected.outer` | Внешний контейнер |
| `tplGroup` | `mfilter.selected.group` | Шаблон группы (для группировки по filterKey) |
| `tplItem` | `mfilter.selected.item` | Шаблон одного элемента фильтра |
| `tplReset` | `mfilter.selected.reset` | Шаблон кнопки сброса |

### Поведение

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `grouped` | `true` | Группировать элементы по ключу фильтра |
| `showLabels` | `true` | Показывать метки фильтров (Цвет:, Размер:) |
| `showReset` | `true` | Показывать кнопку "Сбросить всё" |
| `hideWhenEmpty` | `true` | Скрывать блок при отсутствии фильтров |
| `resetText` | из лексикона | Текст кнопки сброса |

### Вывод

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `toPlaceholder` | — | Вывести в плейсхолдер |

## Плейсхолдеры в шаблонах

### tplOuter

| Плейсхолдер | Описание |
|-------------|----------|
| `{$items}` | HTML всех элементов/групп |
| `{$reset}` | HTML кнопки сброса |
| `{$count}` | Количество активных фильтров |
| `{$empty}` | true, если фильтры не выбраны |
| `{$hidden}` | true, если блок должен быть скрыт |
| `{$filterLabels}` | JSON-объект меток для JS |

### tplGroup

| Плейсхолдер | Описание |
|-------------|----------|
| `{$key}` | Ключ фильтра |
| `{$label}` | Метка фильтра |
| `{$items}` | HTML элементов группы |
| `{$count}` | Количество значений в группе |
| `{$showLabel}` | Показывать метку |

### tplItem

| Плейсхолдер | Описание |
|-------------|----------|
| `{$key}` | Ключ фильтра |
| `{$value}` | Значение фильтра |
| `{$filterLabel}` | Метка фильтра |
| `{$valueLabel}` | Метка значения |
| `{$label}` | Алиас для valueLabel |

### tplReset

| Плейсхолдер | Описание |
|-------------|----------|
| `{$text}` | Текст кнопки |

## Примеры

### Базовый вызов

```fenom
{'!mFilterSelected' | snippet}
```

### Без группировки

```fenom
{'!mFilterSelected' | snippet : [
    'grouped' => false
]}
```

### Без меток и кнопки сброса

```fenom
{'!mFilterSelected' | snippet : [
    'showLabels' => false,
    'showReset' => false
]}
```

### Кастомный текст сброса

```fenom
{'!mFilterSelected' | snippet : [
    'resetText' => 'Очистить фильтры'
]}
```

### Кастомные шаблоны

```fenom
{'!mFilterSelected' | snippet : [
    'tplOuter' => '@INLINE
        <div class="selected-filters" data-mfilter-selected>
            {$items}
            {$reset}
        </div>',
    'tplItem' => '@INLINE
        <span class="filter-tag" data-mfilter-remove="{$key}" data-value="{$value}">
            {$label} <button type="button">&times;</button>
        </span>',
    'tplReset' => '@INLINE
        <button type="button" data-mfilter-reset class="btn btn-link">{$text}</button>'
]}
```

## Интеграция с формой

Рекомендуется размещать над результатами фильтрации:

```fenom
<div class="catalog">
    <aside class="catalog-sidebar">
        {'!mFilterForm' | snippet}
    </aside>

    <main class="catalog-content">
        {* Выбранные фильтры *}
        {'!mFilterSelected' | snippet}

        {* Результаты *}
        {'!mFilter' | snippet : [
            'element' => 'msProducts',
            'paginator' => 'pdoPage',
            'parents' => $_modx->resource.id
        ]}
    </main>
</div>
```

## JavaScript интеграция

Блок автоматически обновляется при AJAX-фильтрации благодаря JS-компоненту `SelectedFilters`.

### Data-атрибуты

| Атрибут | Описание |
|---------|----------|
| `data-mfilter-selected` | Контейнер выбранных фильтров |
| `data-mfilter-remove="{key}"` | Кнопка удаления значения |
| `data-value="{value}"` | Значение для удаления |
| `data-mfilter-reset` | Кнопка сброса всех фильтров |

### Пример HTML разметки

```html
<div class="selected-filters" data-mfilter-selected>
    <div class="filter-group">
        <span class="filter-label">Цвет:</span>
        <span class="filter-tag" data-mfilter-remove="color" data-value="red">
            Красный <button>&times;</button>
        </span>
        <span class="filter-tag" data-mfilter-remove="color" data-value="blue">
            Синий <button>&times;</button>
        </span>
    </div>
    <button data-mfilter-reset>Сбросить всё</button>
</div>
```

## Чанки по умолчанию

### mfilter.selected.outer

```html
<div class="mfilter-selected{if $hidden} mfilter-selected--hidden{/if}"
     data-mfilter-selected
     data-filter-labels='{$filterLabels}'>
    {if !$empty}
        <div class="mfilter-selected__items">
            {$items}
        </div>
        {$reset}
    {/if}
</div>
```

### mfilter.selected.item

```html
<span class="mfilter-selected__tag"
      data-mfilter-remove="{$key}"
      data-value="{$value}">
    {$label}
    <button type="button" class="mfilter-selected__remove" aria-label="Удалить">&times;</button>
</span>
```

### mfilter.selected.reset

```html
<button type="button" class="mfilter-selected__reset" data-mfilter-reset>
    {$text}
</button>
```
