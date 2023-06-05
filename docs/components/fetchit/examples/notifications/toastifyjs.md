# Toastify JS

[Toastify JS](https://apvarun.github.io/toastify-js/) легковесная библиотека для показа уведомлений в браузере и в данном примере мы покажем как её подключить.

- Сперва нам необходимо подключить скрипт и стили библиотеки, для примера воспользуемся CDN.

```html
<!-- JavaScript -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js@1/src/toastify.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js@1/src/toastify.min.css">
```

- И определим свойство [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage) следующим образом:

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      Toastify({ text: message }).showToast();
    },
    error(message) {
      Toastify({ text: message }).showToast();
    },
  }
});
```

- Либо в своём файловом скрипте с атрибутом подключения `defer`, тогда вам не нужно накладывать обработчик на событие `DOMContentLoaded` и получить прямой доступ к классу FetchIt:

```js
FetchIt.Message = {
  success(message) {
    Toastify({ text: message }).showToast();
  },
  error(message) {
    Toastify({ text: message }).showToast();
  },
}
```

Замечательно! Вот таким простым способом, мы можем подключить библиотеку **Toastify JS**.
