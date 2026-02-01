# Delivery

The delivery class must implement the `msDeliveryInterface` interface with 3 methods:

- **getCost** — Calculates and returns the order total.
- **success** — Success response.
- **error** — Error response.

The last 2 methods are not used in the default flow.

The default delivery class `msDeliveryHandler` only adds the extra cost set in settings (fixed or percentage). Distance-based cost is ignored and is only for extending classes.

To use your own delivery class, see the [relevant section][1].

[1]: /en/components/minishop2/development/services/connection
