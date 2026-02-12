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

- **order** — order data from session: **delivery**, **payment**, **cost**, **cart_cost**, **delivery_cost**, **discount_cost**
- **deliveries** — available delivery methods
- **payments** — payment methods
- **form** — customer data: **email**, **receiver**, **phone**, **index**, **country**, **region**, **city**, **street**, **building**, **room**, **entrance**, **floor**, **comment**, **text_address**, and any **&userFields** mappings
- **errors** — form fields with validation errors

### Placeholders

To see all placeholders, use an empty chunk:

```modx
<pre>[[!msOrder?tpl=``]]</pre>
```

::: details Example

```php
Array
(
    [order] => Array ( [cost] => 2 300, [cart_cost] => 2 300, [delivery_cost] => 0, [discount_cost] => 0 )
    [form] => Array ( [receiver] => Ivan Ivanov, [email] => ivanov@example.com )
    [deliveries] => Array ( [1] => Array ( [id] => 1, [name] => Pickup, ... ) )
    [payments] => Array ( [1] => Array ( [id] => 1, [name] => Cash, ... ) )
    [errors] => Array ( )
)
```

:::

## Checkout

Use together with other snippets on the checkout page:

```modx
[[!msCart]] <!-- Cart; hidden after order is created -->

[[!msOrder]] <!-- Checkout form; hidden after order is created -->

[[!msGetOrder]] <!-- Order info; shown after order is created -->
```

## Examples

Get receiver name from `username` instead of `fullname` for logged-in users:

```modx
[[!msOrder?
  &userFields=`{"receiver":"username"}`
]]
```

[1]: /en/components/pdotools/parser
