# iziToast

This section shows how to integrate the elegant, lightweight notification plugin [iziToast](https://izitoast.marcelodolza.com/).

- For simplicity, include the styles.

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/izitoast@1/dist/css/iziToast.min.css">
```

- Import the script from CDN and set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) as follows:

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

- Or in your own script file with the `defer` attribute; then you do not need the `DOMContentLoaded` handler and have direct access to the FetchIt class:

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

Done! With these steps you integrate **iziToast**.
