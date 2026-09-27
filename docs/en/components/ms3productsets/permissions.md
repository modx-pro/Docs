---
title: Permissions
---
# Permissions

Access to the **ms3ProductSets** manager page is controlled by the `view` permission.

| Permission | Action |
| --- | --- |
| `view` | Open **Components → Product sets** and use the interface |

Without `view` the CMP page is unavailable. The mgr connector checks only that the user is logged into `mgr`. It does not call `hasPermission('view')`. This is core `view`, not a package policy.

## Assigning

Set permissions in MODX policies: **Manage → Access Control**. Assign `view` to roles or users who work with product sets.
