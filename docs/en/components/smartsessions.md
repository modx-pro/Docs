---
title: smartSessions
description: Advanced MODX session management
author: createit-ru
modstore: https://modstore.pro/packages/utilities/smartsessions

---
# smartSessions

The component extends the standard session handler `modSessionHandler` by adding the following columns to the session table (table name: `modx_smart_sessions`):

* `ip` — user IP address;
* `user_agent` — browser User-Agent;
* `user_id` — user id if logged in.

This provides richer data about visitors and lets you set different session lifetimes for different visitor types.

## Installation

1. Install the package from the repository.
2. In system setting `session_handler_class` set the value to `smartSessionHandler`.
3. Verify that data is being written to `modx_smart_sessions`. The `modx_sessions` table is no longer used and can be cleared.

## Uninstall

Restore the default value `modSessionHandler` in system setting `session_handler_class`, then you can remove the package.

## Settings

To configure the component go to "System settings", namespace "smartsessions".

* `smartsessions_bot_signatures` — list of search bot signatures separated by a vertical bar, for matching (via LIKE) against `user_agent`. Add bots that frequently visit your site.

* `smartsessions_bots_gc_maxlifetime` — session lifetime for bots listed in `smartsessions_bot_signatures`. Lowering it shortens bot session storage and reduces table size.

* `smartsessions_empty_user_agent_gc_maxlifetime` — session lifetime for empty User-Agent. Usually can be set the same as for bots.

* `smartsessions_authorized_users_gc_maxlifetime` — session lifetime for logged-in users. You can increase it above `session_gc_maxlifetime`.

Default session lifetime is still controlled by `session_gc_maxlifetime`.

### Example configuration

* `session_gc_maxlifetime` — default 604800 (7 days);
* `smartsessions_bots_gc_maxlifetime` — 10800, bot sessions kept 3 hours, minimal storage;
* `smartsessions_empty_user_agent_gc_maxlifetime` — 10800, empty User-Agent sessions kept 3 hours;
* `smartsessions_authorized_users_gc_maxlifetime` — 2592000, logged-in user sessions kept 30 days for longer login and cart persistence.

## Known issues

The menu item "Manage" / "End all sessions" will stop working, because that action only works with the standard handler `modSessionHandler` and is hardcoded.

# Useful

SQL query to see session counts grouped by user_agent and find the most frequent User-Agents in your database:

```sql
SELECT `user_agent`, COUNT(*)
FROM `modx_smart_sessions`
GROUP BY `user_agent`
ORDER BY `COUNT(*)` DESC
```

![Example SQL query result](https://file.modx.pro/files/3/c/e/3ceeaaa952ac502b07822eebc7247bad.jpeg)
