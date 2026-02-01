# pas.get.order

Snippet that outputs the completed order `pas.get.order`

Used on the checkout page.

## Parameters

| Parameter          | Default       | Description                                                                                                                                                    |
|--------------------|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **tpl**            | `pas.get.order` | Output chunk                                                                                                                                                   |
| **includeTVs**     |               | Comma-separated list of TV names to include. E.g. "action,time" yields placeholders `[[+action]]` and `[[+time]]`.                                            |
| **includeThumbs**  |               | Comma-separated list of thumbnail sizes. E.g. "120x90,360x240" yields `[[+120x90]]` and `[[+360x240]]`. Images must exist in the product gallery.              |

::: tip
You can also use other [general pdoTools parameters][0104]
:::

## Output

The snippet works with a [Fenom chunk][010103] and passes 7 variables:

- `order` — order data array from the `msOrder` object
- `products` — ordered products array with all properties
- `user` — data from `modUser` and `modUserProfile` with all customer properties
- `address` — delivery data from the `msAddress` object
- `delivery` — selected delivery properties from `msDelivery`
- `payment` — selected payment properties from `msPayment`
- `total` — order totals:
  - `cost` — total order cost
  - `cart_cost` — products cost
  - `delivery_cost` — delivery cost
  - `cart_count` — number of products

*Data passed when calling the snippet may also be present. E.g. the email output chunk may include a `payment_link` variable.*

### Placeholders

To see all available order placeholders, use an empty chunk:

```fenom
<pre>
  {'!pas.get.order' | snippet: [
    'tpl' => '',
  ]}
</pre>
```

## Creating an order

This snippet should be used together with others on the checkout page:

```fenom
{'!pas.order' | snippet} <!-- Order form, hidden after order is created -->
{'!pas.get.order' | snippet} <!-- Order info output, shown after order is created -->
```

## Email output

Email notifications to customers use the [msGetOrder][01020205] snippet if you enabled them in [status settings][01020104].

By default all emails extend one base template `tpl.msEmail` and override its blocks:

- `logo` — store logo with link to the home page
- `title` — email subject
- `products` — order products table
- `footer` — site link in the email footer

Content orders can be identified by the order `context` field; you can then format that order data as needed.
For example, replace the `products` variable from msGetOrder with `products` from pas.get.order:

```fenom
{var $pas = $order.context == 'pas'}
{if $pas}
  {var $tmp = '!pas.get.order' | snippet: [
    'msorder' => $order.id,
    'return' => 'data',
  ]}
  {set $products = $tmp.products}
{/if}
```

We run the `pas.get.order` snippet and replace the `products` variable.
Depending on your site, you can override the `tpl.msEmail` template like this:

```fenom
{var $pas = $order.context == 'pas'}
{if $pas}
  {var $tmp = '!pas.get.order' | snippet: [
    'msorder' => $order.id,
    'return' => 'data',
  ]}
  {set $products = $tmp.products}
{/if}

{var $style = [
  'logo' => 'display:block;margin: auto;',
  'a' => 'color:#348eda;',
  'p' => 'font-family: Arial;color: #666666;font-size: 12px;',
  'h' => 'font-family:Arial;color: #111111;font-weight: 200;line-height: 1.2em;margin: 40px 20px;',
  'h1' => 'font-size: 36px;',
  'h2' => 'font-size: 28px;',
  'h3' => 'font-size: 22px;',
  'th' => 'font-family: Arial;text-align: left;color: #111111;',
  'td' => 'font-family: Arial;text-align: left;color: #111111;',
]}

{var $site_url = ('site_url' | option) | preg_replace : '#/$#' : ''}
{var $assets_url = 'assets_url' | option}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{'site_name' | option}</title>
  </head>
  <body style="margin:0;padding:0;background:#f6f6f6;">
    <div style="height:100%;padding-top:20px;background:#f6f6f6;">
      {block 'logo'}
        {if !$pas}
          <a href="{$site_url}">
            <img style="{$style.logo}"
                src="{$site_url}{$assets_url}components/minishop2/img/web/ms2_small@2x.png"
                alt="{$site_url}"
                width="120" height="90"/>
          </a>
        {/if}
      {/block}
      <!-- body -->
      <table class="body-wrap" style="padding:0 20px 20px 20px;width: 100%;background:#f6f6f6;margin-top:10px;">
        <tr>
          <td></td>
          <td class="container" style="border:1px solid #f0f0f0;background:#ffffff;width:800px;margin:auto;">
            <div class="content">
              <table style="width:100%;">
                <tr>
                  <td>
                    <h3 style="{$style.h}{$style.h3}">
                      {block 'title'}
                        {if !$pas}
                          miniShop2
                        {else}
                          PayAndSee
                        {/if}
                      {/block}
                    </h3>

                    {block 'products'}
                      {if !$pas}
                        <table style="width:90%;margin:auto;">
                          <thead>
                            <tr>
                              <th>&nbsp;</th>
                              <th style="{$style.th}">{'ms2_cart_title' | lexicon}</th>
                              <th style="{$style.th}">{'ms2_cart_count' | lexicon}</th>
                              <th style="{$style.th}">{'ms2_cart_weight' | lexicon}</th>
                              <th style="{$style.th}">{'ms2_cart_cost' | lexicon}</th>
                            </tr>
                          </thead>
                          {foreach $products as $product}
                            <tr>
                              <td style="{$style.th}">
                                {if $product.thumb?}
                                  <img src="{$site_url}{$product.thumb}"
                                      alt="{$product.pagetitle}"
                                      title="{$product.pagetitle}"
                                      width="120" height="90"/>
                                {else}
                                  <img src="{$site_url}{$assets_url}components/minishop2/img/web/ms2_small@2x.png"
                                      alt="{$product.pagetitle}"
                                      title="{$product.pagetitle}"
                                      width="120" height="90"/>
                                {/if}
                              </td>
                              <td style="{$style.th}">
                                {if $product.id?}
                                  <a href="{$product.id | url : ['scheme' => 'full']}"
                                    style="{$style.a}">
                                      {$product.name}
                                  </a>
                                {else}
                                  {$product.name}
                                {/if}
                                {if $product.options?}
                                  <div class="small">
                                    {$product.options | join : '; '}
                                  </div>
                                {/if}
                              </td>
                              <td style="{$style.th}">{$product.count} {'ms2_frontend_count_unit' | lexicon}</td>
                              <td style="{$style.th}">{$product.weight} {'ms2_frontend_weight_unit' | lexicon}</td>
                              <td style="{$style.th}">{$product.price} {'ms2_frontend_currency' | lexicon}</td>
                            </tr>
                          {/foreach}
                          <tfoot>
                            <tr>
                              <th colspan="2"></th>
                              <th style="{$style.th}">
                                {$total.cart_count} {'ms2_frontend_count_unit' | lexicon}
                              </th>
                              <th style="{$style.th}">
                                {$total.cart_weight} {'ms2_frontend_weight_unit' | lexicon}
                              </th>
                              <th style="{$style.th}">
                                {$total.cart_cost} {'ms2_frontend_currency' | lexicon}
                              </th>
                            </tr>
                          </tfoot>
                        </table>
                        <h3 style="{$style.h}{$style.h3}">
                          {'ms2_frontend_order_cost' | lexicon}:
                          {if $total.delivery_cost}
                            {$total.cart_cost} {'ms2_frontend_currency' | lexicon} + {$total.delivery_cost}
                            {'ms2_frontend_currency' | lexicon} =
                          {/if}
                          <strong>{$total.cost}</strong> {'ms2_frontend_currency' | lexicon}
                        </h3>
                      {else}
                        <table style="width:90%;margin:auto;">
                          <thead>
                            <tr>
                              <th style="{$style.th}">{'payandsee_content' | lexicon}</th>
                              <th style="{$style.th}">{'payandsee_term' | lexicon}</th>
                              <th style="{$style.th}">{'payandsee_cost' | lexicon}</th>
                            </tr>
                          </thead>
                          {foreach $products as $row}
                            <tr>
                              <td style="{$style.th}">
                                <h4><a href="{$row.content_resource | url: ['scheme' => 'full']}" style="{$style.a}">{$row.content_name}</a></h4>
                                {if $row.content_description}
                                  <div class="small">
                                    <small>{$row.content_description}</small>
                                  </div>
                                {/if}
                              </td>
                              <td style="{$style.th}">
                                {if $row.term_value?}
                                  <div class="small">
                                    {$row.term_value} - {$row.term_value | decl : (('payandsee_decl_date_' ~ $row.term_unit) | lexicon)}
                                  </div>
                                {/if}
                              </td>
                              <td style="{$style.th}">
                                {$row.cost} {'payandsee_unit_cost' | lexicon}
                              </td>
                            </tr>
                          {/foreach}
                          <tfoot>
                          </tfoot>
                        </table>
                        <h3 style="{$style.h}{$style.h3}">
                          {'payandsee_order_cost' | lexicon}:
                          {if $total.delivery_cost}
                            {$total.cart_cost} {'payandsee_unit_cost' | lexicon} + {$total.delivery_cost}
                            {'payandsee_unit_cost' | lexicon} =
                          {/if}
                          <strong>{$total.cost}</strong> {'payandsee_unit_cost' | lexicon}
                        </h3>
                      {/if}

                    {/block}
                  </td>
                </tr>
              </table>
            </div>
            <!-- /content -->
          </td>
          <td></td>
        </tr>
      </table>
      <!-- /body -->
      <!-- footer -->
      <table style="clear:both !important;width: 100%;">
        <tr>
          <td></td>
          <td class="container">
            <!-- content -->
            <div class="content">
              <table style="width:100%;text-align: center;">
                <tr>
                  <td align="center">
                    <p style="{$style.p}">
                      {block 'footer'}
                        <a href="{$site_url}" style="color: #999999;">
                          {'site_name' | option}
                        </a>
                      {/block}
                    </p>
                  </td>
                </tr>
              </table>
            </div>
            <!-- /content -->
          </td>
          <td></td>
        </tr>
      </table>
      <!-- /footer -->
    </div>
  </body>
</html>
```

The order `context` field is checked: for a store order you get products output, otherwise content subscriptions output.

More on extending templates: [Fenom documentation][001].

[0104]: /en/components/pdotools/general-properties
[010103]: /en/components/pdotools/parser
[01020205]: /en/components/minishop2/snippets/msgetorder
[01020104]: /en/components/minishop2/interface/settings
[001]: https://github.com/fenom-template/fenom/blob/master/docs/ru/tags/extends.md
