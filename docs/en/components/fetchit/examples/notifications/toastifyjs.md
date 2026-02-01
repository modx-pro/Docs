# Toastify JS

[Toastify JS](https://apvarun.github.io/toastify-js/) is a lightweight library for browser notifications. This example shows how to integrate it.

- First include the library script and styles; for example via CDN:

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/toastify-js@1/src/toastify.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js@1/src/toastify.min.css">
```

- Then set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) as follows:

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      Toastify({ text: message, className: 'success', gravity: 'top' }).showToast();
    },
    error(message) {
      Toastify({ text: message, className: 'error', gravity: 'top' }).showToast();
    },
  }
});
```

- Or in your own script file with the `defer` attribute; then you do not need the `DOMContentLoaded` handler and have direct access to the FetchIt class:

```js
FetchIt.Message = {
  success(message) {
    Toastify({ text: message, className: 'success', gravity: 'top' }).showToast();
  },
  error(message) {
    Toastify({ text: message, className: 'error', gravity: 'top' }).showToast();
  },
}
```

Done! With these steps we integrate **Toastify JS**.
