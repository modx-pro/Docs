# jGrowl

Ну и куда же мы без [jGrowl](https://github.com/stanlemon/jGrowl) который шёл в виде зависимости **AjaxForm**. В данном разделе содержится информация о том как подключить данный плагин.

- Для того, чтобы **jGrowl** работал, нам нужно подключить и сам **jQuery**, а потом скрипт самой библиотеки и его стили. Также определяем стили для разных типов уведомлений.

```html
<!-- jQuery -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js" defer></script>

<!-- Javascript -->
<script src="https://cdn.jsdelivr.net/npm/jgrowl@1/jquery.jgrowl.min.js" defer></script>

<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/jgrowl@1/jquery.jgrowl.min.css" rel="stylesheet">
<style>
  .custom-success { background: green; }
  .custom-error { background: red; }
</style>
```

- Далее, определим свойство [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage) следующим образом:

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      $.jGrowl(message, { theme: 'custom-success' });
    },
    error(message) {
      $.jGrowl(message, { theme: 'custom-error' });
    },
  }
});
```

- Либо в своём файловом скрипте с атрибутом подключения `defer`, тогда вам не нужно накладывать обработчик на событие `DOMContentLoaded` и получить прямой доступ к классу FetchIt:

```js
FetchIt.Message = {
  success(message) {
    $.jGrowl(message, { theme: 'custom-success' });
  },
  error(message) {
    $.jGrowl(message, { theme: 'custom-error' });
  },
}
```

Вот и всё! Но мы не рекомендуем использовать в своём проекте данную библиотеку если в нём нет jQuery. Только ради одного плагина уведомлений подключать целую другую нелогично и ресурсозатратно.
