---
title: Notyf
description: Notyf toasts for FetchIt responses through FetchIt.Message
---

# Notyf

[Notyf](https://carlosroso.com/notyf/) — lightweight toasts with no dependencies: about 3 KB, with animation and support for screen readers.

::: warning
Before FetchIt 4 the library shipped with the package and was turned on with the `fetchit.frontend.default.notifier` setting. That setting now shows the [built-in notifications](/en/components/fetchit/examples/notifications/#built-in-notifications), and Notyf is loaded by hand like any other third-party library.
:::

## Loading

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
<script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js" defer></script>
```

## FetchIt.Message

```js
document.addEventListener('DOMContentLoaded', () => {
  const notyf = new Notyf({
    duration: 5000,
    dismissible: true,
    position: { x: 'right', y: 'top' },
  })

  const show = (type, message) => {
    const text = FetchIt.sanitizeHTML(message).trim()
    if (text) {
      notyf.open({ type, message: text })
    }
  }

  FetchIt.Message = {
    success: (message) => show('success', message),
    error: (message) => show('error', message),
  }
})
```

Why the text goes through `sanitizeHTML` and what the empty-string check is for is explained in the [general section](/en/components/fetchit/examples/notifications/#third-party-libraries).

## Your own colours

The `success` and `error` types can be recoloured, or you can add a type of your own:

```js
const notyf = new Notyf({
  types: [
    { type: 'success', background: '#16a34a' },
    { type: 'error', background: '#dc2626', duration: 8000 },
  ],
})
```

Here the error stays longer: it is usually read more carefully.
