---
title: Modals
description: "A FetchIt form in a modal and a modal with the answer: dialog, popover, a11y-dialog, Bootstrap, UIkit, Fancybox, Micromodal.js"
---

# Modals

Two common cases: the form lives in a modal and closes it after a success, or the form is on the page and a modal with the answer opens after it is sent. Both need the [`fetchit:success`](/en/components/fetchit/frontend/events#fetchitsuccess) event.

## No libraries

- [`<dialog>`](/en/components/fetchit/examples/modals/dialog) — the modal built into the browser
- [popover](/en/components/fetchit/examples/modals/popover) — a pop-up block for small forms, opens without JavaScript

## Libraries

- [a11y-dialog](/en/components/fetchit/examples/modals/a11y-dialog) — 2 KB, accessibility following the WAI-ARIA guidelines, no styles of its own
- [Micromodal.js](/en/components/fetchit/examples/modals/micromodaljs) — a small library with accessible modals
- [Bootstrap](/en/components/fetchit/examples/modals/bootstrap) — if the site is built on Bootstrap
- [UIkit](/en/components/fetchit/examples/modals/uikit) — if the site is built on UIkit
- [Fancybox](/en/components/fetchit/examples/modals/fancybox) — if the site already has Fancybox; a paid licence is required

A modal with a form needs one more rule: call `form.reset()` when the modal closes. FetchIt removes the errors and messages, and the next time the visitor sees a clean form.
