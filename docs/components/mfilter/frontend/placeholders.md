# Плейсхолдеры

Все доступные плейсхолдеры mFilter.

## Глобальные плейсхолдеры

Устанавливаются на страницу и доступны везде.

### Основные

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+mfilter.total]]` | Общее количество результатов |
| `[[+mfilter.page]]` | Текущая страница |
| `[[+mfilter.pages]]` | Всего страниц |
| `[[+mfilter.limit]]` | Элементов на странице |
| `[[+mfilter.offset]]` | Смещение |

### URL и навигация

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+mfilter.url]]` | Текущий URL с фильтрами |
| `[[+mfilter.canonical]]` | Canonical URL |
| `[[+mfilter.baseUrl]]` | Базовый URL без фильтров |

### Активные фильтры

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+mfilter.hasFilters]]` | Есть ли активные фильтры (1/0) |
| `[[+mfilter.activeFilters]]` | JSON активных фильтров |
| `[[+mfilter.filterCount]]` | Количество активных фильтров |

### SEO

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+mfilter.seo.title]]` | SEO title |
| `[[+mfilter.seo.h1]]` | SEO H1 |
| `[[+mfilter.seo.description]]` | Meta description |
| `[[+mfilter.seo.text]]` | SEO текст |
| `[[+mfilter.seo.noindex]]` | Флаг noindex (1/0) |

## Fenom-переменные

В Fenom-шаблонах доступен объект `$mfilter`.

### Доступ к данным

```html
{* Количество *}
{$mfilter.total}

{* SEO *}
{$mfilter.seo.title}
{$mfilter.seo.h1}

{* Активные фильтры *}
{if $mfilter.hasFilters}
    <div class="active-filters">
        {foreach $mfilter.filters as $key => $values}
            {$key}: {$values|join:', '}
        {/foreach}
    </div>
{/if}

{* URL *}
{$mfilter.url}
{$mfilter.canonical}
```

## Плейсхолдеры формы (mFilterForm)

### tplOuter

| Переменная | Описание |
|------------|----------|
| `{$filters}` | Скомпилированный HTML всех фильтров |
| `{$hash}` | Хэш конфигурации для AJAX |
| `{$resource_id}` | ID текущего ресурса |
| `{$total}` | Количество результатов |
| `{$config}` | Массив конфигурации |

### tplFilter.outer

| Переменная | Описание |
|------------|----------|
| `{$key}` | Ключ фильтра (vendor, color...) |
| `{$label}` | Название фильтра |
| `{$type}` | Тип фильтра (default, number...) |
| `{$content}` | HTML значений фильтра |
| `{$selected}` | Есть ли выбранные значения |
| `{$config}` | Конфигурация фильтра |

### tplFilter.default / tplFilter.colors

| Переменная | Описание |
|------------|----------|
| `{$key}` | Ключ фильтра |
| `{$values}` | Массив значений |
| `{$values[].value}` | Значение |
| `{$values[].label}` | Отображаемый текст |
| `{$values[].count}` | Количество товаров |
| `{$values[].selected}` | Выбрано ли |
| `{$values[].disabled}` | Недоступно ли |
| `{$values[].hex}` | HEX цвета (для colors) |

### tplFilter.number

| Переменная | Описание |
|------------|----------|
| `{$key}` | Ключ фильтра |
| `{$min}` | Минимальное значение |
| `{$max}` | Максимальное значение |
| `{$step}` | Шаг |
| `{$selected.min}` | Выбранный минимум |
| `{$selected.max}` | Выбранный максимум |

### tplFilter.boolean

| Переменная | Описание |
|------------|----------|
| `{$key}` | Ключ фильтра |
| `{$label}` | Название |
| `{$selected}` | Выбрано ли (true/false) |
| `{$count}` | Количество товаров |

### tplValue.default

| Переменная | Описание |
|------------|----------|
| `{$key}` | Ключ фильтра |
| `{$value}` | Значение |
| `{$label}` | Отображаемый текст |
| `{$count}` | Количество |
| `{$selected}` | Выбрано |
| `{$disabled}` | Недоступно |
| `{$showCount}` | Показывать счётчик |

## Плейсхолдеры результатов (mFilter)

### Глобальные (устанавливаются в MODX)

```html
{* В шаблоне страницы *}
<h1>{$mfilter.seo.h1 ?: $pagetitle}</h1>

<div class="catalog-info">
    Найдено товаров: {$mfilter.total}
</div>

{if $mfilter.seo.text}
    <div class="seo-text">
        {$mfilter.seo.text}
    </div>
{/if}
```

### В шаблоне товара (tpl)

Стандартные плейсхолдеры element (msProducts, pdoResources):

```html
{* @FILE chunks/product.card.tpl *}
<div class="product-card" data-id="{$id}">
    <img src="{$image}" alt="{$pagetitle}">
    <h3>{$pagetitle}</h3>
    <div class="price">{$price|number:0} ₽</div>
</div>
```

## Использование в JavaScript

### Получение данных через data-атрибуты

```html
<div data-mfilter-config='{$config|json_encode}'></div>
```

```javascript
const config = JSON.parse(
    document.querySelector('[data-mfilter-config]').dataset.mfilterConfig
);
```

### Глобальный объект

```javascript
// После инициализации
const total = window.mFilter?.getInstance()?.getState().total;
```

## Примеры

### Хлебные крошки с фильтрами

```html
<nav class="breadcrumbs">
    <a href="/">Главная</a> /
    <a href="{$mfilter.baseUrl}">{$pagetitle}</a>
    {if $mfilter.hasFilters}
        / <span>{$mfilter.seo.h1}</span>
    {/if}
</nav>
```

### Блок «Выбрано»

```html
{if $mfilter.hasFilters}
    <div class="selected-filters">
        <span>Выбрано:</span>
        {foreach $mfilter.activeFilters as $key => $filter}
            {foreach $filter.values as $v}
                <span class="tag">
                    {$v.label}
                    <a href="{$v.removeUrl}">×</a>
                </span>
            {/foreach}
        {/foreach}
        <a href="{$mfilter.baseUrl}" class="clear-all">Сбросить всё</a>
    </div>
{/if}
```

### Мета-теги

```html
<head>
    {if $mfilter.seo.title}
        <title>{$mfilter.seo.title}</title>
    {else}
        <title>{$pagetitle} | {$site_name}</title>
    {/if}

    {if $mfilter.seo.description}
        <meta name="description" content="{$mfilter.seo.description}">
    {/if}

    {if $mfilter.seo.noindex}
        <meta name="robots" content="noindex, follow">
    {/if}

    <link rel="canonical" href="{$mfilter.canonical}">
</head>
```

### Пустые результаты

```html
{if $mfilter.total == 0}
    <div class="empty-results">
        <p>По вашему запросу ничего не найдено.</p>
        {if $mfilter.hasFilters}
            <p>Попробуйте <a href="{$mfilter.baseUrl}">сбросить фильтры</a>.</p>
        {/if}
    </div>
{/if}
```
