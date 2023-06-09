# События

Экземпляр класса генерирует события, которые могут быть полезны разработчикам. С их помощью вы сможете реализовать разные задачи и сценарии.

Больше примеров вы сможете найти в разделах:

- [Примеры разметок форм](/components/fetchit/examples/form/)
- [Примеры всплывающих сообщений](/components/fetchit/examples/notifications/)
- [Примеры модальных окон](/components/fetchit/examples/modals/)
- [Примеры дополнительной валидации](/components/fetchit/examples/validation/)

## fetchit:before

- Аргументы: `(form <HTMLFormElement>, formData <FormData>, fetchit <FetchIt>)`

Самое раннее событие, которое вызывается до отправки формы. Удобен в случаях, если вам нужно добавить поле и/или валидации данных на стороне клиента. При желании может прервать отправку формы.

```js
document.addEventListener('fetchit:before', (e) => {
  const { form, formData } = e.detail;

  formData.set('newField', 'Значение нового поля'); // Добавляем новое поле

  if (formData.get('name')?.length < 3) {
    e.preventDefault(); // Отменяем отправку формы
  }
})
```

## fetchit:after

- Аргументы: `(form <HTMLFormElement>, formData <FormData>, response <object>, fetchit <FetchIt>)`

Событие вызывается после отправки формы и получения ответа от сервера. Нужно для исключительных случаев, когда вам необходимо реализовать функционал вне зависимости от статуса ответа.

```js
document.addEventListener('fetchit:after', (e) => {
  const { response } = e.detail;

  console.log(response.success); // true|false
  console.log(response.message); // Сообщение от сервера
  console.log(response.data); // Данные от сервера
})
```

## fetchit:success

- Аргументы: `(form <HTMLFormElement>, formData <FormData>, response <object>, fetchit <FetchIt>)`

Данное событие будет вызвано, если в ответе сервера поле `success` будет `true` и соответственно необходим для выполнения кода при успешной отправке формы.

## fetchit:error

- Аргументы: `(form <HTMLFormElement>, formData <FormData>, response <object>, fetchit <FetchIt>)`

Данное событие будет вызвано, если в ответе сервера поле `success` будет `false` и нужно для обработки ошибок.

## fetchit:reset

- Аргументы: `(form <HTMLFormElement>, fetchit <FetchIt>)`

Данное событие будет вызвано, при сброса формы. Может быть полезен в случаях когда необходимо скрыть кастомные сообщения или ошибки.
