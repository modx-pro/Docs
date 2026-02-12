# Delivery

The delivery class must implement the `msDeliveryInterface` interface with 3 methods:

- **getCost(msOrderInterface $order, msDelivery $delivery, $cost = 0.0)** — Calculates and returns the delivery cost. Receives the order object, delivery object and current cost.
- **success** — Success response.
- **error** — Error response.

The last 2 methods are not used in the default flow.

The default delivery class `msDeliveryHandler` works as follows:

1. Adds weight-based cost: `weight_price × total_weight` of the cart
2. Checks **free_delivery_amount** — if the cart total reaches this value, the extra delivery cost (`price`) is zeroed
3. If free delivery threshold is not reached, adds the extra cost `price` (absolute or percentage of cart total)

Distance-based cost (`distance_price`) is ignored and is only for extending classes.

To use your own delivery class, see the [relevant section][1].

[1]: /en/components/minishop2/development/services/connection
