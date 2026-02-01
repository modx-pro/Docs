# Notiflix.Notify

This section shows how to integrate the [Notiflix](https://notiflix.github.io/) library (pure JavaScript) and its [Notify](https://notiflix.github.io/notify) tool.

- For variety we import the script and styles from CDN and set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) as follows:

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

- Or in your own script file with the `defer` attribute; then you do not need the `DOMContentLoaded` handler and have direct access to the FetchIt class:

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

Done! With these steps we integrate **Notiflix.Notify**.
