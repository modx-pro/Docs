This controller's parameters are very much like those of [HybridAuth][1].

Name              | By default                  | Description
------------------------|-------------------------------|------------
**&tplLogin**			| tpl.Office.auth.login			| This chunk will be shown to an anonymous user, that is, to any guest. 
**&tplLogout**			| tpl.Office.auth.logout		| This chunk will be shown to an authorized user. 
**&tplActivate**		| tpl.Office.auth.activate		| Chunk for activation letter. 
**&tplRegister**		| tpl.Office.auth.register		| Chunk for registration letter. 
**&linkTTL**			| 600							| Time of life of a profile activation link in seconds. 
**&groups**				| 								| List of groups for a user registration, with commas. User's role in the group can be written after a colon. For example, &groups=`Users:1` will add a user to "Users" group with a "member" role.
**&rememberme**			| 1								| Remembers a user for a long time. On by default.
**&loginContext**		| 								| General context for authorization. By default - the current one. 
**&addContexts**		| 								| Additional contexts, with commas. For example, &addContexts=`web,ru,en`
**&loginResourceId**	| 0								| Identifier of a resource to which the user will be sent after authorization. By default it is 0, which updates the current page. 
**&logoutResourceId**	| 0								| Identifier of a resource to which the user will be sent when the session is ended. By default it is 0, which updates the current page.
**&HybridAuth**			| 1								| Turn on integration with [HybridAuth][1], if it is installed.
**&providers**			| 								| List of providers of authorization [HybridAuth][1], with commas.
**&providerTpl**		| tpl.HybridAuth.provider		| Chunk for output of the link to authorization or adding HybridAuth service to the account.
**&activeProviderTpl**	| tpl.HybridAuth.provider.active| Chunk for output of an icon of the added HybridAuth service.

Example of a call with registration into Users group and a redirect to the main page:
```
[[!OfficeAuth?
    &groups=`Users`
    &loginResourceId=`[[++site_start]]`
]]
```

There is a detail in how the controller works: to generate authorized links it should have an id of the resource by default.
This id is located in system setting **office_auth_page_id** and is filled in when you first call for snippet on the site.

In the future, if you do not indicate **&loginResourceId**, it is this id that is used, and all links in the mail will be to this page.

## Authorization regime
Authorization regime is written into system setting **office_auth_mode**.
By default *email* is used for registration and password reset, but you can also turn on *phone* regime.

After that you will have to choose the sms provider in system setting **office_sms_provider**.
By default you can choose between [SmsRu][2] and [ByteHand][3].

For the work of providers the following system settins are used: 
* **office_sms_id** — identifier of the client on the service
* **office_sms_key** — key of the client on the service, not needed for SmsRu.
* **office_sms_from** — text designation of the sender, should be approved by the service.

Depending on the working regime fields **email** and **mobilephone** can be obligatory.

### Forms' actions
The standard javascript is written so as to process all forms of authorization universally,  
distinguishing them by their indicated actions in hidden input:
```
<input type="hidden" name="action" value="auth/действие"/>
```

The following actions are possible:
* **auth/formLogin** - standard authorization. If the password is not indicated, a reset letter will be sent.
* **auth/formRegister** - new user registration   
* **auth/formAdd** - additional authorization into another account, for quick switching
* **auth/sendLink** - sending link for password reset 

Logging off an account is accessible by a simple downloading of a page with a parameter in the link. 
```
https://your.site/?action=auth/logout
``` 

If you want to cancel authorization of an account which was added through `auth/formAdd`, you will have to add `user_id` to this link:
```
https://your.site/?action=auth/logout&user_id=15
```
Links like this are made by Office plugins, you can indicate them to any page.

### Adding a provider
To add your own SMS provider you have to create a new class in core/components/office/model/sms/**myprovider**.class.php.

It can be structured like that:
```
<?php

class MyProvider {
    function __construct(modX $modx, array $config = array()) {
        $this->modx = &$modx;
    }

    function send($phone, $text) {
        // We get system settings for work and send a message 

        return true; // or the text of an error
    }
}
```
After that you can indicate *MyProvider* in setting office_sms_provider.

SMS provider can be also used for random sending of an SMS through API MODX:
```
$provider = $modx->getOption('office_sms_provider');
if ($service = $modx->getService($provider, $provider, MODX_CORE_PATH . 'components/office/model/sms/')) {
    $send = $service->send('79234778899', 'Hi!');
    return $send === true
        ? 'Your message is sent!'
        : 'Error in sending your message: ' . $send;
    }
}
```
The provider's class should definitely have method `send`.

## Additional fields

Registration in Office requires only one field that should be filled - email, all other fields are additional.
That is done so for purpose, to make a user register on your site as soon as possible and only then require his filling in the whole profile if you need it.

Filling in big forms when registering can be very tiring, and for this reason Office tries not to force the user to write extra data. 

However, if you want the user to give you some more information, you can make your own system plugin for that. 
For example, you can give the user choice in which group to register.

For this we add select in the registration form:
```
<label for="office-auth-register-group" class="col-md-3 control-label">Группа</label>
<div class="col-md-8">
    <select name="group" class="form-control" id="office-auth-register-group">
        <option value="users">Ordinary Users</option>
        <option value="admins">Administrators</option>
    </select>
</div>
```


And then we write our own plugin that will check which group is selected and add it to the user:
```
<?php
// Array of groups that are defined for registration beforehand saves you from data replacement in sending the form 
$groups = array(
    'admins' => 'Administrator',
    'users' => 'Users',
);

if ($modx->context->key != 'mgr') {
    switch ($modx->event->name) {
        // Event before the user's registration 
        case 'OnBeforeUserFormSave':
            if (empty($_POST['group']) || !array_key_exists($_POST['group'], $groups)) {
                // Error if group is not filled in or is not from the list 
                $modx->event->output('You should indicate the group of the user!');
            }
            // You can also add something to the profile
            // $user->Profile->set('comment');
            break;
        // Event after the user's registration
        case 'OnUserFormSave':
            // Here we add the selected group
            $user->joinGroup($groups[$_POST['group']]);
            break;
    }
}
```
Do not forget to turn on events **OnBeforeUserFormSave** and **OnUserFormSave**for the plugin.
In this case you do not have to indicate parameter **&groups** for snippet OfficeAuth.


[1]: /ru/01_Компоненты/04_HybridAuth/01_Сниппеты/01_HybridAuth.md
[2]: http://sms.ru
[3]: http://bytehand.com
