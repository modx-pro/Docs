---
title: Страница товара
---
# Страница товара

Страница товара — детальное представление одного продукта с галереей, ценой, опциями и формой добавления в корзину.

[![](https://file.modx.pro/files/2/5/a/25aa24b8959c026826d65090b57111c8s.jpg)](https://file.modx.pro/files/2/5/a/25aa24b8959c026826d65090b57111c8.png)
## Структура страницы

| Компонент | Файл | Назначение |
|-----------|------|------------|
| Шаблон страницы | `elements/templates/product.tpl` | Разметка страницы товара |
| Галерея | `tpl.msGallery` | Слайдер изображений с лайтбоксом |
| Опции товара | `tpl.msProductOptions` | Вывод характеристик товара |

## Шаблон страницы

**Путь:** `core/components/minishop3/elements/templates/product.tpl`

Шаблон наследуется от базового (`base.tpl`) и содержит следующие разделы:

```fenom
{extends 'file:templates/base.tpl'}
{block 'pagecontent'}
    <div class="container py-4">
        {* Хлебные крошки *}
        {* Основная информация (галерея + карточка) *}
        {* Табы (описание, характеристики, доставка) *}
        {* Похожие товары *}
    </div>
{/block}
```

## Разделы страницы

### Хлебные крошки

Навигационная цепочка от главной до текущего товара:

```fenom
<nav aria-label="breadcrumb" class="mb-4">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/">Главная</a></li>
        {if $_modx->resource.parent > 0}
            <li class="breadcrumb-item">
                <a href="/{$_modx->resource.parent | resource : 'uri'}">
                    {$_modx->resource.parent | resource : 'pagetitle'}
                </a>
            </li>
        {/if}
        <li class="breadcrumb-item active">{$_modx->resource.pagetitle}</li>
    </ol>
</nav>
```

---

### Галерея товара

Галерея использует библиотеки [Splide](https://splidejs.com/) для слайдера и [GLightbox](https://biati-digital.github.io/glightbox/) для просмотра в полном размере.

```fenom
{'!msGallery'|snippet: [
    'tpl' => 'tpl.msGallery'
]}
```

#### Возможности галереи

- **Основной слайдер** — крупные изображения с fade-эффектом
- **Миниатюры** — навигация по изображениям (скрываются при одном фото)
- **Лайтбокс** — просмотр в полном размере по клику
- **Lazy loading** — отложенная загрузка изображений
- **Заглушка** — показывается при отсутствии изображений

#### Плейсхолдеры в tpl.msGallery

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `{$files}` | array | Массив изображений товара |
| `{$file['url']}` | string | Полный URL изображения |
| `{$file['small']}` | string | URL миниатюры (small) |
| `{$file['medium']}` | string | URL среднего размера (medium) |
| `{$file['name']}` | string | Название файла |
| `{$file['description']}` | string | Описание изображения |

Подробнее о сниппете: [msGallery](/components/minishop3/snippets/msgallery)

---

### Информация о товаре

Правая колонка с данными товара включает:

#### Производитель и название

```fenom
{if $vendor_name?}
    <div class="text-muted text-uppercase mb-2">
        {$vendor_name}
    </div>
{/if}

<h1 class="mb-3">{$_modx->resource.pagetitle}</h1>
```

#### Артикул и статус наличия

```fenom
<div class="d-flex align-items-center gap-3 mb-3">
    {if $article?}
        <span class="text-muted">Артикул: <strong>{$article}</strong></span>
    {/if}

    {if $stock? && $stock > 0}
        <span class="badge bg-success">В наличии</span>
    {else}
        <span class="badge bg-secondary">Под заказ</span>
    {/if}
</div>
```

#### Бейджи товара

| Бейдж | Условие | Стиль |
|-------|---------|-------|
| NEW | `{$new?}` | `badge bg-primary` |
| ХИТ ПРОДАЖ | `{$popular?}` | `badge bg-warning text-dark` |
| РЕКОМЕНДУЕМ | `{$favorite?}` | `badge bg-danger` |

---

### Блок цены

Цена выделена в отдельный блок с фоном:

```fenom
<div class="product-price mb-4 p-4 bg-light rounded">
    {if $old_price? && $old_price > 0}
        <div class="old-price text-muted text-decoration-line-through mb-2">
            {$old_price} ₽
        </div>

        {if $discount?}
            <div class="badge bg-danger mb-2">
                Скидка {$discount}%
            </div>
        {/if}
    {/if}

    <div class="current-price display-4 fw-bold text-primary">
        {$price ?: 0} ₽
    </div>
</div>
```

::: tip Расчёт скидки
Процент скидки рассчитывается автоматически сниппетом msProducts при наличии `old_price`. Формула: `(old_price - price) / old_price * 100`
:::

---

### Опции товара

Если у товара есть опции `color` или `size`, они выводятся в виде кнопок:

```fenom
{if $_modx->resource.color?}
    <div class="option-group mb-3">
        <label class="form-label fw-semibold">Цвет:</label>
        <div class="d-flex flex-wrap gap-2">
            {foreach $_modx->resource.color as $colorOption}
                <button type="button" class="btn btn-outline-secondary btn-sm option-btn">
                    {$colorOption}
                </button>
            {/foreach}
        </div>
    </div>
{/if}
```

JavaScript активирует первую опцию по умолчанию и обрабатывает клики для переключения.

---

### Форма добавления в корзину

Страница содержит две формы с переключением состояния:

#### Состояние "Добавить"

Показывается когда товара нет в корзине:

```fenom
<form method="post" class="ms3_form" data-cart-state="add">
    <input type="hidden" name="id" value="{$_modx->resource.id}">
    <input type="hidden" name="options" value="[]">
    <input type="hidden" name="ms3_action" value="cart/add">

    <div class="row g-3 align-items-end">
        <div class="col-auto">
            <label class="form-label">{'ms3_cart_count' | lexicon}:</label>
            <input type="number" name="count" value="1" min="1" class="form-control">
        </div>
        <div class="col">
            <button type="submit" class="btn btn-primary btn-lg w-100">
                {'ms3_cart_add' | lexicon}
            </button>
        </div>
    </div>
</form>
```

#### Состояние "В корзине"

Показывается когда товар уже добавлен:

```fenom
<form method="post" class="ms3_form product-cart-controls-hidden" data-cart-state="change">
    <input type="hidden" name="product_key" value="">
    <input type="hidden" name="ms3_action" value="cart/change">

    <div class="row g-3 align-items-end">
        <div class="col-auto">
            <div class="input-group">
                <button class="btn btn-outline-primary dec-qty" type="button">−</button>
                <input type="number" name="count" value="1" min="0" class="form-control text-center">
                <button class="btn btn-outline-primary inc-qty" type="button">+</button>
            </div>
        </div>
        <div class="col">
            <button type="button" class="btn btn-success btn-lg w-100" disabled>
                ✓ {'ms3_cart_in_cart' | lexicon}
            </button>
        </div>
    </div>
</form>
```

Переключение происходит автоматически через JavaScript модуль `ProductCardUI` при событии `ms3:cart:updated`.

---

### Дополнительная информация

Блок с иконками для веса, страны производства и доставки:

```fenom
<ul class="list-unstyled mb-0">
    {if $weight? && $weight > 0}
        <li class="mb-2">
            <svg width="16" height="16"><use href="#icon-box"/></svg>
            <span class="text-muted">Вес:</span> <strong>{$weight} кг</strong>
        </li>
    {/if}
    {if $made_in?}
        <li class="mb-2">
            <svg width="16" height="16"><use href="#icon-globe"/></svg>
            <span class="text-muted">Страна производства:</span> <strong>{$made_in}</strong>
        </li>
    {/if}
</ul>
```

---

### Табы с информацией

Bootstrap-табы для организации контента:

| Таб | Содержимое |
|-----|------------|
| **Описание** | Полное описание из `{$_modx->resource.description}` |
| **Характеристики** | Таблица свойств товара |
| **Доставка** | Информация о способах доставки |

```fenom
<ul class="nav nav-tabs mb-4" role="tablist">
    <li class="nav-item">
        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#description">
            Описание
        </button>
    </li>
    <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#specs">
            Характеристики
        </button>
    </li>
    <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#delivery">
            Доставка
        </button>
    </li>
</ul>

<div class="tab-content">
    <div class="tab-pane fade show active" id="description">
        {$_modx->resource.description}
    </div>
    <!-- ... остальные табы ... -->
</div>
```

#### Таблица характеристик

Автоматически заполняется из полей товара:

| Поле | Плейсхолдер |
|------|-------------|
| Артикул | `{$article}` |
| Производитель | `{$vendor_name}` |
| Страна производства | `{$made_in}` |
| Вес | `{$weight}` |
| Доступные цвета | `{$_modx->resource.color}` (массив) |
| Доступные размеры | `{$_modx->resource.size}` (массив) |

---

### Похожие товары

Блок с товарами из той же категории:

```fenom
<div class="related-products mt-5">
    <h3 class="mb-4">Похожие товары</h3>
    <div class="row">
        {'!msProducts' | snippet : [
            'tpl' => 'tpl.msProducts.row',
            'parents' => $_modx->resource.parent,
            'resources' => '-' ~ $_modx->resource.id,
            'limit' => 4,
            'formatPrices' => 1,
            'withCurrency' => 0
        ]}
    </div>
</div>
```

| Параметр | Значение | Назначение |
|----------|----------|------------|
| `parents` | ID родительской категории | Товары из той же категории |
| `resources` | `-ID` текущего товара | Исключить текущий товар |
| `limit` | `4` | Показать 4 товара |

## Плейсхолдеры товара

На странице товара доступны все поля из таблиц msProduct и msProductData:

### Основные поля

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `{$_modx->resource.id}` | int | ID ресурса товара |
| `{$_modx->resource.pagetitle}` | string | Название товара |
| `{$_modx->resource.introtext}` | string | Краткое описание |
| `{$_modx->resource.description}` | string | Полное описание |
| `{$_modx->resource.parent}` | int | ID родительской категории |
| `{$_modx->resource.uri}` | string | URL товара |

### Поля msProductData

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `{$article}` | string | Артикул |
| `{$price}` | float | Цена |
| `{$old_price}` | float | Старая цена |
| `{$weight}` | float | Вес |
| `{$stock}` | int | Остаток на складе |
| `{$vendor_id}` | int | ID производителя |
| `{$vendor_name}` | string | Название производителя |
| `{$made_in}` | string | Страна производства |
| `{$new}` | bool | Флаг "Новинка" |
| `{$popular}` | bool | Флаг "Популярный" |
| `{$favorite}` | bool | Флаг "Рекомендуемый" |

### Опции товара

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `{$_modx->resource.color}` | array | Массив доступных цветов |
| `{$_modx->resource.size}` | array | Массив доступных размеров |
| `{$discount}` | int | Процент скидки (рассчитывается) |

## Кастомизация

### Создание своего шаблона

1. Скопируйте `product.tpl` в папку вашей темы
2. Внесите необходимые изменения
3. Назначьте шаблон товарам в админке

### Изменение галереи

Создайте свой чанк и укажите его в вызове:

```fenom
{'!msGallery'|snippet: [
    'tpl' => 'myCustomGallery'
]}
```

### Добавление своих табов

Расширьте блок табов в шаблоне:

```fenom
<li class="nav-item">
    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#reviews">
        Отзывы
    </button>
</li>

<div class="tab-pane fade" id="reviews">
    {'!msProductReviews' | snippet : ['product' => $_modx->resource.id]}
</div>
```

## CSS-классы

| Класс | Элемент |
|-------|---------|
| `.product-info` | Контейнер информации о товаре |
| `.product-price` | Блок цены |
| `.product-options` | Контейнер опций |
| `.option-group` | Группа опций (цвет, размер) |
| `.option-btn` | Кнопка выбора опции |
| `.product-meta` | Дополнительная информация |
| `.product-tabs` | Контейнер табов |
| `.related-products` | Блок похожих товаров |
| `.ms3-gallery` | Контейнер галереи |
| `.ms3-gallery-main` | Основной слайдер |
| `.ms3-gallery-thumbs` | Слайдер миниатюр |

## Зависимости

Шаблон использует следующие библиотеки:

| Библиотека | Версия | Назначение |
|------------|--------|------------|
| Bootstrap 5 | 5.3.3 | CSS-фреймворк |
| Splide | 4.1.4 | Слайдер галереи |
| GLightbox | 3.3.0 | Лайтбокс для изображений |

Библиотеки подключаются через CDN. Для production рекомендуется использовать локальные копии.
