# Example class extension

To customize the data sent to RetailCRM without losing your code on component update, use the module system. Two module classes can be extended:

- **Orders** — order data collection and sending
- **Customers** — customer data collection and sending

Both are extended the same way; we only show the orders case.

## Step 1

Create a new PHP file anywhere in your project, e.g. `/core/components/modretailcrm/model/modretailcrm/`. Name it **custom_orders.php**.

## Step 2

Open the file and add:

```php
<?php

// Include the base orders class we will extend
if (!class_exists('ordersInterface')) {
  require_once dirname(__FILE__) . '/orders.class.php';
}

// Declare your class; it must extend the parent and implement the interface
class Custom_orders extends Orders implements ordersInterface {

  // ordersInterface requires msOnCreateOrder
  public function msOnCreateOrder($msOrder)
  {
    // Start by calling the parent; you can add more logic later
    parent::msOnCreateOrder($msOrder);
  }
}
```

## Step 3

Set system setting **modretailcrm_custom_orders_class** with your class name and file path. There is no UI for this yet (unlike miniShop2), so use a short script in the console:

```php
$value = array(
  // Class name
  'Custom_orders',
  // Path to the class file
  '{core_path}components/modretailcrm/model/modretailcrm/custom_orders.php'
);

$setting = $modx->getObject('modSystemSetting', array('key' => 'modretailcrm_custom_orders_class'));
$setting->set('value', json_encode($value));
$setting->save();
```

After that your class is used. The component can be updated normally; the main app class, helpers and scripts stay intact.

## Step 4

Override methods as needed. Example: change **msOnCreateOrder** and **orderCombine** to add your logic (e.g. promo/coupon data):

```php
<?php

if (!class_exists('ordersInterface')) {
  require_once dirname(__FILE__) . '/orders.class.php';
}

class Custom_orders extends Orders implements ordersInterface {

  public function msOnCreateOrder($msOrder)
  {
    parent::msOnCreateOrder($msOrder);
  }

  // Override order data collection; add data from msPromoCode2 (or similar)
  /**
   * @param xPDOObject $msOrder
   * @return mixed
   */
  public function orderCombine($msOrder)
  {
    $pdo =& $this->pdo;
    $order = $msOrder->toArray();
    $order['address'] = $pdo->getArray('msOrderAddress', array('id' => $order['address']), array('sortby' => 'id'));
    $order['delivery'] = $pdo->getArray('msDelivery', array('id' => $order['delivery']), array('sortby' => 'id'));
    $order['payment'] = $pdo->getArray('msPayment', array('id' => $order['payment']), array('sortby' => 'id'));
    $order['profile'] = $pdo->getArray('modUserProfile', array('internalKey' => $order['user_id']), array('sortby' => 'id'));
    $order['products'] = $pdo->getCollection('msOrderProduct', array('order_id' => $order['id']), array('sortby' => 'id'));
    // Add applied promo/coupon data
    $order['sale'] = $pdo->getArray('mspc2CouponOrder', array('order' => $order['id']));

    return $order;
  }
}
```
