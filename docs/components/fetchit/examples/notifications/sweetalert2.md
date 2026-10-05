---
title: SweetAlert2
description: Тосты и модальные окна SweetAlert2 для ответов FetchIt
---

# SweetAlert2

[SweetAlert2](https://sweetalert2.github.io/) — модальные окна и тосты без зависимостей. Ниже используется сборка `sweetalert2-neutral` с тем же API.

## Подключение

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2-neutral@11/dist/sweetalert2.min.css">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2-neutral@11/dist/sweetalert2.all.min.js" defer></script>
```

## Тосты

Небольшое окно в углу, которое закрывается само. Пока на нём курсор, таймер стоит:

```js
document.addEventListener('DOMContentLoaded', () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })

  const show = (icon, message) => {
    const text = FetchIt.sanitizeHTML(message).trim()
    if (text) {
      Toast.fire({ icon, title: text })
    }
  }

  FetchIt.Message = {
    success: (message) => show('success', message),
    error: (message) => show('error', message),
  }
})
```

## Модальное окно на успех

Для заявки, после которой посетителю важно увидеть результат: успех — окно по центру с кнопкой, ошибка — тост, чтобы не заслонять форму с подсвеченными полями.

```js
document.addEventListener('DOMContentLoaded', () => {
  const text = (message) => FetchIt.sanitizeHTML(message).trim()

  FetchIt.Message = {
    success(message) {
      Swal.fire({
        icon: 'success',
        title: 'Спасибо!',
        text: text(message),
        confirmButtonText: 'Хорошо',
      })
    },
    error(message) {
      if (!text(message)) {
        return
      }

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: text(message),
        showConfirmButton: false,
        timer: 6000,
      })
    },
  }
})
```

`text` выводится как текст, а `title` и `html` — как HTML, поэтому сообщение сервера здесь тоже проходит через `sanitizeHTML`.

Почему нужна проверка на пустую строку — в [общем разделе](/components/fetchit/examples/notifications/#storonnie-biblioteki).
