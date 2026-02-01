# Quick start

We'll set up a user account with auth, profile editing, and miniShop2 order history.

## Authorization

The account is available only to authorized users. We'll register them in the **Users** group.

Create it:

[![](https://file.modx.pro/files/7/a/7/7a777c495c0e0abccc46e79525725c62s.jpg)](https://file.modx.pro/files/7/a/7/7a777c495c0e0abccc46e79525725c62.png)

[![](https://file.modx.pro/files/6/5/5/655a16c9aa7e36db7e73c6df62411ba8s.jpg)](https://file.modx.pro/files/6/5/5/655a16c9aa7e36db7e73c6df62411ba8.png)

Assign context access **Load, List and View**.

Create section "Account" with 2 pages: "Profile" and "Order history". The account root should link to "Order history":

[![](https://file.modx.pro/files/d/0/1/d017b1210c7b83dd53778d44279e35ecs.jpg)](https://file.modx.pro/files/d/0/1/d017b1210c7b83dd53778d44279e35ec.png)

[![](https://file.modx.pro/files/4/4/9/449cd41a395ab891cd7998aebefa5680s.jpg)](https://file.modx.pro/files/4/4/9/449cd41a395ab891cd7998aebefa5680.png)

[![](https://file.modx.pro/files/8/3/d/83d92d38d78ffaf2a3d1a138bbeb978as.jpg)](https://file.modx.pro/files/8/3/d/83d92d38d78ffaf2a3d1a138bbeb978a.png)

While configuring, hide the account from the menu. Remember to show it later.

Restrict access to these pages to the **Users** group only.
Give group **(anonymous)** **Load only** so they can load the page, check access, and get "403 Access denied".
Without Load only, the page won't exist for them and they'll get "404 Not found".

Create resource group Office, assign permissions, and add all 3 account pages.

[![](https://file.modx.pro/files/3/6/f/36f61755226bcae8e6ff855ece8332a8s.jpg)](https://file.modx.pro/files/3/6/f/36f61755226bcae8e6ff855ece8332a8.png)

[![](https://file.modx.pro/files/b/7/a/b7a38c907e7c6fb0be1731f5c4e80b96s.jpg)](https://file.modx.pro/files/b/7/a/b7a38c907e7c6fb0be1731f5c4e80b96.png)

Go to "Access control" and tighten access for Users and (anonymous) to this resource group; MODX sets slightly wrong defaults. For Users set **Resource**; for (anonymous) set **Load, List and View**.

[![](https://file.modx.pro/files/5/1/e/51ee007654944ce323b33386b8ba9bd6s.jpg)](https://file.modx.pro/files/5/1/e/51ee007654944ce323b33386b8ba9bd6.png)

[![](https://file.modx.pro/files/c/d/c/cdc63e9d9701d52d19913a73889548e2s.jpg)](https://file.modx.pro/files/c/d/c/cdc63e9d9701d52d19913a73889548e2.png)

Open the account page in incognito (not logged into manager) to see the main page.

To show the login page instead, create it and set its id in **unauthorized_page**.

[![](https://file.modx.pro/files/8/1/a/81aab317054bca52864f5710294f25d1s.jpg)](https://file.modx.pro/files/8/1/a/81aab317054bca52864f5710294f25d1.png)

[![](https://file.modx.pro/files/4/8/7/48794e4f2161f9c70f033e611893d2d3s.jpg)](https://file.modx.pro/files/4/8/7/48794e4f2161f9c70f033e611893d2d3.png)

In incognito you'll be asked to log in when accessing the account:

[![](https://file.modx.pro/files/6/d/9/6d974b4865574dbbbdc49eb418e53069s.jpg)](https://file.modx.pro/files/6/d/9/6d974b4865574dbbbdc49eb418e53069.png)

Call snippet **officeAuth** with **groups** so users are registered in Users, which has account access:

```modx
[[!officeAuth?
  &groups=`Users`
]]
```

For **HybridAuth** auth see [docs][1]. To disable it:

```modx
[[!officeAuth?
  &groups=`Users`
  &HybridAuth=`0`
]]
```

By default, HybridAuth cannot be used at registration. The user must first log in via email, then bind social networks in profile settings.

If a customer already placed an order with that email in miniShop2, they are already registered. They can reset the password, get it by email, log in and see their orders.

With this add-on you give all your customers access to their order history.

## Profile editing

Main differences of **officeProfile**:

- Works fully via ajax.
- Lets you specify which profile fields can be filled.
- Can require certain fields.
- User can change username and email. For email change, an activation link is sent. Email changes only after the user clicks it.
- Extended profile fields can be output and edited. They are allowed in settings and shown in the form as **extended[field_name]**.
- User can upload/remove profile image via ajax. If none, [gravatar][2] is used.
- User can bind social networks (if enabled) for quick login.

All works out of the box.

[![](https://file.modx.pro/files/1/9/a/19ab435142d62ce938dcf4892b4dcf45s.jpg)](https://file.modx.pro/files/1/9/a/19ab435142d62ce938dcf4892b4dcf45.png)

```modx
[[!officeProfile]]
```

You can pass parameters: disable HybridAuth, redirect on logout (default: current url), avatar upload params, etc. See snippet parameters in the manager.

## Order output

Order history uses **officeMiniShop2**:

[![](https://file.modx.pro/files/d/e/e/dee7bb2e05e4ca5f23188fba7b9d1064s.jpg)](https://file.modx.pro/files/d/e/e/dee7bb2e05e4ca5f23188fba7b9d1064.png)

[![](https://file.modx.pro/files/8/f/e/8fe7aa15248aa16bf8f4509e15093fd5s.jpg)](https://file.modx.pro/files/8/f/e/8fe7aa15248aa16bf8f4509e15093fd5.png)

[![](https://file.modx.pro/files/9/7/d/97d83a9dad06a604428a859f391110fds.jpg)](https://file.modx.pro/files/9/7/d/97d83a9dad06a604428a859f391110fd.png)

Built on ExtJS. Fields are set in system settings. You can change the look with custom CSS, but it's tedious.

[![](https://file.modx.pro/files/6/f/2/6f2a563d97bbea76516b74dc9c80baads.jpg)](https://file.modx.pro/files/6/f/2/6f2a563d97bbea76516b74dc9c80baad.png)

[![](https://file.modx.pro/files/c/a/1/ca1a88011b00b8c35f17a0858cb9e531s.jpg)](https://file.modx.pro/files/c/a/1/ca1a88011b00b8c35f17a0858cb9e531.png)

Default settings suit most stores; you may want to remove the "weight" field.

## Conclusion

You now know how to set up auth, profile editing, and miniShop2 order output on your site.

[1]: /en/components/hybridauth/
[2]: https://gravatar.com
