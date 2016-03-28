List of online users and a blocked user authorization reset

## Features
* Fixes the date of the last visit of each user (in all contexts)
* Displays a list of online users on the website
* Revokes authorizations of disconnected and blocked users


## Fixing the date of the user visit

For this purpose *UserOnline* object that is fixed:
* user ID
* current context
* Visit datetime

User visits in the *mgr* context also recorded. To turn of this, put the system setting **usersonline_mgr_check** to *«No»*.

## Show the list of users online

For this task used *getOnlineUsers* snippet, which wraps *pdoUsers*. Accordingly, for design of the results involved *pdoUsers*, which is passed the call parameters

### Snippet *getOnlineUsers* parameters: 

| Name              | Default                                      | Description                                                                  |
| --------------------- | ------------------------------------------------- | ------------------------------------------------------------------------- |
| **&contexts**         | Null value  (includes all contexts)     | Comma-separated list of parents, to check users     |
| **&timeInterval**     | -1 (getting the value from system setting *usersonline_time_span*)    | Time in seconds, during which the user is considered to be online      |  
  

#### System setting of component:

| Name                     | Default                        | Description                                                                         |
| ---------------------------- | ----------------------------------- | -------------------------------------------------------------------------------- |
| **usersonline_time_span**    | 900                                 | Time in seconds, during which the user is considered to be online  |


## Reset authorization of blocked users

By default in MODX, after user was banned he can do everything, he want, while his session is still alive.
Plugin *UsersOnline* check, if current user is active. If he banned or inactive, automatic logoff will be launched and he will be redirected to the main page, after that carefree life of the offender is over.
