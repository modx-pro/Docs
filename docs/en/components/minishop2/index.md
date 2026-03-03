---
title: miniShop2
description: Flexible and fast e-commerce component for MODX Revolution
logo: https://modstore.pro/assets/extras/minishop2/logo-lg.png
author: modx-pro
modstore: https://modstore.pro/packages/ecommerce/minishop2
modx: https://modx.com/extras/package/minishop2
repository: https://github.com/modx-pro/miniShop2

items: [
  { text: 'Quick start', link: 'quick-start' },
  { text: 'System requirements and dependencies', link: 'requirements-and-dependencies' },
  {
    text: 'Interface',
    items: [
      { text: 'Category', link: 'interface/category' },
      { text: 'Product', link: 'interface/product' },
      { text: 'Orders', link: 'interface/orders' },
      { text: 'Settings', link: 'interface/settings' },
      { text: 'Gallery', link: 'interface/gallery' },
      { text: 'Task manager', link: 'interface/task-manager' },
      {
        text: 'Utilities',
        link: 'interface/utilities/',
        items: [
          { text: 'Gallery', link: 'interface/utilities/gallery' },
          { text: 'Import', link: 'interface/utilities/import' },
        ],
      },
    ],
  },
  {
    text: 'Snippets',
    link: 'snippets/',
    items: [
      { text: 'msProducts', link: 'snippets/msproducts' },
      { text: 'msCart', link: 'snippets/mscart' },
      { text: 'msOrder', link: 'snippets/msorder' },
      { text: 'msMiniCart', link: 'snippets/msminicart' },
      { text: 'msGetOrder', link: 'snippets/msgetorder' },
      { text: 'msGallery', link: 'snippets/msgallery' },
      { text: 'msOptions', link: 'snippets/msoptions' },
      { text: 'msProductOptions', link: 'snippets/msproductoptions' },
    ],
  },
  {
    text: 'Development',
    items: [
      { text: 'Product plugins', link: 'development/product-plugins' },
      { text: 'Scripts and styles', link: 'development/scripts-and-styles' },
      { text: 'Events', link: 'development/events' },
      {
        text: 'Services',
        items: [
          { text: 'Cart', link: 'development/services/cart' },
          { text: 'Order', link: 'development/services/order' },
          { text: 'Delivery', link: 'development/services/delivery' },
          { text: 'Payment', link: 'development/services/payment' },
          { text: 'Connection', link: 'development/services/connection' },
        ],
      },
    ],
  },
  { text: 'Payment modules', link: 'payments' },
  { text: 'Other add-ons', link: 'modules'},
  {
    text: 'Useful queries',
    items: [
      { text: 'Count products in category', link: 'useful-queries/count-category-products' },
      { text: 'Get MS2 product vendors', link: 'useful-queries/get-vendors' },
      { text: 'Get product IDs by MS2 option', link: 'useful-queries/get-product-id-by-option' },
      { text: 'Resource tree', link: 'useful-queries/get-resource-tree' },
      { text: 'Get all product categories', link: 'useful-queries/get-categories' },
      { text: 'Get products by options', link: 'useful-queries/get-products-by-options' },
      { text: 'Get links to product extra categories', link: 'useful-queries/get-categories-links' },
    ],
  },
]
---
# miniShop2

Flexible and fast e-commerce component for MODX Revolution.

![](https://file.modx.pro/files/b/c/f/bcfbd29cf5841b32268b499918a39e86.png)

The component extends native MODX resources, including standard page interaction, permissions, processors, and create/edit functionality.

You get two new resource types:

## Product category

![](https://file.modx.pro/files/0/7/e/07ebf3fae30d22d1010ee9d817466b0e.png)

## Product page

![](https://file.modx.pro/files/1/6/3/1630ce8451bd182c60749cc824a8c80e.png)

Pages are customizable. In miniShop settings you can choose which fields to show in the category product table and on the product edit page.

Product tabs and category table remember their state. You can refresh and switch around; they stay as you left them.

The top-right buttons are reworked: quick navigation to adjacent resources, quick delete/publish. Icons use Bootstrap glyphicons.

Multi-categories in miniShop are shown as a tree for easier use.

![](https://file.modx.pro/files/4/b/b/4bb6f97595cacc72fb73e51f51e4e263.png)

Products support a set of parameters of different types. You can add fields via special plugins and components.

![](https://file.modx.pro/files/a/7/c/a7caf8816b9975d414c6b32dbcf38dbf.png)

### Product gallery

miniShop2 has its own product image management.

![](https://file.modx.pro/files/4/c/e/4ce58fdd74b771db28969aba8975ab11.png)

- HTML5 uploader with drag-n-drop.
- Works with MODX media resources.
- Automatic thumbnail generation (size, quality, crop, zoom).
- Watermarks.
- Image conversion to jpg, png, webp.
- Edit name and description.
- Drag-and-drop sort. First image is the main product image.

You can set parameters in the file source settings (MS2 has its own). You can regenerate thumbnails for all product images when parameters change.

## Frontend

MiniShop2 uses only its own MODX snippets via pdoTools for better speed and customization. You can rename snippets, change logic, and reuse them. pdoTools keeps customization straightforward.

Included MODX snippets: images, product catalog, options, cart. See the docs for each snippet and examples.

Styles and scripts are loaded automatically. Initial MODX Revo store setup takes about 10 minutes.
