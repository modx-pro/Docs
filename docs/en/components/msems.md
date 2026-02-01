---
title: msEMS
description: EMS Russian Post delivery cost calculation
logo: https://modstore.pro/assets/extras/msems/logo-lg.jpeg
modstore: https://modstore.pro/packages/delivery/msems

dependencies: miniShop2
---

# msEMS

As of version 2.0 the component was fully rewritten and is not compatible with older versions. In particular, the ability to select a city from a suggested list was removed; validation of the city name is entirely up to the site developer; the component only provides delivery cost calculation.

Before using the component you must configure it, otherwise it will fill the error log and will not calculate. Go to system settings, namespace "minishop2", section "Delivery EMS" and set:

- Request result cache time in seconds (ms2_ems_cache_time). Free Postcalc usage allows no more than 500 requests per day, so caching is required.
- Default shipment weight in grams (ms2_ems_default_weight). Used when product weight is not set on the site and cart weight is 0. Cannot exceed 100 kg.
- City from which orders are shipped (ms2_ems_delivery_from). Required; nothing works without it.
- Site developer email (ms2_ems_developer_email). Postcalc requires this in requests for contact. If empty, the default admin email (emailsender) is used.
- Declared value (ms2_ems_valuation). Can be a percentage of cart total or a fixed amount in rubles. Cannot exceed 100,000 rubles.
- Weight multiplier (ms2_ems_weight_rate). Calculations need weight in grams; product weight may be in kg, mg, or other units. Set the multiplier to convert product weight to grams.

::: warning
Under Postcalc terms of use you must place a link to the project site (postcalc.ru) on your site. If your project exceeds 500 API requests per day, you must switch to paid access. [http://postcalc.ru/conditions.html](http://postcalc.ru/conditions.html)
:::
