---
title: Notyf
description: Notyf notifications for FetchIt via a CDN and FetchIt.Message
---

# Notyf

[Notyf](https://carlosroso.com/notyf/): lightweight toasts in plain JS.

::: warning
Before FetchIt 4 the library shipped with the package and was turned on with the `fetchit.frontend.default.notifier` setting. That setting now shows the [built-in notifications](/en/components/fetchit/examples/notifications/#built-in-notifications), and Notyf is loaded by hand like any other third-party library.
:::

## Via a CDN

Load the library yourself and set `FetchIt.Message`:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js" defer></script>
```

```js
document.addEventListener('DOMContentLoaded', () => {
  const notyf = new Notyf()

  FetchIt.Message = {
    success(message) {
      notyf.success(message)
    },
    error(message) {
      notyf.error(message)
    },
  }
})
```

In a separate file with `defer` (after the FetchIt script), skip the `DOMContentLoaded` wrapper:

```js
const notyf = new Notyf()

FetchIt.Message = {
  success(message) {
    notyf.success(message)
  },
  error(message) {
    notyf.error(message)
  },
}
```

Form blocks `[data-success]` and `[data-validation-error]` work alongside toasts. Skip `Message` if you only need those blocks. Selectors: [documentation](/en/components/fetchit/selectors).
