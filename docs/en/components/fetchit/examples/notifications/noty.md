---
title: NOTY
description: NOTY notifications for FetchIt via CDN and FetchIt.Message
---

# NOTY

[NOTY](https://ned.im/noty/): toasts in plain JS.

:::danger Warning
The author no longer maintains NOTY. The package is marked deprecated.
:::

## CDN setup

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/noty@3.2.0-beta-deprecated/lib/noty.min.js" defer></script>

<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/noty@3.2.0-beta-deprecated/lib/noty.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/noty@3.2.0-beta-deprecated/lib/themes/mint.min.css" rel="stylesheet">
```

Set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage):

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
})
```

In a separate file with `defer` (after the FetchIt script), skip the `DOMContentLoaded` wrapper:

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

Form blocks `[data-success]` and `[data-validation-error]` work alongside toasts. Skip `Message` if you only need those blocks. Selectors: [documentation](/en/components/fetchit/selectors).
