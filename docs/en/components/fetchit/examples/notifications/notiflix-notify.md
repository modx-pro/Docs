# Notiflix.Notify

This section contains an example of connecting an excellent pure JavaScript library [Notiflix](https://notiflix.github.io/), which has many tools, but in this case we are interested in a specific one - [Notify](https://notiflix.github.io/notify).

- First we need to import the script and styles directly from the CDN and define the [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) property as follows:

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

- Or in your file script with the `defer` attribute, then you don't need to put a handler on the `DOMContentLoaded` event and get direct access to the FetchIt class:

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

Great! Just like that, we've integrated **Notiflix.Notify**.
