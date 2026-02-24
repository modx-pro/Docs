---
title: msDellin
description: Component for calculating delivery cost via Dellin transport company
dependencies: miniShop2
---

# msDellin

The component calculates delivery cost via the Dellin transport company.

## Component setup

![Component setup](https://file.modx.pro/files/e/7/a/e7a27881b153667a76904f96fbe1aad3.png)

- Default product volume — volume for miniShop2 products without size
- Product size separator — separator in miniShop2 `size` field
- Volume correction factor — volume = volume × factor
- Product size units — `mm` or `cm`

- Sender city ID — KLADR city code ([get it here][2])
- kladr-api key — for [kladr-api][3] access
- kladr-api token — for [kladr-api][3] access

## Main settings

### miniShop2 :: Settings :: Delivery methods

- Enable the delivery method
- Assign payment methods

![Delivery methods](https://file.modx.pro/files/6/4/f/64f4837253d6a20655b2bbf778b2f5be.png)

#### System settings :: miniShop2

- Order handler class — `msdlOrderHandler`
- Cart handler class — `msdlCartHandler`

![System settings](https://file.modx.pro/files/4/c/7/4c7e98868eb59337c0ca1b55b06bd7ae.png)

## msOrderDellin snippet

Same as [msOrder][4]. Parameters:

- tplOuter — Wrapper chunk
- tplPayment — Payment method chunk
- tplDelivery — Delivery method chunk
- tplEmpty — Chunk when no results
- tplSuccess — Success message chunk
- front_js — Frontend script

## Chunk tpl.msOrder.dellin.outer

Default output plus delivery info

![Chunk tpl.msOrder.dellin.outer](https://file.modx.pro/files/b/a/8/ba8c960dac69591ceb0e6ae5dd62a96a.png)

## Chunk tpl.msOrder.dellin.outer.dadata

Output chunk for use with [msDadata][5]. Simplifies user data entry.

![Chunk tpl.msOrder.dellin.outer.dadata](https://file.modx.pro/files/7/d/b/7db9d87ce4173c39df29dd1a17ccb9cb.png)

## Requirements

For correct delivery cost calculation:

- Set size for each product
- Set weight for each product

## Credits

Thanks to Alexander Rakhimov for help with the component.

[2]: http://dev.dellin.ru/cms/
[3]: http://kladr-api.ru/
[4]: /en/components/minishop2/snippets/msorder
[5]: /en/components/msdadata
