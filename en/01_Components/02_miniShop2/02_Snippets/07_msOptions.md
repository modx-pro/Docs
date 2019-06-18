Snippet for additional product characteristics display, stored as JSON.

These are `size`, `color` and  `tags` by default, but you may add others by [product model expansion][1].

[![](https://file.modx.pro/files/1/0/8/10862fe28a33bfa2894728e711afb61cs.jpg)](https://file.modx.pro/files/1/0/8/10862fe28a33bfa2894728e711afb61c.png)

## Parameters

Parameter           | By default    | Description
--------------------|---------------|---------------------------------------------
**tpl**             | tpl.msOptions | Formatting chunk
**product**         |               | Product identifier. If not indicated, the current document id is used.
**options**         |               | List of option for displaying, separated by commas.

## Formatting
The snippet counts on the work with [Fenom chunk][2] and transfers there only one variable `$options` with option array.

You may see all available placeholders by empty chunk indication:
```
<pre>
[[msOptions?
    &options=`color,size`
    &tpl=``
]]
</pre>
```

[![](https://file.modx.pro/files/f/a/c/fac9abd11c65a700d5ab2f5ff7cd075es.jpg)](https://file.modx.pro/files/f/a/c/fac9abd11c65a700d5ab2f5ff7cd075e.png)

Standard chunk is designed to display options in `select`, for sending to the cart along with the product.


[1]: /en/01_Components/02_miniShop2/03_Development/01_Product_plugins.md
[2]: /en/01_Components/01_pdoTools/03_Parser.md
