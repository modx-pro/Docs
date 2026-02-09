# mFilter

Основной сниппет для вывода отфильтрованных результатов.

## Параметры

### Режим Element/Paginator

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `element` | — | Сниппет для получения данных (msProducts, pdoResources, getTickets) |
| `paginator` | `pdoPage` | Сниппет для пагинации |
| `lexicons` | — | Дополнительные лексиконы для загрузки (через запятую) |

### Выборка данных

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `parents` | текущий ресурс | ID родительских ресурсов (через запятую) |
| `depth` | `10` | Глубина поиска в дочерних категориях |
| `limit` | `20` | Количество элементов на странице |
| `offset` | `0` | Начальное смещение |
| `sortby` | `pagetitle` | Поле сортировки |
| `sortdir` | `ASC` | Направление сортировки (ASC, DESC) |
| `where` | — | Дополнительные условия (JSON) |
| `select` | — | Поля для выборки (JSON) |

### Шаблоны

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `tpl` | `mfilter.row` | Шаблон одной строки результата |
| `tplOuter` | `mfilter.outer` | Внешний шаблон (обёртка) |
| `tplEmpty` | — | Шаблон для пустых результатов |
| `tplPagination` | `mfilter.pagination` | Шаблон пагинации |
| `tpls` | — | JSON с альтернативными шаблонами для переключения вида |

### TV и поля

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `includeTVs` | `false` | Включить TV в результаты |
| `processTVs` | — | Имена TV для обработки (через запятую) |

### Отображение

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `showHidden` | `false` | Показывать скрытые ресурсы |
| `showUnpublished` | `false` | Показывать неопубликованные |
| `showDeleted` | `false` | Показывать удалённые |

### AJAX

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `ajax` | `false` | Возвращать JSON для AJAX-запросов |
| `ajaxMode` | `full` | Режим AJAX: results, suggestions, full |

### Пагинация

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `pageParam` | `page` | Имя GET-параметра страницы |
| `totalVar` | `mfilter.total` | Плейсхолдер для общего количества |
| `pageCountVar` | `mfilter.pageCount` | Плейсхолдер для количества страниц |

### Вывод

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `toPlaceholders` | `false` | Вывести результаты в плейсхолдеры |
| `outputSeparator` | `\n` | Разделитель между строками |

## Примеры

### Базовый вызов с MiniShop3

```fenom
{'!mFilter' | snippet : [
    'element' => 'msProducts',
    'paginator' => 'pdoPage',
    'parents' => $_modx->resource.id,
    'limit' => 24,
    'tpl' => 'mfilter.row'
]}
```

### С pdoResources (без MS3)

```fenom
{'!mFilter' | snippet : [
    'element' => 'pdoResources',
    'paginator' => 'pdoPage',
    'parents' => $_modx->resource.id,
    'includeTVs' => 'image,price',
    'limit' => 20,
    'tpl' => 'catalog.row'
]}
```

### Переключение вида (grid/list)

```fenom
{* Кнопки переключения *}
<div class="view-toggle">
    <a href="?tpl=grid" data-mfilter-tpl="grid">Сетка</a>
    <a href="?tpl=list" data-mfilter-tpl="list">Список</a>
</div>

{'!mFilter' | snippet : [
    'element' => 'msProducts',
    'paginator' => 'pdoPage',
    'parents' => $_modx->resource.id,
    'tpl' => 'mfilter.grid',
    'tpls' => ['grid' => 'mfilter.grid', 'list' => 'mfilter.row']
]}
```

### Сортировка из URL

Сортировка определяется из SEO URL или GET-параметра `sort`:

```
/catalog/sort_price-asc/     → сортировка по цене (возрастание)
/catalog/?sort=price-desc    → сортировка по цене (убывание)
```

```fenom
{* Выпадающий список сортировки *}
<select data-mfilter-sort>
    <option value="pagetitle-asc">По названию</option>
    <option value="price-asc">Сначала дешёвые</option>
    <option value="price-desc">Сначала дорогие</option>
    <option value="createdon-desc">Новинки</option>
</select>

{'!mFilter' | snippet : [
    'element' => 'msProducts',
    'sortby' => 'pagetitle',
    'sortdir' => 'ASC'
]}
```

### Лимит из URL

```
/catalog/limit_48/           → 48 товаров на странице
/catalog/?limit=96           → 96 товаров на странице
```

```fenom
<select data-mfilter-limit>
    <option value="24">24</option>
    <option value="48">48</option>
    <option value="96">96</option>
</select>

{'!mFilter' | snippet : [
    'element' => 'msProducts',
    'limit' => 24
]}
```

### Дополнительные условия

```fenom
{'!mFilter' | snippet : [
    'element' => 'msProducts',
    'parents' => $_modx->resource.id,
    'where' => ['Data.price:>' => 0, 'Data.favorite' => 1]
]}
```

### Пустые результаты

```fenom
{'!mFilter' | snippet : [
    'element' => 'msProducts',
    'tplEmpty' => '@INLINE <p>Товары не найдены. Попробуйте изменить параметры фильтра.</p>'
]}
```

### Legacy режим (без element)

```fenom
{'!mFilter' | snippet : [
    'parents' => $_modx->resource.id,
    'class' => 'msProduct',
    'sortby' => 'pagetitle',
    'limit' => 20,
    'tpl' => 'msProducts.row',
    'includeTVs' => 'image'
]}
```

## Плейсхолдеры

После выполнения сниппета доступны плейсхолдеры:

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+mfilter.total]]` | Общее количество результатов |
| `[[+mfilter.pageCount]]` | Количество страниц |
| `[[+mfilter.page]]` | Текущая страница |
| `[[+mfilter.limit]]` | Элементов на странице |
| `[[+mfilter.sort]]` | Текущая сортировка (`price-asc`) |
| `[[+mfilter.sortBy]]` | Поле сортировки (`price`) |
| `[[+mfilter.sortDir]]` | Направление (`asc`) |

Для пагинации pdoPage:

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+page.nav]]` | HTML пагинации |
| `[[+page.total]]` | Всего элементов |
| `[[+page.pages]]` | Всего страниц |

## Интеграция с mSearch

```fenom
{'!mFilter' | snippet : [
    'element' => 'msProducts',
    'paginator' => 'pdoPage',
    'parents' => $_modx->resource.id,
    'search' => $_GET['mse_query']
]}
```

Подробнее: [Интеграция с mSearch](/components/mfilter/integration/msearch)
