---
title: toastr
description: toastr notifications for FetchIt via CDN and FetchIt.Message
---

# toastr

[toastr](https://codeseven.github.io/toastr/): non-blocking toasts. The library requires jQuery.

:::warning Warning
toastr and Bootstrap selectors can conflict on the same page.
:::

## CDN setup

Load jQuery first, then toastr:

```html
<!-- jQuery -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js" defer></script>

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/toastr@2/build/toastr.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastr@2/build/toastr.min.css">
```

Set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage):

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      toastr.success(message)
    },
    error(message) {
      toastr.error(message)
    },
  }
})
```

In a separate file with `defer` (after the FetchIt script), skip the `DOMContentLoaded` wrapper:

```js
FetchIt.Message = {
  success(message) {
    toastr.success(message)
  },
  error(message) {
    toastr.error(message)
  },
}
```

Skip toastr if jQuery is not on the site: load it only when jQuery is already in use. Form blocks `[data-success]` and `[data-validation-error]` work alongside toasts. Skip `Message` if you only need those blocks. Selectors: [documentation](/en/components/fetchit/selectors).
