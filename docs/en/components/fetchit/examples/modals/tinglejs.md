# tingle.js modals

This section covers an example with [tingle.js](https://tingle.robinparisi.com/) modals.

## Opening a modal

To open a modal after a successful form submit, you can do it in two ways:

1. Using the [`fetchit:success`](/en/components/fetchit/frontend/events#fetchitsuccess) event.

    ```js
    const successModal = new tingle.modal();

    document.addEventListener('fetchit:success', ({ detail: { response: { message } } }) => {
      successModal.setContent(message);
      successModal.open();
    });
    ```

2. Using [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage).

    ```js
    const successModal = new tingle.modal();

    FetchIt.Message = {
      // ...
      success (message) {
        successModal.setContent(message);
        successModal.open();
      },
    }
    ```
