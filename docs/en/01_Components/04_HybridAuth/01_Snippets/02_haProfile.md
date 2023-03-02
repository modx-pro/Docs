Snippet outputs information about user for organize the profile.

## Options
Name					| Description
------------------------|------------------------------------------------
**&activeProviderTpl**	| Chunk for output icon of the linked services.
**&profileFields**		| Comma-separated list of user's fields allowed for edit. Also you can specify max length of values using colon. Example: &profileFields=\`username:25,full name:50,email\`
**&profileTpl**			| Chunk for output and edit user profile.
**&providerTpl**		| Chunk for displaying authorization link or for linking service with account.
**&requiredFields**		| List of required fields while editing. This fields must be filled for successful profile updating. Example, &requiredFields=\`username,full name,email\`

## Examples
Snippet must be called not cached, because since depending on the authorization it displays a different chunks:

```
[[!haProfile]]
```

The call editing profile with defining of allowed and required fields:
```
[[!haProfile?
	&requiredFields=`email,username`
	&profileFields=`email,username:25,fullname:50,comment:100`
]]
```

Of course, you must add the additional fields to chunk &profileTpl, snippet not will make it itself.