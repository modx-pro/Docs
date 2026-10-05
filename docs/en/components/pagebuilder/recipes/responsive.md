---
title: Per-screen values
description: "Different text, url, and number values for desktop, tablet, and mobile. Pro layer"
---

# Per-screen values

Result: a title or a link differs on desktop, tablet, and phone. Requires PageBuilder Pro and capability `responsive`. Types: text, textarea, url, number, currency, richtext, slug.

## Before you start

1. `pagebuilder_responsive_editor_enabled` is on. While it is off, the inspector has no tabs.
2. The field is one of the types above. The section has such a title or link.

## Steps

1. Open the field in the inspector and click the tablet icon. Tabs appear for desktop, tablet, and mobile.
2. Fill the three values. **One value for every screen** collapses the map and keeps desktop, unless the schema forces `responsive: true`.
3. On the site, `pagebuilder_responsive_apply` picks the mode.
   - `manual` (default): one value. It comes from `?pb_bp=` or `pagebuilder_default_breakpoint`.
   - `css`: the HTML contains all three values, and a media query hides the extras.
4. In the chunk print the field with `{$title|pb_text}`, not `escape`.
5. **Save** the resource.

A saved map still works on the site until an editor saves the field as one value. Breakpoints: `pagebuilder_responsive_breakpoints` (default desktop ≥1024, tablet ≥768, mobile ≥0).

## Example fields

Title on a `hero` section:

| Screen | Value |
| --- | --- |
| desktop | `Furniture catalog` |
| tablet | `Catalog` |
| mobile | `Catalog` |

With `pagebuilder_responsive_apply` set to `manual`, open the page as `?pb_bp=mobile` and as `?pb_bp=desktop`. With `css`, the HTML contains all three values and a media query hides the extras.

## What to check

The tabs show up only after the tablet icon, and only while the editor setting is on. A collapsed field prints the desktop value. The chunk uses `{$title|pb_text}`, not `escape`.

## Rollback

Collapse the field to one value and save the resource.

## See also

- [System settings → Responsive](../settings#responsive-breakpoints)
- [Frontend output → Responsive](../frontend#responsive)
