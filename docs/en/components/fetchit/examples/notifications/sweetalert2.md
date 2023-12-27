# SweetAlert2

[SweetAlert2](https://sweetalert2.github.io/) is one of the most popular notification libraries that has no dependencies. To connect it we need to do the following steps.

- Let's add the scripts and styles of the library. For simplicity, let's do it via CDN.

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2-neutral/dist/sweetalert2.all.min.js"></script>
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2-neutral/dist/sweetalert2.min.css">
```

- And let's define the [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) property as follows:

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

- Or in your file script with the `defer` attribute, then you don't need to put a handler on the `DOMContentLoaded` event and get direct access to the FetchIt class:

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

Great! We will now have beautiful **SweetAlert2** notifications displayed.
