---
title: mscDistance
description: City/zone delivery cost calculation
logo: https://modstore.pro/assets/extras/mscdistance/logo-lg.jpg
author: vgrish
modstore: https://modstore.pro/packages/delivery/mscdistance

dependencies: miniShop2
---

# mscDistance

The component calculates delivery cost by city (or district) based on delivery distance.

## Component description

[![](https://file.modx.pro/files/e/b/d/ebd480eb609e7499251e00d6780eb9a9s.jpg)](https://file.modx.pro/files/e/b/d/ebd480eb609e7499251e00d6780eb9a9.png)

- Warehouse coordinates — format `57.987211,56.252048`
- Delivery city — city where delivery is available
- Delivery region — region where delivery is available
- Delivery street, building — address from which distance is calculated (warehouse address)

[![](https://file.modx.pro/files/8/8/1/881cd358535ea5f555a645fb2ae0d82ds.jpg)](https://file.modx.pro/files/8/8/1/881cd358535ea5f555a645fb2ae0d82d.png)

- Response language — language for API responses
- Unit system — distance in km/m (metric) or miles/feet (imperial)

[![](https://file.modx.pro/files/2/3/2/232e447c3dc9461a680f0f2708acb69ds.jpg)](https://file.modx.pro/files/2/3/2/232e447c3dc9461a680f0f2708acb69d.png)

- Default product volume — volume for miniShop2 products without size
- Volume correction factor — volume = volume × factor

[![](https://file.modx.pro/files/7/9/4/794b29fc1caacb5310c7897e2bcec655s.jpg)](https://file.modx.pro/files/7/9/4/794b29fc1caacb5310c7897e2bcec655.png)

- Product size separator — separator in miniShop2 `size` field
- Product size units — `mm` or `cm`

[![](https://file.modx.pro/files/4/f/7/4f773bb503926406a86d2ab205dd2460s.jpg)](https://file.modx.pro/files/4/f/7/4f773bb503926406a86d2ab205dd2460.png)

- Maximum delivery distance (meters or feet)
- Maximum allowed volume
- Maximum allowed weight

[![](https://file.modx.pro/files/8/8/1/881cc8755d2da537948e642009c229b1s.jpg)](https://file.modx.pro/files/8/8/1/881cc8755d2da537948e642009c229b1.png)

- Minimum delivery fee (used when calculated cost is lower)
- Tariff table — JSON, e.g. `{"5":10,"10":15,"15":20}`

## Main settings

### miniShop2 :: Settings :: Delivery methods

- Enable the delivery method
- Assign payment methods

[![](https://file.modx.pro/files/4/7/c/47c6182a863b3fe0ee50c980dc082de8s.jpg)](https://file.modx.pro/files/4/7/c/47c6182a863b3fe0ee50c980dc082de8.png)

### System settings :: miniShop2

- Order handler class — `mscdOrderHandler`
- Cart handler class — `mscdCartHandler`

## msOrderDistance snippet

Same as [msOrder][2]. Parameters:

- tplOuter — Wrapper chunk
- tplPayment — Payment method chunk
- tplDelivery — Delivery method chunk
- tplEmpty — Chunk when no results
- tplSuccess — Success message chunk
- front_js — Frontend script
- front_css — Frontend styles
- region_on — Auto-fill delivery region yes/no
- city_on — Auto-fill delivery city yes/no

## Chunk tpl.msOrder.Distance.outer

Default output plus delivery info and route map

[![](https://file.modx.pro/files/2/5/1/251f00bfc8d58246d30b4a13752662e0s.jpg)](https://file.modx.pro/files/2/5/1/251f00bfc8d58246d30b4a13752662e0.png)

## Requirements

For correct delivery cost calculation:

- Set size for each product
- Set weight for each product

## Tariff table example

If no tariff table is set, cost = distance × unit cost. If set, e.g. `{"5":10,"10":15,"15":20}`: for distance 11 km, cost = 5×10 + 5×15 + 1×20 = 145.

[2]: /en/components/minishop2/snippets/msorder
