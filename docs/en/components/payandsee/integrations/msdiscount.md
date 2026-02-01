# [msDiscount][2] integration

One-time discount coupons to reduce the full order cost.

You create coupon groups with absolute or percentage discounts and optional expiration. Use unique prefixes to distinguish groups.

![Discount system](https://file.modx.pro/files/f/2/f/f2f5cc342e1c0f77f9e1df3b55ee35b4.png)

## Adding coupons to order

**Requires miniShop 2.4 or higher**.

Add a new field to the order chunk so customers can enter the code.

This is **pas.order**:

```php
{set $field = 'coupon_code'}
<div class="row input-parent">
   <label class="form-control-static control-label col-md-4" for="{$field}">
       {('payandsee_' ~ $field) | lexicon}:
   </label>
   <div class="form-group col-md-8">
       <input type="text" id="{$field}" placeholder="XXXXX-XXXX-XXXX-XXXX"
           name="{$field}" value="{$order[$field]}"
           class="form-control{($field in list $errors) ? ' error' : ''}">
   </div>
</div>
```

*Example for standard [Bootstrap 3][1] layout.*

When a coupon is added it is validated; on error the field is not saved and an error is shown.

![Discount system - 2](https://file.modx.pro/files/9/7/e/97e6d312697b658442a19bc02680dd1a.png)

*Message text can be changed in system lexicons.*

On success, the price updates like this (gif):

![Discount system - 3](https://file.modx.pro/files/e/c/0/ec079395ad6ced00052e447b18cc036e.gif)

[1]: http://getbootstrap.com
[2]: /en/components/msdiscount/
