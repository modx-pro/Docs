# mFilterNav

Сниппет для создания SEO-навигации на основе значений фильтров.

## Описание

mFilterNav генерирует навигационные меню из значений фильтров — например, список цветов, брендов или категорий со ссылками на отфильтрованные страницы. Параметры стилизованы под pdoMenu для удобства.

**Применение:**
- SEO перелинковка в футере или сайдбаре
- Навигация по брендам / производителям
- Облако тегов / характеристик
- Фильтры-ссылки вместо чекбоксов

## Параметры

### Основные

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `parents` | `0` (текущий) | ID родительского ресурса |
| `filterKeys` | — | Ключи фильтров для отображения (через запятую) |

### Источник данных (для счётчиков)

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `element` | — | Сниппет для получения ID (msProducts, pdoResources) |
| `depth` | `10` | Глубина поиска для element |

### Шаблоны (стиль pdoMenu)

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `tpl` | встроенный | Шаблон элемента ссылки |
| `tplOuter` | `@INLINE <ul>{$output}</ul>` | Внешняя обёртка |
| `tplGroup` | — | Обёртка группы (для группировки по filterKey) |
| `tplHere` | — | Шаблон активного элемента |

### CSS классы (стиль pdoMenu)

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `firstClass` | `first` | Класс первого элемента |
| `lastClass` | `last` | Класс последнего элемента |
| `hereClass` | `active` | Класс активного элемента |
| `rowClass` | — | Класс для всех элементов |
| `outerClass` | — | Класс внешней обёртки |

### Поведение

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `showCount` | `false` | Показывать количество товаров |
| `hideEmpty` | `true` | Скрывать элементы с count=0 |
| `sortBy` | `label` | Сортировка: label, count, sort_order |
| `sortDir` | `ASC` | Направление: ASC, DESC |
| `limit` | `0` | Лимит элементов (0 = без лимита) |

### Кэширование

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `cache` | `false` | Включить кэширование |
| `cacheTime` | `3600` | Время жизни кэша (секунды) |

## Плейсхолдеры в шаблонах

### tpl / tplHere

| Плейсхолдер | Описание |
|-------------|----------|
| `{$url}` | URL отфильтрованной страницы |
| `{$label}` | Метка значения |
| `{$value}` | Оригинальное значение |
| `{$slug}` | Slug значения |
| `{$filterKey}` | Ключ фильтра |
| `{$count}` | Количество товаров |
| `{$hasCount}` | true, если count доступен |
| `{$showCount}` | Значение параметра showCount |
| `{$idx}` | Порядковый номер (с 1) |
| `{$isActive}` | true, если фильтр активен |
| `{$isFirst}` | true, если первый элемент |
| `{$isLast}` | true, если последний элемент |
| `{$classNames}` | Собранные CSS классы |

### tplOuter

| Плейсхолдер | Описание |
|-------------|----------|
| `{$output}` | HTML всех элементов |
| `{$outerClass}` | Класс обёртки |

### tplGroup

| Плейсхолдер | Описание |
|-------------|----------|
| `{$output}` | HTML элементов группы |
| `{$filterKey}` | Ключ фильтра |
| `{$count}` | Количество элементов |

## Примеры

### Навигация по брендам

```fenom
<nav class="brands-nav">
    <h3>Бренды</h3>
    {'!mFilterNav' | snippet : [
        'parents' => $_modx->resource.id,
        'filterKeys' => 'vendor_id',
        'sortBy' => 'label'
    ]}
</nav>
```

### Навигация по цветам с количеством

```fenom
{'!mFilterNav' | snippet : [
    'parents' => $_modx->resource.id,
    'filterKeys' => 'color',
    'element' => 'msProducts',
    'showCount' => true,
    'hideEmpty' => true,
    'tpl' => '@INLINE <li class="{$classNames}">
        <a href="{$url}">{$label} ({$count})</a>
    </li>'
]}
```

### Несколько фильтров с группировкой

```fenom
{'!mFilterNav' | snippet : [
    'parents' => $_modx->resource.id,
    'filterKeys' => 'brand,color,size',
    'tplGroup' => '@INLINE <div class="filter-group">
        <h4>{$filterKey}</h4>
        <ul>{$output}</ul>
    </div>',
    'tplOuter' => '@INLINE <div class="filter-nav">{$output}</div>'
]}
```

### Топ-10 популярных значений

```fenom
{'!mFilterNav' | snippet : [
    'parents' => $_modx->resource.id,
    'filterKeys' => 'brand',
    'element' => 'msProducts',
    'showCount' => true,
    'sortBy' => 'count',
    'sortDir' => 'DESC',
    'limit' => 10
]}
```

### Горизонтальное меню

```fenom
{'!mFilterNav' | snippet : [
    'parents' => $_modx->resource.id,
    'filterKeys' => 'category',
    'outerClass' => 'nav nav-pills',
    'rowClass' => 'nav-item',
    'hereClass' => 'active',
    'tpl' => '@INLINE <li class="{$classNames}">
        <a class="nav-link{if $isActive} active{/if}" href="{$url}">{$label}</a>
    </li>'
]}
```

### Со своим классом для активного

```fenom
{'!mFilterNav' | snippet : [
    'parents' => $_modx->resource.id,
    'filterKeys' => 'color',
    'hereClass' => 'is-selected',
    'tplHere' => '@INLINE <li class="{$classNames}">
        <span class="current">{$label}</span>
    </li>'
]}
```

### Алфавитный указатель

```fenom
{* Сортировка по названию *}
{'!mFilterNav' | snippet : [
    'parents' => $_modx->resource.id,
    'filterKeys' => 'brand',
    'sortBy' => 'label',
    'sortDir' => 'ASC',
    'outerClass' => 'brand-index'
]}
```

## SEO применение

### Перелинковка в футере

```fenom
<footer>
    <div class="footer-links">
        <div class="footer-col">
            <h4>Популярные бренды</h4>
            {'!mFilterNav' | snippet : [
                'parents' => 5,
                'filterKeys' => 'vendor_id',
                'limit' => 10,
                'sortBy' => 'count',
                'sortDir' => 'DESC',
                'element' => 'msProducts'
            ]}
        </div>
        <div class="footer-col">
            <h4>По цвету</h4>
            {'!mFilterNav' | snippet : [
                'parents' => 5,
                'filterKeys' => 'color',
                'element' => 'msProducts',
                'hideEmpty' => true
            ]}
        </div>
    </div>
</footer>
```

### Sidebar навигация

```fenom
<aside class="catalog-sidebar">
    {* Основная форма фильтров *}
    {'!mFilterForm' | snippet}

    {* Дополнительная текстовая навигация *}
    <div class="sidebar-links">
        <h4>Быстрый выбор</h4>
        {'!mFilterNav' | snippet : [
            'filterKeys' => 'brand,color',
            'limit' => 5,
            'showCount' => true,
            'element' => 'msProducts'
        ]}
    </div>
</aside>
```

## Отличие от mFilterForm

| mFilterForm | mFilterNav |
|-------------|------------|
| Интерактивная форма | Статические ссылки |
| Чекбоксы, слайдеры | Только ссылки |
| AJAX обновление | Переход по URL |
| Комбинирование фильтров | Один фильтр на ссылку |
| Для пользователя | Для SEO / навигации |

## Рекомендации

- Используйте `hideEmpty` для скрытия пустых значений
- `element` нужен только если используете `showCount` или `hideEmpty`
- Для SEO-навигации кэширование (`cache => true`) рекомендуется
- Ограничивайте `limit` для длинных списков
