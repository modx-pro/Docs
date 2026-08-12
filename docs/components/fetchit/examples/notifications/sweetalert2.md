---
title: SweetAlert2
description: Уведомления SweetAlert2 для FetchIt через CDN и FetchIt.Message
---

# SweetAlert2

[SweetAlert2](https://sweetalert2.github.io/): модальные алерты и тосты без зависимостей.

## Подключение через CDN

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2-neutral/dist/sweetalert2.all.min.js"></script>
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2-neutral/dist/sweetalert2.min.css">
```

Задайте [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage):

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      Swal.fire({
        icon: 'success',
        title: message,
        showConfirmButton: false,
      })
    },
    error(message) {
      Swal.fire({
        icon: 'error',
        title: message,
        showConfirmButton: false,
      })
    },
  }
})
```

В отдельном файле с `defer` (после скрипта FetchIt) обёртка `DOMContentLoaded` не нужна:

```js
FetchIt.Message = {
  success(message) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
    })
  },
  error(message) {
    Swal.fire({
      icon: 'error',
      title: message,
      showConfirmButton: false,
    })
  },
}
```

Блоки формы `[data-success]` и `[data-validation-error]` работают параллельно с тостами. Если нужны только они, `Message` можно не задавать. Селекторы: [документация](/components/fetchit/selectors).
