# toastr

[toastr](https://codeseven.github.io/toastr/) это библиотека для показа неблокирующих уведомлений и в данном примере будет показано её подключение.

- Как бы это странно не звучало, но нам нужно будет подключить jQuery, т.к. он является зависимостью библиотеки **toastr**, потом скрипт самой библиотеки и его стили.

:::warning Внимание!
Обратите внимание на то, что селекторы **toastr** и фреймворка **Bootstrap** могут конфликтовать.
:::

```html
<!-- jQuery -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js" defer></script>

<!-- Javascript -->
<script src="https://cdn.jsdelivr.net/npm/toastr@2/build/toastr.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastr@2/build/toastr.min.css">
```

- И определим свойство [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage) следующим образом:

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      toastr.success(message);
    },
    error(message) {
      toastr.error(message);
    },
  }
});
```

- Либо в своём файловом скрипте с атрибутом подключения `defer`, тогда вам не нужно накладывать обработчик на событие `DOMContentLoaded` и получить прямой доступ к классу FetchIt:

```js
FetchIt.Message = {
  success(message) {
    toastr.success(message);
  },
  error(message) {
    toastr.error(message);
  },
}
```

И на этом всё! Но мы не рекомендуем использовать в своём проекте данную библиотеку если в нём нет jQuery. Только ради одной библиотеки уведомлений подключать целую другую кощунство.
