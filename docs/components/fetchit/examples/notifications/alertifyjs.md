# AlertifyJS

В данном разделе мы покажем как подключить фреймворк [AlertifyJS](https://alertifyjs.com/) для показа сообщений.

- Сперва вам необходимо подключить скрипт и стили фреймворка, для примера воспользуемся CDN.

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/alertifyjs@1/build/alertify.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1/build/css/alertify.min.css"/>
<!-- Default theme -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1/build/css/themes/default.min.css"/>
```

- И определить свойство [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage) следующим образом:

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      alertify.success(message);
    },
    error(message) {
      alertify.error(message);
    },
  }
});
```

- Либо в своём файловом скрипте с атрибутом подключения `defer`, тогда вам не нужно накладывать обработчик на событие `DOMContentLoaded` и получить прямой доступ к классу FetchIt:

```js
FetchIt.Message = {
  success(message) {
    alertify.success(message);
  },
  error(message) {
    alertify.error(message);
  },
}
```

Готово! Вот такими нехитрыми действиями, мы подключили фреймворк **AlertifyJS**.
