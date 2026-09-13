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
      data-mfilter-form>

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

::: warning `data-mfilter-hash` — не в форму
Переменной `$hash` в чанке `mFilterForm` не существует: форма рендерится раньше сниппета `mFilter`, и плейсхолдер на тот момент ещё не выставлен. Атрибут нужен в обёртке результатов (`tplOuter` сниппета `mFilter`) — см. [Контракт разметки](#kontrakt-razmetki).
:::



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

## Контракт разметки

JS-часть находит элементы двумя способами: по `data-`атрибутам и по классам `mfilter-*`. Оба — часть контракта, а не оформление. Переписывая чанки под свой дизайн, сохраняйте их: свои классы можно добавлять рядом.

### Обязательные точки подключения

| Атрибут | На каком элементе | Зачем |
|---------|-------------------|-------|
| `data-mfilter` | корень формы | Инициализация инстанса |
| `data-mfilter-results` | обёртка результатов | Носитель метаданных (`hash`, `base-url`, `total`, `page-count`) и область, к которой привязываются клики пагинации |
| `data-mfilter-hash` | там же | Через него сервер находит конфиг вызова сниппета |
| `data-base-url` | там же | База для сборки SEO-URL |
| `data-page-count`, `data-total` | там же | Начальное состояние пагинации |
| `data-mfilter-keys` | там же | Список ключей фильтров страницы. По нему JS отличает свои URL-параметры от чужих (`utm_*`, `gclid`) |
| `mfilter-results` *(класс)* | контейнер внутри обёртки | Куда вставляется HTML результатов при AJAX |
| `mfilter-pagination` *(класс)* | контейнер пагинации | Куда вставляется HTML пагинации; по нему же делегируются клики |

::: tip Обёртка и контейнер — разные элементы
`data-mfilter-results` держит метаданные, а разметка подменяется внутри `.mfilter-results`. В стандартном `mfilter.outer` это внешний `div` с атрибутом и вложенный `div` с классом. Если оставить только атрибут, результаты обновляться не будут.
:::

::: danger Без `data-mfilter-hash` AJAX теряет ваши настройки
Через хэш сервер восстанавливает конфиг вызова: чанки, `limit`, `parents`, `depth`, `where`. Если атрибута нет, ответ рендерится **дефолтными** чанками с дефолтным лимитом — визуально это выглядит как «после фильтрации сбросился мой шаблон».

Атрибут выводится в `tplOuter` сниппета `mFilter` (в чанке доступна переменная `{$hash}`). Стандартный `mfilter.outer` его содержит; в свой чанк нужно добавить вручную. При отсутствии атрибута в консоль браузера выводится предупреждение.
:::

```html
{* @FILE chunks/mfilter/outer.tpl — обёртка результатов *}
<div class="mfilter-wrapper"
     data-mfilter-results
     data-mfilter-hash="{$hash}"
     data-mfilter-keys="{$filterKeys}"
     data-base-url="/{$_modx->resource.uri}"
     data-page-count="{$pageCount}"
     data-total="{$total}">

    {* Сюда вставляется HTML результатов при AJAX *}
    <div class="mfilter-results row">{$rows}</div>

    {if $pagination}
        <div class="mfilter-pagination">{$pagination}</div>
    {/if}
</div>
```

::: tip Зачем `data-mfilter-keys`
Без него JS определяет «свой ли это параметр» по наличию поля в форме. Фильтр, скрытый настройкой `min_values`, или отрисованный вне формы, поля не имеет — и его значение из URL терялось бы при первой же AJAX-фильтрации. Атрибут отдаёт список ключей с сервера, из набора фильтров страницы.

Если атрибута нет (старый чанк), JS откатывается к разбору полей формы; если нет и формы — принимает все параметры, как раньше.
:::

### Обязательные классы-хуки

| Класс | Где | Что делает JS |
|-------|-----|---------------|
| `mfilter-item` | обёртка одного значения | Точка входа: от неё ищется счётчик, на неё вешается признак недоступности |
| `mfilter-count` | элемент со счётчиком | Сюда пишется пересчитанное количество |
| `mfilter-item-label` | текст значения | Откуда блок «Выбрано» берёт подпись. Равноправная альтернатива — `mfilter-label`, либо атрибут `data-label` на самом `input` |
| `mfilter-range` | обёртка range-фильтра | Отслеживание изменений слайдера, пересчёт границ |
| `mfilter-filter-header` | заголовок блока фильтра | Название фильтра для группы в «Выбрано». Равноправные альтернативы — `mfilter-block-title` или атрибут `data-filter-label` |

Свои классы добавляются рядом:

```html
<div class="filter-checkbox filter-item mfilter-item">
    <input type="checkbox" name="{$key}[]" value="{$value | esc}" data-label="{$label | esc}">
    <label>
        <span class="mfilter-item-label">{$label | esc}</span>
        <span class="filter-count mfilter-count">{$count}</span>
    </label>
</div>
```

Если `mfilter-item` или `mfilter-count` отсутствуют, счётчики просто перестают обновляться при кросс-фильтрации — без ошибок в консоли и без видимых признаков поломки.

### Классы, которые JS ставит сам

| Класс | Когда |
|-------|-------|
| `mfilter-loading` | На корне во время запроса |
| `mfilter-item-empty` | На `.mfilter-item`, когда количество стало нулевым |

`mfilter-item-empty` нужно застилить — иначе недоступные значения визуально не изменятся:

```css
.filter-item.mfilter-item-empty {
    opacity: .5;
    pointer-events: none;
}
```

### Необязательные атрибуты

| Атрибут | Назначение |
|---------|------------|
| `data-mfilter-sort` | Управление сортировкой: `<select>` без значения либо `<button>`/`<a>` со значением в самом атрибуте |
| `data-mfilter-limit` | `<select>` количества на странице |
| `data-mfilter-tpl` | Переключатель вида (grid/list) |
| `data-mfilter-load-more` | Кнопка «Показать ещё» |
| `data-mfilter-pagination` | На корне формы: переопределяет селектор контейнера пагинации (по умолчанию `.mfilter-pagination`). Не является самим контейнером |
| `data-mfilter-results` | На корне формы: переопределяет селектор контейнера результатов (по умолчанию `.mfilter-results`) |
| `data-mfilter-selected` | Блок «Выбрано» |
| `data-mfilter-h1`, `data-mfilter-seo-text` | Обновление SEO-блоков при AJAX |
| `data-mfilter-zone` | Дополнительная зона обновления |
| `data-mfilter-url-separator`, `data-mfilter-values-separator` | Переопределение разделителей URL |

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
