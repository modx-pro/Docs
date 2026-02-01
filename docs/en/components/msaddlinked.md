---
title: msAddLinked
description: Adding related products as options with price increase
logo: https://modstore.pro/assets/extras/msaddlinked/logo-lg.png
author: mvoevodskiy
modstore: https://modstore.pro/packages/integration/msaddlinked

dependencies: miniShop2
---

# msAddLinked

## Description

Add related products as extra options with an increase in the added product's price. In any add-to-cart form you can show extra products that are added as options and increase the price. In the cart and in emails, added options are shown next to the product.

::: warning Important
The related list only shows products for which the current product (or the product passed to *msAddLinked.input*) is the main product in the relation.
:::

## Snippet msAddLinked.input

Outputs the list of related products and input fields. By default checkboxes are used; in theory any *input* type is possible. Types `text` and `number` are tested: entering a number there adds that quantity of options to the product in the cart.

### msAddLinked.input parameters

| Name               | Default              | Description                                                                                       |
|--------------------|----------------------|---------------------------------------------------------------------------------------------------|
| **&tpl**           | `tpl.msAddLinked.input` | Chunk for output                                                                               |
| **&product**       | `0` (current product) | ID of the main product                                                                         |
| **&link**          | `0` (all relations)  | Relation ID                                                                                       |
| **&inputType**     | `checkbox`           | Input type for each related product                                                              |
| **&priceTarget**   | `#price`             | HTML selector for the updated price                                                              |
| **&priceOrigTarget** | `#msal_price_original` | HTML selector for the original price                                                          |
| **&fieldName**     | `pagetitle`         | Resource field for the displayed name                                                             |
| **&toPlaceholder** | `0`                  | If set, result is saved to this placeholder instead of output                                     |

## Snippet msAddLinked.info

Outputs the list of options added to the product in the cart and in emails.

### msAddLinked.info parameters

| Name        | Default                | Description                                           |
|-------------|------------------------|-------------------------------------------------------|
| **&tpl**    | `tpl.msAddLinked.input`| Chunk for output                                      |
| **&option** | `{}`                   | Option value (linked products) as JSON               |
| **&fieldName** | `pagetitle`         | Resource field for the displayed name                 |

Example call:

```modx
[[!msAddLinked.info? &option=`[[+option.msal]]`]]
```

In Fenom:

```fenom
{$_modx->runSnippet('msAddLinked.info', ['option' => $product.options.msal])}
```

If the cart shows other product options, replace this block:

```fenom
{foreach $product.options as $option}
  {var $options = $options ~ $option ~ '; '}
{/foreach}
```

with:

```fenom
{foreach $product.options as $k => $option}
  {if $k != 'msal'}
    {var $options = $options ~ $option ~ '; '}
  {/if}
{/foreach}
```

Standard options are shown like this:

```fenom
<div class="small">
  {$product.options | join : '; '}
</div>
```

To avoid raw JSON in output, wrap like this:

```fenom
{if $product.options.msal?}
  {var $msal = $product.options.msal}
  {unset $product.options.msal}
{/if}
<div class="small">
  {$product.options | join : '; '}
</div>
{if $msal?}
  {$_modx->runSnippet('msAddLinked.info', ['option' => $msal])}
  {unset $msal}
{/if}
```

## System settings

| Name               | Default                  | Description                    |
|--------------------|--------------------------|--------------------------------|
| **&msal_frontend_js** | `[[+jsUrl]]web/default.js` | Path to JS file             |
| **&msal_variable** | `msal`                    | Option variable name          |
