---
title: FetchIt class
description: "Static properties and methods of FetchIt: forms, instances, Message, create, createNotifier, sanitizeHTML"
---

# FetchIt class

The global class is declared in the script of the component. The plugin loads the file in `<head>` with `defer`, so it does not block parsing. The name of the class comes from the `fetchit.frontend.js.classname` setting.

Types for TypeScript: [`fetchit.d.ts`](/en/components/fetchit/frontend/typescript).

## FetchIt.forms

- Type: `HTMLFormElement[]`

Every form an instance was created for.

## FetchIt.instances

- Type: `Map`

Key: the form element, value: the instance.

```js
const form = document.querySelector('#form')
const fetchit = FetchIt.instances.get(form)
```

## FetchIt.Message

- Type: `object` (not declared by default)

Instances call the methods that are there: `before`, `after`, `success`, `error`, `reset`. This is how notifications are added without touching the core.

```js
FetchIt.Message = {
  before() {
    // Before the form is sent
  },
  after(message) {
    // A FetchIt answer came
  },
  success(message) {
    // The form was accepted
  },
  error(message) {
    // The form was refused or could not be sent
  },
  reset() {
    // The form was reset
  },
}
```

`after`, `success` and `error` get the `message` string from the answer of the server — empty when the processing snippet sent none. The hooks run before the event of the same moment (except `reset`: it runs after `fetchit:reset`), so cancelling the event does not undo them. An exception in a hook is logged with its name and does not keep the answer from the form.

::: warning
`before` is called before `fetchit:before`, that is, before client-side validation. If validation cancels the submission, `after` does not come — so do not turn on a spinner or disable the button in `before`. How to build a submit indicator: [example](/en/components/fetchit/examples/scenarios/loading).
:::

`FetchIt` appears once the deferred `fetchit.js` has run, so set `FetchIt.Message` from a deferred script loaded after it, or on `DOMContentLoaded`.

With the `fetchit.frontend.default.notifier` setting on and no `Message` set, the first `create()` puts the [built-in notifications](/en/components/fetchit/examples/notifications/#built-in-notifications) there. When your `Message` has neither `success` nor `error`, they are added to it — provided `Message` is set before the first `create()`, that is before `DOMContentLoaded`: in a deferred script, not in a `DOMContentLoaded` handler of your own.

Ready examples: [notifications](/en/components/fetchit/examples/notifications/).

## FetchIt.createNotifier(options)

The built-in notifications as an object for `FetchIt.Message` — to turn them on without the system setting, or with other options:

```js
FetchIt.Message = FetchIt.createNotifier({ closeLabel: 'Close', duration: 4000 })
```

| Option | Default | Description |
| --- | --- | --- |
| `closeLabel` | `Close` | The label of the close button |
| `duration` | `6000` | How long a message stays, in milliseconds; `0` means until it is closed |

## FetchIt.create(config)

The factory of instances. The inline script of the snippet calls it for each set of forms on the page. You rarely need it by hand.

When no form matches the config, the console gets a warning.

## FetchIt.events

The names of the events (`before`, `success`, …). Handy when extending the class.

## FetchIt.notify(hook, message)

Calls a `FetchIt.Message` hook when it is there. An exception in the hook is logged.

## FetchIt.isResponse(value)

`true` when the value looks like a FetchIt answer: an object with a boolean `success`. This is how the script tells the answer of the component from a PHP error page or an answer of a firewall.

## FetchIt.sanitizeHTML(str)

Strips HTML tags from a string. `setError` and `setFormMessage` use it.

## FetchIt.hasErrorMessage(message)

`true` when the message is not empty after stripping and trimming. Empty and whitespace errors from the server are not drawn on the fields.

## FetchIt.tokenField / FetchIt.powField

The names of the service fields of the [spam protection](/en/components/fetchit/protection): `fetchit_token` and `fetchit_pow`.

## FetchIt.defaultRequestErrorMessage

A fallback text for when the form could not be sent (a network error, an answer that is not FetchIt's) and the config of the form carries no message — for example, a page cached before the component was upgraded. Normally the visitor sees `fetchit_err_request` from the lexicon.

## When the class is already there

A file script with `defer` runs after the document is parsed. By the time your `defer` file runs, `FetchIt` is available if its tag comes after the script of the component.

Inline without `defer`:

```js
document.addEventListener('DOMContentLoaded', () => {
  console.log(typeof FetchIt)
})
```
