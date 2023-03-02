Order control panel of miniShop2 consists of form with filters and data table.

[![](https://file.modx.pro/files/0/2/8/02869bbdbaab68056444acf0e9f992b7s.jpg)](https://file.modx.pro/files/0/2/8/02869bbdbaab68056444acf0e9f992b7.png)

### Filter
To filter orders the following parameters may be used:
* Beginning from order creation date
* Finishing by order creation date
* Order status filter
* Customer filter

[![](https://file.modx.pro/files/a/2/e/a2e0f0493819c617531729cfc84b1333s.jpg)](https://file.modx.pro/files/a/2/e/a2e0f0493819c617531729cfc84b1333.png)

There is additional line of order search by:
* Customer name
* Customer profile Email
* Order number
* Comments to an order written by a manager
* If integer is stated, by order id only

Information panel is displayed in the middle of the filter.
First row displays the sum and number of selected orders with regard to search and filter values.
Second row displays the sum and number of processed orders ( "Fulfilled" and "Sent" status) within last 30 days.

### Order table
All orders are displayed here.System setting **ms2_order_grid_fields** defines the set and sequence of columns.
You may also customize available columns by table heading settings:

[![](https://file.modx.pro/files/f/5/7/f572cbd557a61f337cadc570028e71b9s.jpg)](https://file.modx.pro/files/f/5/7/f572cbd557a61f337cadc570028e71b9.png)

These settings are saved in system registry.

Sorting with click on required column is available. It is also stored.

[![](https://file.modx.pro/files/2/2/0/2208f4732d2a35f1baf146faa5123521s.jpg)](https://file.modx.pro/files/2/2/0/2208f4732d2a35f1baf146faa5123521.png)

You may delete several orders at once by the keys Shift or Ctrl (Cmd) .

### Order editing
To change the order you must press button in "Actions" column or 2 times click on required line by the left mouse button.
You can edit one order at a time only.

When opening the order, the direct reference parameter `&order=id order` is added to browser address.

Selected tab of the order panel is also stored. There are four of them by default.

#### General information
Here you may manually change the order status, delivery and payment method by drop-down list. They are interlinked as stated in the shop settings section. 
Thus, it is impossible to  change the stateful order status or to choose the payment method which not correspond to the delivery.

[![](https://file.modx.pro/files/8/f/a/8fab54bbc646551dd5daeea657eccc39s.jpg)](https://file.modx.pro/files/8/f/a/8fab54bbc646551dd5daeea657eccc39.png)

You also can attach order to another user. Also you may write a comment for further search by order filter.

#### Ordered goods
Tables with the designed goods . You can change, delete and add them.
You can also change the column set by **ms2_order_product_fields**, and then customize them by the heading menu.

[![](https://file.modx.pro/files/4/f/f/4ff54aefeddd1cbd8134cae865c415b4s.jpg)](https://file.modx.pro/files/4/f/f/4ff54aefeddd1cbd8134cae865c415b4.png)

The ordered goods settings are opened by button or double click.

[![](https://file.modx.pro/files/8/7/c/87ca039182d9da906baaf78666691953s.jpg)](https://file.modx.pro/files/8/7/c/87ca039182d9da906baaf78666691953.png)

The goods options may be changed in JSON format.

#### Delivery address
This is option tab. It displays the fields, listed in system setting **ms2_order_address_fields** by default.

[![](https://file.modx.pro/files/9/f/9/9f942468cbaa42114753b8d0c55c6450s.jpg)](https://file.modx.pro/files/9/f/9/9f942468cbaa42114753b8d0c55c6450.png)

However, if you do not use address in the orders, you simply may clear this setting. The tab will be hidden.

[![](https://file.modx.pro/files/9/d/f/9df52e923dd50cf3e730395b46615a70s.jpg)](https://file.modx.pro/files/9/d/f/9df52e923dd50cf3e730395b46615a70.png)

#### Order history
The history of the order status changes is displayed here. The date, time and user (manager).

[![](https://file.modx.pro/files/f/d/9/fd932d559594f16543926db47e187487s.jpg)](https://file.modx.pro/files/f/d/9/fd932d559594f16543926db47e187487.png)

When clicking to name, new browser window for this user editing will be open.
