# Product and Prices

This menu manages product-only parameters.

![This menu manages product parameters](https://file.modx.pro/files/3/4/9/3495548c23867c788cd80d19d2d1a298.png)

All price changes are saved automatically; you can restore previous values on the Transactions tab.

## Prices

### Change price

To manage prices, select the products and choose **Prices -> Change price**.

![To manage prices](https://file.modx.pro/files/3/4/d/34d1a5d3401135842fe0ab59fea0df60.png)

#### Price change parameters

- **Set new price** — sets the value you enter
- **Increase price by percent** — enter the percent (integers only)
- **Decrease price by percent** — enter the percent (integers only)
- **Increase price by amount** — adds the amount you specify (**e.g.** 1000 + 100 = 1100)
- **Decrease price by amount** — subtracts the amount you specify (**e.g.** 1000 - 100 = 900)

![Price change parameters](https://file.modx.pro/files/c/8/d/c8d531200402108321765e6d894915e2s.jpg)

#### Price rounding parameters

- **Don't round** — choose if you don't want to round
- **Round down** — non-integer results are rounded down
- **Round up** — non-integer results are rounded up

![Price rounding parameters](https://file.modx.pro/files/c/8/d/c8d531200402108321765e6d894915e2s.jpg)

### Copy price

Copies the value from **price** to **old_price**.

To copy prices, select the products and choose **Prices -> Copy prices**.

![Copy price](https://file.modx.pro/files/3/6/b/36bd60b78bb2f807da705c2a4aed41f5.png)

In the modal, choose the source field and the target field.

![In the modal choose source and target](https://file.modx.pro/files/e/f/7/ef71268b2063d5cce1382a04ceb571f8.png)

## Update image previews

Updates all product image previews.

When useful:

- when the **file source** changed for all products and you need new previews
- when you added a watermark and need it on all images
- when you added a new image size (e.g. 200x200) and need to regenerate previews

This saves many hours of work.

![Update image previews](https://file.modx.pro/files/e/9/d/e9d7986717ecbf280f6db2682f22771e.png)

Each operation runs on the backend for one product, so you can select 1000 products at once.
The operation may take from 1 second to 1 hour. You'll see product IDs update as it runs.

## Options

Change values for tags, colors, sizes and other custom fields stored in options in table `ms2_products` as JSON.

Available operations:

- Set value
- Replace value
- Delete value

Select the products and choose **Options -> tags**.

![Select products and choose action](https://file.modx.pro/files/b/e/0/be055c2033040b450db19b23fa162c08.png)

A window opens where you choose the action.

![Window to choose action](https://file.modx.pro/files/a/2/3/a23966177df0e046cf67110dbbc1930d.png)

### Options: Set values

Adds values to options.
E.g. if **Tags** already had values, new selected values are added.

You can choose from the dropdown or add your own.

::: danger
The input field works like on the product page.
:::

![Options: Set values](https://file.modx.pro/files/2/6/1/261357ed6f77a57a10884b6139a03020.png)

### Options: Replace values

Replaces existing values.
E.g. if **Tags** had **Popular**, select it in **Old value**.

::: danger
Old values list only includes values from the selected products. If you selected 10 products with different values, choose one from the old value list. If any of the 10 have that value, it will be replaced with the value from "New value".

New value input works like on the product page.
:::

![Options: Replace values](https://file.modx.pro/files/f/0/e/f0ed186ffda7f506c6a7ff1585dc656f.png)

### Options: Delete values

Removes values from the field.

E.g. if one product had **Popular**, it appears in the list. Select it and click save.
The script finds all products with that value and removes **Popular** from them.

![Options: Delete values](https://file.modx.pro/files/f/9/6/f96c8e0a2412171d1170ae0993402eb9.png)

### Flags

You can set/clear flags on selected products.

Available fields:

- New **new**
- Popular **popular**
- Special **favorite**

![Flags](https://file.modx.pro/files/6/e/6/6e6e2ed11d132f6b9670e6c6230cb128.png)

## Additional categories

Categories added to each product in its card.

![Additional categories](https://file.modx.pro/files/5/2/6/526b6ce31c2e29b64a5036e13a3a0f36.png)

To set or clear categories:

![Additional categories](https://file.modx.pro/files/d/0/c/d0c9b10e2d0b35587a725db5c2ab68d8.png)

### Additional categories: Set

Select products and choose "Set additional categories".

In the modal, check the categories and click save.
![Additional categories: Set](https://file.modx.pro/files/f/d/c/fdc0771c7f90adcbbb9dac2201aaf845.png)

### Additional categories: Clear

Select products and choose "Clear additional categories".

A request will remove all categories from the products.

## Change Article, country of origin and other text fields

Select the products and choose the corresponding menu item to change **article** or **country of origin**.

Input works like on the product card.

::: danger
Custom fields are supported. List them in system settings (parameter mspre_field_string).
:::

![Change Article and country of origin](https://file.modx.pro/files/3/2/6/326ed695a8a9cf4e74075e015df02365.png)

## Change Weight and other weight fields

Select the products and choose the corresponding menu item to change **weight**.

Input works like on the product card.

::: danger
Custom fields are supported. List them in system settings (parameter mspre_field_weight).
:::

![Change Weight and other weight fields](https://file.modx.pro/files/5/7/3/573c11812e31ace736b712c2715e8c0b.png)
