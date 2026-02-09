# msb2OnBeforeSetBonus

Fires before bonuses are applied to the cart or order.

## Parameters

- `numeric $points` — user's total bonus balance
- `numeric $amount` — amount entered by the user to write off
- `null|msOrder $order` — `msOrder` object or `null` if applying to the cart
