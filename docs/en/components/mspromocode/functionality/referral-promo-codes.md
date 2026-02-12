# Referral promo codes

You can give users discount coupons to attract friends and acquaintances.

What happens after a referral coupon is bound to an order is up to you. Use the `mspcOnBindCouponToOrder` plugin event. [There is an example plugin][1] that shows how to add your logic after an order is created with a referral coupon.

## Setup

1. Create a promotion with the `Referral` checkbox.

2. Go to the `Coupons` tab and click `Generate`. This generates one promo code per user that they can use to attract referrals.

3. On the profile page or where you want to show the referrer's coupon data, call the `mspcRefCoupon` snippet. You can use pagination to show orders for this promo code:

```modx
[[!pdoPage?
  &element=`mspcRefCoupon`
  &limit=`2`
]]

[[!+page.nav]]
```

You can hide the order list by excluding it from the `tpl` template:

```modx
[[!mspcRefCoupon
  &tpl=`@INLINE <p><b>Referral promo code</b>: {$coupon}</p><p><b>Usage count</b>: {$orders_count}</p>`
]]
```

When the user opens the profile page they will see something like:

[![](https://modx.pro/assets/images/tickets/8679/29bb0e01740286c0e37904d37ff37c0f080a3144.png)](https://modx.pro/assets/images/tickets/8679/29bb0e01740286c0e37904d37ff37c0f080a3144.png)

Appearance is configured via the `tpl` and `tplOrder` parameters.

## tpl placeholders

- `coupon` — coupon code
- `coupon_id` — coupon id
- `orders_count` — order count for this coupon
- `orders` — order list built from `tplOrder`

## tplOrder placeholders

- `order_id` — order id
- `discount_amount` — discount amount
- `user_id` — id of user who placed the order
- `createdon` — order creation date
- `order_num` — order number
- `order_cost` — total order cost including delivery
- `order_cart_cost` — order cost without delivery
- `username` — customer username
- `fullname` — customer full name
- `email` — customer email
- `phone` — customer phone
- `status_name` — current order status name
- `status_description` — current order status description

[1]: /en/components/mspromocode/events/mspconbindcoupontoorder
