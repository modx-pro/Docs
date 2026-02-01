# msb2OnUnsetBonus

Fires after bonuses are removed from the cart or order.

## Parameters

- `numeric $writeoff` — amount of bonuses that was returned
- `null|msOrder $order` — `msOrder` object or `null` if it was the cart
