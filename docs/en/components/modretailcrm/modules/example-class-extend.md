# Example class extension

To customize data sent to RetailCRM without losing your changes on component update, use the module system. Two module classes can be extended:

- **Orders** — order data collection and sending
- **Customers** — customer data collection and sending

Both are extended the same way. Example: custom orders module.

## Step 1

Create a new PHP file in your project, e.g. `/core/components/modretailcrm/model/modretailcrm/`. Name it **custom_orders.php**.

## Step 2

Add the class extending the base orders class and implementing the interface:

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
}
```

## Step 3

Set system setting **modretailcrm_custom_orders_class** to your class name and file path. Example via console:

```php
$value = array(
  'Custom_orders',
  '{core_path}components/modretailcrm/model/modretailcrm/custom_orders.php'
);

$setting = $modx->getObject('modSystemSetting', array('key' => 'modretailcrm_custom_orders_class'));
$setting->set('value', json_encode($value));
$setting->save();
```

After that, your class is used. The component can still be updated; your file stays separate.

## Step 4

Override methods as needed. Example: extend **orderCombine** to add promo/coupon data (e.g. mspc2CouponOrder) to the order array before it is sent to RetailCRM. Call parent methods where appropriate and add your logic.
