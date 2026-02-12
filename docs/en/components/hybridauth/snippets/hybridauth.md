# HybridAuth

Snippet outputs a sign-in form for the site.

## Parameters

| Name               | Default                     | Description                                                                                                                                                                                                        |
|--------------------|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **&activeProviderTpl** | `tpl.HybridAuth.provider.active` | Chunk for the icon of the linked provider.                                                                                                                                                                    |
| **&addContexts**       |                                  | Additional contexts, comma-separated. E.g. ``&addContexts=`web,ru,en` ``                                                                                                                                |
| **&groups**            |                                  | List of groups for user registration, comma-separated. You can specify user role in the group with a colon. E.g. ``&groups=`Users:1` `` adds the user to group "Users" with role "member".                |
| **&loginContext**      | `current context`                | Main context for authentication. Default is current.                                                                                                                                                      |
| **&loginResourceId**   | `0`                              | Resource ID to redirect the user to after login. Default 0 refreshes the current page.                                                                                         |
| **&loginTpl**          | `tpl.HybridAuth.login`           | This chunk is shown to anonymous users (guests).                                                                                                                                          |
| **&logoutResourceId**  | `0`                              | Resource ID to redirect the user to after logout. Default 0 refreshes the current page.                                                                                   |
| **&logoutTpl**         | `tpl.HybridAuth.logout`          | This chunk is shown to authenticated users.                                                                                                                                                           |
| **&providerTpl**       | `tpl.HybridAuth.provider`        | Chunk for the sign-in or link-provider link.                                                                                                                                    |
| **&providers**         | `all available`                  | List of auth providers, comma-separated. All available providers are in `{core_path}components/hybridauth/model/hybridauth/lib/Providers/`. E.g. ```&providers=`Google,Twitter,Facebook````. |
| **&rememberme**        | `1`                              | Remember the user for a long time. Default is on.                                                                                                                                               |

## Examples

Call the snippet uncached, because it outputs different chunks depending on authentication.

With a normal call the snippet shows all providers registered in the system:

```modx
[[!HybridAuth]]
```

You can limit them with a comma-separated list:

```modx
[[!HybridAuth?
  &providers=`Yandex,Google,Twitter,Facebook,Vkontakte`
]]
```

Sign in to 2 contexts at once:

```modx
[[!HybridAuth?
  &providers=`Yandex,Google`
  &loginContext=`web`
  &addContexts=`en`
]]
```

## Provider settings

Each auth provider has its own system setting with the **ha.keys.** prefix:

![Provider settings](https://file.modx.pro/files/0/6/3/063adfe9b80ed7c6053b97e3818e0e0b.png)

The setting value is a JSON array; its contents depend on the provider.

For example, Google needs **id** and secret, while Twitter needs **key** and secret. Check what the provider gives you when you register.

### Provider registration links

You need to obtain keys from the provider. Main links:

- [Yandex][1]
- [Vkontakte][2]
- [Twitter][3]
- [Google][4]
- [Facebook][5]
- [Other providers][6]

### Contexts

If you have several independent contexts, you can use the same providers for different domains.

Put the keys in the context settings, not in global system settings.

*Friendly URLs are recommended for the snippet to work correctly.*

[1]: /en/components/hybridauth/providers/yandex
[2]: /en/components/hybridauth/providers/vkontakte
[3]: /en/components/hybridauth/providers/twitter
[4]: /en/components/hybridauth/providers/google
[5]: /en/components/hybridauth/providers/facebook
[6]: /en/components/hybridauth/providers/
