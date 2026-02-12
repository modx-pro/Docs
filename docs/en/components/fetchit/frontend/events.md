# Events

The instance emits events that you can use to implement custom behavior.

More examples:

- [Form examples](/en/components/fetchit/examples/form/)
- [Notification examples](/en/components/fetchit/examples/notifications/)
- [Modal examples](/en/components/fetchit/examples/modals/)
- [Validation examples](/en/components/fetchit/examples/validation/)

## fetchit:before

- Arguments: `(form <HTMLFormElement>, formData <FormData>, fetchit <FetchIt>)`

Fired before the form is submitted. Use it to add fields and/or run client-side validation. You can call `preventDefault()` to cancel submission.

```js
document.addEventListener('fetchit:before', (e) => {
  const { form, formData } = e.detail;

  formData.set('newField', 'New field value'); // Add a field

  if (formData.get('name')?.length < 3) {
    e.preventDefault(); // Cancel form submission
  }
})
```

## fetchit:after

- Arguments: `(form <HTMLFormElement>, formData <FormData>, response <object>, fetchit <FetchIt>)`

Fired after the form is submitted and the server response is received. Use it when you need to run code regardless of response status.

```js
document.addEventListener('fetchit:after', (e) => {
  const { response } = e.detail;

  console.log(response.success); // true|false
  console.log(response.message); // Server message
  console.log(response.data); // Server data
})
```

## fetchit:success

- Arguments: `(form <HTMLFormElement>, formData <FormData>, response <object>, fetchit <FetchIt>)`

Fired when the server response has `success: true`. Use it for code that runs only on successful submission.

## fetchit:error

- Arguments: `(form <HTMLFormElement>, formData <FormData>, response <object>, fetchit <FetchIt>)`

Fired when the server response has `success: false`. Use it to handle errors.

## fetchit:reset

- Arguments: `(form <HTMLFormElement>, fetchit <FetchIt>)`

Fired when the form is reset. Useful to hide custom messages or error state.
