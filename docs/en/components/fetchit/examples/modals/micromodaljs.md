---
title: Micromodal.js modals
description: A FetchIt form in a Micromodal.js modal
---

# Micromodal.js modals

[Micromodal.js](https://micromodal.vercel.app/) — a small library for accessible modals: it moves the focus into the modal by itself and closes it on `Esc` and on a click on the background.

## Loading

```html
<script src="https://cdn.jsdelivr.net/npm/micromodal@0.7/dist/micromodal.min.js" defer></script>
```

```js
document.addEventListener('DOMContentLoaded', () => {
  MicroModal.init({ disableScroll: true })
})
```

The library has no styles: take the ready ones from the [Styling section](https://micromodal.vercel.app/#styling) or write your own.

## A form in a modal

::: code-group

```modx
<button type="button" data-micromodal-trigger="callback">Request a call</button>

<div class="modal" id="callback" aria-hidden="true">
  <div class="modal__overlay" tabindex="-1" data-micromodal-close>
    <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="callback-title">
      <header class="modal__header">
        <h2 class="modal__title" id="callback-title">Request a call</h2>
        <button type="button" class="modal__close" aria-label="Close" data-micromodal-close></button>
      </header>
      <form action="[[~[[*id]]]]" method="post">
        <label> Name
          <input type="text" name="name" value="[[+fi.name]]">
          <span data-error="name">[[+fi.error.name]]</span>
        </label>
        <label> Phone
          <input type="tel" name="phone" value="[[+fi.phone]]">
          <span data-error="phone">[[+fi.error.phone]]</span>
        </label>
        <div role="alert" data-validation-error style="display: none;"></div>
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</div>
```

```fenom
<button type="button" data-micromodal-trigger="callback">Request a call</button>

<div class="modal" id="callback" aria-hidden="true">
  <div class="modal__overlay" tabindex="-1" data-micromodal-close>
    <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="callback-title">
      <header class="modal__header">
        <h2 class="modal__title" id="callback-title">Request a call</h2>
        <button type="button" class="modal__close" aria-label="Close" data-micromodal-close></button>
      </header>
      <form action="{$_modx->resource.id | url}" method="post">
        <label> Name
          <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}">
          <span data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span>
        </label>
        <label> Phone
          <input type="tel" name="phone" value="{$_modx->getPlaceholder('fi.phone')}">
          <span data-error="phone">{$_modx->getPlaceholder('fi.error.phone')}</span>
        </label>
        <div role="alert" data-validation-error style="display: none;"></div>
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</div>
```

:::

## Closing after a success

`MicroModal.close()` takes the `id` of the root element of the modal — the one with the `modal` class. Do not look it up by `[data-micromodal-close]`: that attribute is on the background and the button, and they have no `id`.

```js
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  const modal = form.closest('.modal[id]')
  if (modal) {
    MicroModal.close(modal.id)
  }
})
```

To have a clean form the next time the modal opens, reset it when the modal is closed. The `onClose` option is there for this — add it to the same `MicroModal.init` call as above instead of calling `init` a second time:

```js
MicroModal.init({
  disableScroll: true,
  onClose: (modal) => modal.querySelector('form[data-fetchit]')?.reset(),
})
```

Resetting the form removes the FetchIt errors and messages ([`fetchit:reset`](/en/components/fetchit/frontend/events#fetchitreset)).
