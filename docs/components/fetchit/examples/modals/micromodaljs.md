---
title: Модальные окна Micromodal.js
description: Закрытие Micromodal.js после успешной отправки FetchIt
---

# Модальные окна Micromodal.js

Закрыть окно [Micromodal.js](https://micromodal.vercel.app/) после успеха.

Форма лежит внутри модалки. В [`fetchit:success`](/components/fetchit/frontend/events#fetchitsuccess) берёте `form` и закрываете нужный id:

```js
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  const modal = form.closest('[data-micromodal-close], .modal, [id^="modal-"]')
  const modalId = modal?.id || 'modal-1'

  MicroModal.close(modalId)
})
```

Если id окна известен заранее:

```js
document.addEventListener('fetchit:success', () => {
  MicroModal.close('modal-1')
})
```

Подставьте свой id из разметки Micromodal (`id` корневого диалога).
