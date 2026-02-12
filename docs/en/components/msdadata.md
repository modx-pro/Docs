---
title: msDaData
dependencies: miniShop2
---

# msDaData

The component provides address and name autocomplete when placing an order in MiniShop.

Go to [dadata.ru](http://dadata.ru), register and get an API key.

Then call the msDaData snippet before checkout:

```modx
[[msDaData? &token=`your_token_here`]]

[[!msCart]]
[[!msOrder? &tplOuter=`tpl.msOrderDaData.outer`]]
```

Use the included template `tpl.msOrderDaData.outer` for checkout.

Result:

![Result](https://file.modx.pro/files/3/9/d/39d379ec493cf148e0b190cdf8ca8812.png)
