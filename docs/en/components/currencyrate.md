---
title: CurrencyRate
description: Foreign exchange rates from the Bank of Russia website
logo: https://modstore.pro/assets/extras/currencyrate/logo-lg.jpg
author: vgrish
modstore: https://modstore.pro/packages/other/currencyrate
repository: https://github.com/vgrish/currencyrate
---
# CurrencyRate

Foreign exchange rates against the ruble, published on the official Bank of Russia website.

![CurrencyRate](https://file.modx.pro/files/5/7/0/570b9fc1fad81b67bd03bf28374acf42.png)

## Component settings

- Enable / disable placeholders for exchange rates.
- Service URL — URL for fetching rates.
- Update date — time of last update.

## Rate placeholders

If **Enable placeholders** is on, rates are available as `[[++currency_code]]`, e.g.:

```modx
[[++USD]]
```

## Adjusting the rate

A correction factor lets you adjust the rate. Set it as a number or a percentage.

## CRcalc snippet

Converts prices to the currency set in the Manager.

| Parameter | Description |
|-----------|-------------|
| input | Input value (product price). |
| divider | If set, divide by this currency rate. |
| multiplier | If set, multiply by this currency rate. |
| format | Price format. |
| noZeros | Remove trailing zeros in the price. |

## Cron script

The package includes a cron script for automatic rate updates.
