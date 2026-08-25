---
title: AlertifyJS
description: AlertifyJS notifications for FetchIt via CDN and FetchIt.Message
---

# AlertifyJS

[AlertifyJS](https://alertifyjs.com/): dialogs and toasts in plain JS.

## CDN setup

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/alertifyjs@1/build/alertify.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1/build/css/alertify.min.css"/>
<!-- Default theme -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1/build/css/themes/default.min.css"/>
```

Set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage):

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      alertify.success(message)
    },
    error(message) {
      alertify.error(message)
    },
  }
})
```

In a separate file with `defer` (after the FetchIt script), skip the `DOMContentLoaded` wrapper:

```js
FetchIt.Message = {
  success(message) {
    alertify.success(message)
  },
  error(message) {
    alertify.error(message)
  },
}
```

Form blocks `[data-success]` and `[data-validation-error]` work alongside toasts. Skip `Message` if you only need those blocks. Selectors: [documentation](/en/components/fetchit/selectors).
