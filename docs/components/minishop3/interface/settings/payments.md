---
title: Способы оплаты
---
# Способы оплаты

Управление: **Extras → MiniShop3 → Настройки → Оплаты**.

## Для владельца магазина

1. Создайте способ оплаты: название, описание, логотип, активность.
2. Привяжите его к нужным [доставкам](/components/minishop3/interface/settings/deliveries). Без связки покупатель не сможет выбрать пару на витрине.
3. Для оплаты «при получении» оставьте поле `class` пустым. Заказ просто получит выбранный `payment_id`.
4. Для онлайн-оплаты установите платёжный extra из каталога (например [msp3YooKassa](/components/msp3yookassa/), [mspTBank](/components/msptbank/), [msp3Sberbank](/components/msp3sberbank/)) и укажите класс обработчика в поле `class`, как в инструкции пакета.
5. Проверьте редирект после оплаты: `ms3_order_success_page_id` и страницу «Спасибо» с `msGetOrder`.

Наценка в поле `price`:

- `100`: фиксированная сумма к заказу
- `3%`: процент от суммы

## Поля оплаты

| Поле | Тип | Описание |
| --- | --- | --- |
| `name` | string | Название способа оплаты |
| `description` | text | Описание для покупателя |
| `price` | string | Наценка (число или процент) |
| `logo` | string | Путь к изображению |
| `position` | int | Порядок сортировки |
| `active` | bool | Активность |
| `class` | string | PHP-класс обработчика платежа |
| `properties` | JSON | Настройки обработчика |

## Связь с доставкой

Связки правят в карточке доставки. Типичные наборы:

- Самовывоз: наличные, карта при получении
- Курьер: наличные, карта, онлайн
- Почта: наложенный платёж, онлайн

## Обработчики платежей

### Встроенные обработчики

| Класс | Описание |
| --- | --- |
| (пусто) | Без онлайн-оплаты, только фиксация способа |

### Создание обработчика

Платёжный extra реализует `PaymentProviderInterface` и регистрирует класс в способе оплаты. Ниже набросок для своего пакета. Готовые шлюзы берите из документации extras. Скелет ниже не копируйте в бой без доработки.

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

## Уведомления об оплате (webhook / callback)

В ядре MiniShop3 **нет** готового `payment/handler.php`. URL уведомлений задаёт платёжный extra (например `webhook.php` / `callback.php` в `assets/components/{ns}/`). Смотрите документацию конкретного шлюза ([msp3YooKassa](/components/msp3yookassa/), [mspTBank](/components/msptbank/) и т.д.).

Класс оплаты реализует `send()` / приём уведомления и меняет статус заказа. Ссылка на оплату в письмах и `msGetOrder` строится через `PaymentLinkResolver`.

## API

### Доставки и оплаты в черновике заказа

Отдельного `GET /api/v1/order/payments` **нет**. Список доставок/оплат на витрине рендерит `msOrder`. Черновик:

```
GET /api/v1/order/get
```

В `data.order` — поля заказа, в том числе `delivery_id` / `payment_id` и `address_*`. Смена способа: `POST /api/v1/order/add` или `POST /api/v1/order/set` с ключами `payment_id` / `delivery_id`.

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

Полный расчёт (корзина + доставка + оплата): `GET /api/v1/order/cost`. Карта Web API: [REST API](/components/minishop3/development/api).

## Ссылка на оплату (`payment_link`)

На странице «спасибо» и в письмах URL оплаты формирует `PaymentLinkResolver` (`ms3_payment_link_resolver`):

- в **msGetOrder** — параметр `payStatus` (CSV статусов);
- в **уведомлениях** — настройка `ms3_payment_link_statuses`, если пуста — fallback на `ms3_status_new`;
- ссылка **не** показывается для финальных статусов и статуса «оплачен».

Обработчик способа оплаты должен вернуть URL из метода оплаты (см. пример `send()` выше). Подробнее: [msGetOrder](/components/minishop3/snippets/msgetorder#ссылка-на-оплату).
