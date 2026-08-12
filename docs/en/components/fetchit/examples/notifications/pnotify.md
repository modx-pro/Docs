---
title: PNotify
description: PNotify notifications for FetchIt via CDN and FetchIt.Message
---

# PNotify

[PNotify](https://sciactive.com/pnotify/): flexible notifications in plain JS.

## CDN setup

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/@pnotify/core@5/dist/PNotify.min.js" defer></script>

<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/@pnotify/core@5/dist/PNotify.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@pnotify/core@5/dist/BrightTheme.min.css" rel="stylesheet">
```

Set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage):

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      PNotify.success({ title: message })
    },
    error(message) {
      PNotify.error({ title: message })
    },
  }
})
```

In a separate file with `defer` (after the FetchIt script), skip the `DOMContentLoaded` wrapper:

```js
FetchIt.Message = {
  success(message) {
    PNotify.success({ title: message })
  },
  error(message) {
    PNotify.error({ title: message })
  },
}
```

Form blocks `[data-success]` and `[data-validation-error]` work alongside toasts. Skip `Message` if you only need those blocks. Selectors: [documentation](/en/components/fetchit/selectors).
