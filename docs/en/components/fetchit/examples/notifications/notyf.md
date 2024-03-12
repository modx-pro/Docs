# Notyf

Another minimalistic notification library based on pure JavaScript that has many advantages. Let's plug in [Notyf](https://carlosroso.com/notyf/).

<!--@include: ../../parts/notifier.tip.md-->

- First you need to connect the script and library styles, we'll use CDN as an example.

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
```

- Create an instance of the notification class and define the [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) property as follows:

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

- Or in your file script with the `defer` attribute, then you don't need to put a handler on the `DOMContentLoaded` event and get direct access to the FetchIt class:

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

Voila! That's how easy it is to connect the **Notyf** library.
