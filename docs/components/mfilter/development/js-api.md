# JS API

Управление фильтром из своего кода: поставить или снять фильтр, сменить сортировку, отреагировать на обновление выдачи.

## Получить форму

```js
const filter = mfilterGet();
```

Без аргумента `mfilterGet()` возвращает форму фильтров на странице. Если форм несколько, передайте id — его задаёт параметр `&formId` сниппета `mFilterForm`, по умолчанию `mfilter-form`: `mfilterGet('mfilter-form')`.

Форма появляется, когда скрипты mFilter загрузились. Код, который выполняется сразу при загрузке страницы, ждите событием:

```js
document.addEventListener('mfilter:ui:ready', () => {
    mfilterGet().setSort('price-asc');
});
```

В обработчиках кликов это не нужно: к моменту клика форма уже есть.

## Методы

| Метод | Что делает |
|---|---|
| `setFilter(ключ, значения)` | Заменяет значения фильтра |
| `addFilter(ключ, значения)` | Добавляет значения к уже выбранным |
| `removeFilter(ключ, значение)` | Снимает значение; без значения — весь фильтр |
| `reset()` | Снимает все фильтры и сортировку |
| `setSort(сортировка)` | Меняет сортировку: `price-asc`, `pagetitle-desc` |
| `setLimit(число)` | Меняет число товаров на странице |
| `setTpl(вид)` | Переключает вид — ключ из параметра `&tpls` сниппета `mFilter` |
| `goToPage(номер)` | Переходит на страницу |
| `loadMore()` | Догружает следующую страницу к показанным товарам |
| `getFilters()` | Возвращает выбранные фильтры |
| `getState()` | Возвращает фильтры, страницу, число страниц и товаров, сортировку, лимит, вид |
| `on(событие, обработчик)`, `off(событие, обработчик)` | Подписка на события этой формы |

Методы, которые что-то меняют, сами отправляют запрос и обновляют выдачу. Вызовы подряд уходят одним запросом, их можно писать цепочкой:

```js
filter.setFilter('color', 'red').setSort('price-asc');   // один запрос
```

После этих методов `submit()` не нужен. Он отправляет поля формы немедленно и пригодится кнопке вне формы, когда автоотправка выключена.

## Значения фильтров

```js
filter.setFilter('color', 'red');
filter.setFilter('color', ['red', 'blue']);
filter.setFilter('vendor', [5, 7]);
filter.setFilter('price', { min: 1000, max: 5000 });

filter.removeFilter('vendor', 5);
filter.removeFilter('price');
```

- **Ключ** — ключ фильтра из набора фильтров.
- **Производители и категории** задаются по id. По названию или слагу из адреса — `setFilter('vendor', 'apple')` — такой фильтр по производителю не отберёт.
- **Числа и строки равнозначны**: `removeFilter('vendor', 5)` снимет значение `'5'`. `getFilters()` возвращает значения строками.
- **Диапазон**: границу можно не передавать — `{ min: 1000 }` означает «от 1000», вторая граница снимается. `removeFilter('price')` снимает обе.
- **Даты** выбираются как значения из списка: `setFilter('publishedon', ['2024-03-15'])`. Диапазон дат `{ from, to }` сейчас не работает — см. [Типы фильтров](filter-types#vstroennye-tipy).

## События

События всплывают от формы до `document`, поэтому их слушают на `document`. Данные лежат в `e.detail`.

| Событие | Когда | Что в `e.detail` |
|---|---|---|
| `mfilter:success` | Выдача обновлена | `filters`, `total`, `page`, `pageCount`, `sort`, `limit`, `tpl`, `response` — ответ сервера |
| `mfilter:error` | Запрос не удался | `error` |
| `mfilter:beforeSubmit` | Перед запросом | `state`, `cancel` — поставьте `true`, чтобы отменить запрос |
| `mfilter:afterSubmit` | После запроса, удачного или нет | те же поля, что у `success`, без `response` |
| `mfilter:contentLoaded` | Новые карточки вставлены на страницу | `container`, `append` — `true` при догрузке, и поля как у `success` |
| `mfilter:change` | Пользователь изменил поле формы с автоотправкой | `field`, `name`, `value`, `state` |
| `mfilter:seoUpdate` | Обновлены заголовок и метатеги | `seoData` |
| `mfilter:ui:ready` | Формы на странице готовы | `instances` |

Кроме `change`, в событиях формы есть и `instance` — сама форма. Через `filter.on('success', обработчик)` приходят те же данные, но сразу аргументом, без `e.detail`.

## Примеры

### Кнопка вне формы

```html
<button type="button" data-in-stock>Только в наличии</button>

<script>
document.querySelector('[data-in-stock]').addEventListener('click', () => {
    mfilterGet().setFilter('in_stock', 1);
});
</script>
```

Больше вариантов — сортировка в шапке, быстрые фильтры, цена в отдельном блоке — в рецепте [Внешние фильтры](../cookbook/external-filters).

### Число товаров в шапке

```js
document.addEventListener('mfilter:success', (e) => {
    document.querySelector('.header-count').textContent = e.detail.total;
});
```

### Отменить запрос

```js
document.addEventListener('mfilter:beforeSubmit', (e) => {
    if (Object.keys(e.detail.state.filters).length > 5) {
        e.detail.cancel = true;
    }
});
```

### Свои скрипты на новых карточках

```js
document.addEventListener('mfilter:contentLoaded', (e) => {
    initGallery(e.detail.container);   // ваша функция
});
```

После фильтрации карточки заменяются новыми, и обработчики, навешанные на старые, пропадают. Запускайте свои скрипты заново в пределах `e.detail.container`.

## Создать форму вручную

Скрипт сам находит формы с атрибутом `data-mfilter`. Вручную форму создают только для своей разметки без него:

```js
document.addEventListener('mfilter:ui:ready', () => {
    mfilterInit('#my-form', {
        ajaxMode: 'instant',
        autoSubmit: true,
    });
});
```

При ручном создании `data`-атрибуты формы не читаются — все настройки передаются объектом. Опции — те же настройки, что у атрибутов, их список — в таблице [Настройки формы](javascript#form-options). Автоотправке нужны обе опции: `autoSubmit: true` без `ajaxMode: 'instant'` ничего не делает, потому что за полями никто не следит.

С jQuery то же самое записывается как `$('#my-form').mfilter({ … })`, если jQuery подключён раньше скриптов mFilter.

Форма, которую выводит `mFilterForm`, включает автоотправку сама — по системной настройке `mfilter.auto_submit`.

## Удалить форму

```js
mfilterDestroy('mfilter-form');
```

id обязателен: без него форма не удаляется.
