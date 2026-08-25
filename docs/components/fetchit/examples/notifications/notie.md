---
title: Notie
description: Уведомления Notie для FetchIt через CDN и FetchIt.Message
---

# Notie

[Notie](https://jaredreich.com/notie/): простые алерты на чистом JS.

## Подключение через CDN

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/notie@4/dist/notie.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notie@4/dist/notie.min.css">
```

Задайте [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage):

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      notie.alert({
        type: 'success',
        text: message,
      })
    },
    error(message) {
      notie.alert({
        type: 'error',
        text: message,
      })
    },
  }
})
```

В отдельном файле с `defer` (после скрипта FetchIt) обёртка `DOMContentLoaded` не нужна:

```js
FetchIt.Message = {
  success(message) {
    notie.alert({
      type: 'success',
      text: message,
    })
  },
  error(message) {
    notie.alert({
      type: 'error',
      text: message,
    })
  },
}
```

Блоки формы `[data-success]` и `[data-validation-error]` работают параллельно с тостами. Если нужны только они, `Message` можно не задавать. Селекторы: [документация](/components/fetchit/selectors).
