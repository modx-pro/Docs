# Быстрый старт

Пошаговое руководство по настройке фасетной фильтрации для каталога товаров MiniShop3.

## Шаг 1: Установка

1. Установите mFilter через менеджер пакетов MODX
2. Убедитесь что установлены зависимости: pdoTools 3.x, VueTools

## Шаг 2: Создание набора фильтров

1. Перейдите в **Extras → mFilter → Наборы фильтров**
2. Нажмите **Создать**
3. Заполните:
   - **Название** — например, "Каталог электроники"
   - **Активен** — Да
4. Сохраните набор

### Добавление фильтров

В созданном наборе перейдите на вкладку **Фильтры** и добавьте нужные:

| Ключ | Тип | Источник | Описание |
|------|-----|----------|----------|
| `vendor` | vendors | ms3 | Производители MS3 |
| `color` | default | option | Опция "Цвет" |
| `size` | default | option | Опция "Размер" |
| `price` | number | field | Поле цены (диапазон) |
| `new` | boolean | field | Флаг "Новинка" |

### Привязка к категориям

На вкладке **Привязки**:

1. Выберите категории каталога в дереве ресурсов
2. Набор фильтров будет работать на выбранных страницах и их дочерних

## Шаг 3: Добавление сниппетов

В комплекте с mFilter идёт готовый шаблон каталога. Создайте шаблон страницы категории на его основе:

```fenom
<div class="catalog-wrapper">
    <!-- Сайдбар с фильтрами -->
    <aside class="catalog-sidebar">
        {'!mFilterForm' | snippet : [
            'resourceId' => $_modx->resource.id
        ]}
    </aside>

    <!-- Основной контент с товарами -->
    <div class="catalog-content">
        {'!mFilter' | snippet : [
            'element' => 'msProducts',
            'parents' => $_modx->resource.id,
            'includeThumbs' => 'small,medium',
            'limit' => 12,
            'sortby' => 'menuindex',
            'sortdir' => 'ASC',
            'tplOuter' => 'mfilter.outer',
            'tpl' => 'tpl.msProducts.row',
            'tpls' => ['tpl1' => 'mfilter.grid', 'tpl2' => 'mfilter.row']
        ]}
    </div>
</div>
```

### Подключение стилей и скриптов

В `<head>` шаблона:

```html
<!-- noUISlider для слайдеров диапазонов -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nouislider@15/dist/nouislider.min.css">

<!-- CSS mFilter -->
<link rel="stylesheet" href="/assets/components/mfilter/css/web/mfilter.css">
```

Перед `</body>`:

```html
<!-- noUISlider JS -->
<script src="https://cdn.jsdelivr.net/npm/nouislider@15/dist/nouislider.min.js"></script>

<!-- mFilter JS (порядок важен!) -->
<script src="/assets/components/mfilter/js/web/mfilter.core.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.api.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.ui.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.slider.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.js"></script>
```

::: tip Готовый шаблон
Полный пример шаблона находится в `core/components/mfilter/elements/templates/catalog.tpl`
:::

## Шаг 4: Базовая стилизация

mFilter подключает базовые стили автоматически. Для кастомизации переопределите CSS-классы:

```css
/* Форма фильтров */
.mfilter-form { }

/* Блок одного фильтра */
.mfilter-filter { }
.mfilter-filter-title { }

/* Элементы фильтра */
.mfilter-item { }
.mfilter-item label { }
.mfilter-count { }

/* Диапазон (слайдер) */
.mfilter-range { }

/* Состояние загрузки */
.mfilter-loading { }
```

## Шаг 5: Проверка работы

1. Откройте страницу категории на сайте
2. Выберите значения в фильтрах
3. Результаты должны обновиться через AJAX
4. URL должен измениться на SEO-friendly формат

## Настройка SEO (опционально)

### SEO шаблоны

Для динамических title/description перейдите в **mFilter → SEO шаблоны**:

```
Title: {$resource.pagetitle} {$filters.vendor} {$filters.color} — купить в Москве
Description: {$filters.vendor} {$filters.color} в наличии. Цены от {$price.min} руб.
H1: {$filters.vendor} {$filters.color}
```

### Словоформы

Для правильного склонения создайте словоформы в **mFilter → Словоформы**:

| Слово | Родительный | Дательный | Винительный | Творительный | Предложный |
|-------|-------------|-----------|-------------|--------------|------------|
| Apple | Apple | Apple | Apple | Apple | Apple |
| красный | красного | красному | красный | красным | красном |

## Примеры вызова

### Минимальный вызов

```fenom
{'!mFilterForm' | snippet : ['resourceId' => $_modx->resource.id]}
{'!mFilter' | snippet : ['element' => 'msProducts']}
```

### С pdoResources (без MS3)

```fenom
{'!mFilterForm' | snippet : ['resourceId' => $_modx->resource.id]}
{'!mFilter' | snippet : [
    'element' => 'pdoResources',
    'paginator' => 'pdoPage',
    'parents' => $_modx->resource.id,
    'includeTVs' => 'image,price,brand',
    'tpl' => 'mfilter.grid'
]}
```

### С кастомными параметрами

```fenom
{'!mFilterForm' | snippet : [
    'resourceId' => $_modx->resource.id,
    'filters' => 'vendor,color,price',
    'exclude' => 'size',
    'tpl' => 'mfilter.filter',
    'sortByCount' => 1
]}

{'!mFilter' | snippet : [
    'element' => 'msProducts',
    'paginator' => 'pdoPage',
    'parents' => $_modx->resource.id,
    'limit' => 24,
    'sortby' => 'price',
    'sortdir' => 'ASC',
    'tpl' => 'mfilter.row',
    'tpls' => ['grid' => 'mfilter.grid', 'list' => 'mfilter.row']
]}
```

## Что дальше

- [Системные настройки](settings) — все доступные настройки
- [Сниппет mFilter](snippets/mfilter) — подробное описание параметров
- [Сниппет mFilterForm](snippets/mfilterform) — настройка формы фильтров
- [Интеграция с mSearch](integration/msearch) — поиск + фильтрация
- [JS API](development/js-api) — программное управление фильтрами
