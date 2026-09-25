---
title: Notifications
description: The built-in FetchIt notifications and wiring third-party libraries through FetchIt.Message
---

# Notifications

The answers of the server can be shown as notifications in the corner of the page: the built-in ones, or your own through [`FetchIt.Message`](/en/components/fetchit/frontend/class#fetchitmessage).

The `[data-success]` and `[data-validation-error]` blocks in the form work apart from the notifications ([selectors](/en/components/fetchit/selectors)).

## Built-in notifications

The [`fetchit.frontend.default.notifier`](/en/components/fetchit/settings#fetchitfrontenddefaultnotifier) setting turns them on. They need no third-party library: everything is in the script of the component.

The text is output as text: tags are stripped from it, HTML entities such as `&amp;` are left as they are.

- Screen readers read the notifications from two hidden live regions that are on the page beforehand: an error at once (`role="alert"`), a success in its turn (`role="status"`).
- A notification is closed with its button, or by itself after 6 seconds. While the pointer or the focus is on it the countdown stops, and afterwards it starts again. Closing a notification from the keyboard moves the focus to a neighbouring one, or back where it came from.
- No more than three are visible at once. A notification that holds the focus does not count as one too many.

### Colours

The styles are loaded first in `<head>`, with selectors of a single class. They are stronger than the general element rules of the site (`button { … }`) and lose to any rule of the site with a class. Rules inside an `@layer` (in Tailwind 4, for example) lose to them — for those it is easier to change the variables.

By default these are the pastel colours of Tailwind CSS 4, as in its alerts: the background from shade 100, the border from 200, the text from 800. Where the browser understands `oklch()` they are set exactly, elsewhere in hex:

```css
.fetchit-toasts {
  --fetchit-toast-success-bg: oklch(96.2% 0.044 156.743);     /* green-100, #dcfce7 */
  --fetchit-toast-success-border: oklch(92.5% 0.084 155.995); /* green-200, #b9f8cf */
  --fetchit-toast-success-text: oklch(44.8% 0.119 151.328);   /* green-800, #016630 */
  --fetchit-toast-error-bg: oklch(93.6% 0.032 17.717);        /* red-100, #ffe2e2 */
  --fetchit-toast-error-border: oklch(88.5% 0.062 18.334);    /* red-200, #ffc9c9 */
  --fetchit-toast-error-text: oklch(44.4% 0.177 26.899);      /* red-800, #9f0712 */
}
```

On a site with Tailwind 4 you can take its variables, for example `--fetchit-toast-success-bg: var(--color-emerald-100)`.

::: warning
If a Content-Security-Policy forbids inline styles (`style-src` without `'unsafe-inline'`), give the FetchIt script a `nonce` — the styles get the same one. Otherwise FetchIt warns in the console and the notifications have to be styled by hand.
:::

### Your own options

A `FetchIt.Message` of your own takes precedence over the setting. When it has neither `success` nor `error` — only a spinner in `before` and `after`, say — the built-in notifications add theirs, as long as `FetchIt.Message` is set before `DOMContentLoaded`: right in a deferred script loaded after `fetchit.js`.

They can also be turned on from your own script, with another button label or another duration (`0` means until closed):

```js
FetchIt.Message = FetchIt.createNotifier({ closeLabel: 'Close', duration: 4000 })
```

::: warning
Before FetchIt 4 the setting loaded the Notyf library. It is no longer in the package: styles for `.notyf__toast` and scripts that call `new Notyf()` need to change, or load Notyf yourself like any other library below.
:::

## Third-party libraries

- [Notyf](/en/components/fetchit/examples/notifications/notyf)
- [SweetAlert2](/en/components/fetchit/examples/notifications/sweetalert2)
- [iziToast](/en/components/fetchit/examples/notifications/izitoast)
- [Notiflix.Notify](/en/components/fetchit/examples/notifications/notiflix-notify)
- [Notie](/en/components/fetchit/examples/notifications/notie)
- [Awesome Notifications](/en/components/fetchit/examples/notifications/awesome-notifications)
- [Toastify JS](/en/components/fetchit/examples/notifications/toastifyjs)
- [AlertifyJS](/en/components/fetchit/examples/notifications/alertifyjs)
- [PNotify](/en/components/fetchit/examples/notifications/pnotify)
- [toastr](/en/components/fetchit/examples/notifications/toastr)
- [jGrowl](/en/components/fetchit/examples/notifications/jgrowl)
- [NOTY](/en/components/fetchit/examples/notifications/noty)
