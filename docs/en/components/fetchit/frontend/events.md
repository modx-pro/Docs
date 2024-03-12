# Events

An instance of the class generates events that can be useful for developers. With their help you can implement different tasks and scenarios.

More examples can be found in the sections:

- [Form Layouts examples](/en/components/fetchit/examples/form/)
- [Notification examples](/en/components/fetchit/examples/notifications/)
- [Modal examples](/en/components/fetchit/examples/modals/)
- [Validation examples](/en/components/fetchit/examples/validation/)

## fetchit:before

- Arguments: `(form <HTMLFormElement>, formData <FormData>, fetchit <FetchIt>)`

The earliest event that is called before the form is submitted. Handy if you need to add a field and/or validate data on the client side. Can interrupt form submission if desired.

```js
document.addEventListener('fetchit:before', (e) => {
  const { form, formData } = e.detail;

  formData.set('newField', 'Value'); // Add a new field

  if (formData.get('name')?.length < 3) {
    e.preventDefault(); // Cancel form submission
  }
})
```

## fetchit:after

- Arguments: `(form <HTMLFormElement>, formData <FormData>, response <object>, fetchit <FetchIt>)`

The event is called after the form is submitted and the server responds. It is needed for exceptional cases when you need to implement functionality regardless of the response status.

```js
document.addEventListener('fetchit:after', (e) => {
  const { response } = e.detail;

  console.log(response.success); // true|false
  console.log(response.message); // Message from the server
  console.log(response.data); // Data from the server
})
```

## fetchit:success

- Arguments: `(form <HTMLFormElement>, formData <FormData>, response <object>, fetchit <FetchIt>)`

This event will be triggered if the `success` field in the server response is `true` and accordingly is required for code execution when the form is successfully submitted.

## fetchit:error

- Arguments: `(form <HTMLFormElement>, formData <FormData>, response <object>, fetchit <FetchIt>)`

This event will be triggered if the `success` field in the server response is `false` and is needed for error handling.

## fetchit:reset

- Arguments: `(form <HTMLFormElement>, fetchit <FetchIt>)`

This event will be triggered when the form is reset. Can be useful in cases when custom messages or errors need to be hidden.
