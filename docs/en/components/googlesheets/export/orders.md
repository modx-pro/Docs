# Orders (msOrder)

## Standard fields

| Field         | Name               |
| ------------- | ---------------------- |
| id            | Order ID              |
| user_id       | Customer (id)        |
| createdon     | Order creation date   |
| updatedon     | Order update date |
| num           | Order number           |
| cost          | Total with delivery |
| cart_cost     | Cart total      |
| delivery_cost | Delivery price          |
| weight        | Weight                    |
| status        | Status (id)            |
| delivery      | Delivery (id)          |
| payment       | Payment (id)            |
| context       | Context               |
| comment       | Manager comment  |

### Field modifiers

| Field         | Name            |
| ------------- | ------------------- |
| status_name   | Status (name)   |
| delivery_name | Delivery (name) |
| payment_name  | Payment (name)   |

## Address

| Field              | Name                |
| ------------------ | ----------------------- |
| address_receiver   | Recipient              |
| address_phone      | Phone                 |
| address_country    | Country                  |
| address_index      | ZIP         |
| address_region     | Region                 |
| address_city       | City                   |
| address_metro      | Metro station           |
| address_street     | Street                   |
| address_building   | Building                  |
| address_room       | Room                 |
| address_comment    | Comment             |
| address_properties | Extra properties |

## User

All standard user fields supported with **user_** prefix.
E.g. user_email, user_fullname

## List of purchased products

| Field               | Name                 |
| ------------------- | ------------------------ |
| products_(field name) | List of purchased products |

E.g.:

* **products_id** outputs list of product IDs
* **products_name** outputs list of product names

## Export example

**Export fields:** id,num,user_username,status_name,cart_cost,products_name

**Result:**

![Result](https://file.modx.pro/files/9/3/b/93bed6c24decff7d8598b9819d82d080.jpg)

## System events

Class **gsOrder** fires these events:

```php
<?php
switch($modx->event->name) {
  // fetches the list of orders
  case 'gsOnBeforeGetOrders':
    // $query - selection query
    // $range - sheet name, where data will be exported
    break;
  case 'gsOnGetOrders':
    // $orders - array of orders with all fields
    // $range - sheet name
    break;
}
```

### Examples

1. Get all orders with status 2 (Paid)

    ```php
    <?php
    if ($modx->event->name == 'gsOnBeforeGetOrders') {
      $query->where(array('status' => 2));
    }
    ```

2. Convert order creation date **createdon**

    ```php
    <?php
    if ($modx->event->name == 'gsOnGetOrders') {
      $modx->event->params['orders'] = array_map(function($order){
        if (!empty($order['createdon'])) {
          $order['createdon'] = date("d-m-Y",strtotime($order['createdon']));
        }
        return $order;
      }, $orders);
    }
    ```
