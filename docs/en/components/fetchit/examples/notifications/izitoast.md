---
title: iziToast
description: iziToast notifications for FetchIt via CDN and FetchIt.Message
---

# iziToast

[iziToast](https://izitoast.marcelodolza.com/): lightweight toasts in plain JS.

## CDN setup

Load styles separately:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/izitoast@1/dist/css/iziToast.min.css">
```

Script and [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) via ESM:

```html
<script type="module">
  import izitoast from 'https://cdn.jsdelivr.net/npm/izitoast@1/+esm'

  document.addEventListener('DOMContentLoaded', () => {
    FetchIt.Message = {
      success(message) {
        izitoast.success({ message })
      },
      error(message) {
        izitoast.error({ message })
      },
    }
  })
</script>
```

In a separate module with `defer` (after the FetchIt script), skip the `DOMContentLoaded` wrapper:

```js
import izitoast from 'https://cdn.jsdelivr.net/npm/izitoast@1/+esm'

FetchIt.Message = {
  success(message) {
    izitoast.success({ message })
  },
  error(message) {
    izitoast.error({ message })
  },
}
```

Form blocks `[data-success]` and `[data-validation-error]` work alongside toasts. Skip `Message` if you only need those blocks. Selectors: [documentation](/en/components/fetchit/selectors).
