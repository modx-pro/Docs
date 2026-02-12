# Interface

The msProfile add-on is for working with miniShop2 customer profiles, introduced in version [2.1.0-beta1][1].

After installation you can find them on the orders page

[![](https://file.modx.pro/files/a/4/c/a4cbc299b55caaf8d0894a9961de6f10s.jpg)](https://file.modx.pro/files/a/4/c/a4cbc299b55caaf8d0894a9961de6f10.png)

You will see a list of all customer profiles, how much they have spent in your store, and how much they currently have in their account.

[![](https://file.modx.pro/files/d/8/9/d897edf2e246fd50de8dc718ab65fe32s.jpg)](https://file.modx.pro/files/d/8/9/d897edf2e246fd50de8dc718ab65fe32.png)

*Note that the profile is created on the first **order payment** operation.
If the user has only registered and done nothing else — they will not be in the profiles table*

View details by double-clicking the user or via the context menu.

[![](https://file.modx.pro/files/9/9/0/9902c4a0370d17454d60937a211b40bfs.jpg)](https://file.modx.pro/files/9/9/0/9902c4a0370d17454d60937a211b40bf.png)

You can change the referral code, which is generated randomly, and **change the user's account balance**.
Any unauthenticated user who visits `http://sitename.ru/anypage.html?msfrom=referral_code` and then registers will be counted as a referral of the user whose code was used.

The adjacent tab lists referrals brought to your site by this user.

[![](https://file.modx.pro/files/6/1/7/617ae506264047f3d7124a8f7242a095s.jpg)](https://file.modx.pro/files/6/1/7/617ae506264047f3d7124a8f7242a095.png)

The user replenishes their account themselves via miniShop2 payment methods and the [msProfileCharge][3] snippet.

When msProfile is installed you get a new payment method — CustomerAccount, i.e. user account.
To use it, you need to [configure account top-up][3] and enable the method.

[![](https://file.modx.pro/files/9/f/c/9fc018d8d6ddf15c0f2aa10210335495s.jpg)](https://file.modx.pro/files/9/f/c/9fc018d8d6ddf15c0f2aa10210335495.png)

[1]: http://bezumkin.ru/sections/components/1656/
[3]: /en/components/msprofile/snippets/msprofilecharge
