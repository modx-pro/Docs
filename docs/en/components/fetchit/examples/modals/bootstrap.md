# Bootstrap modals

This section covers several cases involving [Bootstrap](https://getbootstrap.com/) modals.

## Closing the modal

Suppose your form is inside a modal and you want to close it after a successful submit. Use the [`fetchit:success`](/en/components/fetchit/frontend/events#fetchitsuccess) event.

- If modals were initialized with JavaScript.

```js
// Modal initialization
const exampleModal = new bootstrap.Modal(document.getElementById('exampleModal'));

document.addEventListener('fetchit:success', () => {
  exampleModal.hide();
});
```

- If modals are initialized on page load via attributes.

```js
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  const modal = form.closest('.modal');
  const modalInstance = bootstrap.Modal.getInstance(modal);

  if (!modalInstance) {
    return;
  }

  modalInstance.hide();
});
```

:::warning Warning
As of this documentation, in Bootstrap@5.3 the method bootstrap.Modal.getInstance() does not work as expected. This may be fixed in future versions.
:::

:::details If you run into issues, use the following code instead

```js
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  const modal = form.closest('.modal');
  if (!modal) {
    return;
  }

  const closeBtn = modal.querySelector('[data-bs-dismiss="modal"]');
  if (!closeBtn) {
    return;
  }

  closeBtn.click();
});
```

:::

## Opening a modal

This is even simpler. Let's add the server response into the modal body.

```js
document.addEventListener('fetchit:success', ({ detail: { response: { message } } }) => {
  const modal = bootstrap.Modal.getOrCreateInstance('#exampleModal');
  const body = modal._element.querySelector('.modal-body');
  body.innerHTML = message
  modal.show();
});
```
