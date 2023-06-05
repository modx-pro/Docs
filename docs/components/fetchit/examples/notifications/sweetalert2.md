# SweetAlert2

[SweetAlert2](https://sweetalert2.github.io/) это одна из самых популярных библиотек уведомлений у которой нет зависимостей. Для её подключения нам необходимо проделать следующие действия.

- Подключим скрипты и стили библиотеки. Для простоты примера сделаем это через CDN.

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2-neutral/dist/sweetalert2.all.min.js"></script>
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2-neutral/dist/sweetalert2.min.css">
```

- И определим свойство [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage) следующим образом:

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      Swal.fire({
        icon: 'success',
        title: message,
        showConfirmButton: false,
      });
    },
    error(message) {
      Swal.fire({
        icon: 'error',
        title: message,
        showConfirmButton: false,
      });
    },
  }
});
```

- Либо в своём файловом скрипте с атрибутом подключения `defer`, тогда вам не нужно накладывать обработчик на событие `DOMContentLoaded` и получить прямой доступ к классу FetchIt:

```js
FetchIt.Message = {
  success(message) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
    });
  },
  error(message) {
    Swal.fire({
      icon: 'error',
      title: message,
      showConfirmButton: false,
    });
  },
}
```

Отлично! Теперь у нас будут отображаться красивые уведомления **SweetAlert2**.
