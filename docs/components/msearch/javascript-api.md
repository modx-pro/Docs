# JavaScript API

mSearch предоставляет слоёную JavaScript-архитектуру для интеграции поиска на фронтенде. Можно использовать полный стек с UI (по сценарию сниппета `mSearchForm`) или только headless-режим для кастомных интерфейсов на React, Vue, Svelte и т. д.

## Архитектура

```
ApiClient        — HTTP-клиент для API
    ↓
SearchAPI        — фасад поискового API
    ↓
msearchHooks     — система хуков (опционально)
    ↓
msearch          — headless точка входа (window.msearch)
    ↓
MSearchUI        — UI-слой автокомплита (опционально)
    ↓
msearch.js       — автоинициализация по data-msearch-form (опционально)
```

## Публичный API endpoint

Все JS-запросы идут на `assets/components/msearch/api.php`.

### Контракт

API принимает от клиента **минимальный набор параметров** — `query` (поисковый запрос), `offset` (для пагинации основного поиска), `ctx` (фильтр по контекстам), и `form` (идентификатор сниппет-формы для серверной конфигурации).

Параметры рендера (`tpl`, имя чанка), `limit`, имя внешнего сниппета `element` и `elementProperties` хранятся **в кэше MODX** и подбираются по `form`. Это закрывает SSTI-вектор: клиент не может подсунуть произвольный чанк или сниппет.

### Параметры

| Параметр | Тип | Описание | Где применим |
|----------|-----|----------|---------------|
| `query` | string | Поисковый запрос | `/search`, `/search/suggest` |
| `offset` | int | Смещение для пагинации, default `0` | `/search` |
| `form` | string | 12-символьный formId сниппет-формы. По нему сервер достаёт `tpl`/`limit`/`element` из кэша | `/search`, `/search/suggest` |
| `ctx` | string | Контексты через запятую (`web`, `web,shop`). Если в кэше формы задан непустой `ctx` — query-значение игнорируется | `/search`, `/search/suggest` |

### Поиск

```
GET /assets/components/msearch/api.php?route=/search&query=текст&offset=0&form=abc123def456
```

Ответ:

```json
{
    "success": true,
    "total": 42,
    "limit": 10,
    "offset": 0,
    "query": "текст",
    "items": [
        {
            "id": 123,
            "url": "https://site.com/page/alias",
            "type": "resource",
            "html": "<div class=\"mse-result\">...</div>",
            "weight": 45
        }
    ]
}
```

### Автодополнение

```
GET /assets/components/msearch/api.php?route=/search/suggest&query=те&form=abc123def456
```

Ответ:

```json
{
    "success": true,
    "items": [
        {
            "id": 123,
            "url": "https://site.com/page/alias",
            "type": "product",
            "html": "<a href=\"...\" class=\"mse-suggest-item...\">...</a>",
            "weight": 15
        }
    ]
}
```

### Поле `html`

Сервер заранее рендерит каждый результат через `pdoTools::getChunk` по шаблону, который задан в сниппет-форме (`&tpl=`). Клиенту приходит готовый HTML — для UI-вставки через `innerHTML`.

Внутри чанка плейсхолдеры зависят от адаптера:

- **`type = 'resource'`** (плеxодит через `ResourceAdapter`) — `pagetitle`, `longtitle`, `description`, `intro` и т. д.
- **`type = 'product'`** (через `MsProductAdapter`, при наличии miniShop3) — `price_display`, `old_price_display`, `thumb`, `article`, `has_discount`.

### Headless без сниппета

Если запрос идёт **без** `form` (например, SPA на другом домене вызывает API напрямую без рендера сниппета `mSearchForm`), сервер использует дефолтные значения: `limit=5` для suggest и `limit=10` для search, `tpl` из адаптера, `ctx` — из query-параметра, если указан, иначе без фильтра. `html` в ответе всё равно будет — рендер происходит на сервере.

::: warning Нет «сырых данных»
Endpoint всегда возвращает HTML в поле `html`. Чтобы получить структурированные данные на стороне SPA — придётся пройти через сниппет на странице (он напишет `formId` в кэш с минимальным чанком, который выводит JSON), либо подключить серверное расширение через событие `mseOnAfterSearch` и формировать свой ответ.
:::

## Headless-режим

`window.msearch` предоставляет программный API без привязки к DOM. Подходит для React, Vue, Svelte и любых кастомных интерфейсов.

### Подключение

```html
<script src="/assets/components/msearch/js/web/core/ApiClient.js"></script>
<script src="/assets/components/msearch/js/web/core/SearchAPI.js"></script>
<script src="/assets/components/msearch/js/web/modules/hooks.js"></script>
<script src="/assets/components/msearch/js/web/msearch.headless.js"></script>
```

### Конфигурация

```html
<script>
window.msearchConfig = {
    apiUrl: '/assets/components/msearch/api.php',
    ctx: 'web',
    autoInit: true
};
</script>
```

При `autoInit: true` (default) объект `window.msearch` инициализируется автоматически после загрузки DOM.

`ctx` в `msearchConfig` — публичный фильтр по контексту; передаётся в каждый запрос, если в options вызова не указан явно.

### Использование

```js
// Поиск
const result = await msearch.search('смартфон', { offset: 0 });
console.log(result.total);   // 42
console.log(result.items);   // [{id, url, type, html, weight}, ...]

// Автодополнение
const suggestions = await msearch.suggest('см');
console.log(suggestions.items); // [{id, url, type, html, weight}, ...]
```

### Опции вызова

| Опция | Применима к | Описание |
|-------|-------------|----------|
| `form` | search, suggest | formId, связывающий с серверной конфигурацией сниппета `mSearchForm` |
| `ctx` | search, suggest | Строка контекстов через запятую или массив. Перебивает `msearchConfig.ctx` |
| `offset` | search | Смещение пагинации |

### Ручная инициализация

```js
await msearch.init({
    apiUrl: '/assets/components/msearch/api.php',
    ctx: 'web'
});
```

### События DOM

| Событие | Описание |
|---------|----------|
| `msearch:ready` | Headless API инициализирован |
| `msearch:ui:ready` | UI-слой инициализирован (если подключён) |

```js
document.addEventListener('msearch:ready', (e) => {
    const msearch = e.detail.msearch;
    // API готов к использованию
});
```

## Система хуков {#hooks}

Хуки позволяют расширять поведение поиска на стороне клиента — модифицировать запросы, обрабатывать результаты, логировать.

### Доступные хуки

| Хук | Описание |
|-----|----------|
| `beforeSearch` | Перед отправкой поискового запроса |
| `afterSearch` | После получения результатов поиска |
| `beforeSuggest` | Перед запросом автодополнения |
| `afterSuggest` | После получения подсказок |
| `onError` | При ошибке любого запроса |

### Подписка

```js
// Добавить хук (возвращает функцию отписки)
const unsubscribe = msearchHooks.add('beforeSearch', function(context) {
    console.log('Ищем:', context.query);
    // Доступно для модификации:
    //   context.query    — поисковый запрос
    //   context.options  — параметры запроса (ctx, offset, form)
    //   context.cancelled = true — отменить запрос
    //   context.result   — подставленный результат (если cancelled)
});

// Отписаться
unsubscribe();
```

### Приоритеты

Хук с **меньшим** приоритетом выполняется раньше.

```js
msearchHooks.add('afterSearch', analyticsHook, 5);    // первый
msearchHooks.add('afterSearch', transformHook, 10);   // второй
msearchHooks.add('afterSearch', renderHook, 20);      // третий
```

### Примеры

#### Логирование запросов

```js
msearchHooks.add('afterSearch', function(context) {
    if (context.result && context.result.total > 0) {
        console.log(`Найдено ${context.result.total} по запросу "${context.query}"`);
    }
});
```

#### Принудительный фильтр по контексту

```js
msearchHooks.add('beforeSearch', function(context) {
    context.options.ctx = 'web';
});
```

#### Отмена запроса

```js
msearchHooks.add('beforeSearch', function(context) {
    if (context.query.length < 3) {
        context.cancelled = true;
        context.result = { success: true, items: [], total: 0 };
    }
});
```

#### Обработка ошибок

```js
msearchHooks.add('onError', function(context) {
    showNotification('Ошибка поиска: ' + context.error.message);
});
```

## UI-слой

UI-слой `MSearchUI` добавляет автокомплит к формам с атрибутом `data-msearch-form`. Подключается автоматически через сниппет `mSearchForm` при `autocomplete=1`.

### Защита от гонки

При быстром вводе UI отбрасывает устаревшие ответы — каждый запрос получает порядковый номер (`requestSeq`), и при возврате сравнивается с текущим. Ответы более раннего запроса игнорируются, новый запрос отменения не делает — только consumer-side фильтрация.

### Ручное создание

```js
const instance = MSearchUI.create(document.querySelector('#my-form'), {
    minQueryLength: 2,
    debounceDelay: 300,
    formId: 'abc123def456'
});
```

### Опции

| Опция | Default | Описание |
|-------|---------|----------|
| `inputSelector` | `.mse-input` | CSS-селектор поля ввода внутри формы |
| `resultsSelector` | `.mse-results` | CSS-селектор контейнера результатов (зарезервировано) |
| `autocomplete` | `true` | Включить автокомплит |
| `minQueryLength` | `2` | Минимальная длина запроса (на стороне клиента; сервер дополнительно проверяет `mse_suggest_min_query_length`) |
| `debounceDelay` | `300` | Задержка debounce, мс |
| `connectorUrl` | `''` | URL API endpoint (обычно подхватывается из `data-connector-url`) |
| `formId` | `''` | formId сниппета (обычно подхватывается из `data-form-id`) |

### Data-атрибуты формы

Опции UI можно задавать через data-атрибуты непосредственно на форме:

| Атрибут | Описание |
|---------|----------|
| `data-msearch-form` | Маркер для автоинициализации `msearch.js` |
| `data-connector-url` | URL API endpoint |
| `data-form-id` | 12-символьный formId, связывающий форму с серверной конфигурацией |
| `data-autocomplete` | `true` / `false` — включить автокомплит |
| `data-min-query-length` | Переопределяет `minQueryLength` |
| `data-debounce-delay` | Переопределяет `debounceDelay` (мс) |

::: tip Где взять formId
formId формируется сниппетом `mSearchForm` и попадает в чанк формы через плейсхолдер `{$formId}`. В дефолтном чанке `mSearch.form` он уже прописан в `data-form-id`. При построении формы вручную через `MSearchUI.create()` без сниппета — formId не нужен, сервер использует дефолтные параметры.
:::

### CSS-классы

#### Базовые

| Класс | Элемент |
|-------|---------|
| `.mse-form` | Форма поиска |
| `.mse-input` | Поле ввода |
| `.mse-button` | Кнопка отправки |
| `.mse-autocomplete` | Dropdown-список подсказок (`<ul>`) |
| `.mse-autocomplete.active` | Открытый dropdown |
| `.mse-autocomplete-item` | Элемент подсказки (`<li>`) |
| `.mse-autocomplete-item.active` | Выделенный элемент (стрелками) |

#### Строка подсказки (внутри `.mse-autocomplete-item`)

Эти классы используются в дефолтных чанках `mSearch.suggest.row`:

| Класс | Назначение |
|-------|------------|
| `.mse-suggest-item` | Корневая ссылка `<a>` внутри `<li>` |
| `.mse-suggest-item--resource` | Модификатор для обычных ресурсов |
| `.mse-suggest-item--product` | Модификатор для товаров msProduct |
| `.mse-suggest-thumb` | Превью товара (`<img>`) |
| `.mse-suggest-body` | Контейнер текстовых полей |
| `.mse-suggest-title` | Заголовок |
| `.mse-suggest-article` | Артикул товара |
| `.mse-suggest-intro` | Сниппет текста (для ресурсов) |
| `.mse-suggest-price` | Контейнер цены |
| `.mse-suggest-price-current` | Текущая цена |
| `.mse-suggest-price-old` | Старая цена (зачёркнута, при наличии скидки) |
| `.mse-highlight` | Подсветка совпадений в тексте (формируется на сервере как `<mark>`) |

### Управление экземплярами

```js
// Получить экземпляр по id формы
const instance = MSearchUI.get('my-form-id');

// Уничтожить экземпляр
MSearchUI.destroy('my-form-id');
```

## Примеры интеграции

### Vue 3

```html
<script src="/assets/components/msearch/js/web/core/ApiClient.js"></script>
<script src="/assets/components/msearch/js/web/core/SearchAPI.js"></script>
<script src="/assets/components/msearch/js/web/modules/hooks.js"></script>
<script src="/assets/components/msearch/js/web/msearch.headless.js"></script>
```

```js
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const query = ref('');
        const results = ref([]);
        const total = ref(0);

        async function doSearch() {
            if (query.value.length < 2) return;
            const data = await window.msearch.search(query.value, { ctx: 'web' });
            results.value = data.items;
            total.value = data.total;
        }

        return { query, results, total, doSearch };
    }
};
```

Поскольку `items[].html` — это готовый HTML, для рендера через Vue используйте `v-html`:

```html
<div v-for="item in results" :key="item.id" v-html="item.html" />
```

### React (минимальный пример)

```jsx
function Search() {
    const [query, setQuery] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (query.length < 2) { setItems([]); return; }
        const t = setTimeout(() => {
            window.msearch.suggest(query, { ctx: 'web' })
                .then(res => setItems(res.items));
        }, 300);
        return () => clearTimeout(t);
    }, [query]);

    return (
        <div>
            <input value={query} onChange={e => setQuery(e.target.value)} />
            <ul>
                {items.map(it => (
                    <li key={it.id} dangerouslySetInnerHTML={{ __html: it.html }} />
                ))}
            </ul>
        </div>
    );
}
```

## CORS

Публичный API (`api.php`) по умолчанию разрешает только same-origin запросы. Для кросс-доменных запросов укажите разрешённый Origin в системной настройке `mse_cors_origin` — см. [Системные настройки → mse_cors_origin](/components/msearch/system-settings#mse_cors_origin).

В headless-режиме без сниппета `mSearchForm` cookies не нужны (formId не передаётся, серверная конфигурация не используется) — стандартный CORS работает.

## Безопасность контракта

Резюме принципов:

- Клиент **не может** задать имя чанка, имя сниппета (`element`), `limit` или `elementProperties` — эти параметры приходят только из серверного кэша по `formId`.
- `ctx` — публичный фильтр по столбцу `context_key`, безопасен для приёма от клиента.
- `Highlighter` экранирует входной текст (`htmlspecialchars`) перед обёрткой в `<mark>` — поле `html` HTML-safe, вставка через `innerHTML` / `v-html` / `dangerouslySetInnerHTML` не открывает XSS.
- formId валидируется по regex `^[a-f0-9]{12}$` — попытка передать `../../etc/passwd` или скрипт отбрасывается.
