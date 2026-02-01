# Additional functionality

Besides the modular architecture and controllers, Office adds several useful features.

## Login from admin

You can log in as any active user directly from the admin.

A user menu item was added:

[![](https://file.modx.pro/files/4/e/4/4e46cdfd6032d8d234bd6fed1520e934s.jpg)](https://file.modx.pro/files/4/e/4/4e46cdfd6032d8d234bd6fed1520e934.png)

And a button on the user edit panel:

[![](https://file.modx.pro/files/f/8/0/f802f7abeab90a1a6bf8faec7f8d4e88s.jpg)](https://file.modx.pro/files/f/8/0/f802f7abeab90a1a6bf8faec7f8d4e88.png)

- Login always happens in a new window; the manager window stays open.
- The script tries to log in to all contexts.
- You can use direct login links like `http://your.site/?action=office/login_as&user_id=4`.

or even `http://your.site/any/page/?action=office/login_as&user_id=2&any_key=value`.

These links are handled by Office plugins, so they can point to any page.

## Ending inactive user session

MODX has an issue where when a user is blocked or deactivated, their session stays active and they may not know they were disabled.

Office fixes this by ending such a user's session on the first request to any page.

## Account switching

Version 1.6 added the ability to log in to multiple accounts and switch between them

[![](https://file.modx.pro/files/1/e/a/1eab19e934b92ddb79008c8ce5b23427s.jpg)](https://file.modx.pro/files/1/e/a/1eab19e934b92ddb79008c8ce5b23427.png)

With this extra login you enter the new user's account, but the old accounts remain in `$_SESSION['Office']['LoggedIn']`, and you can switch between them with a link like: `https://your.site/?action=auth/change&user_id=4`.

You can disable an account with `https://your.site/?action=auth/logout&user_id=4`.

Login itself works like the regular login form, except:

- the action is `auth/formAdd` instead of `auth/formLogin`
- an empty password yields an error instead of sending a reset email.

If you log out of the current account but have other logins, you will be switched to one of them.

When logging in as another user from the admin, they are added to the extra users array, and the admin keeps their login.

If that account changes its password, you won't be able to switch to it anymore and will need to log in again.
This protects the case when, for example, one user gives another access to manage their site and then changes their mind.
