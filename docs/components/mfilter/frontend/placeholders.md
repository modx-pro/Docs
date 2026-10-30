# Плейсхолдеры

Какие плейсхолдеры ставят плагин и сниппеты mFilter и как читать их в шаблоне ресурса и в чанках.

## Синтаксис

Плейсхолдер `mfilter.something` читается тремя способами:

- **MODX-тег:** `[[+mfilter.something]]`
- **Fenom, явным вызовом:** `{$_modx->getPlaceholder('mfilter.something')}`
- **Fenom, через массив `$_pls`:** `{$_pls['mfilter.something']}` — только то, что поставлено до начала разбора шаблона, см. ниже

::: warning
Запись `{$mfilter.something}` — через точку от переменной `$mfilter` — **не работает**: такой переменной в Fenom нет.
:::

### `$_pls` в шаблоне и в чанке — это разные массивы

`$_pls` — не сами плейсхолдеры MODX, а их копия, которую pdoTools снимает в начале разбора шаблона или чанка. `$_modx->getPlaceholder()` читает текущее значение.

| Где | Что лежит в `$_pls` | Как читать плейсхолдер `mfilter.hash` |
|-----|---------------------|----------------------------------------|
| Шаблон ресурса | плейсхолдеры, поставленные до начала разбора шаблона, — то есть плагином | `{$_modx->getPlaceholder('mfilter.hash')}` ниже вызова `mFilter` |
| Чанк, отрисованный через `getChunk` (`tplOuter`, `tpl`, `tplPagination` и прочие) | **только данные, переданные этому чанку** | `{$hash}` — как переменная |

pdoTools разбирает шаблон за один проход. Сниппет `mFilter`, вызванный внутри шаблона, ставит свои плейсхолдеры, когда копия в `$_pls` уже снята. Через `$_pls` их не видно даже ниже вызова — читайте через `$_modx->getPlaceholder()` или MODX-тегом:

```fenom
{set $results = '!mFilter' | snippet : ['element' => 'msProducts', 'parents' => $_modx->resource.id]}

{$_pls['mfilter.hash']}                    {* пусто *}
{$_modx->getPlaceholder('mfilter.hash')}   {* хеш вызова *}
```

Ещё две типовые ошибки:

- `{$_pls['hash']}` **в шаблоне** — пусто: глобальный плейсхолдер называется `mfilter.hash`, ключа `hash` там нет. Так выглядит разметка, скопированная из чанка `mfilter.outer` в шаблон.
- `{$_pls['mfilter.sort']}` **в чанке** — пусто: чанку передана переменная `$currentSort`, а глобальных плейсхолдеров в его `$_pls` нет.

В чанке надёжнее брать переменную чанка. Если её нет, глобальный плейсхолдер доступен через `{$_modx->getPlaceholder()}` или MODX-тегом.

::: danger Не дублируйте обёртку результатов в шаблоне
Обёртку с `data-mfilter-results` рисует чанк `tplOuter`. Если скопировать её ещё и в шаблон, на странице окажется два вложенных `[data-mfilter-results]`, и JS привяжется к внешнему — из шаблона. Ссылки пагинации внутри чанка тогда идут мимо AJAX: каждый клик перезагружает страницу целиком.

Если обёртка осталась только в шаблоне, `data-mfilter-hash` в ней пуст — переменные чанка в шаблоне не существуют. Без хеша страница не фильтрует вовсе, см. [обязательные точки подключения](templates#obyazatelnye-tochki-podklyucheniya).
:::

## Глобальные плейсхолдеры

Их ставят двое:

- **плагин `mFilter`** — при разборе адреса, до шаблона. На любой странице — значения по умолчанию: пустые фильтры и SEO, сортировка `pagetitle-asc`, лимит 24, вид `tpl1`. На странице каталога — значения из SEO-адреса, а лимит и сортировка без адреса — из настроек;
- **сниппет `mFilter`** — во время отрисовки. Перезаписывает значения плагина значениями своего вызова.

Читайте их ниже вызова сниппета через `$_modx->getPlaceholder()` — тогда получите значения сниппета.

### Активные фильтры и URL

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `mfilter.activeFilters` | array | Активные фильтры — из SEO-адреса и из строки запроса. Значения настоящие: у производителя — id, а не слаг |
| `mfilter.filters` | array | Активные фильтры **только из SEO-адреса**. С фильтрами в строке запроса пуст. Ставит плагин |
| `mfilter.base_uri` | string | Адрес страницы каталога без сегмента фильтров, без `/` в начале и в конце: `catalog`. Ставит плагин, только на странице каталога |
| `mfilter.filter_uri` | string | Сегмент фильтров, тоже без `/` по краям: `brand--apple/color--red` |
| `mfilter.baseIds` | array | ID всех товаров вызова **до** применения фильтров. Ставится только с `&element`; нужен сниппету `mFilterForm`, поэтому форму вызывают ниже `mFilter` |

### Сортировка и пагинация

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `mfilter.sort` | string | Текущая сортировка: `"pagetitle-asc"`, `"price-desc"` |
| `mfilter.sortBy` | string | Только поле: `"pagetitle"`, `"price"` |
| `mfilter.sortDir` | string | Только направление: `"asc"` / `"desc"` |
| `mfilter.limit` | int | Текущий лимит на странице |
| `mfilter.defaultLimit` | int | Лимит вызова сниппета — чтобы отличить его от выбранного посетителем |
| `mfilter.page` | int | Текущая страница |
| `mfilter.tpl` | string | Текущий вид из `&tpls` (`"tpl1"`, `"tpl2"`) |
| `mfilter.total`, `mfilter.pageCount` | int | Всего найдено и всего страниц. Имена меняются параметрами `&totalVar` и `&pageCountVar` |

До вызова сниппета в этих плейсхолдерах — значения плагина (см. выше). Значения вызова — например, `'limit' => 12` — появятся только после сниппета.

### SEO

Сниппет ставит их всегда. Плагин считает их заранее только на SEO-адресе с фильтрами, в остальных случаях оставляет пустыми.

С фильтрами значения берутся из [SEO-шаблона](../interface/seo-templates) или [индивидуальной SEO-страницы](../interface/seo-pages). Если нет ни того ни другого, заголовок собирается из заголовка ресурса и значений фильтров.

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `mfilter.seo.title` | string | Заголовок для `<title>`. Без фильтров — «заголовок \| название сайта» |
| `mfilter.seo.h1` | string | Заголовок `<h1>`. Без фильтров — заголовок ресурса |
| `mfilter.seo.description` | string | Мета description. Без фильтров — описание ресурса |
| `mfilter.seo.canonical` | string | Канонический адрес. Без фильтров — полный адрес ресурса; при `noindex` указывает на страницу без фильтров |
| `mfilter.seo.noindex` | bool | Флаг `noindex` (см. [Системные настройки](../settings.md#seo-optimizaciya)) |
| `mfilter.seo.text` | string | Произвольный SEO-текст |

### Прочее

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `mfilter.hash` | string | Хеш конфигурации вызова `mFilter`; по нему AJAX воспроизводит тот же вызов |
| `mfilter.results` | string | HTML карточек — только без `&element` и при `&toPlaceholders=1` |
| `mfilter.pagination` | string | HTML пагинации — там же |
| `mse.query`, `mse.total` | string, int | Поисковая фраза и сколько товаров нашёл поиск — с `&element` и mSearch, см. [mFilter](../snippets/mfilter#integraciya-s-msearch) |
| `mfilter.form`, `mfilter.activeCount` | string, int | HTML формы и число применённых фильтров — ставит `mFilterForm`, см. [Плейсхолдеры](../snippets/mfilterform#pleysholdery) |
| `mfilter.selected.hash` | string | Хеш вызова `mFilterSelected` |

::: warning `toPlaceholders=1`
С `&toPlaceholders=1` сниппет `mFilter` выводит `mfilter.results` и `mfilter.pagination` **без оборачивающего** чанка `tplOuter`. Теряются `data-mfilter-results`, `data-page-count` и вся начальная разметка с сервера — скрипт не сможет её подхватить. Используйте обычный вывод сниппета и оборачивающий чанк `tplOuter`. С `&element` параметр ничего не делает.
:::

## После фильтрации без перезагрузки

После AJAX-запроса плейсхолдеров нет: шаблон ресурса и `tplOuter` не перерисовываются. Скрипт обновляет на странице:

- выдачу, пагинацию, число в `.mfilter-total` и блок `.mfilter-empty`;
- `<title>`, мета description, canonical и robots;
- элементы с `data-mfilter-h1` и `data-mfilter-seo-text`;
- форму, кнопку сброса и блок «Выбрано».

Всё остальное, что выведено из плейсхолдеров, — крошки, условия `{if}`, подписи — остаётся как при загрузке страницы.

## Использование в шаблоне ресурса

Вызовите `mFilter` в начале шаблона, сохраните вывод в переменную и выведите его ниже. Тогда плейсхолдеры сниппета читаются через `$_modx->getPlaceholder()` во всём шаблоне, включая `<head>`.

### SEO-теги в `<head>`

```html
{set $results = '!mFilter' | snippet : ['element' => 'msProducts', 'parents' => $_modx->resource.id]}
<head>
    <title>{$_modx->getPlaceholder('mfilter.seo.title') ?: $_modx->resource.pagetitle}</title>
    <meta name="description" content="{$_modx->getPlaceholder('mfilter.seo.description') | esc}">

    {if $_modx->getPlaceholder('mfilter.seo.canonical')}
        <link rel="canonical" href="{$_modx->getPlaceholder('mfilter.seo.canonical') | esc}">
    {/if}

    {if $_modx->getPlaceholder('mfilter.seo.noindex')}
        <meta name="robots" content="noindex, follow">
    {/if}
</head>
```

::: tip Почему `noindex, follow`, а не `noindex, nofollow`
При AJAX-обновлении фильтров скрипт всегда ставит `content="noindex, follow"`. Указывайте `follow` и в шаблоне, иначе разметка первой загрузки страницы разойдётся с состоянием после AJAX.
:::

### H1 и SEO-текст в теле страницы

::: warning Обязательные маркеры для AJAX
`<h1>` и контейнер SEO-текста нужно **явно пометить** атрибутом или классом — иначе JS не найдёт их при AJAX-фильтрации и они обновятся только после `F5`. У страницы может быть несколько `<h1>` (в шапке, в боковой колонке), поэтому просто «первый h1» не подходит.

- `<h1>` — атрибут `data-mfilter-h1` или класс `mfilter-h1`
- SEO-текст — атрибут `data-mfilter-seo-text` или класс `mfilter-seo-text`
:::

```html
<h1 data-mfilter-h1>{$_modx->getPlaceholder('mfilter.seo.h1') ?: $_modx->resource.pagetitle}</h1>

<div data-mfilter-seo-text{if !$_modx->getPlaceholder('mfilter.seo.text')} style="display:none"{/if}>
    {$_modx->getPlaceholder('mfilter.seo.text')}
</div>
```

`display:none` нужен, чтобы пустой контейнер не мелькал до первой фильтрации. Дальше скрипт сам скрывает его при пустом SEO-тексте и показывает при заполненном.

### Хлебные крошки и сброс фильтров

Хлебные крошки с выбранными фильтрами выводит сниппет [mFilterCrumbs](../snippets/mfiltercrumbs) — для фильтров в SEO-адресе; после фильтрации без перезагрузки крошки не обновляются. Кнопку «Сбросить фильтры» делайте с атрибутом `data-mfilter-reset`. Скрипт показывает её при выбранных фильтрах и прячет без них, в том числе после фильтрации без перезагрузки, — см. [mFilterForm](../snippets/mfilterform#knopka-sbrosa-tolko-pri-aktivnyh).

### Сортировка и лимит в своей разметке

Код ставьте ниже вызова `mFilter`:

```html
{var $sort = $_modx->getPlaceholder('mfilter.sort')}
<select data-mfilter-sort>
    <option value="pagetitle-asc" {if $sort == 'pagetitle-asc'}selected{/if}>А-Я</option>
    <option value="price-asc" {if $sort == 'price-asc'}selected{/if}>Сначала дешевле</option>
</select>
```

Сортировку можно вывести и кнопками — значение указывается прямо в атрибуте:

```html
<button data-mfilter-sort="price-asc">Сначала дешёвые</button>
<button data-mfilter-sort="price-desc">Сначала дорогие</button>
<a href="#" data-mfilter-sort="pagetitle-asc">По названию</a>
```

Скрипт обрабатывает `<select>` по событию `change`, а `<button>` и `<a>` — по клику, с отменой перехода. При загрузке страницы класс `active` текущей кнопке ставит вёрстка, дальше его переключает скрипт. Лимит `data-mfilter-limit` работает так же.

## Переменные внутри чанков

Чанк сниппета получает данные как переменные Fenom; они же лежат в его `$_pls`. Глобальных плейсхолдеров среди них нет.

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
| `$hash` | Хеш конфигурации вызова; выводится в `data-mfilter-hash` |
| `$currentSort` | Текущая сортировка в формате `поле-направление` (`price-asc`) — для подсветки активного пункта в списке или кнопках |
| `$currentTpl` | Текущий вид из `&tpls` (`tpl1`, `tpl2`) — для подсветки переключателя сетка/список |
| `$filterKeys` | Ключи фильтров страницы через запятую; выводится в `data-mfilter-keys` |
| `$filters` | Применённые фильтры массивом, **в исходном виде**: на SEO-адресе диапазон приходит двумя ключами (`price\|min`, `price\|max`). Свёрнутый набор есть у формы — `$appliedFilters` |

После фильтрации без перезагрузки `tplOuter` не перерисовывается — заново приходят только строки и пагинация. Переменные `tplEmpty` — на странице [mFilter](../snippets/mfilter#chanki).

Карточка одного товара (`tpl`, `tpl1`, `tpl2` и другие) получает:

- с `&element` — переменные элемента, например `msProducts`;
- без `&element` — поля `id`, `pagetitle`, `longtitle`, `description`, `introtext`, `uri`, `alias`, а с MiniShop3 ещё `price`, `old_price`, `thumb`, `vendor_id`, `article`. TV в карточку не приходят.

```html
<div class="product-card" data-id="{$id}">
    <img src="{$thumb}" alt="{$pagetitle | esc}">
    <h3>{$pagetitle | esc}</h3>
    <div class="price">{$price | number:0} ₽</div>
</div>
```

### Чанки `mFilterForm` (форма фильтров)

Переменные обёртки формы, блока фильтра, значения и диапазона — на странице [mFilterForm](../snippets/mfilterform#chanki-filtrov).

### Чанки `mFilterSelected` (блок «Выбрано»)

Переменные чанков блока «Выбрано» — на странице [mFilterSelected](../snippets/mfilterselected#pleysholdery-v-chankah).

## Использование в JavaScript

Состояние фильтра, методы и события — на странице [JS API](../development/js-api). SEO-данные после фильтрации приходят в событии `mfilter:success` в `e.detail.response.seo`.
