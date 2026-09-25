---
title: Checking phone and e-mail with validator.js
description: "Checking a phone number and an e-mail in a FetchIt form with the ready-made validator.js functions"
---

# Checking phone and e-mail with validator.js

[validator.js](https://github.com/validatorjs/validator.js) is not a schema but a set of ready-made string checks: e-mail, phone, URL, date, bank card number and dozens more. It helps where the browser's built-in checks are not enough. For example, `type="email"` lets through `john@example` without a top-level domain, and the browser does not check phone numbers at all.

<!--@include: ../../parts/validation.warning.md-->

## Loading

```html
<script src="https://cdn.jsdelivr.net/npm/validator@13/validator.min.js" defer></script>
```

## Markup

The `data-check` attribute says which check to apply to a field:

::: code-group

```modx
<form action="[[~[[*id]]]]" method="post" novalidate>
  <label> E-mail
    <input type="email" name="email" value="[[+fi.email]]" data-check="email">
    <span data-error="email">[[+fi.error.email]]</span>
  </label>
  <label> Phone
    <input type="tel" name="phone" value="[[+fi.phone]]" data-check="phone">
    <span data-error="phone">[[+fi.error.phone]]</span>
  </label>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Send</button>
</form>
```

```fenom
<form action="{$_modx->resource.id | url}" method="post" novalidate>
  <label> E-mail
    <input type="email" name="email" value="{$_modx->getPlaceholder('fi.email')}" data-check="email">
    <span data-error="email">{$_modx->getPlaceholder('fi.error.email')}</span>
  </label>
  <label> Phone
    <input type="tel" name="phone" value="{$_modx->getPlaceholder('fi.phone')}" data-check="phone">
    <span data-error="phone">{$_modx->getPlaceholder('fi.error.phone')}</span>
  </label>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Send</button>
</form>
```

:::

## Handler

```js
const checks = {
  email: {
    test: (value) => validator.isEmail(value),
    message: 'The address seems to have a typo',
  },
  phone: {
    // Brackets, spaces and hyphens do not matter: only digits and + are checked
    test: (value) => validator.isMobilePhone(value.replace(/[\s()-]/g, ''), 'ru-RU'),
    message: 'Enter a mobile number, for example +7 912 345-67-89',
  },
}

document.addEventListener('fetchit:before', (e) => {
  const { form, fetchit } = e.detail
  let first = null

  for (const field of form.querySelectorAll('[data-check]')) {
    const check = checks[field.dataset.check]
    const value = field.value.trim()
    if (!check || !value || check.test(value)) {
      continue
    }

    fetchit.setError(field.name, check.message)
    first ??= field
  }

  if (first) {
    e.preventDefault()
    first.focus()
  }
})
```

- Empty fields are skipped: required fields are checked by the server or by the `required` attribute together with [browser validation](/en/components/fetchit/examples/validation/native).
- `'ru-RU'` accepts numbers like `+79123456789`, `89123456789` and `9123456789`. For other countries pass their locale, for example `'en-GB'` or `'de-DE'`, or an array of locales. Without a locale the check accepts a number from any country.
- A new check is a new key in `checks` — for example, `url` with `validator.isURL(value)` — and a `data-check="url"` attribute in the markup.

## Checks on the server

Client-side checks only help the visitor. On the server FormIt checks the e-mail with its `email` validator, and the phone with a regular expression or your own validator:

::: code-group

```modx
[[!FetchIt?
  &form=`myForm.tpl`
  &hooks=`email`
  &validate=`email:required:email,phone:required:minLength=^10^`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'myForm.tpl',
  'hooks' => 'email',
  'validate' => 'email:required:email,phone:required:minLength=^10^',
]}
```

:::

FormIt validators: [FormIt documentation](https://docs.modx.com/3.x/en/extras/formit/formit.validators).
