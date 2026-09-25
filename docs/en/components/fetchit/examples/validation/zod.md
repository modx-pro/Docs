---
title: Validation with Zod
description: "FetchIt client-side form checks with a Zod 4 schema in the fetchit:before event"
---

# Validation with Zod

[Zod](https://zod.dev/) is the most popular schema library for JavaScript. If the project already has Zod or the team is used to it, the same schemas work for FetchIt forms. For the browser Zod 4 has a light build, [`zod/mini`](https://zod.dev/packages/mini): the rules are written as functions instead of a method chain, but the browser gets several times less code.

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
  import * as z from 'https://cdn.jsdelivr.net/npm/zod@4/mini/+esm'

  const ContactSchema = z.object({
    name: z.string().check(
      z.trim(),
      z.minLength(1, 'What should we call you?'),
      z.minLength(2, 'The name needs at least two letters'),
    ),
    email: z.string().check(
      z.trim(),
      z.minLength(1, 'Enter your e-mail'),
      z.email('The address seems to have a typo'),
    ),
    agree: z.literal('1', 'We cannot reply without your consent'),
  })

  document.addEventListener('fetchit:before', (e) => {
    const { formData, fetchit } = e.detail
    const result = ContactSchema.safeParse(Object.fromEntries(formData))
    if (result.success) {
      return
    }

    e.preventDefault()

    const errors = z.flattenError(result.error).fieldErrors
    for (const [name, [message]] of Object.entries(errors)) {
      fetchit.setError(name, message)
    }

    fetchit.getFields(Object.keys(errors)[0])[0]?.focus()
  })
</script>
```

- Zod checks all the rules of a field and collects all the messages, so the order of the rules matters: the first one is shown for each field. An empty name gets "What should we call you?", not "The name needs at least two letters".
- `z.flattenError(...).fieldErrors` sorts the messages by field name.
- An unchecked checkbox is not in `formData`, and `z.literal` reports it with its own text.
- `z.object` lets extra fields through — the service fields of FetchIt and of the spam protection.

If the site uses regular Zod rather than `zod/mini`, the schema is written as a chain: `z.string().trim().min(2, 'The name needs at least two letters')`, and the handler stays the same.

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
