# MiniShop3

Интеграция mFilter с MiniShop3 — полнофункциональная фильтрация товаров.

## Базовая настройка

### Сниппет

```php
[[!mFilterForm]]

[[!mFilter?
    &element=`msProducts`
    &paginator=`pdoPage`
    &parents=`5`
    &limit=`24`
    &tpl=`tpl.msProducts.row`
    &includeThumbs=`small,medium`
]]
```

### Набор фильтров

Создайте набор в админке с типичными фильтрами MS3:

```json
{
    "vendor": {
        "type": "vendors",
        "source": "ms3",
        "label": "Производитель"
    },
    "price": {
        "type": "number",
        "source": "resource",
        "field": "Data.price",
        "label": "Цена"
    },
    "color": {
        "type": "colors",
        "source": "option",
        "field": "color",
        "label": "Цвет"
    },
    "size": {
        "type": "default",
        "source": "option",
        "field": "size",
        "label": "Размер"
    },
    "new": {
        "type": "boolean",
        "source": "resource",
        "field": "Data.new",
        "label": "Новинка"
    },
    "popular": {
        "type": "boolean",
        "source": "resource",
        "field": "Data.popular",
        "label": "Популярное"
    }
}
```

## Источники данных MS3

### Поля товара (source: resource)

| Поле | Описание |
|------|----------|
| `Data.price` | Цена |
| `Data.old_price` | Старая цена |
| `Data.weight` | Вес |
| `Data.article` | Артикул |
| `Data.new` | Новинка (1/0) |
| `Data.popular` | Популярное (1/0) |
| `Data.favorite` | Избранное (1/0) |

### Производители (source: ms3)

```json
{
    "vendor": {
        "type": "vendors",
        "source": "ms3",
        "label": "Производитель"
    }
}
```

Автоматически получает список производителей из `ms3_vendors`.

### Опции товаров (source: option)

```json
{
    "color": {
        "type": "default",
        "source": "option",
        "field": "color",
        "label": "Цвет"
    }
}
```

Получает значения из `ms3_product_options`.

## Расширенные примеры

### Фильтр по наличию

```json
{
    "instock": {
        "type": "boolean",
        "source": "custom",
        "label": "В наличии",
        "condition": "Data.count > 0"
    }
}
```

### Фильтр по скидке

```json
{
    "sale": {
        "type": "boolean",
        "source": "custom",
        "label": "Со скидкой",
        "condition": "Data.old_price > Data.price"
    }
}
```

### Диапазон веса

```json
{
    "weight": {
        "type": "number",
        "source": "resource",
        "field": "Data.weight",
        "label": "Вес, г"
    }
}
```

## Сортировка

### Параметры сниппета

```php
[[!mFilter?
    &element=`msProducts`
    &sortby=`Data.price`
    &sortdir=`ASC`
]]
```

### Доступные поля сортировки

| Поле | Описание |
|------|----------|
| `pagetitle` | Название |
| `publishedon` | Дата публикации |
| `Data.price` | Цена |
| `Data.weight` | Вес |
| `Data.article` | Артикул |

### Сортировка в шаблоне

```html
<select data-mfilter-sort>
    <option value="pagetitle-asc">По названию (А-Я)</option>
    <option value="pagetitle-desc">По названию (Я-А)</option>
    <option value="Data.price-asc">Сначала дешёвые</option>
    <option value="Data.price-desc">Сначала дорогие</option>
    <option value="publishedon-desc">Сначала новые</option>
</select>
```

## Шаблон товара

```html
{* @FILE chunks/product.card.tpl *}
<div class="product-card" itemscope itemtype="http://schema.org/Product">
    <a href="{$uri}" class="product-card__link">
        {if $thumb.small}
            <img src="{$thumb.small}" alt="{$pagetitle}" class="product-card__image">
        {/if}

        <h3 class="product-card__title" itemprop="name">{$pagetitle}</h3>

        {if $vendor.name}
            <div class="product-card__vendor">{$vendor.name}</div>
        {/if}
    </a>

    <div class="product-card__price" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
        {if $old_price > $price}
            <span class="product-card__old-price">{$old_price|number:0} ₽</span>
        {/if}
        <span class="product-card__current-price" itemprop="price" content="{$price}">
            {$price|number:0} ₽
        </span>
        <meta itemprop="priceCurrency" content="RUB">
    </div>

    {if $new}
        <span class="product-card__badge product-card__badge--new">Новинка</span>
    {/if}

    <form method="post" class="ms3-form">
        <input type="hidden" name="id" value="{$id}">
        <input type="hidden" name="count" value="1">
        <button type="submit" name="ms3_action" value="cart/add">
            В корзину
        </button>
    </form>
</div>
```

## SEO для каталога

### SEO шаблон для производителя

**Условия:**
```json
{"filters": {"vendor": ["*"]}}
```

**Title:**
```
{$filters.vendor} — купить в интернет-магазине | {$site_name}
```

**H1:**
```
{$filters.vendor}
```

**Description:**
```
Купить {$filters.vendor|accusative} с доставкой по России.
{$total} товаров в каталоге. Гарантия качества.
```

### SEO для комбинаций

**Условия (производитель + цвет):**
```json
{"filters": {"vendor": ["*"], "color": ["*"]}}
```

**Title:**
```
{$filters.vendor} {$filters.color} — каталог товаров
```

## Производительность

### Индексы для MS3

Убедитесь в наличии индексов:

```sql
-- Цена
ALTER TABLE modx_ms3_products ADD INDEX idx_price (Data->'$.price');

-- Производитель
ALTER TABLE modx_ms3_products ADD INDEX idx_vendor (vendor);

-- Опции
ALTER TABLE modx_ms3_product_options ADD INDEX idx_key_value (key, value(100));
```

### Кэширование

```php
[[!mFilter?
    &element=`msProducts`
    &cache=`1`
    &cacheTime=`3600`
]]
```
