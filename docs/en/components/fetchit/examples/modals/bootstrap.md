# Bootstrap modal

In this section, we will deal with several cases related to modal windows [Bootstrap](https://getbootstrap.com/).

## Closing a modal

Let's suppose that your form is in a modal window and you want to close it after successful form submission. To solve the problem you should use the [`fetchit:success`] event (/en/components/fetchit/frontend/events#fetchitsuccess).

- If the modal were initialised using JavaScript.

```js
// Init
const exampleModal = new bootstrap.Modal(document.getElementById('exampleModal'));

document.addEventListener('fetchit:success', () => {
  exampleModal.hide();
});
```

- If modals are initialised on page load using attributes.

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

::: warning WARNING
At the time of publishing the documentation, in Bootstrap@5.3 the bootstrap.Modal.getInstance() method does not work as expected. This may be fixed in future versions.
:::

::: details If you are having problems, use the following code

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

This issue is even easier to solve. But let's complicate it a bit by adding the response from the server to the body of the modal window.

```js
document.addEventListener('fetchit:success', ({ detail: { response: { message } } }) => {
  const modal = bootstrap.Modal.getOrCreateInstance('#exampleModal');
  const body = modal._element.querySelector('.modal-body');
  body.innerHTML = message
  modal.show();
});
```
