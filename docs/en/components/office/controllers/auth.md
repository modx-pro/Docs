# Authentication

This controller's parameters are very similar to [HybridAuth][1].

| Name               | Default                     | Description                                                                                                                                                                                    |
| ------------------ | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **&tplLogin**      | `tpl.Office.auth.login`     | Chunk shown to anonymous users (guests).                                                                                                                                                        |
| **&tplLogout**     | `tpl.Office.auth.logout`    | Chunk shown to logged-in users.                                                                                                                                                                |
| **&tplActivate**   | `tpl.Office.auth.activate`  | Chunk for the activation email.                                                                                                                                                               |
| **&tplRegister**    | `tpl.Office.auth.register`  | Chunk for the registration email.                                                                                                                                                              |
| **&linkTTL**       | `600`                       | Profile activation link lifetime in seconds.                                                                                                                                                     |
| **&groups**        |                             | Comma-separated list of groups for registration. You can specify user role with a colon. E.g. &groups=`Users:1` adds the user to group "Users" with role "member".                             |
| **&rememberme**    | `1`                         | Remember user for a long time. Default: enabled.                                                                                                                                                |
| **&loginContext**  |                             | Primary context for login. Default: current.                                                                                                                                                    |
| **&addContexts**   |                             | Additional contexts, comma-separated. E.g. &addContexts=`web,ru,en`                                                                                                                            |
| **&loginResourceId**  | `0`                      | Resource ID to redirect to after login. Default 0 = refresh current page.                                                                                                                      |
| **&logoutResourceId** | `0`                      | Resource ID to redirect to after logout. Default 0 = refresh current page.                                                                                                                      |
| **&HybridAuth**    | `1`                         | Enable integration with [HybridAuth][1] if installed.                                                                                                                                           |
| **&providers**     |                             | Comma-separated list of [HybridAuth][1] auth providers.                                                                                                                                         |
| **&providerTpl**   | `tpl.HybridAuth.provider`   | Chunk for HybridAuth login/bind link.                                                                                                                                                           |
| **&activeProviderTpl** | `tpl.HybridAuth.provider.active` | Chunk for linked HybridAuth provider icon.                                                                                                                |

Example: register in group Users and redirect to the home page:

```modx
[[!OfficeAuth?
  &groups=`Users`
  &loginResourceId=`[[++site_start]]`
]]
```

The controller needs a default resource ID to generate auth links. That ID is stored in system setting **office_auth_page_id** and is set on the first snippet call on the site.

If you do not set **&loginResourceId**, this stored ID is used and all email links point to that page.

## Auth mode

Auth mode is set in system setting **office_auth_mode**.
By default registration and password reset use *email*; you can switch to *phone*.

Then choose the SMS provider in **office_sms_provider**.
By default [SmsRu][2] and [ByteHand][3] are available.

Provider settings:

- **office_sms_id** — client id on the service.
- **office_sms_key** — client key on the service (not needed for SmsRu).
- **office_sms_from** — sender label; must be agreed with the service.

Depending on mode, **email** or **mobilephone** is required for registration.

### Form actions

The default JavaScript handles all auth forms by the action in a hidden input:

```html
<input type="hidden" name="action" value="auth/action" />
```

Possible actions:

- **auth/formLogin** — normal login. If password is empty, an email with reset link is sent.
- **auth/formRegister** — register new user
- **auth/formAdd** — log in to another account (quick switch)
- **auth/sendLink** — send password reset link

Logout is done by loading the page with: `https://your.site/?action=auth/logout`.

To log out an account added via `auth/formAdd`, add `user_id`: `https://your.site/?action=auth/logout&user_id=15`.

These URLs are handled by Office plugins and can be on any page.

### Adding a provider

To add your own SMS provider, create a class in core/components/office/model/sms/**myprovider**.class.php.

Example structure:

```php
<?php

class MyProvider {
  function __construct(modX $modx, array $config = array()) {
    $this->modx = &$modx;
  }

  function send($phone, $text) {
    // Read system settings and send the message

    return true; // or error message
  }
}
```

Then set *MyProvider* in office_sms_provider.

You can also use the SMS provider for custom sending via MODX API:

```php
$provider = $modx->getOption('office_sms_provider');
if ($service = $modx->getService($provider, $provider, MODX_CORE_PATH . 'components/office/model/sms/')) {
  $send = $service->send('79234778899', 'Hello!');
  return $send === true
    ? 'Message sent!'
    : 'Send error: ' . $send;
}
```

The provider class must have a `send` method.

## Additional fields

Office registration only requires one field — email; everything else is optional.
This keeps signup quick; you can require profile completion later if needed.

Long registration forms reduce conversions, so Office keeps the form minimal.

To require extra fields, use a system plugin. For example, let the user choose a group:

Add a select to the registration form:

```html
<label for="office-auth-register-group" class="col-md-3 control-label">Group</label>
<div class="col-md-8">
  <select name="group" class="form-control" id="office-auth-register-group">
    <option value="users">Regular users</option>
    <option value="admins">Administrators</option>
  </select>
</div>
```

Then a plugin that validates the group and adds the user to it:

```php
<?php

// Predefined groups prevent form tampering
$groups = array(
  'admins' => 'Administrator',
  'users' => 'Users',
);

if ($modx->context->key != 'mgr') {
  switch ($modx->event->name) {
    case 'OnBeforeUserFormSave':
      if ($mode == 'new') {
        if (empty($_POST['group']) || !array_key_exists($_POST['group'], $groups)) {
          $modx->event->output('You must specify the user group!');
        }
        // $user->Profile->set('comment', 'Comment');
      }
      break;
    case 'OnUserFormSave':
      if ($mode == 'new') {
        $user->joinGroup($groups[$_POST['group']]);
      }
      break;
  }
}
```

Attach the plugin to **OnBeforeUserFormSave** and **OnUserFormSave**.
In this case you can omit **&groups** in OfficeAuth.

[1]: /en/components/hybridauth/snippets/hybridauth
[2]: http://sms.ru
[3]: http://bytehand.com
