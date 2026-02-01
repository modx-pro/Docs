---
title: msOptionsPrice
dependencies: miniShop2
---

# msOptionsPrice

The component adds option-based prices to products (e.g. by size or other attributes).

## Module settings

Edit settings under "System settings" with filter "msoptionsprice".

![Module settings](http://modx.pro/assets/images/tickets/3409/8636c50d7d7c56de9ecf75b700a83ee47e5e451e.png)

- Enable / disable option-based prices
- Path to JavaScript file for frontend price updates
- On the "MiniShop field" tab, set the miniShop extra field that stores prices

## Extra prices tab

After enabling the module, a new "Options–prices" tab appears in the MiniShop product resource.

![Extra prices tab](http://modx.pro/assets/images/tickets/3409/8f710546c040201c963873de2ebc044d942e1bb7.png)

### Example: extra prices by product size

![Extra prices tab - 2](http://modx.pro/assets/images/tickets/3409/30ce2928760b6518fa5d65a1e6eae17a743f9b1d.png)

### When the user selects options on the site, the product price updates automatically

![Extra prices tab - 3](http://modx.pro/assets/images/tickets/3409/198b956b16510e7c3a24092a2faef19e3b7cb240.png)

### Price update on option change

Wrap the `[[!+price]]` placeholder in a span with class `pr_change` so the price updates when options are selected:

```modx
<span class="pr_change">[[!+price]]</span>
```
