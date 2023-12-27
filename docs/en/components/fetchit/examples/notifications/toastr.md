# toastr

[toastr](https://codeseven.github.io/toastr/) is a library for showing non-blocking notifications and this example will show how to integrate it.

- As strange as it may sound, we will need to add jQuery as it is a dependency of the **toastr** library, then the script of the library itself and its styles.

:::warning WARNING
Note that the **toastr** and **Bootstrap** framework selectors may conflict.
:::

```html
<!-- jQuery -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js" defer></script>

<!-- Javascript -->
<script src="https://cdn.jsdelivr.net/npm/toastr@2/build/toastr.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastr@2/build/toastr.min.css">
```

- And let's define the [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) property as follows:

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

- Or in your file script with the `defer` attribute, then you don't need to put a handler on the `DOMContentLoaded` event and get direct access to the FetchIt class:

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

And that's it! But we don't recommend using this library in your project if it doesn't have jQuery. It's sacrilege to plug in a whole other library just for the sake of one notification library.
