# Notie

This section helps you integrate the minimal [Notie](https://jaredreich.com/notie/) module for notifications, input and selection on JavaScript. Let's integrate it.

- First include the module script and styles; for example via CDN.

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/notie@4/dist/notie.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notie@4/dist/notie.min.css">
```

- Then set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) as follows:

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      notie.alert({
        type: 'success',
        text: message,
      });
    },
    error(message) {
      notie.alert({
        type: 'error',
        text: message,
      });
    },
  }
});
```

- Or in your own script file with the `defer` attribute; then you do not need the `DOMContentLoaded` handler and have direct access to the FetchIt class:

```js
FetchIt.Message = {
  success(message) {
    notie.alert({
      type: 'success',
      text: message,
    });
  },
  error(message) {
    notie.alert({
      type: 'error',
      text: message,
    });
  },
}
```

Done! With these steps you integrate the **Notie** module.
