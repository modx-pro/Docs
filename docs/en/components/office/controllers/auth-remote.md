# Remote authentication

The idea: two snippets run on the client site and the server site so that the client can log in via the server.

## officeRemoteServer

This snippet runs on the server that users will log in through.
The URL where this snippet is called must be set on the client — e.g. `site.com/remote/login`.

When the client visits the server, the server checks login status. If the user is a guest, they are redirected to the server login page (or the parent of the document at `site.com/remote/` if not set).
There you can use officeAuth, HybridAuth, Login — anything that logs the user in.

Right after login the user must be sent back to `site.com/remote/login` — the snippet will get their info, cache it for 10 seconds, generate an auth token and send the user back to the URL they came from with that token.

| Name    | Default | Description                                                                                                                                                |
|---------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **&hosts**  |         | Comma-separated list of domains allowed to access the auth page                                                                                            |
| **&key**    |         | Required encryption key for the data. Must be the same on server and client                                                                                 |
| **&authId** | `0`     | Resource ID of the server login page. After successful login the user must be redirected back to the "officeRemoteServer" snippet page                     |

The auth snippet must have:

```modx
&loginResourceId=`id of the page site.com/remote/login`
```

So on the server you have two pages:

`site.com/remote/` (id = 1)

```modx
[[!officeAuth?
  &loginResourceId=`2`
]]
```

`site.com/remote/login` (id = 2)

```modx
[[!officeRemoteServer?
  &hosts=`site2.ru`
  &key=`h4O58eqwt987Jmqewj`
  &authId=`1`
]]
```

## officeRemoteAuth

This snippet shows the login/logout form.

The login form must include a link to `site.com/remote/login`; when the user follows it, auth starts on the server.
If all is well, they log in on the server and return to the client with a token; the client uses the token to get user data from the server.

That data is encrypted with **&key**. After receiving it, the user is created or updated and logged in on the client.

On logout from the client, the same flow runs (without user data exchange) and the user is logged out on the server too.

Most parameters match [officeAuth][1] (chunks, groups, contexts, remember, etc.); some are specific:

| Name                | Default                 | Description                                                                                                                                                |
|---------------------|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **&tplLogin**       | `tpl.Office.remote.login`  | Chunk shown to anonymous users                                                                                                                             |
| **&tplLogout**      | `tpl.Office.remote.logout` | Chunk shown to logged-in users                                                                                                                             |
| **&groups**         |                         | List of groups for registration, comma-separated. Role via colon, e.g. `&groups=`Users:1`` adds user to "Users" with role "member"                         |
| **&rememberme**     | `1`                     | Remember user for a long time. Default: on                                                                                                                  |
| **&loginContext**   |                         | Main context for login. Default: current                                                                                                                    |
| **&addContexts**    |                         | Extra contexts, comma-separated. E.g. `&addContexts=`web,ru,en``                                                                                           |
| **&loginResourceId**  | `0`                   | Resource ID to redirect to after login. Default 0 = refresh current page                                                                                   |
| **&logoutResourceId** | `0`                   | Resource ID to redirect to after logout. Default 0 = refresh current page                                                                                   |
| **&updateUser**     | `1`                     | Allow updating existing users with data from the remote server                                                                                            |
| **&createUser**     | `1`                     | Allow creating new users                                                                                                                                   |
| **&remote**         |                         | Required URL of the page on the remote server with the "officeRemoteServer" snippet                                                                        |
| **&key**            |                         | Required encryption key. Must be the same on server and client                                                                                             |

Example on the client:

```modx
[[!officeRemoteAuth?
  &key=`h4O58eqwt987Jmqewj`
  &remote=`http://site.com/remote/login`
  &groups=`Users`
]]
```

[1]: /en/components/office/controllers/auth
