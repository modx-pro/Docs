---
title: Модальные окна tingle.js
description: Открытие tingle.js после успешной отправки FetchIt
---

# Модальные окна tingle.js

Открыть окно [tingle.js](https://tingle.robinparisi.com/) после успешной отправки.

## Через событие

```js
const successModal = new tingle.modal()

document.addEventListener('fetchit:success', ({ detail: { response: { message } } }) => {
  successModal.setContent(message)
  successModal.open()
})
```

## Через FetchIt.Message

Если тосты вам не нужны, то же окно можно повесить на `success`:

```js
const successModal = new tingle.modal()

FetchIt.Message = {
  success(message) {
    successModal.setContent(message)
    successModal.open()
  },
  error(message) {
    // свой UI ошибки или тост
    console.error(message)
  },
}
```

Контент из `message` лучше экранировать, если в ответе может быть HTML.
