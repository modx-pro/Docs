---
title: Bootstrap modals
description: Close and open Bootstrap Modal after FetchIt success
---

# Bootstrap modals

Use cases with [Bootstrap Modal](https://getbootstrap.com/docs/5.3/components/modal/).

## Close on success

Form inside a modal. Listen for [`fetchit:success`](/en/components/fetchit/frontend/events#fetchitsuccess).

If you created the modal in JS:

```js
const exampleModal = new bootstrap.Modal(document.getElementById('exampleModal'))

document.addEventListener('fetchit:success', () => {
  exampleModal.hide()
})
```

If the modal opens via Bootstrap data attributes:

```js
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  const modal = form.closest('.modal')
  const modalInstance = bootstrap.Modal.getInstance(modal)

  if (!modalInstance) {
    return
  }

  modalInstance.hide()
})
```

::: warning
In Bootstrap 5.3, `bootstrap.Modal.getInstance()` sometimes returns `null` for modals opened only via the data API. Workaround below.
:::

::: details Workaround via dismiss button

```js
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  const modal = form.closest('.modal')
  if (!modal) {
    return
  }

  const closeBtn = modal.querySelector('[data-bs-dismiss="modal"]')
  if (!closeBtn) {
    return
  }

  closeBtn.click()
})
```

:::

## Open on success

Show the modal and insert `message` from the response:

```js
document.addEventListener('fetchit:success', ({ detail: { response: { message } } }) => {
  const modal = bootstrap.Modal.getOrCreateInstance('#exampleModal')
  const body = modal._element.querySelector('.modal-body')
  body.textContent = message
  modal.show()
})
```

`textContent` is safer than `innerHTML`: the server message may contain markup, and `sanitizeHTML` is not called here.
