# AlertifyJS

This section shows how to integrate [AlertifyJS](https://alertifyjs.com/) for displaying messages.

- First include the framework script and styles; for example via CDN:

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/alertifyjs@1/build/alertify.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1/build/css/alertify.min.css"/>
<!-- Default theme -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1/build/css/themes/default.min.css"/>
```

- Then set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) as follows:

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      alertify.success(message);
    },
    error(message) {
      alertify.error(message);
    },
  }
});
```

- Or in your own script file with the `defer` attribute; then you do not need the `DOMContentLoaded` handler and have direct access to the FetchIt class:

```js
FetchIt.Message = {
  success(message) {
    alertify.success(message);
  },
  error(message) {
    alertify.error(message);
  },
}
```

Done! With these steps you integrate **AlertifyJS**.
