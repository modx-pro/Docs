# SweetAlert2

[SweetAlert2](https://sweetalert2.github.io/) is one of the most popular notification libraries and has no dependencies. To use it:

- Include the library scripts and styles. For simplicity we use CDN:

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2-neutral/dist/sweetalert2.all.min.js"></script>
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2-neutral/dist/sweetalert2.min.css">
```

- Set the [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) property as follows:

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      Swal.fire({
        icon: 'success',
        title: message,
        showConfirmButton: false,
      });
    },
    error(message) {
      Swal.fire({
        icon: 'error',
        title: message,
        showConfirmButton: false,
      });
    },
  }
});
```

- Or in your own script file with the `defer` attribute; then you do not need the `DOMContentLoaded` handler and have direct access to the FetchIt class:

```js
FetchIt.Message = {
  success(message) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
    });
  },
  error(message) {
    Swal.fire({
      icon: 'error',
      title: message,
      showConfirmButton: false,
    });
  },
}
```

You will now see **SweetAlert2** notifications.
