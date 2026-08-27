---
title: Snippets
description: GeoLocation2 snippets overview
---

# GeoLocation2 snippets

| Snippet | Purpose |
|---------|---------|
| [GeoLocation2Initialize](GeoLocation2Initialize) | Modal CSS/JS and `window.GeoLocation2Web` |
| [GeoLocation2Current](GeoLocation2Current) | Current city in header or JSON state |
| [GeoLocation2Modal](GeoLocation2Modal) | City confirm/change modal |
| [GeoLocation2](GeoLocation2) | City list from `gl_cities` |
| [GeoLocation2Location](GeoLocation2Location) | City/region/country by IP via SxGeo |
| [GeoLocation2Data](GeoLocation2Data) | Contacts and address from `gl_data` |

## Page order

1. [GeoLocation2Initialize](GeoLocation2Initialize) — once in template.
2. [GeoLocation2Current](GeoLocation2Current) — “Your city” widget.
3. [GeoLocation2Modal](GeoLocation2Modal) — modal markup (often in footer).
4. [GeoLocation2Data](GeoLocation2Data) with `forCurrent=1` for selected city contacts.

[GeoLocation2](GeoLocation2) and [GeoLocation2Location](GeoLocation2Location) are independent of the modal: static list vs raw SxGeo output.

Front-end calls must be **uncached** (`[[!...]]`, `{'!...' | snippet}`), otherwise CSRF and session city go stale.

## MODX / Fenom

| Task | MODX | Fenom |
|------|------|-------|
| Initialize | `[[!GeoLocation2Initialize]]` | `{'!GeoLocation2Initialize' \| snippet}` |
| Current city | `[[!GeoLocation2Current]]` | `{'!GeoLocation2Current' \| snippet}` |
| Modal | `[[!GeoLocation2Modal]]` | `{'!GeoLocation2Modal' \| snippet}` |
| City list | `[[!GeoLocation2? &limit=`0`]]` | `{'!GeoLocation2' \| snippet : ['limit' => 0]}` |
| SxGeo | `[[!GeoLocation2Location]]` | `{'!GeoLocation2Location' \| snippet}` |
| City data | `[[!GeoLocation2Data? &forCurrent=`1`]]` | `{'!GeoLocation2Data' \| snippet : ['forCurrent' => 1]}` |

## See also

- [Web API](../api-action)
- [Quick start](../quick-start)
- [Integration](../integration)
