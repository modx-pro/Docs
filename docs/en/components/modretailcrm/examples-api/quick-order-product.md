# Quick order (one-click buy)

Almost every online store has a one-click order button. For the customer the flow is the same: most fields are pre-filled; they only enter contact details.

Two common implementations:

1. **Simple request form** — sends an email to the manager; the rest is manual. No online store required.
2. **Form that uses miniShop2 API** — creates a real order with preset data.

## Create order via miniShop2 API

Below is an example of creating an order in miniShop2 via API. The modRetailCRM plugin will pick it up and send the order to RetailCRM.

Simple form on the page:

```fenom
{'!ajaxForm' | snippet : [
  'form' => '@INLINE
    <form>
      <div class="form-group">
        <label>Name</label>
        <input class="form-control" type="text" name="name" value="John" placeholder="Name">
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input class="form-control" type="text" name="phone" value="98779788987" placeholder="Phone">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input class="form-control" type="text" name="email" value="info@site.com" placeholder="Email">
      </div>
      <input type="hidden" name="productId" value="137">

      <button type="submit" class="btn btn-primary">Buy</button>
    </form>
  ',
  'hooks' => 'msQuickOrder',
]}
```

Just contact fields and the product id (from the page or manual). The form is submitted via ajaxForm, which runs FormIt — a standard combo.

Create snippet **msQuickOrder** and add it as a hook; it will create the order. Example:

```php
<?php
// Get form data
$phone = $hook->getValue('phone');
$email = $hook->getValue('email');
$name = $hook->getValue('name');
$productId = $hook->getValue('productId');

// Prepare miniShop2
$params = array(
  'json_response' => true,
  'max_count' => 1
);

$miniShop2 = $modx->getService('miniShop2');
$miniShop2->initialize($modx->context->key, $params);
$miniShop2->cart->clean();
$miniShop2->cart->add($productId);
$miniShop2->order->add('receiver', $name);
$miniShop2->order->add('phone', $phone);
$miniShop2->order->add('email', $email);
$miniShop2->order->add('payment', 1);
$miniShop2->order->add('delivery', 1);
$miniShop2->order->submit();
// Here the modRetailCRM plugin sends the order to RetailCRM
```

### Create order manually via hook (no miniShop2)

Same form and data, but the order is not added to miniShop — it is sent straight to RetailCRM. Use when miniShop2 is not used.

Create snippet **quickOrderToRetailCRM** and set it as the form hook:

```php
<?php
$phone = $hook->getValue('phone');
$email = $hook->getValue('email');
$name = $hook->getValue('name');
$productId = $hook->getValue('productId');
// Validate and sanitize input

if (!$modRetailCrm = $modx->getService(
  'modretailcrm',
  'modRetailCrm',
  MODX_CORE_PATH . 'components/modretailcrm/model/modretailcrm/',
  array($modx)
)) {
  $modx->log(modX::LOG_LEVEL_ERROR, '[modRetailCrm] - Not found class modRetailCrm');
  return;
}

$pdo = $modx->getService('pdoFetch');

$orderData = array();
$orderData['externalId'] = md5(time() . $productId . $email . $phone);

$orderData['customer']['externalId'] = md5($phone . $email);
$user_response = $modRetailCrm->request->customersGet($orderData['customer']['externalId'], 'externalId');

if (!$user_response->isSuccessful()) {
  $customer = array();
  $customer['externalId'] = $orderData['customer']['externalId'];
  $customer['firstName'] = $name;
  $customer['email'] = $email;
  $customer['phones'][0]['number'] = $phone;
  $response = $modRetailCrm->request->customersCreate($customer);
  if (!$response->isSuccessful()) {
    $modx->log(MODX_LOG_LEVEL_ERROR, '[ModRetailCrm] - Create customer in RetailCRM ' . print_r($response, 1));
  }
}

$orderData['firstName'] = $name;
$orderData['phone'] = $phone;
$orderData['email'] = $email;

$page = $modx->getObject('modResource', array('id' => $productId));
$orderData['items'][0]['initialPrice'] = 1000;
$orderData['items'][0]['productName'] = $page->pagetitle;
$orderData['items'][0]['quantity'] = 1;

$response = $modRetailCrm->request->ordersCreate($orderData);
if (!$response->isSuccessful()) {
  $modx->log(MODX_LOG_LEVEL_ERROR, '[ModRetailCrm] - Order send result ' . print_r($response, 1));
}
```
