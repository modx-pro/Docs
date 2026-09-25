---
title: TypeScript
description: "FetchIt types for sites written in TypeScript: fetchit.d.ts, event details and form instances"
---

# TypeScript

The types live in `assets/components/fetchit/js/fetchit.d.ts`. Copy the file into your project or reference it:

```ts
/// <reference path="../assets/components/fetchit/js/fetchit.d.ts" />

document.addEventListener('fetchit:error', event => {
  // response is null when no FetchIt answer came: network, someone else's answer, a captcha with no answer
  if (event.detail.response === null) {
    console.error(event.detail.error)
  }
})

const form = document.querySelector('form')
if (form) {
  FetchIt.instances.get(form)?.setError('email', 'Check the address')
}
```

The file describes `FetchIt` and its static members, the config of `FetchIt.create()`, a form instance with all its methods, `FetchIt.Message` and the `detail` of every event. The script of the component is type-checked against this same file, so the types and the code do not drift apart.

::: warning
Remove any FetchIt declaration of your own (`declare var FetchIt: any`): the two would clash.
:::

## What is described

| Type | What it is |
| --- | --- |
| `FetchItStatic` | the global `FetchIt`: `forms`, `instances`, `Message`, `events`, `create()`, `createNotifier()` and the rest |
| `FetchItConfig` | the config of a form, which the snippet passes to `FetchIt.create()` |
| `FetchItInstance` | a form instance: `setError()`, `clearErrors()`, `setFormMessage()`, `getFields()` and others |
| `FetchItResponse` | the answer of the server: `success`, `message`, `data` |
| `FetchItMessage` | the notification hooks `before`, `after`, `success`, `error`, `reset` |
| `FetchItNotifierOptions` | the options of `FetchIt.createNotifier()` |
| `FetchItBeforeDetail` and the other `*Detail` types | the `detail` of each event |

The event map is added to `DocumentEventMap`, so `document.addEventListener('fetchit:success', …)` knows the type of its `event.detail` without a cast.
