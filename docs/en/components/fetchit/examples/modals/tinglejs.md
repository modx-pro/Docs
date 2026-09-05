---
title: tingle.js modals
description: Open tingle.js after FetchIt success
---

# tingle.js modals

Open a [tingle.js](https://tingle.robinparisi.com/) dialog after a successful submit.

## Via event

```js
const successModal = new tingle.modal()

document.addEventListener('fetchit:success', ({ detail: { response: { message } } }) => {
  successModal.setContent(message)
  successModal.open()
})
```

## Via FetchIt.Message

If you do not need toasts, wire the same modal to `success`:

```js
const successModal = new tingle.modal()

FetchIt.Message = {
  success(message) {
    successModal.setContent(message)
    successModal.open()
  },
  error(message) {
    // your error UI or toast
    console.error(message)
  },
}
```

Escape content from `message` if the response may include HTML.
