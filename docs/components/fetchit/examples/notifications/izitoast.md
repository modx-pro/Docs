---
title: iziToast
description: Уведомления iziToast для FetchIt через CDN и FetchIt.Message
---

# iziToast

[iziToast](https://izitoast.marcelodolza.com/): лёгкие тосты на чистом JS.

## Подключение через CDN

Стили подключите отдельно:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/izitoast@1/dist/css/iziToast.min.css">
```

Скрипт и [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage) через ESM:

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

В отдельном модуле с `defer` (после скрипта FetchIt) обёртка `DOMContentLoaded` не нужна:

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

Блоки формы `[data-success]` и `[data-validation-error]` работают параллельно с тостами. Если нужны только они, `Message` можно не задавать. Селекторы: [документация](/components/fetchit/selectors).
