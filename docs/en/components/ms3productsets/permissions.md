---
title: Permissions
---
# Permissions

The `view` permission opens the **ms3ProductSets** manager page.

| Permission | Action |
| --- | --- |
| `view` | Open **Components → Product sets** and all mgr connector actions |
| `save` | Write actions: `save_template`, `delete_template`, `apply_template`, `unbind_template` |

These are core MODX permissions, not a package policy. No manager session: JSON `unauthorized`. A session without `view`, or a write without `save`: JSON `forbidden`. The CMP page without `view` is rejected by MODX and does not print `forbidden`. Without `save`, template, product, and tree reads still work.

## Assigning

Set permissions in MODX policies: **Manage → Access Control**. Assign `view` and `save` to roles that edit sets.
