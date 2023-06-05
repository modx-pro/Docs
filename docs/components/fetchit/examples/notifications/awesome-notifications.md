# Awesome Notifications

В данном разделе подключим легковесную библиотеку [Awesome Notifications](https://f3oall.github.io/awesome-notifications/).

- Добавим скрипты и стили. Для простоты примера сделаем это через CDN.

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/awesome-notifications@3/dist/index.var.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/awesome-notifications@3/dist/style.min.css">
```

- Создадим экземпляр класса уведомлений и определим свойство [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage) следующим образом:

```js
document.addEventListener('DOMContentLoaded', () => {
  const notifier = new AWN();

  FetchIt.Message = {
    success(message) {
      notifier.success(message);
    },
    error(message) {
      notifier.alert(message);
    },
  }
});
```

- Или в своём файловом скрипте с атрибутом подключения `defer`, тогда вам не нужно накладывать обработчик на событие `DOMContentLoaded` и получить прямой доступ к классу FetchIt:

```js
const notifier = new AWN();

FetchIt.Message = {
  success(message) {
    notifier.success(message);
  },
  error(message) {
    notifier.alert(message);
  },
}
```

Готово! Вот таким образом можно подключить **Awesome Notifications**.
