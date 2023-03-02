The idea is that two snippets - one on the client site and another on the server site - run at once to authorize the client through the server. 

### officeRemoteServer
this snippet runs on the server from which users come. 
The address to which this snippet is called for, should be indicated with the client - let it be `site.com/remote/login`, for example.

When a client is directed to the server, it checks the authorization status. If we have a guest, they will be redirected to the login server page (if it is not indicated, then to the parent of document `site.com/remote/`).
There you can use officeAuth, HybridAuth, Login — anything you like - in order to authorize the user. 

Right after the authorization the user should be sent back to `site.com/remote/login` — there the snippet will get information about them, save it to cache for 10 seconds, generate an authorization token and send the user with it to the address from which the user has come.

Name       | By default     | Description
----------------|-------------------|------------
**&hosts**		| 					| List of domens (with commas), which are allowed to access the authorization page. 
**&key**		| 					| Obligatory data encryption key for keeping personal information safe. The key has to be the same for the client and the server. 
**&authId**		| 0					| Id of the site page, for user's authorization. After a successful authorization the user has to be redirected back to the snippet "officeRemoteServer".

In the authorization snippet you have to indicate 
```
&loginResourceId=`id страницы site.com/remote/login`
```

That is, we have 2 pages on the server. 
`site.com/remote/` (id = 1)
```
[[!officeAuth?
	&loginResourceId=`2`
]]
```

`site.com/remote/login` (id = 2)
```
[[!officeRemoteServer?
	&hosts=`site2.ru`
	&key=`h4O58eqwt987Jmqewj`
	&authId=`1`
]]
```

### officeRemoteAuth
This snippet shows the login and logout forms. 

There should be authorization link `site.com/remote/login` in the login form. The user starts authorizing after clicking it. 
If everything is alright, they will be authorized on the server and return to the client with the token, by which the client can get information about the user from the server.

This information is encrypted by the indicated key **&key**, and after getting the data the user is created/updated and authorized on the client.

When the user exits the client site, they exit the server site bu the same algorithm (only without any data exchange).

Most parameters coincide with those of [officeAuth][1] (chunks, groups, contexts, remembering, etc.), but there are also some unqie ones:

Name               | By default            | Description
------------------------|---------------------------|------------
**&tplLogin**			| tpl.Office.remote.login	| This chunk will be shown to an anonymous user, i.e. to any guest. 
**&tplLogout**			| tpl.Office.remote.logout	| This chunk will be shown to an authorized user. 
**&groups**				| 							| List of groups for a user registration, with commas. User's role in the group can be written after a colon. For example, &groups=`Users:1` will add a user to "Users" group with a "member" role.
**&rememberme**			| 1							| Remembers a user for a long time. On by default.
**&loginContext**		| 							| General context for authorization. By default - the current one.
**&addContexts**		| 							| Additional contexts, with commas. For example, &addContexts=`web,ru,en`
**&loginResourceId**	| 0							| Identifier of a resource to which the user will be sent after authorization. By default it is 0, which updates the current page.
**&logoutResourceId**	| 0							| Identifier of a resource to which the user will be sent when the session is ended. By default it is 0, which updates the current page.
**&updateUser**			| 1							| Permission to update existing users with data from the remote server. 
**&createUser**			| 1							| Permission to create new users. 
**&remote**				| 							| Obligatory address of the remote server page with a call for snippet "officeAuthServer".
**&key**				| 							| Obligatory data encryption key for keeping personal information safe. The key has to be the same for the client and the server. 

On the client site the snippet can be called for like this: 
```
[[!officeRemoteAuth?
	&key=`h4O58eqwt987Jmqewj`
	&remote=`http://site.com/remote/login`
	&groups=`Users`
]]
```

[1]: /en/01_Components/19_Office/03_Controllers/01_Authorization.md
