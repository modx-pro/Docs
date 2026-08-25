---
title: Micromodal.js modals
description: Close Micromodal.js after FetchIt success
---

# Micromodal.js modals

Close a [Micromodal.js](https://micromodal.vercel.app/) dialog after success.

The form sits inside the modal. In [`fetchit:success`](/en/components/fetchit/frontend/events#fetchitsuccess), read `form` and close the matching id:

```js
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  const modal = form.closest('[data-micromodal-close], .modal, [id^="modal-"]')
  const modalId = modal?.id || 'modal-1'

  MicroModal.close(modalId)
})
```

If the modal id is known upfront:

```js
document.addEventListener('fetchit:success', () => {
  MicroModal.close('modal-1')
})
```

Replace the id with yours from Micromodal markup (the root dialog `id`).
