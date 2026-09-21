---
title: Products grid
description: "miniShop3 category cards through the products_grid section. Pro layer"
---

# Products grid

Result: the page shows cards with a photo, a price, and an Add to cart button. msProducts runs inside the chunk. The template does not need its own snippet call. Requires PageBuilder Pro and miniShop3 (`requires: ["pro", "minishop3"]`).

## Before you start

1. The resource is published and the template contains `[[!PageBuilder]]`.
2. miniShop3 is installed and the catalog has a category with products.
3. `products_grid` is in the **Blocks** catalog. If it is missing, check `requires`.

## Steps

1. Add a `products_grid` section.
2. In **Catalog root** pick a category. The field is required.
3. Set **Limit** and sort: `menuindex`, `popular`, `new`, `price_asc`, `price_desc`. An unknown value sorts as `menuindex`.
4. **Save** the resource.

## Example fields

**Catalog root** `101` (an example, use your category). **Limit** `6`. An empty limit becomes 12 in the chunk. **Sort** `price_asc`. For a "often bought" block use `popular`.

An empty category prints lexicon `pagebuilder_fe_listing_empty_products` ("No products in this category yet."). The section has `"cacheable": false`, so the page HTML cache does not freeze the listing.

A narrow strip uses `products_carousel`. A hand-picked SKU list uses `curated_products`.

## What to check

The site shows cards from the category you picked. Changing `sortby` to `price_asc` lists products by ascending price. An empty category prints the lexicon string, not a blank block.

## Rollback

Delete the section.

## See also

- [Products grid](../sections/products_grid)
- [Products carousel](../sections/products_carousel)
- [Curated products](../sections/curated_products)
- [Shop landing](shop-landing)
