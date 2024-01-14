---
title: smartSessions
description: Advanced MODX session management
author: createit-ru
modstore: https://modstore.pro/packages/utilities/smartsessions

---
# smartSessions

The component extends the standard session handler ```modSessionHandler```, by adding the following columns to the sessions table (the new table is called ```modx_smart_sessions```):

* ```ip``` — user ip address;
* ```user_agent``` - browser User-Agent;
* ```user_id``` — user id if authorized.

Using this data, you can obtain expanded information about visitors to your site. And most importantly, you can set different session storage times for different site visitors.

## Installation

1. Install the package from repository (modstore.pro or extras.modx.com).
2. In system setting ```session_handler_class``` set the value ```smartSessionHandler```.
3. Check that the data has started to be collected in the table ```modx_smart_sessions```. The ```modx_sessions``` table is no longer used and can be cleared.

## Removal

Return the default value of ```modSessionHandler``` in the system setting ```session_handler_class```, after which you can remove the package.

## Settings

To configure the component, go to the "System Settings", "smartsessions" namespace.

* ```smartsessions_bot_signatures``` — a list of search bot signatures, separated by a vertical bar, for searching (via LIKE) by the ```user_agent``` field. Add bots that frequently visit your site.

* ```smartsessions_bots_gc_maxlifetime``` — lifetime of bot sessions specified in the ```smartsessions_bot_signatures``` setting. By decreasing it, you will reduce the storage period of bot sessions and reduce the size of the table with sessions.

* ```smartsessions_empty_user_agent_gc_maxlifetime``` — lifetime of sessions with an empty User-Agent. For example, it can be set the same as for bots.

* ```smartsessions_authorized_users_gc_maxlifetime``` — lifetime of sessions of authorized users. You can increase it and make the value greater than in the ```session_gc_maxlifetime``` setting.

The standard session lifetime is still determined by the ```session_gc_maxlifetime``` setting.

### Example component configuration script:

* ```session_gc_maxlifetime``` — standart value 604800 (7 days);
* ```smartsessions_bots_gc_maxlifetime``` — 10800, bot sessions are stored for 3 hours and take up minimal space in the database;
* ```smartsessions_empty_user_agent_gc_maxlifetime``` — 10800, sessions with an empty User-Agent are stored for 3 hours and take up minimal space in the database;
* ```smartsessions_authorized_users_gc_maxlifetime``` — 2592000, sessions of authorized users are stored for 30 days, which will allow you to save authorization and the shopping list in the cart longer.

## Known Issues

The menu item "Manage" / "Logout All Users" will no longer work. This happens because this action only works with the standard session handler ```modSessionHandler```, which is hard-coded in the code.


# Useful

SQL query to view the number of sessions grouped by user_agent, which will allow you to find the most frequent User-Agents in your database:

``` sql
SELECT `user_agent`, COUNT(*) 
FROM `modx_smart_sessions` 
GROUP BY `user_agent` 
ORDER BY `COUNT(*)` DESC
```

![SQL query result](https://file.modx.pro/files/3/c/e/3ceeaaa952ac502b07822eebc7247bad.jpeg)