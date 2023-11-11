# FetchIt Class

This class is responsible for form processing and is declared in a script that comes as part of the extra and which is registered in the `<head>` tag with the `defer` attribute, which allows you to defer its execution until the whole page is loaded. This allows the script not to prevent the page from loading.

PageSpeed Insights will be happy :wink:.

## Class properties and methods

A class has several static properties. Important! Class itself, not instances.

## FetchIt.forms

- Type: `HTMLFormElement[]`

This property stores an array of `HTMLFormElement` of all processed forms.

## FetchIt.instances

- Type: `Map`

This property will return the `Map` collection where instances of the `FetchIt` class are stored. The class can be accessed through a form.

- Example:

```js
const form = document.querySelector('#form');
const fetchit = FetchIt.instances.get(form);
```

## FetchIt.Message

- Type: `object`

This property is not declared, but all instances of the class will attempt to call its methods: `before`, `success`, `error`, `after` and `reset`. This is done to make it easy to embed the script in your layout. I.e. you can declare this property in your script, for example, like this:

```js
FetchIt.Message = {
  before() {
    // Show a message before submitting the form
  },
  success(message) {
    // Show message if sent successfully
  },
  error(message) {
    // Show a message in case of a sending error
  },
  after(message) {
    // Show a message either way
  },
  reset() {
    // Show message after form reset
  },
}
```

As you have already noticed, the `success`, `error` and `after` methods receive as an argument the message that will be returned by the called snippet.

## FetchIt.sanitizeHTML()

- Type: `function (str: string): string`

This method returns a string cleared of HTML tags passed as a single argument.

## FetchIt.create()

- Type: `function (config: object): undefined`

A factory method that creates instances of the FetchIt class. Each instance of the class is responsible for a different form.

## FetchIt.events

- Type: `object`

An object with events and their names. May be useful for prototype inheritance.

## Class access

::: warning WARNING
Remember, to access this class, you must wait until the script in which it is declared is executed.
:::

If you have a file script, it is enough to specify the `defer` attribute when connecting it (Recall that the component registers the script in the `<head>` tag).

And in the case of an inline script, you need to wait for the script to execute, and this is possible in the `DOMContentLoaded` event handler. Example:

```js
document.addEventListener('DOMContentLoaded', () => {
  console.log(FetchIt);
});
```
