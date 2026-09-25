---
title: SweetAlert2
description: SweetAlert2 toasts and modals for FetchIt responses
---

# SweetAlert2

[SweetAlert2](https://sweetalert2.github.io/) — modals and toasts with no dependencies. The examples below use the `sweetalert2-neutral` build, which has the same API.

## Loading

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2-neutral/dist/sweetalert2.min.css">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2-neutral/dist/sweetalert2.all.min.js" defer></script>
```

## Toasts

A small window in the corner that closes by itself. While the pointer is on it, the timer stops:

```js
document.addEventListener('DOMContentLoaded', () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })

  const show = (icon, message) => {
    const text = FetchIt.sanitizeHTML(message).trim()
    if (text) {
      Toast.fire({ icon, title: text })
    }
  }

  FetchIt.Message = {
    success: (message) => show('success', message),
    error: (message) => show('error', message),
  }
})
```

## A modal on success

For a request where the visitor needs to see the result: a success is a window in the centre with a button, an error is a toast, so that it does not cover the form with its highlighted fields.

```js
document.addEventListener('DOMContentLoaded', () => {
  const text = (message) => FetchIt.sanitizeHTML(message).trim()

  FetchIt.Message = {
    success(message) {
      Swal.fire({
        icon: 'success',
        title: 'Thank you!',
        text: text(message),
        confirmButtonText: 'OK',
      })
    },
    error(message) {
      if (!text(message)) {
        return
      }

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: text(message),
        showConfirmButton: false,
        timer: 6000,
      })
    },
  }
})
```

`text` is output as text, while `title` and `html` are output as HTML, so the server message goes through `sanitizeHTML` here as well.

Why the empty-string check is needed is explained in the [general section](/en/components/fetchit/examples/notifications/#third-party-libraries).
