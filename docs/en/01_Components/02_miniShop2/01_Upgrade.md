Instructions for updating minor versions of miniShop2.

## From 2.2 to 2.4

The main difference between 2.4 and 2.2, which can affect the functional of the working site, is the use of chunks 
[Fenom][1] **in all snippets**. Therefore, when updating the component, you must **necessarily** update your chunks.

The general sense is that instead of 2-3 chunks of output of results, now one is used.

For example, before the design of the basket, 3 chunks were required:
- **tpl.msCart.outer** - Header and cellar of the product table, in the middle of the tag `[[+ goods]]` for substituting goods
- **tpl.msCart.row** - Chunk of goods, which are substituted in `[[+ goods]]`
- **tpl.msCart.empty** - Empty cart chunk

As many as 3 chunks for the design of one snippet itself is not very convenient, given that in ms2 there are **8 snippets**,
moreover, the processing of each product separately takes extra time.

Previously, there was nothing to be done about it, but the latest versions of pdoTools include a wonderful templating engine Fenom,
which allows you to make all the design of the snippet in one chunk.

Therefore, since version 2.4, the basket has only one chunk:
- **tpl.msCart** - The main chunk of the cart

It contains the entire table, and the goods it processes in a cycle:
```
{foreach $products as $product}
    {$product | print} <!-- print all product properties for debug-->
{/foreach}
```
All the necessary data comes in arrays that need to be parsed using the Fenom syntax.

In this case, the chunk for an empty basket is also not needed, since the quantity of goods can be verified very simply:
```
{if count($products) == 0}
    <!-- empty cart message -->
    {'ms2_cart_is_empty' | lexicon}
{else}
    <!-- list products -->
{/if}
```

All details about the work of snippets and their variables and placeholders will be translated later. 
For now you can try to read [Russian vesion][2].

### Emails templates
For emails, the Fenom template extension mechanism is used.

That is, complete with miniShop2 there is one chunk `tpl.msEmail` with a default letter template, which is divided into 
semantic blocks. Other letters expand this chunk and change the blocks they need.
- **logo** - Store logo with link to main page
- **title** - The title of the letter
- **products** - Table with ordered products
- **footer** - Link on the site in the footer of the letter

This makes it very easy to modify letters of different order statuses.
For example, a letter with a new order to the buyer looks like this:
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
As you can see, here the main template is inherited, the header changes, and a reference to the payment (if any) 
is added to the product table.

[![](https://file.modx.pro/files/7/a/c/7ac00ca1c44088260da560463c21025bs.jpg)](https://file.modx.pro/files/7/a/c/7ac00ca1c44088260da560463c21025b.png)

All messages are prepared with a snippet **msGetOrder**.
More information about the expansion of templates you can read in [Fenom docs][3].

### System settings

Deleted settings:
- **ms2_product_vertical_tabs** - There are no more vertical goods, only horizontal ones.
- **ms2_category_remember_grid** - Setting how to save the status of the category tables with the goods in the cookie.
Now the status of all tables is generic and is saved in `modRegistry` automatically.
- **ms2_product_main_fields** - On the main product page, only the `modResource` fields are now, so this setting is not needed.
When upgrading from older versions of miniShop2, the product fields from this setting are copied to **ms2_product_extra_fields**.
- **ms2_price_snippet** - Snippet for formatting the price of the goods. Use the plugin to the event `msOnGetProductPrice`.
- **ms2_weight_snippet**- Snippet for formatting the weight of the goods. Use the plugin to the event `msOnGetProductWeight`.

Added settings:
- **ms2_template_category_default** - Setting to specify the default category template.
- **mgr_tree_icon_mscategory** - Icon of product categories in the resource tree.
- **mgr_tree_icon_msproduct** - Icon of goods in the resource tree.

Changed settings:
- **ms2_category_content_default** - The content of the new product is now empty by default.

## From 2.2 to 2.3

The development of miniShop 2.3 has been canceled, so look at the upgrade to version 2.4.


[1]: /en/01_Components/01_pdoTools/03_Parser.md
[2]: /ru/01_Компоненты/02_miniShop2/02_Сниппеты
[3]: https://github.com/fenom-template/fenom/blob/master/docs/en/tags/extends.md
