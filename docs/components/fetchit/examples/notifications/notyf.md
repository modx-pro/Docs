# Notyf

Еще одна минималистичная библиотека уведомлений на чистом JavaScript у которой много преимуществ. Давайте подключим [Notyf](https://carlosroso.com/notyf/).

- Сперва вам необходимо подключить скрипт и стили библиотеки, для примера воспользуемся CDN.

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
```

- Создадим экземпляр класса уведомлений и определим свойство [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage) следующим образом:

```js
document.addEventListener('DOMContentLoaded', () => {
  const notyf = new Notyf();

  FetchIt.Message = {
    success(message) {
      notyf.success(message);
    },
    error(message) {
      notyf.error(message);
    },
  }
});
```

- Либо в своём файловом скрипте с атрибутом подключения `defer`, тогда вам не нужно накладывать обработчик на событие `DOMContentLoaded` и получить прямой доступ к классу FetchIt:

```js
const notyf = new Notyf();

FetchIt.Message = {
  success(message) {
    notyf.success(message);
  },
  error(message) {
    notyf.error(message);
  },
}
```

Вуаля! Вот таким простым способом, мы можем подключить библиотеку **Notyf**.
