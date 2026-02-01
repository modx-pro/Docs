# Quick start

## Order statuses

If you changed the main order statuses, go to the component system settings and set: `mspc2_order_status_paid`, `mspc2_order_status_cancel`.

## Promo code form output

Call the `msPromoCode2` snippet where needed:

```fenom
{'!msPromoCode2' | snippet}
```

### Cart price updates

To update cart prices, in the cart chunk inside the product loop:

1. Add attribute `data-mspc2-id` with value `{$product | mspc2CartKey}` to the wrapping tag with `id="{$product.key}"`.
2. Wrap the **block** with current and old prices in a tag with class `.js-mspc2-cart-product-prices`.
3. Wrap the **block** with product cost in a tag with class `.js-mspc2-cart-product-prices`.

### Cart code example

Cart chunk `tpl.msCart` or its copy:

```fenom
<div id="msCart">
  ...
  {foreach $products as $product}
    <tr id="{$product.key}" data-mspc2-id="{$product | mspc2CartKey}">
      <td class="title">
        ...
      </td>
      <td class="count">
        ...
      </td>
      <td class="price [ js-mspc2-cart-product-prices ]">
        <span class="mr-2 text-nowrap">{$product.price} {'ms2_frontend_currency' | lexicon}</span>
        {if $product.old_price?}
          <span class="old_price text-nowrap">{$product.old_price} {'ms2_frontend_currency' | lexicon}</span>
        {/if}
      </td>
      <td class="cost [ js-mspc2-cart-product-prices ]">
        <span class="mr-2 text-nowrap"><span class="ms2_cost">{$product.cost}</span> {'ms2_frontend_currency' | lexicon}</span>
      </td>
    </tr>
  {/foreach}
  ...
</div>
```

## Price updates in catalog and product page

If you output the promo form on catalog or product pages, prices should update after applying a promo code.
To do this:

1. Wrap the product block in a tag with class `.js-mspc2-product` and attribute `data-id` equal to the product id.
2. Wrap the price number in that block in a tag with class `.js-mspc2-product-price`.
3. Wrap the old price number in that block in a tag with class `.js-mspc2-product-old-price`.

### Catalog product example

In chunk `tpl.msProducts.row`:

```fenom
<div class="ms2_product [ js-mspc2-product ]" data-id="{$id}">
  ...
  <span class="price">
    <span class="[ js-mspc2-product-price ]">
      {$price}
    </span>
    {'ms2_frontend_currency' | lexicon}
  </span>

  <span class="discount" style="display: none;">
    Discount:
    <span class="[ js-mspc2-product-discount-amount ]">
      0
    </span>
    {'ms2_frontend_currency' | lexicon}
  </span>

  {if $old_price?}
    <span class="old_price">
      <span class="[ js-mspc2-product-old-price ]">
        {$old_price}
      </span>
      {'ms2_frontend_currency' | lexicon}
    </span>
  {/if}
  ...
</div>
```

### Product page example

In chunk `msProduct.content`:

```modx
...
<div id="msProduct" class="[ js-mspc2-product ]" data-id="{$_modx->resource['id']}">
  ...
  <span class="[ js-mspc2-product-price ]">
    [[+price]]
  </span>
  [[%ms2_frontend_currency]]

  [[+old_price:gt=`0`:then=`
    <span class="old_price ml-2">
      <span class="[ js-mspc2-product-old-price ]">
        [[+old_price]]
      </span>
      [[%ms2_frontend_currency]]
    </span>
  `:else=``]]

  <div class="discount ml-md-3" style="display: none;">
    Discount:
    <span class="[ js-mspc2-product-discount-amount ]">
      0
    </span>
    [[%ms2_frontend_currency]]
  </div>
</div>
```

### Output discount amount next to price

In the same product block with class `.js-mspc2-product` add:

```fenom
<div style="display: none;">
  Discount:
  <span class="[ js-mspc2-product-discount-amount ]">0</span>
  {'ms2_frontend_currency' | lexicon}
</div>
```

The `.js-mspc2-product-discount-amount` tag is required for live updates.
