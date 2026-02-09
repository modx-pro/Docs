# aflUserExists (deprecated since 1.0.9)

Snippet checks whether a user with the given username exists. Returns an error if the user **is found**. Used during registration.

## Usage example

```fenom
...
'customValidators' => 'aflUserExists',
'validate' => 'email:required:aflUserExists',
...
```
