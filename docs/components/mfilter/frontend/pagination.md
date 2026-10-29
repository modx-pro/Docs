# Пагинация

## Как работает пагинация в mFilter

mFilter строит пагинацию сам, а не через pdoPage. Поэтому параметры навигации pdoPage — `pageNavVar`, `ajaxTplMore`, `frontend_js`, `frontend_css` — с mFilter не действуют. Параметр `ajaxMode` у сниппета `mFilter` свой, см. [mFilter](../snippets/mfilter).

pdoPage получает от mFilter только ID текущей страницы: общего числа товаров он не знает и верную навигацию построить не может. AJAX-запросы тоже идут через API mFilter, а не через AJAX-режим pdoPage.

pdoPage участвует только в режиме с `&element`: выводит строки товаров по готовым ID. Без `&element` строки выводит сам mFilter.

Число страниц считается как в pdoPage: если в вызове задан `offset`, страницы считаются по товарам, оставшимся после него, а `{$total}` показывает все найденные.

## Базовая настройка

### Вызов сниппета

```smarty
{'!mFilter' | snippet : [
    'element' => 'msProducts',
    'paginator' => 'pdoPage',
    'parents' => $_modx->resource.id,
    'limit' => 12,
    'tplOuter' => 'my.outer',
    'tpl' => 'my.product.card',
]}
```

Параметр `ajax` в вызов не добавляйте: скрипт mFilter отправляет AJAX-запросы сам.

### Чанк tplOuter

Контейнеры `.mfilter-results` и `.mfilter-pagination` ставьте **рядом**, а не один в другой:

```html
<div data-mfilter-results
     data-mfilter-hash="{$hash}"
     data-mfilter-keys="{$filterKeys | esc}"
     data-base-url="/{$_modx->resource.uri | esc}"
     data-page-count="{$pageCount}"
     data-total="{$total}">

    {* Результаты — сюда JS вставляет HTML товаров *}
    <div class="mfilter-results">
        {$rows}
    </div>

    {* Пагинация — отдельный блок, НЕ внутри .mfilter-results *}
    <div class="mfilter-pagination">
        {$pagination}
    </div>

</div>
```

::: warning Пагинация внутри .mfilter-results
Если `.mfilter-pagination` окажется внутри `.mfilter-results`, AJAX-обновление затрёт её вместе с товарами. Результат — пагинация пропадает после первого применения фильтра.
:::

Контейнер пагинации выводите без условия. При одной странице `{$pagination}` пуст, а скрипт вставляет пагинацию только в существующий элемент: если контейнера нет, после фильтрации ссылки на страницы не появятся.

`data-mfilter-hash="{$hash}"` обязателен: по нему сервер находит сохранённые параметры вызова при AJAX-запросе. Без `data-page-count` скрипт считает страницу единственной, и «Показать ещё» с бесконечной прокруткой не работают.

Переменные `$hash`, `$pageCount` и остальные существуют только внутри чанка, поэтому переносить обёртку в шаблон ресурса нельзя. Подробности — в [Плейсхолдерах](placeholders#pls-v-shablone-i-v-chanke-eto).

### Чанк пагинации (tplPagination)

Стандартный чанк `mfilter.pagination` выводит навигацию в разметке Bootstrap 5. Свой чанк передайте параметром `tplPagination`:

```smarty
{'!mFilter' | snippet : [
    'element' => 'msProducts',
    'paginator' => 'pdoPage',
    'tplPagination' => 'my.pagination',
    'limit' => 12,
]}
```

Переменные чанка пагинации:

| Переменная | Описание |
|------------|----------|
| `{$page}` | Текущая страница |
| `{$pageCount}` | Всего страниц |
| `{$total}` | Всего результатов |
| `{$limit}` | Элементов на странице |
| `{$baseUrl}` | Адрес страницы с фильтрами — без номера страницы, сортировки и лимита. Без `&element` при загрузке страницы пуст, поэтому начинайте чанк со строки `{var $baseUrl = $baseUrl ?: $_modx->resource.uri}`, как в стандартном чанке |
| `{$pageParam}` | Имя параметра страницы из вызова сниппета. После AJAX-запроса с `&element` переменной нет, без `&element` она всегда `page`. Ссылки стройте сегментом `page{$sep}N`, а не параметром запроса |

Ссылки на страницы — `a[data-page]` или `a.page-link` внутри `.mfilter-pagination`: скрипт перехватывает клик и делает AJAX-запрос вместо перехода. Номер страницы берётся из `data-page`, а без него — из адреса ссылки.

::: warning Разделитель берите из настройки
Сегмент страницы собирается как `page` + разделитель + номер, где разделитель — системная настройка `mfilter.url_separator`. На новых установках это `--`, на старых может быть `_`. Если зашить его в чанк, при несовпадении роутер не разберёт адрес и отдаст **404** — по всем ссылкам пагинации сразу.

Изнутри сайта это незаметно: скрипт перехватывает клик и строит адрес сам, минуя роутер. В 404 попадают при прямом открытии — из закладки, новой вкладки или поиска.

```fenom
{var $sep = 'mfilter.url_separator' | option}
{if !$sep}{var $sep = '_'}{/if}
...
<a href="{$baseUrl}page{$sep}{$page + 1}/" data-page="{$page + 1}">&raquo;</a>
```

Модификатор `option` — это `$modx->getOption()` без второго аргумента, поэтому значение по умолчанию задаётся отдельной строкой.

Адрес с фильтрами должен заканчиваться на `/`. Иначе mFilter отдаёт 404 или перенаправляет на адрес с `/` в конце — по настройке `mfilter.non_canonical_url_handling`.
:::

Полная разметка с окном страниц вокруг текущей — в стандартном чанке `core/components/mfilter/elements/chunks/mfilter.pagination.tpl`, короткий вариант — в [примере ниже](#primer-minimalnaya-paginaciya).

## Режимы пагинации

Режим — `links`, `loadmore` или `infinite` — задаётся атрибутом `data-mfilter-pagination-mode` на форме фильтров. В своей копии чанка `mfilter.form` допишите его рядом с `{$formAttrs}`:

```html
<form{$formAttrs} data-mfilter-pagination-mode="loadmore">
```

### links (по умолчанию)

Постраничная навигация ссылками: 1, 2, 3… N.

### loadmore

Кнопка «Показать ещё» дописывает товары следующей страницы к уже показанным. Пометьте кнопку атрибутом `data-mfilter-load-more` — скрипт спрячет её на последней странице. Нажатие подключите сами через [JS API](../development/js-api):

```html
<button type="button" data-mfilter-load-more onclick="mfilterGet().loadMore()">
    Показать ещё
</button>
```

- Кнопку ставьте вне `.mfilter-pagination`: содержимое этого контейнера заменяется каждым ответом сервера.
- Ссылки страниц в этом режиме тоже выводятся. Если они не нужны, скройте `.mfilter-pagination` стилями, а сам контейнер оставьте.
- Адрес страницы при догрузке не меняется: после перезагрузки посетитель вернётся на страницу из адреса.

### infinite

Бесконечная прокрутка: товары следующей страницы догружаются, когда посетитель прокручивает к низу `.mfilter-results`. Адрес страницы при этом не меняется.

Порог срабатывания — 200 px от низа контейнера, меняется опцией `infiniteOffset`:

```js
document.addEventListener('mfilter:ui:ready', () => {
    mfilterGet().options.infiniteOffset = 300;
});
```

## URL пагинации

В SEO-адресе номер страницы — отдельный сегмент:

```
/catalog/                            ← страница 1
/catalog/page--2/                    ← страница 2
/catalog/color--red/page--3/         ← фильтр + страница 3
```

Разделитель — значение настройки `mfilter.url_separator`: на новых установках `--`, на старых может быть `_` (`/catalog/page_2/`).

При смене сортировки и лимита страница сбрасывается на первую. При смене фильтров — тоже, если не выключена опция `data-mfilter-reset-page`, см. [Настройки формы](../development/javascript#form-options).

## Частые ошибки

### Сырой JSON вместо страницы

```smarty
{* НЕПРАВИЛЬНО — ajax заставляет сниппет вернуть JSON *}
{'!mFilter' | snippet : [
    'ajax' => 1,
    ...
]}
```

Уберите `ajax` из вызова: AJAX-запросы отправляет скрипт mFilter на отдельный адрес API. Если без `ajax` фильтрация не работает без перезагрузки, значит, скрипт не подключён — проверьте настройку `mfilter.register_frontend`.

### Пагинация пропадает после фильтрации

Проверьте разметку `tplOuter`:

- `.mfilter-pagination` должна быть **снаружи** `.mfilter-results`, но **внутри** `[data-mfilter-results]`;
- контейнер должен выводиться без условия `{if $pagination}` — иначе при одной странице его нет, и после фильтрации пагинации некуда появиться.

```html
<div data-mfilter-results ...>         {* Обёртка *}
    <div class="mfilter-results">      {* Сюда JS вставляет товары *}
        {$rows}
    </div>
    <div class="mfilter-pagination">   {* Рядом, не внутри *}
        {$pagination}
    </div>
</div>
```

### Параметры pdoPage не работают

`pageNavVar`, `ajaxTplMore` и другие параметры навигации pdoPage с mFilter не действуют: пагинацию строит mFilter, а pdoPage только отрисовывает товары.

### Кнопка «Показать ещё» не работает

1. На обёртке результатов нет `data-page-count` — скрипт считает страницу единственной и не догружает.
2. На обёртке нет `data-mfilter-hash` — запрос не отправляется.
3. Кнопка лежит внутри `.mfilter-pagination` — её затирает первый же ответ сервера.
4. Кнопка с `data-mfilter-load-more` скрыта: на форме не стоит `data-mfilter-pagination-mode="loadmore"` или страница последняя.

### Пагинация от pdoPage попадает в товары

Навигация pdoPage внутри HTML товаров — вероятно, признак mFilter старше 1.3.0. Обновите компонент: в 1.3.0 это исправлено.

## Пример: минимальная пагинация

### tplOuter

```html
<div data-mfilter-results
     data-mfilter-hash="{$hash}"
     data-mfilter-keys="{$filterKeys | esc}"
     data-base-url="/{$_modx->resource.uri | esc}"
     data-page-count="{$pageCount}"
     data-total="{$total}">
    <div class="mfilter-results">
        {$rows ?: 'Ничего не найдено'}
    </div>

    <div class="mfilter-pagination">
        {$pagination}
    </div>
</div>
```

### tplPagination

```html
{var $baseUrl = $baseUrl ?: $_modx->resource.uri}
{var $sep = 'mfilter.url_separator' | option}
{if !$sep}{var $sep = '_'}{/if}
{if $pageCount > 1}
<nav>
    <ul>
        {if $page > 1}
            <li><a href="{$baseUrl}{if $page > 2}page{$sep}{$page - 1}/{/if}" data-page="{$page - 1}">&laquo;</a></li>
        {/if}

        {for $i = 1 to $pageCount}
            <li>
                {if $i == $page}
                    <span>{$i}</span>
                {else}
                    <a href="{$baseUrl}{if $i > 1}page{$sep}{$i}/{/if}" data-page="{$i}">{$i}</a>
                {/if}
            </li>
        {/for}

        {if $page < $pageCount}
            <li><a href="{$baseUrl}page{$sep}{$page + 1}/" data-page="{$page + 1}">&raquo;</a></li>
        {/if}
    </ul>
</nav>
{/if}
```

## Пример: кнопка «Показать ещё»

### tplOuter

```html
<div data-mfilter-results
     data-mfilter-hash="{$hash}"
     data-mfilter-keys="{$filterKeys | esc}"
     data-base-url="/{$_modx->resource.uri | esc}"
     data-page-count="{$pageCount}"
     data-total="{$total}">
    <div class="mfilter-results">
        {$rows}
    </div>

    {* Кнопка — вне .mfilter-pagination; скрипт прячет её на последней странице *}
    <button type="button" data-mfilter-load-more onclick="mfilterGet().loadMore()">
        Показать ещё
    </button>

    {* Контейнер нужен скрипту; ссылки страниц можно скрыть стилями *}
    <div class="mfilter-pagination">
        {$pagination}
    </div>
</div>
```

### Форма фильтров

В копии чанка `mfilter.form`:

```html
<form{$formAttrs} data-mfilter-pagination-mode="loadmore">
```
