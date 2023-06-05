# PNotify

В данном примере мы подключим библиотеку [PNotify](https://sciactive.com/pnotify/).

- Подключим скрипты и стили. Для простоты примера сделаем это через CDN.

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/@pnotify/core@5/dist/PNotify.min.js" defer></script>

<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/@pnotify/core@5/dist/PNotify.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@pnotify/core@5/dist/BrightTheme.min.css" rel="stylesheet">
```

- И определим свойство [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage) следующим образом:

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      PNotify.success({ title: message });
    },
    error(message) {
      PNotify.error({ title: message });
    },
  }
});
```

- Либо в своём файловом скрипте с атрибутом подключения `defer`, тогда вам не нужно накладывать обработчик на событие `DOMContentLoaded` и получить прямой доступ к классу FetchIt:

```js
FetchIt.Message = {
  success(message) {
    PNotify.success({ title: message });
  },
  error(message) {
    PNotify.error({ title: message });
  },
}
```

Готово! Вот такими простыми действиями мы подключили **PNotify**.
