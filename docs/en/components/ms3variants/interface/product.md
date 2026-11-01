---
title: Variants tab on product
---
# Variants tab on product

## Where the tab is

The **Variants** tab is on the product card in the manager, after the built-in MiniShop3 tabs ("Product Properties", "Gallery", "Categories", "Links", "Product Options").

- When a product is being created, the tab is not there: save the product and open it again.
- The VueTools package is required. Without it the tab is not there, and the MODX error log gets the entry `[ms3Variants] VueTools not found`.

## Variant list

| Column | What it shows |
|--------|---------------|
| Active | Variant activity checkbox — see the warning below |
| Image | Variant image thumbnail |
| SKU | Variant SKU; empty — "-" |
| Options | Variant option values |
| Price | Price and old price; an empty old price is not shown |
| Stock | Variant stock |
| — | Edit and delete buttons |

Variants are listed in creation order; the order cannot be changed on the tab. The button with a circular arrow next to "Create Variant" reloads the list.

Below the list are "Total variants", "Active variants" and "Total stock". Total stock is counted over all variants, including inactive ones.

## Variant window

The **Create Variant** button opens the window for a new variant, the pencil button in a row opens an existing one.

| Field | Required | What to know |
|-------|----------|--------------|
| Options | on creation | At least one option. When editing, all options can be removed — the server does not forbid it, and the variant has no option label on the site |
| SKU | no | Not created automatically and not checked for uniqueness |
| Price | no | 0 by default |
| Old price | no | Price before discount |
| Stock | no | 0 by default |
| Weight | no | In MiniShop3 weight units. If above 0, replaces the cart item weight |
| Image | no | From the product gallery |
| Active | — | A new variant is always created active |

Save errors are shown in the window below the "Options" field:

| Message | When |
|---------|------|
| "At least one option is required" | When creating a variant without options |
| "Variant with these options already exists" | The same option set belongs to another active variant |
| "Variant not found" | The variant was deleted, for example in another browser tab |
| "Error" | The variant could not be written to the database — details in the MODX error log |

::: warning A variant cannot be turned off on the tab
The "Active" checkbox can be cleared both in the list and in the variant window, but after saving the variant stays active: the server receives the cleared checkbox as the string `false` and treats it as on. To take a variant off sale, set its stock to zero — with stock control on it cannot be bought — or delete the variant.
:::

::: warning Clearing the price or stock is not saved
If you erase the price or stock of an existing variant and save, the previous value stays, and an error is written to the MODX error log. To set zero, enter `0`.
:::

## Variant options

1. Select an option key in the drop-down list.
2. Enter a value — the list suggests values already set on products of the store, but any value can be entered.
3. Press "+" or Enter.

The key list contains options from the MiniShop3 option directory and keys already set on any products of the store, regardless of the category. A new key cannot be entered on the tab: create the option in MiniShop3 first.

A variant with the same set of options as another active variant of the product is not saved: "Variant with these options already exists". The combination is not compared with inactive variants.

When a variant is saved, its option values are added to the MiniShop3 product options, and values of options with the keys `color`, `size` and `tags` also go to the product data fields of the same name. When a variant is changed or deleted, old values are not removed from the product.

## Variant image

Click "Select from gallery" and choose an image. Only images from this product's gallery are available: upload them on the **Gallery** tab first. If the gallery is empty, the selection window shows "No images in gallery".

## Deleting a variant

Click the delete button in the row and confirm. Deletion cannot be undone.

Cart and order items with this variant stay. Order items keep the options and price at the time of purchase. If a customer changes the quantity of such an item in the cart, with stock control on they get "Variant is out of stock".

If deletion fails (for example, the variant was already deleted in another tab), there is no error message — reload the list with the circular arrow button and check.

## Changes on the site

An inactive variant is not output on the site and cannot be added to the cart. Items already in carts stay. Variant changes do not clear the page cache: if the snippet on the product page is called cached, clear the site cache — see [Snippets](../snippets).
