---
title: PNotify
description: Уведомления PNotify для FetchIt через CDN и FetchIt.Message
---

# PNotify

[PNotify](https://sciactive.com/pnotify/): гибкие уведомления на чистом JS.

## Подключение через CDN

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/@pnotify/core@5/dist/PNotify.min.js" defer></script>

<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/@pnotify/core@5/dist/PNotify.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@pnotify/core@5/dist/BrightTheme.min.css" rel="stylesheet">
```

Задайте [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage):

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      PNotify.success({ title: message })
    },
    error(message) {
      PNotify.error({ title: message })
    },
  }
})
```

В отдельном файле с `defer` (после скрипта FetchIt) обёртка `DOMContentLoaded` не нужна:

```js
FetchIt.Message = {
  success(message) {
    PNotify.success({ title: message })
  },
  error(message) {
    PNotify.error({ title: message })
  },
}
```

Блоки формы `[data-success]` и `[data-validation-error]` работают параллельно с тостами. Если нужны только они, `Message` можно не задавать. Селекторы: [документация](/components/fetchit/selectors).
