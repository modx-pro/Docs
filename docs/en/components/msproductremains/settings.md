# Component settings

## General settings

| Name                     | Default                                                 | Description                                                                                     |
| ------------------------ | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **mspr_options**         | `color,size`                                            | Product attributes used to build remains                                                       |
| **mspr_order_status**    | `1`                                                     | Order status ID at which stock is decreased                                                     |
| **mspr_orderback_status**| `4`                                                     | Order status ID at which previously deducted stock is restored                                   |
| **mspr_product_grid_fields** | `id,color,size,remains`                             | Remains table columns on the product edit page                                                 |
| **mspr_remains_default**| `0`                                                     | Default remains when creating a product or adding new attributes                                |
| **mspr_remains_grid_fields** | `id,product_id,pagetitle,color,size,price,published,remains` | Columns on the shared remains edit page                    |

## Site

| Name                | Default                               | Description                                                                                      |
| ------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **mspr_front_js**   | `[[+assetsUrl]]js/web/msproductremains.js` | Path to JavaScript file for the frontend                                                  |
| **mspr_hide_count** | `No`                                  | Hide actual product count on the frontend                                                        |
| **mspr_moreless_count** | `10`                              | Quantity below which to show "running low". Only when **mspr_hide_count** is enabled             |

## Sync

| Name             | Default   | Description                                                                                      |
| ---------------- | --------- | ----------------------------------------------------------------------------------------------- |
| **mspr_msync_field** | `Quantity` | Field name for remains in 1C when syncing products with mSync                                   |

## Feature toggles

| Name                     | Default | Description                                                                                      |
| ------------------------ | ------- | ----------------------------------------------------------------------------------------------- |
| **mspr_active**          | `Yes`   | Enable the component                                                                            |
| **mspr_active_babel**    | `Yes`   | Enable Babel support; use web context remains for other contexts                                |
| **mspr_active_before_add**   | `Yes` | Check remains before adding to cart or changing quantity                                        |
| **mspr_active_before_order** | `Yes` | Check remains before saving the order                                                           |
| **mspr_active_bcstatus** | `Yes`   | Check remains before changing order status                                                      |
| **mspr_check_options**   | `Yes`   | Require selected attributes when adding to cart                                                 |
