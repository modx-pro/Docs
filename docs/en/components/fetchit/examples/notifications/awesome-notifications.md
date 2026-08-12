---
title: Awesome Notifications
description: Awesome Notifications for FetchIt via CDN and FetchIt.Message
---

# Awesome Notifications

[Awesome Notifications](https://f3oall.github.io/awesome-notifications/): lightweight toasts in plain JS.

## CDN setup

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/awesome-notifications@3/dist/index.var.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/awesome-notifications@3/dist/style.min.css">
```

Create an instance and set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage):

```js
document.addEventListener('DOMContentLoaded', () => {
  const notifier = new AWN()

  FetchIt.Message = {
    success(message) {
      notifier.success(message)
    },
    error(message) {
      notifier.alert(message)
    },
  }
})
```

In a separate file with `defer` (after the FetchIt script), skip the `DOMContentLoaded` wrapper:

```js
const notifier = new AWN()

FetchIt.Message = {
  success(message) {
    notifier.success(message)
  },
  error(message) {
    notifier.alert(message)
  },
}
```

Form blocks `[data-success]` and `[data-validation-error]` work alongside toasts. Skip `Message` if you only need those blocks. Selectors: [documentation](/en/components/fetchit/selectors).
