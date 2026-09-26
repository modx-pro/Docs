---
title: FetchIt
description: Lightweight AJAX form submission in MODX via the Fetch API on top of FormIt or a custom snippet
logo: https://modstore.pro/assets/extras/fetchit/logo.png
author: GulomovCreative
modstore: https://modstore.pro/packages/utilities/fetchit
modx: https://extras.modx.com/package/fetchit
repository: https://github.com/GulomovCreative/FetchIt

items:
  - text: Quick start
    link: quick-start
  - text: FetchIt snippet
    link: snippets/fetchit
  - text: Spam protection
    link: protection
  - text: Component settings
    link: settings
  - text: Selectors
    link: selectors
  - text: Upgrading to FetchIt 4
    link: upgrade
  - text: Migration from AjaxForm
    link: migration-from-ajaxform
  - text: Custom snippet handling
    link: snippets/custom
  - text: JS API
    items:
      - text: FetchIt class
        link: frontend/class
      - text: FetchIt instance
        link: frontend/instance
      - text: Events
        link: frontend/events
      - text: TypeScript
        link: frontend/typescript
  - text: Form markup
    link: examples/form/
    items:
      - text: Bootstrap form
        link: examples/form/bootstrap
      - text: Bulma form
        link: examples/form/bulma
      - text: UIkit form
        link: examples/form/uikit
      - text: Fomantic-UI form
        link: examples/form/fomantic
      - text: Pico.css form
        link: examples/form/pico
      - text: Cirrus CSS form
        link: examples/form/cirrus
      - text: Vanilla form
        link: examples/form/vanilla
  - text: Ready-made scenarios
    link: examples/scenarios/
    items:
      - text: Submit indicator
        link: examples/scenarios/loading
      - text: Thank-you instead of the form
        link: examples/scenarios/thank-you
      - text: Redirect to another page
        link: examples/scenarios/redirect
      - text: Phone mask
        link: examples/scenarios/phone-mask
      - text: File uploads
        link: examples/scenarios/files
      - text: Several forms on a page
        link: examples/scenarios/multiple-forms
      - text: Goals in Yandex Metrika and Google Analytics
        link: examples/scenarios/analytics
      - text: Requests to Telegram
        link: examples/scenarios/telegram
  - text: Popup notifications
    link: examples/notifications/
    items:
      - text: Notyf
        link: examples/notifications/notyf
      - text: SweetAlert2
        link: examples/notifications/sweetalert2
      - text: Notiflix.Notify
        link: examples/notifications/notiflix-notify
      - text: Toastify JS
        link: examples/notifications/toastifyjs
      - text: Awesome Notifications
        link: examples/notifications/awesome-notifications
      - text: AlertifyJS
        link: examples/notifications/alertifyjs
      - text: jGrowl
        link: examples/notifications/jgrowl
  - text: Modals
    link: examples/modals/
    items:
      - text: Modals with dialog
        link: examples/modals/dialog
      - text: Popover form
        link: examples/modals/popover
      - text: a11y-dialog modals
        link: examples/modals/a11y-dialog
      - text: Micromodal.js modals
        link: examples/modals/micromodaljs
      - text: Bootstrap modals
        link: examples/modals/bootstrap
      - text: UIkit modals
        link: examples/modals/uikit
      - text: Fancybox modals
        link: examples/modals/fancybox
  - text: Validation
    link: examples/validation/
    items:
      - text: Browser validation
        link: examples/validation/native
      - text: Validation with Zod
        link: examples/validation/zod
      - text: Validation with Valibot
        link: examples/validation/valibot
      - text: Validation with yup
        link: examples/validation/yup
      - text: Phone and e-mail with validator.js
        link: examples/validation/validator
---

# FetchIt

A component for MODX Revolution 2 and 3: submit HTML forms through the Fetch API without a page reload, with spam protection out of the box. By default the forms are processed by [FormIt](https://github.com/Sterc/FormIt), but you can plug in your own snippet instead.

## Why

FormIt alone answers with a normal POST and a full reload. FetchIt keeps FormIt (or your code) on the server and adds a client layer: FormData, a JSON response, field errors, notifications and events. And it closes the forms to bots, which usually takes a component of its own.

[AjaxForm](https://github.com/modx-pro/AjaxForm) covers a similar job. The server side is close. FetchIt differs:

- no required jQuery or jquery-form: the native Fetch API and `FormData` only, and the script is loaded with `defer`;
- [spam protection](/en/components/fetchit/protection) works right after the install, with nothing to configure;
- notifications are built in, or your own through `FetchIt.Message`.

## Features

- **FormIt out of the box.** Properties such as `&hooks`, `&validate` and `&emailTo` are passed to FormIt as they are. Instead of FormIt you can name [your own snippet](/en/components/fetchit/snippets/custom).
- **Your own markup.** All it takes is a form chunk and the [attributes](/en/components/fetchit/selectors): `data-error` on field errors, `data-success` and `data-validation-error` on form messages.
- **Works without JavaScript too.** With FormIt the form is submitted the normal way, and the messages and entered values are output by its placeholders. Except with proof of work and a captcha: they need JavaScript.
- **[Spam protection](/en/components/fetchit/protection) by default:** a signed single-use token, a minimum fill time, a hidden trap field and a rate limit. Optionally a proof of work and a captcha — Cloudflare Turnstile, Google reCAPTCHA v3 or Yandex SmartCaptcha. Rules of your own are added with a plugin.
- **No dependencies.** Apart from the script of the captcha service, when one is on, the script loads no other files.
- **[Built-in notifications](/en/components/fetchit/examples/notifications/#built-in-notifications)** or your own through `FetchIt.Message`: Bootstrap, SweetAlert2, anything.
- **[Events](/en/components/fetchit/frontend/events)** `fetchit:before`, `fetchit:after`, `fetchit:success`, `fetchit:error`, `fetchit:reset`: add data, cancel a submission, open a modal.
- **[TypeScript types](/en/components/fetchit/frontend/typescript)** sit next to the script.
- **Several forms on one page**, each with its own key and processing snippet, as long as the snippet calls differ in their properties.
- **Fenom and `@FILE` chunks** through pdoTools on MODX 2 and MODX 3.

## Installation

Via Package Manager:

- [modstore.pro](https://modstore.pro/packages/utilities/fetchit) ([how to connect the repository](https://modstore.pro/faq))
- [extras.modx.com](https://extras.modx.com/package/fetchit)

Or build a transport package from [GitHub](https://github.com/GulomovCreative/FetchIt).

FetchIt 4 is one package for MODX 2.8 and MODX 3 instead of the 1.x and 3.x lines. It installs over the version already there: system settings and chunks are kept. What may affect your code: [Upgrading to FetchIt 4](/en/components/fetchit/upgrade).

FormIt is installed together with FetchIt when the site does not have it yet.

Next: [Quick start](/en/components/fetchit/quick-start).

## Requirements

- MODX Revolution 2.8+ or 3.x.
- PHP 7.4 or later.
- FormIt, if it is what processes the forms.
- pdoTools, if the form chunks use Fenom or live in files.
