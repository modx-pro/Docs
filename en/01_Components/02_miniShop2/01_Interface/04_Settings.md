Settings of miniShop2 are presented in separate site section, accessible from a menu.

All tables store settings of column width and position.
Multiply row highlighting may be used throughout tables by Ctrl(Cmd) or Shift.

## Delivery
[![](https://file.modx.pro/files/0/3/d/03d43063bc5f0c15e2b59e7c75c646fbs.jpg)](https://file.modx.pro/files/0/3/d/03d43063bc5f0c15e2b59e7c75c646fb.png)

You may create different delivery methods with custom logic, stated in settings  [custom class][1].
Such class is optional. You are free to ndicate none and ,in such a case there will be no special order processing.

[![](https://file.modx.pro/files/e/d/5/ed56f7ddd5f45402442370885078d8a1s.jpg)](https://file.modx.pro/files/e/d/5/ed56f7ddd5f45402442370885078d8a1.png)

Payment method is tied to a delivery method in editing window.

[![](https://file.modx.pro/files/4/0/1/401f530864705bedb8bacb417db211das.jpg)](https://file.modx.pro/files/4/0/1/401f530864705bedb8bacb417db211da.png)

## Payment
[![](https://file.modx.pro/files/c/6/c/c6c4bb3c3a12ef7d3e94e15270eb59c8s.jpg)](https://file.modx.pro/files/c/6/c/c6c4bb3c3a12ef7d3e94e15270eb59c8.png)

Payment methods are tied to orders and should implement their own logic.
They usually send user to third-party service to pay for the order.

[![](https://file.modx.pro/files/c/a/0/ca0834e0e7b9154a9ae99593258bb400s.jpg)](https://file.modx.pro/files/c/a/0/ca0834e0e7b9154a9ae99593258bb400.png)

To indicate [a class- payment processing][6] is not necessary.

## Order statuses
[![](https://file.modx.pro/files/d/9/9/d992c108a175a6a63f20430d7a733725s.jpg)](https://file.modx.pro/files/d/9/9/d992c108a175a6a63f20430d7a733725.png)

There are several mandatory statuses of an order :
* new
* paid
* sent
* canceled"
They may be tuned but cannot be deleted, because they are necessary for the shop operation.
You may indicate your own statuses for extended order processing logic in [own class][2].

The status may be **final**. This means that it cannot be switched to another one.
For example, "sent" and "canceled".

The status may be **fixed**, i.e. forbids switching to earlier statuses (order is set by dragging).
For example,"paid" cannot be switched to a "new".

[![](https://file.modx.pro/files/3/b/d/3bd18550d15892a08eca767daa51036ds.jpg)](https://file.modx.pro/files/3/b/d/3bd18550d15892a08eca767daa51036d.png)

Every status may sent its own letters to customer and store managers, indicated in system setting **ms2_email_manager**.

The chunks indicated in the status are used for writing letters.
All of them are processed by [pdoTools][3], so [Fenom][4] may be used for inheritance of one common letter template.

## Manufacturers
[![](https://file.modx.pro/files/c/b/5/cb518b8ffa89e7aec3f4d794106b7f44s.jpg)](https://file.modx.pro/files/c/b/5/cb518b8ffa89e7aec3f4d794106b7f44.png)

You may set the manufacturers of goods in this section. They will then be selected in item characteristics.

[![](https://file.modx.pro/files/c/e/2/ce250f7e7270ba124ecb10c2da71fa70s.jpg)](https://file.modx.pro/files/c/e/2/ce250f7e7270ba124ecb10c2da71fa70.png)

Different properties and links to site resource may be indicated to every manufacturer, for example , for displaying his personal page.

## Links of goods
This is a simple tool permitting to group goods according any attribute.

[![](https://file.modx.pro/files/3/d/1/3d1110c391487d2eb6142a90b8abd1das.jpg)](https://file.modx.pro/files/3/d/1/3d1110c391487d2eb6142a90b8abd1da.png)

There are four available types of link:
* **One to one** - two-ways equal  link of goods.
* **One to many** - the link between one item and several others. Affiliated goods are not linked with each other, only with parent.
* **Many to one** - the same as preceding, but in the opposite way - affiliated item is linked with general. This type may be excess,but let it be for symmetry.
* **Many to many** - the most interesting link type - equivalent multilateral link of several items. When adding new item to the group, it is linked with all group members.
For example, this link is needed for indicating goods differed by one parameter.
Or all the items of this group may participate in any promotion (and it is simple to display links to another offers on the item page).

[![](https://file.modx.pro/files/0/a/8/0a8e6b14d03e9cd7aeac8a7f671de6b4s.jpg)](https://file.modx.pro/files/0/a/8/0a8e6b14d03e9cd7aeac8a7f671de6b4.png)

### Storage
To add a new record you should select pre-established link and item to apply it.

[![](https://file.modx.pro/files/5/7/e/57e122559c34bd8cbb1c3e30963d0a87s.jpg)](https://file.modx.pro/files/5/7/e/57e122559c34bd8cbb1c3e30963d0a87.png)

The table **msProductLink** with only 3 columns presents the items links at the database level:
* **link** - is link id in the table `msLink`created above, in settings
* **master** - is primary item id 
* **slave** - is descendent item id 

Let us understand which records are created for different link types.

**One to one** - the item with id = 10 is added to the item with id = 15,  2 records in database are created:
```
master = 10, slave = 15
master = 15, slave = 10
```

**One to many** -  3 items with different id are added to the item with id = 10. We get the following records :
```
master = 10, slave = 15
master = 10, slave = 16
master = 10, slave = 17
```

**Many to one** -  3 items with different id are added to the item with id = 10. We get the following records :
```
master = 21, slave = 10
master = 22, slave = 10
master = 23, slave = 10
```

**Many to many** - and, finally, 3 items with different id are added to the item with id = 10.
```
master = 10, slave = 31
master = 10, slave = 32
master = 10, slave = 33
master = 31, slave = 10
master = 31, slave = 32
master = 31, slave = 33
master = 32, slave = 10
master = 32, slave = 31
master = 32, slave = 33
master = 33, slave = 10
master = 33, slave = 31
master = 33, slave = 32
```
All items of the group are linked together.

### Sample

It is simple: create snippet and select id of the group items, indicating **link** and **master** ( for link many to one - slave instead of master).
```
$q = $modx->newQuery('msProductLink', array(
    'link' => 1,
    'master' => 10
));
$q->select('slave');

if ($q->prepare() && $q->stmt->execute()) {
    $ids = $q->stmt->fetchAll(PDO::FETCH_COLUMN);
    print_r($ids);
}
```
When id of linked goods are derived, you can do what you want with them. You are restricted only by your imagination.

### Examples

Different colors ( several copies of goods with their own photos and prices)

[![](https://file.modx.pro/files/6/2/2/622ed477f81314619ccb842abb89a9d9s.jpg)](https://file.modx.pro/files/6/2/2/622ed477f81314619ccb842abb89a9d9.png)

Recommended goods (are displayed in the cart when placing the order)

[![](https://file.modx.pro/files/2/7/a/f/7afaeb1b0785680df6bd64466e3fa798_thumb.png)](https://file.modx.pro/files/2/7/a/f/7afaeb1b0785680df6bd64466e3fa798.png)

Sets of goods (are displayed the references to other goods of the set in the card)

[![](https://file.modx.pro/files/8/5/d/85dc782cee8d7e85dc02770b01cfe849s.jpg)](https://file.modx.pro/files/8/5/d/85dc782cee8d7e85dc02770b01cfe849.png)

## Goods options
[![](https://file.modx.pro/files/0/b/1/0b15183d616799496b2a24cec43106c9s.jpg)](https://file.modx.pro/files/0/b/1/0b15183d616799496b2a24cec43106c9.png)

To create new characteristic press the button "Create" and fill the appeared window:
* **Key** - identifier of characteristic in the system, determining its frontend placeholder. Required to fill.
* **Name** -  displayed characteristic title.
* **Description**
* **Unit**
* **Group** - category in MODX system, will be displayed in tab on item option page
* **Property type** - determines valid format for the value

The created characteristics may be filtered by the goods category tree in the left page side.
When creating characteristic you also may spot it to according goods category with the help of the tree in the left.

[![](https://file.modx.pro/files/e/c/6/ec68f57c854c4a7f0057c94d85ba62d0s.jpg)](https://file.modx.pro/files/e/c/6/ec68f57c854c4a7f0057c94d85ba62d0.png)

The created characteristics are displayed on [item page][5] in corresponding tab.

To display the goods options the snippet [msProducts][7] should be used.


[1]: /en/01_Components/02_miniShop2/03_Development/03_Services/03_Delivery.md
[2]: /en/01_Components/02_miniShop2/03_Development/03_Services/02_Order.md
[3]: /en/01_Components/01_pdoTools
[4]: /en/01_Components/01_pdoTools/03_Parser.md
[5]: /en/01_Components/02_miniShop2/01_Interface/02_Item.md
[6]: /en/01_Components/02_miniShop2/03_Development/03_Services/04_Payment.md
[7]: /en/01_Components/02_miniShop2/02_Snippets/01_msProducts.md
