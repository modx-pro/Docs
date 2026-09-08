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

## Кастомные чанки и AJAX

Блок «Выбрано» рендерится на сервере — и при первой загрузке, и при каждой AJAX-фильтрации. Ваши чанки остаются единственным источником разметки.

Чтобы это работало, в `tplOuter` должен быть атрибут с хэшем конфигурации — по нему сервер понимает, какими чанками пересобрать блок:

```html
{* @FILE chunks/mfilter/selected.outer.tpl *}
<div class="my-selected"
     data-mfilter-selected
     {if $hash} data-mfilter-selected-hash="{$hash}"{/if}
     {if $filterLabels} data-filter-labels="{$filterLabels | esc}"{/if}>

    {if !$empty}
        <div class="my-selected__items">{$items}</div>
        {$reset}
    {/if}
</div>
```

::: warning Без атрибута разметка сбросится
Если `data-mfilter-selected-hash` в чанке нет, сервер не сможет пересобрать блок, и JS соберёт его сам — стандартной разметкой. Ваш чанк при этом заменится на дефолтный при первом же клике по фильтру.

В стандартном `mfilter.selected.outer` атрибут уже есть. При переносе на свой чанк не забудьте его перенести.
:::

::: tip Один блок на страницу
AJAX-ответ несёт одну разметку блока «Выбрано». Если вызвать `mFilterSelected` дважды (например, в сайдбаре и над списком), оба блока получат разметку по конфигу того, чей `data-mfilter-selected-hash` встретится в DOM первым. Для двух блоков с разными настройками используйте один вызов и продублируйте вывод через `toPlaceholder`.
:::

## Плейсхолдеры в чанках

### tplOuter

| Плейсхолдер | Описание |
|-------------|----------|
| `{$items}` | HTML всех элементов/групп |
| `{$reset}` | HTML кнопки сброса |
| `{$count}` | Количество активных фильтров |
| `{$empty}` | true, если фильтры не выбраны |
| `{$hidden}` | true, если блок должен быть скрыт (при `hideWhenEmpty=1` и пустом состоянии) |
| `{$total}` | То же число, что `{$count}` — второе имя одного значения |
| `{$filterLabels}` | JSON-объект меток для JS |
| `{$hash}` | Хэш конфигурации для AJAX — выводите в `data-mfilter-selected-hash` |

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
| `{$url}` | Адрес страницы без фильтров |

Стандартный чанк рисует `<button>`, который обрабатывает JS. `{$url}` нужен, если сброс делается ссылкой — тогда он работает и без JS:

```fenom
<a href="{$url}" class="mfilter-selected-reset" data-mfilter-reset-selected>{$text}</a>
```

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

### Кастомные чанки

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
        <button type="button" data-mfilter-reset-selected class="btn btn-link">{$text}</button>'
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
| `data-mfilter-reset-selected` | Кнопка сброса всех фильтров внутри блока «Выбрано» |

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
    <button data-mfilter-reset-selected>Сбросить всё</button>
</div>
```

## Чанки по умолчанию

### mfilter.selected.outer

```html
<div class="mfilter-selected{if $hidden} mfilter-selected--hidden{/if}"
     data-mfilter-selected
     data-filter-labels="{$filterLabels | esc}">
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
<button type="button" class="mfilter-selected__reset" data-mfilter-reset-selected>
    {$text}
</button>
```
