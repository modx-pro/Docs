---
title: Validation with yup
description: FetchIt client-side validation with yup and fetchit:before
---

# Validation with yup

Validate fields before submit with [yup](https://github.com/jquense/yup) and [`fetchit:before`](/en/components/fetchit/frontend/events#fetchitbefore). Example: name and age.

<!--@include: ../../parts/validation.warning.md-->

## Markup

`novalidate` disables browser validation. For AJAX, add `[data-success]` and `[data-validation-error]`.

::: code-group

```modx
<form action="[[~[[*id]]]]" method="post" novalidate>
  <label> Name
    <input type="text" name="name" value="[[+fi.name]]" />
    <span data-error="name">[[+fi.error.name]]</span>
  </label>
  <label> Age
    <input type="text" name="age" value="[[+fi.age]]" />
    <span data-error="age">[[+fi.error.age]]</span>
  </label>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Submit</button>
</form>
```

```fenom
<form action="{$_modx->resource.id | url}" method="post" novalidate>
  <label> Name
    <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}" />
    <span data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span>
  </label>
  <label> Age
    <input type="text" name="age" value="{$_modx->getPlaceholder('fi.age')}" />
    <span data-error="age">{$_modx->getPlaceholder('fi.error.age')}</span>
  </label>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Submit</button>
</form>
```

:::

## Setup

ESM from CDN:

```html
<script type="module">
  import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm'
</script>
```

## Handler

yup schema, `validateSync` with `abortEarly: false`, errors via `setError`. Optional toast via `FetchIt.Message` ([notifications](/en/components/fetchit/examples/notifications/)):

```html
<script type="module">
  import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm'

  document.addEventListener('fetchit:before', (e) => {
    const { formData, fetchit } = e.detail
    const fields = Object.fromEntries(formData.entries())

    const formSchema = yup.object({
      name: yup
        .string()
        .required('Enter your name'),
      age: yup
        .number()
        .required('Enter your age')
        .min(18, 'You must be at least 18')
        .integer()
        .typeError('Field must be a number'),
    })

    try {
      formSchema.validateSync(fields, { abortEarly: false })
    } catch (err) {
      e.preventDefault()

      for (const { path, message } of err.inner) {
        fetchit.setError(path, message)
      }

      FetchIt.Message?.error?.('Fix the form errors')
    }
  })
</script>
```

::: details Localizing yup messages
Set error text in the schema (as above) or via the yup localization API. See [error message customization](https://github.com/jquense/yup#error-message-customization).
:::

Mirror rules on the server in FormIt:

::: code-group

```modx
[[!FetchIt?
  &form=`form.tpl`
  &hooks=`email,FormItSaveForm`
  &validate=`name:required,age:required:isNumber:minValue=^18^`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'form.tpl',
  'hooks' => 'email,FormItSaveForm',
  'validate' => 'name:required,age:required:isNumber:minValue=^18^',
]}
```

:::

FormIt validators: [FormIt documentation](https://docs.modx.com/3.x/en/extras/formit/formit.validators).
