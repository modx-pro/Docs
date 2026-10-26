---
title: Permissions
---
# Permissions

## Permissions

| Permission | Action |
|------------|--------|
| `view` | View dashboard and history |
| `save_log` | Delete and CSV export |

Without **view** the manager connector returns 403 `ms3rv_unauthorized`. Without `save_log` the buttons **Delete Selected** and **Export CSV** stay hidden (`canSaveLog`). `mgr/views/remove`, `mgr/views/removeMultiple` and `mgr/views/export` return JSON `success: false`, not a file.

The package does not add these keys to a policy template. `view` is a normal MODX permission. `save_log` is not shipped. Until the key is on the user’s policy, delete and export stay closed. A sudo user skips `hasPermission` in MODX, so the buttons show.

To open delete and export, add the `save_log` permission to a policy template and grant it to the role.
