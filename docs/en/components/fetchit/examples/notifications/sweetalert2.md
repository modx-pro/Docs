# SweetAlert2

[SweetAlert2](https://sweetalert2.github.io/) is one of the most popular notification libraries and has no dependencies. To integrate it:

- Include the library scripts and styles. For simplicity we use CDN:

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<!-- CSS is included in the script -->
```

- Then set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) as follows:

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      Swal.fire({ icon: 'success', title: 'Success', text: message });
    },
    error(message) {
      Swal.fire({ icon: 'error', title: 'Error', text: message });
    },
  }
});
```

- Or in your own script file with the `defer` attribute; then you do not need the `DOMContentLoaded` handler and have direct access to the FetchIt class:

```js
FetchIt.Message = {
  success(message) {
    Swal.fire({ icon: 'success', title: 'Success', text: message });
  },
  error(message) {
    Swal.fire({ icon: 'error', title: 'Error', text: message });
  },
}
```

Done! You now have **SweetAlert2** notifications.
