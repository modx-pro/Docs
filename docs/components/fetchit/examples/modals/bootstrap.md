# Модальные окна Bootstrap

В данном разделе разберём несколько кейсов связанных с модальными окнами [Bootstrap](https://getbootstrap.com/).

## Закрытие модального окна

Представим, что ваша форма находится в модальном окне и вы хотите закрыть её после успешной отправки формы. Для решения задачи надо воспользоваться событием [`fetchit:success`](/components/fetchit/frontend/events#fetchitsuccess).

- Если модальные окна были инициализированы с помощью JavaScript.

```js
// Инициализация модального окна
const exampleModal = new bootstrap.Modal(document.getElementById('exampleModal'));

document.addEventListener('fetchit:success', () => {
  exampleModal.hide();
});
```

- Если модальные окна инициализированы при загрузке страницы с помощью атрибутов.

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

:::warning Внимание
На момент публикации документации, в Bootstrap@5.3 метод bootstrap.Modal.getInstance() работает не так, как ожидается. Возможно в будущих версиях это исправят.
:::

:::details Если у вас возникли проблемы, то воспользуйтесь следующим кодом

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

## Открытие модального окна

Данная задача решается еще проще. Но давайте её немного усложним тем, что будем добавлять ответ от сервера в тело модального окна.

```js
document.addEventListener('fetchit:success', ({ detail: { response: { message } } }) => {
  const modal = bootstrap.Modal.getOrCreateInstance('#exampleModal');
  const body = modal._element.querySelector('.modal-body');
  body.innerHTML = message
  modal.show();
});
```
