# haProfile

Snippet outputs user information for a profile page.

## Parameters

| Name               | Description                                                                                                                                                                                          |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **&activeProviderTpl** | Chunk for the icon of the linked provider.                                                                                                                                                      |
| **&profileFields**     | Comma-separated list of user fields allowed for editing. You can set max length with a colon. E.g. ``&profileFields=`username:25,fullname:50,email` `` |
| **&profileTpl**        | Chunk for displaying and editing the user profile. Placeholder `[[+providers]]` outputs the list of available and linked providers.                                                              |
| **&providerTpl**       | Chunk for the sign-in or link-provider link.                                                                                                                      |
| **&requiredFields**    | List of required fields when editing. These must be filled for the profile to update. E.g. ``&requiredFields=`username,fullname,email` ``                           |

## Examples

Call the snippet uncached, because it outputs different chunks depending on authentication:

```modx
[[!haProfile]]
```

Profile edit with allowed and required fields:

```modx
[[!haProfile?
  &requiredFields=`email,username`
  &profileFields=`email,username:25,fullname:50,comment:100`
]]
```

You need to add the extra fields to the chunk from **&profileTpl** yourself; the snippet does not do that.
