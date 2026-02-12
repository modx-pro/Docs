# msCart

Snippet for outputting the customer cart.

[![](https://file.modx.pro/files/4/d/8/4d8ddea00da1c2ff10c94720ee26a588s.jpg)](https://file.modx.pro/files/4/d/8/4d8ddea00da1c2ff10c94720ee26a588.png)

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **tpl** | `tpl.msCart` | Output chunk |
| **includeTVs** | | Comma-separated TV list. E.g. "action,time" gives placeholders `[[+action]]` and `[[+time]]`. |
| **includeThumbs** | | Comma-separated thumbnail sizes. E.g. "120x90,360x240" gives `[[+120x90]]` and `[[+360x240]]`. Images must exist in the product gallery. |
| **toPlaceholder** | | If set, snippet saves all data to a placeholder with this name instead of outputting. |
| **showLog** | `false` | Show debug info. Only for users authorized in context "mgr". |

<!--@include: ../parts/tip-general-properties.md-->

## Output

The snippet expects a Fenom chunk. It passes 2 variables:

- **total** — cart totals: **count**, **cost**, **weight**, **discount**
- **products** — array of cart items, each with: **key**, **count**, **price**, **old_price**, **cost** (total line cost: count × price), **weight**, **discount_price**, **discount_cost**, **id**, **pagetitle**, **uri**, **option.{name}** and other product fields including vendor data.

### Placeholders

To see all placeholders, use an empty chunk:

```modx
<pre>[[!msCart?tpl=``]]</pre>
```

::: details Example

```php
Array
(
    [total] => Array
        (
            [count] => 4
            [weight] => 0
            [cost] => 2 100
            [discount] => 0
        )

    [products] => Array
        (
            [0] => Array
                (
                    [id] => 4
                    [pagetitle] => Product 1
                    ...
                    [key] => ms71f884312767d1249c9093a3aad9b168
                    [count] => 3
                    [cost] => 1 500
                    ...
                )
            ...
        )
)
```

:::

For debugging you can use the [print modifier][2]. Create chunk `TestCart`:

```fenom
{$total | print}
{foreach $products as $product}
  {$product | print}
{/foreach}
```

Then call it:

```modx
[[!msCart?
  &tpl=`TestCart`
]]
```

## Checkout

Use this snippet together with others on the checkout page:

```modx
[[!msCart]] <!-- Cart view and edit; hidden after order is created -->

[[!msOrder]] <!-- Checkout form; hidden after order is created -->

[[!msGetOrder]] <!-- Order info; shown after order is created -->
```

[2]: /en/components/pdotools/parser
