# Micromodal.js

In this section, let's take a few examples with [Micromodal.js](https://micromodal.vercel.app/) modals.

## Closing a modal

If your form is in a modal window and you would like to close it after a successful form submission, you should use the [`fetchit:success`](/en/components/fetchit/frontend/events#fetchitsuccess) event to solve the issue.

```js
document.addEventListener('fetchit:success', ({ detail }) => {
  const { form } = detail;

  // Define the ID of the window relative to the form

  MicroModal.close('modal-id');
});
```
