# Плейсхолдеры

Справочник по всем плейсхолдерам и переменным, которые mFilter выставляет в MODX и чанки.

## Синтаксис

MODX-плейсхолдер `mfilter.something` доступен из шаблона тремя способами:

- **MODX-тег:** `[[+mfilter.something]]`
- **Fenom (`pdoTools`), через массив `$_pls`:** `{$_pls['mfilter.something']}`
- **Внутри Fenom-чанков `pdoTools`** (`getChunk`/`parseChunk`) — как обычная переменная: `{$something}` (только если она была передана в `parseChunk` явно, см. секции по чанкам ниже).

::: warning
Записи вида `{$mfilter.something}` (dot-notation через переменную `$mfilter`) **не работают** — такой переменной в Fenom-scope нет. Используйте `$_pls['mfilter.something']`.
:::

## Глобальные плейсхолдеры

Устанавливаются плагином `mfilter` при `OnHandleRequest` для страницы каталога с активными фильтрами, и/или сниппетом `mFilter` во время рендера. Доступны в шаблоне ресурса и любом чанке, вызванном ниже по цепочке.

### Активные фильтры и URL

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `mfilter.filters` | array | Активные фильтры: `['brand' => ['apple'], 'color' => ['red']]` |
| `mfilter.activeFilters` | array | Синоним `mfilter.filters` |
| `mfilter.base_uri` | string | URI страницы каталога без сегмента фильтров (`/catalog/`) |
| `mfilter.filter_uri` | string | Сегмент фильтров, добавляемый после `base_uri` (`brand--apple/color--red/`) |
| `mfilter.baseIds` | array | ID товаров текущей выборки (устанавливается сниппетом `mFilter`) |

### Сортировка и пагинация

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `mfilter.sort` | string | Текущая сортировка: `"pagetitle-asc"`, `"price-desc"` |
| `mfilter.sortBy` | string | Только поле: `"pagetitle"`, `"price"` |
| `mfilter.sortDir` | string | Только направление: `"asc"` / `"desc"` |
| `mfilter.limit` | int | Текущий лимит на странице |
| `mfilter.defaultLimit` | int | Дефолтный лимит из настроек (для сравнения) |
| `mfilter.page` | int | Текущая страница |
| `mfilter.tpl` | string | Активный шаблон карточки (`"tpl1"`, `"tpl2"`) |

### SEO

Устанавливаются, когда есть хотя бы один активный фильтр. На нефильтрованных страницах — пустые (`noindex` — `false`).

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `mfilter.seo.title` | string | SEO title из SEO Templates |
| `mfilter.seo.h1` | string | SEO H1 |
| `mfilter.seo.description` | string | SEO meta description |
| `mfilter.seo.canonical` | string | Canonical URL (при `noindex` указывает на страницу без фильтров) |
| `mfilter.seo.noindex` | bool | Флаг noindex (см. [Системные настройки](../settings.md#seo-оптимизация)) |
| `mfilter.seo.text` | string | Произвольный SEO-текст из SEO Templates |

### Прочее

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `mfilter.hash` | string | Хэш конфигурации формы (для валидации AJAX) |
| `mfilter.results` | string | HTML отрендеренных карточек (только при `&toPlaceholders=1` в сниппете `mFilter`) |
| `mfilter.pagination` | string | HTML пагинации (только при `&toPlaceholders=1`) |

::: warning `toPlaceholders=1`
Использование `&toPlaceholders=1` в вызове сниппета `mFilter` разбивает вывод на `mfilter.results` и `mfilter.pagination` **без оборачивающего** `tplOuter`-чанка. Теряются `data-mfilter-results`, `data-page-count` и вся SSR-инициализация — фронтенд-JS не сможет её подхватить. Используйте обычный вывод сниппета и оборачивающий чанк `tplOuter`.
:::

## Использование в шаблоне ресурса

### SEO-теги в `<head>`

```html
<title>{$_pls['mfilter.seo.title'] ?: $_modx->resource.pagetitle}</title>
<meta name="description" content="{$_pls['mfilter.seo.description'] ?: $_modx->resource.description}">

{if $_pls['mfilter.seo.canonical']}
    <link rel="canonical" href="{$_pls['mfilter.seo.canonical']}">
{/if}

{if $_pls['mfilter.seo.noindex']}
    <meta name="robots" content="noindex, follow">
{/if}
```

Логика фолбэков: если фильтров нет, `mfilter.seo.*` пусты, и `?:` возвращает стандартное значение ресурса.

::: tip Почему `noindex, follow`, а не `noindex, nofollow`
JS-часть при AJAX-обновлении фильтров всегда выставляет `content="noindex, follow"` — это лучше для SEO, чем `nofollow` (link equity со страницы каталога с фильтрами продолжает распределяться по товарам). Чтобы SSR-разметка не рассогласовывалась с AJAX-состоянием, в шаблоне тоже указывайте `follow`.
:::

### H1 и SEO-текст в теле страницы

::: warning Обязательные маркеры для AJAX
`<h1>` и контейнер SEO-текста нужно **явно пометить** атрибутом или классом — иначе JS не найдёт их при AJAX-фильтрации и они обновятся только после `F5`. У страницы может быть несколько `<h1>` (hero, sidebar), поэтому просто «первый h1» не подходит.

- `<h1>` — атрибут `data-mfilter-h1` или класс `mfilter-h1`
- SEO-текст — атрибут `data-mfilter-seo-text` или класс `mfilter-seo-text`
:::

```html
<h1 data-mfilter-h1>{$_pls['mfilter.seo.h1'] ?: $_modx->resource.pagetitle}</h1>

<div data-mfilter-seo-text{if !$_pls['mfilter.seo.text']} style="display:none"{/if}>
    {$_pls['mfilter.seo.text']}
</div>
```

При AJAX-фильтрации JS сам управляет `display` контейнера SEO-текста (скрывает при пустом значении, показывает при заполненном), поэтому inline-`display:none` при пустом SSR-значении — только чтобы контейнер не мелькал до первой фильтрации.

### Хлебные крошки с фильтрами

```html
<nav class="breadcrumbs">
    <a href="/">Главная</a>
    /
    <a href="{$_pls['mfilter.base_uri'] ?: $_modx->makeUrl($_modx->resource.id)}">
        {$_modx->resource.pagetitle}
    </a>
    {if $_pls['mfilter.seo.h1']}
        / <span>{$_pls['mfilter.seo.h1']}</span>
    {/if}
</nav>
```

### Проверка «есть ли активные фильтры»

Отдельного плейсхолдера `hasFilters` нет — проверяйте сам массив:

```html
{if $_pls['mfilter.filters']}
    <a href="{$_pls['mfilter.base_uri']}" class="reset-all">Сбросить все фильтры</a>
{/if}
```

### Условная сортировка/лимит в UI-контролах

```html
<select data-mfilter-sort>
    <option value="pagetitle-asc" {if $_pls['mfilter.sort'] == 'pagetitle-asc'}selected{/if}>А-Я</option>
    <option value="price-asc" {if $_pls['mfilter.sort'] == 'price-asc'}selected{/if}>Сначала дешевле</option>
</select>

<select data-mfilter-limit>
    <option value="12" {if $_pls['mfilter.limit'] == 12}selected{/if}>12</option>
    <option value="24" {if $_pls['mfilter.limit'] == 24}selected{/if}>24</option>
</select>
```

## Переменные внутри чанков

При рендере своих чанков `pdoTools` передаёт им данные напрямую как Fenom-переменные (не через `$_pls`).

### Чанки `mFilter` (карточки товаров)

`tplOuter` (обёртка результатов):

| Переменная | Описание |
|------------|----------|
| `$rows` | HTML всех карточек товаров |
| `$pagination` | HTML пагинации |
| `$total` | Количество найденных товаров |
| `$page` | Текущая страница |
| `$pageCount` | Всего страниц |
| `$limit` | Товаров на странице |
| `$hash` | Хэш конфигурации формы |

`tpl1`, `tpl2` и другие (карточка одного товара) — обычные `pdoResources`/`msProducts`-переменные ресурса:

```html
<div class="product-card" data-id="{$id}">
    <img src="{$image}" alt="{$pagetitle}">
    <h3>{$pagetitle}</h3>
    <div class="price">{$price | number:0} ₽</div>
</div>
```

### Чанки `mFilterForm` (форма фильтров)

`tplOuter`:

| Переменная | Описание |
|------------|----------|
| `$filters` | HTML всех фильтров, объединённых через `tplFilter.outer` |
| `$hash` | Хэш конфигурации формы (для AJAX) |
| `$resourceId` | ID текущего ресурса каталога |

`tplFilter` (обёртка одного фильтра):

| Переменная | Описание |
|------------|----------|
| `$key` | Ключ фильтра (`vendor`, `color`, `price`…) |
| `$label` | Название фильтра |
| `$type` | Тип: `default`, `number`, `boolean`, `parents`, `ms3_categories`, `colors`, `vendors`, `date`… |
| `$items` | HTML значений фильтра |
| `$activeCount` | Сколько значений этого фильтра выбрано |

`tplItem` (одно значение — checkbox/radio):

| Переменная | Описание |
|------------|----------|
| `$key` | Ключ фильтра |
| `$value` | Значение |
| `$slug` | Слаг для URL |
| `$label` | Отображаемый текст |
| `$count` | Количество товаров |
| `$active` | Значение выбрано (bool) |
| `$disabled` | Значение недоступно (нет товаров при текущих остальных фильтрах) |
| `$multiple` | Множественный выбор (checkbox vs radio) |

`tplBoolean` (переключатель да/нет):

| Переменная | Описание |
|------------|----------|
| `$key`, `$value`, `$label`, `$count`, `$active` | Как в `tplItem` |

`tplColor` (цветовой свотч):

| Переменная | Описание |
|------------|----------|
| `$key`, `$value`, `$label`, `$active` | Как в `tplItem` |
| `$hex` | HEX-код цвета |

`tplSlider` (range-фильтр):

| Переменная | Описание |
|------------|----------|
| `$key` | Ключ фильтра |
| `$label` | Название |
| `$min`, `$max` | Доступный диапазон в текущей выборке |
| `$minValue`, `$maxValue` | Выбранные пользователем значения |
| `$step` | Шаг |
| `$prefix`, `$suffix` | Префикс/суффикс единицы измерения |

### Чанки `mFilterSelected` (блок «Выбрано»)

`tplOuter`:

| Переменная | Описание |
|------------|----------|
| `$items` | HTML всех выбранных значений |
| `$total` | Общее количество выбранных значений |

`tplGroup` (группа значений одного фильтра):

| Переменная | Описание |
|------------|----------|
| `$key`, `$label` | Ключ и название фильтра |
| `$items` | HTML значений внутри группы |

`tplItem` (одна chip):

| Переменная | Описание |
|------------|----------|
| `$key` | Ключ фильтра |
| `$value` | Значение (машиночитаемое) |
| `$valueLabel` | Отображаемый текст |

`tplReset` (кнопка «сбросить всё»):

| Переменная | Описание |
|------------|----------|
| `$url` | URL страницы без фильтров |

## Использование в JavaScript

Есть два пути.

### Через `window.mFilter` (клиентский API)

```javascript
const instance = window.mFilter.getInstance();

instance.state.filters;      // текущие фильтры
instance.state.sort;         // сортировка
instance.state.limit;        // лимит
instance.setFilter('brand', ['apple']);
instance.submit();
```

Полный список методов — в [JS API](../development/js-api.md).

### Через события

```javascript
document.addEventListener('mfilter:success', function (e) {
    console.log(e.detail.filters, e.detail.total, e.detail.seo);
});
```

`e.detail.seo` содержит те же данные, что попадают в `mfilter.seo.*` плейсхолдеры при SSR. Полный список событий — в [Events](../development/events.md).

## Примеры

### Пустые результаты

```html
{if $total == 0}
    <div class="empty-results">
        <p>По вашему запросу ничего не найдено.</p>
        {if $_pls['mfilter.filters']}
            <p>Попробуйте <a href="{$_pls['mfilter.base_uri']}">сбросить фильтры</a>.</p>
        {/if}
    </div>
{/if}
```

`$total` — из `tplOuter` чанка `mFilter`. `mfilter.filters` — глобальный плейсхолдер.

### Условная канонизация

Если у фильтрованной страницы `noindex`, canonical указывает на исходный ресурс (без фильтров). Иначе — на текущий URL.

```html
{if $_pls['mfilter.seo.canonical']}
    <link rel="canonical" href="{$_pls['mfilter.seo.canonical']}">
{else}
    <link rel="canonical" href="{$_modx->makeUrl($_modx->resource.id, '', '', 'full')}">
{/if}
```

### Логирование фильтрации в аналитику

```html
<script>
document.addEventListener('mfilter:success', function (e) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'filter_apply', {
            filter_count: Object.keys(e.detail.filters).length,
            total: e.detail.total,
        });
    }
});
</script>
```
