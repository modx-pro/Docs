# Рецепты

Практические примеры решения типовых задач с mFilter.

## Содержание

| Рецепт | Описание |
|--------|----------|
| [Сортировка значений](filter-values-sorting) | Управление порядком значений в фильтрах |
| [Внешние фильтры](external-filters) | Фильтры вне основной формы |
| [Свой тип фильтра](custom-filter-type) | Создание кастомного типа |

## Быстрые рецепты

### Сортировка через select

```html
<select data-mfilter-sort onchange="mFilter.getInstance().submit()">
    <option value="pagetitle-asc">По названию (А-Я)</option>
    <option value="Data.price-asc">Сначала дешёвые</option>
    <option value="Data.price-desc">Сначала дорогие</option>
</select>
```

### Количество на странице

```html
<select data-mfilter-limit onchange="mFilter.getInstance().submit()">
    <option value="12">12</option>
    <option value="24" selected>24</option>
    <option value="48">48</option>
    <option value="96">96</option>
</select>
```

### Переключение вида

```html
<div class="view-switcher">
    <button data-mfilter-view="grid" class="active">Сетка</button>
    <button data-mfilter-view="list">Список</button>
</div>

<script>
document.querySelectorAll('[data-mfilter-view]').forEach(btn => {
    btn.addEventListener('click', function() {
        const view = this.dataset.mfilterView;
        const mfilter = window.mFilter.getInstance();

        // Переключить шаблон (используя ключ из tpls)
        mfilter.setTpl(view);
        mfilter.submit();

        // Обновить UI
        document.querySelectorAll('[data-mfilter-view]').forEach(b =>
            b.classList.toggle('active', b === this)
        );
    });
});
</script>
```

### Сброс всех фильтров

```html
<button onclick="mFilter.getInstance().reset()">
    Сбросить фильтры
</button>
```

### Сброс одного фильтра

```html
<button onclick="mFilter.getInstance().removeFilter('vendor')">
    Сбросить производителя
</button>
```

### Показать количество активных фильтров

```html
<span class="filter-badge" data-mfilter-active-count>
    {$mfilter.filterCount}
</span>

<script>
document.addEventListener('mfilter:success', function(e) {
    const count = Object.keys(e.detail.filters).length;
    document.querySelector('[data-mfilter-active-count]').textContent = count;
});
</script>
```

### Автоотправка при изменении

```javascript
// Уже включено по умолчанию для чекбоксов и радио
// Для select добавьте:
document.querySelectorAll('[data-mfilter-form] select').forEach(select => {
    select.addEventListener('change', () => {
        window.mFilter.getInstance().submit();
    });
});
```

### Отключить автоотправку

```php
[[!mFilterForm?
    &autoSubmit=`0`
]]
```

### Показать лоадер

```html
<style>
.mfilter-loading [data-mfilter-results] {
    opacity: 0.5;
    pointer-events: none;
}

.mfilter-loading::after {
    content: '';
    position: fixed;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    border: 3px solid #ccc;
    border-top-color: #333;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
</style>
```

### Прокрутка к результатам

```javascript
document.addEventListener('mfilter:success', function() {
    document.querySelector('[data-mfilter-results]').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});
```

### Трекинг фильтрации (Google Analytics)

```javascript
document.addEventListener('mfilter:success', function(e) {
    gtag('event', 'filter', {
        'event_category': 'catalog',
        'event_label': JSON.stringify(e.detail.filters),
        'value': e.detail.total
    });
});
```

### Сохранение фильтров в localStorage

```javascript
// Сохранить
document.addEventListener('mfilter:success', function(e) {
    localStorage.setItem('mfilter_state', JSON.stringify(e.detail.filters));
});

// Восстановить
window.addEventListener('load', function() {
    const saved = localStorage.getItem('mfilter_state');
    if (saved) {
        const mfilter = window.mFilter.getInstance();
        const filters = JSON.parse(saved);

        Object.entries(filters).forEach(([key, values]) => {
            mfilter.setFilter(key, values);
        });

        mfilter.submit();
    }
});
```

### Фильтр в модальном окне (мобильные)

```html
<!-- Кнопка открытия -->
<button class="mobile-filter-btn" onclick="openFilterModal()">
    Фильтры
    <span data-mfilter-active-count></span>
</button>

<!-- Модальное окно -->
<div id="filter-modal" class="filter-modal">
    <div class="filter-modal__header">
        <span>Фильтры</span>
        <button onclick="closeFilterModal()">×</button>
    </div>
    <div class="filter-modal__body">
        [[!mFilterForm]]
    </div>
    <div class="filter-modal__footer">
        <button onclick="mFilter.getInstance().submit(); closeFilterModal();">
            Показать товары
        </button>
    </div>
</div>

<script>
function openFilterModal() {
    document.getElementById('filter-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFilterModal() {
    document.getElementById('filter-modal').classList.remove('active');
    document.body.style.overflow = '';
}
</script>
```

### Условное отображение фильтра

```html
{* В шаблоне фильтра *}
{if count($values) > 1}
    <fieldset class="mfilter-filter">
        {* ... *}
    </fieldset>
{/if}
```
