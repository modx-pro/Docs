---
title: Thank-you instead of the form
description: Replace a FetchIt form with a "Thank you" block after a successful submission
---

# Thank-you instead of the form

Instead of a notification in the corner, the form gives way to a "Thank you" block — visible, and clear that everything worked. The "Send another" button brings the form back.

## Markup

The form and the thank-you block sit in a common wrapper:

::: code-group

```modx
<div class="callback">
  <form action="[[~[[*id]]]]" method="post">
    <label> Name
      <input type="text" name="name" value="[[+fi.name]]" autocomplete="name">
      <span data-error="name">[[+fi.error.name]]</span>
    </label>
    <label> Phone
      <input type="tel" name="phone" value="[[+fi.phone]]" autocomplete="tel">
      <span data-error="phone">[[+fi.error.phone]]</span>
    </label>
    <div role="alert" data-validation-error style="display: none;"></div>
    <button type="submit">Call me back</button>
  </form>

  <div class="callback__thanks" data-thanks tabindex="-1" hidden>
    <h3>Thank you!</h3>
    <p data-thanks-text></p>
    <button type="button" data-thanks-again>Send another request</button>
  </div>
</div>
```

```fenom
<div class="callback">
  <form action="{$_modx->resource.id | url}" method="post">
    <label> Name
      <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}" autocomplete="name">
      <span data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span>
    </label>
    <label> Phone
      <input type="tel" name="phone" value="{$_modx->getPlaceholder('fi.phone')}" autocomplete="tel">
      <span data-error="phone">{$_modx->getPlaceholder('fi.error.phone')}</span>
    </label>
    <div role="alert" data-validation-error style="display: none;"></div>
    <button type="submit">Call me back</button>
  </form>

  <div class="callback__thanks" data-thanks tabindex="-1" hidden>
    <h3>Thank you!</h3>
    <p data-thanks-text></p>
    <button type="button" data-thanks-again>Send another request</button>
  </div>
</div>
```

:::

## Script

```js
document.addEventListener('fetchit:success', ({ detail: { form, response } }) => {
  const thanks = form.parentElement.querySelector('[data-thanks]')
  if (!thanks) {
    return
  }

  thanks.querySelector('[data-thanks-text]').textContent = FetchIt.sanitizeHTML(response.message)
  form.hidden = true
  thanks.hidden = false
  thanks.focus()
})

document.addEventListener('click', ({ target }) => {
  const again = target.closest('[data-thanks-again]')
  if (!again) {
    return
  }

  const thanks = again.closest('[data-thanks]')
  const form = thanks.parentElement.querySelector('form')
  thanks.hidden = true
  form.hidden = false
  form.querySelector('input, select, textarea')?.focus()
})
```

- The focus moves to the thank-you block: the submit button is gone, and without this the focus would be lost. A screen reader reads the thank-you text.
- After a success FetchIt clears the fields itself, so the form that comes back is already empty.
- A form without a `[data-thanks]` block next to it works as usual: the script skips it.

## Styling

A small entrance, so that the change of blocks is not abrupt:

```css
.callback__thanks {
  padding: 2rem;
  border-radius: 1rem;
  background: #f0fdf4;
  text-align: center;
  animation: thanks-in 0.3s ease-out;
}

.callback__thanks:focus {
  outline: none;
}

@keyframes thanks-in {
  from {
    opacity: 0;
    transform: scale(0.97);
  }
}
```

So that a notification does not repeat the thank-you, do not set `FetchIt.Message` and turn off the `fetchit.frontend.default.notifier` setting.
