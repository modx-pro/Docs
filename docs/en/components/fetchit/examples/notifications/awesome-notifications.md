---
title: Awesome Notifications
description: Awesome Notifications toasts for FetchIt responses
---

# Awesome Notifications

[Awesome Notifications](https://f3oall.github.io/awesome-notifications/) — toasts with icons and a bar showing the time left, with no dependencies.

## Loading

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/awesome-notifications@3/dist/style.min.css">
<script src="https://cdn.jsdelivr.net/npm/awesome-notifications@3/dist/index.var.js" defer></script>
```

## FetchIt.Message

```js
document.addEventListener('DOMContentLoaded', () => {
  const notifier = new AWN({
    position: 'top-right',
    durations: { global: 5000, alert: 8000 },
    labels: { success: 'Done', alert: 'Error' },
  })

  const show = (message, display) => {
    const text = FetchIt.sanitizeHTML(message).trim()
    if (text) {
      display(text)
    }
  }

  FetchIt.Message = {
    success: (message) => show(message, (text) => notifier.success(text)),
    error: (message) => show(message, (text) => notifier.alert(text)),
  }
})
```

The error is shown by the `alert` method: the library has no `error` method.

Why the text goes through `sanitizeHTML` and what the empty-string check is for is explained in the [general section](/en/components/fetchit/examples/notifications/#third-party-libraries).
