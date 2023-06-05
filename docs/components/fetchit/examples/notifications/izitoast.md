# iziToast

В данном разделе мы интегрируем элегантный и легковесный плагин для показа уведомлений [iziToast](https://izitoast.marcelodolza.com/).

- Для простоты примера подключим стили.

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/izitoast@1/dist/css/iziToast.min.css">
```

- А для разнообразия можем импортировать скрипт прямо из CDN и определим свойство [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage) следующим образом:

```html
<script type="module">
  import izitoast from 'https://cdn.jsdelivr.net/npm/izitoast@1/+esm';

  document.addEventListener('DOMContentLoaded', () => {
    FetchIt.Message = {
      success(message) {
        izitoast.success({ message });
      },
      error(message) {
        izitoast.error({ message });
      },
    }
  });
</script>
```

- Или в своём файловом скрипте с атрибутом подключения `defer`, тогда вам не нужно накладывать обработчик на событие `DOMContentLoaded` и получить прямой доступ к классу FetchIt:

```js
FetchIt.Message = {
  success(message) {
    izitoast.success({ message });
  },
  error(message) {
    izitoast.error({ message });
  },
}
```

Готово! Вот такими простыми действиями можно интегрировать **iziToast**.
