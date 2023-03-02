For a quick start we will set a user account with authorization, profile editing and output of orders from [miniShop2][0].

## Authorization
User account  will be accessible only to authorized users.They will be registered into **Users** group.

We shall create it:

[![](https://file.modx.pro/files/7/a/7/7a777c495c0e0abccc46e79525725c62s.jpg)](https://file.modx.pro/files/7/a/7/7a777c495c0e0abccc46e79525725c62.png)
[![](https://file.modx.pro/files/6/5/5/655a16c9aa7e36db7e73c6df62411ba8s.jpg)](https://file.modx.pro/files/6/5/5/655a16c9aa7e36db7e73c6df62411ba8.png)

We appoint the following access rights to the context: **Load, List and View**.

Now we create the "User account" section and 2 pages inside it: "Profile" and "Orders History". The user account itself should be a link to the orders history for convenience purposes: 

[![](https://file.modx.pro/files/d/0/1/d017b1210c7b83dd53778d44279e35ecs.jpg)](https://file.modx.pro/files/d/0/1/d017b1210c7b83dd53778d44279e35ec.png)
[![](https://file.modx.pro/files/4/4/9/449cd41a395ab891cd7998aebefa5680s.jpg)](https://file.modx.pro/files/4/4/9/449cd41a395ab891cd7998aebefa5680.png)
[![](https://file.modx.pro/files/8/3/d/83d92d38d78ffaf2a3d1a138bbeb978as.jpg)](https://file.modx.pro/files/8/3/d/83d92d38d78ffaf2a3d1a138bbeb978a.png)

While we are doing settings, it is better to turn off the account output menu. But let us not forget to turn it on after that. 

Now we are to close these pages for access to anybody other than **Users** group.
Notice that we should give **(anonymous)** group access **Load only** so that they could load the page, check thir access rights and get "403 Access Prohibited".
If we do not give them Load only, the page will not exist for them and they will get "404 Not Found".

We create a new resource group Office, appoint rights for it and include all our 3 pages of user account in it. 
P
[![](https://file.modx.pro/files/3/6/f/36f61755226bcae8e6ff855ece8332a8s.jpg)](https://file.modx.pro/files/3/6/f/36f61755226bcae8e6ff855ece8332a8.png)
[![](https://file.modx.pro/files/b/7/a/b7a38c907e7c6fb0be1731f5c4e80b96s.jpg)](https://file.modx.pro/files/b/7/a/b7a38c907e7c6fb0be1731f5c4e80b96.png)

After that we should enter "Access Control" once again and restrict access for groups Users and (anonymous) to this resource group because MODX by default has rights that are not quite correct. 
For Users it has **Resource**, whereas for (anonymous) **Load, List and View**.

[![](https://file.modx.pro/files/5/1/e/51ee007654944ce323b33386b8ba9bd6s.jpg)](https://file.modx.pro/files/5/1/e/51ee007654944ce323b33386b8ba9bd6.png)
[![](https://file.modx.pro/files/c/d/c/cdc63e9d9701d52d19913a73889548e2s.jpg)](https://file.modx.pro/files/c/d/c/cdc63e9d9701d52d19913a73889548e2.png)

Now we can open the account page from the browser anonymous regime (we should not be logged in into the admin space because it gives us extra rights) and see the main page when accessing this address.

In order for us to see the authorization page rather than the main page we should create it and write its id into system setting **unauthorized_page**.

[![](https://file.modx.pro/files/8/1/a/81aab317054bca52864f5710294f25d1s.jpg)](https://file.modx.pro/files/8/1/a/81aab317054bca52864f5710294f25d1.png)
[![](https://file.modx.pro/files/4/8/7/48794e4f2161f9c70f033e611893d2d3s.jpg)](https://file.modx.pro/files/4/8/7/48794e4f2161f9c70f033e611893d2d3.png)

Now in the anonymous regime we get the authorization requirement when trying to access user account:

[![](https://file.modx.pro/files/6/d/9/6d974b4865574dbbbdc49eb418e53069s.jpg)](https://file.modx.pro/files/6/d/9/6d974b4865574dbbbdc49eb418e53069.png)

Please notice that I call for snippet **officeAuth** with parameter **groups** - it makes the user register into group Users, which has access to user account. 
```
[[!officeAuth?
	&groups=`Users`
]]
```

Everything is quite simple and logical if you only give it a thought. You can set authorization through **HybridAuth** with help of [documentation][1].
If you do not need it, you can just turn it off: 
```
[[!officeAuth?
	&groups=`Users`
	&HybridAuth=`0`
]]
```
As for me, I prefer setting it because it is convenient for the user. 

All parameters of the authorization snippet can be viewed on its page:

[![](https://file.modx.pro/files/f/e/d/fed7f52fd400888f23a61a7d61af7b1as.jpg)](https://file.modx.pro/files/f/e/d/fed7f52fd400888f23a61a7d61af7b1a.png)

By default you cannot use HybridAuth during a user's registration.
A user first has to authorize through email and only then add their social media in their profile settings.

By the way, if a particular user has already made an order for this email in miniShop2, then they are automatically registered in the system and it will not let them register again. 
Then this user can reset their password, receive it by email, enter their user account and view all their orders. 

That is, by installing this addon you will open access to their history orders for **all** of your users. 

## Profile editing
There are several main differences of snippet **officeProfile** from other opportunities for profile editing:
* It works through ajax completely.
* It allows you to indicate those fields of profile that are to be filled in. 
* It can require certain fileds for filling in 
* User can change their username and email. For changing the latest an activation link is sent to the mailbox. The email will not change unless the user presses the link. 
* Field of profile **extended** can be shown and edited. Fields like this can be enabled in settings and shown in the form of **extended[FieldName]**.
* User can download\delete a picture for their profile through ajax. If there is no picture then [gravatar][2] is shown.
* User can add their social media profiles (if it is turned on and set) to authorize quicklier with their help.

All this works at once, when the addon is just unpacked, and requires no special effort. 
[![](https://file.modx.pro/files/1/9/a/19ab435142d62ce938dcf4892b4dcf45s.jpg)](https://file.modx.pro/files/1/9/a/19ab435142d62ce938dcf4892b4dcf45.png)

The snippet itself can be called for very easily: 
```
[[!officeProfile]]
```
You can indicate additional parameters for it: whether HybridAuth sould be turned off or not, where user should be sent after they exit the site (by default - to the current url), avatar parameters, etc. 
All this can be seen in its parameters in the admin space. 

## Orders output
Orders history is shown through snippet **officeMiniShop2**:

[![](https://file.modx.pro/files/d/e/e/dee7bb2e05e4ca5f23188fba7b9d1064s.jpg)](https://file.modx.pro/files/d/e/e/dee7bb2e05e4ca5f23188fba7b9d1064.png)
[![](https://file.modx.pro/files/8/f/e/8fe7aa15248aa16bf8f4509e15093fd5s.jpg)](https://file.modx.pro/files/8/f/e/8fe7aa15248aa16bf8f4509e15093fd5.png)
[![](https://file.modx.pro/files/9/7/d/97d83a9dad06a604428a859f391110fds.jpg)](https://file.modx.pro/files/9/7/d/97d83a9dad06a604428a859f391110fd.png)

Everything is built on ExtJS, which is very convenient. It is loaded from the installed MODX, and that is why it can look differently on different versions of MODX.

Fields for output are indicated in system settings.
You can also completely change the way ExtJS looks by your own css file, but I should warn you beforehand that it is rather an industrious job. 

[![](https://file.modx.pro/files/6/f/2/6f2a563d97bbea76516b74dc9c80baads.jpg)](https://file.modx.pro/files/6/f/2/6f2a563d97bbea76516b74dc9c80baad.png)
[![](https://file.modx.pro/files/c/a/1/ca1a88011b00b8c35f17a0858cb9e531s.jpg)](https://file.modx.pro/files/c/a/1/ca1a88011b00b8c35f17a0858cb9e531.png)

Settings by default will suit most shops, unless you have to turn off the 'weight' field.

## Conclusion
Now you know how you can easily provide authorization, profile editing and orders output miniShop2 on your site.

[0]: /ru/01_Компоненты/02_miniShop2
[1]: /ru/01_Компоненты/04_HybridAuth
[2]: https://gravatar.com
