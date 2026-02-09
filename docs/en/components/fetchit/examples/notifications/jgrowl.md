# jGrowl

We cannot skip [jGrowl](https://github.com/stanlemon/jGrowl), which was a dependency of **AjaxForm**. This section describes how to integrate this plugin.

- For **jGrowl** to work you need to include **jQuery** first, then the plugin script and styles. Also define styles for different notification types.

```html
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- jGrowl -->
<script src="https://cdn.jsdelivr.net/npm/jgrowl@1/jquery.jgrowl.min.js" defer></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jgrowl@1/jquery.jgrowl.min.css">
```

- Then set [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) as follows:

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      $.jGrowl(message, { theme: 'success' });
    },
    error(message) {
      $.jGrowl(message, { theme: 'error' });
    },
  }
});
```

- Or in your own script file with the `defer` attribute; then you do not need the `DOMContentLoaded` handler and have direct access to the FetchIt class:

```js
FetchIt.Message = {
  success(message) {
    $.jGrowl(message, { theme: 'success' });
  },
  error(message) {
    $.jGrowl(message, { theme: 'error' });
  },
}
```

Done! We do not recommend using this library in your project if you do not already have jQuery. Adding jQuery just for one notification plugin is unnecessary and resource-heavy.
