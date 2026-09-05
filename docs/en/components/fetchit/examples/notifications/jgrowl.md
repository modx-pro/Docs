---
title: jGrowl
description: jGrowl notifications for FetchIt via CDN and FetchIt.Message
---

# jGrowl

[jGrowl](https://github.com/stanlemon/jGrowl): jQuery plugin for toasts. It shipped with AjaxForm in the past.

The library requires jQuery.

## CDN setup

Load jQuery first, then jGrowl. Define themes in CSS for success/error types:

```html
<!-- jQuery -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js" defer></script>

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/jgrowl@1/jquery.jgrowl.min.js" defer></script>

<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/jgrowl@1/jquery.jgrowl.min.css" rel="stylesheet">
<style>
  .custom-success { background: green; }
  .custom-error { background: red; }
</style>
```

Set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage):

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      $.jGrowl(message, { theme: 'custom-success' })
    },
    error(message) {
      $.jGrowl(message, { theme: 'custom-error' })
    },
  }
})
```

In a separate file with `defer` (after the FetchIt script), skip the `DOMContentLoaded` wrapper:

```js
FetchIt.Message = {
  success(message) {
    $.jGrowl(message, { theme: 'custom-success' })
  },
  error(message) {
    $.jGrowl(message, { theme: 'custom-error' })
  },
}
```

Skip jGrowl if jQuery is not on the site: load it only when jQuery is already in use. Form blocks `[data-success]` and `[data-validation-error]` work alongside toasts. Skip `Message` if you only need those blocks. Selectors: [documentation](/en/components/fetchit/selectors).
