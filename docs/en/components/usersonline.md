---
title: UsersOnline
description: Online users list
logo: https://modstore.pro/assets/extras/usersonline/logo-lg.png
author: mvoevodskiy
modstore: https://modstore.pro/packages/users/usersonline
modx: https://extras.modx.com/package/usersonline
---
# UsersOnline

Online users list and auth reset for blocked users

## Features

- Records last appearance date for each user (in all contexts)
- Outputs online users list
- Resets auth for disabled and blocked users

## Recording user appearance date

Uses *UserOnline* object which stores:

- User ID
- Current context
- Appearance date and time

*mgr* context appearances are recorded too. To disable, set system setting `usersonline_mgr_check` to `No`.

## Output online users list

Uses *getOnlineUsers* snippet, a wrapper over *pdoUsers*. Output formatting is handled by *pdoUsers*, which receives all call parameters.

### *getOnlineUsers* snippet parameters

| Name             | Default                                                       | Description                                                                         |
| ---------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **&contexts**    | Empty (check all contexts)                                    | Comma-separated list of contexts to check                                            |
| **&timeInterval**| `-1` (from system setting *usersonline_time_span*)            | Time in seconds during which user is considered online                               |

### Component system settings

| Name                     | Default | Description                                                                         |
| ------------------------ | ------- | ----------------------------------------------------------------------------------- |
| **usersonline_time_span**| `900`   | Time in seconds during which user is considered online                               |

## Auth reset for blocked users

By default in MODX, after blocking a user can do anything on the site as long as their session is active.
*UsersOnline* plugin checks if the current user is active. If blocked or disabled, it triggers automatic logout and redirect to home, ending the violator's session.
