---
title: AlertifyJS
description: AlertifyJS notifications for FetchIt responses
---

# AlertifyJS

[AlertifyJS](https://alertifyjs.com/) — dialogs and notifications with no dependencies, with themes.

## Loading

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1/build/css/alertify.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1/build/css/themes/default.min.css">
<script src="https://cdn.jsdelivr.net/npm/alertifyjs@1/build/alertify.min.js" defer></script>
```

Instead of `default.min.css` you can take the `bootstrap.min.css` or `semantic.min.css` theme, to match the look of the site.

## FetchIt.Message

```js
document.addEventListener('DOMContentLoaded', () => {
  alertify.set('notifier', 'position', 'top-right')
  alertify.set('notifier', 'delay', 5)

  const show = (type, message) => {
    const text = FetchIt.sanitizeHTML(message).trim()
    if (text) {
      alertify.notify(text, type)
    }
  }

  FetchIt.Message = {
    success: (message) => show('success', message),
    error: (message) => show('error', message),
  }
})
```

`delay` is set in seconds.

Why the text goes through `sanitizeHTML` and what the empty-string check is for is explained in the [general section](/en/components/fetchit/examples/notifications/#third-party-libraries).
