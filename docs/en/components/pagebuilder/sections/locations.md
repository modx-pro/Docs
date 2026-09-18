---
title: "Locations"
description: "Places with title, address, and link. Pro layer."
---

# Locations

Section `locations` lists places from a repeater. Chunk: `pagebuilderpro_locations`. Requires PageBuilder Pro. This section does not embed a map.

## Where it fits

- Offices and stores as a list
- Pickup points without a map iframe
- Branch contacts

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | text | no | Section title |
| `items` | repeater | yes | Places |
| `items.title` | text | yes | Name |
| `items.address` | textarea | no | Address |
| `items.url` | url | no | Link |

## Render

The list is `ul.pb-locations__list`. The address prints when set. The link target is `url`, and the link text is `url` too. There is no separate label. An empty repeater leaves an empty list. This is not a map.

## Section data {#output-in-section-data}

```json
{
  "title": "Offices",
  "items": [
    {
      "title": "Center",
      "address": "1 Example Street",
      "url": "https://example.com/map"
    }
  ]
}
```

## Similar sections

- [Map](map) for one point with an iframe
- [Contact with map](contact_map) for phone, text, and map in one block

## Related pages

- [Section catalog](index)
