---
title: msYmarket
dependencies: miniShop2
---

# msYmarket

## Module settings

Go to **System Settings** and select filter **"yandexmarket"** to edit script settings.

![msYmarket](https://file.modx.pro/files/c/5/d/c5d2374dd38b264392a122a128cd866a.png)

Available settings:

- Company name (default from MODX settings)
- Site name (default from MODX settings)
- Site URL (default from MODX settings)
- File location (default: {core_path}../goods.yml in root)
- Currencies (default: full Yandex.Market list: _RUB,EUR,USD,UAH,BYR,KZT_)
- Site main currency (default: ruble)
- Export currency for Yandex.Market (RUB,UAH,BYR,KZT. Default: ruble)
- "Delivery" field (extra field name for per-product delivery; if empty, all products have delivery)
- "In stock" field (extra field for product availability; if empty, all products are in stock)
- Main fields (resource field list mapped to YML tags)
- Additional fields (TV parameters mapped to YML tags)
- Filter (json array with product selection limits)
- Text field list (comma-separated fields treated as plain text)
- Fields to prepend site URL (site URL will be prepended; useful for picture and others)
- Use miniShop2 products and categories (if enabled, only MS2 products/categories — msProduct, mscategory — are exported. Disable if MS2 is not used)
- Category template list (comma-separated; required if MS2 is not used)
- Product template list (comma-separated; required if MS2 is not used)

## Product export field format

All options can be combined; format is the same for main fields and TV. The only tag always in the _offer_ section is **url** — it's built into the class. Other fields can be added/removed, so the component works with any e-commerce modules or without them. Synthetic field vendor stores the vendor name (if minishop2 is installed).

Full use with other e-commerce modules is supported. Category selection for export in the admin tree is currently supported only for minishop2. For other setups, export covers all categories per the template filter.

### Simple format

`price=>price;pagetitle=>name`

Result:

```xml
<price>0.00</price>
<name>test 2222</name>
```

param fields

`price=>param.Price;pagetitle=>name`

Result:
param fields with custom attributes

`weight=>param.Weight:unit="kg":type="Gross";pagetitle=>name`

Result:

```xml
<param name="Weight" unit="kg" type="Gross">5.00</param>
<name>test 2222</name>
```

## Export settings

![Export settings](https://file.modx.pro/files/4/d/f/4df80ac0b6e556e50a9eae353716c55c.png)

- Category selection

Select any product categories to export. Check the categories (child categories are checked automatically). If none selected, all categories are included.

- Parameter selection
  - Vendors
  - Tags
  - Colors

Filter the selection with the parameters above. By default products are not filtered.

## Export

The second tab **Export** is used for export.

![Export](https://file.modx.pro/files/b/d/2/bd26231a09d3b60691db2ddabe460b39.png)

On this tab you can view the export log:

- Selected product count
- Reasons products were filtered out
- Final export product count

## Export example

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE yml_catalog SYSTEM "shops.dtd">
<yml_catalog date="2014-05-04 21:38">
  <shop>
    <name>Company Name</name>
    <company>Company Name</company>
    <url>http://modx/</url>
    <currencies>
      <currency id="RUB" rate="CBRF" />
      <currency id="EUR" rate="CBRF" />
      <currency id="USD" rate="CBRF" />
      <currency id="UAH" rate="1" />
      <currency id="BYR" rate="CBRF" />
      <currency id="KZT" rate="CBRF" />
    </currencies>
    <categories>
      <category id="2">Clothing</category>
      <category id="4">Footwear</category>
      <category id="8" parentId="2">T-shirts</category>
      <category id="9" parentId="2">Shirts</category>
      <category id="10" parentId="2">Jackets</category>
      <category id="11" parentId="2">Coats</category>
      <category id="12" parentId="4">Sneakers</category>
      <category id="13" parentId="4">Shoes</category>
      <category id="14" parentId="4">Sandals</category>
      <category id="15">Underwear</category>
    </categories>
    <offers>
      <offer id="5" available="true">
        <url>http://modx/index.php?id=5</url>
        <price>0.00</price>
        <currencyId>UAH</currencyId>
        <categoryId>4</categoryId>
        <picture>http://modx/</picture>
        <delivery>true</delivery>
        <name>Swimming goggles</name>
        <description></description>
      </offer>
      <offer id="3" available="true">
        <url>http://modx/index.php?id=3</url>
        <price>200.00</price>
        <currencyId>UAH</currencyId>
        <categoryId>2</categoryId>
        <picture>http://modx/</picture>
        <delivery>true</delivery>
        <name>test 2222</name>
        <description></description>
      </offer>
    </offers>
  </shop>
</yml_catalog>
```
