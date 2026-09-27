---
title: Permissions
---
# Permissions

Access to ms3RecentlyViewed admin sections is controlled by MODX permissions.

## Permissions

| Permission | Action |
|------------|--------|
| `view` | View dashboard and history |
| `save_log` | Delete a row and bulk delete |

Without **view**, the **ms3RecentlyViewed** menu item and component pages are unavailable. Connector `mgr/views/export` checks only `view`. History delete/export buttons stay visible without `save_log`: delete then fails, export succeeds.

## Assigning

Set permissions in **Policies**: **Manage → Access Control**. Select a policy or create one, then assign **view** and optionally **save_log** to the roles or users.
