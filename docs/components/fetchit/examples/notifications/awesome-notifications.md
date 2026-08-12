---
title: Awesome Notifications
description: Уведомления Awesome Notifications для FetchIt через CDN и FetchIt.Message
---

# Awesome Notifications

[Awesome Notifications](https://f3oall.github.io/awesome-notifications/): лёгкие тосты на чистом JS.

## Подключение через CDN

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/awesome-notifications@3/dist/index.var.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/awesome-notifications@3/dist/style.min.css">
```

Создайте экземпляр и задайте [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage):

```js
document.addEventListener('DOMContentLoaded', () => {
  const notifier = new AWN()

  FetchIt.Message = {
    success(message) {
      notifier.success(message)
    },
    error(message) {
      notifier.alert(message)
    },
  }
})
```

В отдельном файле с `defer` (после скрипта FetchIt) обёртка `DOMContentLoaded` не нужна:

```js
const notifier = new AWN()

FetchIt.Message = {
  success(message) {
    notifier.success(message)
  },
  error(message) {
    notifier.alert(message)
  },
}
```

Блоки формы `[data-success]` и `[data-validation-error]` работают параллельно с тостами. Если нужны только они, `Message` можно не задавать. Селекторы: [документация](/components/fetchit/selectors).
