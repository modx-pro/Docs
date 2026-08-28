---
title: Frontend
description: 'YandexMapsLocator UI: BEM, data-yml, map and list'
---

# Frontend

The Free frontend is built from Fenom chunks, `locator.css`, and ES modules. Appearance uses BEM. Behavior uses `data-yml-*` attributes.

## Mobile-first

On narrow screens: single column, "List" / "Map" tabs. From 769px width: two columns, tabs hidden.

Tabs sit at the layout level, not inside the list panel. The map stays in the DOM: in list mode the map panel gets `hidden`. Before opening a balloon, JS switches the view to "Map".

## BEM

| Block | Purpose |
|------|------------|
| `yml-locator` | Root, CSS variables |
| `yml-search` | Search form |
| `yml-store` | Location card |
| `yml-balloon` | HTML inside the balloon |

State uses data attributes, not CSS modifiers like `is-active`.

## data-yml-* (contract)

| Attribute | Where | Purpose |
|---------|-----|------------|
| `data-yml-root` | `.yml-locator` | Root, initialization |
| `data-yml-view="list\|map"` | root | Mobile view mode |
| `data-yml-empty` | root | Empty list |
| `data-yml-located` | root | Geo filter active after `locate()` |
| `data-yml-parents` | root | Parent IDs |
| `data-yml-search` | form | Search |
| `data-yml-locate` | button | "My location" / "All locations" |
| `data-yml-list` / `data-yml-map` | panels | List and map |
| `data-yml-store-id` | card | Location ID |
| `data-yml-lat`, `data-yml-lng` | card | Coordinates |

Pro adds `data-yml-open-now` and badges `.yml-store__status` ("Open" / "Closed").

## Free AJAX

Search from the form and geolocation go to:

```text
/assets/components/yandexmapslocator/search.php?parents=42&address=Omsk,%20Lenina%20st.,%2025&sortby=distance
```

Sample response:

```json
{
  "success": true,
  "data": [
    {
      "id": 15,
      "pagetitle": "Store on Lenina",
      "address": "Omsk, Lenina st., 25",
      "latitude": 54.9893,
      "longitude": 73.3682,
      "phone": "+7 3812 00-00-00",
      "distance": 0.4,
      "distance_formatted": "0.4 km",
      "context_key": "web"
    }
  ],
  "meta": { "total": 1 }
}
```

Same-origin, no CORS or Bearer. With Pro installed and REST enabled, the frontend may call `api.php`. When `api_enabled=No`, it falls back to `search.php`.

## JavaScript API

```javascript
const locator = new YandexMapsLocator('[data-yml-root]', { apiUrl, config, stores });

// Address search (form / custom UI)
locator.search({ address: 'Omsk, Lenina st., 25' });

// Browser geolocation → sort by distance
locator.locate();

// Clear geo filter ("All locations")
locator.resetLocate?.();

locator.on('store:click', ({ id }) => console.log('card', id));
locator.on('marker:click', ({ id }) => console.log('marker', id));
locator.on('balloon:build', (payload) => {
  // you can extend balloon HTML
});
```

JS events: `store:click`, `marker:click`, `balloon:build`, `marker:options`.

After `locate()` the button switches to "All locations" and clears the geo filter. On mobile, geolocation opens the "Map" tab.

### Open a location from your code

```javascript
const root = document.querySelector('[data-yml-root]');
const card = root.querySelector('[data-yml-store-id="15"]');
card?.querySelector('[data-yml-select]')?.click();
```

## Styling

Design tokens live on `.yml-locator` (CSS variables `--yml-*`). Override them in your site theme. Do not edit package files.

```css
.yml-locator {
  --yml-color-accent: #e11d48;
}
.yml-store[data-yml-active] {
  outline: 2px solid var(--yml-color-accent);
}
.yml-store__status.is-open {
  color: #15803d;
}
.yml-store__status.is-closed {
  color: #b91c1c;
}
```
