---
title: Toastify JS
description: Тосты Toastify JS для ответов FetchIt
---

# Toastify JS

[Toastify JS](https://apvarun.github.io/toastify-js/) — простые тосты без зависимостей. Цвета задаются прямо в вызове.

## Подключение

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js@1/src/toastify.min.css">
<script src="https://cdn.jsdelivr.net/npm/toastify-js@1/src/toastify.min.js" defer></script>
```

## FetchIt.Message

```js
document.addEventListener('DOMContentLoaded', () => {
  const colors = {
    success: 'linear-gradient(135deg, #16a34a, #22c55e)',
    error: 'linear-gradient(135deg, #b91c1c, #ef4444)',
  }

  const show = (type, message) => {
    const text = FetchIt.sanitizeHTML(message).trim()
    if (!text) {
      return
    }

    Toastify({
      text,
      duration: type === 'error' ? 8000 : 5000,
      close: true,
      gravity: 'top',
      position: 'right',
      stopOnFocus: true,
      style: { background: colors[type] },
      ariaLive: type === 'error' ? 'assertive' : 'polite',
    }).showToast()
  }

  FetchIt.Message = {
    success: (message) => show('success', message),
    error: (message) => show('error', message),
  }
})
```

Без `style` успех и ошибка выглядят одинаково: у Toastify нет встроенных типов.

Почему текст проходит через `sanitizeHTML` и зачем проверка на пустую строку — в [общем разделе](/components/fetchit/examples/notifications/#storonnie-biblioteki).
