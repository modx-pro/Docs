# JavaScript API

mSearch предоставляет слоёную JavaScript-архитектуру для интеграции поиска на фронтенде. Можно использовать полный стек с UI, или только headless-режим для кастомных интерфейсов.

## Архитектура

```
ApiClient        — HTTP-клиент для API
    ↓
SearchAPI        — фасад поискового API
    ↓
msearchHooks     — система хуков
    ↓
msearch          — headless точка входа (window.msearch)
    ↓
MSearchUI        — UI-слой с автокомплитом (опционально)
    ↓
msearch.js       — автоинициализация (опционально)
```

## Публичный API endpoint

Все JS-запросы идут на `assets/components/msearch/api.php`.

### Поиск

```
GET /assets/components/msearch/api.php?route=/search&query=текст&limit=10&offset=0&ctx=web
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
            "pagetitle": "Заголовок",
            "longtitle": "Расширенный заголовок",
            "description": "Описание",
            "uri": "page/alias",
            "url": "https://site.com/page/alias",
            "intro": "Фрагмент с <mark>подсветкой</mark>",
            "weight": 45.0
        }
    ]
}
```

### Автодополнение

```
GET /assets/components/msearch/api.php?route=/search/suggest&query=те&limit=5&ctx=web
```

Ответ:

```json
{
    "success": true,
    "items": [
        {
            "id": 123,
            "pagetitle": "Заголовок",
            "url": "https://site.com/page/alias",
            "intro": "Фрагмент с <mark>подсветкой</mark>"
        }
    ]
}
```

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `query` | string | Поисковый запрос |
| `limit` | int | Количество результатов (по умолчанию 10 для search, 5 для suggest) |
| `offset` | int | Смещение (только для search) |
| `ctx` | string | Контексты через запятую (например `web` или `web,ru`) |

## Headless-режим

Headless-режим предоставляет программный API (`window.msearch`) без привязки к DOM. Подходит для React, Vue, Svelte и любых кастомных интерфейсов.

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

При `autoInit: true` (по умолчанию) объект `window.msearch` инициализируется автоматически после загрузки DOM.

### Использование

```js
// Поиск
const result = await msearch.search('смартфон', { limit: 5 });
console.log(result.total);   // 42
console.log(result.items);   // [{id, pagetitle, url, intro, weight}, ...]

// Автодополнение
const suggestions = await msearch.suggest('см', { limit: 3 });
console.log(suggestions.items); // [{id, pagetitle, url, intro}, ...]
```

### Ручная инициализация

```js
await msearch.init({
    apiUrl: '/assets/components/msearch/api.php',
    ctx: 'web'
});
```

### События

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

## Система хуков

Хуки позволяют расширять поведение поиска: модифицировать запросы, обрабатывать результаты, логировать.

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
    // Можно модифицировать:
    // context.query — поисковый запрос
    // context.options — параметры запроса
    // context.cancelled = true — отменить запрос
});

// Отписаться
unsubscribe();
```

### Приоритеты

```js
// Хук с более низким числом выполняется раньше
msearchHooks.add('afterSearch', analyticsHook, 5);    // первый
msearchHooks.add('afterSearch', transformHook, 10);    // второй
msearchHooks.add('afterSearch', renderHook, 20);       // третий
```

### Примеры

#### Логирование поисковых запросов

```js
msearchHooks.add('afterSearch', function(context) {
    if (context.result && context.result.total > 0) {
        console.log(`Найдено ${context.result.total} по запросу "${context.query}"`);
    }
});
```

#### Модификация запроса

```js
msearchHooks.add('beforeSearch', function(context) {
    // Добавить фильтр по контексту
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

UI-слой добавляет автокомплит к формам с атрибутом `data-msearch-form`. Подключается автоматически через сниппет mSearchForm при `autocomplete=1`.

### Ручное создание

```js
const instance = MSearchUI.create(document.querySelector('#my-form'), {
    minQueryLength: 2,
    debounceDelay: 300,
    ctx: 'web'
});
```

### Data-атрибуты

Форма может передавать настройки через data-атрибуты:

| Атрибут | Описание |
|---------|----------|
| `data-msearch-form` | Маркер для автоинициализации |
| `data-ctx` | Контекст для фильтрации |
| `data-connector-url` | URL API endpoint |
| `data-autocomplete` | `true` / `false` |
| `data-min-query-length` | Минимальная длина запроса (по умолчанию 2) |
| `data-debounce-delay` | Задержка debounce в мс (по умолчанию 300) |

### CSS-классы

| Класс | Элемент |
|-------|---------|
| `.mse-form` | Форма поиска |
| `.mse-input` | Поле ввода |
| `.mse-button` | Кнопка отправки |
| `.mse-autocomplete` | Dropdown-список подсказок |
| `.mse-autocomplete.active` | Открытый dropdown |
| `.mse-autocomplete-item` | Элемент подсказки |
| `.mse-autocomplete-item.active` | Выделенный элемент (стрелками) |

### Управление экземплярами

```js
// Получить экземпляр по ID формы
const instance = MSearchUI.get('my-form-id');

// Уничтожить экземпляр
MSearchUI.destroy('my-form-id');
```

## Пример: Vue 3 интеграция

```html
<script src="/assets/components/msearch/js/web/core/ApiClient.js"></script>
<script src="/assets/components/msearch/js/web/core/SearchAPI.js"></script>
<script src="/assets/components/msearch/js/web/modules/hooks.js"></script>
<script src="/assets/components/msearch/js/web/msearch.headless.js"></script>
```

```js
// В Vue-компоненте
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const query = ref('');
        const results = ref([]);
        const total = ref(0);

        onMounted(() => {
            // msearch уже инициализирован через msearchConfig
        });

        async function search() {
            if (query.value.length < 2) return;
            const data = await window.msearch.search(query.value, { limit: 10 });
            results.value = data.items;
            total.value = data.total;
        }

        return { query, results, total, search };
    }
};
```

## CORS

Публичный API (`api.php`) по умолчанию разрешает только same-origin запросы. Для кросс-доменных запросов укажите разрешённый Origin в системной настройке `mse_cors_origin`.
