# aflCheckPassLength

Validator snippet for password length. Use this instead of the standard `minLength` validator, because the component can auto-generate a password when the user leaves it empty. With `minLength`, an empty password field causes a validation error; `aflCheckPassLength` only checks length when a password is entered. You can pass the minimum length as a parameter; otherwise the system setting `password_min_length` or `8` is used.

## Usage example

```fenom
...
'customValidators' => 'aflCheckPassLength',
'validate' => 'password:aflCheckPassLength=^10^',
...
```
