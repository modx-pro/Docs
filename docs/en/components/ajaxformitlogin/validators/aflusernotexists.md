# aflUserNotExists

Snippet checks whether a user with the given username exists. Returns an error if the user **is not found**. Used for password recovery.

## Usage example

```fenom
...
'customValidators' => 'aflUserNotExists',
'validate' => 'email:required:aflUserNotExists',
...
```
