# Events

Events are attached to `document`. `detail` almost always has `form` and `fetchit`. After a server response it also has `response` and `formData`.

Examples in [forms](/en/components/fetchit/examples/form/), [notifications](/en/components/fetchit/examples/notifications/), [modals](/en/components/fetchit/examples/modals/), [validation](/en/components/fetchit/examples/validation/).

| Event | Cancelable | When |
| --- | --- | --- |
| `fetchit:before` | yes | before `fetch`, after FormData is built |
| `fetchit:after` | yes | right after the JSON response, before success/error handling |
| `fetchit:success` | no | `response.success === true` |
| `fetchit:error` | yes | `response.success === false`, before/during field error display |
| `fetchit:reset` | no | native form `reset` |

Order on submit: `Message.before` → `fetchit:before` → request → `Message.after` → `fetchit:after` → on error `Message.error` + `fetchit:error` + `setError` / `setFormMessage('validation')` → on success `setFormMessage('success')` + `Message.success` + `fetchit:success` → `grecaptcha.reset()` if present → optionally `form.reset()`.

`preventDefault` on `fetchit:after` stops success/error handling and field messages. `fetchit:success` is not cancelable: `preventDefault` has no effect on it.

## fetchit:before

Add fields or stop submission:

```js
document.addEventListener('fetchit:before', (e) => {
  const { formData, fetchit } = e.detail

  formData.set('utm_source', 'landing')

  if ((formData.get('name') || '').length < 3) {
    fetchit.setError('name', 'Name is too short')
    e.preventDefault()
  }
})
```

## fetchit:after

Any server response:

```js
document.addEventListener('fetchit:after', (e) => {
  const { response } = e.detail
  console.log(response.success, response.message, response.data)
})
```

## fetchit:success

Successful submit. Handy to close a modal or send a metric:

```js
document.addEventListener('fetchit:success', (e) => {
  const { form, response } = e.detail
  if (form.id === 'callback') {
    console.log(response.message)
  }
})
```

## fetchit:error

Validation or snippet logic error. `response.data` is a field → message map.

```js
document.addEventListener('fetchit:error', (e) => {
  const { response } = e.detail
  console.warn(response.data)
})
```

## fetchit:reset

Form reset (reset button or `clearFieldsOnSuccess`). Hide custom UI on top of the standard clear.
