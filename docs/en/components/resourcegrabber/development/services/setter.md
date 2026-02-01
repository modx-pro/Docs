# Setter

Data writing is handled by the **rgResourceSetter** class, which implements the **rgSetterInterface** interface. The class is loaded according to the resource's `class_key` field.

Implemented:

- `rgResourceSetter` — base class.
- `rgMsProductSetter` — for **minishop** products.

If no class is implemented for your `class_key`, the base class is loaded.

Required methods of the `rgSetterInterface` interface:

- `init` — Initializes the class.
- `get` — Returns the resource.
- `create` — Creates the resource.
- `update` — Updates the resource.
