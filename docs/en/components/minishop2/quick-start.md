# Quick start

miniShop2 comes with all needed snippets and chunks.
You need MODX **2.3** or higher and PHP **7.0** or higher.

## Installation

- [Add our repository][1]
- Install **pdoTools** — library for fast DB and output work; required by many components
- Install **Theme.Bootstrap** — Twitter Bootstrap theme for MODX; default store chunks are built for it
- Install **miniShop2**

For testing you can use [our hosting][2]; these extras can be selected when creating a site.

[![](https://file.modx.pro/files/5/7/a/57a30e0dc6e98d36ff56e9718a5f0bc0s.jpg)](https://file.modx.pro/files/5/7/a/57a30e0dc6e98d36ff56e9718a5f0bc0.png)

## Templates

Theme.Bootstrap installs 2 templates that you can change as you like.
You can rename and use them or create new ones.

You need 3 templates in total.

### General

Template for regular resource content:

```modx
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

Use it for the home page and cart.

### Category

Template for category with paginated products:

```modx
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

Product template; content is replaced by an ms2 chunk:

```modx
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

Set templates in system settings:

- **default_template** — general template
- **ms2_template_category_default** — category template
- **ms2_template_product_default** — product template

## Sections

Assign the "General" template to the home page and put in content:

```modx
[[!pdoMenu]]
```

This shows all site documents on the home page.

Then [create a product category][3] and set its template to "Category".

After the category, [add products][4] and set their template too.

Then create the cart page: new page with "General" template in site root and content:

```modx
[[!msCart]]

[[!msOrder]]

[[!msGetOrder]]
```

These snippets output the cart, checkout form, and order view (after checkout).

They only show when needed: `msCart` and `msOrder` hide when the URL has `msorder=order_id`; `msGetOrder` only runs in that case.

## Mini cart

Initial store setup is done; you can already order products.

As a final step, edit chunk `Navbar` and add the mini cart, e.g.:

```modx
<div class="navbar-collapse collapse">
  <!-- Menu output (default) -->
  <ul class="nav navbar-nav">
    [[pdoMenu?
      &startId=`0`
      &level=`1`
      &tplOuter=`@INLINE {$wrapper}`
    ]]
  </ul>
  <!-- Mini cart -->
  <ul class="nav navbar-nav pull-right" style="padding-top: 10px;">
    <li>[[!msMiniCart]]</li>
  </ul>
</div>
```

[1]: https://modstore.pro/info/connection
[2]: https://modhost.pro
[3]: /en/components/minishop2/interface/category
[4]: /en/components/minishop2/interface/product
