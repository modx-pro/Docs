---
title: Payment methods
---
# Payment methods

Payment methods are managed via **Extras → MiniShop3 → Settings → Payments**.

## Payment fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Payment method name |
| `description` | text | Description for the customer |
| `price` | string | Surcharge for the payment method (amount or percent) |
| `logo` | string | Image path |
| `position` | int | Sort order |
| `active` | bool | Active |
| `class` | string | PHP payment handler class |
| `properties` | JSON | Additional settings |

## Payment surcharge

The `price` field adds a surcharge for using the payment method:

- **Fixed amount:** `100` — adds 100 to the total
- **Percent:** `3%` — adds 3% of the order total

Useful to offset payment system fees.

## Delivery linkage

Payment methods are linked to delivery methods. Configure this in the delivery card by selecting available payment methods.

Typical scenarios:

- **Pickup** — cash, card on delivery
- **Courier** — cash, card, online
- **Post** — cash on delivery, online payment

## Payment handlers

### Built-in handlers

| Class | Description |
|-------|-------------|
| — | Base handler (no online payment) |

### Creating a handler

To integrate a payment system, create a handler class:

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
