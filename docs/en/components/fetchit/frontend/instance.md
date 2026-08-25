# FetchIt instance

Access: `FetchIt.instances.get(formElement)`. In events the instance is in `e.detail.fetchit`.

Properties:

| Property | Description |
| --- | --- |
| `form` | `HTMLFormElement` |
| `config` | Config from `FetchIt.create()` (actionUrl, pageId, classes, clearFieldsOnSuccess) |

## clearErrors()

Clears errors from all fields.

```js
document.addEventListener('fetchit:after', (e) => {
  e.detail.fetchit.clearErrors()
})
```

## clearError(name)

Clears errors for one field. Returns `{ fields, errors, customErrors }`.

```js
const { fields, errors, customErrors } = fetchit.clearError('password')
```

## setError(name, message)

Marks a field invalid: classes, `aria-invalid`, text in `[data-error]`. The message goes through `sanitizeHTML`. An empty/whitespace string is ignored.

```js
document.addEventListener('fetchit:before', (e) => {
  const { formData, fetchit } = e.detail
  if (!formData.get('email')) {
    fetchit.setError('email', 'Enter an email')
    e.preventDefault()
  }
})
```

<!--@include: ../parts/validation.warning.md-->

## setFormMessage(type, message)

Shows a form-level message.

- `type`: `'success'` → `[data-success]`, otherwise → `[data-validation-error]`
- the paired block is hidden

```js
fetchit.setFormMessage('success', 'Done')
fetchit.setFormMessage('validation', 'Check the fields')
```

## clearFormMessages()

Hides and clears `[data-success]` and `[data-validation-error]`.

## disableFields() / enableFields()

During the request the script calls `disable` / `enable` itself. You can call them manually.

## getFields(name)

Array of fields with `name` or `name[]`.

## getErrors(name)

Elements `[data-error="name"]` and `[data-error="name[]"]`.

## getCustomErrors(name)

Elements `[data-custom="name"]`.
