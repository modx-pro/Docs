---
title: Landing
description: "A page from hero, richtext, faq, and cta. Publish with the resource Save button"
---

# Landing from Free sections

Result: four blocks on the site. The draft is not public. The MODX resource **Save** button publishes sections. The **Sections** tab has no separate Publish button.

## Before you start

1. The MODX resource is published. An unpublished resource does not open the page.
2. The template contains uncached `[[!PageBuilder]]`.

## Steps

1. Open the resource and the **Sections** tab.
2. **Add section** and pick `hero`, `richtext`, `faq`, and `cta` from **Blocks**.
3. Fill the fields in **Properties**.
4. Click **Save** on the resource. The editor validates fields and writes `published_json`.
5. Open the page on the site.

With Pro you can add `how_it_works`, `media_split`, `case_study`, `newsletter`, or `quote` to the same order. If a type is missing from the catalog, check `requires` and the resource context.

Rollback: move the section to the page trash, or unpublish sections through `mgr/page/unpublish` when that button is in the UI. The draft stays.

## See also

- [Workflow](../workflow)
- [Section catalog](../sections/)
- [PageBuilder snippet](../snippets/PageBuilder)
