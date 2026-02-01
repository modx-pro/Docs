# msExtraFields plugins

The plugin acts as a controller that connects system events with the classes and processors that handle them. It is responsible for:

- Building all extra settings in the manager and saving properties correctly (updating the current document’s property cache)
- Copying properties when duplicating documents
- Tracking product quantity changes in the cart and recalculating price and discounts
- Adding and handling custom TV parameters, and more

Because of how it works, some logic that would normally live in a snippet was moved into the plugin, and some parameters were moved with it.

| Name                    | Default                       | Description                                                                                                                                                             |
|-------------------------|-------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **&tplOrder_discountprice** | `@FILE: order/discountprice.tpl`   | Template for extra info shown when recalculating the client’s discount; receives price.                                                                                  |
| **&tplOrder_product_row**   | `@FILE: order/product_row.tpl`     | Template for a row in order history; receives value, measure, price, type.                                                                                             |
| **&tplOrder_product_wrap**  | `@FILE: order/product_wrap.tpl`    | Builds order history data; receives name and value.                                                                                                                     |
| **&tplPath**                | `[[+plugins]]msextrafields/chunks` | Path to chunk files. Uses `[[+plugins]]`. You can override **plugins** in the snippet settings or see it in msExtraFields. |

For msExtraFields to work correctly, event execution order matters. If you use other extras that also change variables and properties, you can change this priority, but it’s not recommended without understanding the full system.
