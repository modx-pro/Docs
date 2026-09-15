# Рецепты

Готовые решения типовых задач: большие — отдельными страницами, короткие — ниже на этой.

## Содержание

| Рецепт | Задача |
|--------|--------|
| [Фильтр выпадающим списком](select-filter) | Вывести значения фильтра в `<select>` вместо чекбоксов |
| [Сортировка значений](filter-values-sorting) | Задать порядок значений в фильтре |
| [Внешние фильтры](external-filters) | Сортировка, число на странице, вид, кнопки фильтров и цена вне формы |
| [Свой тип фильтра](custom-filter-type) | Написать свой тип фильтра |
| [Фильтры на странице поиска](search-results-integration) | Подключить фильтры к выдаче mSearch |
| [Синхронизация индекса фасетов](facet-index-sync) | Понять, когда индекс обновляется сам и как запустить вручную |

## Кнопка сброса вне формы

```html
<button type="button" onclick="mfilterGet().reset()">Сбросить фильтры</button>

<button type="button" onclick="mfilterGet().removeFilter('vendor')">Любой производитель</button>
```

`reset()` снимает все фильтры и сортировку, `removeFilter()` — один фильтр. Запрос оба вызова отправляют сами. Кнопка сброса внутри формы уже есть в стандартном чанке `mfilter.form`.

## Число выбранных фильтров

```html
<button type="button">Фильтры <span data-filters-count></span></button>
```

```js
function showFiltersCount() {
    // Границы диапазона price|min и price|max — один фильтр
    const keys = Object.keys(mfilterGet().getFilters()).map((key) => key.split('|')[0]);
    document.querySelector('[data-filters-count]').textContent = new Set(keys).size || '';
}
document.addEventListener('mfilter:ui:ready', showFiltersCount);
document.addEventListener('mfilter:success', showFiltersCount);
```

Число считается так же, как в кнопке сброса формы: по фильтрам, а не по значениям. В самой кнопке сброса число выводит скрипт — это элемент `data-mfilter-reset-count` в стандартном чанке `mfilter.form`.

## Индикатор загрузки

```html
<div class="mfilter-overlay"><div class="mfilter-spinner"></div></div>
```

Блок ставится в любое место страницы. На время запроса скрипт добавляет ему класс `active`, и стили mFilter показывают полупрозрачный слой на весь экран с крутящимся кругом.

Чтобы вместо слоя приглушить только товары, достаточно CSS — форма на время запроса получает класс `mfilter-loading`:

```css
body:has(.mfilter-loading) .mfilter-results {
    opacity: .5;
}
```

## Автоотправка

Автоотправка включена по умолчанию — системной настройкой `mfilter.auto_submit`. Форма отправляется при изменении любого поля, свой код не нужен. Свой обработчик `change` с отправкой формы пошлёт второй запрос.

Выключить для одной формы:

```fenom
{'!mFilterForm' | snippet : ['autoSubmit' => 0]}
```

Без автоотправки форму отправляет её кнопка «Применить». Кнопке вне формы — например, в подвале модального окна — нужен вызов `submit()`:

```html
<button type="button" onclick="mfilterGet().submit()">Показать товары</button>
```

## Прокрутка к результатам

После каждого обновления выдачи скрипт сам прокручивает страницу к товарам, свой код для этого не нужен.

Если товары закрывает закреплённая шапка, увеличьте отступ. Если прокрутка не нужна — выключите её. Атрибуты дописываются в свою копию чанка формы:

```fenom
{* Отступ сверху под шапку, px *}
<form{$formAttrs} data-mfilter-scroll-offset="150">

{* Без прокрутки *}
<form{$formAttrs} data-mfilter-scroll-to-results="false">
```

Остальные настройки формы — в таблице [Настройки формы](../development/javascript#form-options).

## Цель в Яндекс Метрике

```js
document.addEventListener('mfilter:success', (e) => {
    ym(12345678, 'reachGoal', 'filter', { total: e.detail.total });
});
```

`12345678` — номер вашего счётчика. Что ещё приходит в `e.detail` — в разделе [События](../development/js-api#sobytiya).

## Запомнить фильтры

Посетитель вернулся в раздел — фильтры те же, что он выбирал в прошлый раз:

```js
// Отдельно для каждого раздела: id раздела выводит mFilterForm
const storageKey = () => 'mfilter:' + document.querySelector('[data-mfilter][data-resource-id]').dataset.resourceId;

document.addEventListener('mfilter:success', (e) => {
    localStorage.setItem(storageKey(), JSON.stringify(e.detail.filters));
});

document.addEventListener('mfilter:ui:ready', () => {
    const filter = mfilterGet();
    // Фильтры в адресе страницы важнее сохранённых
    if (Object.keys(filter.getFilters()).length) return;

    const saved = JSON.parse(localStorage.getItem(storageKey()) || '{}');
    for (const [key, values] of Object.entries(saved)) {
        filter.setFilter(key, values);
    }
});
```

Вызовы `setFilter()` подряд уходят одним запросом.

## Скрыть фильтр с одним значением

Оберните условием всё содержимое чанка обёртки фильтра — параметр `&tpl` сниппета `mFilterForm`:

```fenom
{if $itemCount > 1 || $activeCount || $type == 'number'}
    {* прежнее содержимое чанка *}
{/if}
```

- **`$activeCount`** — фильтр, в котором значение уже выбрано, не прячется, иначе выбор нельзя будет снять.
- **`$type == 'number'`** — ползунок диапазона считается одним значением и без этого условия пропадёт.

Условие проверяется при загрузке страницы. После фильтрации блок не исчезает — скрипт только блокирует значения, по которым не осталось товаров.
