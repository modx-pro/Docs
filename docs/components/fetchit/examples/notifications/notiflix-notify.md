# Notiflix.Notify

Данный раздел содержит пример подключения отличной библиотеки на чистом JavaScript [Notiflix](https://notiflix.github.io/), у которого есть много инструментов, но в данном случае нас интересует конкретный - [Notify](https://notiflix.github.io/notify).

- Для разнообразия будем импортировать скрипт и стили прямо из CDN и определим свойство [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage) следующим образом:

```html
<script type="module">
  import Notiflix from 'https://cdn.jsdelivr.net/npm/notiflix@3/+esm';

  document.addEventListener('DOMContentLoaded', () => {
    FetchIt.Message = {
      success(message) {
        Notiflix.Notify.success(message);
      },
      error(message) {
        Notiflix.Notify.failure(message);
      },
    }
  });
</script>
```

- Либо в своём файловом скрипте с атрибутом подключения `defer`, тогда вам не нужно накладывать обработчик на событие `DOMContentLoaded` и получить прямой доступ к классу FetchIt:

```js
import Notiflix from 'https://cdn.jsdelivr.net/npm/notiflix@3/+esm';

FetchIt.Message = {
  success(message) {
    Notiflix.Notify.success(message);
  },
  error(message) {
    Notiflix.Notify.failure(message);
  },
}
```

Замечательно! Вот так просто мы интегрировали **Notiflix.Notify**.
