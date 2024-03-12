# tingle.js

In this section, let's see an example of working with modal windows [tingle.js](https://tingle.robinparisi.com/).

## Opening a modal

If you have the task of opening a modal window after a successful form submission, it can be solved in two ways:

1. Using the [`fetchit:success`](/en/components/fetchit/frontend/events#fetchitsuccess) event.

    ```js
    const successModal = new tingle.modal();

    document.addEventListener('fetchit:success', ({ detail: { response: { message } } }) => {
      successModal.setContent(message);
      successModal.open();
    });
    ```

2. With [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage).

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
