# mspc2OnBeforeSetCoupon

Срабатывает перед применением промо-кода к корзине или заказу.

## Параметры

- `array $coupon` — массив с промо-кодом
- `null|msOrder $order` — объект заказа `msOrder` или `null`, если промо-код применяется к корзине
