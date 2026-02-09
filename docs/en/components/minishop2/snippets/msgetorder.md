# msGetOrder

Snippet for displaying a completed order.

Used on the checkout page and for email notifications to customers.

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **id** | | Order id; if omitted, taken from `$_GET['msorder']`. |
| **tpl** | `tpl.msGetOrder` | Output chunk |
| **includeTVs** | | Comma-separated TV list. |
| **includeThumbs** | | Comma-separated thumbnail sizes. |
| **toPlaceholder** | | If set, save output to a placeholder instead of outputting. |
| **showLog** | | Show debug info. Only for users authorized in context "mgr". |

<!--@include: ../parts/tip-general-properties.md-->

## Output

The snippet expects a [Fenom chunk][2] and passes 7 variables:

- **order** — order data from `msOrder`
- **products** — order items with full product data
- **user** — customer data from `modUser` and `modUserProfile`
- **address** — delivery address from `msAddress`
- **delivery** — selected delivery from `msDelivery`
- **payment** — selected payment from `msPayment`
- **total** — order totals: **cost**, **weight**, **delivery_cost**, **cart_cost**, **cart_weight**, **cart_count**

Snippet parameters (e.g. **payment_link** in email chunks) are also available.

### Placeholders

To see all placeholders, use an empty chunk:

```modx
<pre>[[!msGetOrder?tpl=``]]</pre>
```

::: details Example

```php
Array
(
    [order] => Array ( [id] => 1, [num] => 2311/1, [cost] => 2100, [status] => 1, ... )
    [products] => Array ( [0] => Array ( [name] => Product 1, [count] => 3, [cost] => 1 500, ... ), ... )
    [user] => Array ( [fullname] => Ivan Ivanov, [email] => ..., ... )
    [address] => Array ( [receiver] => Ivan Ivanov, ... )
    [delivery] => Array ( [name] => Pickup, ... )
    [payment] => Array ( [name] => Cash, ... )
    [total] => Array ( [cost] => 2 100, [cart_count] => 4, ... )
)
```

:::

## Checkout

Use together with other snippets on the checkout page:

```modx
[[!msCart]] <!-- Cart; hidden after order is created -->

[[!msOrder]] <!-- Checkout form; hidden after order is created -->

[[!msGetOrder]] <!-- Order info; shown after order is created -->
```

## Email templates

This snippet is used by miniShop2 for email notifications if enabled in [order status settings][3].
All msGetOrder variables — **order**, **products**, **user**, **address**, **delivery**, **payment**, **total** — are available in email chunks.

By default all emails extend one base chunk **tpl.msEmail** and override blocks:

- **logo** — store logo with link to home
- **title** — email title
- **products** — order products table
- **footer** — site link in footer

Example: new order email to customer:

```fenom
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

Here the base template is extended, the title is set, and the payment link is added to the products block when present.

[![](https://file.modx.pro/files/b/1/c/b1c563c0b075caf2afce7609ac3f15e4s.jpg)](https://file.modx.pro/files/b/1/c/b1c563c0b075caf2afce7609ac3f15e4.png)

See [Fenom extends documentation][4] for more on template inheritance.

[2]: /en/components/pdotools/parser
[3]: /en/components/minishop2/interface/settings
[4]: https://github.com/fenom-template/fenom/blob/master/docs/ru/tags/extends.md
