# FetchIt Class Instance

Below is the list of properties and methods of an instance of **FetchIt** class.

## clearErrors()

This method clears all errors in the form.

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

This method clears errors associated with a specific field.

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

This method sets the invalidity status of a particular field by name. It may be convenient in cases of integrating validation on the front end.

- Type: `function (name: string, message: string): undefined`
- Example:

```js
document.addEventListener('fetchit:before', (e) => {
  e.preventDefault();
  const { fetchit } = e.detail;

  // Validation

  fetchit.setError('email', 'The email field has not been validated');
});
```

<!--@include: ../parts/validation.warning.md-->

## disableFields()

This method sets all form elements to the `disabled` state.

- Type: `function (): undefined`

## enableFields()

This method removes the `disabled` state from all form elements.

- Type: `function (): undefined`

## getFields()

This method returns an array of fields by name.

- Type: `function (name: string): HTMLElement[]`
