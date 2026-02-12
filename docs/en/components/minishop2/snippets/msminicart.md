# msMiniCart

Simple snippet for outputting the current cart status.

![](https://file.modx.pro/files/f/a/3/fa36fb44f79cf689e7f8f9e7a577931f.png)

## Parameters

| Parameter | Default     | Description   |
| --------- | ----------- | ------------- |
| **tpl**   | `tpl.msMiniCart` | Output chunk |

## Output

The snippet works with a [Fenom chunk][1] and passes cart status from the user session. Typically:

- **total_count** — total number of items in the cart
- **total_cost** — total cart cost
- **total_weight** — total cart weight
- **total_discount** — total cart discount
- **total_positions** — number of positions in the cart

These may differ if you use an extended cart class.

The default chunk has two blocks with classes `empty` and `not_empty` for the two cart states.

[1]: /en/components/pdotools/parser
