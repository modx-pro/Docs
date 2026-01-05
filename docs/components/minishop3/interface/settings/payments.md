---
title: Способы оплаты
---
# Способы оплаты

Управление способами оплаты доступно через **Extras → MiniShop3 → Настройки → Оплаты**.

## Поля оплаты

| Поле | Тип | Описание |
|------|-----|----------|
| `name` | string | Название способа оплаты |
| `description` | text | Описание для покупателя |
| `price` | string | Наценка за способ оплаты (число или процент) |
| `logo` | string | Путь к изображению |
| `position` | int | Порядок сортировки |
| `active` | bool | Активность |
| `class` | string | PHP-класс обработчика платежа |
| `properties` | JSON | Дополнительные настройки |

## Наценка за оплату

Поле `price` позволяет добавить наценку за использование способа оплаты:

- **Фиксированная сумма:** `100` — добавит 100 руб. к стоимости
- **Процент:** `3%` — добавит 3% от суммы заказа

Это полезно для компенсации комиссий платёжных систем.

## Связь с доставкой

Способы оплаты привязываются к способам доставки. Настройка выполняется в карточке доставки — выбираются доступные способы оплаты.

Типичные сценарии:
- **Самовывоз** — оплата наличными, картой при получении
- **Курьер** — оплата наличными, картой, онлайн
- **Почта** — наложенный платёж, онлайн-оплата

## Обработчики платежей

### Встроенные обработчики

| Класс | Описание |
|-------|----------|
| — | Базовый обработчик (без онлайн-оплаты) |

### Создание обработчика

Для интеграции с платёжной системой создайте класс-обработчик:

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
     * Отправка на оплату
     * Вызывается при submit заказа с онлайн-оплатой
     */
    public function send(msOrder $order): array
    {
        $properties = $this->payment->get('properties');
        $shopId = $properties['shop_id'] ?? '';
        $secretKey = $properties['secret_key'] ?? '';

        // Создание платежа в ЮKassa
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
            'description' => 'Заказ #' . $order->get('id'),
            'metadata' => [
                'order_id' => $order->get('id'),
            ],
        ], uniqid('', true));

        // Сохраняем ID платежа в заказе
        $order->set('payment_link', $payment->getConfirmation()->getConfirmationUrl());
        $order->save();

        return [
            'success' => true,
            'redirect' => $payment->getConfirmation()->getConfirmationUrl(),
        ];
    }

    /**
     * Получение уведомления об оплате (webhook)
     */
    public function receive(msOrder $order): array
    {
        // Обработка webhook от платёжной системы
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
     * Расчёт стоимости оплаты (комиссия)
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

### Регистрация обработчика

Укажите класс в поле `class` карточки способа оплаты:

```
MyComponent\Payment\YooKassaPayment
```

### Дополнительные настройки

Поле `properties` хранит JSON с настройками платёжной системы:

```json
{
  "shop_id": "123456",
  "secret_key": "live_xxx...",
  "test_mode": false,
  "success_status": 2,
  "fail_status": 5
}
```

Эти настройки доступны в обработчике через `$this->payment->get('properties')`.

## Webhook для платёжных систем

Для приёма уведомлений об оплате используйте URL:

```
https://yoursite.com/assets/components/minishop3/payment/handler.php?payment_id=1&order_id=123
```

Или настройте роут в Web API для современных интеграций.

## API

### Получение доступных способов оплаты

```
GET /api/v1/order/payments?delivery_id=1
```

**Ответ:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Наличными при получении",
      "description": "Оплата курьеру",
      "price": "0",
      "logo": ""
    },
    {
      "id": 2,
      "name": "Онлайн картой",
      "description": "Visa, MasterCard, МИР",
      "price": "0",
      "logo": "/assets/images/cards.png"
    }
  ]
}
```

### Стоимость оплаты

```
GET /api/v1/order/cost/payment?payment_id=2
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "cost": 150.00
  }
}
```
