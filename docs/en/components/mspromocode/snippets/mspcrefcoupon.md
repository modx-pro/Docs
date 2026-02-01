# mspcRefCoupon

Snippet that outputs referral promo code data and its orders.

## Parameters

| Name               | Default                                                                                                                                                                                          | Description                           |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------|
| **user_id**        |                                                                                                                                                                                                  | User ID. Default: current user.       |
| **outputSeparator**| `\n`                                                                                                                                                                                             | Order list separator.                 |
| **toPlaceholder**  | `0`                                                                                                                                                                                              | Write result to placeholder.          |
| **tpl**            | `@INLINE <p><b>Referral promo code</b>: {$coupon}</p><p><b>Usage count</b>: {$orders_count}</p><ul>{$orders}</ul>`                                                                               | Output chunk.                         |
| **tplOrder**       | `@INLINE <li><p><b>User</b>: {$fullname ?: $username}</p><p><b>Order total</b>: {$order_cost}</p><p><b>Discount amount</b>: {$discount_amount}</p><p><b>Order date</b>: {$createdon}</p></li>` | Order list chunk.                     |

## Examples

### Paginated order list

```modx
[[!pdoPage?
  &element=`mspcRefCoupon`
  &limit=`2`
]]

[[!+page.nav]]
```

### Without order list

To hide the order list, remove it from the `tpl` template:

```modx
[[!mspcRefCoupon
  &tpl=`@INLINE <p><b>Referral promo code</b>: {$coupon}</p><p><b>Usage count</b>: {$orders_count}</p>`
]]
```
