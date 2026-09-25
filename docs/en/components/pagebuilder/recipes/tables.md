---
title: Tables
description: "Price rows on the Tables tab, rendered by the data_table section or the PageBuilderTableRows snippet"
---

# Tables

Result: a price list or a schedule is edited on the **Tables** tab. The section on the site only points at `table_key`. Several sections can read one table.

## Before you start

1. `pagebuilder_resource_tables_tab_enabled` is on. The **Tables** tab is a Free setting.
2. The `data_table` section requires PageBuilder Pro.
3. The resource is published and the template contains `[[!PageBuilder]]`.

## Steps

1. On the resource open **Tables**, create a table, and add rows. Filters, pagination, and CSV or JSON import are on the same tab.
2. On the **Sections** tab add `data_table`. In **Table** set `table_key`, in **Limit** set how many rows to show. The section inspector does not edit the rows.
3. **Save** on the resource publishes the section. A custom row template uses the `PageBuilderTableRows` snippet with the same `table_key`.

## Example fields

On the **Tables** tab the key is `prices`, with two price rows. In the `data_table` section set **Table** to `prices` and **Limit** to `10`. An empty limit becomes 20 in the chunk.

A second `data_table` on another page points at the same `prices`. Rows are still edited on the **Tables** tab, not in the inspector.

## What to check

The site shows rows from table `prices`, up to the limit. Edit a row on the **Tables** tab and **Save** the resource. Both sections that use this `table_key` change.

## Rollback

Delete the section. The table stays on the resource until you delete it on the **Tables** tab.

## See also

- [Data table](../sections/data_table)
- [PageBuilderTableRows](../snippets/PageBuilderTableRows)
- [System settings → Resource tables](../settings#resource-table-data)
