# Внешние фильтры

Сортировка, число товаров на странице и вид выдачи работают в любом месте страницы — по атрибутам, без своего JS. Фильтр вне формы — кнопка или отдельный блок цены — ставится вызовом [JS API](../development/js-api).

## Задача

Управлять каталогом не только из формы фильтров: сортировку вынести в шапку, быстрые фильтры — кнопками над товарами, цену — в отдельный блок.

## Решение

### Сортировка, число на странице, вид

```html
<select data-mfilter-sort>
    <option value="">По умолчанию</option>
    <option value="price-asc">Сначала дешёвые</option>
    <option value="price-desc">Сначала дорогие</option>
</select>

<select data-mfilter-limit>
    <option value="24">24</option>
    <option value="48">48</option>
</select>

<button type="button" data-mfilter-tpl="tpl1">Плиткой</button>
<button type="button" data-mfilter-tpl="tpl2">Списком</button>
```

Эти элементы уже есть над товарами в стандартном чанке `mfilter.outer` — их можно перенести в любое место страницы. Сортировка записывается как `поле-направление`, вид — ключ из параметра `&tpls` сниппета `mFilter`. Сортировку можно сделать и кнопками: `<button type="button" data-mfilter-sort="price-asc">`. Активной кнопке сортировки и вида скрипт ставит класс `active`.

### Кнопка фильтра

```html
<button type="button" data-quick-filter="in_stock" data-value="1">В наличии</button>
```

```js
// Нажатие ставит фильтр, повторное — снимает
document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-quick-filter]');
    if (!button) return;

    const filter = mfilterGet();
    const key = button.dataset.quickFilter;
    const value = button.dataset.value;

    if ((filter.getFilters()[key] || []).includes(value)) {
        filter.removeFilter(key, value);
    } else {
        filter.addFilter(key, value);
    }
});

// Подсветка — при загрузке страницы и после каждого обновления выдачи
function markQuickFilters() {
    const filters = mfilterGet().getFilters();
    document.querySelectorAll('[data-quick-filter]').forEach((button) => {
        const values = filters[button.dataset.quickFilter] || [];
        button.classList.toggle('active', values.includes(button.dataset.value));
    });
}
document.addEventListener('mfilter:ui:ready', markQuickFilters);
document.addEventListener('mfilter:success', markQuickFilters);
```

`data-quick-filter` и `data-value` читает только этот скрипт. Ключ — ключ фильтра из набора фильтров. Значение — такое же, как `value` у чекбокса этого фильтра в форме: у производителей и категорий это id.

### Цена в отдельном блоке

```html
<input type="number" data-price="min" placeholder="от">
<input type="number" data-price="max" placeholder="до">
<button type="button" data-price-apply>Показать</button>
```

```js
document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-price-apply]')) return;

    // Пустые поля снимают фильтр
    mfilterGet().setFilter('price', {
        min: document.querySelector('[data-price="min"]').value,
        max: document.querySelector('[data-price="max"]').value,
    });
});

// После сброса формы и «Назад» поля показывают текущий диапазон
document.addEventListener('mfilter:success', (e) => {
    document.querySelector('[data-price="min"]').value = e.detail.filters['price|min']?.[0] ?? '';
    document.querySelector('[data-price="max"]').value = e.detail.filters['price|max']?.[0] ?? '';
});
```

Фильтр цены оставьте и в форме: если задана одна граница, скрипт дополнит вторую краем диапазона из ползунка формы.

### Ссылка на отфильтрованную страницу

Чтобы открыть другой раздел сразу с выбранным производителем, JS не нужен — это обычная ссылка на SEO-адрес. Список таких ссылок выводит сниппет [mFilterNav](../snippets/mfilternav).

## Почему так

Сортировку, число на странице и вид скрипт ищет по атрибутам во всей странице один раз — при запуске. Поэтому элементы должны быть на странице сразу, а не добавляться позже. И они не должны стоять внутри `.mfilter-results` и `.mfilter-pagination`: содержимое этих блоков заменяется после каждого запроса, и новые элементы остаются без обработчиков.

Фильтры скрипт читает из полей формы, кнопку вне формы он не видит — поэтому фильтр ставит вызов JS API. Вызов сам отправляет запрос и отмечает тот же фильтр в форме, если он там есть. Следующее изменение в форме поставленный так фильтр не снимает.

Подсветку своих кнопок и значения своих полей скрипт не знает — их обновляет ваш код по событию `mfilter:success`. Оно приходит после любого обновления выдачи: из формы, из JS API, после сброса и «Назад».

## Если не работает

| Симптом | Причина |
|---------|---------|
| Селект сортировки или кнопка вида не реагирует | Элемент добавлен скриптом после загрузки страницы или стоит внутри `.mfilter-results` |
| После сброса селект сортировки показывает не ту сортировку | Первая опция селекта — не сортировка по умолчанию: при сбросе скрипт выбирает первую |
| Второй счётчик `mfilter-total` не обновляется | Скрипт обновляет только первый элемент с этим классом на странице |
| Кнопка отбирает не те товары | Значение не такое, как `value` у чекбокса в форме: например, производитель передан названием вместо id |
| Кнопка не гаснет после сброса или «Назад» | Подсветка не подписана на `mfilter:success` |
| После перехода по ссылке заголовок страницы «1000 — 0» | Задана одна граница цены, а фильтра цены в форме нет. Верните фильтр в форму или задавайте обе границы |
