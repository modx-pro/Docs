# [msPromoCode][2] integration

Promo codes to reduce the full order cost.

You create promo codes with absolute or percentage discounts and optional expiration. Works with msPromoCode's **Cart discount** option.

![Discount system](https://file.modx.pro/files/5/8/7/587728d83cd16b59a43a1b3822dcc6c8.png)

## Adding promo codes to order

**Requires miniShop 2.4 or higher**.

Add a new field to the order chunk so customers can enter the code.

This is **pas.order**:

```fenom
{set $field = 'mspromo_code'}
<div class="row input-parent">
    <label class="form-control-static control-label col-md-4" for="{$field}">
        {('payandsee_' ~ $field) | lexicon}:
    </label>
    <div class="form-group col-md-8">
        <input type="text" id="{$field}"
            placeholder="XXXXX-XXXX-XXXX"
            name="{$field}" value="{$order[$field]}"
            class="form-control{($field in list $errors) ? ' error' : ''}">
    </div>
</div>
```

*Example for standard [Bootstrap 3][1] layout.*

When a promo code is added it is validated; on error an error is shown, otherwise the order discount is applied.

[![](https://file.modx.pro/files/1/1/2/11265e14bd7c365db06f8b2b40d43b96s.jpg)](https://file.modx.pro/files/1/1/2/11265e14bd7c365db06f8b2b40d43b96.png)

*Message text can be changed in system lexicons.*

[1]: http://getbootstrap.com
[2]: https://modstore.pro/packages/discounts/mspromocode
