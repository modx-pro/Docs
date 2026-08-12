# FetchIt class

The global class is declared in the component script. The plugin puts the file in `<head>` with `defer` so it does not block parsing (~5 KB minified).

## FetchIt.forms

- Type: `HTMLFormElement[]`

All forms that have an instance.

## FetchIt.instances

- Type: `Map`

Key: form element. Value: instance.

```js
const form = document.querySelector('#form')
const fetchit = FetchIt.instances.get(form)
```

## FetchIt.Message

- Type: `object` (not defined by default)

Instances call these methods when they exist: `before`, `success`, `error`, `after`, `reset`. That is how you wire toasts without touching the core.

```js
FetchIt.Message = {
  before() {
    // Show message before form submission
  },
  success(message) {
    // Show message on successful submission
  },
  error(message) {
    // Show message on submission error
  },
  after(message) {
    // Show message in any case
  },
  reset() {
    // Show message after form reset
  },
}
```

`success`, `error`, and `after` receive the `message` string from the server response.

If `fetchit.frontend.default.notifier` is on and you have not set `Message` yet, the first `create()` installs a Notyf wrapper from the package.

Ready-made examples: [notifications](/en/components/fetchit/examples/notifications/).

## FetchIt.sanitizeHTML(str)

Strips HTML tags from a string. Used by `setError` and `setFormMessage`.

## FetchIt.hasErrorMessage(message)

`true` if the message is non-empty after sanitize and trim. Empty and whitespace-only server errors are not drawn on fields.

## FetchIt.create(config)

Instance factory. The snippet inline script calls it for each form on the page. You rarely need it by hand.

## FetchIt.events

Event names (`before`, `success`, …). Handy when extending via inheritance.

## When the class is available

The file script with `defer` runs after the document is parsed. By the time your `defer` file runs, `FetchIt` is already available if your tag comes after the component script.

Inline without `defer`:

```js
document.addEventListener('DOMContentLoaded', () => {
  console.log(typeof FetchIt)
})
```
