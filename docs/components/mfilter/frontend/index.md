# Фронтенд

Документация по шаблонам и вёрстке фронтенда mFilter.

## Структура

| Раздел | Описание |
|--------|----------|
| [Шаблоны](templates) | Чанки и разметка |
| [Плейсхолдеры](placeholders) | Переменные для шаблонов |

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
| `mfilter-count` | Счётчик товаров |

## Шаблоны по умолчанию

Встроенные шаблоны находятся в:

```
core/components/mfilter/elements/chunks/
```

Для кастомизации скопируйте в свою папку и укажите путь через параметр `tpl*`.
