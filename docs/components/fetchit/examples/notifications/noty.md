---
title: NOTY
description: Уведомления NOTY для FetchIt через CDN и FetchIt.Message
---

# NOTY

[NOTY](https://ned.im/noty/): тосты на чистом JS.

:::danger Внимание!
Автор больше не поддерживает NOTY. Пакет помечен как deprecated.
:::

## Подключение через CDN

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/noty@3.2.0-beta-deprecated/lib/noty.min.js" defer></script>

<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/noty@3.2.0-beta-deprecated/lib/noty.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/noty@3.2.0-beta-deprecated/lib/themes/mint.min.css" rel="stylesheet">
```

Задайте [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage):

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      new Noty({
        type: 'success',
        text: message
      }).show()
    },
    error(message) {
      new Noty({
        type: 'error',
        text: message
      }).show()
    },
  }
})
```

В отдельном файле с `defer` (после скрипта FetchIt) обёртка `DOMContentLoaded` не нужна:

```js
FetchIt.Message = {
  success(message) {
    new Noty({
      type: 'success',
      text: message
    }).show()
  },
  error(message) {
    new Noty({
      type: 'error',
      text: message
    }).show()
  },
}
```

Блоки формы `[data-success]` и `[data-validation-error]` работают параллельно с тостами. Если нужны только они, `Message` можно не задавать. Селекторы: [документация](/components/fetchit/selectors).
