# Быстрый старт

Пошаговое руководство по настройке фасетной фильтрации для каталога товаров MiniShop3.

## Шаг 1: Установка

1. Установите mFilter через **Установщик → Загрузить дополнения** в админке MODX
2. Убедитесь, что установлены зависимости: **pdoTools 3.x**, **VueTools**
3. *(опционально, но рекомендуется)* — установите **Scheduler** для фоновых задач (пересборка индекса фасетов, очистка stale-данных)

После установки сразу зайдите в **Установщик → mFilter** и нажмите кнопку **«Построить индекс»** в правом верхнем углу — без этого фильтрация будет работать в медленном режиме fallback. Если установлен Scheduler, индекс соберётся автоматически в фоне.

## Шаг 2: Создание набора фильтров

1. Перейдите в **Установщик → mFilter → Наборы фильтров**
2. Нажмите **Создать**
3. Введите название (например, «Каталог электроники») и убедитесь, что включён флаг **Активен**

### Добавление фильтров

В открытой форме набора в секции **Фильтры** нажмите **+ Добавить фильтр** для каждого фильтра. Заполните строки:

| Ключ | Источник | Тип | Заголовок |
|------|----------|-----|-----------|
| `vendor_id` | *(оставить пустым)* | Производители | Производитель |
| `color` | *(оставить пустым)* | Цвета | Цвет |
| `size` | *(оставить пустым)* | Стандартный | Размер |
| `price` | *(оставить пустым)* | Числовой (диапазон) | Цена |
| `made_in` | *(оставить пустым)* | Стандартный | Страна производства |

::: tip Источник можно не указывать
Источник определяется автоматически по ключу: для известных полей `msProductData` (`price`, `weight`, `vendor_id`, `made_in`...) — `product`, иначе — `option` (если установлен MiniShop3) или `resource` (для полей `modResource`).

Указывайте источник явно только если хотите перебить эту логику или используете кастомный source.
:::

### Привязка к категориям

Внизу формы набора:

1. **Наследование на дочерние страницы** — оставьте включённым, чтобы набор работал во всех вложенных категориях
2. В дереве ресурсов выберите корневые категории каталога (например, «Каталог»)
3. Сохраните набор

### Авто-индексация

Сразу после сохранения mFilter инкрементально достроит индекс фасетов для добавленных ключей. На каталоге 30k это занимает 1–3 секунды.

## Шаг 3: Сниппеты на странице каталога

В комплекте идёт готовый шаблон `core/components/mfilter/elements/templates/catalog.tpl`. Вы можете использовать его как образец.

Минимальный вариант:

```fenom
<div class="catalog-wrapper">
    {* Сайдбар с фильтрами *}
    <aside class="catalog-sidebar">
        {'!mFilterForm' | snippet}
    </aside>

    {* Основной контент с товарами *}
    <main class="catalog-content">
        {* Выбранные фильтры *}
        {'!mFilterSelected' | snippet}

        {* Результаты *}
        {'!mFilter' | snippet : [
            'element' => 'msProducts',
            'paginator' => 'pdoPage',
            'parents' => $_modx->resource.id,
            'limit' => 24,
            'tpl' => 'tpl.msProducts.row',
            'tplOuter' => 'mfilter.outer'
        ]}

        {* Пагинация *}
        {$_modx->getPlaceholder('page.nav')}
    </main>
</div>
```

::: tip Хлебные крошки
`{'!mFilterCrumbs' | snippet}` — добавляет в крошки сегменты активных фильтров и поддерживает Schema.org / JSON-LD.
:::

### Подключение CSS/JS

CSS и JS подключаются **автоматически** через плагин mFilter (системная настройка `mfilter.register_frontend = true` по умолчанию). Список файлов хранится в `mfilter.frontend_assets` и обновляется при апгрейде пакета.

Внешняя зависимость — **noUiSlider** для range-фильтров. mFilter не включает его в свой комплект, подключите самостоятельно:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nouislider@15/dist/nouislider.min.css">
<script src="https://cdn.jsdelivr.net/npm/nouislider@15/dist/nouislider.min.js"></script>
```

Если фильтры с диапазоном не используются — noUiSlider не нужен.

::: tip Ручное подключение
Если автоподключение мешает (например, нужен свой порядок загрузки) — выключите `mfilter.register_frontend` и подключите CSS/JS вручную. Список файлов смотрите в [Системные настройки → Фронтенд](settings#фронтенд).
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
3. Результаты обновятся через AJAX (если в шаблоне есть форма с `data-mfilter`)
4. URL обновится в формат `/catalog/vendor_id--apple/color--black/`

Если фильтрация работает медленно (несколько секунд) на каталоге 30k+ — убедитесь, что **построен индекс фасетов**: **mFilter → Обслуживание → Индекс фасетов** должен показывать статус «Активен».

## Настройка SEO (опционально)

### SEO-шаблоны

Для динамических title/description: **mFilter → SEO шаблоны**.

Шаблон применяется когда активен **точно** этот набор ключей фильтров (не больше, не меньше). Доступны плейсхолдеры значений: `{$filters.vendor_id}`, `{$filters.color}` и т.п. (выводят первое выбранное значение для ключа).

Пример:

```
Title: {$resource.pagetitle} {$filters.vendor_id} {$filters.color} — купить
H1: {$filters.vendor_id} {$filters.color}
Description: {$filters.vendor_id} {$filters.color} в наличии. Доставка по всей России.
```

Подробнее: [SEO-шаблоны](interface/seo-templates).

### Словоформы

Для правильного склонения значений в SEO-текстах: **mFilter → Словоформы**. Поддерживаются 6 падежей × 2 числа + дополнительные формы «где/куда/откуда» для топонимов.

Можно автоматически генерировать через [Morpher API](settings#словоформы), указав `mfilter.morpher_api_key`.

Подробнее: [Словоформы](interface/word-forms).

## Альтернативные сценарии

### Без MiniShop3 (pdoResources)

```fenom
{'!mFilterForm' | snippet}

{'!mFilter' | snippet : [
    'element' => 'pdoResources',
    'paginator' => 'pdoPage',
    'parents' => $_modx->resource.id,
    'includeTVs' => 'image,brand',
    'tpl' => 'mfilter.grid'
]}
```

### С указанием конкретных фильтров формы

```fenom
{* Сайдбар: только vendor + color + price *}
{'!mFilterForm' | snippet : [
    'filters' => 'vendor_id,color,price',
    'sortByCount' => 1
]}

{* Отдельно: панель размеров над товарами *}
{'!mFilterForm' | snippet : [
    'filters' => 'size',
    'tplOuter' => '@INLINE <div class="size-bar">{$output}</div>'
]}
```

### С переключением вида (grid/list)

```fenom
<div class="view-toggle">
    <a href="?tpl=tpl1" data-mfilter-tpl="tpl1">Сетка</a>
    <a href="?tpl=tpl2" data-mfilter-tpl="tpl2">Список</a>
</div>

{'!mFilter' | snippet : [
    'element' => 'msProducts',
    'paginator' => 'pdoPage',
    'parents' => $_modx->resource.id,
    'tpl' => 'mfilter.grid',
    'tpls' => ['tpl1' => 'mfilter.grid', 'tpl2' => 'mfilter.row']
]}
```

## Что дальше

- [Системные настройки](settings) — все доступные настройки
- [Сниппет mFilter](snippets/mfilter) — параметры основного сниппета
- [Сниппет mFilterForm](snippets/mfilterform) — параметры формы и шаблоны
- [Сниппет mFilterSelected](snippets/mfilterselected) — блок выбранных фильтров
- [Сниппет mFilterCrumbs](snippets/mfiltercrumbs) — хлебные крошки с фильтрами
- [Обслуживание](interface/maintenance) — индекс фасетов, кэш, диагностика
- [Интеграция с mSearch](integration/msearch) — поиск + фильтрация
- [JS API](development/js-api) — программное управление фильтрами
