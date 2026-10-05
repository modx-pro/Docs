---
title: "form"
description: "Schema key from CMP Forms. Capability forms. Pro layer."
---

# Field form

Version: **Pro**, capability `forms`.

A string: the schema key from the CMP **Forms** tab. The list comes from `mgr/form/list`. The site form is built by the [form builder](../sections/form_builder) section through FetchIt.

## Schema

```json
{
  "name": "form",
  "type": "form",
  "label": "Form"
}
```

## Section data {#output-in-section-data}

```json
{
  "form": "contact"
}
```

## Similar types

- The [Contact form](../sections/contact_form) section, where fields are set in the inspector, not in the CMP
