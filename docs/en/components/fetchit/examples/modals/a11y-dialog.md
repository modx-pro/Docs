---
title: a11y-dialog modals
description: A FetchIt form in an accessible a11y-dialog modal
---

# a11y-dialog modals

[a11y-dialog](https://a11y-dialog.netlify.app/) — a small (about 2 KB) modal library built to the [WAI-ARIA guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). The focus stays inside the modal, `Esc` and a click on the background close it, and after closing the focus returns to the button that opened it. The library has no styles of its own — the modal looks the way you style it.

## Loading

```html
<script src="https://cdn.jsdelivr.net/npm/a11y-dialog@8/dist/a11y-dialog.min.js" defer></script>
```

## A form in a modal

::: code-group

```modx
<button type="button" data-a11y-dialog-show="callback">Request a call</button>

<div class="dialog" id="callback" aria-labelledby="callback-title" aria-hidden="true">
  <div class="dialog__overlay" data-a11y-dialog-hide></div>
  <div class="dialog__content" role="document">
    <button type="button" class="dialog__close" data-a11y-dialog-hide aria-label="Close">&times;</button>
    <h2 id="callback-title">Request a call</h2>
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
      <button type="submit">Send</button>
    </form>
  </div>
</div>
```

```fenom
<button type="button" data-a11y-dialog-show="callback">Request a call</button>

<div class="dialog" id="callback" aria-labelledby="callback-title" aria-hidden="true">
  <div class="dialog__overlay" data-a11y-dialog-hide></div>
  <div class="dialog__content" role="document">
    <button type="button" class="dialog__close" data-a11y-dialog-hide aria-label="Close">&times;</button>
    <h2 id="callback-title">Request a call</h2>
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
      <button type="submit">Send</button>
    </form>
  </div>
</div>
```

:::

## Script

a11y-dialog can create the modals by itself from the `data-a11y-dialog` attribute, but then there is no way to reach the modal instance, and the modal cannot be closed from code. So the modals are created by hand:

```js
const dialogs = new Map()

document.addEventListener('DOMContentLoaded', () => {
  for (const element of document.querySelectorAll('.dialog')) {
    dialogs.set(element, new A11yDialog(element))

    // The modal is closing — reset the form so it is clean next time
    element.addEventListener('hide', () => {
      element.querySelector('form[data-fetchit]')?.reset()
    })
  }
})

// The form was accepted — close its modal
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  dialogs.get(form.closest('.dialog'))?.hide()
})
```

a11y-dialog sends the `hide` event to the modal element, and it does not bubble up, so the handler is attached to each modal.

## Styling

The minimum of styles without which the modal will not hide or sit on top of the page:

```css
.dialog {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog[aria-hidden='true'] {
  display: none;
}

.dialog__overlay {
  position: fixed;
  inset: 0;
  background: rgb(15 23 42 / 0.5);
}

.dialog__content {
  position: relative;
  width: min(100% - 2rem, 28rem);
  padding: 1.5rem;
  border-radius: 1rem;
  background: #fff;
}

.dialog__close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
}
```
