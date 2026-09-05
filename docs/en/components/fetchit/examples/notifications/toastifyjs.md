---
title: Toastify JS
description: Toastify JS notifications for FetchIt via CDN and FetchIt.Message
---

# Toastify JS

[Toastify JS](https://apvarun.github.io/toastify-js/): lightweight toasts in plain JS.

## CDN setup

```html
<!-- JavaScript -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js@1/src/toastify.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js@1/src/toastify.min.css">
```

Set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage):

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      Toastify({ text: message }).showToast()
    },
    error(message) {
      Toastify({ text: message }).showToast()
    },
  }
})
```

In a separate file with `defer` (after the FetchIt script), skip the `DOMContentLoaded` wrapper:

```js
FetchIt.Message = {
  success(message) {
    Toastify({ text: message }).showToast()
  },
  error(message) {
    Toastify({ text: message }).showToast()
  },
}
```

Form blocks `[data-success]` and `[data-validation-error]` work alongside toasts. Skip `Message` if you only need those blocks. Selectors: [documentation](/en/components/fetchit/selectors).
