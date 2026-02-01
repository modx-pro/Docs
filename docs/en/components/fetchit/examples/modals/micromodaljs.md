# Micromodal.js modals

This section covers examples with [Micromodal.js](https://micromodal.vercel.app/) modals.

## Closing the modal

If your form is inside a modal and you want to close it after a successful submit, use the [`fetchit:success`](/en/components/fetchit/frontend/events#fetchitsuccess) event.

```js
document.addEventListener('fetchit:success', ({ detail }) => {
  const { form } = detail;

  // Determine the modal ID relative to the form

  MicroModal.close('modal-id');
});
```
