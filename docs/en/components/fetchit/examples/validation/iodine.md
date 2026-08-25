---
title: Validation with Iodine
description: "FetchIt client-side validation with Iodine and fetchit:before"
---

# Validation with Iodine

Client-side validation for a two-field form with [Iodine](https://github.com/caneara/iodine) and [`fetchit:before`](/en/components/fetchit/frontend/events#fetchitbefore).

<!--@include: ../../parts/validation.warning.md-->

## Setup

CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@caneara/iodine@8/dist/iodine.min.umd.js" defer></script>
```

## Markup

`novalidate` disables built-in browser validation. For AJAX, add `[data-success]` and `[data-validation-error]` ([selectors](/en/components/fetchit/selectors)).

::: code-group

```modx
<form action="[[~[[*id]]]]" method="post" novalidate>
  <label> Name
    <input type="text" name="name" value="[[+fi.name]]" />
    <span data-error="name">[[+fi.error.name]]</span>
  </label>
  <label> E-mail
    <input type="email" name="email" value="[[+fi.email]]" />
    <span data-error="email">[[+fi.error.email]]</span>
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
  <label> E-mail
    <input type="email" name="email" value="{$_modx->getPlaceholder('fi.email')}" />
    <span data-error="email">{$_modx->getPlaceholder('fi.error.email')}</span>
  </label>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Submit</button>
</form>
```

:::

## Handler

`Iodine.assert` takes a fields object and rules. On failure, call `preventDefault`, then `setError` / `clearError`:

```js
document.addEventListener('fetchit:before', (e) => {
  const { formData, fetchit } = e.detail
  const fields = Object.fromEntries(formData.entries())
  const rules = {
    name: ['required', 'minLength:5'],
    email: ['required', 'email'],
  }

  const validation = Iodine.assert(fields, rules)
  if (validation.valid) {
    return
  }

  e.preventDefault()

  for (const [name, field] of Object.entries(validation.fields)) {
    if (field.valid) {
      fetchit.clearError(name)
      continue
    }

    fetchit.setError(name, field.error)
  }
})
```

Keep server-side checks in FormIt (or your own snippet):

::: code-group

```modx
[[!FetchIt?
  &form=`myForm.tpl`
  &validate=`name:required:minLength=^5^,email:required:email`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'myForm.tpl',
  'validate' => 'name:required:minLength=^5^,email:required:email',
]}
```

:::

FormIt validators: [FormIt documentation](https://docs.modx.com/3.x/en/extras/formit/formit.validators).
