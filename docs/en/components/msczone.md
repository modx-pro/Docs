---
title: mscZone
description: Delivery cost by zones for minishop2
logo: https://modstore.pro/assets/extras/msczone/logo-lg.jpg
author: vgrish
modstore: https://modstore.pro/packages/delivery/msczone

dependencies: miniShop2
---

# mscZone

The component calculates delivery cost by delivery points (zones) based on tariff rate and order property (works with order weight) for miniShop2.

## Delivery zone configuration

Add and edit any number of delivery zones.

![Delivery zone configuration](https://file.modx.pro/files/c/3/e/c3e8d58b91f753edd4fc55b39b96784b.png)

- Zone name
- Zone description

## Delivery points list

Add and edit delivery points linked to a zone; set address and description.

![Delivery points list](https://file.modx.pro/files/6/6/7/667ae6ea4b705cf4ffec98b9d7f43066.png)

- Point name
- Zone
- Address
- Description
- Active

## Property configuration

Set order property and its unit of measure.

![Property configuration](https://file.modx.pro/files/5/1/5/515e402f457356a4ec734fb7ee31af29.png)

## Zone tariffs

Set value ranges and delivery cost. If cost per unit is set, it is added to the base delivery cost.

![Zone tariffs](https://file.modx.pro/files/e/5/4/e549ae6d0ace8aebb2f545e1e6040930.png)

## msOrderZone snippet

Same as [msOrder][2]. Adds custom scripts and messages.

## msOrderSpot snippet

Outputs the list of delivery points.

![msOrderSpot snippet](https://file.modx.pro/files/7/7/c/77cc20d260821a00a0eaa2ac111acd2c.png)

### miniShop2 :: Settings :: Delivery methods

- Enable the delivery method
- Assign payment methods

### System settings :: miniShop2

- Order handler class — `mscdOrderHandler`

## Requirements

For correct delivery cost calculation:

- Set weight for each product

[2]: /en/components/minishop2/snippets/msorder
