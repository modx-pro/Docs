# NOTY

This section contains information on how to connect the [NOTY](https://ned.im/noty/) notification library.

::: danger DANGER
The NOTY library is currently unsupported by its author and is marked as **DEPRECATED**.
:::

- First we need to connect the script and library styles, we'll use CDN as an example.

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/noty@3.2.0-beta-deprecated/lib/noty.min.js" defer></script>

<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/noty@3.2.0-beta-deprecated/lib/noty.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/noty@3.2.0-beta-deprecated/lib/themes/mint.min.css" rel="stylesheet">
```

- And let's define the [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) property as follows:

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      new Noty({
        type: 'success',
        text: message
      }).show()
    },
    error(message) {
      new Noty({
        type: 'error',
        text: message
      }).show()
    },
  }
});
```

- Or in your file script with the `defer` connection attribute, then you don't need to put a handler on the `DOMContentLoaded` event and access the FetchIt class directly:

```js
FetchIt.Message = {
  success(message) {
    new Noty({
      type: 'success',
      text: message
    }).show()
  },
  error(message) {
    new Noty({
      type: 'error',
      text: message
    }).show()
  },
}
```

Done! With these simple steps we can connect **NOTY**.
