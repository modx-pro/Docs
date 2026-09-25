---
title: Shop landing
description: "One page: hero, miniShop3 categories and products, a resource list, FAQ, and a form. Pro layer"
---

# Shop page: sections, a list, and miniShop3

Result: one page with a first screen, a row of subcategories, a product grid, a list of posts, two questions, and a form. The draft is not public. The resource **Save** button publishes the page. The **Sections** tab has no separate Publish button.

A page without a shop uses Free sections: [Landing](landing).

## Before you start

1. The MODX resource is published. An unpublished resource does not open the page.
2. The template contains uncached `[[!PageBuilder]]`.
3. PageBuilder Pro, miniShop3, and FetchIt are installed.
4. Shop sections require miniShop3 (`requires: ["pro", "minishop3"]`). The list needs capability `datasources`.

## Steps

1. Open the resource and the **Sections** tab.
2. **Add section** and pick, top to bottom: `hero`, `categories_row`, `products_grid`, `dynamic_list`, `faq`, `contact_form`.
3. Fill the fields in **Properties**. Parent ids below are examples. Use your own resource ids.
4. Click **Save** on the resource. The editor validates fields and writes `published_json`.
5. Open the page on the site.

## Example fields

Hero. Title `Catalog`. Button label `Browse categories`, Button URL pointing at the category page. Alignment `left`. The button renders only when both the label and the URL are set.

`categories_row`. **Parent category** `101` (example). Children must be `msCategory` resources. **Limit** `6`. An empty limit becomes 8 in the chunk. No subcategories: lexicon `pagebuilder_fe_listing_empty_category` ("No subcategories in this category.").

`products_grid`. **Catalog root** `101` (example). The field is required. **Limit** `6`. An empty limit becomes 12 in the chunk. **Sort** `price_asc` or `popular`. An unknown value sorts as `menuindex`. An empty category: `pagebuilder_fe_listing_empty_products` ("No products in this category yet."). The section has `"cacheable": false`.

`dynamic_list`. Provider `modx-resources`. Filter `parent`, operator `eq`, value `5` (parent id, an example). Sort by `publishedon`, direction `desc`. Query limit is at most 100. The chunk receives `items` and `total`. An empty result: `pagebuilder_fe_list_empty`.

FAQ. Title `Delivery`. Two repeater rows: `question` and `answer`.

`contact_form`. **Form key** `shop_question`. In **Form fields**, two rows: `email` of type email and `phone` of type phone. Field name: `[a-z][a-z0-9_]*`.

## What to check

Subcategories are `msCategory` children of the parent you picked. Product cards show a photo, a price, and an Add to cart button. A newly published child resource shows up in the list without editing the section JSON. The form submits through FetchIt. Without FetchIt the section prints `pagebuilder_fe_form_unavailable`.

## Rollback

Move the section to the page trash. The draft stays.

## See also

- [Landing](landing)
- [Categories row](../sections/categories_row)
- [Products grid](../sections/products_grid)
- [Dynamic list](../sections/dynamic_list)
- [Contact form](../sections/contact_form)
