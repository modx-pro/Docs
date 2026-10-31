# MODX 3 and modifications

## MODX 3 and MiniShop3

The same package installs on MODX 2.8 and MODX 3. The snippet detects the shop by its namespaces. If only MiniShop3 is installed, msCatalyst reads the `ms3_*` tables, the `vendor_id` vendor field and products with the `class_key` `MiniShop3\Model\msProduct`. If both shops are installed, msCatalyst works with miniShop2.

Properties, facet syntax, chunks and URLs are the same on both versions. The card output snippet in MiniShop3 is also called `msProducts`.

Differences:

- the SeoFilter bridge works only on MODX 2. On MODX 3 use `&seo=`native``, see [SEO](seo);
- on MODX 3, Localizator ships as the `localizator3` package, and msCatalyst supports it, see [Multilingual](multilingual#localizator).

::: warning
MiniShop3 is still in beta. If the filter stops working after a MiniShop3 update, post in the component discussion and include the MiniShop3 version.
:::

## Modifications

With msOptionsPrice2 (miniShop2) or ms3Variants (MiniShop3) installed, the index picks up modification prices and options.

```modx
[[!msCatalyst?
  &parents=`5`
  &facets=`vendor, msop:price|range, option:size, option:color`
]]
```

- `msop:price|range` on miniShop2 and `variant:price|range` on MiniShop3 build a range of modification prices.
- Modification options merge with product options in `option:*`.
- A product passes the price filter if at least one of its modifications falls into the range.

Sync writes modifications to the same packages, see [Sync](interface/sync#modifications-categories-and). Export outputs them as separate rows if you turn on "Variants as separate rows".
