# Product

A miniShop2 product extends the standard MODX resource class.
It has its own manager interface and an extended set of properties.

![Product](https://file.modx.pro/files/5/4/6/546f08580a43a9a34fca13625666055d.png)

## Main menu

When creating a product you can only save or cancel.

When editing, buttons are added for view on site, duplicate, and navigate to previous/next product (if any).

## Product panel

The product inherits and extends the standard MODX resource panel.
Because it has many properties, they are grouped in separate tabs.

First come standard resource properties:

![Product panel - 1](https://file.modx.pro/files/f/a/0/fa0a70de3b0b4ade9dc823c61ef4bf69.png)

Then resource settings:

![Product panel - 2](https://file.modx.pro/files/5/b/7/5b7c0a87bc2f115ae6321b403c43173d.png)

Note: the "Container" checkbox is replaced by "Show in menu". Products cannot be containers; use categories for that.
Products are hidden from the menu by default for faster tree loading; you can show specific ones with this toggle.

This toggle’s default for new products is set by **ms2_product_show_in_tree_default**.

### Product properties

A dedicated tab with extra product fields: price, SKU, weight, vendor, etc.
Product properties are required and shared by all products.

![Product properties](https://file.modx.pro/files/0/7/b/07bc6a3d032b1df6d562f45eca710a1a.png)

Fields and order are set in **ms2_product_extra_fields**. Default fields:

- **price**, **old_price** — price (2 decimal places)
- **article** — SKU (text)
- **weight** — weight (3 decimal places)
- **color**, **size** — arrays (autolist)
- **made_in** — country (text with hints)
- **vendor** — vendor dropdown
- **tags** — tags array (autolist)
- **remains** — quantity in stock (integer)
- **reserved** — quantity reserved (integer)
- **new**, **popular**, **favorite** — flags: yes / no

Available properties can only be changed via [product plugins][1].
The tab can be hidden with **ms2_product_tab_extra**.

### Product options

Unlimited list of options inherited from the category; values can differ per product.

![Product options](https://file.modx.pro/files/3/4/3/343138dcb7ea9d2ce801d3d6772ad96d.png)

Options are created in store settings and assigned in category settings. If the category has no options, this tab is hidden.
You can force-hide it with **ms2_product_tab_options**.

See [settings][2] for more on product options.

### Product links

This tab appears only when editing a product (needs product id).

![Product links](https://file.modx.pro/files/2/4/1/2417516e02ff308cb1f53f8f883226a0.png)

Link types are defined in store settings. Tab can be disabled with **ms2_product_tab_links**.

### Categories

A product can belong to several categories.
It must have one main category (**parent**) and can have extra ones on this tab.

![Categories](https://file.modx.pro/files/8/2/f/82ffb0c829e766b631bfb056f9f6052c.png)

Save the product after changing categories. The main category from the tree cannot be removed.

### Comments

This tab is shown only if **Tickets** is installed and **ms2_product_show_comments** is on.

![Comments](https://file.modx.pro/files/5/c/4/5c43f7a822acfe411cfe1eef88f16d92.png)

To allow comments on product pages, call snippet **TicketComments** there.

### Duplicates

When duplicating a product, the following are copied:

- All resource fields and settings
- Product properties
- Product options
- Product links
- Categories

**Gallery files are not copied** because that can be slow (e.g. with remote sources like Amazon S3) and may hit timeouts.

[1]: /en/components/minishop2/development/product-plugins
[2]: /en/components/minishop2/interface/settings
