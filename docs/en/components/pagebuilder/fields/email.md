---
title: "email"
description: "Email string in the inspector. Free layer."
---

# Field email

Version: **Free**.

## Why this type

A field for an email address, not a generic [text](text). The saved value is a string.

## When to use

- Email on a contact card
- A recipient that is not a FetchIt form field
- Showing an email inside a section

## Schema

```json
{
  "name": "email",
  "type": "email",
  "label": "Email"
}
```

## Section data {#output-in-section-data}

```json
{
  "email": "editor@example.com"
}
```

## Chunk example

::: code-group

```modx
<a href="mailto:[[+email]]">[[+email]]</a>
```

```fenom
<a href="mailto:{$email|escape:'url'}">{$email|escape}</a>
```

:::

## Similar types

- [text](text) for a free string
- [url](url) for a link
