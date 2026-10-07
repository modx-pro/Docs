---
title: Страница товара
---
# Страница товара

Страница товара — подробное представление одного товара: галерея, цена, опции и форма добавления в корзину.

<!-- ![Страница товара на витрине](/components/minishop3/screenshots/fe-product.png) -->

[![](https://file.modx.pro/files/2/5/a/25aa24b8959c026826d65090b57111c8s.jpg)](https://file.modx.pro/files/2/5/a/25aa24b8959c026826d65090b57111c8.png)

## Структура страницы

| Компонент | Файл | Назначение |
| --- | --- | --- |
| Шаблон страницы | `elements/templates/product.tpl` | Разметка страницы товара |
| Галерея | `tpl.msGallery` | Слайдер изображений с лайтбоксом |

Таблицу характеристик выводит сниппет [`msProductOptions`](/components/minishop3/snippets/msproductoptions) со своим чанком `tpl.msProductOptions`. В демо-шаблоне он не подключён — добавьте вызов в свой шаблон.

## Шаблон страницы

**Путь:** `core/components/minishop3/elements/templates/product.tpl`

Шаблон наследуется от базового (`base.tpl`) и содержит разделы:

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

Галерея использует [Splide](https://splidejs.com/) для слайдера и [GLightbox](https://biati-digital.github.io/glightbox/) для просмотра в полном размере.

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

#### Что использует штатный чанк

Чанк обходит массив `{$files}` и берёт из каждого элемента пять полей: `url` для ссылки лайтбокса, `medium` и `small` для основного слайдера и миниатюр, `name` и `description` для подписей. У размеров есть запасной вариант — `{$file['medium'] ?: $file['url']}`, поэтому слайдер работает и без сгенерированных превью.

Полный список полей каждого файла, включая `thumb` / `large` и размеры превью в пикселях, — на странице сниппета [msGallery](/components/minishop3/snippets/msgallery).

---

### Информация о товаре

Данные товара выводятся в правой колонке.

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
| --- | --- | --- |
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
Процент `{$discount}` заполняет только цикл **msProducts** (карточки каталога): `(old_price - price) / old_price * 100`. На странице товара плейсхолдер пустой, пока шаблон сам не посчитает то же выражение. Блок «Скидка {$discount}%» в демо-`product.tpl` без доработки не работает ([issue #814](https://github.com/modx-pro/MiniShop3/issues/814)).
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

Страница содержит две формы с переключением состояния. Обе лежат внутри общей обёртки — именно по ней JavaScript находит карточку:

```fenom
<div class="ms3-product-card" data-product-id="{$_modx->resource.id}" data-ms3-product-card>
    {* сюда попадают обе формы *}
</div>
```

#### Состояние "Добавить"

Показывается, когда товара нет в корзине:

```fenom
<form method="post" class="ms3_form" data-cart-state="add" data-ms3-form>
    <input type="hidden" name="id" value="{$_modx->resource.id}">
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

Показывается, когда товар уже добавлен:

```fenom
<form method="post" class="ms3_form product-cart-controls-hidden" data-cart-state="change" data-ms3-form>
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

Формы переключает JavaScript-модуль `ProductCardUI` по событию `ms3:cart:updated`.

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
    <li>
        <svg width="16" height="16"><use href="#icon-truck"/></svg>
        <span class="text-muted">Доставка:</span> <strong>1-3 рабочих дня</strong>
    </li>
</ul>
```

Срок доставки выводится всегда, подпись жёстко прописана в шаблоне: со способами доставки из настроек MiniShop3 она не связана.

---

### Табы с информацией

| Таб | Содержимое |
| --- | --- |
| **Описание** | Полное описание из `{$_modx->resource.description}`, при пустом — «Подробное описание товара отсутствует» |
| **Характеристики** | Таблица свойств товара |
| **Доставка** | Два статических блока-заготовки |

::: warning Таб «Доставка» — заготовка
В демо-шаблоне разметка прописана прямо в коде: «Курьерская доставка — от 300 ₽» и «Самовывоз — Бесплатно». Настроенные в MiniShop3 способы доставки и их стоимость здесь не выводятся. Блок нужно заменить своим или убрать.
:::

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
| --- | --- |
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
| --- | --- | --- |
| `parents` | ID родительской категории | Товары из той же категории |
| `resources` | `-ID` текущего товара | Исключить текущий товар |
| `limit` | `4` | Показать 4 товара |
| `withCurrency` | `0` | Без символа валюты в `{$price_formatted}` |

Как и в `catalog.tpl`, здесь передаётся `formatPrices` — у msProducts такого параметра нет, сниппет его игнорирует ([issue #818](https://github.com/modx-pro/MiniShop3/issues/818)).

## Плейсхолдеры товара

На странице товара доступны все поля из таблиц msProduct и msProductData.

Плейсхолдеры ставит `ProductService::processForDisplay()` — он вызывается из `msProduct::process()`, то есть при каждой отрисовке страницы товара. В них попадают все колонки `msProductData` (кроме `id`), опции товара и поля производителя с префиксом `vendor_`.

### Основные поля

| Плейсхолдер | Тип | Описание |
| --- | --- | --- |
| `{$_modx->resource.id}` | int | ID ресурса товара |
| `{$_modx->resource.pagetitle}` | string | Название товара |
| `{$_modx->resource.introtext}` | string | Краткое описание |
| `{$_modx->resource.description}` | string | Полное описание |
| `{$_modx->resource.parent}` | int | ID родительской категории |
| `{$_modx->resource.uri}` | string | URL товара |

### Поля msProductData

| Плейсхолдер | Тип | Описание |
| --- | --- | --- |
| `{$article}` | string | Артикул |
| `{$price}` | string | Цена, **уже отформатированная** по `ms3_price_format` |
| `{$old_price}` | string | Старая цена, тоже отформатированная |
| `{$weight}` | string | Вес, отформатированный по `ms3_weight_format` |
| `{$stock}` | string | Остаток на складе (колонка `decimal`) |
| `{$image}` | string | URL основного изображения |
| `{$thumb}` | string | URL превью |
| `{$tags}` | mixed | Теги |
| `{$source_id}` | int | ID Media Source |
| `{$preview_file_id}` | int | ID файла превью в галерее |
| `{$vendor_id}` | int | ID производителя |
| `{$made_in}` | string | Страна производства |
| `{$new}` | bool | Флаг «Новинка» |
| `{$popular}` | bool | Флаг «Популярный» |
| `{$favorite}` | bool | Флаг «Рекомендуемый» |

`{$vendor_name}` — не колонка `msProductData`: название приходит из связи с `msVendor` по `vendor_id`. В сниппете `msProducts` поля производителя с префиксом `vendor_` появляются при `includeVendorFields`.

::: warning Цена и вес приходят строками
`price`, `old_price` и `weight` проходят через `Format::price()` и `Format::weight()` ещё до попадания в плейсхолдеры, поэтому содержат разделители разрядов из системных настроек. Арифметика и сравнения в шаблоне (`{if $price > 1000}`, `{$price * $count}`) на них не работают — для расчётов берите значение из `$_modx->resource` или считайте на стороне сниппета. Символ валюты при этом не добавляется: в демо-шаблоне `₽` дописан руками.

Внутри цикла `msProducts` те же имена означают другое: там `price` и `weight` остаются числами, а отформатированные значения лежат отдельно — в `price_formatted` и `weight_formatted`. Поэтому код, перенесённый из чанка карточки каталога на страницу товара, может повести себя иначе.
:::

### Опции товара

| Плейсхолдер | Тип | Описание |
| --- | --- | --- |
| `{$_modx->resource.color}` | array | Массив доступных цветов |
| `{$_modx->resource.size}` | array | Массив доступных размеров |
| `{$discount}` | int | Процент скидки: только из `msProducts`, на странице товара не заполняется |

## Кастомизация

### Создание своего шаблона

1. Скопируйте `product.tpl` в свою тему
2. Внесите изменения
3. Назначьте шаблон товарам в админке

### Изменение галереи

Создайте свой чанк и укажите его в вызове:

```fenom
{'!msGallery'|snippet: [
    'tpl' => 'myCustomGallery'
]}
```

Штатный чанк сам подключает Splide и GLightbox через CDN. В своём чанке либо повторите эти подключения, либо откажитесь от слайдера: без библиотек слайдер и лайтбокс не инициализируются. Ошибки при этом не будет — галерея отрисуется статическим списком.

### Добавление своих табов

Расширьте блок табов в шаблоне. Сниппета отзывов в ядре MiniShop3 нет — подключайте своё дополнение или свою разметку:

```fenom
<li class="nav-item">
    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#reviews">
        Отзывы
    </button>
</li>

<div class="tab-pane fade" id="reviews">
    {* Свой сниппет / чанк отзывов — не часть MiniShop3 *}
</div>
```

::: warning Опции color/size в демо-шаблоне
Кнопки цвета и размера в `product.tpl` только ставят класс `active` и не пишут значения в форму `cart/add`. В корзину опции не уходят, пока не добавите скрытое поле или свой JavaScript ([issue #815](https://github.com/modx-pro/MiniShop3/issues/815)). Со стороны API всё готово: `cart/add` принимает параметр `options`.
:::

## CSS-классы

| Класс | Элемент |
| --- | --- |
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
| `.ms3-gallery-thumbs` | Слайдер миниатюр (только при двух и более изображениях) |
| `.ms3-gallery-empty` | Контейнер галереи без изображений |
| `.ms3-gallery-placeholder` | Обёртка заглушки `ms3_medium.png` |
| `.ms3-product-card` | Обёртка форм корзины, по ней работает `ProductCardUI` |

## Зависимости

| Библиотека | Версия | Назначение | Где подключается |
| --- | --- | --- | --- |
| Bootstrap 5 | 5.3.3 | CSS-фреймворк | `base.tpl` |
| Bootstrap Icons | 1.11.0 | Иконочный шрифт | `base.tpl` |
| Splide | 4.1.4 | Слайдер галереи | `tpl.msGallery` |
| GLightbox | 3.3.0 | Лайтбокс для изображений | `tpl.msGallery` |

Все четыре подключаются через CDN jsdelivr. На рабочем сайте замените их локальными копиями.

В чанке галереи Splide и GLightbox подключаются внутри ветки `{if $files?}`, поэтому у товара без изображений не загружаются.
