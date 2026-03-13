---
title: Permissions
---
# Permissions

Access to ms3RecentlyViewed admin sections is controlled by MODX permissions.

## Permissions

| Permission | Action |
|------------|--------|
| `view` | View dashboard and history |
| `save_log` | Delete records, bulk delete, CSV export |

Without **view**, the **ms3RecentlyViewed** menu item and component pages are unavailable. Without **save_log**, delete and export buttons in history are unavailable.

## Assigning

Permissions are set in **Policies**. **Manage → Access Control** — select a policy or create one, then assign **view** and optionally **save_log** to the desired roles or users.
