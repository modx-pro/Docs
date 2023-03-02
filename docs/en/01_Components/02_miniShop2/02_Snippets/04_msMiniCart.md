The simple snippet for cart current status display.

![](https://file.modx.pro/files/f/a/3/fa36fb44f79cf689e7f8f9e7a577931f.png)

## Parameters

Parameter           | By default    | Description
--------------------|---------------|---------------------------------------------
**tpl**             | tpl.msMiniCart    | Formatting chunk

## Formatting
Snippet counts on the work with [chunk Fenom][1]. It transfers the cart status of the user's session there.
As usual there are:
- **total_count** - total number of goods in the cart
- **total_cost** - total cost of the goods in the cart

*These data are subject to change, if the expanded cart class is used*

Standard chunk contains two element blocks with `empty` and `not_empty` classes, displayed for different cart statuses accordingly.


[1]: /en/01_Components/01_pdoTools/03_Parser.md
