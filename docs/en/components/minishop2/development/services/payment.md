# Payment

There are many payment systems, each with its own rules. The `msPaymentInterface` payment interface requires 5 methods:

- **send($order)** — Creates a payment operation and sends the buyer to pay. Receives an `msOrder` object.
- **receive($order)** — Receives and processes payment from the payment system. Receives an `msOrder` object.
- **getCost(msOrderInterface $order, msPayment $payment, $cost = 0.0)** — Calculates additional payment cost (commission). Supports absolute and percentage values.
- **success($message, $data, $placeholders)** — Formats a success response.
- **error($message, $data, $placeholders)** — Formats an error response.

The standard `msPaymentHandler` class also has a public method **getOrderHash($order)** — generates an MD5 hash of the order for verification (based on id, num, cart_cost, delivery_cost and createdon).

## Creating the operation and sending for payment

The order class creates the payment operation in the database.
If the order has a payment method attached, the order calls the required `send` method from it.

```php
if ($payment = $this->modx->getObject('msPayment', array('id' => $order->get('payment'), 'active' => 1))) {
  $response = $payment->send($order);
  if (is_array($response)) {
    $response = json_encode($response, true);
  }

  exit($response);
}
```

From that moment control passes to **msPayment**, which loads the handler class — either the default or your extended one if you [connected it][2] and set it in the payment method's **class** parameter.
All further action goes to that class; for illustration we use [PayPal][10].

When the class is created it checks the system settings needed for work (logins, passwords, etc.); they affect requests to the service and payment handling.

All requests to paypal.com go through an extra [request method][11].
Almost any service has a PHP demo where you can find a similar method.

Then, again following the docs: we build a parameter array, fill it with data and [send to paypal.com][12].

That service checks your request and returns a secret token that verifies it.
You then redirect the user with this token to the remote server so they can complete the payment.

## Redirect

Redirect is handled by the default javascript, which checks the server response when creating the order and either reloads the current page with the order id or sends the buyer where instructed.

So to send the buyer we need to return from the `send` method an array with key `redirect` and the target URL as the value.
Personally I prefer not to show the user that an error occurred during order creation, so the default PayPal class always returns a positive response.

But on error it [logs it][13] and asks to reload the page; on success it [redirects to the service][14].
The default order class accepts an array and [passes it to javascript][15].
If the payment method returns an error — the page reloads with the order id.

Why? Because the buyer should not care about your errors; they place an order and see that they bought.
You then fix the site, contact them and suggest a convenient way to pay.

If you disagree with this logic — again, this is all "default" behaviour and you can change any step by modifying both the order and payment classes, and even the javascript.

## Receiving payment

Usually for the remote service to notify you that payment went through, it calls one of your site's pages and sends data.

You configure where it calls and how it sends.
So in PayPal settings I [set the URL][16] `sitename.com/assets/components/minishop2/payment/paypal.php`, which runs MODX in API mode.
In effect — that is the payment reception controller.

To load extended classes the `loadCustomClasses()` method is used; it takes the class type.
Then the class runs and a request is made to *paypal.com* to get payment operation info by the received token.

The token is all PayPal sends when redirecting the buyer back to the site, so one more request is needed.
Other payment systems may differ, but in any case your job is to determine the order number and check whether the user paid.

Then I [check that the order amount matches][17] mine and PayPal's. If they match, we can run [the receive method from the PayPal class][18].

That method checks the parameters and changes the order status via `miniShop2::changeOrderStatus()`, which then handles everything, including payment emails.

Then redirect to the success or failure page.
You can set those in settings; if not set, the site home page is used.

Payment received, order processed.

## Summary

We went through the payment chain, where you can change any part for any payment system or service.

Note that you can buy many ready-made payment methods on [modstore.pro][2].

[2]: https://modstore.pro/packages/integration/?resource|parent=1260
[10]: https://github.com/bezumkin/miniShop2/blob/c384bddbedfc6b0cc0c7046a8ba2393979300cff/core/components/minishop2/custom/payment/paypal.class.php
[11]: https://github.com/bezumkin/miniShop2/blob/c384bddbedfc6b0cc0c7046a8ba2393979300cff/core/components/minishop2/custom/payment/paypal.class.php#L103
[12]: https://github.com/bezumkin/miniShop2/blob/c384bddbedfc6b0cc0c7046a8ba2393979300cff/core/components/minishop2/custom/payment/paypal.class.php#L29
[13]: https://github.com/bezumkin/miniShop2/blob/c384bddbedfc6b0cc0c7046a8ba2393979300cff/core/components/minishop2/custom/payment/paypal.class.php#L62
[14]: https://github.com/bezumkin/miniShop2/blob/c384bddbedfc6b0cc0c7046a8ba2393979300cff/core/components/minishop2/custom/payment/paypal.class.php#L59
[15]: https://github.com/bezumkin/miniShop2/blob/c384bddbedfc6b0cc0c7046a8ba2393979300cff/model/minishop2/msorderhandler.class.php#L285
[16]: https://github.com/bezumkin/miniShop2/blob/c384bddbedfc6b0cc0c7046a8ba2393979300cff/core/components/minishop2/custom/payment/paypal.class.php#L36
[17]: https://github.com/bezumkin/miniShop2/blob/c384bddbedfc6b0cc0c7046a8ba2393979300cff/assets/components/minishop2/payment/paypal.php#L31
[18]: https://github.com/bezumkin/miniShop2/blob/c384bddbedfc6b0cc0c7046a8ba2393979300cff/core/components/minishop2/custom/payment/paypal.class.php#L69
