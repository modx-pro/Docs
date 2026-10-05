---
title: "schedule"
description: "Opening hours as a JSON string by weekday. Pro layer."
---

# Field schedule

Version: **Pro** (`advanced-fields`).

A textarea. The inspector placeholder is `{"mon":["09:00-18:00"],"tue":["09:00-18:00"]}`. The editor does not validate the schema. The saved value is a string: that JSON or plain text such as `Daily 10:00-20:30`. Parse JSON in the chunk or in your own code.

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
