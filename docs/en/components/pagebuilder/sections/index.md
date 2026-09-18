---
title: "Section catalog"
description: "Built-in PageBuilder section blocks Free and Pro"
---

# Section catalog

Built-in blocks for pages in the MODX manager: pick a type, fill fields in the inspector, reorder blocks on the resource.

Every section in the tables below has a page: why to use the block, its fields, and similar alternatives.

The key (`key`) goes into the PageBuilder snippet and document JSON. Add custom types via the control panel (Pro) or plugin on `pbOnRegisterSectionDefinitions`.

<!-- ![Section catalog in manager](/components/pagebuilder/screenshots/mgr-section-catalog.png) -->

## Free: content and layout (10)

| key | Section | Category | Requirements |
| --- | --- | --- | --- |
| `contact` | [Contact](contact) | conversion | — |
| `cta` | [Call to action](cta) | conversion | — |
| `faq` | [FAQ](faq) | content | — |
| `gallery` | [Gallery](gallery) | media | authoring: Pro; runtime in Free |
| `hero` | [Hero](hero) | hero | — |
| `richtext` | [Rich text](richtext) | content | — |
| `spacer` | [Spacer](spacer) | layout | — |
| `stats` | [Stats](stats) | trust | — |
| `testimonials` | [Testimonials](testimonials) | trust | — |
| `video` | [Video](video) | media | — |

## Free: utility (2)

| key | Section | Requirements |
| --- | --- | --- |
| `cards` | [Cards](cards) | — |
| `image` | [Image](image) | — |

## Pro

| key | Section | Category | Requirements |
| --- | --- | --- | --- |
| `blog_posts` | [Blog posts](blog_posts) | content | pro |
| `brands_row` | [Brands row](brands_row) | shop | pro, minishop3 |
| `categories_row` | [Categories row](categories_row) | shop | pro, minishop3 |
| `contact_form` | [Contact form](contact_form) | conversion | pro, FetchIt |
| `contact_map` | [Contact with map](contact_map) | conversion | pro |
| `curated_products` | [Curated products](curated_products) | shop | pro, minishop3 |
| `data_table` | [Data table](data_table) | content | pro |
| `features` | [Features](features) | content | pro |
| `gallery_carousel` | [Gallery carousel](gallery_carousel) | media | pro |
| `logos` | [Partner logos](logos) | trust | pro |
| `map` | [Map](map) | media | pro |
| `pricing_table` | [Pricing table](pricing_table) | conversion | pro |
| `product_comparison` | [Product comparison](product_comparison) | shop | pro, minishop3 |
| `product_spotlight` | [Product spotlight](product_spotlight) | shop | pro, minishop3 |
| `products_carousel` | [Products carousel](products_carousel) | shop | pro, minishop3 |
| `products_grid` | [Products grid](products_grid) | shop | pro, minishop3 |
| `promo_banner` | [Promo banner](promo_banner) | shop | pro, minishop3 |
| `quiz` | [Quiz](quiz) | conversion | pro, FetchIt |
| `related_products` | [Related products](related_products) | shop | pro, minishop3 |
| `spec_table` | [Spec table](spec_table) | content | pro |
| `structured_content` | [Structured content](structured_content) | content | pro |
| `tabs` | [Tabs](tabs) | content | pro |
| `team` | [Team](team) | trust | pro |
| `accordion` | [Accordion](accordion) | content | pro |
| `before_after` | [Before / After](before_after) | media | pro |
| `case_study` | [Case study](case_study) | content | pro |
| `downloads` | [Downloads](downloads) | content | pro |
| `dynamic_list` | [Dynamic list](dynamic_list) | content | pro, `datasources` |
| `filterable_grid` | [Filterable grid](filterable_grid) | content | pro, `datasources` |
| `form_builder` | [Form builder](form_builder) | conversion | pro, `forms`, FetchIt |
| `how_it_works` | [How it works](how_it_works) | content | pro |
| `locations` | [Locations](locations) | content | pro |
| `media_split` | [Media + text](media_split) | content | pro |
| `newsletter` | [Newsletter](newsletter) | conversion | pro |
| `notice` | [Notice](notice) | content | pro |
| `portfolio` | [Portfolio](portfolio) | content | pro |
| `quote` | [Quote](quote) | content | pro |
| `timeline` | [Timeline](timeline) | content | pro |

Commerce sections require **miniShop3**. Without the package `SectionRequirementChecker` removes them from the catalog. Override the check via `pbOnCheckSectionRequirement`.

`quiz` and `contact_form` sections need **FetchIt** on the storefront (separate install).

Product sections (`products_grid`, `product_spotlight`, `promo_banner`) render via **msProducts**. Categories render via **pdoResources** with class `msCategory`.

[Newsletter](newsletter) is an HTML form that posts to an external `action_url`. It is not FetchIt. [Accordion](accordion) renders `<details>` with no JavaScript. [Form builder](form_builder) requires capability `forms`. [Dynamic list](dynamic_list) and [filterable grid](filterable_grid) require `datasources`. Those three types are part of the page context so the HTML cache does not freeze them.

Types that call `runSnippet` in the chunk (`products_*`, `product_*`, `promo_banner`, `blog_posts`, `categories_row`, `data_table`) are marked `"cacheable": false`. The document HTML cache does not freeze them.

## Related pages

- [Developer](../developer)
- [Field type reference](../fields/types)
- [Frontend output](../frontend)
- [Manager and events](../integration)
