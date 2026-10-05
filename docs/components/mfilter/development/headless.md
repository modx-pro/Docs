# Headless API

Headless API — запросы к серверу mFilter из своего кода: товары по фильтрам, SEO-адрес и данные для заголовков страницы. Нужен, когда выдачу рисует своё приложение, а не сниппет `mFilter`.

::: warning Значения фильтров пока не приходят
`getSchema()`, `getFilterValues()` и `getSuggestions()` возвращают пустые списки значений, поэтому форму фильтров через Headless API сейчас не построить. Выводите форму сниппетом `mFilterForm`. Числа у значений приходят только в ответе `apply()` с `hash` — см. [Два режима](#two-modes).
:::

## Подключение

Скрипты подключает плагин mFilter — см. [JavaScript → Подключение](javascript#podklyuchenie). Объект `mfilter` готов к событию `mfilter:ready`:

```js
document.addEventListener('mfilter:ready', async () => {
    const response = await mfilter.api.apply({ resource_id: 5, filters: {} });
    console.log(response.total);
});
```

Если скрипты подключены без плагина и без `mfilter.js`, объект не запустится сам — вызовите `await mfilter.init()`.

## Получить товары

```js
const response = await mfilter.api.apply({
    resource_id: 5,                       // id раздела каталога
    filters: {
        vendor_id: ['16'],
        'price|min': ['1000'],
        'price|max': ['5000'],
    },
    sort: 'price-asc',
    page: 1,
    limit: 24,
});
```

`resource_id` обязателен. Фильтры — по ключам из набора фильтров, значения — массивами. Диапазон — двумя ключами `price|min` и `price|max` или массивом `price: [1000, 5000]`. Объект `{ min, max }` сервер молча пропускает.

Поля ответа лежат в корне, ключа `data` нет:

| Поле | Что в нём |
|---|---|
| `success` | `true` |
| `items` | Товары: `id`, `pagetitle`, `uri`, `price`, `old_price`, `thumb`, `vendor_id`, `article`… Только без `hash` |
| `results` | HTML карточек |
| `pagination` | HTML пагинации |
| `total`, `page`, `pageCount` | Найдено товаров, текущая страница, всего страниц |
| `urls` | `current` — SEO-адрес, `canonical`, `prev`, `next` |
| `seo` | `h1`, `title`, `description`, `text`, `canonical`, `noindex` |
| `suggestions` | Значения фильтров с числами. Только с `hash` |

## Два режима {#two-modes}

| | Без `hash` | С `hash` |
|---|---|---|
| Товары | `items` и HTML по стандартным чанкам | Только HTML — чанками и параметрами вызова `mFilter` на странице |
| Значения фильтров с числами | Не приходят | Приходят в `suggestions` |

`hash` — значение атрибута `data-mfilter-hash` в обёртке выдачи, его выводит сниппет `mFilter`. С ним сервер повторяет вызов сниппета со страницы:

```js
const hash = document.querySelector('[data-mfilter-hash]').dataset.mfilterHash;
const response = await mfilter.api.apply({ resource_id: 5, hash, filters: { made_in: ['Германия'] } });

response.suggestions.made_in.values;   // [{ value: 'Германия', count: 3051, selected: true }, …]
```

## Адрес по фильтрам

```js
const built = await mfilter.api.buildUrl({ resource_id: 5, filters: { made_in: ['Германия'] }, sort: 'price-asc', page: 2 });
built.url;        // SEO-адрес раздела с фильтром, сортировкой и страницей

const parsed = await mfilter.api.parseUrl({ url: built.url, resource_id: 5 });
parsed.filters;   // { made_in: ['Германия'], … }
parsed.page;      // 2
```

`buildUrl()` возвращает `url`, `canonical` и `prev`. `parseUrl()` — `filters`, `sort` объектом `{ field, dir }`, `page`, `limit` и `unrecognized` — сегменты, которые не удалось разобрать.

## Ошибки

Без `resource_id` и при ошибке сервера вызов бросает исключение `Error('HTTP error 400')`, а не возвращает `success: false`:

```js
try {
    const response = await mfilter.api.apply({ resource_id: 5, filters });
} catch (error) {
    console.error(error.message);
}
```

`success: false` приходит, только если запрос отменил хук.

## Хуки

Хуки перехватывают запросы до отправки и после ответа. Через `beforeApply` и `afterApply` проходят и запросы формы `mFilterForm`, поэтому хуком можно поменять параметры любого запроса фильтрации на странице:

```js
mfilterHooks.add('beforeApply', (ctx) => {
    ctx.params.limit = 48;          // изменить параметры
    // ctx.cancel = true;           // или отменить запрос
});

mfilterHooks.add('afterApply', (ctx) => {
    console.log(ctx.result.total);
});
```

| Хук | Что в `ctx` |
|---|---|
| `beforeApply`, `beforeGetSuggestions`, `beforeBuildUrl` | `params`, `cancel` |
| `afterApply`, `afterGetSuggestions`, `afterBuildUrl` | `params`, `result` |
| `beforeGetSchema` / `afterGetSchema` | `resourceId`, `params`, `cancel` / `result` |
| `onError` | Упал запрос: `params`, `error`. Упал обработчик хука: `error`, `hookName`, `context` |

- **Отмена.** `ctx.cancel = true` в хуке `before…` — запрос не уходит, вызов возвращает `{ success: false, message }`. Текст берётся из `ctx.cancelReason`.
- **Порядок.** Третий аргумент `add()` — приоритет, по умолчанию `10`, меньше — раньше.
- **Снятие.** `add()` возвращает функцию, которая снимает обработчик. Ещё есть `mfilterHooks.remove(имя, обработчик)` и `mfilterHooks.clear(имя)`.
- **Без хуков.** `parseUrl()` и `getFilterValues()` хуки не вызывают, а `buildUrl()` при ошибке не вызывает `onError`.

## Запросы без JS

Адрес — `/assets/components/mfilter/api.php?route=<путь>`. Для `POST` параметры передаются телом JSON.

| Метод | Путь | Параметры |
|---|---|---|
| `POST` | `/api/v1/filter/apply` | `resource_id`, `filters`, `sort`, `page`, `limit`, `hash` |
| `POST` | `/api/v1/filter/build-url` | `resource_id`, `filters`, `sort`, `page`, `limit` |
| `POST` | `/api/v1/filter/parse-url` | `url`, `resource_id` |
| `GET` | `/api/v1/filter/schema` | `resource_id` |
| `POST` | `/api/v1/filter/suggestions` | `resource_id`, `filters` |
| `GET` | `/api/v1/filter/values` | `resource_id`, `filter_key`, `search`, `limit` |

Последние три сейчас возвращают пустые значения фильтров.
