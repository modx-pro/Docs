---
title: Bundle
description: "Export, dry-run, and import of UI section types in one transaction. Pro layer"
---

# Constructor Bundle

Result: UI section types from one site appear on another. CMP tab: [Bundle](../cmp#bundle). Requires PageBuilder Pro.

## Before you start

PageBuilder Pro is installed on both sites. The source site already has the UI types you want to move.

## Steps

1. On the source site open **Bundle** and export JSON.
2. On the target site paste the JSON and run dry-run.
3. The plan shows `create`, `update`, or `conflict`. `conflict` is set when the type already exists and `version` differs. Import skips those rows.
4. Import applies `create` and `update` in one transaction through `UiSectionTypeService`.

Bundle v1 does not include secrets, tokens, page content, table rows, forms, or datasources. A definition that contains `token`, `secret`, or `rows` does not enter the `section-types` plan.

## What to check

The plan has no unexpected `conflict` rows. After import the keys show up in the **Blocks** catalog on the target site.

## Rollback

Do not confirm import. Processors: `mgr/bundle/*`.

## See also

- [Control panel](../cmp#bundle)
- [Custom section type](custom-section)
