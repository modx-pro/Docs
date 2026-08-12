---
title: Notie
description: Notie notifications for FetchIt via CDN and FetchIt.Message
---

# Notie

[Notie](https://jaredreich.com/notie/): minimal alerts in plain JS.

## CDN setup

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/notie@4/dist/notie.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notie@4/dist/notie.min.css">
```

Set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage):

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      notie.alert({
        type: 'success',
        text: message,
      })
    },
    error(message) {
      notie.alert({
        type: 'error',
        text: message,
      })
    },
  }
})
```

In a separate file with `defer` (after the FetchIt script), skip the `DOMContentLoaded` wrapper:

```js
FetchIt.Message = {
  success(message) {
    notie.alert({
      type: 'success',
      text: message,
    })
  },
  error(message) {
    notie.alert({
      type: 'error',
      text: message,
    })
  },
}
```

Form blocks `[data-success]` and `[data-validation-error]` work alongside toasts. Skip `Message` if you only need those blocks. Selectors: [documentation](/en/components/fetchit/selectors).
