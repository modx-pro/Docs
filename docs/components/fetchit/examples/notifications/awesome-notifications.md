---
title: Awesome Notifications
description: Тосты Awesome Notifications для ответов FetchIt
---

# Awesome Notifications

[Awesome Notifications](https://f3oall.github.io/awesome-notifications/) — тосты с иконками и полоской оставшегося времени, без зависимостей.

## Подключение

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/awesome-notifications@3/dist/style.min.css">
<script src="https://cdn.jsdelivr.net/npm/awesome-notifications@3/dist/index.var.js" defer></script>
```

## FetchIt.Message

```js
document.addEventListener('DOMContentLoaded', () => {
  const notifier = new AWN({
    position: 'top-right',
    durations: { global: 5000, alert: 8000 },
    labels: { success: 'Готово', alert: 'Ошибка' },
  })

  const show = (message, display) => {
    const text = FetchIt.sanitizeHTML(message).trim()
    if (text) {
      display(text)
    }
  }

  FetchIt.Message = {
    success: (message) => show(message, (text) => notifier.success(text)),
    error: (message) => show(message, (text) => notifier.alert(text)),
  }
})
```

Ошибку показывает метод `alert`: метода `error` в библиотеке нет.

Почему текст проходит через `sanitizeHTML` и зачем проверка на пустую строку — в [общем разделе](/components/fetchit/examples/notifications/#storonnie-biblioteki).
