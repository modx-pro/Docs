---
title: ShoppingCart
description: Universal snippet for building a shopping cart with database storage
---
# ShoppingCart

## Description

Universal snippet for building a shopping cart in an online store. The snippet can also be used for temporary storage of any data, e.g. favorites, etc. Data is stored in the database; storage duration can be configured. Adding products to the cart and editing contents can be done via JavaScript (no dependencies).

[Package in MODX repository](https://modx.com/extras/package/shoppingcart)

## Parameters of snippet shoppingCart

- **rowTpl** - Name of the chunk for a cart content row.
- **outerTpl** - Name of the chunk for the cart wrapper.
- **emptyTpl** - Name of the chunk for the empty cart.
- **action** - Action. Values: print - output cart contents. If not set, performs actions passed in the request.
- **currency** - Product currency.
- **lifeTime** - Cart data lifetime in the database in seconds. Default: 172800 (48 hours).
- **contentType** - Name of the content type.

Example HTML for a product form to add to cart:

```modx
<div class="shk-item">
  <form id="shk-form" action="[[~6]]" method="post">
    <input type="hidden" name="item_id" value="[[*id]]">
    <!-- Field "category_id" is only needed for Shopkeeper4 -->
    <input type="hidden" name="category_id" value="[[*parent]]">
    <div>
      <div class="my-3">
        [[*description]]
      </div>
      <div class="my-3">
        Price:
        <span class="big shk-price">[[*price:numFormat]]</span>
        <span class="shk-currency">[[+shk4.currency]]</span>
      </div>
      <div class="my-3">
        <input type="number" class="form-control d-inline-block text-center mr-2" value="1" min="1" step="1" name="count" style="width: 100px;">
        <button type="submit" class="btn btn-primary" name="submit_button">
          Add to cart
        </button>
      </div>
    </div>
  </form>
</div>
```

Example snippet call:

```modx
[[!shoppingCart?
  &action=`print`
  &contentType=`shop`
  &rowTpl=`shoppingCart_rowTpl`
  &outerTpl=`shoppingCart_outerTpl`
  &emptyTpl=`shoppingCart_emptyTpl`
]]
```

Snippet call with a parameter set (recommended):

```modx
[[!shoppingCart@shoppingCartFull]]
```

### Placeholders in chunk "outerTpl"

- `[[+wrapper]]` - HTML with the product list (chunk "rowTpl").
- `[[+priceTotal]]` - Total price of products in the cart.
- `[[+countTotal]]` - Total number of products in the cart.
- `[[+countTotalUnique]]` - Total number of unique products in the cart.
- `[[+currency]]` - currency.

### Placeholders in chunk "rowTpl"

- `[[+item_id]]` - Product ID.
- `[[+title]]` - Product name.
- `[[+name]]` - Product alias.
- `[[+uri]]` - Product URI.
- `[[+count]]` - Quantity of one product.
- `[[+price]]` - Price.
- `[[+priceTotal]]` - Total price including product options.
- `[[+options.x]]` - Any parameter from the "options" array. Example for ``$options['color']``: ``[[+options.color]]``.
- `[[+index]]` - Row index (from 0).
- `[[+num]]` - Row number (from 1).

### Placeholders available in the template where snippet "shoppingCart" is called

- `[[+shopping_cart.price_total]]`
- `[[+shopping_cart.items_total]]`
- `[[+shopping_cart.items_unique_total]]`
- `[[+shopping_cart.delivery_price]]`
- `[[+shopping_cart.delivery_name]]`
- `[[+shopping_cart.ids]]`

## Plugin shoppingCart

The plugin removes expired carts from the database on cache clear and saves the user ID to cart data on login.

Events: **OnCacheUpdate**, **OnWebLogin**.

## Plugin shoppingCartShopkeeper4

Plugin that builds product data from the MongoDB database of [Shopkeeper4](https://github.com/andchir/shopkeeper4). It is also used to save order data to MongoDB. To output the product list on the catalog page you can use [snippet Shopkeeper4](https://modx.com/extras/package/shopkeeper4integration).

Events: **OnShoppingCartAddProduct**, **OnShoppingCartCheckoutSave**.

The product form must include a hidden field with the category ID. Example (product page):

```modx
<input type="hidden" name="category_id" value="[[+page.parentId]]">
```

Example category field in product list:

```modx
<input type="hidden" name="category_id" value="[[+page.parentId]]">
```

Example category field in product list:

```modx
<input type="hidden" name="category_id" value="[[+parentId]]">
```

## Plugin shoppingCartModResource

Plugin that builds product data from MODX resources. For price you can use an extra field (TV). If you use MODX resources (documents) as products, ensure this plugin is enabled.

Events: **OnShoppingCartAddProduct**, **OnShoppingCartCheckoutSave**.

Parameters:

- **tvNamePrice** - Name of the product price TV. Default: "price".

## Checkout

To create a checkout form and send notification emails use snippet [FormIt](https://modx.com/extras/package/formit). To output the order product list in the email and save the order to the database you can use snippet "shoppingCart" as a hook.

Example FormIt snippet call:

```modx
[[!FormIt?
  &hooks=`spam,shoppingCart,FormItSaveForm,email,FormItAutoResponder,redirect`
  &submitVar=`action_order`
  &emailTpl=`shoppingCart_orderReport`
  &fiarTpl=`shoppingCart_orderReport`
  &emailSubject=`New order in the online store "[[++site_name]]"`
  &fiarSubject=`You placed an order in the online store "[[++site_name]]"`
  &emailFrom=`[[++emailsender]]`
  &emailTo=`[[++emailsender]]`
  &fiarReplyTo=`[[++emailsender]]`
  &fiarToField=`email`
  &redirectTo=`8`
  &validate=`address:required,fullname:required,email:email:required,phone:required,delivery:required,payment:required`
  &formFields=`fullname,address,phone,email,delivery,payment,message,orderOutputData`
  &fieldNames=`fullname==Full name,address==Address,phone==Phone,email==Email,delivery==Delivery method,payment==Payment method,message==Comment,orderOutputData==Order contents`
  &formName=`shop`
  &shoppingCartMailRowTpl=`shoppingCart_mailOrderRowTpl`
  &shoppingCartMailOuterTpl=`shoppingCart_mailOrderOuterTpl`
]]
```

This example also uses the "FormItSaveForm" hook, which saves form data for display in the FormIt component in the admin. If you use another component for order management, you can remove this hook.

The "shoppingCart" hook fires "OnShoppingCartCheckoutSave"; a plugin listening to this event can save order data and build the order product list for the email.

Example checkout form can be found [here](https://github.com/andchir/modx-shopkeeper4/blob/master/core/components/shopping_cart/elements/chunks/page_formCheckout.html). Example email template is also in the [ShoppingCart snippet package](https://github.com/andchir/modx-shopkeeper4/blob/master/core/components/shopping_cart/elements/chunks/orderReport.html).

### Parameters of hook shoppingCart

- **shoppingCartMailRowTpl** - Name of the chunk for a single product. Default: "shoppingCart_mailOrderRowTpl".
- **shoppingCartMailOuterTpl** - Name of the chunk for the product list wrapper. Default: "shoppingCart_mailOrderOuterTpl".
- **shoppingCartMailContentType** - Name of the cart content type. Default: "shop".

## JavaScript API

Script ``shopping_cart.js`` can be used to manage the shopping cart without reloading the page (Ajax).

Add this line to your template to load the script before ``</head>`` or ``</body>``:

```modx
<script src="[[++base_url]]assets/components/shopping_cart/js/shopping_cart.js"></script>
```

Usage example:

```js
var shoppingCart;
document.addEventListener('DOMContentLoaded', function () {
  shoppingCart = new ShoppingCart({
    baseUrl: '[[++base_url]]',
    snippetPropertySetName: 'shoppingCartSmall',
    selector: '#shoppingCartSmallContainer',
    productFormSelector: '.shk-item form'
  });
});
```

### Parameters of class ShoppingCart

- **baseUrl** - Site base URL. Default: "/".
- **connectorUrl** - Connector URL. Default: "assets/components/shopping_cart/connector.php".
- **snippetPropertySetName** - Name of the shoppingCart snippet parameter set. You can set chunk names etc. in this set to get the updated cart HTML.
- **selector** - Selector of the cart container element. The element must contain a form (``<form>``). Default: "#shoppingCartContainer".
- **useNumberFormat** - Use thousands separators for price. Default: true.
- **selectorPriceTotal** - Selector of elements with total price. Content is updated automatically after cart update. Default: ".shopping-cart-price-total".
- **selectorCountTotal** - Selector of elements with product count. Default: ".shopping-cart-count-total".
- **selectorCountUniqueTotal** - Selector of elements with unique product count. Default: ".shopping-cart-count-unique-total".
- **selectorDeclension** - Selector of element with string (e.g. item/items) to decline by count. Default: ".shopping-cart-declension".
- **productFormSelector** - Selector of the form with the "Add to cart" button. The form is submitted without reloading the page.

### Events

- **load** - After cart data is loaded.
- **formSubmitBefore** - Before form data is sent.
- **requestBefore** - Before request is sent.
- **requestAfter** - After request is sent.

Usage example for events:

```js
shoppingCart
  .addEventListener('formSubmitBefore', function(e) { // Before form data is sent
    var buttonEl = e.detail.element.querySelector('button[type="submit"]');
    if (buttonEl) {
      buttonEl.setAttribute('disabled', ''); // Disable the button
    }
  })
  .addEventListener('load', function(e) { // After cart response is received
    if (e.detail.element) {
      var buttonEl = e.detail.element.querySelector('button[type="submit"]');
      if (buttonEl) {
        buttonEl.removeAttribute('disabled'); // Re-enable the button
      }
    }
  });
```
