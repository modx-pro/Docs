miniShop2 is rolling out to customers with all needed snippets and chunks.
You need MODX version no less than **2.3** and PHP- no less than **5.3** for work.

## Installation
- [Make our repository available ][1]
- Install**pdoTools** - this is a library for fast work with databases and styling, required for many components
- Install **Theme.Bootstrap** - this is the theme customising Twitter Bootstrap for MODX, standard chunks of the shop are designed for it
- Install **miniShop2**itself

You may use [our hosting][1] for testing, and choose these updates during site developing.

[![](https://file.modx.pro/files/d/a/0/da07c498260916d63690e7796152ea34s.jpg)](https://file.modx.pro/files/d/a/0/da07c498260916d63690e7796152ea34.png)

## Templates
Theme.Bootstrap realizes 2 templates, which are subject to change by you.
You may rename and use them or establish new ones.

Only 3 templates are needed.

### General
This template is presenting common resourses
```
<!DOCTYPE html>
<html lang="en">
    <head>
        [[$Head]]
    </head>
    <body>
        [[$Navbar]]
        <div class="container">
            <div id="content" class="main">
                [[*content]]
            </div>
            [[$Footer]]
        </div>
    </body>
</html>
```
It will be used for the home page and the cart page.

### Category
Template for category presenting with sheet-fed presentation of goods
```
<!DOCTYPE html>
<html lang="en">
    <head>
        [[$Head]]
    </head>
    <body>
        [[$Navbar]]
        <div class="container">
            <div id="content" class="category">
                [[!pdoPage?
                    &element=`msProducts`
                ]]
                [[!+page.nav]]
            </div>
            [[$Footer]]
        </div>
    </body>
</html>
```

### Product
Product template, chunk from ms2 set is activated instead of the content
```
<!DOCTYPE html>
<html lang="en">
    <head>
        [[$Head]]
    </head>
    <body>
        [[$Navbar]]
        <div class="container">
            <div id="content" class="product">
                [[$msProduct.content]]
            </div>
            [[$Footer]]
        </div>
    </body>
</html>
```

The created templates may be displayed in tweakers:
- **default_template** - the general template is shown here
- **ms2_template_category_default** - the category template
- **ms2_template_product_default** - the product template

## Partitions

The home page has been accomplished. We will assign "general" template to it and write in the content:
```
[[!pdoMenu]]
```
All site documents wiil be displayed on the homepage for guidance.

After this we will [create items category][3] and verify if its template is "Category".

After this we will [add several items in the created category][4] and verify their template as well.

All one can do is to create a cart page.
To do this we set up new page with "general" template in the site root and write in it:
```
[[!msCart]]

[[!msOrder]]

[[!msGetOrder]]
```
These snippets will show the cart page, checkout and generated order.

They are designed for presenting something only when it is required.
For example, `msCart` and `msOrder`are hidden if the parameter `msorder=id of an item is in the page address of an order`,
`msGetOrder` reacts on it quite the opposite.

## Mini cart page

Thus, primary customizing of the shop is finished and goods may be ordered.

As a final touch one may enter`Navbar` chunk and add there mini cart page presenting. For example:
```
<div class="navbar-collapse collapse">
    <!-- To show menu, set by default  -->
    <ul class="nav navbar-nav">
        [[pdoMenu?
            &startId=`0`
            &level=`1`
            &tplOuter=`@INLINE {{+wrapper}}`
        ]]
    </ul>
    <!-- here we will add the mini cart page -->
    <ul class="nav navbar-nav pull-right" style="padding-top:10px;">
        <li>[[!msMiniCart]]</li>
    </ul>
</div>
```


[1]: https://modhost.pro
[2]: https://modstore.pro/info/connection
[3]: /ru/01_Components/02_miniShop2/01_Interface/01_Category.md
[4]: /ru/01_Components/02_miniShop2/01_Interface/02_Item.md
