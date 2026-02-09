# mFilterCrumbs

Сниппет для вывода хлебных крошек с поддержкой сегментов фильтров и SEO-разметкой.

## Описание

mFilterCrumbs расширяет функциональность pdoCrumbs, добавляя сегменты фильтров в хлебные крошки на страницах с активными фильтрами.

**Особенности:**
- На обычных страницах — работает как pdoCrumbs
- На фильтрованных страницах — добавляет сегменты фильтров как дополнительные элементы
- Поддержка Schema.org Microdata разметки
- Опциональный JSON-LD структурированный вывод
- Полная совместимость со всеми параметрами pdoCrumbs

## Параметры

### Специфичные параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `showFilterCrumbs` | `true` | Показывать сегменты фильтров в хлебных крошках |
| `tplFilterCrumb` | из `&tpl` | Шаблон для элемента-фильтра |
| `schemaJsonLd` | `false` | Добавить JSON-LD разметку в конец вывода |

### Шаблоны (pdoCrumbs)

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `tpl` | встроенный с Microdata | Шаблон элемента крошки |
| `tplCurrent` | встроенный | Шаблон текущего элемента (без ссылки) |
| `tplHome` | — | Шаблон для главной страницы |
| `tplWrapper` | встроенный с nav/ol | Обёртка всего списка |

### Поведение (pdoCrumbs)

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `showCurrent` | `true` (на фильтрованных) | Показывать текущий элемент |
| `showHome` | `true` | Показывать главную страницу |
| `fastMode` | `false` | Быстрый режим парсинга чанков |
| `outputSeparator` | (пусто) | Разделитель между элементами |

### Вывод

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `toPlaceholder` | — | Вывести в плейсхолдер вместо возврата |
| `return` | — | `data` — вернуть массив вместо HTML |

## Плейсхолдеры в шаблонах

### Стандартные (от pdoCrumbs)

| Плейсхолдер | Описание |
|-------------|----------|
| `{$id}` | ID ресурса (0 для фильтров) |
| `{$pagetitle}` | Заголовок страницы / значение фильтра |
| `{$menutitle}` | Заголовок меню / значение фильтра |
| `{$longtitle}` | Длинный заголовок |
| `{$link}` | URL элемента |
| `{$idx}` | Порядковый номер |
| `{$position}` | Позиция для Schema.org |

### Специфичные для фильтров

| Плейсхолдер | Описание |
|-------------|----------|
| `{$is_filter}` | true, если это элемент фильтра |
| `{$filter_key}` | Ключ фильтра (color, size, price...) |
| `{$filter_label}` | Локализованная метка фильтра |
| `{$filter_values}` | Массив значений фильтра |

## Примеры

### Базовый вызов

```fenom
{'!mFilterCrumbs' | snippet}
```

### С JSON-LD разметкой

```fenom
{'!mFilterCrumbs' | snippet : [
    'schemaJsonLd' => true
]}
```

Выводит дополнительно:

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Главная", "item": "https://site.ru/"},
        {"@type": "ListItem", "position": 2, "name": "Каталог", "item": "https://site.ru/catalog/"},
        {"@type": "ListItem", "position": 3, "name": "Красный"}
    ]
}
</script>
```

### Кастомные шаблоны

```fenom
{'!mFilterCrumbs' | snippet : [
    'tpl' => '@INLINE <li><a href="{$link}">{$menutitle}</a></li>',
    'tplCurrent' => '@INLINE <li class="active">{$menutitle}</li>',
    'tplWrapper' => '@INLINE <nav><ul class="breadcrumb">{$output}</ul></nav>'
]}
```

### Без фильтров в крошках

```fenom
{'!mFilterCrumbs' | snippet : [
    'showFilterCrumbs' => false
]}
```

### Вывод в плейсхолдер

```fenom
{'!mFilterCrumbs' | snippet : [
    'toPlaceholder' => 'crumbs'
]}

{* Позже в шаблоне *}
{$_modx->getPlaceholder('crumbs')}
```

### Получение данных массивом

```fenom
{set $crumbs = '!mFilterCrumbs' | snippet : ['return' => 'data']}
{foreach $crumbs as $crumb}
    {$crumb.menutitle} ({$crumb.link})
{/foreach}
```

## SEO-разметка

По умолчанию сниппет выводит Schema.org Microdata разметку:

```html
<nav class="mfilter-crumbs" aria-label="Breadcrumb">
<ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="/"><span itemprop="name">Главная</span></a>
        <meta itemprop="position" content="1">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="/catalog/"><span itemprop="name">Каталог</span></a>
        <meta itemprop="position" content="2">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <span itemprop="name">Красный</span>
        <meta itemprop="position" content="3">
    </li>
</ol>
</nav>
```

## CSS стили

Базовые стили включены в `mfilter.css`:

```css
.mfilter-crumbs ol {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
}

.mfilter-crumbs li:not(:last-child)::after {
    content: '/';
    margin-left: 0.5rem;
    color: var(--mfilter-text-muted, #6c757d);
}
```
