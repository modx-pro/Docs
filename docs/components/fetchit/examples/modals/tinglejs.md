# Модальные окна tingle.js

В данном разделе разберём пример работы с модальными окнами [tingle.js](https://tingle.robinparisi.com/).

## Открытие модального окна

Если у вас есть задача открыть модальное окно после успешной отправки формы, то её можно решить двумя способами:

1. С помощью события [`fetchit:success`](/components/fetchit/frontend/events#fetchitsuccess).

    ```js
    const successModal = new tingle.modal();

    document.addEventListener('fetchit:success', ({ detail: { response: { message } } }) => {
      successModal.setContent(message);
      successModal.open();
    });
    ```

2. С помощью [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage).

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
