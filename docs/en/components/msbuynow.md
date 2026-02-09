---
title: msBuyNow
dependencies: miniShop2
---

# msBuyNow

The component implements "Buying now!" — a list of [miniShop2][1] products that were added to cart in the last N time.

![msBuyNow](https://file.modx.pro/files/c/4/e/c4ec4b41e5bae08e2e5418faa74f59f2.png)

## Package contents

- Snippet to output recently purchased products
- Snippet to output product info

## Available data

- Last purchase time for the product
- Amount of the last order
- Number of purchases of this product in the period
- Quantity bought by the last customer
- Last customer name (if logged in)
- Last customer email (if logged in)
- Last customer avatar from Gravatar (if logged in)
- Last customer location (with CitySelect package)

## Example: recent purchases

```modx
In the last [[+msb_total_time]] hour(s) [[+msb_total_customers]] customer(s) bought.

[[!msBuyNow:default=`No purchases in the last [[+msb_total_time]] hour(s)`?
  &lim=`10`
  &snippet=`msProducts`
  &parents=`0`
  &showLog=`0`
  &limit=`10`
]]
```

## Example: product chunk

```modx
[[!msBuy? &id=`[[*id]]`]]
```

[1]: /en/components/minishop2/
