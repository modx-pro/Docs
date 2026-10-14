---
title: FetchIt instance
description: "Instance methods: field errors, form messages, disable/enable"
---

# FetchIt instance

Access: `FetchIt.instances.get(formElement)`. In events the instance is in `e.detail.fetchit`.

Types of the methods for TypeScript: [`fetchit.d.ts`](/en/components/fetchit/frontend/typescript).

Properties:

| Property | Description |
| --- | --- |
| `form` | `HTMLFormElement` |
| `config` | Config from `FetchIt.create()`: `actionUrl`, `pageId`, classes, `clearFieldsOnSuccess`, protection. Shared by the forms of one snippet call |
| `formData` | The data of the submission in progress or of the last one; `undefined` before the first |
| `fields` | The `input`, `select` and `textarea` elements of the form |
| `elements` | All elements of the form |

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

During the request the script calls `disable` / `enable` itself. You can call them manually. Fields disabled in the markup stay disabled after a submission.

## getFields(name)

Array of fields with `name` or `name[]`.

## getErrors(name)

Elements `[data-error="name"]` and `[data-error="name[]"]`.

## getCustomErrors(name)

Elements `[data-custom="name"]`.
