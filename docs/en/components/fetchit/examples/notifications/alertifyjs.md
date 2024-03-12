# AlertifyJS

In this section, we will show how to connect the [AlertifyJS](https://alertifyjs.com/) framework to display messages.

- First you need to load the script and framework styles, we'll use CDN as an example.

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/alertifyjs@1/build/alertify.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1/build/css/alertify.min.css"/>
<!-- Default theme -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1/build/css/themes/default.min.css"/>
```

- And define the [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) property as follows:

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      alertify.success(message);
    },
    error(message) {
      alertify.error(message);
    },
  }
});
```

- Or in your file script with the `defer` attribute, then you don't need to put a handler on the `DOMContentLoaded` event and get direct access to the FetchIt class:

```js
FetchIt.Message = {
  success(message) {
    alertify.success(message);
  },
  error(message) {
    alertify.error(message);
  },
}
```

Done! With these simple steps, we have integrated the **AlertifyJS** framework.
