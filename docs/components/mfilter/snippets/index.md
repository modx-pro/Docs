# Сниппеты

mFilter предоставляет набор сниппетов для работы с фильтрацией, навигацией и SEO.

## Обзор

| Сниппет | Назначение |
|---------|------------|
| [mFilter](mfilter) | Вывод отфильтрованных результатов |
| [mFilterForm](mfilterform) | Рендеринг формы фильтров |
| [mFilterSelected](mfilterselected) | Отображение выбранных фильтров |
| [mFilterCrumbs](mfiltercrumbs) | Хлебные крошки с фильтрами |
| [mFilterNav](mfilternav) | SEO-навигация по фильтрам |
| [mFilterSitemap](mfiltersitemap) | Генерация sitemap для фильтров |

## Основные сниппеты

### mFilter + mFilterForm

Основная связка для фильтрации товаров:

```fenom
{* Форма фильтров в сайдбаре *}
<aside>
    {'!mFilterForm' | snippet}
</aside>

{* Результаты фильтрации *}
<main>
    {'!mFilter' | snippet : [
        'element' => 'msProducts',
        'paginator' => 'pdoPage',
        'parents' => $_modx->resource.id,
        'limit' => 24
    ]}

    {$_modx->getPlaceholder('page.nav')}
</main>
```

### mFilterSelected

Показывает текущие активные фильтры с возможностью их удаления:

```fenom
<main>
    {'!mFilterSelected' | snippet}

    {'!mFilter' | snippet : [...]}
</main>
```

## Вспомогательные сниппеты

### mFilterCrumbs

Хлебные крошки с поддержкой сегментов фильтров:

```fenom
{'!mFilterCrumbs' | snippet : [
    'schemaJsonLd' => true
]}
```

На странице `/catalog/color_red/` выведет:
```
Главная / Каталог / Красный
```

### mFilterNav

SEO-навигация по значениям фильтров:

```fenom
<nav class="brands">
    <h3>Бренды</h3>
    {'!mFilterNav' | snippet : [
        'filterKeys' => 'vendor_id',
        'showCount' => true,
        'element' => 'msProducts'
    ]}
</nav>
```

### mFilterSitemap

Генерация XML карты сайта для фильтрованных страниц:

```fenom
{'!mFilterSitemap' | snippet : [
    'priority' => '0.6',
    'changefreq' => 'weekly'
]}
```

## Режимы работы mFilter

### Element/Paginator режим (рекомендуемый)

Делегирует получение и рендеринг данных внешним сниппетам:

```fenom
{'!mFilter' | snippet : [
    'element' => 'msProducts',      {* Сниппет для данных *}
    'paginator' => 'pdoPage',       {* Сниппет для пагинации *}
    'parents' => 5,
    'limit' => 24,
    'tpl' => 'mfilter.row'
]}
```

**Как это работает:**
1. mFilter получает все ID товаров через `element` с `returnIds=1`
2. Применяет фильтры к этим ID
3. Передаёт отфильтрованные ID в `paginator`
4. `paginator` вызывает `element` для рендеринга

### Legacy режим

mFilter сам выполняет запросы и рендеринг (без внешних сниппетов):

```fenom
{'!mFilter' | snippet : [
    'parents' => 5,
    'limit' => 24,
    'tpl' => 'product.row',
    'class' => 'msProduct'
]}
```

Используется когда нужен полный контроль над запросом.

## AJAX

Все сниппеты поддерживают AJAX-обновление без перезагрузки страницы.

### Автоматический AJAX

По умолчанию включён. Форма отправляется через JavaScript, результаты обновляются динамически.

### Отключение AJAX

```fenom
{'!mFilterForm' | snippet : ['ajax' => 0]}
{'!mFilter' | snippet : ['ajax' => 0]}
```

### Режимы AJAX

| Режим | Описание |
|-------|----------|
| `form` | Отправка по нажатию кнопки |
| `instant` | Отправка при изменении любого фильтра |

```fenom
{'!mFilterForm' | snippet : ['ajaxMode' => 'instant']}
```

## Полный пример страницы каталога

```fenom
{* Хлебные крошки *}
{'!mFilterCrumbs' | snippet : ['schemaJsonLd' => true]}

<div class="catalog">
    <aside class="catalog-sidebar">
        {* Форма фильтров *}
        {'!mFilterForm' | snippet}

        {* SEO-навигация по брендам *}
        <nav class="brands-nav">
            <h4>Популярные бренды</h4>
            {'!mFilterNav' | snippet : [
                'filterKeys' => 'vendor_id',
                'limit' => 10,
                'element' => 'msProducts'
            ]}
        </nav>
    </aside>

    <main class="catalog-content">
        {* Выбранные фильтры *}
        {'!mFilterSelected' | snippet}

        {* Сортировка и вид *}
        <div class="catalog-toolbar">
            <select data-mfilter-sort>
                <option value="pagetitle-asc">По названию</option>
                <option value="price-asc">Сначала дешёвые</option>
                <option value="price-desc">Сначала дорогие</option>
            </select>
        </div>

        {* Результаты *}
        {'!mFilter' | snippet : [
            'element' => 'msProducts',
            'paginator' => 'pdoPage',
            'parents' => $_modx->resource.id,
            'limit' => 24
        ]}

        {* Пагинация *}
        {$_modx->getPlaceholder('page.nav')}
    </main>
</div>
```
