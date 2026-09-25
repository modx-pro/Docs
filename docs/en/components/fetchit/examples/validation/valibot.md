---
title: Validation with Valibot
description: "FetchIt client-side form checks with a Valibot schema in the fetchit:before event"
---

# Validation with Valibot

[Valibot](https://valibot.dev/) describes the form rules with a schema, like yup or Zod, but is built from separate functions. For a form with three fields the browser gets 2–3 KB.

<!--@include: ../../parts/validation.warning.md-->

## Markup

`novalidate` turns off the browser popups: FetchIt shows the errors in `[data-error]`.

::: code-group

```modx
<form action="[[~[[*id]]]]" method="post" novalidate>
  <label> Name
    <input type="text" name="name" value="[[+fi.name]]">
    <span data-error="name">[[+fi.error.name]]</span>
  </label>
  <label> E-mail
    <input type="email" name="email" value="[[+fi.email]]">
    <span data-error="email">[[+fi.error.email]]</span>
  </label>
  <label>
    <input type="checkbox" name="agree" value="1">
    I agree to the processing of my personal data
  </label>
  <span data-error="agree">[[+fi.error.agree]]</span>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Send</button>
</form>
```

```fenom
<form action="{$_modx->resource.id | url}" method="post" novalidate>
  <label> Name
    <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}">
    <span data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span>
  </label>
  <label> E-mail
    <input type="email" name="email" value="{$_modx->getPlaceholder('fi.email')}">
    <span data-error="email">{$_modx->getPlaceholder('fi.error.email')}</span>
  </label>
  <label>
    <input type="checkbox" name="agree" value="1">
    I agree to the processing of my personal data
  </label>
  <span data-error="agree">{$_modx->getPlaceholder('fi.error.agree')}</span>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Send</button>
</form>
```

:::

## Schema and handler

```html
<script type="module">
  import * as v from 'https://cdn.jsdelivr.net/npm/valibot@1/+esm'

  const ContactSchema = v.object({
    name: v.pipe(
      v.string(),
      v.trim(),
      v.nonEmpty('What should we call you?'),
      v.minLength(2, 'The name needs at least two letters'),
    ),
    email: v.pipe(
      v.string(),
      v.trim(),
      v.nonEmpty('Enter your e-mail'),
      v.email('The address seems to have a typo'),
    ),
    agree: v.pipe(
      v.optional(v.string(), ''),
      v.value('1', 'We cannot reply without your consent'),
    ),
  })

  document.addEventListener('fetchit:before', (e) => {
    const { formData, fetchit } = e.detail
    const result = v.safeParse(ContactSchema, Object.fromEntries(formData))
    if (result.success) {
      return
    }

    e.preventDefault()

    const errors = v.flatten(result.issues).nested ?? {}
    for (const [name, [message]] of Object.entries(errors)) {
      fetchit.setError(name, message)
    }

    fetchit.getFields(Object.keys(errors)[0])[0]?.focus()
  })
</script>
```

- `Object.fromEntries(formData)` collects the fields into an object. `v.object` lets extra fields through — the service fields of FetchIt and of the spam protection.
- An unchecked checkbox is not in `formData` at all. `v.optional(v.string(), '')` puts an empty string in its place, and `v.value` shows its own message. Without `optional` Valibot would answer with a technical text about a missing key.
- `v.flatten` sorts the errors by field name. The first message is taken for each field.
- The module runs deferred, like `defer`, so `DOMContentLoaded` is not needed: the handler is in place before the visitor has time to send the form.

## Checks on the server

Client-side checks only help the visitor. The same rules are needed on the server — in FormIt or in your own snippet:

::: code-group

```modx
[[!FetchIt?
  &form=`myForm.tpl`
  &hooks=`email`
  &validate=`name:required:minLength=^2^,email:required:email,agree:required`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'myForm.tpl',
  'hooks' => 'email',
  'validate' => 'name:required:minLength=^2^,email:required:email,agree:required',
]}
```

:::

FormIt validators: [FormIt documentation](https://docs.modx.com/3.x/en/extras/formit/formit.validators).
