# Coupons

One-time discount coupons reduce the total cart cost.

You create coupon groups with absolute or percent discount and optional expiry. Use unique prefixes to tell groups apart.

[![](https://file.modx.pro/files/f/2/f/f2f5cc342e1c0f77f9e1df3b55ee35b4s.jpg)](https://file.modx.pro/files/f/2/f/f2f5cc342e1c0f77f9e1df3b55ee35b4.png)

When a group runs out of coupons you can generate more in the same group by entering a larger count when editing and saving.

[![](https://file.modx.pro/files/4/3/b/43b34a02ef2e03f5db0d7ce60876a3eds.jpg)](https://file.modx.pro/files/4/3/b/43b34a02ef2e03f5db0d7ce60876a3ed.png)

To avoid copying hundreds of codes by hand, **export codes as CSV**, which opens in common editors including MS Excel and LibreOffice. Exports can be used for activation stats or printed materials.

When a coupon is redeemed, the miniShop2 order ID and activation time are stored.

[![](https://file.modx.pro/files/6/c/4/6c4c36ca7ca6b67bae0145a0f810ecfes.jpg)](https://file.modx.pro/files/6/c/4/6c4c36ca7ca6b67bae0145a0f810ecfe.png)

## Adding coupons to the order

**Coupons require miniShop2 1.11 stable**. For 2.2-beta you can [apply changes][0] yourself or wait for the developers.

To let the customer enter a code at checkout, add a new field to the checkout chunk.

In miniShop2.2 use **tpl.msOrder.outer**:

```modx
<div class="form-group input-parent">
  <label class="col-sm-4 control-label" for="coupon_code">Discount coupon</label>
  <div class="col-sm-6">
    <input type="coupon_code" id="coupon_code" placeholder="XXXXX-XXXX-XXXX-XXXX" name="coupon_code" value="[[+coupon_code]]" class="form-control">
  </div>
</div>
```

In 2.4 use **tpl.msOrder**:

```fenom
<div class="form-group input-parent">
  <label class="col-sm-4 control-label" for="coupon_code">Discount coupon</label>
  <div class="col-sm-6">
    <input type="coupon_code" id="coupon_code" placeholder="XXXXX-XXXX-XXXX-XXXX" name="coupon_code" value="{$order.coupon_code}" class="form-control">
  </div>
</div>
```

*Example for standard [Bootstrap 3][1] layout.*

When a coupon is added it is validated; on error a message is shown and the field is not saved.

[![](https://file.modx.pro/files/9/7/e/97e6d312697b658442a19bc02680dd1as.jpg)](https://file.modx.pro/files/9/7/e/97e6d312697b658442a19bc02680dd1a.png)

*Message text can be changed in system lexicons.*

When the coupon is valid, the price update looks like this (gif):

[![](https://file.modx.pro/files/e/c/0/ec079395ad6ced00052e447b18cc036es.jpg)](https://file.modx.pro/files/e/c/0/ec079395ad6ced00052e447b18cc036e.gif)

To recalculate order cost when the coupon field changes, add an **MS2 callback**.

For 2.2:

```js
$(document).ready(function () {
  miniShop2.Callbacks.Order.add.ajax.done = function (res) {
    var res = res.responseJSON;
    if (typeof res.data.coupon_code !== 'undefined' || !res.success) {
      miniShop2.Order.getcost();
    };
  };
});
```

For 2.4+:

```js
$(document).ready(function () {
  miniShop2.Callbacks.add('Order.add.ajax.done', 'msdiscount', function (res) {
    var res = res.responseJSON;
    if (typeof res.data.coupon_code !== 'undefined' || !res.success) {
      miniShop2.Order.getcost();
    };
  });
});
```

You can put this in site scripts or in the checkout chunk.

[0]: https://github.com/bezumkin/miniShop2/commit/f33462045561594e56fa11312003c25c04d1bc32
[1]: http://getbootstrap.com
