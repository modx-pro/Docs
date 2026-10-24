---
title: Events
description: "fetchit:before, after, success, error, reset: detail, cancelling and order"
---

# Events

The events are dispatched on `document` and do not bubble: listen on `document`, not on the form or `window`.

`event.detail` holds the form (`form`), its data (`formData`) and the FetchIt instance (`fetchit`), and from `fetchit:after` on also the answer of the server (`response`). `fetchit:reset` has only `form` and `fetchit`.

Types of `detail` for TypeScript: [`fetchit.d.ts`](/en/components/fetchit/frontend/typescript). Examples in the [form](/en/components/fetchit/examples/form/), [notification](/en/components/fetchit/examples/notifications/), [modal](/en/components/fetchit/examples/modals/) and [validation](/en/components/fetchit/examples/validation/) sections.

| Event | When | Cancelling (`event.preventDefault()`) |
| --- | --- | --- |
| `fetchit:before` | before the submission; fields can be added to `formData` | the form is not sent |
| `fetchit:after` | a FetchIt answer came | the answer is not processed: no field errors, no message, no `fetchit:success` or `fetchit:error`, no clearing |
| `fetchit:success` | the form was accepted; the form message and the notification are already shown | the fields are not cleared |
| `fetchit:error` | the form was refused or could not be sent | the field errors and the form message are not shown |
| `fetchit:reset` | the form is being reset: its button, `form.reset()` or after a success; the fields still hold their values | not possible |

The order on submit: `Message.before` → `fetchit:before` → request → `Message.after` → `fetchit:after` → on an error `Message.error` + `fetchit:error` + `setError` / `setFormMessage('validation')` → on a success `setFormMessage('success')` + `Message.success` + `fetchit:success` → `grecaptcha.reset()` when a widget is on the page → with `clearFieldsOnSuccess`, the reset of the form.

The `FetchIt.Message` hooks run before the event of the same moment, so cancelling the event does not undo them.

## fetchit:before

Add fields or stop the submission:

```js
document.addEventListener('fetchit:before', (e) => {
  const { formData, fetchit } = e.detail

  formData.set('utm_source', 'landing')

  if ((formData.get('name') || '').length < 3) {
    fetchit.setError('name', 'The name is too short')
    e.preventDefault()
  }
})
```

## fetchit:after

Any FetchIt answer:

```js
document.addEventListener('fetchit:after', (e) => {
  const { response } = e.detail
  console.log(response.success, response.message, response.data)
})
```

`message` and `data` are always there, even when the processing snippet left them out: an empty string and an empty object.

## fetchit:success

A successful submission. Handy to close a modal or send an analytics goal:

```js
document.addEventListener('fetchit:success', (e) => {
  const { form, response } = e.detail
  if (form.id === 'callback') {
    ym(12345678, 'reachGoal', 'form_' + form.id)
  }
})
```

Cancelling the event keeps the fields filled.

## fetchit:error

A validation error, a refusal of the [protection](/en/components/fetchit/protection), an error in the logic of the snippet — or a request that never arrived. `response.data` holds the map of field to message.

```js
document.addEventListener('fetchit:error', (e) => {
  const { response, error } = e.detail

  if (response === null) {
    // No FetchIt answer: network, someone else's answer, a captcha with no answer
    console.error(error)
    return
  }

  console.warn(response.data)
})
```

## fetchit:reset

A reset of the form: its reset button, `form.reset()` or the clearing after a success. The fields still hold their values at that moment, so they can be read. Hiding your own UI over the standard clearing belongs here too.
