# mFilter

Основной сниппет для вывода отфильтрованных результатов. Работает в двух режимах: с `&element` выборку делает указанный в нём сниппет, без `&element` — сам mFilter. Сниппет из `&element` дальше называется элементом.

## Параметры

В режиме с `&element` mFilter передаёт элементу все параметры вызова, кроме `element`, `paginator`, `useFilters`, `ajax` и `ajaxMode`. Поэтому элементу можно передать его собственные параметры — например, `includeTVs` для msProducts. Значения `parents`, `depth`, `tpl`, `sortby`, `sortdir` и `limit` mFilter подставляет сам.

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `element` | — | Сниппет выборки: msProducts, pdoResources, getTickets |
| `paginator` | `pdoPage` | Сниппет, который выводит строки текущей страницы. Навигацию рисует mFilter чанком `tplPagination`, поэтому `tplPage*` и `pageNavVar` из pdoPage не действуют |
| `lexicons` | — | Лексиконы через запятую — для строк, которые приходят после AJAX-запроса. При первой загрузке страницы mFilter их не подключает. Лексиконы MiniShop3 для `msProducts` подключаются сами |
| `useFilters` | `true` | Применять активные фильтры из URL или POST. `false` — полная выборка без учёта фильтрации. Действует только при первой загрузке: после AJAX-запроса формы выбранные фильтры применяются всегда |

### Выборка

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `parents` | текущий ресурс | ID родительских ресурсов через запятую |
| `depth` | `10` | Глубина поиска в дочерних категориях |
| `limit` | настройка `mfilter.default_limit` | Количество результатов на странице. Значение настройки по умолчанию — `20` |
| `offset` | `0` | Сколько первых товаров выдачи пропустить. Как в pdoPage: «Найдено» считает все товары, а число страниц — по оставшимся после `offset` |
| `searchVar` | `mse_query` | Имя параметра запроса с поисковой фразой. Работает в режиме с `&element`. Не путать с `queryVar` — параметром элемента mSearch: mFilter его не читает и передаёт элементу как есть |
| `search` | — | Поисковая фраза напрямую, вместо параметра запроса из `searchVar`. Работает в режиме с `&element` |
| `sortby` | `pagetitle` | Поле сортировки |
| `sortdir` | `ASC` | Направление сортировки: `ASC` или `DESC` |
| `where` | — | Дополнительные условия: массив xPDO (из Fenom) или JSON-строка (из MODX-тегов). Без `&element` ключи `Data.*` сами подключают таблицу `msProductData` |
| `select` | — | Поля выборки. Параметр элемента: работает только с `&element`. Без `&element` набор полей строки постоянный — см. [список полей](#rezhim-bez-element) |

::: warning Не передавайте в `where` данные из запроса
Значения условий экранируются, а **ключи** — `Data.price:>` — попадают в SQL как имена полей и операторы. Параметр рассчитан на значения, заданные разработчиком. Если условие строится из того, что прислал посетитель, сверяйте поле с белым списком до вызова сниппета.
:::

::: tip `Data.*` без MiniShop3
Если MiniShop3 не установлен, без `&element` условие с ключами `Data.*` пропускается **целиком** — вместе с остальными ключами того же `where`. В журнал ошибок MODX при этом пишется запись. Выборка не падает, но и не ограничивается. С `&element` `where` передаётся элементу как есть, и обработка остаётся за ним.
:::

### TV

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `includeTVs` | — | Имена TV через запятую |
| `processTVs` | — | Имена TV, значения которых нужно обработать, через запятую |

Оба — параметры элемента: работают только с `&element`.

### Скрытые, неопубликованные, удалённые

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `showHidden` | как у элемента | Показывать ресурсы, скрытые из меню |
| `showUnpublished` | как у элемента | Показывать неопубликованные |
| `showDeleted` | как у элемента | Показывать удалённые |

Флаги работают только с `&element` и передаются элементу, если заданы в вызове. Без `&element` в выдачу попадают опубликованные и не удалённые ресурсы, а скрытые из меню — всегда. Когда выбран хоть один фильтр, неопубликованные и удалённые ресурсы отсекаются и с `&element`.

### Чанки

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `tpl` | `mfilter.row` | Чанк строки выдачи |
| `tplOuter` | `mfilter.outer` | Чанк-обёртка выдачи |
| `tplEmpty` | — | Чанк пустой выдачи |
| `tplPagination` | `mfilter.pagination` | Чанк пагинации |
| `tpls` | — | Чанки строки для переключения вида: массив (из Fenom) или JSON-строка. Ключ — имя вида из `?tpl=`. Без `?tpl` берётся вид `tpl1`, а если его в списке нет — чанк из `tpl` |
| `outputSeparator` | `\n` | Разделитель между строками. Без `&element` после AJAX-запроса строки всегда разделяются переводом строки. С `&element` — параметр элемента |

Переменные чанков: `tplOuter` — в [Плейсхолдерах](/components/mfilter/frontend/placeholders#chanki-mfilter-kartochki-tovarov), `tplPagination` — в [Пагинации](/components/mfilter/frontend/pagination).

`tplEmpty` получает `$total` и `$filters` — применённые фильтры; в режиме с `&element` переменная `$filters` пуста. Обычно `tplEmpty` выводится внутри обёртки `tplOuter`. Два исключения:

- с `&element`, если элемент не нашёл ни одного товара — например, раздел пуст, — сниппет выводит только `tplEmpty`, без обёртки;
- без `&element` после AJAX-запроса `tplEmpty` не используется — пустую выдачу показывает блок с классом `mfilter-empty`, если он есть в разметке. См. [CSS-классы](/components/mfilter/frontend/index#sostoyaniya).

### AJAX

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `ajax` | `false` | Отдавать JSON вместо HTML. Без параметра JSON отдаётся и на запрос с заголовком `X-Requested-With: XMLHttpRequest` |
| `ajaxMode` | `full` | Режим AJAX: `results`, `suggestions`, `full`. Работает только без `&element` |

Скрипт фильтра ходит в свой API и этими параметрами не пользуется.

### Пагинация

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `pageParam` | `page` | Имя параметра запроса с номером страницы. Оставьте `page`, иначе вторая страница откроется как первая |
| `totalVar` | `mfilter.total` | Плейсхолдер для общего количества |
| `pageCountVar` | `mfilter.pageCount` | Плейсхолдер для количества страниц |

Почему именно `page`: под этим именем номер страницы передают скрипт фильтра, стандартный чанк пагинации и SEO-адрес `page--2`.

### Вывод в плейсхолдеры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `toPlaceholders` | `false` | Записать строки и навигацию в плейсхолдеры `mfilter.results` и `mfilter.pagination` вместо вывода. Работает только без `&element` |

::: warning С `toPlaceholders` фильтрация на странице не работает
Обёртка `tplOuter` не выводится, а вместе с ней пропадает разметка, на которую опирается скрипт фильтра, — см. [Обязательные точки подключения](/components/mfilter/frontend/templates#obyazatelnye-tochki-podklyucheniya). На странице с формой фильтров используйте обычный вывод сниппета.
:::

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

### С pdoResources (без MiniShop3)

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

### Переключение вида: сетка и список

```fenom
{* Кнопки переключения *}
<div>
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

Сортировку задаёт SEO-адрес или параметр запроса `sort`. Разделитель `--` между ключом и значением берётся из настройки `mfilter.url_separator`.

```
/catalog/sort--price-asc/    → сортировка по цене (возрастание)
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
/catalog/limit--48/          → 48 товаров на странице
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

### Режим без `&element`

В выборку попадают все дочерние ресурсы, включая категории. Оставить только товары можно условием `where`.

Чанк строки получает поля:

- `id`, `pagetitle`, `longtitle`, `description`, `introtext`, `uri`, `alias`;
- с MiniShop3 ещё `price`, `old_price`, `thumb`, `vendor_id`, `article`.

```fenom
{'!mFilter' | snippet : [
    'parents' => $_modx->resource.id,
    'where' => ['class_key' => 'MiniShop3\\Model\\msProduct'],
    'sortby' => 'pagetitle',
    'limit' => 20,
    'tpl' => 'mfilter.row'
]}
```

## Плейсхолдеры

Доступны после выполнения сниппета:

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+mfilter.total]]` | Общее количество результатов |
| `[[+mfilter.pageCount]]` | Количество страниц |
| `[[+mfilter.page]]` | Текущая страница |
| `[[+mfilter.limit]]` | Результатов на странице |
| `[[+mfilter.sort]]` | Текущая сортировка (`price-asc`) |
| `[[+mfilter.sortBy]]` | Поле сортировки (`price`) |
| `[[+mfilter.sortDir]]` | Направление (`asc`) |

Остальные перечислены в [Плейсхолдерах](/components/mfilter/frontend/placeholders#globalnye-pleysholdery): хеш вызова, SEO-поля, активные фильтры, а при `toPlaceholders` — `mfilter.results` и `mfilter.pagination`.

## Интеграция с mSearch

```fenom
{'!mFilter' | snippet : [
    'element' => 'msProducts',
    'paginator' => 'pdoPage',
    'parents' => $_modx->resource.id,
    'searchVar' => 'query'
]}
```

С непустой поисковой фразой сниппет ставит плейсхолдеры `mse.query` (сама фраза) и `mse.total` (сколько товаров нашёл поиск).

Подробнее: [Интеграция с mSearch](/components/mfilter/integration/msearch)
