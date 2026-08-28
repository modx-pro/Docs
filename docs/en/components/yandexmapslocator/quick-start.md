---
title: Quick start
description: 'Installing YandexMapsLocator: Yandex Maps API key, locations, snippet'
---

# Quick start

## 1. Yandex Maps API key

Without a key, the map and server geocoder do not work. Use one key in `yandexmapslocator_api_key`:

| Where | Purpose |
|------|--------|
| Browser (`api-maps.yandex.ru/2.1`) | Map and markers |
| Server (`geocode-maps.yandex.ru`) | Address search, geolocation, mgr button, REST geocode (Pro) |

1. Sign in to the [Developer Dashboard](https://developer.tech.yandex.ru/) with Yandex ID.
2. Enable **JavaScript API and HTTP Geocoder**.
3. Copy the key (activation may take up to ~15 minutes).
4. **System → System Settings → yandexmapslocator** → `yandexmapslocator_api_key`.

In the dashboard, restrict the key by HTTP Referer (site domains) and by IP for server geocoding. Do not put the key in chunks or Git.

## 2. Container and locations

1. Create a container resource (for example, "Stores").
2. Add child **published** resources: each location = one resource.
3. Fill in TVs (category "YandexMapsLocator"): address, coordinates, phone, etc.
4. Or enter an address and click "Get coordinates" in the resource form (Free plugin).

TV names and renaming: [Locations and TVs](integration).

## 3. Snippet on the page

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 123,
    'radius' => 50,
    'sortby' => 'distance'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`123`
    &radius=`50`
    &sortby=`distance`
]]
```

:::

Requires [pdoTools](/components/pdotools/) (Fenom chunks). Call it **uncached**.

Default chunks: `yandexmapslocator.outer`, `.search`, `.store`, `.empty`, `.error`.

Parameters: [YandexMapsLocator](snippets/YandexMapsLocator).

Other common calls:

::: code-group

```fenom
{* Category *}
{'!YandexMapsLocator' | snippet : [
    'parents' => 123,
    'category' => 'pharmacy',
    'filters' => 'category'
]}

{* Open now — Pro required *}
{'!YandexMapsLocator' | snippet : [
    'parents' => 123,
    'filters' => 'working_now'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`123`
    &category=`pharmacy`
    &filters=`category`
]]

[[!YandexMapsLocator?
    &parents=`123`
    &filters=`working_now`
]]
```

:::

## 4. Verification

1. Open the page: you should see the search form, list, and map.
2. Enter an address → "Find".
3. "My location" → sort by distance. The button switches to "All locations".
4. On mobile: "List" / "Map" tabs.

## 5. Pro (optional)

After installing Pro:

1. Set `yandexmapslocator_timezone` (Omsk network: `Asia/Omsk`).
2. For REST: `yandexmapslocator_api_token` and `api_cors_origins` on production.
3. CSV: **Components → YandexMapsLocator Pro**.

See [Free and Pro](free-vs-pro), [What Pro adds](pro/).
