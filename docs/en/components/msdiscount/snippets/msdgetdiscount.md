# msdGetDiscount

Snippet for outputting a product's discount and/or promotion end time.

Can be used as **prepareSnippet in msProducts** or standalone on a page. In the first case it adds two placeholders to the product: `[[+sale_discount]]` (discount amount) and `[[+remains]]` (seconds until promotion end). In the second it outputs a chunk with those placeholders.

## Parameters

| Name            | Default                         | Description                                                    |
|-----------------|----------------------------------|----------------------------------------------------------------|
| **&id**         |                                  | Product ID for discount and promotion time.                   |
| **&sale**       |                                  | Comma-separated promotion IDs. If empty, no promotion filter.  |
| **&tpl**        | `tpl.msProduct.discount`        | Chunk for output.                                              |
| **&frontend_css**| `[[+assetsUrl]]css/web/main.css` | Frontend CSS.                                                  |
| **&frontend_js** | `[[+assetsUrl]]js/web/default.js`| Frontend JS.                                                   |

## Examples

The snippet chooses its mode from the call parameters.

On product page:

```modx
[[!msdGetDiscount]]
```

Elsewhere with parameters:

```modx
[[!msdGetDiscount?
  &id=`15`
  &sale=`1,2,3,4,5`
]]
```

As prepare snippet in msProducts:

```modx
<link rel="stylesheet" href="[[++assets_url]]components/msdiscount/css/web/main.css" type="text/css" />
[[!msProducts?
  &parents=`0`
  &prepareSnippet=`msdGetDiscount`
  &tpl=`@INLINE
    <div class="row ms2_product">
      <a href="{{+link}}">{{+pagetitle}}</a>
      <span class="price">{{+price}} {{%ms2_frontend_currency}}{{+remains}}</span>
    </div>
    <!--minishop2_remains -{{+sale_discount}} — <span class="msd_remains">{{+remains}}</span>-->
    <!--minishop2_!remains -{{+sale_discount}}-->
  `
]]
<script type="text/javascript" src="[[++assets_url]]components/msdiscount/js/web/default.js"></script>
```

This outputs all products with discount and time left (if any). For promotion-only listing use [msdBuyNow][1].

[1]: /en/components/msdiscount/snippets/msdbuynow
