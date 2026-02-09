# mSearch

Интеграция mFilter с mSearch — фильтрация результатов полнотекстового поиска.

## Принцип работы

1. mSearch находит ресурсы по поисковому запросу
2. mFilter фильтрует найденные результаты
3. Пользователь уточняет выдачу через фильтры

## Базовая настройка

### Сниппет

```php
{* Страница поиска *}
[[!mFilterForm]]

[[!mFilter?
    &element=`mSearch`
    &paginator=`pdoPage`
    &limit=`20`
    &tpl=`mfilter.row`
]]
```

### Форма поиска

```html
<form action="[[~15]]" method="get">
    <input type="text" name="query" value="{$_GET.query}" placeholder="Поиск...">
    <button type="submit">Найти</button>
</form>
```

## Параметры mSearch

```php
[[!mFilter?
    &element=`mSearch`
    &paginator=`pdoPage`

    // Параметры mSearch
    &queryVar=`query`
    &minQuery=`3`
    &htagOpen=`<mark>`
    &htagClose=`</mark>`

    // Где искать
    &resources=``
    &parents=`0`
    &includeTVs=`product_brand,product_material`

    // Параметры mFilter
    &limit=`20`
    &tpl=`mfilter.row`
]]
```

### Параметры mSearch

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| `queryVar` | GET-переменная с запросом | `query` |
| `minQuery` | Минимальная длина запроса | `3` |
| `htagOpen` | Открывающий тег подсветки | `<b>` |
| `htagClose` | Закрывающий тег подсветки | `</b>` |
| `includeTVs` | TV для поиска | `` |

## Набор фильтров

Создайте набор фильтров для страницы поиска:

```json
{
    "category": {
        "type": "parents",
        "source": "resource",
        "label": "Категория"
    },
    "template": {
        "type": "default",
        "source": "field",
        "field": "template",
        "label": "Тип контента"
    },
    "date": {
        "type": "month",
        "source": "field",
        "field": "publishedon",
        "label": "Дата публикации"
    }
}
```

## Шаблон результата

```html
{* @FILE chunks/search.result.tpl *}
<article class="search-result">
    <h3 class="search-result__title">
        <a href="{$uri}">{$pagetitle}</a>
    </h3>

    {if $introtext}
        <p class="search-result__excerpt">{$introtext}</p>
    {/if}

    <div class="search-result__meta">
        <span class="search-result__date">
            {$publishedon|date:'d.m.Y'}
        </span>
        {if $parent_pagetitle}
            <span class="search-result__category">
                {$parent_pagetitle}
            </span>
        {/if}
    </div>
</article>
```

## Расширенный поиск

### С фильтрами на одной странице

```html
<div class="search-page">
    {* Поисковая строка *}
    <form action="" method="get" class="search-form">
        <input type="text" name="query" value="{$_GET.query}">
        <button type="submit">Найти</button>
    </form>

    {* Результаты с фильтрами *}
    <div class="search-content">
        <aside class="search-filters">
            [[!mFilterForm]]
        </aside>

        <main class="search-results">
            <div data-mfilter-results>
                [[!mFilter?
                    &element=`mSearch`
                    &paginator=`pdoPage`
                    &tpl=`mfilter.row`
                ]]
            </div>

            <div data-mfilter-pagination>
                [[!+page.nav]]
            </div>
        </main>
    </div>
</div>
```

### Фильтры по типу контента

```json
{
    "content_type": {
        "type": "default",
        "source": "field",
        "field": "template",
        "label": "Тип",
        "values": {
            "1": "Статьи",
            "2": "Новости",
            "3": "Товары"
        }
    }
}
```

## AJAX-поиск

### JavaScript

```javascript
const searchForm = document.querySelector('.search-form');
const mfilter = window.mFilter.getInstance();

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const query = this.querySelector('input[name="query"]').value;

    // Обновить URL
    const url = new URL(window.location);
    url.searchParams.set('query', query);
    window.history.pushState({}, '', url);

    // Перезагрузить фильтры с новым запросом
    mfilter.submit();
});
```

### Сохранение запроса при фильтрации

```html
<form data-mfilter-form>
    {* Скрытое поле с поисковым запросом *}
    <input type="hidden" name="query" value="{$_GET.query}">

    {* Фильтры *}
    {$filters}
</form>
```

## Комбинация с MS3

### Поиск по товарам с фильтрами

```php
[[!mFilter?
    &element=`mSearch`
    &paginator=`pdoPage`

    // Ограничить поиск товарами
    &parents=`5`
    &where=`['class_key' => 'msProduct']`

    // Включить поля MS3
    &includeTVs=``
    &tpl=`tpl.msProducts.row`
]]
```

### Фильтры для товаров в поиске

```json
{
    "vendor": {
        "type": "vendors",
        "source": "ms3",
        "label": "Производитель"
    },
    "price": {
        "type": "number",
        "source": "resource",
        "field": "Data.price",
        "label": "Цена"
    },
    "category": {
        "type": "parents",
        "source": "resource",
        "label": "Категория"
    }
}
```

## SEO

### Noindex для поисковых страниц

Добавьте в SEO шаблон:

```json
{
    "conditions": {
        "search": true
    },
    "noindex": true
}
```

### Или в шаблоне страницы

```html
{if $_GET.query}
    <meta name="robots" content="noindex, follow">
{/if}
```

## Производительность

### Индексы mSearch

mSearch автоматически создаёт индексы. Убедитесь, что они актуальны:

```
Компоненты → mSearch → Переиндексировать
```

### Кэширование

```php
[[!mFilter?
    &element=`mSearch`
    &cache=`1`
    &cacheTime=`1800`
]]
```

## Отладка

### Проверка поискового запроса

```php
{if $_GET.query}
    <p>Поиск: {$_GET.query|escape}</p>
    <p>Найдено: {$mfilter.total}</p>
{/if}
```

### Логирование

Включите `mfilter.debug` для просмотра:

- Какие ID вернул mSearch
- Какие ID остались после фильтрации
