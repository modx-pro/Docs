# NOTY

Этот раздел содержит информацию о том, как подключить библиотеку уведомлений [NOTY](https://ned.im/noty/).

:::danger Внимание!
На данный момент библиотека NOTY не поддерживается его автором и указана как **DEPRECATED**.
:::

- Сперва нам необходимо подключить скрипт и стили библиотеки, для примера воспользуемся CDN.

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/noty@3.2.0-beta-deprecated/lib/noty.min.js" defer></script>

<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/noty@3.2.0-beta-deprecated/lib/noty.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/noty@3.2.0-beta-deprecated/lib/themes/mint.min.css" rel="stylesheet">
```

- И определим свойство [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage) следующим образом:

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      new Noty({
        type: 'success',
        text: message
      }).show()
    },
    error(message) {
      new Noty({
        type: 'error',
        text: message
      }).show()
    },
  }
});
```

- Или в своём файловом скрипте с атрибутом подключения `defer`, тогда вам не нужно накладывать обработчик на событие `DOMContentLoaded` и получить прямой доступ к классу FetchIt:

```js
FetchIt.Message = {
  success(message) {
    new Noty({
      type: 'success',
      text: message
    }).show()
  },
  error(message) {
    new Noty({
      type: 'error',
      text: message
    }).show()
  },
}
```

Готово! Вот такими простыми действиями мы можем подключить **NOTY**.
