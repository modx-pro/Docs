Snippet is designed to display customer's cart.

[![](https://file.modx.pro/files/4/d/8/4d8ddea00da1c2ff10c94720ee26a588s.jpg)](https://file.modx.pro/files/4/d/8/4d8ddea00da1c2ff10c94720ee26a588.png)

## Parameters
Parameter           | By default    | Description
--------------------|---------------|---------------------------------------------
**tpl**             | tpl.msCart    | Formatting chunk
**includeTVs**      |               | List of TV parameters for  a sample, separated by commas. For example: "action,time" is given by placeholders [[+action]] and [[+time]].
**includeThumbs**   |               | List of preview dimensions for a sample, separated by commas. For example: "120x90,360x240" is given by placeholders [[+120x90]] and [[+360x240]]. Êàðòèíêè äîëæíû áûòü çàðàíåå ñãåíåðèðîâàíû â ãàëåðåå òîâàðà.
**toPlaceholder**   |               | If not empty, snippet will store all data in placeholder with this name, instead of display.
**showLog**         |               | To show additional information of the snippet operation. For authorized in "mgr" context only.

*Another [ pdoTools general parameters][1] may be used*

## Formatting
Snippet counts on work with Fenom chunk. It transfers there 2 variables:
- **total** - array of final cart values, in which:
    - **count** - number of goods
    - **cost** - price of goods
    - **weight** - total goods weight
- **products** - array of cart goods, where every product contains:
    - **key** - a key of the product in the cart, hash of its values and options
    - **count** - quantity of goods
    - **cost** - cost per unit of goods
    - **id** - goods identifier
    - **pagetitle** - title of the goods page
    - **uri** - product address
    - other product characteristics, including options, manufacturer's characteristics, etc.

### Placeholders
Simply indicating empty chunk, you may see all item characteristics and final values:
```
<pre>[[!msCart?tpl=``]]</pre>
```

[![](https://file.modx.pro/files/6/1/f/61f8ee92a1949258329e86d793896b96s.jpg)](https://file.modx.pro/files/6/1/f/61f8ee92a1949258329e86d793896b96.png)

Also [modifier print][2] may be used for debugging. Simply create chunk`TestCart` and indicate in it:
```
{$total | print}
{foreach $products as $product}
    {$product | print}
{/foreach}
```

Then call it in the cart:
```
[[!msCart?
    &tpl=`TestCart`
]]
```
And you will see all available placeholders.

## Order creation
It is recommended to call this snippet in junction with others in ordering page:
```
[[!msCart]] <!-- Review and change of the cart. Hidden after order creation -->

[[!msOrder]] <!-- Order form.Hidden after order creation -->

[[!msGetOrder]] <!-- Display of order information. Showed after order creation -->
```


[1]: /en/01_Components/01_pdoTools/04_General_parameters.md
[2]: /en/01_Components/01_pdoTools/03_Parser.md
