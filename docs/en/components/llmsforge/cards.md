---
title: LLMS Forge page cards
description: Automatic and manual Markdown cards, TVs, and miniShop3 prices
---

# Page cards

Each card is available at `/llms-txt/slug`. After saving, its link is added to the main `/llms.txt`. Cards work for products, categories, articles, and other important pages.

## Automatic resource card

Under **LLMS for individual pages**, click **Add page LLMS**, choose **Read MODX resource**, and search by title or ID. A new card's title and `resource-ID` slug are filled after selection. Preview the card, then save.

**Create cards from selected** creates cards for selected published pages. When search is active, only matching pages are used. Excluded IDs and pages with an existing automatic card are skipped. The limit is 200 cards.

Resource HTML is converted to Markdown without executing snippets. An automatic card is unavailable if its resource or an ancestor is deleted, unpublished, resource-group protected, or outside its publication dates.

## TVs and miniShop3

List TV names in **TVs for Markdown cards**. In **miniShop3 fields for Markdown cards**, enter `price,old_price,article,weight,vendor,made_in` or a subset.

With `price,article` selected, a product card can include:

```md
## Properties

- price: 84158
- article: ART-000012
```

Values come from `msProductData` when miniShop3 is installed and fields are populated. Product fields appear **inside the card**; the main `/llms.txt` contains page links and short summaries.

## Manual card

Choose **Write Markdown manually**, provide the full source URL, and enter Markdown. Manual text is published independently of the source resource's access state. Do not use this mode for private content. Card metadata is limited to 60 KB in total, with up to 50 KB of Markdown per card.
