---
title: Toastify JS
description: Уведомления Toastify JS для FetchIt через CDN и FetchIt.Message
---

# Toastify JS

[Toastify JS](https://apvarun.github.io/toastify-js/): лёгкие тосты на чистом JS.

## Подключение через CDN

```html
<!-- JavaScript -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js@1/src/toastify.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js@1/src/toastify.min.css">
```

Задайте [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage):

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      Toastify({ text: message }).showToast()
    },
    error(message) {
      Toastify({ text: message }).showToast()
    },
  }
})
```

В отдельном файле с `defer` (после скрипта FetchIt) обёртка `DOMContentLoaded` не нужна:

```js
FetchIt.Message = {
  success(message) {
    Toastify({ text: message }).showToast()
  },
  error(message) {
    Toastify({ text: message }).showToast()
  },
}
```

Блоки формы `[data-success]` и `[data-validation-error]` работают параллельно с тостами. Если нужны только они, `Message` можно не задавать. Селекторы: [документация](/components/fetchit/selectors).
