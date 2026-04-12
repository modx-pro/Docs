# Пагинация

## Как работает пагинация в mFilter

mFilter использует **собственную пагинацию**, а не встроенную пагинацию pdoPage. Это важное отличие от классической связки pdoPage + pdoResources.

Почему так:

- mFilter сам управляет выборкой: фильтрует ID, нарезает на страницы, передаёт в pdoPage уже готовый набор
- pdoPage не знает реальный total (он видит только ID текущей страницы) и не может построить корректную навигацию
- AJAX-пагинация работает через API mFilter, а не через pdoPage ajax mode

**Параметры pdoPage (`ajaxMode`, `ajaxTplMore`, `pageNavVar`, `frontend_js`, `frontend_css`) — не работают с mFilter.** Не используйте их.

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

Параметр `ajax` в вызове сниппета **не нужен**. AJAX обрабатывается JS-слоем автоматически.

### Чанк tplOuter

Критически важна **структура разметки**. Контейнеры `.mfilter-results` и `.mfilter-pagination` должны быть **рядом** (siblings), а не вложены друг в друга:

```html
{var $baseUrl = $_modx->resource.uri}
<div class="mfilter-wrapper" data-mfilter-results data-base-url="/{$baseUrl}">

    {* Результаты — сюда JS вставляет HTML товаров *}
    <div class="mfilter-results row">
        {$rows}
    </div>

    {* Пагинация — отдельный блок, НЕ внутри .mfilter-results *}
    {if $pagination}
        <div class="mfilter-pagination">
            {$pagination}
        </div>
    {/if}

</div>
```

::: warning Пагинация внутри .mfilter-results
Если `.mfilter-pagination` окажется внутри `.mfilter-results`, AJAX-обновление затрёт её вместе с товарами. Результат — пагинация пропадает после первого применения фильтра.
:::

### Чанк пагинации (tplPagination)

Встроенный чанк `mfilter.pagination` генерирует Bootstrap 5 навигацию. Для кастомизации создайте свой чанк:

```smarty
{'!mFilter' | snippet : [
    'element' => 'msProducts',
    'paginator' => 'pdoPage',
    'tplPagination' => 'my.pagination',
    'limit' => 12,
]}
```

Плейсхолдеры в чанке пагинации:

| Переменная | Описание |
|------------|----------|
| `{$page}` | Текущая страница |
| `{$pageCount}` | Всего страниц |
| `{$total}` | Всего результатов |
| `{$limit}` | Элементов на странице |
| `{$baseUrl}` | Базовый URL с фильтрами (без page) |

Ссылки на страницы должны содержать `data-page` — JS перехватывает клик и делает AJAX-запрос вместо перехода.

Типовая разметка чанка:

```html
{if $pageCount > 1}
<nav aria-label="Навигация" class="mfilter-pagination">
    <ul class="pagination justify-content-center">

        {* Предыдущая *}
        <li class="page-item{if $page == 1} disabled{/if}">
            <a href="{$baseUrl}{if $page > 2}page_{$page - 1}/{/if}"
               class="page-link" data-page="{$page - 1}">&laquo;</a>
        </li>

        {* Первая страница *}
        {if $page > 3}
            <li class="page-item">
                <a href="{$baseUrl}" class="page-link" data-page="1">1</a>
            </li>
        {/if}
        {if $page > 4}
            <li class="page-item disabled"><span class="page-link">...</span></li>
        {/if}

        {* Окно вокруг текущей *}
        {for $i = max(1, $page - 2) to min($pageCount, $page + 2)}
            {if $i == $page}
                <li class="page-item active"><span class="page-link">{$i}</span></li>
            {else}
                <li class="page-item">
                    <a href="{$baseUrl}{if $i > 1}page_{$i}/{/if}"
                       class="page-link" data-page="{$i}">{$i}</a>
                </li>
            {/if}
        {/for}

        {* Последняя страница *}
        {if $page < $pageCount - 3}
            <li class="page-item disabled"><span class="page-link">...</span></li>
        {/if}
        {if $page < $pageCount - 2}
            <li class="page-item">
                <a href="{$baseUrl}page_{$pageCount}/"
                   class="page-link" data-page="{$pageCount}">{$pageCount}</a>
            </li>
        {/if}

        {* Следующая *}
        <li class="page-item{if $page == $pageCount} disabled{/if}">
            <a href="{$baseUrl}page_{$page + 1}/"
               class="page-link" data-page="{$page + 1}">&raquo;</a>
        </li>

    </ul>
</nav>
{/if}
```

## Режимы пагинации

mFilter поддерживает три режима. Режим задаётся data-атрибутом на форме фильтров:

### links (по умолчанию)

Классическая постраничная навигация: 1, 2, 3... N.

Специальной настройки не требуется — работает из коробки.

### loadmore

Кнопка "Показать ещё". Новые товары добавляются к существующим.

```html
<form id="mfilter-form"
      data-mfilter="true"
      data-mfilter-pagination-mode="loadmore">
    ...
</form>
```

Кнопка вызывается через JS API:

```html
<button onclick="MFilterUI.get('mfilter-form').loadMore()">
    Показать ещё
</button>
```

Или в чанке пагинации — добавьте ссылку с `data-page` на следующую страницу. JS перехватит клик и подгрузит товары в режиме append.

Скрытие кнопки, когда показаны все товары:

```javascript
document.addEventListener('mfilter:ui:ready', function(e) {
    const instance = e.detail.instances.values().next().value;

    instance.on('success', function(data) {
        const btn = document.querySelector('.btn-more');
        if (btn) {
            btn.style.display = instance.state.page >= instance.state.pageCount ? 'none' : '';
        }
    });
});
```

### infinite

Бесконечная прокрутка. Новые товары подгружаются при скролле к низу страницы.

```html
<form id="mfilter-form"
      data-mfilter="true"
      data-mfilter-pagination-mode="infinite">
    ...
</form>
```

Порог срабатывания (в пикселях от низа контейнера) — 200px по умолчанию. Можно изменить:

```html
<form ... data-mfilter-scroll-offset="300">
```

## URL пагинации

В SEO URL номер страницы добавляется как сегмент:

```
/catalog/                          ← страница 1
/catalog/page_2/                   ← страница 2
/catalog/color_red/page_3/         ← фильтр + страница 3
```

При применении фильтра страница автоматически сбрасывается на 1.

## Частые ошибки

### "Сырой JSON вместо страницы"

```smarty
{* НЕПРАВИЛЬНО — ajax заставляет сниппет вернуть JSON *}
{'!mFilter' | snippet : [
    'ajax' => 1,
    ...
]}
```

Параметр `ajax` не нужен в вызове сниппета. AJAX обрабатывается JS-слоем через отдельный API endpoint. Убедитесь, что ассеты подключены (`mfilter.register_frontend = true`).

### "Пагинация пропадает после фильтрации"

Проверьте разметку tplOuter — `.mfilter-pagination` должна быть **снаружи** `.mfilter-results`, но **внутри** `[data-mfilter-results]`:

```html
<div data-mfilter-results>         {* Обёртка (wrapper) *}
    <div class="mfilter-results">  {* Сюда JS вставляет товары *}
        {$rows}
    </div>
    <div class="mfilter-pagination"> {* Рядом, не внутри *}
        {$pagination}
    </div>
</div>
```

### "pdoPage параметры не работают"

`ajaxMode`, `ajaxTplMore`, `pageNavVar` — это параметры pdoPage, которые mFilter **отключает**. mFilter берёт на себя пагинацию, pdoPage используется только для рендеринга товаров.

### "Кнопка Показать ещё не работает"

1. Убедитесь, что на форме стоит `data-mfilter-pagination-mode="loadmore"`
2. Кнопка должна вызывать `MFilterUI.get('mfilter-form').loadMore()`
3. Или быть ссылкой с `data-page` внутри `.mfilter-pagination`

### "Пагинация от pdoPage попадает в товары"

Если в HTML-коде товаров видна навигация pdoPage — вероятно, на сайте устаревшая версия mFilter. Обновите до 1.3.0, где эта проблема исправлена (`pageNavVar` fix).

## Пример: минимальная пагинация

### tplOuter

```html
<div data-mfilter-results data-base-url="/{$_modx->resource.uri}">
    <div class="mfilter-results">
        {$rows ?: 'Ничего не найдено'}
    </div>

    {if $pagination}
        <div class="mfilter-pagination">
            {$pagination}
        </div>
    {/if}
</div>
```

### tplPagination

```html
{if $pageCount > 1}
<nav>
    <ul class="pagination">
        {if $page > 1}
            <li><a href="{$baseUrl}{if $page > 2}page_{$page - 1}/{/if}" data-page="{$page - 1}">&laquo;</a></li>
        {/if}

        {for $i = 1 to $pageCount}
            <li class="{if $i == $page}active{/if}">
                {if $i == $page}
                    <span>{$i}</span>
                {else}
                    <a href="{$baseUrl}{if $i > 1}page_{$i}/{/if}" data-page="{$i}">{$i}</a>
                {/if}
            </li>
        {/for}

        {if $page < $pageCount}
            <li><a href="{$baseUrl}page_{$page + 1}/" data-page="{$page + 1}">&raquo;</a></li>
        {/if}
    </ul>
</nav>
{/if}
```

## Пример: кнопка "Показать ещё"

### tplOuter

```html
<div data-mfilter-results data-base-url="/{$_modx->resource.uri}">
    <div class="mfilter-results">
        {$rows}
    </div>

    {if $pageCount > 1}
        <div class="mfilter-pagination text-center mt-4">
            <button type="button" class="btn btn-outline-primary btn-loadmore"
                    onclick="MFilterUI.get('mfilter-form').loadMore()">
                Показать ещё
            </button>
        </div>
    {/if}
</div>
```

### JS (скрытие кнопки)

```javascript
document.addEventListener('mfilter:ui:ready', function(e) {
    const instance = e.detail.instances.values().next().value;
    const btn = document.querySelector('.btn-loadmore');

    function updateButton() {
        if (!btn) return;
        btn.style.display = instance.state.page >= instance.state.pageCount ? 'none' : '';
    }

    instance.on('success', updateButton);
    updateButton(); // на случай SSR последней страницы
});
```

Форма фильтров:

```html
<form id="mfilter-form"
      data-mfilter="true"
      data-mfilter-pagination-mode="loadmore">
    ...
</form>
```
