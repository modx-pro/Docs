# mspc2OnSetCoupon

Срабатывает после применения промо-кода к корзине или заказу.

## Параметры

- `array $coupon` — массив с промо-кодом
- `null|msOrder $order` — объект заказа `msOrder` или `null`, если промо-код применён к корзине
- `float $discount_amount` - сумма скидки
