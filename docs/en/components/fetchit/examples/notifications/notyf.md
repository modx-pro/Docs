# Notyf

Another minimal notification library in pure JavaScript with many advantages. Let's integrate [Notyf](https://carlosroso.com/notyf/).

- First include the library script and styles; for example via CDN.

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
```

- Create an instance of the notification class and set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) as follows:

```js
document.addEventListener('DOMContentLoaded', () => {
  const notyf = new Notyf();

  FetchIt.Message = {
    success(message) {
      notyf.success(message);
    },
    error(message) {
      notyf.error(message);
    },
  }
});
```

- Or in your own script file with the `defer` attribute; then you do not need the `DOMContentLoaded` handler and have direct access to the FetchIt class:

```js
const notyf = new Notyf();

FetchIt.Message = {
  success(message) {
    notyf.success(message);
  },
  error(message) {
    notyf.error(message);
  },
}
```

Done! With these steps we integrate **Notyf**.
