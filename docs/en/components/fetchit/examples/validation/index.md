---
title: Validation
description: "FetchIt client-side field checks: browser validation, Zod, Valibot, yup and validator.js"
---

# Validation

Client-side checks catch mistakes before sending, so the visitor does not wait for the server to learn about a typo in the e-mail. All the examples follow one scheme: a [`fetchit:before`](/en/components/fetchit/frontend/events#fetchitbefore) handler checks the fields, shows the errors with [`setError`](/en/components/fetchit/frontend/instance#seterrorname-message) and cancels the submission with `preventDefault()`.

<!--@include: ../../parts/validation.warning.md-->

- [Browser validation](/en/components/fetchit/examples/validation/native) — the `required`, `type` and `pattern` attributes, no libraries
- [Zod](/en/components/fetchit/examples/validation/zod) — the most popular schema library, with the light `zod/mini` build for the browser
- [Valibot](/en/components/fetchit/examples/validation/valibot) — a schema built from small functions, 2–3 KB
- [yup](/en/components/fetchit/examples/validation/yup) — a schema, if the project already has yup
- [validator.js](/en/components/fetchit/examples/validation/validator) — ready-made checks for phone numbers, e-mails and other strings; complements any option above

FetchIt removes the errors by itself before each submission and from a field the visitor starts editing, so the handler does not need to clear them.
