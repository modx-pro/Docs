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
  - text: Component settings
    link: settings
  - text: Selectors
    link: selectors
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
      - text: turretcss form
        link: examples/form/turretcss
      - text: Vanilla form
        link: examples/form/vanilla
  - text: Popup notifications
    link: examples/notifications/
    items:
      - text: Notyf
        link: examples/notifications/notyf
      - text: SweetAlert2
        link: examples/notifications/sweetalert2
      - text: iziToast
        link: examples/notifications/izitoast
      - text: Notiflix.Notify
        link: examples/notifications/notiflix-notify
      - text: Notie
        link: examples/notifications/notie
      - text: Awesome Notifications
        link: examples/notifications/awesome-notifications
      - text: Toastify JS
        link: examples/notifications/toastifyjs
      - text: AlertifyJS
        link: examples/notifications/alertifyjs
      - text: PNotify
        link: examples/notifications/pnotify
      - text: toastr
        link: examples/notifications/toastr
      - text: jGrowl
        link: examples/notifications/jgrowl
      - text: NOTY
        link: examples/notifications/noty
  - text: Modals
    link: examples/modals/
    items:
      - text: Bootstrap modals
        link: examples/modals/bootstrap
      - text: tingle.js modals
        link: examples/modals/tinglejs
      - text: Micromodal.js modals
        link: examples/modals/micromodaljs
  - text: Validation
    link: examples/validation/
    items:
      - text: Validation with Iodine
        link: examples/validation/iodine
      - text: Validation with yup
        link: examples/validation/yup
---

# FetchIt

MODX Revolution component: submit HTML forms through the Fetch API without a page reload. By default it drives [FormIt](https://github.com/Sterc/FormIt). You can plug in your own snippet instead.

## Why

FormIt alone answers with a normal POST and a full reload. FetchIt keeps FormIt (or your code) on the server and adds a client layer: FormData, a JSON response, field errors, optional toasts, and events.

[AjaxForm](https://github.com/modx-pro/AjaxForm) covers a similar job. The server side is close. On the front end FetchIt differs:

- no required jQuery or jquery-form;
- minified script about 5 KB, loaded with `defer`;
- you wire notifications yourself or turn on built-in Notyf (`fetchit.frontend.default.notifier`).

## Installation

Via Package Manager:

- [modstore.pro](https://modstore.pro/packages/utilities/fetchit) ([how to connect the repository](https://modstore.pro/faq))
- [extras.modx.com](https://extras.modx.com/package/fetchit)

Or build a transport package from [GitHub](https://github.com/GulomovCreative/FetchIt).

Next: [Quick start](/en/components/fetchit/quick-start).
