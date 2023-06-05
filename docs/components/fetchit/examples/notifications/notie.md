# Notie

Этот раздел поможет вам подключить минималистичный модуль для показа уведомлений, ввода и выбора данных на javascript [Notie](https://jaredreich.com/notie/). Давайте подключим его.

- Сперва вам необходимо подключить скрипт и стили модуля, для примера воспользуемся CDN.

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/notie@4/dist/notie.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notie@4/dist/notie.min.css">
```

- И определим свойство [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage) следующим образом:

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      notie.alert({
        type: 'success',
        text: message,
      });
    },
    error(message) {
      notie.alert({
        type: 'error',
        text: message,
      });
    },
  }
});
```

- Либо в своём файловом скрипте с атрибутом подключения `defer`, тогда вам не нужно накладывать обработчик на событие `DOMContentLoaded` и получить прямой доступ к классу FetchIt:

```js
FetchIt.Message = {
  success(message) {
    notie.alert({
      type: 'success',
      text: message,
    });
  },
  error(message) {
    notie.alert({
      type: 'error',
      text: message,
    });
  },
}
```

Вуаля! Вот таким простым способом, мы можем подключить модуль **Notie**.
