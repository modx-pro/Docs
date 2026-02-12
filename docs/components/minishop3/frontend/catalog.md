---
title: Каталог товаров
---
# Каталог товаров

Каталог — основная страница магазина, где выводится список товаров из категории. MiniShop3 предоставляет готовый шаблон и чанк карточки товара.

[![](https://file.modx.pro/files/e/4/2/e42014d3fca7e7073ef6e30d7709cff6s.jpg)](https://file.modx.pro/files/e/4/2/e42014d3fca7e7073ef6e30d7709cff6.png)
## Структура каталога

Каталог состоит из двух компонентов:

| Компонент | Файл | Назначение |
|-----------|------|------------|
| Шаблон категории | `elements/templates/catalog.tpl` | Разметка страницы, вызов сниппета msProducts |
| Чанк карточки | `elements/chunks/ms3_products_row.tpl` | Внешний вид одного товара в сетке |

## Шаблон категории

**Путь:** `core/components/minishop3/elements/templates/catalog.tpl`

Шаблон наследуется от базового (`base.tpl`) и содержит:

```fenom
{extends 'file:templates/base.tpl'}
{block 'pagecontent'}
    <div class="container py-4">
        <main>
            {* Заголовок категории *}
            <div class="page-header mb-4">
                <h1>{$_modx->resource.pagetitle}</h1>
                {if $_modx->resource.introtext}
                    <p class="lead text-muted">{$_modx->resource.introtext}</p>
                {/if}
            </div>

            {* Сетка товаров *}
            <div class="row">
                {'!msProducts' | snippet : [
                    'tpl' => 'tpl.msProducts.row',
                    'includeThumbs' => 'small,medium',
                    'includeVendorFields' => 'name,logo',
                    'formatPrices' => 1,
                    'withCurrency' => 1,
                    'limit' => 12,
                    'sortby' => 'menuindex',
                    'sortdir' => 'ASC',
                    'showZeroPrice' => 0
                ]}
            </div>
        </main>
    </div>
{/block}
```

### Ключевые параметры вызова

| Параметр | Значение | Зачем |
|----------|----------|-------|
| `tpl` | `tpl.msProducts.row` | Чанк карточки товара |
| `includeThumbs` | `small,medium` | Загрузить превью изображений |
| `includeVendorFields` | `name,logo` | Подключить данные производителя |
| `formatPrices` | `1` | Форматировать цены (пробелы, копейки) |
| `withCurrency` | `1` | Добавить символ валюты |
| `showZeroPrice` | `0` | Скрыть товары без цены |

::: tip Подробнее о параметрах
Полный список параметров смотрите в документации сниппета [msProducts](/components/minishop3/snippets/msproducts).
:::

## Карточка товара

**Путь:** `core/components/minishop3/elements/chunks/ms3_products_row.tpl`

**Имя чанка в БД:** `tpl.msProducts.row`

[![](https://file.modx.pro/files/2/e/8/2e8fceaf20e53d57b44631b3fea62888s.jpg)](https://file.modx.pro/files/2/e/8/2e8fceaf20e53d57b44631b3fea62888.png)

Карточка построена на Bootstrap 5 и включает:

### Элементы карточки

- **Изображение** с hover-эффектом и overlay "Быстрый просмотр"
- **Бейджи статуса**: наличие, скидка, NEW, ХИТ, избранное
- **Информация о товаре**: производитель, артикул, название
- **Варианты товара**: цвет, размер (первые 3 + счётчик остальных)
- **Цена**: старая и текущая с форматированием
- **Кнопки корзины**: адаптивное состояние

### Бейджи и метки

Карточка автоматически показывает бейджи в зависимости от данных товара:

| Бейдж | Условие | Расположение |
|-------|---------|--------------|
| В наличии / Под заказ | `{$weight > 0}` | Левый верхний угол |
| Скидка (-XX%) | `{$discount > 0}` | Правый верхний угол |
| NEW | `{$new}` | Правый верхний угол |
| ХИТ | `{$popular}` | Правый верхний угол |
| FAV | `{$favorite}` | Правый верхний угол |

### Состояния кнопки корзины

Карточка содержит две формы, переключаемые JavaScript-модулем `ProductCardUI`:

**Состояние "Добавить"** — товара нет в корзине:
```html
<form class="ms3-add-to-cart" data-cart-state="add">
    <button type="submit">В корзину</button>
</form>
```

**Состояние "В корзине"** — товар уже добавлен:
```html
<form class="ms3-cart-controls" data-cart-state="change">
    <button class="dec-qty">−</button>
    <input name="count" value="1">
    <button class="inc-qty">+</button>
    <span>✓ В корзине</span>
</form>
```

Переключение происходит автоматически при событии `ms3:cart:updated`.

[![](https://file.modx.pro/files/2/c/b/2cbef63bd61c6ee6e707163e52917a12s.jpg)](https://file.modx.pro/files/2/c/b/2cbef63bd61c6ee6e707163e52917a12.png)

### Микроразметка Schema.org

Карточка включает разметку для поисковых систем:

```html
<div itemtype="http://schema.org/Product" itemscope>
    <meta itemprop="name" content="{$pagetitle}">
    <meta itemprop="description" content="{$description}">
    <img itemprop="image" src="{$thumb}">

    <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
        <meta itemprop="price" content="{$price}">
        <meta itemprop="priceCurrency" content="RUB">
        <link itemprop="availability" href="http://schema.org/InStock">
    </div>
</div>
```

## Адаптивная сетка

Карточки используют Bootstrap Grid с адаптивными классами:

```html
<div class="col-12 col-sm-6 col-md-4 col-lg-3">
```

| Экран | Товаров в ряду |
|-------|----------------|
| < 576px (мобильный) | 1 |
| ≥ 576px (sm) | 2 |
| ≥ 768px (md) | 3 |
| ≥ 992px (lg) | 4 |

## Кастомизация

### Изменение шаблона категории

1. Скопируйте `catalog.tpl` в свою тему
2. Измените параметры вызова msProducts
3. Назначьте шаблон категориям в админке

### Изменение карточки товара

1. Создайте свой чанк, например `tpl.myProducts.row`
2. Укажите его в вызове: `'tpl' => 'tpl.myProducts.row'`

### Добавление фильтров

Для фильтрации товаров используйте компонент mFilter2 или добавьте параметры `where` и `optionFilters`:

```fenom
{'!msProducts' | snippet : [
    'tpl' => 'tpl.msProducts.row',
    'where' => ['Data.vendor_id' => 5],
    'optionFilters' => ['color' => 'red']
]}
```

## Пагинация

Для постраничной навигации оберните вызов в pdoPage:

```fenom
{'!pdoPage' | snippet : [
    'element' => 'msProducts',
    'tpl' => 'tpl.msProducts.row',
    'limit' => 12
]}

<nav class="mt-4">
    {'page.nav' | placeholder}
</nav>
```
