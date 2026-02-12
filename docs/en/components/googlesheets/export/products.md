# Products (msProduct)

## Export fields

All standard resource fields plus custom fields:

| Field                 | Name              |
| --------------------- | --------------------- |
| price                 | Price                  |
| old_price             | Old price           |
| article               | SKU               |
| weight                | Weight                   |
| color                 | Colors         |
| size                  | Sizes       |
| vendor                | Vendor (id)    |
| made_in               | Country                |
| tags                  | Tags          |
| new                   | New                 |
| favorite              | Special                |
| popular               | Popular            |
| categories            | List of categories (id) |
| images                | Image list       |
| option.option name | Options                 |

### Field modifiers

| Field           | Name                |
| --------------- | ----------------------- |
| vendor_name     | Vendor (name)    |
| categories_name | List of categories (name) |

## ms2Gallery

| Name   | Name        |
| ------ | --------------- |
| images | list of images |

All image files must be on the server

## Export example

**Export fields:** id,article,pagetitle,template_name,price,color,size,vendor_name

**Result:**

![Result](https://file.modx.pro/files/f/f/b/ffb1ea453acd93b6409c9415ee516096.jpg)

## System events

Class **gsProduct** fires these events:

```php
<?php
switch ($modx->event->name) {
  // fetches the list of products
  case 'gsOnBeforeGetProducts':
    // $query - selection query
    // $range - sheet name, where data will be exported
    break;
  case 'gsOnGetProducts':
    // $products - array of products with all fields
    // $range - sheet name
    break;
}
```

### Examples

1. Select products with a specific vendor

    1.1 by vendor id:

    ```php
    <?php
    if ($modx->event->name == 'gsOnBeforeGetProducts') {
      $query->where(array('Data.vendor' => 8)); // Vendor id
    }
    ```

    1.2 by vendor name

    ```php
    <?php
    if ($modx->event->name == 'gsOnBeforeGetProducts') {
      $query->where(array('Vendor.name' => 'Samsung'));
    }
    ```

2. Add 10% to price and store current price as old price.

    ```php
    <?php
    if ($modx->event->name == 'gsOnGetProducts') {
      $modx->event->params['products'] = array_map(function($product){
          if (isset($product['old_price']) && !empty($product['price'])) {
            $product['old_price'] = $product['price'];
          }
          if (!empty($product['price'])) {
            $product['price'] = $product['price'] * 1.1;
          }
          return $product;
      }, $products);
    }
    ```
