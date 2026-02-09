# Внешние фильтры

Размещение отдельных фильтров вне основной формы.

## Задача

Разместить некоторые фильтры (например, сортировку или быстрые фильтры) отдельно от основной формы фильтрации.

## Решение

Использовать JavaScript API для управления фильтрами из любого места на странице.

## Пример: Сортировка в шапке

### HTML

```html
<!-- Шапка каталога (вне формы) -->
<div class="catalog-header">
    <div class="catalog-header__sort">
        <label>Сортировка:</label>
        <select id="external-sort">
            <option value="pagetitle-asc">По названию (А-Я)</option>
            <option value="pagetitle-desc">По названию (Я-А)</option>
            <option value="Data.price-asc">Сначала дешёвые</option>
            <option value="Data.price-desc">Сначала дорогие</option>
            <option value="publishedon-desc">Сначала новые</option>
        </select>
    </div>

    <div class="catalog-header__total">
        Найдено: <span data-mfilter-total></span>
    </div>
</div>

<!-- Основная форма в сайдбаре -->
<aside class="catalog-sidebar">
    [[!mFilterForm]]
</aside>

<!-- Результаты -->
<main class="catalog-content">
    <div data-mfilter-results>
        [[!mFilter? ...]]
    </div>
</main>
```

### JavaScript

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('external-sort');

    sortSelect.addEventListener('change', function() {
        const [field, dir] = this.value.split('-');
        const mfilter = window.mFilter.getInstance();

        // Установить сортировку через техпараметры
        mfilter.setTechParam('sort', this.value);
        mfilter.submit();
    });

    // Синхронизация при загрузке
    document.addEventListener('mfilter:success', function(e) {
        if (e.detail.tech?.sort) {
            sortSelect.value = e.detail.tech.sort;
        }
    });
});
```

## Пример: Быстрые фильтры-кнопки

### HTML

```html
<!-- Быстрые фильтры (вне формы) -->
<div class="quick-filters">
    <button class="quick-filter" data-filter="new" data-value="1">
        Новинки
    </button>
    <button class="quick-filter" data-filter="popular" data-value="1">
        Популярные
    </button>
    <button class="quick-filter" data-filter="sale" data-value="1">
        Со скидкой
    </button>
</div>

<!-- Основная форма -->
[[!mFilterForm]]
```

### JavaScript

```javascript
document.querySelectorAll('.quick-filter').forEach(button => {
    button.addEventListener('click', function() {
        const key = this.dataset.filter;
        const value = this.dataset.value;
        const mfilter = window.mFilter.getInstance();

        // Toggle фильтра
        const current = mfilter.getState().filters[key];

        if (current && current.includes(value)) {
            mfilter.removeFilter(key);
            this.classList.remove('active');
        } else {
            mfilter.setFilter(key, [value]);
            this.classList.add('active');
        }

        mfilter.submit();
    });
});

// Синхронизация состояния кнопок
document.addEventListener('mfilter:success', function(e) {
    document.querySelectorAll('.quick-filter').forEach(button => {
        const key = button.dataset.filter;
        const value = button.dataset.value;
        const active = e.detail.filters[key]?.includes(value);
        button.classList.toggle('active', active);
    });
});
```

## Пример: Поиск по названию

### HTML

```html
<!-- Поиск вне формы -->
<div class="catalog-search">
    <input type="text" id="catalog-search-input" placeholder="Поиск товаров...">
    <button id="catalog-search-btn">Найти</button>
</div>

[[!mFilterForm]]
```

### JavaScript

```javascript
const searchInput = document.getElementById('catalog-search-input');
const searchBtn = document.getElementById('catalog-search-btn');

function doSearch() {
    const query = searchInput.value.trim();
    const mfilter = window.mFilter.getInstance();

    if (query) {
        mfilter.setFilter('pagetitle', query);
    } else {
        mfilter.removeFilter('pagetitle');
    }

    mfilter.submit();
}

searchBtn.addEventListener('click', doSearch);
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        doSearch();
    }
});
```

## Пример: Ценовой диапазон в отдельном блоке

### HTML

```html
<!-- Отдельный блок с ценой -->
<div class="price-filter-external">
    <h4>Цена</h4>
    <div class="price-inputs">
        <input type="number" id="price-min" placeholder="От">
        <span>—</span>
        <input type="number" id="price-max" placeholder="До">
    </div>
    <button id="price-apply">Применить</button>
</div>

<!-- Форма без ценового фильтра -->
[[!mFilterForm?
    &filters=`vendor,color,size`
]]
```

### JavaScript

```javascript
const priceMin = document.getElementById('price-min');
const priceMax = document.getElementById('price-max');
const priceApply = document.getElementById('price-apply');

priceApply.addEventListener('click', function() {
    const mfilter = window.mFilter.getInstance();

    const min = priceMin.value ? parseInt(priceMin.value) : null;
    const max = priceMax.value ? parseInt(priceMax.value) : null;

    if (min !== null || max !== null) {
        mfilter.setFilter('price', {
            min: min,
            max: max
        });
    } else {
        mfilter.removeFilter('price');
    }

    mfilter.submit();
});

// Синхронизация при загрузке и после AJAX
document.addEventListener('mfilter:success', function(e) {
    const price = e.detail.filters.price;
    if (price) {
        priceMin.value = price.min || '';
        priceMax.value = price.max || '';
    } else {
        priceMin.value = '';
        priceMax.value = '';
    }
});
```

## Пример: Производитель в выпадающем меню

### HTML

```html
<!-- Меню категорий с производителями -->
<nav class="category-menu">
    <div class="category-menu__item">
        <a href="/catalog/electronics/">Электроника</a>
        <ul class="vendor-submenu">
            <li><a href="#" data-vendor="apple">Apple</a></li>
            <li><a href="#" data-vendor="samsung">Samsung</a></li>
            <li><a href="#" data-vendor="xiaomi">Xiaomi</a></li>
        </ul>
    </div>
</nav>
```

### JavaScript

```javascript
document.querySelectorAll('[data-vendor]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const vendor = this.dataset.vendor;
        const mfilter = window.mFilter.getInstance();

        // Сбросить все фильтры и установить только производителя
        mfilter.reset();
        mfilter.setFilter('vendor', [vendor]);
        mfilter.submit();
    });
});
```

## Синхронизация с формой

Если фильтр есть и в форме, и снаружи — синхронизируйте состояние:

```javascript
document.addEventListener('mfilter:success', function(e) {
    // Обновить внешние элементы
    syncExternalFilters(e.detail.filters);

    // Обновить счётчики
    document.querySelectorAll('[data-mfilter-total]').forEach(el => {
        el.textContent = e.detail.total;
    });
});

function syncExternalFilters(filters) {
    // Синхронизировать select сортировки
    const sortSelect = document.getElementById('external-sort');
    if (sortSelect && filters.sort) {
        sortSelect.value = filters.sort;
    }

    // Синхронизировать быстрые фильтры
    document.querySelectorAll('.quick-filter').forEach(btn => {
        const key = btn.dataset.filter;
        const value = btn.dataset.value;
        btn.classList.toggle('active', filters[key]?.includes(value));
    });
}
```

## Советы

1. **Используйте события** — подписывайтесь на `mfilter:success` для синхронизации
2. **Не дублируйте данные** — если фильтр есть в форме, скройте его и управляйте через JS
3. **Сохраняйте UX** — внешние фильтры должны визуально отражать текущее состояние
4. **Тестируйте без JS** — предусмотрите fallback для SEO и доступности
