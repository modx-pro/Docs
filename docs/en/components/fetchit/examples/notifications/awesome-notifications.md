# Awesome Notifications

In this section, let's plug in the lightweight library [Awesome Notifications](https://f3oall.github.io/awesome-notifications/).

- Let's add scripts and styles. For simplicity of the example, let's do it via CDN.

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/awesome-notifications@3/dist/index.var.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/awesome-notifications@3/dist/style.min.css">
```

- Create an instance of the notification class and define the [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) property as follows:

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

- Or in your file script with the `defer` attribute, then you don't need to put a handler on the `DOMContentLoaded` event and access the FetchIt class directly:

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

Done! This is how you can integrate **Awesome Notifications**.
