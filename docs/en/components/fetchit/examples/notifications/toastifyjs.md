# Toastify JS

[Toastify JS](https://apvarun.github.io/toastify-js/) is a lightweight library for showing notifications in the browser and in this example we will show how to integrate it.

- First we need to add the script and library styles, we'll use CDN as an example.

```html
<!-- JavaScript -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js@1/src/toastify.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js@1/src/toastify.min.css">
```

- And let's define the [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) property as follows:

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      Toastify({ text: message }).showToast();
    },
    error(message) {
      Toastify({ text: message }).showToast();
    },
  }
});
```

- Or in your file script with the `defer` attribute, then you don't need to put a handler on the `DOMContentLoaded` event and get direct access to the FetchIt class:

```js
FetchIt.Message = {
  success(message) {
    Toastify({ text: message }).showToast();
  },
  error(message) {
    Toastify({ text: message }).showToast();
  },
}
```

Great! That's the simple way we can integrate the **Toastify JS** library.
