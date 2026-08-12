---
title: Notiflix.Notify
description: Notiflix.Notify notifications for FetchIt via CDN and FetchIt.Message
---

# Notiflix.Notify

[Notiflix](https://notiflix.github.io/) is a plain JS UI toolkit. For toasts, use the [Notify](https://notiflix.github.io/notify) module.

## CDN setup

Script and [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) via ESM:

```html
<script type="module">
  import Notiflix from 'https://cdn.jsdelivr.net/npm/notiflix@3/+esm'

  document.addEventListener('DOMContentLoaded', () => {
    FetchIt.Message = {
      success(message) {
        Notiflix.Notify.success(message)
      },
      error(message) {
        Notiflix.Notify.failure(message)
      },
    }
  })
</script>
```

In a separate module with `defer` (after the FetchIt script), skip the `DOMContentLoaded` wrapper:

```js
import Notiflix from 'https://cdn.jsdelivr.net/npm/notiflix@3/+esm'

FetchIt.Message = {
  success(message) {
    Notiflix.Notify.success(message)
  },
  error(message) {
    Notiflix.Notify.failure(message)
  },
}
```

Form blocks `[data-success]` and `[data-validation-error]` work alongside toasts. Skip `Message` if you only need those blocks. Selectors: [documentation](/en/components/fetchit/selectors).
