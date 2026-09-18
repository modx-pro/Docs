---
title: "schedule"
description: "Opening hours as a JSON string by weekday. Pro layer."
---

# Field schedule

Version: **Pro** (`advanced-fields`).

A textarea that stores JSON. The inspector placeholder is a weekday object, for example `mon` and `tue` with a list of `09:00-18:00` strings. The saved value is a string. Parse the JSON in the chunk or in your own code.

## Schema

```json
{
  "name": "hours",
  "type": "schedule",
  "label": "Hours"
}
```

## Section data {#output-in-section-data}

```json
{
  "hours": "{\"mon\":[\"09:00-18:00\"],\"tue\":[\"09:00-18:00\"]}"
}
```

## Similar types

- [textarea](textarea) when hours are plain text
- [keyvalue](keyvalue) for pairs without a JSON string
