# iziToast

In this section, we integrate an elegant and lightweight plugin for showing notifications [iziToast](https://izitoast.marcelodolza.com/).

- Let's add the styles.

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/izitoast@1/dist/css/iziToast.min.css">
```

- And for a change, we can import the script directly from CDN and define the [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) property as follows:

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

- Or in your file script with the `defer` attribute, then you don't need to put a handler on the `DOMContentLoaded` event and access the FetchIt class directly:

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

Done! These are the simple steps to integrate **iziToast**.
