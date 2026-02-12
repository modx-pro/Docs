# toastr

[toastr](https://codeseven.github.io/toastr/) is a library for displaying non-blocking notifications; this example shows how to integrate it.

- As odd as it may sound, we need to load jQuery first, since it is a dependency of **toastr**, then the library script and its styles.

:::warning Warning!
Note that **toastr** and **Bootstrap** framework selectors may conflict.
:::

```html
<!-- jQuery -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js" defer></script>

<!-- Javascript -->
<script src="https://cdn.jsdelivr.net/npm/toastr@2/build/toastr.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastr@2/build/toastr.min.css">
```

- Define the [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) property as follows:

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      toastr.success(message);
    },
    error(message) {
      toastr.error(message);
    },
  }
});
```

- Or in your own script file with the `defer` attribute; then you do not need to wrap the handler in `DOMContentLoaded` and get direct access to the FetchIt class:

```js
FetchIt.Message = {
  success(message) {
    toastr.success(message);
  },
  error(message) {
    toastr.error(message);
  },
}
```

That's it! We do not recommend using this library in your project if you do not already have jQuery. Connecting an entire other library just for notifications is excessive.
