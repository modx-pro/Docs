---
title: Page templates
description: "An empty skeleton of section types: save from a page and apply to a new draft. Pro layer"
---

# Page templates

Result: an empty **Sections** tab gets a ready order of types, with no copy. Requires PageBuilder Pro and capability `page-templates`. Rows live in `pb_page_templates`.

## Before you start

1. A sample page whose sections are already in the order you want.
2. A new resource with an empty section draft and `[[!PageBuilder]]` in the template.
3. Capability `page-templates` is on.

## Steps

1. On a sample page arrange the sections in the order you want.
2. **Save as template**. The template stores only `type` and `typeVersion`, not field values.
3. In the CMP **Page templates** set the name, MODX template IDs, and the default flag.
4. Open a resource with an empty draft. Apply buttons list the templates that fit.
5. Apply writes the draft through `mgr/pagetemplate/apply`. A draft that already has sections needs `force`.
6. Fill the fields and click **Save** on the resource.

## Example fields

The sample page has `hero`, `faq`, and `cta`. **Save as template**, name `Landing`. `pb_page_templates` stores the three types, without Title or button text.

On a new resource with an empty draft click "Apply Landing". The inspector shows three empty sections of those types. Fill the hero Title and click **Save**. If the draft already has sections, apply without `force` does not replace it.

## What to check

After apply on an empty draft, the type order matches the sample and the fields are empty. Apply again on a non-empty draft without `force` leaves that draft in place.

## Rollback

Do not apply the template, or delete it in the CMP. Sections already inserted go to the page basket.

## See also

- [PageBuilder Pro → Page templates](../pro#page-templates)
- [Landing](landing)
