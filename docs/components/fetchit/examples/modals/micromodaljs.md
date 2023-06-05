# Модальные окна Micromodal.js

В данном разделе разберём несколько примеров с модальными окнами [Micromodal.js](https://micromodal.vercel.app/).

## Закрытие модального окна

Если ваша форма находится в модальном окне и вы бы хотели закрыть её после успешной отправки формы, то для решения задачи надо воспользоваться событием [`fetchit:success`](/components/fetchit/frontend/events#fetchitsuccess).

```js
document.addEventListener('fetchit:success', ({ detail }) => {
  const { form } = detail;

  // Определите ID нужного окна относительно формы

  MicroModal.close('modal-id');
});
```
