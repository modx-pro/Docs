# Order

The miniShop2 order panel consists of filter forms and a data table.

![Order](https://file.modx.pro/files/0/2/8/02869bbdbaab68056444acf0e9f992b7.png)

## Filter

Orders can be filtered by:

- Order creation date (from / to)
- Order status
- Customer

![Filter](https://file.modx.pro/files/a/2/e/a2e0f0493819c617531729cfc84b1333.png)

There is also an order search bar that searches by:

- Username
- Profile email
- Order number
- Manager comment in the order
- If an integer is entered, search is by order id only

An info panel is shown in the middle of the filter.
The first row shows sum and count of selected orders (with search and filter applied).
The second row shows sum and count of processed orders (status "Completed" and "Shipped") for the last 30 days.

### Order table

All orders are listed; columns and order are set in **ms2_order_grid_fields**.
You can configure visible columns via the table header menu:

![Order table - 1](https://file.modx.pro/files/f/5/7/f572cbd557a61f337cadc570028e71b9.png)

Table settings are stored in the system registry.

Click a column header to sort; sort order is remembered.

![Order table - 2](https://file.modx.pro/files/2/2/0/2208f4732d2a35f1baf146faa5123521.png)

You can select multiple orders for deletion with [[Shift]] or [[Ctrl]] [[⌘ Cmd]].

### Editing an order

To edit an order, click the action button in the row or double-click the row.
Only one order can be edited at a time.

When opening an order, `&order=order_id` is added to the URL — a direct link to it.

The selected order panel tab is remembered. By default there are 4 tabs:

#### General info

You can manually change order status, delivery method, and payment method via dropdowns. They are linked as defined in store settings.
You cannot set a final status or choose a payment method that does not match the delivery method.

![General info](https://file.modx.pro/files/8/f/a/8fab54bbc646551dd5daeea657eccc39.png)

You can attach the order to another user and add a comment for search/filter.

#### Order products

Table of order items. You can edit, remove, or add items.
Columns are set in **ms2_order_product_fields** and configured via the header menu.

![Order products - 1](https://file.modx.pro/files/4/f/f/4ff54aefeddd1cbd8134cae865c415b4.png)

Product settings open via button or double-click.

![Order products - 2](https://file.modx.pro/files/8/7/c/87ca039182d9da906baaf78666691953.png)

Product options can be edited in JSON format.

#### Delivery address

This tab is optional. By default it shows fields from **ms2_order_address_fields**.

![Delivery address - 1](https://file.modx.pro/files/9/f/9/9f942468cbaa42114753b8d0c55c4150.png)

If you do not use addresses in orders, clear this setting and the tab is hidden.

![Delivery address - 2](https://file.modx.pro/files/9/d/f/9df52e923dd50cf3e730395b46615a70s.jpg)

#### Order history

History of status changes: date, time, and user (manager).

![Order history](https://file.modx.pro/files/f/d/9/fd932d559594f16543926db47e187487.png)

Clicking the user name opens that user’s edit page in a new browser window.
