# Installation and setup

Getting started with the package is straightforward.

## Main setup

- After installing the component, in the backend go to either the component page or the product page you want to link a coupon to, select the `Promo codes` tab and create a promo code.
- On the page where the `msCart` snippet is called, call the `mspcForm` snippet **uncached**: `{'!mspcForm' | snippet}` or `[[!mspcForm]]`. Best to call it in the cart output chunk so the input field is hidden when the cart is empty. Can be called multiple times, e.g. before and after the cart.
- For the price to update dynamically when a coupon is applied, do the following.

### Dynamic product price update after coupon apply

#### miniShop2 v2.4

1. In chunk `tpl.msCart` wrap the price output in selector `span.price span`.

    I.e. instead of:

    ```fenom
    <span>{$product.price}</span> {'ms2_frontend_currency' | lexicon}
    ```

    use something like:

    ```fenom
    <span class="price"><span>{$product.price}</span> {'ms2_frontend_currency' | lexicon}</span>
    ```

2. Slightly below, wrap the old (strikethrough) price in selector `span.old_price span`.

    Instead of:

    ```fenom
    {if $product.old_price?}
      <span class="old_price">{$product.old_price} {'ms2_frontend_currency' | lexicon}
    {/if}
    ```

    use something like:

    ```fenom
    <span class="old_price" style="{if !$product.old_price}display:none;{/if}">
      <span>{$product.old_price}</span> {'ms2_frontend_currency' | lexicon}
    </span>
    ```

#### miniShop2 v2.2

1. In chunk `tpl.msCart.row` wrap the price in selector `span.price span`:

    ```modx
    <span class="price"><span>[[+price]]</span> [[%ms2_frontend_currency]]</span>[[+old_price]]
    ```

2. In the quick placeholder `old_price` (at the bottom of chunk `tpl.msCart.row`) wrap the old (strikethrough) price in selector `span.old_price span`:

    ```modx
    <!--minishop2_old_price
    <span class="old_price"><span>[[+old_price]]</span> [[%ms2_frontend_currency]]</span>-->
    ```

### Output discount amount

[![](https://file.modx.pro/files/4/f/4/4f4ee223deb3b63c55574620e8c1795e.png)](https://file.modx.pro/files/4/f/4/4f4ee223deb3b63c55574620e8c1795e.png)

You can output the promo code discount anywhere on the page where `mspcForm` is called, using something like:

```modx
<div class="mspc_discount_amount" style="display: none;">
  Promo code discount: <span>0</span> [[%ms2_frontend_currency]]
</div>
```

::: warning
The discount amount is written to selector `span.mspc_discount_amount span` without currency. That is where the amount is displayed and updated.
:::
