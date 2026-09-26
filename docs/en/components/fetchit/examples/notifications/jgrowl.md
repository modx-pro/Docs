---
title: jGrowl
description: jGrowl notifications for FetchIt responses on a site with jQuery
---

# jGrowl

[jGrowl](https://github.com/stanlemon/jGrowl) — a notification plugin for jQuery. It came with AjaxForm, so it is handy when [moving from AjaxForm](/en/components/fetchit/migration-from-ajaxform), to keep the notifications looking as before.

::: tip
jGrowl makes sense only if the site already has jQuery. For a new site the [built-in notifications](/en/components/fetchit/examples/notifications/#built-in-notifications) or a library with no dependencies are enough.
:::

## Loading

jQuery is loaded before jGrowl:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jgrowl@1/jquery.jgrowl.min.css">
<script src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/jgrowl@1/jquery.jgrowl.min.js" defer></script>
```

jGrowl has no colours of its own for a success and an error — set them with themes:

```css
.jGrowl-notification.fetchit-success {
  background-color: #15803d;
}

.jGrowl-notification.fetchit-error {
  background-color: #b91c1c;
}
```

## FetchIt.Message

```js
document.addEventListener('DOMContentLoaded', () => {
  $.jGrowl.defaults.position = 'top-right'
  $.jGrowl.defaults.closerTemplate = '<div>Close all</div>'

  const show = (type, message) => {
    const text = FetchIt.sanitizeHTML(message).trim()
    if (!text) {
      return
    }

    $.jGrowl(text, {
      theme: `fetchit-${type}`,
      life: type === 'error' ? 8000 : 5000,
    })
  }

  FetchIt.Message = {
    success: (message) => show('success', message),
    error: (message) => show('error', message),
  }
})
```

Why the text goes through `sanitizeHTML` and what the empty-string check is for is explained in the [general section](/en/components/fetchit/examples/notifications/#third-party-libraries).
