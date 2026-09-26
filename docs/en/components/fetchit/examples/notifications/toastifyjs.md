---
title: Toastify JS
description: Toastify JS toasts for FetchIt responses
---

# Toastify JS

[Toastify JS](https://apvarun.github.io/toastify-js/) — simple toasts with no dependencies. The colours are set right in the call.

## Loading

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js@1/src/toastify.min.css">
<script src="https://cdn.jsdelivr.net/npm/toastify-js@1/src/toastify.min.js" defer></script>
```

## FetchIt.Message

```js
document.addEventListener('DOMContentLoaded', () => {
  const colors = {
    success: 'linear-gradient(135deg, #16a34a, #22c55e)',
    error: 'linear-gradient(135deg, #b91c1c, #ef4444)',
  }

  const show = (type, message) => {
    const text = FetchIt.sanitizeHTML(message).trim()
    if (!text) {
      return
    }

    Toastify({
      text,
      duration: type === 'error' ? 8000 : 5000,
      close: true,
      gravity: 'top',
      position: 'right',
      stopOnFocus: true,
      style: { background: colors[type] },
      ariaLive: type === 'error' ? 'assertive' : 'polite',
    }).showToast()
  }

  FetchIt.Message = {
    success: (message) => show('success', message),
    error: (message) => show('error', message),
  }
})
```

Without `style` a success and an error look the same: Toastify has no built-in types.

Why the text goes through `sanitizeHTML` and what the empty-string check is for is explained in the [general section](/en/components/fetchit/examples/notifications/#third-party-libraries).
