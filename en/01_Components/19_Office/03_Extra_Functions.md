Apart from the modular architecture and controllers, Office adds some nice little things to the system.

### Authorization from the admin space 
You can authorize as any active user directly from the admin space.

There is a special option in the menu for this: 

[![](https://file.modx.pro/files/4/e/4/4e46cdfd6032d8d234bd6fed1520e934s.jpg)](https://file.modx.pro/files/4/e/4/4e46cdfd6032d8d234bd6fed1520e934.png)

and a button on the user's editing panel: 

[![](https://file.modx.pro/files/f/8/0/f802f7abeab90a1a6bf8faec7f8d4e88s.jpg)](https://file.modx.pro/files/f/8/0/f802f7abeab90a1a6bf8faec7f8d4e88.png)


- Authorization always happens in the new window, the current window of a manager does not close.
- Script tries to authorize in any context.
- You can use direct links to authorization, like
```
http://your.site/?action=office/login_as&user_id=4
```
or even
```
http://your.site/any/page/?action=office/login_as&user_id=2&any_key=value
```
Links like this are proccessed by Office plugins, that is why you can indicate any page by them. 

### Ending an inactive user's session 
There is a problem in MODX: when you block or deactivate a user, their session remains active and they do not even know that they have been dismissed. 

Office solves this problem automatically by ending such a user's session after their first query from any page. 

### Switching accounts
In the 1.6 version you can authorize in several accounts and switch between them. 

[![](https://file.modx.pro/files/1/e/a/1eab19e934b92ddb79008c8ce5b23427s.jpg)](https://file.modx.pro/files/1/e/a/1eab19e934b92ddb79008c8ce5b23427.png)

When you authorize like this, you enter a new user's account but your old accounts remain in session
`$_SESSION['Office']['LoggedIn']`, and then you can switch between them with link like 
```
https://your.site/?action=auth/change&user_id=4
```

You can turn such an account off with link 
```
https://your.site/?action=auth/logout&user_id=4
```

And the authorization itself works like a standars authorization form, except that
* the action will be `auth/formAdd` rather than `auth/formLogin`
* if the password field is not filled in, it will give you an error rather than send you a letter of reset.

If you log off your current account but you still have other authorizations, you will be sent to one of them. 

If you authorize as a different user from the admin space, it becomes one of those additional authorizations and you do not lose you authorization as an admin. 

And if such an account changes its password, you will not be able to switch to it because you will need a new authorization. 
This is helpful in case that you first give access to your sites' management to a different user and then you change your mind.
