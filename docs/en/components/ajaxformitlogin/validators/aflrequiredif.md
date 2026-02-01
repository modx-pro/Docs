# aflRequiredIf

Makes a field required depending on the value of another field.

## Usage example

```fenom
...
'customValidators' => 'aflRequiredIf',
'validate' => 'ogrn:aflRequiredIf=^legal_form|2^',
...
```

In this example the field `ogrn` is required when the field `legal_form` has value `2`.
