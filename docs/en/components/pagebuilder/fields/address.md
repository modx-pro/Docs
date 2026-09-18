---
title: "address"
description: "Address text plus lat and lng. Pro layer."
---

# Field address

Version: **Pro** (`advanced-fields`).

Object `text`, `lat`, `lng`. This is not a map iframe. Coordinates are strings. A map is built by the [map](../sections/map) section or your chunk.

## Schema

```json
{
  "name": "office",
  "type": "address",
  "label": "Address"
}
```

## Section data {#output-in-section-data}

```json
{
  "office": {
    "text": "1 Example Street",
    "lat": "55.75",
    "lng": "37.62"
  }
}
```

## Chunk example

```html
<address>{$office.text|escape}</address>
```

## Similar types

- [map](map) to embed a map
- The [Locations](../sections/locations) section for a list of places
