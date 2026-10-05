---
title: Permissions
---
# Permissions

The `view` permission controls access to the **ms3ProductSets** manager page.

| Permission | Action |
| --- | --- |
| `view` | Open **Components → Product sets** and all mgr connector actions |
| `save` | Write actions: `save_template`, `delete_template`, `apply_template`, `unbind_template` |

These are core MODX permissions, not a package policy. Without `view` the CMP and connector return `forbidden`. Without `save`, listing templates still works; writes do not.

## Assigning

Set permissions in MODX policies: **Manage → Access Control**. Assign `view` and `save` to roles that edit sets.
