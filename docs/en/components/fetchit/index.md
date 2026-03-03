---
title: FetchIt
description: Lightweight component for form handling and submission using Fetch API
logo: https://modstore.pro/assets/extras/fetchit/logo-lg.png
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

MODX Revolution component for form submission using the Fetch API.

## Introduction

**MODX Revolution** has [FormIt](https://github.com/Sterc/FormIt) for form submission and handling, but it uses the browser’s default method (page reload). Modern sites often need forms handled “on the fly”. **FetchIt** uses **FormIt** on the server but lets you use your own script as well.

## Advantages

[AjaxForm](https://github.com/modx-pro/AjaxForm) is similar (FetchIt’s server side is almost the same), but **FetchIt** has several advantages:

### No dependencies

**FetchIt** has no dependencies. **AjaxForm** has three: the large [jQuery](https://github.com/jquery/jquery) library and plugins [jquery-form](https://github.com/jquery-form/form/) and [jGrowl](https://github.com/stanlemon/jGrowl).

The last one is easy to override (notification methods), but the other two are harder to replace.

### Modern code

The minified script is about 5 KB and the snippet registers it with the `defer` attribute so it does not block page load.

### Ease of use

Integrating your markup, adding popup messages and modals is straightforward.

## Installation

The component is free and can be installed via the Package Manager from:

- [modstore.pro](https://modstore.pro/packages/utilities/fetchit)
  - [How to add this repository](https://modstore.pro/faq)
- Official [modx.com](https://modx.com/extras/package/fetchit) repository

Or build the package from the component repo on [GitHub](https://github.com/GulomovCreative/FetchIt)
