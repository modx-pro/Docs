# jGrowl

This section contains information on how to integrate [jGrowl](https://github.com/stanlemon/jGrowl).

- For **jGrowl** to work, we need to connect **jQuery** itself, and then the library script and its styles. Also define styles for different types of notifications.

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

- Next, define the [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) property as follows:

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

- Or in your file script with the `defer` attribute, then you don't need to put a handler on the `DOMContentLoaded` event and get direct access to the FetchIt class:

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

That's it! But we don't recommend using this library in your project if it doesn't have jQuery. It is illogical and resource-consuming to plug in a whole other plugin just for the sake of one notification plugin.
