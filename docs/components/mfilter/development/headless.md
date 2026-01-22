# Headless API

REST API для интеграции с SPA-приложениями (Vue, React, Svelte и др.).

## Архитектура

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│  Your App       │────▶│  FilterAPI   │────▶│  Server     │
│  (Vue/React)    │◀────│  (JS Client) │◀────│  REST API   │
└─────────────────┘     └──────────────┘     └─────────────┘
         │                     │
         │              ┌──────┴──────┐
         │              │   Hooks     │
         │              │  (events)   │
         │              └─────────────┘
         │
    ┌────┴────┐
    │ Custom  │
    │   UI    │
    └─────────┘
```

## Подключение

### Минимальный набор (только API)

```html
<script src="/assets/components/mfilter/js/web/core/ApiClient.js"></script>
<script src="/assets/components/mfilter/js/web/core/FilterAPI.js"></script>
<script src="/assets/components/mfilter/js/web/modules/hooks.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.headless.js"></script>
```

### Конфигурация

```html
<script>
window.mfilterConfig = {
    apiUrl: '/assets/components/mfilter/api.php',
    resourceId: 5,  // ID категории
    debug: false
};
</script>
```

## JavaScript API

### Инициализация

```javascript
// Ждём готовности
document.addEventListener('mfilter:ready', async () => {
    // mfilter готов к использованию
});

// Или ручная инициализация
await mfilter.init({ resourceId: 5 });
```

### Получение схемы фильтров

```javascript
const response = await mfilter.getSchema(resourceId);

if (response.success) {
    const { filters, sort_options, limit_options } = response.data;

    // filters = {
    //     color: {
    //         key: 'color',
    //         type: 'checkbox',
    //         label: 'Цвет',
    //         values: [
    //             { value: 'red', label: 'Красный', count: 15 },
    //             { value: 'blue', label: 'Синий', count: 8 }
    //         ]
    //     },
    //     price: {
    //         key: 'price',
    //         type: 'range',
    //         label: 'Цена',
    //         min: 100,
    //         max: 50000,
    //         step: 100
    //     }
    // }
}
```

### Применение фильтров

```javascript
const response = await mfilter.apply(
    { color: ['red', 'blue'], price: { min: 1000, max: 5000 } },
    { sort: 'price-asc', page: 1, limit: 24 }
);

if (response.success) {
    const { items, total, page, pageCount, suggestions, seo, urls } = response.data;

    // items — товары (JSON или HTML)
    // total — общее количество
    // suggestions — обновлённые counts
    // seo — данные для SEO
    // urls — SEO URLs
}
```

### Получение suggestions (counts)

```javascript
// Легковесный запрос без загрузки товаров
const response = await mfilter.getSuggestions({ color: ['red'] });

// response.data = {
//     color: [{ value: 'red', count: 15 }, { value: 'blue', count: 8 }],
//     size: [...],
//     total: 150
// }
```

### Построение SEO URL

```javascript
const response = await mfilter.buildUrl(
    { color: ['red'] },
    { sort: 'price-asc', page: 2 }
);

// response.data = {
//     url: '/electronics/color_red/sort_price-asc/page_2/',
//     canonical: '/electronics/',
//     prev: '/electronics/color_red/sort_price-asc/'
// }
```

### Парсинг URL

```javascript
const response = await mfilter.parseUrl('/catalog/brand_apple/color_red/');

// response.data = {
//     filters: { brand: ['apple'], color: ['red'] },
//     tech: { sort: null, page: 1 },
//     page: 1
// }
```

## REST API Endpoints

### GET /api/v1/filter/schema

Получить схему фильтров.

**Параметры:**
| Параметр | Тип | Описание |
|----------|-----|----------|
| `resource_id` | int | ID ресурса/категории (обязательный) |
| `filters` | object | Текущее состояние фильтров |
| `with_values` | bool | Включать значения (default: true) |
| `with_counts` | bool | Включать counts (default: true) |

**Ответ:**
```json
{
    "success": true,
    "data": {
        "filters": {
            "brand": {
                "key": "brand",
                "type": "checkbox",
                "label": "Бренд",
                "values": [
                    { "value": "apple", "label": "Apple", "count": 25 }
                ]
            },
            "price": {
                "key": "price",
                "type": "range",
                "label": "Цена",
                "min": 1000,
                "max": 100000,
                "step": 100
            }
        },
        "sort_options": [
            { "value": "price-asc", "label": "Сначала дешёвые" }
        ],
        "limit_options": [12, 24, 48, 96],
        "resource_id": 5
    }
}
```

### POST /api/v1/filter/apply

Применить фильтры и получить результаты.

**Параметры:**
| Параметр | Тип | Описание |
|----------|-----|----------|
| `resource_id` | int | ID ресурса (обязательный) |
| `filters` | object | Значения фильтров |
| `sort` | string | Сортировка |
| `page` | int | Номер страницы |
| `limit` | int | Элементов на странице |
| `format` | string | Формат: json или html |

**Ответ:**
```json
{
    "success": true,
    "data": {
        "items": [...],
        "total": 150,
        "page": 1,
        "pageCount": 7,
        "limit": 24,
        "suggestions": { ... },
        "seo": {
            "title": "Apple — купить в Москве",
            "h1": "Apple",
            "description": "..."
        },
        "urls": {
            "current": "/category/brand_apple/",
            "canonical": "/category/",
            "prev": null,
            "next": "/category/brand_apple/page_2/"
        }
    }
}
```

### POST /api/v1/filter/suggestions

Получить только suggestions без товаров.

### POST /api/v1/filter/build-url

Построить SEO URL из параметров.

### POST /api/v1/filter/parse-url

Распарсить URL в параметры.

### GET /api/v1/filter/values

Получить значения одного фильтра (lazy loading).

**Параметры:**
| Параметр | Тип | Описание |
|----------|-----|----------|
| `resource_id` | int | ID ресурса |
| `filter_key` | string | Ключ фильтра |
| `search` | string | Поисковый запрос |
| `limit` | int | Максимум значений |

## Система хуков

### Регистрация хуков

```javascript
// Перед применением фильтров
mfilterHooks.add('beforeApply', async (context) => {
    console.log('Params:', context.params);

    // Модифицировать параметры
    context.params.limit = 24;

    // Отменить запрос
    // context.cancel = true;
    // context.cancelReason = 'Validation failed';
});

// После применения
mfilterHooks.add('afterApply', async (context) => {
    console.log('Result:', context.result);

    // Аналитика
    analytics.track('filter_applied', {
        filters: context.params.filters,
        total: context.result.data.total
    });
});

// Обработка ошибок
mfilterHooks.add('onError', async (context) => {
    console.error('Error in', context.hookName, context.error);
});
```

### Доступные хуки

| Хук | Описание | context |
|-----|----------|---------|
| `beforeGetSchema` | Перед получением схемы | `{ resourceId, params, cancel }` |
| `afterGetSchema` | После получения схемы | `{ resourceId, params, result }` |
| `beforeApply` | Перед применением | `{ params, cancel }` |
| `afterApply` | После применения | `{ params, result }` |
| `beforeGetSuggestions` | Перед suggestions | `{ params, cancel }` |
| `afterGetSuggestions` | После suggestions | `{ params, result }` |
| `beforeBuildUrl` | Перед построением URL | `{ params, cancel }` |
| `afterBuildUrl` | После построения URL | `{ params, result }` |
| `onError` | При ошибке | `{ error, hookName, context }` |

### Приоритеты

```javascript
// Высокий приоритет (выполнится раньше)
mfilterHooks.add('beforeApply', handler1, 5);

// Стандартный приоритет (10)
mfilterHooks.add('beforeApply', handler2);

// Низкий приоритет (выполнится позже)
mfilterHooks.add('beforeApply', handler3, 20);
```

### Удаление хуков

```javascript
const unsubscribe = mfilterHooks.add('beforeApply', handler);
unsubscribe(); // Отписаться

mfilterHooks.remove('beforeApply', handler);
mfilterHooks.clear('beforeApply'); // Все хуки события
mfilterHooks.clear(); // Все хуки
```

## Пример: Vue 3

```vue
<script setup>
import { ref, onMounted } from 'vue'

const filters = ref({})
const products = ref([])
const total = ref(0)
const loading = ref(false)
const schema = ref(null)

onMounted(async () => {
    // Ждём готовности mfilter
    if (!window.mfilter?.initialized) {
        await new Promise(resolve => {
            document.addEventListener('mfilter:ready', resolve, { once: true })
        })
    }

    // Загружаем схему
    const schemaResponse = await mfilter.getSchema()
    if (schemaResponse.success) {
        schema.value = schemaResponse.data.filters
    }

    // Загружаем начальные результаты
    await applyFilters()
})

async function applyFilters() {
    loading.value = true

    const response = await mfilter.apply(filters.value, {
        sort: 'price-asc',
        page: 1,
        limit: 24
    })

    if (response.success) {
        products.value = response.data.items
        total.value = response.data.total
        history.pushState({}, '', response.data.urls.current)
    }

    loading.value = false
}

function toggleFilter(key, value) {
    if (!filters.value[key]) {
        filters.value[key] = []
    }

    const index = filters.value[key].indexOf(value)
    if (index === -1) {
        filters.value[key].push(value)
    } else {
        filters.value[key].splice(index, 1)
    }

    applyFilters()
}
</script>

<template>
    <div class="filter-page">
        <aside v-if="schema">
            <div v-for="(filter, key) in schema" :key="key">
                <h3>{{ filter.label }}</h3>

                <template v-if="filter.type === 'checkbox'">
                    <label v-for="opt in filter.values" :key="opt.value">
                        <input
                            type="checkbox"
                            :checked="filters[key]?.includes(opt.value)"
                            @change="toggleFilter(key, opt.value)"
                        >
                        {{ opt.label }} ({{ opt.count }})
                    </label>
                </template>
            </div>
        </aside>

        <main>
            <div v-if="loading">Loading...</div>
            <div v-else class="products">
                <div v-for="product in products" :key="product.id">
                    {{ product.pagetitle }}
                </div>
            </div>
            <p>Total: {{ total }}</p>
        </main>
    </div>
</template>
```

## Совместимость

- Headless API работает параллельно с SSR режимом
- Один бэкенд обслуживает оба режима
- Можно использовать оба подхода на разных страницах
