# aflRequiredIf

Позволяет делать проверяемое поле обязательным в зависимости от значения в другом поле.

## Пример использования

```html
...
'customValidators' => 'aflRequiredIf',
'validate' => 'ogrn:aflRequiredIf=^legal_form|2^',
...
```

В примере поле с именем `ogrn` будет обязательным, если поле именем `legal_form` имеет значение 2.
