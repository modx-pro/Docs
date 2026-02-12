# Cart

This class is initialized by `miniShop2::initialize()` and must implement the `msCartInterface` interface.

Required interface methods:

- **initialize** — Initializes the class in the context. Can load scripts and styles.
- **add($id, $count = 1, $options = [])** — Adds a product to the cart. `id` is required, `count` and `options` are optional.
- **remove** — Removes a product from the cart; `key` parameter is required
- **change** — Changes product quantity in the cart; `key` and `count` are required
- **clean** — Full cart clear
- **status** — Returns cart status: `total_count`, `total_cost`, `total_weight`, `total_discount`, `total_positions`
- **get** — Returns the full cart contents
- **set** — Overwrites cart contents with the given `cart` array

Of course, the package includes the standard `msCartHandler` class that implements these methods and adds a few of its own for responding to requests.
You can extend it or implement the interface yourself.

You can set your class for the context in the **ms2_cart_handler_class** system setting.
See the [services section][1] for registering services.

## Initialization

```php
if ($miniShop2 = $modx->getService('miniShop2')) {
  // Initialize the class in the current context
  $miniShop2->initialize($modx->context->key);

  print_r($miniShop2->cart->add(5)); // Add product with id = 5 and print the response
  print_r($miniShop2->cart->get()); // Get and print cart contents
  print_r($miniShop2->cart->status()); // Get and print cart status
}
```

After initializing the miniShop2 class, the cart and all its methods are available in `$miniShop2->cart`.
Since the class name comes from system settings, each context can have its own cart.

You can configure `msCartHandler` at initialization:

```php
// Initialize the class in the current context
$scriptProperties = array(
  'json_response' => true, // return responses in JSON
  'max_count' => 1000, // max products to add at once
  'allow_deleted' => false, // do not add products with deleted = 1 to cart
  'allow_unpublished' => false, // do not add products with published = 0 to cart
);
$miniShop2->initialize($modx->context->key, $scriptProperties);
```

You cannot work with the cart directly, only through the class methods.

## System events

The `msCartHandler` class fires certain events when working with the cart. Here they are as a plugin template:

```php
<?php
switch ($modx->event->name) {
  // Add product events
  case 'msOnBeforeAddToCart': break; // receives $product, $count, $options and $cart
  case 'msOnAddToCart': break; // receives $key and $cart

  // Remove product from cart
  case 'msOnBeforeRemoveFromCart': break; // receives $key and $cart
  case 'msOnRemoveFromCart': break; // receives $key and $cart

  // Change quantity
  case 'msOnBeforeChangeInCart': break; // receives $key, $count and $cart
  case 'msOnChangeInCart': break; // receives $key, $count and $cart

  // Clear cart
  case 'msOnBeforeEmptyCart': break; // receives $cart
  case 'msOnEmptyCart': break; // receives $cart

  // Cart status
  case 'msOnGetStatusCart': break; // receives $status and $cart
}
```

All methods receive the **$cart** object — the msCartHandler class instance with all its methods.

The `$key` variable is the cart item key. The formula depends on the `ms2_cart_product_key_fields` system setting (default: `id,options`):

```php
'ms' . md5($id . json_encode($options));
// where $id is the product id and $options is the options array sent when adding
```

The key always has the `ms` prefix. Fields used for key generation can be changed via the `ms2_cart_product_key_fields` setting.

The `$count` variable is the product quantity, a number.

## Examples

To change a product **before** adding it, use the **msOnBeforeAddToCart** event, which has the `$product` object.

```php
case 'msOnBeforeAddToCart':
  $product->set('new_price', 5555);
  break;
```

You can do anything with the product, even save a new price with `$product->save();`.
This event also has the `$options` array — extra parameters (options) sent by the user when adding to cart.
It can contain color, size, or anything else. If you change it, the product will be added with a different `$key`.

Now change the product price **after** adding. In this event we no longer have the product, only the cart and key:

```php
case 'msOnAddToCart':
  $tmp = $cart->get();
  $tmp[$key]['price'] = 1000;
  $cart->set($tmp);
  break;
```

You can change cart contents in any event; `$cart` is always available.

[1]: /en/components/minishop2/development/services/connection
