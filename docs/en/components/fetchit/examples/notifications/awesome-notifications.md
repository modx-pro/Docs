# Awesome Notifications

This section shows how to integrate the lightweight library [Awesome Notifications](https://f3oall.github.io/awesome-notifications/).

- Add the scripts and styles. For simplicity we use CDN.

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/awesome-notifications@3/dist/index.var.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/awesome-notifications@3/dist/style.min.css">
```

- Create an instance of the notification class and set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) as follows:

```js
document.addEventListener('DOMContentLoaded', () => {
  const notifier = new AWN();

  FetchIt.Message = {
    success(message) {
      notifier.success(message);
    },
    error(message) {
      notifier.alert(message);
    },
  }
});
```

- Or in your own script file with the `defer` attribute; then you do not need the `DOMContentLoaded` handler and have direct access to the FetchIt class:

```js
const notifier = new AWN();

FetchIt.Message = {
  success(message) {
    notifier.success(message);
  },
  error(message) {
    notifier.alert(message);
  },
}
```

Done! This is how you integrate **Awesome Notifications**.
