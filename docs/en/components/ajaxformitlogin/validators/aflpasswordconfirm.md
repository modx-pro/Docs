# aflPasswordConfirm

Validator snippet for password confirmation. Use this instead of the standard `password_confirm` validator, because the component can auto-generate a password when the user leaves it empty. With `password_confirm`, an empty password field causes a validation error; `aflPasswordConfirm` only checks when a password is entered. You **must** pass the name of the password field as the parameter.

## Usage example

```fenom
...
'customValidators' => 'aflPasswordConfirm',
'validate' => 'password_confirm:aflPasswordConfirm=^password^',
...
```
