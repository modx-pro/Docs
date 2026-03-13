# msOrder

Checkout form snippet.

[![](https://file.modx.pro/files/4/b/b/4bb767c02e0e7b09ddae5e426b34c7e6s.jpg)](https://file.modx.pro/files/4/b/b/4bb767c02e0e7b09ddae5e426b34c7e6.png)

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **tpl** | `tpl.msOrder` | Output chunk |
| **userFields** | | Associative array mapping order fields to user profile fields: "order_field" => "profile_field". |
| **showLog** | `false` | Show debug info. Only for users authorized in context "mgr". |

<!--@include: ../parts/tip-general-properties.md-->

## Output

The snippet expects a [Fenom chunk][1]. It passes 5 variables:

- **order** — order data from session:
  - **delivery** — selected delivery ID
  - **payment** — selected payment ID
  - **cost** — total order cost
  - **cart_cost** — cart total
  - **delivery_cost** — delivery cost
  - **discount_cost** — discount amount
- **deliveries** — array of available delivery methods (each with id, name, description, price, weight_price, distance_price, requires, payments, etc.)
- **payments** — array of payment methods (each with id, name, description, price, etc.)
- **form** — filled customer data. May include:
  - **email** — customer email
  - **receiver** — receiver name
  - **phone** — phone
  - **index** — postal code
  - **country** — country
  - **region** — region
  - **city** — city
  - **street** — street
  - **building** — building
  - **entrance** — entrance
  - **floor** — floor
  - **room** — room
  - **comment** — order comment
  - **text_address** — address as text
  - other fields set via **&userFields**
- **errors** — array of form fields with validation errors

### Placeholders

To see all placeholders, use an empty chunk:

```modx
<pre>[[!msOrder?tpl=``]]</pre>
```

::: details Example

```php
Array
(
    [order] => Array
        (
            [cost] => 2300
            [cart_cost] => 2300
            [delivery_cost] => 0
            [discount_cost] => 0
        )

    [form] => Array
        (
            [receiver] => Ivan Ivanov
            [email] => ivanov@example.com
        )

    [deliveries] => Array
        (
            [1] => Array
                (
                    [id] => 1
                    [name] => Pickup
                    [description] =>
                    [price] => 0
                    [weight_price] => 0.00
                    [distance_price] => 0.00
                    [logo] =>
                    [rank] => 0
                    [active] => 1
                    [requires] => email,receiver
                    [free_delivery_amount] => 0.00
                    [payments] => Array ( [0] => 1 )
                )
        )

    [payments] => Array
        (
            [1] => Array
                (
                    [id] => 1
                    [name] => Cash
                    [description] =>
                    [price] => 0
                    [logo] =>
                    [rank] => 0
                    [active] => 1
                )
        )

    [errors] => Array ( )
)
```

:::

## Checkout

Use this snippet together with others on the checkout page:

```modx
[[!msCart]] <!-- Cart; hidden after order is created -->

[[!msOrder]] <!-- Checkout form; hidden after order is created -->

[[!msGetOrder]] <!-- Order info; shown after order is created -->
```

## Examples

Use `username` instead of `fullname` for the receiver field when the user is logged in:

```modx
[[!msOrder?
  &userFields=`{"receiver":"username"}`
]]
```

[1]: /en/components/pdotools/parser
