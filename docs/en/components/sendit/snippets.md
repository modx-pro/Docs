# Snippets

## RenderForm

### Purpose

Saves preset (snippet parameters) to session, renders form chunk, no preset file needed.

### Parameters

Accepts all preset parameters plus:

* `tpl` - form chunk.
* `presetName` - preset name, must be unique (not in preset file).

### Result

Returns parsed form chunk.

### Example

```fenom
{'RenderForm' | snippet: [
  'tpl' => '@FILE chunks/forms/exampleForm.tpl',
  'presetName' => 'snippet_form',
  'extends' => 'default',
  'redirectTo' => 0,
  'redirectTimeout' => 3000,
  'clearFieldsOnSuccess' => 1,
  'fieldNames' => 'age==Age,name==Name,phone==Phone,email==Email',
  'successMessage' => 'Form submitted!',
  'validationErrorMessage' => 'Fix errors!'
]}
```

## ActivateUser

### Purpose

Activates user after email confirmation.

### Parameters

* `toPls` - save snippet result to placeholder.

### Result

Returns array of activated user data.

### Example

:::info
Call snippet on page with ID equal to `activationResourceId` parameter.
:::

```fenom
{'!ActivateUser' | snippet: ['toPls' => 'userData']}
```

## requiredIf

### Purpose

Validator: makes field required based on another field's value.

### Example

```php:line-numbers
...
'validate' => 'ogrn:requiredIf=^legal_form|2^',
...
```

Field **ogrn** is required when **legal_form** equals **2**.

## checkPassLength

### Purpose

Password length validator. Use this instead of **minLength** because the component can auto-generate password when empty. **minLength** fails on empty; **checkPassLength** only validates when password is set. Pass min length as parameter, or use system setting **password_min_length** (default **8**).

### Example

```php:line-numbers
...
'validate' => 'password:checkPassLength=^10^',
...
```

## passwordConfirm

### Purpose

Password match validator. Use instead of **password_confirm** because of auto-generated password support. **password_confirm** fails on empty; **passwordConfirm** checks match only when password is set. **Must** pass password field name as parameter.

### Example

```php:line-numbers
...
'validate' => 'password_confirm:passwordConfirm=^password^',
...
```

## userNotExists

### Purpose

Validator: checks if user with given username exists. Returns error if user **NOT FOUND**. Used for password recovery.

### Example

```php:line-numbers
...
'validate' => 'email:required:userNotExists',
...
```

## userExists

### Purpose

Validator: checks if user with given username exists. Returns error if user **FOUND**.

## PasswordReset

### Purpose

Password reset activator snippet.

### Parameters

* `toPls` - save snippet result to placeholder.

### Result

Returns array of user data for whom password was reset.

### Example

:::info
Call snippet on page with ID equal to `activationResourceId` parameter.
:::

```fenom:line-numbers
{'!PasswordReset' | snippet: []}
```

## Pagination

### Purpose

Wrapper for paginated output.

### Parameters

* `snippet` - snippet called on page change, always *!Pagination*.
* `render` - snippet that renders results, must return HTML and set **totalVar** placeholder. Default *!pdoResources*; requires **setTotal**.
* `presetName` - preset name for call parameters, unique per Pagination call on page.
* `tplEmpty` - chunk for empty result from **render** snippet.
* `pagination` - prefix for page GET param and **currentPage**, **limit** placeholders; must match **data-pn-result**, **data-pn-pagination** attributes.
* `resultBlockSelector` - CSS selector for results block.
* `resultShowMethod` - **insert** - replace content, **append** - add content.
* `hashParams` - param keys included in hash.
* `totalVar` - placeholder key for total count.
* `limit` - results per page.

Other params go to **render** snippet.

### Result

Returns HTML of first page from **render** snippet.

### Example

```fenom:line-numbers
{'!Pagination' | snippet: [
  'snippet' => '!Pagination',
  'render' => '!pdoResources',
  'presetName' => 'pagination',
  'tplEmpty' => '@FILE chunks/pdoresources/empty.tpl',
  'pagination' => 'one',
  'resultBlockSelector' => '[data-pn-result="one"]',
  'resultShowMethod' => 'insert',
  'hashParams' => '',
  'totalVar' => 'total'
  'limit' => 6,

  'parents' => 7,
  'tpl' => '@FILE chunks/pdoresources/item.tpl',
  'includeContent' => 1,
  'setTotal' => 1,
]}
```
