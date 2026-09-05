---
title: SweetAlert2
description: SweetAlert2 notifications for FetchIt via CDN and FetchIt.Message
---

# SweetAlert2

[SweetAlert2](https://sweetalert2.github.io/): modal alerts and toasts with no dependencies.

## CDN setup

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2-neutral/dist/sweetalert2.all.min.js"></script>
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2-neutral/dist/sweetalert2.min.css">
```

Set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage):

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      Swal.fire({
        icon: 'success',
        title: message,
        showConfirmButton: false,
      })
    },
    error(message) {
      Swal.fire({
        icon: 'error',
        title: message,
        showConfirmButton: false,
      })
    },
  }
})
```

In a separate file with `defer` (after the FetchIt script), skip the `DOMContentLoaded` wrapper:

```js
FetchIt.Message = {
  success(message) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
    })
  },
  error(message) {
    Swal.fire({
      icon: 'error',
      title: message,
      showConfirmButton: false,
    })
  },
}
```

Form blocks `[data-success]` and `[data-validation-error]` work alongside toasts. Skip `Message` if you only need those blocks. Selectors: [documentation](/en/components/fetchit/selectors).
