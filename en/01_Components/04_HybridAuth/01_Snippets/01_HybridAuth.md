Component for authorization through social and other services.

Main advantage is work with services without moderators, and ability to bind several services to one account.

Snippet outputs formula for authorization on the site.

## Parameters
* **&activeProviderTpl** — chunk to output icons of a bound service.
* **&addContexts** — additional contexts, separated by commas. E.g. &addContexts=`web,ru,en`
* **&groups** — – list of groups to register the user, separated by commas. User role can be indicated in the group with colon. E.g. &groups=`Users:1` добавит юзера в группу "Users" с ролью "member".
* **&loginContext** — main context for authorization. On default – current.
* **&loginResourceId** — identifier of a resource on which user should be sent after end of the session. On default 0 renews the current page.
* **&loginTpl** — this chunk will be pointed to an anonymous user, i.e. to any guest.
* **&logoutResourceId** — resource identifier, where a user is sent after the end of the session. On default, 0 updates a current page.
* **&logoutTpl** — this chunk will be shown to an anonymous user.
* **&providerTpl** — chank to output links for authorization, or binding of server to the account.
* **&providers** — list of providers for authorization, separated by commas. All available providers are here {core_path}components/hybridauth/model/hybridauth/lib/Providers/. Например, &providers=`Google,Twitter,Facebook`.
* **&rememberme** — remembers users for a long time. On default – on.

## Samples
Snippet should be activated uncached, because it outputs different chunks depending on users authorization.

On usual activation snippet will output all providers registered in the system.
```
[[!HybridAuth]]
```

They can be limited indicating them as a list, separated by commas:
```
[[!HybridAuth?
    &providers=`Yandex,Google,Twitter,Facebook,Vkontakte`
]]
```

Authorization in 2 contexts at once:
```
[[!HybridAuth?
    &providers=`Yandex,Google`
    &loginContext=`web`
    &addContexts=`en`
]]
```

## Provider settings
Individual system setting with prefix **ha.keys.** is indicated for every provider of authorization:
[![](http://st.bezumkin.ru/files/0/6/3/063adfe9b80ed7c6053b97e3818e0e0bs.jpg)](http://st.bezumkin.ru/files/0/6/3/063adfe9b80ed7c6053b97e3818e0e0b.png)

Value of setting is JSON array which content depends on the provider.

E.g. **id** and secret should be indicated for Google, but for Twitter – **key** and secret.
That is why pay attention to the settings which will be given to you during registration.


### Link for registration from providers
Keys from providers need to be derived to work of the component, and it is not understandable at once where you should look for them. That’s is why there are some main links:

* [Yandex][1]
* [Vkontakte][2]
* [Twitter][3]
* [Google][4]
* [Facebook][5]

### Contexts
If you have several individual contexts on the website, you can authorize them through the same providers, but for different domains.

For this you need to indicate keys directly in settings of the context, but not in general settings of the system.

## Common problems
* For proper work of snippet it is better to include friendly url.
* •	Problems at hostings from PHP-APC are possible. If during authorization you get a mistake *You cannot access this page directly* - try ti disable it.
For this you can register /index.php at the beginning of the file
```
<?php

ini_set('apc.cache_by_default' , 0);
```


[1]: https://oauth.yandex.ru/client/new
[2]: http://vk.com/editapp?act=create
[3]: https://dev.twitter.com/apps/new
[4]: https://dev.twitter.com/apps/new
[5]: https://developers.facebook.com/apps
