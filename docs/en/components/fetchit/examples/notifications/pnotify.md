# PNotify

This example shows how to integrate [PNotify](https://sciactive.com/pnotify/).

- Include the scripts and styles. For simplicity we use CDN.

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/@pnotify/core@5/dist/PNotify.min.js" defer></script>

<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/@pnotify/core@5/dist/PNotify.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@pnotify/core@5/dist/BrightTheme.min.css" rel="stylesheet">
```

- Then set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) as follows:

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      PNotify.success({ title: message });
    },
    error(message) {
      PNotify.error({ title: message });
    },
  }
});
```

- Or in your own script file with the `defer` attribute; then you do not need the `DOMContentLoaded` handler and have direct access to the FetchIt class:

```js
FetchIt.Message = {
  success(message) {
    PNotify.success({ title: message });
  },
  error(message) {
    PNotify.error({ title: message });
  },
}
```

Done! With these steps you integrate **PNotify**.
