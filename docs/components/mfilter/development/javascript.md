# JavaScript

Архитектура и подключение JavaScript mFilter.

## Архитектура

mFilter использует двухуровневую архитектуру:

```
┌─────────────────────────────────────────┐
│              mfilter.js                  │  ← Точка входа, автоинициализация
├─────────────────────────────────────────┤
│              UI Layer                    │  ← DOM-bindings для SSR
│            (FilterUI.js)                 │
├─────────────────────────────────────────┤
│             API Core                     │  ← Headless ядро
│  ApiClient.js │ FilterAPI.js │ hooks.js │
└─────────────────────────────────────────┘
```

### API Core (Headless)

Независимое ядро без привязки к DOM:

- **ApiClient.js** — HTTP-клиент для запросов к серверу
- **FilterAPI.js** — методы работы с фильтрами
- **hooks.js** — система хуков для расширения
- **mfilter.headless.js** — инициализация и экспорт `window.mfilter`

### UI Layer (SSR)

DOM-привязки для работы с готовой разметкой:

- **FilterUI.js** — управление формой, результатами, пагинацией
- **mfilter.slider.js** — интеграция с noUiSlider
- **mfilter.js** — автоинициализация

## Файлы

| Файл | Размер | Назначение |
|------|--------|------------|
| `core/ApiClient.js` | ~3 KB | HTTP-клиент |
| `core/FilterAPI.js` | ~5 KB | API методы |
| `modules/hooks.js` | ~3 KB | Система хуков |
| `mfilter.headless.js` | ~4 KB | Headless точка входа |
| `ui/FilterUI.js` | ~40 KB | UI для SSR |
| `mfilter.slider.js` | ~8 KB | noUiSlider интеграция |
| `mfilter.js` | ~4 KB | Автоинициализация |

## Подключение

### Автоматическое (по умолчанию)

Плагин mFilter автоматически подключает скрипты на страницах с фильтрами.

Управление через системную настройку `mfilter.register_frontend`:

- `true` — автоподключение (по умолчанию)
- `false` — отключить, подключать вручную

### Ручное подключение

```html
<!-- Базовые стили -->
<link rel="stylesheet" href="/assets/components/mfilter/css/web/mfilter.css">

<!-- API Core (обязательно) -->
<script src="/assets/components/mfilter/js/web/core/ApiClient.js"></script>
<script src="/assets/components/mfilter/js/web/core/FilterAPI.js"></script>
<script src="/assets/components/mfilter/js/web/modules/hooks.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.headless.js"></script>

<!-- UI Layer (для SSR) -->
<script src="/assets/components/mfilter/js/web/ui/FilterUI.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.slider.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.js"></script>
```

### Минимальный набор (только Headless)

Для SPA-приложений:

```html
<script src="/assets/components/mfilter/js/web/core/ApiClient.js"></script>
<script src="/assets/components/mfilter/js/web/core/FilterAPI.js"></script>
<script src="/assets/components/mfilter/js/web/modules/hooks.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.headless.js"></script>
```

## Конфигурация

Глобальная конфигурация через `window.mfilterConfig`:

```html
<script>
window.mfilterConfig = {
    apiUrl: '/assets/components/mfilter/api.php',
    resourceId: 5,      // ID категории
    debug: false        // Режим отладки
};
</script>
```

## Инициализация

### Автоматическая

Элементы с `data-mfilter` инициализируются автоматически:

```html
<form data-mfilter data-mfilter-results=".results">
    <!-- фильтры -->
</form>
```

### Ручная

```javascript
// Создать инстанс
const instance = mfilterInit('#my-filter', {
    ajax: true,
    autoSubmit: true,
    autoSubmitDelay: 500
});

// Получить существующий инстанс
const filter = mfilterGet('my-filter');

// Уничтожить инстанс
mfilterDestroy('my-filter');
```

## Data-атрибуты

### На контейнере/форме

| Атрибут | Описание |
|---------|----------|
| `data-mfilter` | Маркер для автоинициализации |
| `data-mfilter-results` | CSS-селектор блока результатов |
| `data-mfilter-pagination` | CSS-селектор пагинации |
| `data-mfilter-ajax` | Включить AJAX (true/false) |
| `data-mfilter-mode` | Режим: form или instant |
| `data-mfilter-auto-submit` | Авто-отправка (true/false) |
| `data-mfilter-delay` | Задержка авто-отправки (мс) |
| `data-mfilter-seo-url` | SEO URL (true/false) |
| `data-mfilter-push-state` | Обновлять URL (true/false) |
| `data-mfilter-scroll-to-results` | Скролл к результатам |
| `data-mfilter-scroll-offset` | Отступ скролла (px) |
| `data-mfilter-debug` | Режим отладки |
| `data-base-url` | Базовый URL категории |
| `data-resource-id` | ID ресурса |

### На элементах

| Атрибут | Описание |
|---------|----------|
| `data-filter` | Ключ фильтра (на блоке) |
| `data-range="min"` | Поле минимума диапазона |
| `data-range="max"` | Поле максимума диапазона |
| `data-mfilter-slider` | Маркер для noUiSlider |
| `data-mfilter-sort` | Элемент сортировки |
| `data-mfilter-limit` | Элемент выбора лимита |
| `data-mfilter-tpl` | Элемент переключения шаблона |

## События DOM

| Событие | Описание | detail |
|---------|----------|--------|
| `mfilter:ready` | API Core инициализирован | `{ mfilter }` |
| `mfilter:ui:ready` | UI инициализирован | `{ instances }` |
| `mfilter:contentLoaded` | Новый контент загружен (AJAX) | `{ container }` |
| `mfilter:beforeSubmit` | Перед отправкой | `{ state, instance }` |
| `mfilter:afterSubmit` | После отправки | `{ state, instance }` |
| `mfilter:success` | Успешный ответ | `{ response, instance }` |
| `mfilter:error` | Ошибка | `{ error, instance }` |

### Подписка на события

```javascript
document.addEventListener('mfilter:ui:ready', (e) => {
    console.log('Инстансы:', e.detail.instances);
});

document.addEventListener('mfilter:success', (e) => {
    console.log('Результаты:', e.detail.response);
});
```

## Глобальные объекты

| Объект | Описание |
|--------|----------|
| `window.mfilter` | API Core (headless) |
| `window.mfilterHooks` | Система хуков |
| `window.MFilterUI` | Конструктор UI |
| `window.MFilterSlider` | API слайдеров |
| `window.mfilterInit()` | Создать инстанс |
| `window.mfilterGet()` | Получить инстанс |
| `window.mfilterDestroy()` | Удалить инстанс |

## noUiSlider

Для диапазонных фильтров используется [noUiSlider](https://refreshless.com/nouislider/).

### Подключение

Подключите noUiSlider до скриптов mFilter:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nouislider@15/dist/nouislider.min.css">
<script src="https://cdn.jsdelivr.net/npm/nouislider@15/dist/nouislider.min.js"></script>
```

### Кастомизация слайдера

```javascript
// Создать слайдер вручную
MFilterSlider.create('#my-slider', {
    start: [1000, 50000],
    range: { min: 0, max: 100000 },
    step: 100,
    tooltips: true,
    format: MFilterSlider.formats.currency
});

// Обновить диапазон
MFilterSlider.updateRange('#my-slider', 0, 200000);

// Установить значения
MFilterSlider.set('#my-slider', [5000, 30000]);
```

### Форматы

```javascript
MFilterSlider.formats.integer   // 12345
MFilterSlider.formats.float     // 123.45
MFilterSlider.formats.currency  // 12 345 ₽
MFilterSlider.formats.percent   // 50%
```

## jQuery (опционально)

Если jQuery загружен, доступен плагин:

```javascript
$('#my-filter').mfilter({
    ajax: true,
    autoSubmit: true
});
```
