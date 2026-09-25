---
title: Several forms on a page
description: Different FetchIt forms on one page — their own handlers, goals and behaviour after sending
---

# Several forms on a page

A callback form in the header, a subscription in the footer, a request in a modal — one page often has several forms. FetchIt serves them independently, but the scripts share a few points worth keeping in mind.

## Snippet calls

Each form is a separate FetchIt call with its own chunk and its own FormIt properties:

::: code-group

```modx
[[!FetchIt?
  &form=`callback.tpl`
  &hooks=`email`
  &emailSubject=`Callback request`
  &validate=`phone:required`
]]

[[!FetchIt?
  &form=`subscribe.tpl`
  &hooks=`FormItSaveForm`
  &validate=`email:required:email`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'callback.tpl',
  'hooks' => 'email',
  'emailSubject' => 'Callback request',
  'validate' => 'phone:required',
]}

{'!FetchIt' | snippet : [
  'form' => 'subscribe.tpl',
  'hooks' => 'FormItSaveForm',
  'validate' => 'email:required:email',
]}
```

:::

The snippet keeps the properties of each call separately, so the callback e-mail is not sent on a subscription.

## Telling forms apart in scripts

FetchIt events come to `document` from all forms at once. Which form sent them is seen from `detail.form`. Give the forms an `id` or a data attribute:

```html
<form id="callback" action="…" method="post">…</form>
<form id="subscribe" action="…" method="post">…</form>
```

```js
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  switch (form.id) {
    case 'callback':
      form.closest('dialog')?.close()
      break

    case 'subscribe':
      form.querySelector('[type="submit"]').textContent = 'You are subscribed'
      break
  }
})
```

For behaviour shared by many forms, data attributes are handier, as in the examples with [analytics goals](/en/components/fetchit/examples/scenarios/analytics) and the [redirect to another page](/en/components/fetchit/examples/scenarios/redirect): one line in the markup instead of a new branch in `switch`.

## FetchIt.Message is one for all

[`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage) is global: its hooks are called for all forms and do not know which one was sent. A notification cannot be cancelled from an event either — the hooks run before the events.

If one form needs notifications and another does not — a subscription, say, is fine with the answer in `[data-success]` under the field — show the notifications from events, where the form is known. The built-in notifications can be created by hand for that:

```html
<form id="subscribe" action="…" method="post" data-notify="off">…</form>
```

```js
document.addEventListener('DOMContentLoaded', () => {
  const notifier = FetchIt.createNotifier({ closeLabel: 'Close' })
  const wants = (form) => form.dataset.notify !== 'off'

  document.addEventListener('fetchit:success', ({ detail: { form, response } }) => {
    if (wants(form)) {
      notifier.success(response.message)
    }
  })

  document.addEventListener('fetchit:error', ({ detail: { form, response } }) => {
    if (response && wants(form)) {
      notifier.error(response.message)
    }
  })
})
```

For this turn off the `fetchit.frontend.default.notifier` setting and do not set `FetchIt.Message`, otherwise the notifications are shown twice. When the request did not reach the server, `response` is `null`: FetchIt then shows the error text in the `[data-validation-error]` block of the form.

## Identical forms

If the same form is output on the page twice — a request at the top and at the bottom of a landing page, say — the `id` of the fields in the chunk repeat, and `<label for="…">` points to the first form. For such chunks wrap the fields in `<label>`, as in the examples of this documentation, and do not give them an `id`.
