# aflActivateUser

Snippet for activating a user account. If the activation link has expired, the profile will be deleted.

This snippet does not accept any parameters.

## Usage example

```fenom
{set $user = '!aflActivateUser' | snippet}
{if $user}
<h2>Dear {$user.username}, your account has been successfully activated!</h2>
{/if}
```

On successful activation an array with all user data is returned; on failure it returns false.
