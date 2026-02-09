# FetchIt instance

Below is a list of **FetchIt** instance properties and methods.

## clearErrors()

Clears all form errors.

- Type: `function (): undefined`
- Example:

```js
document.addEventListener('fetchit:after', (e) => {
  e.preventDefault();
  const { fetchit } = e.detail;
  fetchit.clearErrors();
});
```

## clearError()

Clears errors for a specific field.

- Type: `function (name: string): object`
- Example:

```js
document.addEventListener('fetchit:after', (e) => {
  e.preventDefault();
  const { fetchit } = e.detail;
  const { fields, errors, customErrors } = fetchit.clearError('password');
});
```

## setError()

Marks a field as invalid by name and sets its error message. Useful when integrating front-end validation.

- Type: `function (name: string, message: string): undefined`
- Example:

```js
document.addEventListener('fetchit:before', (e) => {
  e.preventDefault();
  const { fetchit } = e.detail;

  // Field validation

  fetchit.setError('email', 'Email validation failed');
});
```

<!--@include: ../parts/validation.warning.md-->

## disableFields()

Disables all form elements.

- Type: `function (): undefined`

## enableFields()

Removes `disabled` from all form elements.

- Type: `function (): undefined`

## getFields()

Returns an array of elements for the given field name.

- Type: `function (name: string): HTMLElement[]`

<!-- ## getErrors()

Returns an array of error wrapper elements for the given field name.

- Type: `function (name: string): HTMLElement[]`

## getCustomErrors()

Returns an array of elements with `data-custom="*"` for the given field name.

- Type: `function (name: string): HTMLElement[]` -->
