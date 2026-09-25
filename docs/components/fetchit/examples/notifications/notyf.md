---
title: Notyf
description: Тосты Notyf для ответов FetchIt через FetchIt.Message
---

# Notyf

[Notyf](https://carlosroso.com/notyf/) — лёгкие тосты без зависимостей: около 3 КБ, с анимацией и поддержкой программ экранного доступа.

::: warning
До FetchIt 4 библиотека ехала в пакете и включалась настройкой `fetchit.frontend.default.notifier`. Теперь эта настройка показывает [встроенные уведомления](/components/fetchit/examples/notifications/#vstroennye-uvedomleniya), а Notyf подключается как любая другая сторонняя библиотека — вручную.
:::

## Подключение

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
<script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js" defer></script>
```

## FetchIt.Message

```js
document.addEventListener('DOMContentLoaded', () => {
  const notyf = new Notyf({
    duration: 5000,
    dismissible: true,
    position: { x: 'right', y: 'top' },
  })

  const show = (type, message) => {
    const text = FetchIt.sanitizeHTML(message).trim()
    if (text) {
      notyf.open({ type, message: text })
    }
  }

  FetchIt.Message = {
    success: (message) => show('success', message),
    error: (message) => show('error', message),
  }
})
```

Почему текст проходит через `sanitizeHTML` и зачем проверка на пустую строку — в [общем разделе](/components/fetchit/examples/notifications/#storonnie-biblioteki).

## Свои цвета

Типы `success` и `error` можно перекрасить или добавить свой:

```js
const notyf = new Notyf({
  types: [
    { type: 'success', background: '#16a34a' },
    { type: 'error', background: '#dc2626', duration: 8000 },
  ],
})
```

Ошибка здесь держится дольше: её обычно читают внимательнее.
