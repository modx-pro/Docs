---
title: "Section catalog"
description: "Built-in PageBuilder section blocks (Free and Pro)"
---

# Section catalog

Built-in blocks for pages in the MODX manager: pick a type, fill fields in the inspector, reorder blocks on the resource.

Each section has its own page: why to use the block, where to place it, example section order on a page, and similar alternatives.

The `key` is passed to the PageBuilder snippet and document JSON. Register custom types via CMP (Pro) or a plugin on `pbOnRegisterSectionDefinitions`.

<!-- ![Section catalog in the manager](/components/pagebuilder/screenshots/mgr-section-catalog.png) -->

## Free: content and layout (9)

| key | Section | Category | requires |
| --- | --- | --- | --- |
| `contact` | [Contact](contact) | conversion | — |
| `cta` | [Call to action](cta) | conversion | — |
| `faq` | [FAQ](faq) | content | — |
| `gallery` | [Gallery](gallery) | media | — |
| `hero` | [Hero](hero) | hero | — |
| `richtext` | [Rich text](richtext) | content | — |
| `spacer` | [Spacer](spacer) | layout | — |
| `stats` | [Stats](stats) | social proof | — |
| `testimonials` | [Testimonials](testimonials) | social proof | — |

## Free: utility (2)

| key | Section | requires |
| --- | --- | --- |
| `cards` | [Cards](cards) | — |
| `image` | [Image](image) | — |

## Pro

| key | Section | Category | requires |
| --- | --- | --- | --- |
| `blog_posts` | [Blog posts](blog_posts) | content | pro |
| `brands_row` | [Brands row](brands_row) | commerce | pro, minishop3 |
| `categories_row` | [Categories row](categories_row) | commerce | pro, minishop3 |
| `contact_form` | [Contact form](contact_form) | conversion | pro |
| `contact_map` | [Contact with map](contact_map) | conversion | pro |
| `curated_products` | [Curated products](curated_products) | commerce | pro, minishop3 |
| `data_table` | [Data table](data_table) | content | pro |
| `features` | [Features](features) | content | pro |
| `gallery_carousel` | [Gallery carousel](gallery_carousel) | media | pro |
| `logos` | [Logo cloud](logos) | social proof | pro |
| `map` | [Map](map) | media | pro |
| `pricing_table` | [Pricing table](pricing_table) | conversion | pro |
| `product_comparison` | [Product comparison](product_comparison) | commerce | pro, minishop3 |
| `product_spotlight` | [Product spotlight](product_spotlight) | commerce | pro, minishop3 |
| `products_carousel` | [Products carousel](products_carousel) | commerce | pro, minishop3 |
| `products_grid` | [Products grid](products_grid) | commerce | pro, minishop3 |
| `promo_banner` | [Promo banner](promo_banner) | commerce | pro, minishop3 |
| `related_products` | [Related products](related_products) | commerce | pro, minishop3 |
| `spec_table` | [Spec table](spec_table) | content | pro |
| `structured_content` | [Structured content](structured_content) | content | pro |
| `tabs` | [Tabs](tabs) | content | pro |
| `team` | [Team](team) | social proof | pro |
| `video` | [Video](video) | media | pro |

Commerce sections require **miniShop3**. Without the package, `SectionRequirementChecker` removes them from the catalog. Override the check via `pbOnCheckSectionRequirement`.

Product sections (`products_grid`, `product_spotlight`, `promo_banner`) are rendered by **msProducts**. Categories are rendered by **pdoResources** with class `msCategory`.

## Related pages

- [Developer](../developer)
- [Field types reference](../fields/types)
- [Frontend output](../frontend)
- [Manager and events](../integration)
