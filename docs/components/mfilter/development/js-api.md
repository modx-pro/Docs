# JS API

Программное управление фильтрами через JavaScript API.

## Получение инстанса

```javascript
// По ID элемента
const filter = mfilterGet('mfilter-form');

// Через MFilterUI
const filter = MFilterUI.get('mfilter-form');

// Все инстансы
const all = MFilterUI.instances; // Map
```

## Методы инстанса

### Управление фильтрами

```javascript
// Установить значение фильтра
filter.setFilter('brand', 'apple');
filter.setFilter('brand', ['apple', 'samsung']); // множественный

// Удалить значение
filter.removeFilter('brand', 'apple');

// Удалить весь фильтр
filter.removeFilter('brand');

// Сбросить все фильтры
filter.reset();

// Получить текущие фильтры
const filters = filter.getFilters();
// { brand: ['apple'], color: ['red', 'blue'] }

// Получить полное состояние
const state = filter.getState();
// { filters: {...}, page: 1, sort: 'price-asc', limit: 24 }
```

### Сортировка и пагинация

```javascript
// Установить сортировку
filter.setSort('price-asc');
filter.setSort('price-desc');

// Установить лимит
filter.setLimit(48);

// Перейти на страницу
filter.goToPage(3);

// Загрузить ещё (для бесконечной прокрутки)
filter.loadMore();
```

### Отправка

```javascript
// Отправить форму (собирает данные из DOM)
filter.submit();

// Отправить без сбора данных (использует текущий state)
filter.submitWithoutCollect();
```

### Синхронизация

```javascript
// Синхронизировать форму с внутренним состоянием
filter.syncFormWithState();
```

### События

```javascript
// Подписаться на событие
filter.on('change', (data) => {
    console.log('Изменение:', data.field, data.value);
});

filter.on('success', (data) => {
    console.log('Результаты:', data.response);
});

filter.on('error', (data) => {
    console.error('Ошибка:', data.error);
});

// Отписаться
filter.off('change', handler);
filter.off('change'); // все обработчики события
```

### Доступные события инстанса

| Событие | Описание | Данные |
|---------|----------|--------|
| `init` | Инициализация | `{ instance }` |
| `change` | Изменение поля | `{ field, name, value, state }` |
| `beforeSubmit` | Перед отправкой | `{ state, instance, cancel }` |
| `afterSubmit` | После отправки | `{ state, instance }` |
| `success` | Успешный ответ | `{ response, instance }` |
| `error` | Ошибка | `{ error, instance }` |
| `seoUpdate` | Обновление SEO | `{ seoData, instance }` |
| `destroy` | Уничтожение | `{ instance }` |

## Примеры

### Внешний фильтр

```html
<select id="quick-brand">
    <option value="">Все бренды</option>
    <option value="apple">Apple</option>
    <option value="samsung">Samsung</option>
</select>

<script>
document.getElementById('quick-brand').addEventListener('change', (e) => {
    const filter = mfilterGet('main-filter');

    if (e.target.value) {
        filter.setFilter('vendor', e.target.value);
    } else {
        filter.removeFilter('vendor');
    }

    filter.submit();
});
</script>
```

### Сброс при клике на кнопку

```html
<button id="clear-filters">Сбросить все фильтры</button>

<script>
document.getElementById('clear-filters').addEventListener('click', () => {
    const filter = mfilterGet('mfilter-form');
    filter.reset();
});
</script>
```

### Программная фильтрация

```javascript
const filter = mfilterGet('mfilter-form');

// Установить несколько фильтров
filter.setFilter('brand', ['apple', 'samsung']);
filter.setFilter('price', { min: 10000, max: 50000 });
filter.setSort('price-asc');
filter.setLimit(24);

// Отправить
filter.submit();
```

### Отслеживание изменений

```javascript
const filter = mfilterGet('mfilter-form');

filter.on('success', ({ response }) => {
    // Отправить в аналитику
    gtag('event', 'filter_applied', {
        filters: JSON.stringify(filter.getFilters()),
        results_count: response.total
    });
});
```

### Отмена отправки

```javascript
const filter = mfilterGet('mfilter-form');

filter.on('beforeSubmit', (data) => {
    const filters = data.state.filters;

    // Отменить если выбрано слишком много фильтров
    if (Object.keys(filters).length > 5) {
        data.cancel = true;
        alert('Выберите не более 5 фильтров');
    }
});
```

### Кастомная обработка результатов

```javascript
const filter = mfilterGet('mfilter-form');

filter.on('success', ({ response }) => {
    // Обновить счётчик в шапке
    document.querySelector('.header-count').textContent = response.total;

    // Обновить URL без использования встроенного pushState
    if (response.urls?.current) {
        window.history.replaceState({}, '', response.urls.current);
    }
});
```

### Синхронизация двух форм

```javascript
const mainFilter = mfilterGet('main-filter');
const mobileFilter = mfilterGet('mobile-filter');

// При изменении основной формы — обновить мобильную
mainFilter.on('success', () => {
    const state = mainFilter.getState();

    // Вручную обновить состояние мобильной формы
    Object.entries(state.filters).forEach(([key, values]) => {
        mobileFilter.setFilter(key, values);
    });
    mobileFilter.syncFormWithState();
});
```

## Создание инстанса

```javascript
// Создать новый инстанс
const instance = mfilterInit('#my-element', {
    ajax: true,
    seoUrl: true,
    pushState: true,
    autoSubmit: true,
    autoSubmitDelay: 500,
    resultsSelector: '.my-results',
    paginationSelector: '.my-pagination',
    scrollToResults: true,
    scrollOffset: 100,

    // Callbacks
    onInit: function(instance) {
        console.log('Инициализирован');
    },
    onChange: function(field, state) {
        console.log('Изменено:', field.name);
    },
    onBeforeSubmit: function(state) {
        console.log('Отправка...');
    },
    onSuccess: function(response) {
        console.log('Результаты:', response);
    },
    onError: function(error) {
        console.error('Ошибка:', error);
    }
});
```

## Опции инстанса

| Опция | По умолчанию | Описание |
|-------|--------------|----------|
| `ajax` | `true` | Использовать AJAX |
| `ajaxMode` | `form` | Режим: form или instant |
| `seoUrl` | `true` | SEO-friendly URL |
| `pushState` | `true` | Обновлять URL браузера |
| `autoSubmit` | `false` | Авто-отправка при изменении |
| `autoSubmitDelay` | `500` | Задержка авто-отправки (мс) |
| `resetPage` | `true` | Сбрасывать страницу при фильтрации |
| `scrollToResults` | `true` | Скроллить к результатам |
| `scrollOffset` | `100` | Отступ скролла (px) |
| `loadingClass` | `mfilter-loading` | CSS класс загрузки |
| `loadingOverlay` | `true` | Показывать оверлей |
| `resultsSelector` | `.mfilter-results` | Селектор результатов |
| `paginationSelector` | `.mfilter-pagination` | Селектор пагинации |
| `paginationMode` | `links` | Режим: links, loadmore, infinite |
| `debug` | `false` | Режим отладки |

## Уничтожение

```javascript
// По ID
mfilterDestroy('mfilter-form');

// Через MFilterUI
MFilterUI.destroy('mfilter-form');
```
