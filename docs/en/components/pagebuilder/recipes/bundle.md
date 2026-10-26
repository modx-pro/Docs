---
title: Bundle
description: "Export, dry-run, and import of UI section types. The CMP tab is hidden in the current release"
---

# Constructor Bundle

In the current release the **Bundle** tab is **not shown** in the CMP (`BUNDLE_ENABLED = false` in `ProFeatureProvider`). While the flag is off, `mgr/bundle/*` routes are not registered on the provider. The processor files stay in the package. A manager call does not reach them.

When the tab is available, UI section types move from one site to another.

## Before you start

PageBuilder Pro is installed on both sites. The source site already has the UI types you want to move. The Bundle tab is enabled in your build.

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
- [PageBuilder Pro](../pro#constructor-bundle)
- [Custom section type](custom-section)
