---
title: FetchIt
description: An lightweight Extra for processing forms using the Fetch API
logo: https://modstore.pro/assets/extras/fetchit/logo-lg.png
author: GulomovCreative
modstore: https://en.modstore.pro/packages/utilities/fetchit
modx: https://extras.modx.com/package/fetchit
repository: https://github.com/GulomovCreative/FetchIt

items:
  - text: Quick start
    link: quick-start
  - text: FetchIt Snippet
    link: snippets/fetchit
  - text: Settings
    link: settings
  - text: Selectors
    link: selectors
  - text: Migration from AjaxForm
    link: migration-from-ajaxform
  - text: Custom snippet
    link: snippets/custom
  - text: JS API
    items:
      - text: FetchIt Class
        link: frontend/class
      - text: FetchIt Class Instance
        link: frontend/instance
      - text: Events
        link: frontend/events
  - text: Form examples
    link: examples/form/
    items:
      - text: Bootstrap
        link: examples/form/bootstrap
      - text: Bulma
        link: examples/form/bulma
      - text: UIkit
        link: examples/form/uikit
      - text: Fomantic-UI
        link: examples/form/fomantic
      - text: Pico.css
        link: examples/form/pico
      - text: Cirrus CSS
        link: examples/form/cirrus
      - text: turretcss
        link: examples/form/turretcss
      - text: Vanilla
        link: examples/form/vanilla
  - text: Notifications
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
      - text: Bootstrap
        link: examples/modals/bootstrap
      - text: tingle.js
        link: examples/modals/tinglejs
      - text: Micromodal.js
        link: examples/modals/micromodaljs
  - text: Validation
    link: examples/validation/
    items:
      - text: Iodine
        link: examples/validation/iodine
      - text: yup
        link: examples/validation/yup
---

# FetchIt

An lightweight Extra for processing forms using the Fetch API.

## Introduction

**CMS/CMF MODX Revolution** has [FormIt](https://github.com/Sterc/FormIt) extra, which implements sending and processing forms, but it works by standard browser method, i.e. with page reloading. But the modern web is demanding and the progressive step is to process them «on the fly». **FetchIt**, which uses **FormIt**, is exactly for these tasks, but you can also use your own snippet.

## Features

For such purposes there is [AjaxForm](https://github.com/modx-pro/AjaxForm) extra (although **FetchIt** is almost the same in its server part), but **FetchIt** has some advantages:

### Zero dependencies

**FetchIt** has no dependencies, while **AjaxForm** has three: Big [jquery](https://github.com/jquery/jquery) library and its [jquery-form](https://github.com/jquery-form/form/) and [jGrowl](https://github.com/stanlemon/jGrowl) plugins.

While there's no problem with the latter (you can override methods to show notifications), the first two are tricky.

### Modern code

Minified script weighs 5 kilobytes and snippet registers it with attribute `defer`, thereby not preventing the page load.

### Comfort

Incorporating your wraparound, adding popup messages and modal windows, these are tasks that you can solve very easily.

## Installation

The extra is available for installation via Package Manager from:

- [modstore.pro](https://en.modstore.pro/packages/utilities/fetchit)
  - [How to connect to the repository](https://en.modstore.pro/faq)
- Official repository [modx.com](https://modx.com/extras/package/fetchit)

Or you can build a package from the extra repository on [GitHub](https://github.com/GulomovCreative/FetchIt)
