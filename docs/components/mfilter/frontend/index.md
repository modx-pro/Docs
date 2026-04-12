# Фронтенд

Документация по шаблонам и вёрстке фронтенда mFilter.

## Структура

| Раздел | Описание |
|--------|----------|
| [Шаблоны](templates) | Чанки и разметка |
| [Плейсхолдеры](placeholders) | Переменные для шаблонов |
| [Пагинация](pagination) | Режимы, шаблоны, кнопка "Показать ещё" |

## Обзор

mFilter использует Fenom для шаблонизации. Основные компоненты фронтенда:

### Форма фильтров

```html
<form id="mfilter-form" data-mfilter-form>
    <!-- Фильтры -->
</form>
```

### Результаты

```html
<div id="mfilter-results" data-mfilter-results>
    <!-- Товары/ресурсы -->
</div>
```

### Пагинация

```html
<div id="mfilter-pagination" data-mfilter-pagination>
    <!-- Постраничная навигация -->
</div>
```

## Быстрый старт

### Базовая разметка

```html
<!-- Сниппет формы -->
[[!mFilterForm]]

<!-- Сниппет результатов -->
[[!mFilter?
    &element=`msProducts`
    &paginator=`pdoPage`
    &parents=`5`
]]
```

### Кастомная разметка

```html
<div class="catalog">
    <aside class="catalog__sidebar">
        [[!mFilterForm?
            &tplOuter=`@FILE chunks/mfilter/form.outer.tpl`
            &tplFilter.default=`@FILE chunks/mfilter/filter.default.tpl`
        ]]
    </aside>

    <main class="catalog__content">
        <div data-mfilter-results>
            [[!mFilter?
                &element=`msProducts`
                &paginator=`pdoPage`
                &tpl=`@FILE chunks/product.card.tpl`
            ]]
        </div>

        <div data-mfilter-pagination>
            [[!+page.nav]]
        </div>
    </main>
</div>
```

## Data-атрибуты

### Обязательные

| Атрибут | Элемент | Описание |
|---------|---------|----------|
| `data-mfilter-form` | form | Контейнер формы |
| `data-mfilter-results` | div | Контейнер результатов |

### Опциональные

| Атрибут | Элемент | Описание |
|---------|---------|----------|
| `data-mfilter-pagination` | div | Контейнер пагинации |
| `data-mfilter-pagination-mode` | form | Режим пагинации: `links` (по умолчанию), `loadmore`, `infinite` |
| `data-mfilter-total` | span | Количество результатов |
| `data-mfilter-filter` | fieldset | Блок фильтра |
| `data-mfilter-key` | input | Ключ фильтра |

## CSS-классы

### Состояния

| Класс | Описание |
|-------|----------|
| `mfilter-loading` | Загрузка данных |
| `mfilter-empty` | Нет результатов |
| `mfilter-active` | Есть активные фильтры |

### Элементы формы

| Класс | Описание |
|-------|----------|
| `mfilter-filter` | Блок фильтра |
| `mfilter-filter--disabled` | Недоступный фильтр |
| `mfilter-value` | Значение фильтра |
| `mfilter-value--selected` | Выбранное значение |
| `mfilter-value--disabled` | Недоступное значение |
| `mfilter-item-empty` | Значение с count=0 |
| `mfilter-count` | Счётчик товаров |

## Suggestions (подсказки)

После применения фильтра сервер возвращает `suggestions` — количество товаров для каждого значения фильтра. На основе этих данных JS обновляет UI:

### Checkbox/radio

- Элемент `.mfilter-count` обновляется числом
- Контейнер `.mfilter-item` получает класс `mfilter-item-empty` при count=0

### Select

- `<option>` с count=0 получают атрибут `disabled` (серые, нельзя выбрать)
- `<option>` с count>0 — `disabled` снимается
- Пустой `<option value="">` (placeholder) не блокируется

### Range (числовые)

- Обновляются доступные min/max через `data-available-min`, `data-available-max`
- Слайдер (если есть) обновляет диапазон

## JS API

### Глобальный объект

```javascript
// Получить экземпляр фильтра
const instance = window.MFilterUI.get('mfilter-form');

// Состояние
instance.state.filters   // активные фильтры
instance.state.page      // текущая страница
instance.state.pageCount // всего страниц
instance.state.total     // всего результатов
instance.state.sort      // текущая сортировка
instance.state.limit     // лимит на странице
```

### События

```javascript
document.addEventListener('mfilter:ui:ready', function(e) {
    const instance = e.detail.instances.values().next().value;

    instance.on('success', function(data) {
        console.log('Фильтр применён', data.response);
    });

    instance.on('change', function(data) {
        console.log('Поле изменено', data.field);
    });
});
```

| Событие | Описание |
|---------|----------|
| `init` | Экземпляр инициализирован |
| `change` | Изменено поле формы |
| `beforeSubmit` | Перед отправкой запроса (можно отменить через `cancel: true`) |
| `success` | Ответ получен. `data.append = true` — для loadMore |
| `error` | Ошибка запроса |
| `afterSubmit` | После завершения запроса (всегда) |
| `seoUpdate` | SEO-данные обновлены |

### Методы

```javascript
instance.submit()                    // Применить фильтры
instance.reset()                     // Сбросить всё
instance.loadMore()                  // Загрузить следующую страницу
instance.setFilter('color', ['red']) // Установить фильтр
instance.removeFilter('color')       // Убрать фильтр
instance.goToPage(3)                 // Перейти на страницу
instance.syncFormWithState()         // Синхронизировать форму с state
```

## Шаблоны по умолчанию

Встроенные шаблоны находятся в:

```
core/components/mfilter/elements/chunks/
```

Для кастомизации скопируйте в свою папку и укажите путь через параметр `tpl*`.
