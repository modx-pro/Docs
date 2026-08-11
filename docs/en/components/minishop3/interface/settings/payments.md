---
title: Payment methods
---
# Payment methods

Managed via **Extras → MiniShop3 → Settings → Payments**.

## For the store owner

1. Create a payment method: name, description, logo, active flag.
2. Link it to the needed [deliveries](/en/components/minishop3/interface/settings/deliveries). Without a link the customer cannot pick the pair on the storefront.
3. For pay-on-delivery leave the `class` field empty. The order simply stores the selected `payment_id`.
4. For online payment install a payment extra from the catalog (for example [msp3YooKassa](/en/components/msp3yookassa/), [mspTBank](/en/components/msptbank/), [msp3Sberbank](/en/components/msp3sberbank/)) and set the handler class in `class` as in that package's docs.
5. Check the post-payment redirect: `ms3_order_success_page_id` and the Thanks page with `msGetOrder`.

Surcharge in the `price` field:

- `100`: fixed amount added to the order
- `3%`: percent of the total

## Payment fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Payment method name |
| `description` | text | Description for the customer |
| `price` | string | Surcharge (amount or percent) |
| `logo` | string | Image path |
| `position` | int | Sort order |
| `active` | bool | Active |
| `class` | string | PHP payment handler class |
| `properties` | JSON | Handler settings |

## Delivery linkage

Edit links on the delivery card. Typical sets:

- Pickup: cash, card on delivery
- Courier: cash, card, online
- Post: cash on delivery, online

## Payment handlers

### Built-in handlers

| Class | Description |
| --- | --- |
| (empty) | No online payment, only records the method |

### Creating a handler

A payment extra implements `PaymentProviderInterface` and registers the class on the payment method. The sketch below is for your own package. Prefer documented extras for production; do not ship this skeleton as-is.

```php
<?php
namespace MyComponent\Payment;

use MiniShop3\Controllers\Payment\PaymentProviderInterface;
use MiniShop3\Model\msPayment;
use MiniShop3\Model\msOrder;

class YooKassaPayment implements PaymentProviderInterface
{
    protected $modx;
    protected $payment;

    public function __construct($modx, msPayment $payment)
    {
        $this->modx = $modx;
        $this->payment = $payment;
    }

    /**
     * Redirect to payment
     * Called on order submit with online payment
     */
    public function send(msOrder $order): array
    {
        $properties = $this->payment->get('properties');
        $shopId = $properties['shop_id'] ?? '';
        $secretKey = $properties['secret_key'] ?? '';

        // Create payment in YooKassa
        $client = new \YooKassa\Client();
        $client->setAuth($shopId, $secretKey);

        $payment = $client->createPayment([
            'amount' => [
                'value' => $order->get('cost'),
                'currency' => 'RUB',
            ],
            'confirmation' => [
                'type' => 'redirect',
                'return_url' => $this->modx->makeUrl(
                    $this->modx->getOption('ms3_payment_return_id')
                ),
            ],
            'description' => 'Order #' . $order->get('id'),
            'metadata' => [
                'order_id' => $order->get('id'),
            ],
        ], uniqid('', true));

        // Save payment ID on the order
        $order->set('payment_link', $payment->getConfirmation()->getConfirmationUrl());
        $order->save();

        return [
            'success' => true,
            'redirect' => $payment->getConfirmation()->getConfirmationUrl(),
        ];
    }

    /**
     * Payment notification (webhook)
     */
    public function receive(msOrder $order): array
    {
        // Handle webhook from payment system
        $source = file_get_contents('php://input');
        $data = json_decode($source, true);

        if ($data['event'] === 'payment.succeeded') {
            return [
                'success' => true,
                'message' => 'Payment received',
            ];
        }

        return [
            'success' => false,
            'message' => 'Payment not confirmed',
        ];
    }

    /**
     * Payment cost calculation (fee)
     */
    public function getCost(msOrder $order, float $cost): float
    {
        $price = $this->payment->get('price');

        if (str_ends_with($price, '%')) {
            $percent = (float)rtrim($price, '%');
            return $cost * ($percent / 100);
        }

        return (float)$price;
    }
}
```

### Registering a handler

Set the class in the payment method `class` field:

```
MyComponent\Payment\YooKassaPayment
```

### Additional settings

The `properties` field stores JSON with payment system settings:

```json
{
  "shop_id": "123456",
  "secret_key": "live_xxx...",
  "test_mode": false,
  "success_status": 2,
  "fail_status": 5
}
```

These settings are available in the handler via `$this->payment->get('properties')`.

## Webhook for payment systems

To receive payment notifications use:

```
https://yoursite.com/assets/components/minishop3/payment/handler.php?payment_id=1&order_id=123
```

Or configure a route in Web API for modern integrations.

## API

### Get available payment methods

```
GET /api/v1/order/payments?delivery_id=1
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Cash on delivery",
      "description": "Pay the courier",
      "price": "0",
      "logo": ""
    },
    {
      "id": 2,
      "name": "Online card",
      "description": "Visa, MasterCard, MIR",
      "price": "0",
      "logo": "/assets/images/cards.png"
    }
  ]
}
```

### Payment cost

```
GET /api/v1/order/cost/payment?payment_id=2
```

**Response:**

```json
{
  "success": true,
  "data": {
    "cost": 150.00
  }
}
```

## Payment link (`payment_link`)

Thank-you page and emails get the payment URL from `PaymentLinkResolver` (`ms3_payment_link_resolver`):

- in **msGetOrder** — snippet parameter `payStatus` (CSV of status IDs);
- in **notifications** — setting `ms3_payment_link_statuses`, empty falls back to `ms3_status_new`;
- link is **hidden** for final statuses and the paid status.

The payment handler must return a URL from its payment method (see the `send()` example above). Details: [msGetOrder](/en/components/minishop3/snippets/msgetorder#payment-link).
