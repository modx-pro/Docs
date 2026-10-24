---
title: Modals with dialog
description: A FetchIt form in the browser's built-in modal, no libraries
---

# Modals with `<dialog>`

The [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) element is a modal built into the browser. Focus, closing with `Esc`, the dimmed background and blocking the rest of the page for the mouse and the keyboard all work without libraries.

## A form in a modal

::: code-group

```modx
<button type="button" data-dialog="callback">Request a call</button>

<dialog class="modal" id="callback" aria-labelledby="callback-title">
  <form action="[[~[[*id]]]]" method="post">
    <h2 id="callback-title">Request a call</h2>
    <label> Name
      <input type="text" name="name" value="[[+fi.name]]" autocomplete="name">
      <span data-error="name">[[+fi.error.name]]</span>
    </label>
    <label> Phone
      <input type="tel" name="phone" value="[[+fi.phone]]" autocomplete="tel">
      <span data-error="phone">[[+fi.error.phone]]</span>
    </label>
    <div role="alert" data-validation-error style="display: none;"></div>
    <button type="submit">Send</button>
    <button type="button" data-dialog-close>Cancel</button>
  </form>
</dialog>
```

```fenom
<button type="button" data-dialog="callback">Request a call</button>

<dialog class="modal" id="callback" aria-labelledby="callback-title">
  <form action="{$_modx->resource.id | url}" method="post">
    <h2 id="callback-title">Request a call</h2>
    <label> Name
      <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}" autocomplete="name">
      <span data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span>
    </label>
    <label> Phone
      <input type="tel" name="phone" value="{$_modx->getPlaceholder('fi.phone')}" autocomplete="tel">
      <span data-error="phone">{$_modx->getPlaceholder('fi.error.phone')}</span>
    </label>
    <div role="alert" data-validation-error style="display: none;"></div>
    <button type="submit">Send</button>
    <button type="button" data-dialog-close>Cancel</button>
  </form>
</dialog>
```

:::

::: warning
Do not give a FetchIt form `method="dialog"`: such a form is not sent, it only closes the modal. The Cancel button needs `type="button"`, otherwise it sends the form.
:::

```js
// Open and close the modal with buttons
document.addEventListener('click', ({ target }) => {
  const opener = target.closest('[data-dialog]')
  if (opener) {
    document.getElementById(opener.dataset.dialog)?.showModal()
    return
  }

  target.closest('[data-dialog-close]')?.closest('dialog')?.close()
})

// The form was accepted — close the modal
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  form.closest('dialog')?.close()
})

// The modal was closed — reset the form. The close event does not bubble, so listen in the capture phase
document.addEventListener('close', ({ target }) => {
  if (target instanceof HTMLDialogElement) {
    target.querySelector('form[data-fetchit]')?.reset()
  }
}, true)
```

The reset removes the FetchIt errors and messages ([`fetchit:reset`](/en/components/fetchit/frontend/events#fetchitreset)), so the form is clean the next time the modal opens.

## Styling

The browser draws the modal without styles, but few are needed:

```css
.modal {
  width: min(100% - 2rem, 28rem);
  padding: 1.5rem;
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 1.5rem 3rem rgb(0 0 0 / 0.2);
}

.modal::backdrop {
  background: rgb(15 23 42 / 0.5);
  backdrop-filter: blur(2px);
}

.modal[open] {
  animation: modal-in 0.2s ease-out;
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
}
```

## A modal with the answer

The form is on the page, and after a success a modal with the text of the answer opens:

```html
<dialog class="modal" id="thanks" aria-labelledby="thanks-title">
  <h2 id="thanks-title">Thank you!</h2>
  <p data-thanks-text></p>
  <form method="dialog">
    <button>OK</button>
  </form>
</dialog>
```

Here `method="dialog"` is just right: this is not a FetchIt form but a button that closes the modal.

```js
document.addEventListener('fetchit:success', ({ detail: { response } }) => {
  const dialog = document.getElementById('thanks')
  dialog.querySelector('[data-thanks-text]').textContent = FetchIt.sanitizeHTML(response.message)
  dialog.showModal()
})
```

To keep the answer from being repeated in a notification, do not set `FetchIt.Message` and turn off the `fetchit.frontend.default.notifier` setting.
