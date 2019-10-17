Snippet for formed order display.

Is used on ordering page and for mailing notification to customers.

## Parameters

Parameter           | By default    | Description
--------------------|---------------|---------------------------------------------
**tpl**             | tpl.msGetOrder| Formatting chunk
**includeTVs**      |               | List of TV parameters for sampling, separated by commas. For example: "action,time" is given by [[+action]] and [[+time]] placeholders.
**includeThumbs**   |               | List of sample preview dimensions, separated by commas. For example: "120x90,360x240" is given by [[+120x90]] and [[+360x240]] placeholders. The pictures should be pre-generated in item s gallery.
**toPlaceholder**   |               | If filled, the snippet will store all data in placeholder with this name, instead of displaying.
**showLog**         |               | To show additional information on snippet operation. For authorized in "mgr" context only.

*Another [pdoTools generalparameters][1] may be also used*

## Formatting
Snippet counts on work with [chunk Fenom][2] and transfers 7 variables there:
- **order** - order data array from `msOrder`object
- **products** - ordered goods array with all their properties
- **user** - data array of `modUser` and `modUserProfile`objects with all customer's characteristics
- **address** - data array of `msAddress` object with delivery data
- **delivery** - array of selected delivery characteristics of`msDelivery` object
- **payment** - array of selected payment characteristics of`msPayment`object
- **total** - totals order array:
    - **cost** - total order cost
    - **weight** - total order weight
    - **delivery_cost** - separate delivery cost
    - **cart_cost** - separate ordered goods cost
    - **cart_weight** - total weight of the ordered goods
    - **cart_count** - ordered goods number

*Data, transferred when calling snippet, may also be present.
Foe example, the variable`payment_link`* may be in new letter formatting chunk

### Placeholders
All available order placeholders may be seen when displaying empty chunk:
```
<pre>[[!msGetOrder?tpl=``]]</pre>
```

[![](https://file.modx.pro/files/3/a/9/3a922d1321d8f853aada28c176b21767s.jpg)](https://file.modx.pro/files/3/a/9/3a922d1321d8f853aada28c176b21767.png)

## Order creation
It is recommended to call this snippet in junction with the others on ordering page:
```
[[!msCart]] <!-- Cart view and change, hidden after order creation -->

[[!msOrder]] <!-- Ordering form, hidden after order creation -->

[[!msGetOrder]] <!-- Order information display, showed after its creation -->
```

## Writing letters
This snippet  is used by miniShop2 class for writing mail notification to customers, if you switch on such sending in [status settings][3].
All `msGetOrder` snippet variables: **order**, **products**, **user**, **address**, **delivery**, **payment** and **total** are also available in letters of mail notifications.

All the letters expand single basic mail template **tpl.msEmail** and change its blocks by default:
- **logo** - logo of the shop with home page reference
- **title** - letter title
- **products** - ordered goods table
- **footer** - site reference in letter footage

For example, the letter with new customer's order, is:
```
{extends 'tpl.msEmail'}

{block 'title'}
    {'ms2_email_subject_new_user' | lexicon : $order}
{/block}

{block 'products'}
    {parent}
    {if $payment_link?}
        <p style="margin-left:20px;{$style.p}">
            {'ms2_payment_link' | lexicon : ['link' => $payment_link]}
        </p>
    {/if}
{/block}
```
As you can see, the main template is inherited, the title is changed, and payment reference is added to the table of goods (if any).

[![](https://file.modx.pro/files/b/1/c/b1c563c0b075caf2afce7609ac3f15e4s.jpg)](https://file.modx.pro/files/b/1/c/b1c563c0b075caf2afce7609ac3f15e4.png)

More details of template expanding you may find in [Fenom documentation][4].

[1]: /en/01_Components/01_pdoTools/04_General_parameters.md
[2]: /en/01_Components/01_pdoTools/03_Parser.md
[3]: /en/01_Components/02_miniShop2/01_Interface/04_Settings.md
[4]: https://github.com/fenom-template/fenom/blob/master/docs/ru/tags/extends.md
