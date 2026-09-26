---
title: Notiflix.Notify
description: Notiflix.Notify toasts for FetchIt responses
---

# Notiflix.Notify

[Notiflix](https://notiflix.github.io/) — a set of UI modules in plain JS. Toasts need the [Notify](https://notiflix.github.io/notify) module, which adds its styles by itself.

## Loading and FetchIt.Message

The library is loaded as an ES module. Modules run deferred, like `defer`, so `FetchIt` is already available in them and `DOMContentLoaded` is not needed:

```html
<script type="module">
  import Notiflix from 'https://cdn.jsdelivr.net/npm/notiflix@3/+esm'

  Notiflix.Notify.init({
    position: 'right-top',
    timeout: 5000,
    clickToClose: true,
    pauseOnHover: true,
  })

  const show = (message, display) => {
    const text = FetchIt.sanitizeHTML(message).trim()
    if (text) {
      display(text)
    }
  }

  FetchIt.Message = {
    success: (message) => show(message, (text) => Notiflix.Notify.success(text)),
    error: (message) => show(message, (text) => Notiflix.Notify.failure(text)),
  }
</script>
```

The module has to come after the FetchIt script in the HTML. The plugin puts that script in `<head>`, so it is enough to place the module lower, before `</body>` for example.

Why the text goes through `sanitizeHTML` and what the empty-string check is for is explained in the [general section](/en/components/fetchit/examples/notifications/#third-party-libraries).

## Loading indicator

Notiflix also has the [Loading](https://notiflix.github.io/loading) module — a dimmed page with a spinner while the form is being sent. Show it on [`fetchit:before`](/en/components/fetchit/frontend/events#fetchitbefore) and remove it on `fetchit:success` and `fetchit:error`:

```js
// In the same module, after the import
document.addEventListener('fetchit:before', (e) => {
  if (!e.defaultPrevented) {
    Notiflix.Loading.circle()
  }
})

for (const name of ['fetchit:success', 'fetchit:error']) {
  document.addEventListener(name, () => Notiflix.Loading.remove())
}
```

`Notiflix` from the `import` is visible only inside the module, so the code goes there too. Load the module after client-side validation: if validation cancels the submission, `e.defaultPrevented` is already `true`. More on this in the [submit indicator](/en/components/fetchit/examples/scenarios/loading) example.
