# miniShop2 settings

miniShop2 settings are in a separate section accessible from the menu.

All tables remember column width and position.
Multi-select with [[Ctrl]] [[⌘ Cmd]] or [[Shift]] works everywhere.

## Delivery

![Delivery - 1](https://file.modx.pro/files/0/3/d/03d43063bc5f0c15e2b59e7c75c646fb.png)

You can create delivery methods with custom logic handled by a [custom class][1] set in settings.
The class is optional; if omitted, no special order handling is applied.

![Delivery - 2](https://file.modx.pro/files/e/d/5/ed56f7ddd5f45402442370885078d8a1.png)

Each delivery method is linked to payment methods in its edit window.

![Delivery - 3](https://file.modx.pro/files/4/0/1/401f530864705bedb8bacb417db211da.png)

## Payment

![Payment - 1](https://file.modx.pro/files/c/6/c/c6c4bb3c3a12ef7d3e94e15270eb59c8.png)

Payment methods are attached to orders and must implement their own logic.
Usually they send the user to an external payment service.

![Payment - 2](https://file.modx.pro/files/c/a/0/ca0834e0e7b9154a9ae99593258bb400.png)

Specifying a [payment handler class][6] is optional.

## Order statuses

![Order statuses - 1](https://file.modx.pro/files/d/9/9/d992c108a175a6a63f20430d7a733725.png)

There are several required statuses:

- Draft
- New
- Paid
- Shipped
- Cancelled

They can be configured but not removed; they are needed for the store.
You can add statuses for custom logic in [your class][2].

A status can be **final** — it cannot be changed to another (e.g. "Shipped", "Cancelled").

A status can be **fixed** — you cannot switch back to earlier statuses (order is set by drag-and-drop).
E.g. "Paid" cannot be switched back to "New".

![Order statuses - 2](https://file.modx.pro/files/3/b/d/3bd18550d15892a08eca767daa51036d.png)

Each status can send emails to the customer and to managers set in **ms2_email_manager**.

Email content uses chunks set in the status.
All are processed by [pdoTools][3], so you can use [Fenom][4] to inherit a common email template.

## Vendors

![Vendors - 1](https://file.modx.pro/files/c/b/5/cb518b8ffa89e7aec3f4d794106b7f44.png)

Here you define product vendors, which are then selectable in product properties.

![Vendors - 2](https://file.modx.pro/files/c/e/2/ce250f7e7270ba124ecb10c2da71fa70.png)

Each vendor can have custom properties and a link to a site resource (e.g. for a vendor page).

## Product links

A simple tool to group products by any criterion.

![Product links - 1](https://file.modx.pro/files/3/d/1/3d1110c391487d2eb6142a90b8abd1da.png)

Link types (choose one of four):

- **One to one** — bidirectional equal link between two products.
- **One to many** — one product linked to several; children are not linked to each other.
- **Many to one** — same as above, reversed (child links to parent).
- **Many to many** — equal multi-way link; adding a product to a group links it to all members.

Use links for products that differ by one parameter, or for promotions (e.g. show related products on the product page).

![Product links - 2](https://file.modx.pro/files/0/a/8/0a8e6b14d03e9cd7aeac8a7f671de6b4.png)

### Storage

To add a link, select a link type and the product to link.

![Storage](https://file.modx.pro/files/5/7/e/57e122559c34bd8cbb1c3e30963d0a87.png)

In the database, links are in **msProductLink** (3 columns):

- **link** — id of the link in `msLink` (created in settings)
- **master** — main product id
- **slave** — linked product id

**One to one** — link product 10 to 15 → 2 rows: (10,15), (15,10).

**One to many** — link 3 products to 10 → (10,15), (10,16), (10,17).

**Many to one** — link 3 products to 10 → (21,10), (22,10), (23,10).

**Many to many** — link 3 products to 10 → each product is linked to every other in the group.

### Query

Create a snippet and select product ids by **link** and **master** (for many-to-one use **slave** instead of **master**).

```php
$q = $modx->newQuery('msProductLink', array(
  'link' => 1,
  'master' => 10,
));
$q->select('slave');

if ($q->prepare() && $q->stmt->execute()) {
  $ids = $q->stmt->fetchAll(PDO::FETCH_COLUMN);
  print_r($ids);
}
```

Use the resulting ids as needed.

### Examples

Different colors (several product variants with their own images and prices).

Recommended products (shown in cart at checkout).

Product sets (links to other items in the set on the product card).

## Product options

![Product options - 1](https://file.modx.pro/files/0/b/1/0b15183d616799496b2a24cec43106c9.png)

To create an option: click "Create" and fill in:

- **Key** — identifier and placeholder name on the frontend. Required.
- **Title** — display name.
- **Description**
- **Unit**
- **Group** — MODX category; shown in the product options tab
- **Property type** — value format

Filter options by the category tree on the left.
When creating an option you can assign it to categories via the tree.

![Product options - 2](https://file.modx.pro/files/e/c/6/ec68f57c854c4a7f0057c94d85ba62d0.png)

Options appear on the [product page][5] in the options tab.

Use snippet [msProducts][7] to output product options.

[1]: /en/components/minishop2/development/services/delivery
[2]: /en/components/minishop2/development/services/order
[3]: /en/components/pdotools/
[4]: /en/components/pdotools/parser
[5]: /en/components/minishop2/interface/product
[6]: /en/components/minishop2/development/services/payment
[7]: /en/components/minishop2/snippets/msproducts
