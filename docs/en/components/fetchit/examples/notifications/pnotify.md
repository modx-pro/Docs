# PNotify

In this example, we will integrate the [PNotify](https://sciactive.com/pnotify/) library.

- Let's add scripts and styles. For simplicity, let's do it via CDN.

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/@pnotify/core@5/dist/PNotify.min.js" defer></script>

<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/@pnotify/core@5/dist/PNotify.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@pnotify/core@5/dist/BrightTheme.min.css" rel="stylesheet">
```

- And let's define the [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) property as follows:

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

- Or in your file script with the `defer` attribute, then you don't need to put a handler on the `DOMContentLoaded` event and get direct access to the FetchIt class:

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

Done! With these simple steps we have integrated **PNotify**.
