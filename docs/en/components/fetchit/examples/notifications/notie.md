# Notie

This section will help you to integrate a minimalistic javascript [Notie](https://jaredreich.com/notie/) module to show notifications, input and select data. Let's plug it in.

- First you need to plug in the script and module styles, let's use CDN as an example.

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/notie@4/dist/notie.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notie@4/dist/notie.min.css">
```

- And let's define the [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) property as follows:

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

- Or in your file script with the `defer` attribute, then you don't need to put a handler on the `DOMContentLoaded` event and get direct access to the FetchIt class:

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

Voila! This is the simple way we can integrate the **Notie** module.
