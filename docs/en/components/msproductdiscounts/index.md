---
title: msProductDiscounts
description: Creating product discounts with extensive configuration options
author: shevartv
modstore: https://modstore.pro/packages/discounts/msproductdiscounts

items: [
  { text: 'Javascript', link: 'javascript' },
  { text: 'Cases', link: 'cases' },
]

dependencies: [ 'miniShop2', 'SendIt' ]
---

# msProductDiscounts

`msProductDiscounts` manages product discounts for online stores based on `miniShop2`. Works with product modifications created by `msOptionsPrice2`.

## Features

1. Discounts on product categories.
2. Discounts for user groups.
3. Discounts on individual products.
4. Discounts on products with specific option values (e.g., only red products).
5. Discounts on individual product modifications (requires component `msOptionsPrice2`).
6. Time-limited discounts (from 1 hour).
7. Discounts on specific weekdays.
8. Discount on every Nth product in cart.
9. Multiple discounts per product.
10. Custom discount conditions.
11. Discount splitting by context.
12. Creating promo codes.
13. Promo code use limit.
14. Promo code validity limit.
15. Multiple discounts per promo code.

## System settings

| Key                           | Value                            | Purpose                                                                                                                                                                                              |
|--------------------------------|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **mspd_base_ctx**              | `web`                               | to build category tree and products; if empty, selection shown when adding discount. |
| **mspd_cart_sort_direction**   | `DESC`                              | cart sort: highest prices first; use `ASC` for lowest first. |
| **mspd_tpls_with_cart**        |                                     | cart auto-update: specify ID of templates that display cart. |
| **mspd_catalog_root_id**       |                                     | catalog tree in discount management UI. |
| **mspd_debug**                 | `No`                               | debug mode; data output to error log. |
| **mspd_hidden_class**          | `d-none`                            | class to hide info; no default in frontend. |
| **mspd_frontend_js**           | see table below<sup>*</sup>   | path to JS file. |
| **mspd_many_behaviour**        | `3`                                 | apply multiple discounts and control order. |
| **mspd_product_limit**         | `10`                                | limit product search in admin; empty may freeze browser. |
| **mspd_product_search_fields** | see table below<sup>**</sup>  | fields for product search when adding discount conditions. |
| **mspd_productdata_fields**    | see table below<sup>***</sup> | discount conditions by product data. |
| **mspd_reload_interval**       | `01:00-01:01`                       | reload "abandoned" carts once per day in interval. |
| **mspd_root_resource_ids**     |                                     | promo root resources; separate page per promo; section for multiple promos. |
| **mspd_use_msearch2**          | `No`                               | search categories/products in admin via mSearch2; "Yes" only if mSearch2 installed. |
| **mspd_info_tpl**              | `DiscountInfoTpl`                   | discount display in product card and preview. |
| **mspd_round_precision**       | `1`                                 | price rounding precision after discount. |
| **mspd_show_for_all**          | `Yes`                                | show discounts in product card even when cart empty. |
| **mspd_status_cancel**         | `4`                                 | to recalc promo code usage on order cancel                                                                                                                                   |
| **mspd_status_new**            | `1`                                 | to recalc promo code usage on order creation                                                                                                                                 |
| **mspd_min_discount_price**    | `0`                                 | limit minimum discounted price. |
| **mspd_name_field**            | `pagetitle`                         | field for product name. |

:::details <sup>*</sup>Value mspd_product_search_fields

```text
assets/components/msproductdiscounts/js/web/index.js
```

:::

:::details <sup>**</sup>Value mspd_product_search_fields

```text
modResource.pagetitle,modResource.longtitle,modResource.menutitle,Data.article
```

:::

:::details <sup>***</sup>Value mspd_productdata_fields

```json
{
  "article": "SKU",
  "price": "Price",
  "old_price": "Old price",
  "weight": "Weight",
  "vendor": "Vendor",
  "made_in": "Country",
  "new": "New",
  "popular": "Popular",
  "favorite": "Special",
  "tags": "Tag",
  "color": "Color",
  "size": "Size"
}
```

:::

Whether to change settings is up to you; with defaults the component will work, but perhaps not as expected.

## Additional markup description

Additional markup is used for correct JavaScript that displays discount info and sends data to server.

### Product card markup

```html:line-numbers
<form method="post" class="ms2_form" data-mspd-product="p-{$id}">
    <input type="hidden" name="id" value="{$id}">
    <input type="hidden" name="count" value="1">
    <a href="{$id | url}">{$pagetitle}</a>
    <span data-mspd-prop="price_str">{$price}</span>
    <span>{'ms2_frontend_currency' | lexicon}</span>
    <s data-mspd-prop-wrap="d-none" class="{!$old_price ? 'd-none' : ''}">
        <span data-mspd-prop="old_price_str">{$old_price}</span>
        {'ms2_frontend_currency' | lexicon}
    </s>
    <div data-mspd-info="p-{$id}"></div>
    <button type="submit" name="ms2_action" value="cart/add">
        {'ms2_frontend_add_to_cart' | lexicon}
    </button>
</form>
```

* `[data-mspd-product]` - root product element; value must be unique key; if outputting modifications, add modification id to key.
* `[name="id"]` - product id field; use product id even when outputting modifications.
* `[name="count"]` - optional quantity; default 1.
* `[data-mspd-prop="price_str"]` - formatted price block; use value `price` for raw.
* `[data-mspd-prop="old_price_str"]` - old price block; use value `old_price` for raw.
* `[data-mspd-prop-wrap="d-none"]` - wrapper classes: added when value < 0, removed when > 0.
* `[data-mspd-info]` - discount info block; value = product key same as `[data-mspd-product]`

### Product option markup

Component uses standard miniShop2 option markup; for price-affecting options add `data-mspd-prop` without value.

```html
<select name="options[{$name}]" class="form-control col-md-6" id="option_{$name}" data-mspd-prop></select>
```

### Cart product markup

Cart markup differs from product card by root attribute:

* `[data-mspd-cart-product]` - root cart product element; value = product key in cart.

No required product id field.

### Promo code form markup

```html:line-numbers
<form data-mspd-promocode-form action="{$.session.mspd.promocode.id ? 'cancelpromocode': 'applypromocode'}">
    <input type="text" name="promocode" value="{$.session.mspd.promocode.code}" placeholder="promocode">
    <p data-si-error="promocode"></p>
    {set $applyText = 'mspd_promocode_apply_text' | lexicon}
    {set $cancelText = 'mspd_promocode_cancel_text' | lexicon}
    <button type="submit" data-mspd-text="{!$.session.mspd.promocode.id ? $cancelText : $applyText}">{$.session.mspd.promocode.id ? $cancelText: $applyText}</button>
</form>
```

* `[data-mspd-promocode-form]` - form root attribute
* `[name="promocode"]` - promo code input
* `[data-si-error="promocode"]` - error block (optional)
* `[data-mspd-text]` - button text attribute; depends on promo applied or not.

## Internal data

Price with discount shows automatically if product chunk has required attributes. Product info must be inside block with `data-mspd-product="{$id}"` where `$id` is product id in admin. Price block needs `data-mspd-price` as value (product price), `data-mspd-old-price` for old price. Price-affecting properties and options: `data-mspd-data` (article, price, etc.) and `data-mspd-option` (any option). If element has no name attribute, specify key in value: `data-mspd-data="color"` or `data-mspd-option="length"`. Built-in properties like:

* Vendor
* Country / manufacturer
* New
* Special
* Popular
* Old price

Built-in properties can be omitted; checked by default. To hide zero old price wrap old price block in element with `data-mspd-old-price-wrap` and set class `d-none` in options, or your custom hidden class in component settings. Important: with msOptionsPrice2 do NOT use classes `msoptionsprice-cost` and `msoptionsprice-old-cost` — they add inline styles and break display. With modifications you MUST add:

```html
<input type="text" name="options[modification]" value="0" data-mspd-option>
```

For discount info add block with `data-mspd-info` inside `data-mspd-product="{$id}"`. Template in `mspd_info_tpl`. Placeholders: `name`, `url`, `id`, `relation`, `count`, `value`, `unit`, `user_groups`, `resource`, `start`, `end`, `week_days`, `priority`, `min_sum`, `by_position`, `active`, `properties`.

Product card example:

```fenom
{'!msOptionsPrice.initialize' | snippet: []}

<div class="text-center text-md-left mb-2 mb-md-0">
  {if $_modx->resource.new?}
  <span class="badge badge-secondary badge-pill col-auto">{'ms2_frontend_new' | lexicon}</span>
  {/if}
  {if $_modx->resource.popular?}
  <span class="badge badge-secondary badge-pill col-auto">{'ms2_frontend_popular' | lexicon}</span>
  {/if}
  {if $_modx->resource.favorite?}
  <span class="badge badge-secondary badge-pill col-auto">{'ms2_frontend_favorite' | lexicon}</span>
  {/if}
</div>
<div id="msProduct" class="row align-items-center" itemtype="http://schema.org/Product" itemscope>
  <meta itemprop="name" content="{$_modx->resource.pagetitle}">
  <meta itemprop="description" content="{$_modx->resource.description ?: $_modx->resource.pagetitle}">
  <div class="col-12 col-md-6">
    {'!msGallery' | snippet: []}
  </div>
  <div class="col-12 col-md-6" itemtype="http://schema.org/AggregateOffer" itemprop="offers" itemscope data-mspd-observe>
    <meta itemprop="category" content="{$_modx->resource.parent | resource: 'pagetitle'}">
    <meta itemprop="offerCount" content="1">
    <meta itemprop="price" content="{$price | replace:' ':''}">
    <meta itemprop="lowPrice" content="{$price | replace:' ':''}">
    <meta itemprop="priceCurrency" content="RUR">

    <form class="form-horizontal ms2_form msoptionsprice-product" method="post" data-mspd-product="{$_modx->resource.id}">
      <input type="text" name="options[modification]" value="0" data-mspd-option>
      <h1 class="text-center text-md-left msoptionsprice-name msoptionsprice-[[*id]]">{$_modx->resource.pagetitle}</h1>
      <input type="hidden" name="id" value="{$_modx->resource.id}"/>

      <div class="form-group row align-items-center">
        <label class="col-6 col-md-3 text-right text-md-left col-form-label">{'ms2_product_article' | lexicon}:</label>
        <div class="col-6 col-md-9 msoptionsprice-article msoptionsprice-[[*id]]">
          {$article ?: '-'}
        </div>
      </div>
      <div class="form-group row align-items-center">
        <label class="col-6 col-md-3 text-right text-md-left col-form-label">{'ms2_product_price' | lexicon}:</label>
        <div class="col-6 col-md-9">
          <span class="msoptionsprice-[[*id]]" data-mspd-price="{$_modx->resource.price}">{$_modx->resource.price}</span>
          {'ms2_frontend_currency' | lexicon}<sup data-mspd-sup class="d-none" style="color:red;">*</sup>
          <span data-mspd-old-price-wrap class="old_price {$old_price == 0 ? 'd-none' : ''}">
          <span class=" ml-2 msoptionsprice-[[*id]]" data-mspd-old-price="{$_modx->resource.old_price}">{$_modx->resource.old_price}</span>
          {'ms2_frontend_currency' | lexicon}
          </span>

        </div>
      </div>
      <div class="mb-3" data-mspd-info=""></div>
      <div class="form-group row align-items-center">
        <label class="col-6 col-md-3 text-right text-md-left col-form-label" for="product_price">{'ms2_cart_count' | lexicon}:</label>
        <div class="col-6 col-md-9">
          <div class="input-group">
            <input type="number" name="count" id="product_price" class="form-control col-md-6" value="1"/>
            <div class="input-group-append">
              <span class="input-group-text">{'ms2_frontend_count_unit' | lexicon}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group row align-items-center">
        <label class="col-6 col-md-3 text-right text-md-left col-form-label">{'ms2_product_weight' | lexicon}:</label>
        <div class="col-6 col-md-9">
          <span class="msoptionsprice-mass msoptionsprice-[[*id]]" data-mspd-data="weight">{$weight}</span> {'ms2_frontend_weight_unit' | lexicon}
        </div>
      </div>

      <div class="form-group row align-items-center">
        <label class="col-6 col-md-3 text-right text-md-left col-form-label">{'ms2_product_made_in' | lexicon}:</label>
        <div class="col-6 col-md-9">
          {$made_in ?: '-'}
        </div>
      </div>

      {'msOptions' | snippet: [
        'options' => 'colors,list,list_multiple'
      ]}

      {'msProductOptions' | snippet: []}

      <div class="form-group row align-items-center">
        <div class="col-12 offset-md-3 col-md-9 text-center text-md-left">
          <button type="submit" class="btn btn-primary" name="ms2_action" value="cart/add">
            {'ms2_frontend_add_to_cart' | lexicon}
          </button>
        </div>
      </div>
    </form>

  </div>
</div>
```

Catalog product preview example:

```fenom
<div class="ms2_product mb-5 mb-md-3" itemtype="http://schema.org/Product" itemscope>
  <meta itemprop="description" content="{$description = $description ?: $pagetitle}">
  <meta itemprop="name" content="{$pagetitle}">

  <form method="post" class="ms2_form d-flex flex-column flex-md-row align-items-center no-gutters" data-mspd-product="{$id}">
    <input type="hidden" name="id" value="{$id}">
    <input type="hidden" name="count" value="1">
    <input type="hidden" name="options" value="[]">
    <div class="col-md-2 text-center text-md-left">
      <a href="{$id | url}">
        {if $thumb?}
        <img src="{$thumb}" class="mw-100" alt="{$pagetitle}" title="{$pagetitle}" itemprop="image"/>
        {else}
        <img src="{'assets_url' | option}components/minishop2/img/web/ms2_small.png"
            srcset="{'assets_url' | option}components/minishop2/img/web/ms2_small@2x.png 2x"
            class="mw-100" alt="{$pagetitle}" title="{$pagetitle}"/>
        {/if}
      </a>
    </div>
    <div class="col-md-10 d-flex flex-column flex-md-row align-items-center no-gutters" itemtype="http://schema.org/AggregateOffer" itemprop="offers" itemscope>
      <meta itemprop="category" content="{$_modx->resource.parent | resource: 'pagetitle'}">
      <meta itemprop="offerCount" content="1">
      <meta itemprop="price" content="{$price | replace:' ':''}">
      <meta itemprop="lowPrice" content="{$price | replace:' ':''}">
      <meta itemprop="priceCurrency" content="RUR">

      <div class="col-12 col-md-8 mt-2 mt-md-0 flex-grow-1">
        <div class="d-flex justify-content-around justify-content-md-start">
          <a href="{$id | url}" class="font-weight-bold">{$pagetitle}</a>
          <span class="price ml-md-3" data-mspd-price="{$price}">{$price}</span> <span>{'ms2_frontend_currency' | lexicon}<sup data-mspd-sup class="d-none" style="color:red;">*</sup></span>
          <span data-mspd-old-price-wrap class="{!$old_price ? 'd-none' : ''} old_price">
            <span class="ml-md-3" data-mspd-old-price="{$old_price}">{$old_price}</span>
            {'ms2_frontend_currency' | lexicon}
          </span>
        </div>
        <div class="mb-3" data-mspd-info=""></div>
        <div class="flags mt-2 d-flex justify-content-around justify-content-md-start">
          {if $new?}
          <span class="badge badge-secondary badge-pill mr-md-1">{'ms2_frontend_new' | lexicon}</span>
          {/if}
          {if $popular?}
          <span class="badge badge-secondary badge-pill mr-md-1">{'ms2_frontend_popular' | lexicon}</span>
          {/if}
          {if $favorite?}
          <span class="badge badge-secondary badge-pill mr-md-1">{'ms2_frontend_favorite' | lexicon}</span>
          {/if}
        </div>
        {if $introtext}
        <div class="mt-2 text-center text-md-left">
          <small>{$introtext | truncate : 200}</small>
        </div>
        {/if}
      </div>
      <div class="col-12 col-md-4 mt-2 mt-md-0 text-center text-md-right">
        <button class="btn btn-primary" type="submit" name="ms2_action" value="cart/add">
          {'ms2_frontend_add_to_cart' | lexicon}
        </button>
      </div>
    </div>
  </form>
</div>
```

Cart uses different attributes plus discount per unit, per product count, and total discount. Per-product and total discounts go inside block with `data-mspd-cart-wrap`. Example cart chunk below.

```fenom
<div id="msCart">
  {if $products | length == 0}
  <div class="alert alert-warning">
    {'ms2_cart_is_empty' | lexicon}
  </div>
  {else}
  <div class="table-responsive">
    <table class="table table-striped">
      <tr class="ms-header">
        <th class="ms-title">{'ms2_cart_title' | lexicon}</th>
        <th class="ms-count">{'ms2_cart_count' | lexicon}</th>
        <th class="ms-weight">{'ms2_cart_weight' | lexicon}</th>
        <th class="ms-price">{'ms2_cart_price' | lexicon}</th>
        <th class="ms-cost">{'ms2_cart_cost' | lexicon}</th>
        <th class="ms-remove"></th>
      </tr>

      {foreach $products as $product}
        {var $image}
        {if $product.thumb?}
        <img src="{$product.thumb}" alt="{$product.pagetitle}" title="{$product.pagetitle}"/>
        {else}
        <img src="{'assets_url' | option}components/minishop2/img/web/ms2_small.png"
            srcset="{'assets_url' | option}components/minishop2/img/web/ms2_small@2x.png 2x"
            alt="{$product.pagetitle}" title="{$product.pagetitle}"/>
        {/if}
        {/var}
        <tr id="{$product.key}">
          <td class="ms-title">
            <div class="d-flex">
              <div class="ms-image mw-100 pr-3">
                {if $product.id?}
                <a href="{$product.id | url}">{$image}</a>
                {else}
                {$image}
                {/if}
              </div>
              <div class="title">
                {if $product.id?}
                <a href="{$product.id | url}">{$product.pagetitle}</a>
                {else}
                {$product.name}
                {/if}
                {if $product.options?}
                <div class="small">
                  {$product.options | join : '; '}
                </div>
                {/if}
              </div>
            </div>
          </td>
          <td class="ms-count">
            <form method="post" class="ms2_form" role="form">
              <input type="hidden" name="key" value="{$product.key}"/>
              <div class="form-group">
                <div class="input-group input-group-sm">
                  <input type="number" name="count" value="{$product.count}" class="form-control"/>
                  <div class="input-group-append">
                    <span class="input-group-text">{'ms2_frontend_count_unit' | lexicon}</span>
                  </div>
                </div>
                <button class="btn btn-sm" type="submit" name="ms2_action" value="cart/change">&#8635;</button>
              </div>
            </form>
          </td>
          <td class="ms-weight">
            <span class="text-nowrap">{$product.weight} {'ms2_frontend_weight_unit' | lexicon}</span>
          </td>
          <td class="ms-price">
            <span class="mr-2 text-nowrap" data-mspd-cart-price>{$product.price}</span> {'ms2_frontend_currency' | lexicon}
            <span class="text-nowrap {!$product.old_price ? 'd-none' : ''}" data-mspd-cart-wrap>
              <span class="old_price"><span data-mspd-cart-old-price>{$product.old_price}</span> {'ms2_frontend_currency' | lexicon}</span> <br>
              Discount per unit: <span data-mspd-cart-discount-price>{$product.discount_price}</span> {'ms2_frontend_currency' | lexicon}
            </span>
          </td>
          <td class="ms-cost">
            <span class="mr-2 text-nowrap">
              <span class="ms2_cost" data-mspd-cart-cost>{$product.cost}</span> {'ms2_frontend_currency' | lexicon}<br>
              <span data-mspd-cart-wrap>
                Savings: <span data-mspd-cart-discount-cost>{$product.discount_cost}</span>
                {'ms2_frontend_currency' | lexicon}
              </span>
            </span>
          </td>
          <td class="ms-remove">
            <form method="post" class="ms2_form text-md-right">
              <input type="hidden" name="key" value="{$product.key}">
              <button class="btn btn-sm btn-danger" type="submit" name="ms2_action" value="cart/remove">&times;</button>
            </form>
          </td>
        </tr>
      {/foreach}

      <tr class="ms-footer">
        <th class="total">{'ms2_cart_total' | lexicon}:</th>
        <th class="total_count">
          <span class="ms2_total_count">{$total.count}</span>
          {'ms2_frontend_count_unit' | lexicon}
        </th>
        <th class="total_weight text-nowrap" colspan="2">
          <span class="ms2_total_weight">{$total.weight}</span>
          {'ms2_frontend_weight_unit' | lexicon}
        </th>
        <th class="total_cost text-nowrap" colspan="2">
          <span class="ms2_total_cost">{$total.cost}</span>
          {'ms2_frontend_currency' | lexicon}
          <span data-mspd-cart-wrap class="d-none">
            Total savings: <span data-mspd-cart-total-discount>{$total.discount}</span>
            {'ms2_frontend_currency' | lexicon}
          </span>
        </th>
      </tr>
    </table>
  </div>

  <form method="post" class="ms2_form">
    <button type="submit" name="ms2_action" value="cart/clean" class="btn btn-danger">
      {'ms2_cart_clean' | lexicon}
    </button>
  </form>
  {/if}
</div>
```

## Algorithm

Discount must be active to apply. Manually activate only promo-code discounts. If discount has "Validity period", it activates/deactivates automatically; when periods end, discount deactivates.

Actual discount calculation runs only when product added to cart, cart changed, or cart page loaded. All data elsewhere (e.g. product page) is indicative. Script gets active discounts and cart, then checks each product against each discount. Check order: exclusions first, then inclusions:

* Excluded categories; * Included categories;
* Excluded products; * Included products;
* Excluded modifications; * Included modifications;
* Excluded properties/options; * Included properties/options;

Order defines discount application priority. E.g. if discount excludes category "Tools" and includes "Drill", then "Tools" including "Drill" get no discount. Matching discounts are applied, then cart is recalculated. If user abandons cart, page still reloads at set time and cart recalculates.

Quantity-related options. First: "Relation to quantity" — two variants:

1. `multiple` — discount applies to every Nth product matching discount conditions;
2. `greater or equal` — discount applies to all products if total eligible count >= specified.

Related option "Which quantity to use?" — three variants:

1. Total products in cart;
2. Unique products in cart;
3. Count each product separately.

Abstract example with 3 settings changed; no other limits. Cart:

| Product   | Count | Price | Sum |
|---------|--------|------|-------|
| Product A | 2      | 100  | 200   |
| Product B | 1      | 150  | 150   |
| Product C | 1      | 200  | 200   |
| Product D | 1      | 300  | 300   |

| Relation | Count | Which quantity? | Products with discount |
|----------|-------|-----------------|------------------------|
| multiple | 1 | Total in cart | A, B, C, D |
| multiple | 2 | Total in cart | A, C |
| multiple | 3 | Total in cart | B |
| multiple | 1 | Unique in cart | A, B, C, D |
| multiple | 2 | Unique in cart | B, D |
| multiple | 3 | Unique in cart | C |
| multiple | 1 | Per product | A, B, C, D |
| multiple | 2 | Per product | A |
| multiple | 3 | Per product | |
| >= | 1–3 | Total/unique/per product | per rules above |

## Exclusions and inclusions

* Categories include/exclude with all children.
* Products include/exclude with all modifications. Products from other categories not added if categories included.
* For modification-specific discount, discount info shown only if modification id provided.
* Options/Properties exclude only by exact value in settings. E.g. exclude option `width`=10: product with width=20 passes. For inclusion you can set comparison; product must have option value, else fails. `0` is valid.

## Maximum order amount

You can limit discount by minimum order amount; even if other conditions met, discount not applied until cart total >= minimum.

## Discount selection and application order

Defined by `mspd_many_behaviour`. Default `3` = apply all matching discounts by priority. Value `2` = apply one discount with smallest absolute value. Value `1` = opposite (apply 40% not 50%). Value `0` = apply discount with highest priority; if equal, by id.

## Promo name and resource

You can set resource with promo description. Limit to one resource via `mspd_root_resource_ids` to avoid searching all. Promo name fills automatically but can be edited.
