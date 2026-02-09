# Class FetchIt

This class handles form processing and is defined in the component script that is registered in the `<head>` with the `defer` attribute, so it runs only after the page has loaded. That keeps the script from blocking page load.

Load-speed tools like PageSpeed Insights will be happy. Hello, SEO folks :wink:.

## Class properties and methods

The class has several static properties. Important: on the class itself, not on instances.

## FetchIt.forms

- Type: `HTMLFormElement[]`

Holds an array of all forms managed by FetchIt.

## FetchIt.instances

- Type: `Map`

Returns a `Map` of `FetchIt` instances. You can get the instance for a form from this map.

- Example:

```js
const form = document.querySelector('#form');
const fetchit = FetchIt.instances.get(form);
```

## FetchIt.Message

- Type: `object`

This property is not defined by default; all instances will try to call its methods: `before`, `success`, `error`, `after`, and `reset`. You can define it in your own script to integrate with your layout:

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

The `success`, `error`, and `after` methods receive the message returned by the snippet.

## FetchIt.sanitizeHTML()

- Type: `function (str: string): string`

Class method that returns the given string with HTML tags stripped.

## FetchIt.create()

- Type: `function (config: object): undefined`

Factory method that creates FetchIt instances. Each instance is bound to one form.

## FetchIt.events

- Type: `object`

Object mapping event names. Useful for prototype-based extensions.

## Accessing the class

::: warning Important!
The class is available only after the script that defines it has run.
:::

If you use an external script, load it with the `defer` attribute (the component registers its script in `<head>`).

For inline scripts, wait for the script to run, e.g. in a `DOMContentLoaded` handler:

```js
document.addEventListener('DOMContentLoaded', () => {
  console.log(FetchIt);
});
```
