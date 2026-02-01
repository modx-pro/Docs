# NOTY

This section describes how to integrate the [NOTY](https://ned.im/noty/) notification library.

:::danger Warning!
At this time the NOTY library is not maintained by its author and is marked **DEPRECATED**.
:::

- First include the library script and styles; for example via CDN.

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/noty@3.2.0-beta-deprecated/lib/noty.min.js" defer></script>

<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/noty@3.2.0-beta-deprecated/lib/noty.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/noty@3.2.0-beta-deprecated/lib/themes/mint.min.css" rel="stylesheet">
```

- Then set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) as follows:

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

- Or in your own script file with the `defer` attribute; then you do not need the `DOMContentLoaded` handler and have direct access to the FetchIt class:

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

Done! With these steps you integrate **NOTY**.
