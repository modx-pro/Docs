# MiniShop3

Integration of mFilter with MiniShop3 — full-featured product filtering.

## Basic setup

### Snippet

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

### Filter set

Create a set in the admin with typical MS3 filters:

```json
{
    "vendor": {
        "type": "vendors",
        "source": "ms3",
        "label": "Vendor"
    },
    "price": {
        "type": "number",
        "source": "resource",
        "field": "Data.price",
        "label": "Price"
    },
    "color": {
        "type": "colors",
        "source": "option",
        "field": "color",
        "label": "Color"
    },
    "size": {
        "type": "default",
        "source": "option",
        "field": "size",
        "label": "Size"
    },
    "new": {
        "type": "boolean",
        "source": "resource",
        "field": "Data.new",
        "label": "New"
    },
    "popular": {
        "type": "boolean",
        "source": "resource",
        "field": "Data.popular",
        "label": "Popular"
    }
}
```

## MS3 data sources

### Product fields (source: resource)

| Field | Description |
|-------|-------------|
| `Data.price` | Price |
| `Data.old_price` | Old price |
| `Data.weight` | Weight |
| `Data.article` | SKU |
| `Data.new` | New (1/0) |
| `Data.popular` | Popular (1/0) |
| `Data.favorite` | Favorite (1/0) |

### Vendors (source: ms3)

```json
{
    "vendor": {
        "type": "vendors",
        "source": "ms3",
        "label": "Vendor"
    }
}
```

Automatically gets vendor list from `ms3_vendors`.

### Product options (source: option)

```json
{
    "color": {
        "type": "default",
        "source": "option",
        "field": "color",
        "label": "Color"
    }
}
```

Gets values from `ms3_product_options`.

## Advanced examples

### In-stock filter

```json
{
    "instock": {
        "type": "boolean",
        "source": "custom",
        "label": "In stock",
        "condition": "Data.count > 0"
    }
}
```

### Sale filter

```json
{
    "sale": {
        "type": "boolean",
        "source": "custom",
        "label": "On sale",
        "condition": "Data.old_price > Data.price"
    }
}
```

### Weight range

```json
{
    "weight": {
        "type": "number",
        "source": "resource",
        "field": "Data.weight",
        "label": "Weight, g"
    }
}
```

## Sorting

### Snippet parameters

```php
[[!mFilter?
    &element=`msProducts`
    &sortby=`Data.price`
    &sortdir=`ASC`
]]
```

### Available sort fields

| Field | Description |
|-------|-------------|
| `pagetitle` | Title |
| `publishedon` | Publication date |
| `Data.price` | Price |
| `Data.weight` | Weight |
| `Data.article` | SKU |

### Sort in template

```html
<select data-mfilter-sort>
    <option value="pagetitle-asc">By name (A–Z)</option>
    <option value="pagetitle-desc">By name (Z–A)</option>
    <option value="Data.price-asc">Price: low to high</option>
    <option value="Data.price-desc">Price: high to low</option>
    <option value="publishedon-desc">Newest first</option>
</select>
```

## Product template

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
        <span class="product-card__badge product-card__badge--new">New</span>
    {/if}

    <form method="post" class="ms3-form">
        <input type="hidden" name="id" value="{$id}">
        <input type="hidden" name="count" value="1">
        <button type="submit" name="ms3_action" value="cart/add">
            Add to cart
        </button>
    </form>
</div>
```

## SEO for catalog

### SEO template for vendor

**Conditions:**

```json
{"filters": {"vendor": ["*"]}}
```

**Title:**

```
{$filters.vendor} — buy in online store | {$site_name}
```

**H1:**

```
{$filters.vendor}
```

**Description:**

```
Buy {$filters.vendor|accusative} with delivery. {$total} products in catalog. Quality guarantee.
```

### SEO for combinations

**Conditions (vendor + color):**

```json
{"filters": {"vendor": ["*"], "color": ["*"]}}
```

**Title:**

```
{$filters.vendor} {$filters.color} — product catalog
```

## Performance

### Indexes for MS3

Ensure indexes exist:

```sql
-- Price
ALTER TABLE modx_ms3_products ADD INDEX idx_price (Data->'$.price');

-- Vendor
ALTER TABLE modx_ms3_products ADD INDEX idx_vendor (vendor);

-- Options
ALTER TABLE modx_ms3_product_options ADD INDEX idx_key_value (key, value(100));
```

### Caching

```php
[[!mFilter?
    &element=`msProducts`
    &cache=`1`
    &cacheTime=`3600`
]]
```
