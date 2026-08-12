---
title: Notyf
description: Notyf notifications for FetchIt via system setting or manual CDN
---

# Notyf

[Notyf](https://carlosroso.com/notyf/): lightweight toasts in plain JS. FetchIt supports two setups.

## Via component setting

Enable `fetchit.frontend.default.notifier`. The plugin loads Notyf CSS/JS from `assets/components/fetchit/lib/` and sets `FetchIt.Message` on first `FetchIt.create()` if you have not defined it yourself.

Skip extra CDN and manual `FetchIt.Message` in that case, or you will load the library twice.

## Manual CDN

Load the library yourself and set `FetchIt.Message`:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js" defer></script>
```

```js
document.addEventListener('DOMContentLoaded', () => {
  const notyf = new Notyf()

  FetchIt.Message = {
    success(message) {
      notyf.success(message)
    },
    error(message) {
      notyf.error(message)
    },
  }
})
```

In a separate file with `defer` (after the FetchIt script), skip the `DOMContentLoaded` wrapper:

```js
const notyf = new Notyf()

FetchIt.Message = {
  success(message) {
    notyf.success(message)
  },
  error(message) {
    notyf.error(message)
  },
}
```

Form blocks `[data-success]` and `[data-validation-error]` work alongside toasts. Skip `Message` if you only need those blocks. Selectors: [documentation](/en/components/fetchit/selectors).
