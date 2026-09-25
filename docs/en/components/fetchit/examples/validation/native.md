---
title: Browser validation
description: "FetchIt field checks with HTML attributes and the Constraint Validation API, no libraries"
---

# Browser validation

The browser can check fields by itself: `required`, `type="email"`, `minlength`, `pattern`, `min` and `max`. It usually shows the errors in its own popups, which look different in every browser and do not match the design. Here its checks stay, and FetchIt takes over showing the errors — in the same `[data-error]` elements as the errors from the server.

<!--@include: ../../parts/validation.warning.md-->

## Markup

`novalidate` turns off the browser popups, but not the checks themselves. Your own error text is set with data attributes — otherwise the browser's standard text is shown, in the language of its interface.

::: code-group

```modx
<form action="[[~[[*id]]]]" method="post" novalidate>
  <label> Name
    <input type="text" name="name" value="[[+fi.name]]"
      required minlength="2"
      data-value-missing="What should we call you?"
      data-too-short="The name needs at least two letters">
    <span data-error="name">[[+fi.error.name]]</span>
  </label>
  <label> E-mail
    <input type="email" name="email" value="[[+fi.email]]"
      required
      data-value-missing="Enter your e-mail"
      data-type-mismatch="The address seems to have a typo">
    <span data-error="email">[[+fi.error.email]]</span>
  </label>
  <label> Phone
    <input type="tel" name="phone" value="[[+fi.phone]]"
      pattern="\+?[0-9\s\-\(\)]{10,20}"
      data-pattern-mismatch="Only digits, spaces, brackets and hyphens">
    <span data-error="phone">[[+fi.error.phone]]</span>
  </label>
  <label>
    <input type="checkbox" name="agree" value="1" required
      data-value-missing="We cannot reply without your consent">
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
    <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}"
      required minlength="2"
      data-value-missing="What should we call you?"
      data-too-short="The name needs at least two letters">
    <span data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span>
  </label>
  <label> E-mail
    <input type="email" name="email" value="{$_modx->getPlaceholder('fi.email')}"
      required
      data-value-missing="Enter your e-mail"
      data-type-mismatch="The address seems to have a typo">
    <span data-error="email">{$_modx->getPlaceholder('fi.error.email')}</span>
  </label>
  <label> Phone
    <input type="tel" name="phone" value="{$_modx->getPlaceholder('fi.phone')}"
      pattern="\+?[0-9\s\-\(\)]{10,20}"
      data-pattern-mismatch="Only digits, spaces, brackets and hyphens">
    <span data-error="phone">{$_modx->getPlaceholder('fi.error.phone')}</span>
  </label>
  <label>
    <input type="checkbox" name="agree" value="1" required
      data-value-missing="We cannot reply without your consent">
    I agree to the processing of my personal data
  </label>
  <span data-error="agree">{$_modx->getPlaceholder('fi.error.agree')}</span>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Send</button>
</form>
```

:::

## Handler

```js
const states = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'tooShort',
  'tooLong',
  'rangeUnderflow',
  'rangeOverflow',
]

// Your own text from a data attribute, or the browser's standard text
const messageFor = (field) => {
  const state = states.find((name) => field.validity[name] && field.dataset[name])
  return state ? field.dataset[state] : field.validationMessage
}

document.addEventListener('fetchit:before', (e) => {
  const { form, fetchit } = e.detail
  if (form.checkValidity()) {
    return
  }

  e.preventDefault()

  const invalid = fetchit.fields.filter((field) => field.name && !field.validity.valid)
  for (const field of invalid) {
    fetchit.setError(field.name.replace(/\[\]$/, ''), messageFor(field))
  }

  invalid[0]?.focus()
})
```

- `data-value-missing` in the markup becomes `dataset.valueMissing`: the browser turns the names from kebab-case into camelCase by itself. That is why the attributes are named like the [`ValidityState`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) properties, and one `states` list covers everything.
- The browser checks `minlength` and `maxlength` only if the visitor has edited the field. A value that FormIt put back after a submission without JavaScript is not checked this way — the server checks it.
- The focus goes to the first field with an error: the visitor sees at once what to fix, and a screen reader reads the field out together with its `aria-invalid`.
- When the visitor starts editing a field, FetchIt removes its error by itself.

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
