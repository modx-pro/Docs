---
title: AlertifyJS
description: Уведомления AlertifyJS для ответов FetchIt
---

# AlertifyJS

[AlertifyJS](https://alertifyjs.com/) — диалоги и уведомления без зависимостей, с темами оформления.

## Подключение

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1/build/css/alertify.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1/build/css/themes/default.min.css">
<script src="https://cdn.jsdelivr.net/npm/alertifyjs@1/build/alertify.min.js" defer></script>
```

Вместо `default.min.css` можно взять тему `bootstrap.min.css` или `semantic.min.css` — под оформление сайта.

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

`delay` задаётся в секундах.

Почему текст проходит через `sanitizeHTML` и зачем проверка на пустую строку — в [общем разделе](/components/fetchit/examples/notifications/#storonnie-biblioteki).
