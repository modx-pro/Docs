---
title: Permissions
---
# Permissions

MODX permissions open the admin sections.

## Permissions

| Permission | Action |
|------------|--------|
| `view` | View dashboard and history |
| `save_log` | Delete and CSV export |

Without **view**, the **ms3RecentlyViewed** menu item and component pages are unavailable. Without `save_log`, “Delete selected” and “Export” are hidden (`canSaveLog`). Connector `mgr/views/export` returns an error, not a file.

## Assigning

1. **Manage → Access Control**.
2. Select a policy or create one.
3. Assign **view** and optionally `save_log` to roles or users.
