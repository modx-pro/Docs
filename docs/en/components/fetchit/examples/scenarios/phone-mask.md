---
title: Phone mask
description: A Maska phone number input mask in a FetchIt form, with a check for a complete number
---

# Phone mask

A mask inserts brackets, spaces and hyphens while the visitor types the number, and does not let them type anything extra. The example uses [Maska](https://beholdr.github.io/maska/), a small library without dependencies.

## Setup

```html
<script src="https://cdn.jsdelivr.net/npm/maska@3/dist/cdn/maska.js" defer></script>
```

## Markup

The mask pattern is set with the `data-maska` attribute: `#` is any digit, the rest is inserted by itself.

::: code-group

```modx
<label> Phone
  <input type="tel" name="phone" value="[[+fi.phone]]"
    data-maska="+7 (###) ###-##-##"
    placeholder="+7 (___) ___-__-__"
    autocomplete="tel" inputmode="tel">
  <span data-error="phone">[[+fi.error.phone]]</span>
</label>
```

```fenom
<label> Phone
  <input type="tel" name="phone" value="{$_modx->getPlaceholder('fi.phone')}"
    data-maska="+7 (###) ###-##-##"
    placeholder="+7 (___) ___-__-__"
    autocomplete="tel" inputmode="tel">
  <span data-error="phone">{$_modx->getPlaceholder('fi.error.phone')}</span>
</label>
```

:::

## Script

```js
document.addEventListener('DOMContentLoaded', () => {
  new Maska.MaskInput('[data-maska]')
})

// The number is not complete — do not send
document.addEventListener('fetchit:before', (e) => {
  const { form, fetchit } = e.detail

  for (const input of form.querySelectorAll('[data-maska]')) {
    const mask = new Maska.Mask({ mask: input.dataset.maska })
    if (input.value && !mask.completed(input.value)) {
      fetchit.setError(input.name, 'The number is incomplete')
      e.preventDefault()
    }
  }
})
```

An empty field is skipped here: whether it is required is checked by the server or by the form [validation](/en/components/fetchit/examples/validation/).

## Server-side check

A number typed by the mask always has the same length — 18 characters, for example `+7 (912) 345-67-89`. That is enough for a check in FormIt:

::: code-group

```modx
[[!FetchIt?
  &form=`callback.tpl`
  &hooks=`email`
  &validate=`phone:required:minLength=^18^`
  &vTextMinLength=`The number is incomplete`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'callback.tpl',
  'hooks' => 'email',
  'validate' => 'phone:required:minLength=^18^',
  'vTextMinLength' => 'The number is incomplete',
]}
```

:::

## Digits only

CRMs and telephony often expect the number without formatting: `+79123456789`. It can be sent instead of what the visitor sees — the field in the form does not change:

```js
document.addEventListener('fetchit:before', (e) => {
  if (e.defaultPrevented) {
    return
  }

  const { form, formData } = e.detail
  for (const input of form.querySelectorAll('[data-maska]')) {
    const digits = input.value.replace(/\D/g, '')
    if (digits) {
      formData.set(input.name, '+' + digits)
    }
  }
})
```

Load this handler after the check for a complete number. Then change the length check on the server to `minLength=^12^`.
