---
title: Open now
description: working_now filter and badges in YandexMapsLocator Pro
---

# Open now

**Pro.** On the site you get "Open" / "Closed" badges, an "Open only" button, and field `is_open_now`. In the snippet and REST the same behavior uses filter `working_now`.

## Timezone

Store **local network time** in TV `yandexmaps_working_hours`, not server UTC.

Free setting: `yandexmapslocator_timezone` (IANA). Default `Europe/Moscow`. Omsk network: `Asia/Omsk`.

The filter, badges, and `is_open_now` depend on it.

## TV format

For `working_now` / `is_open_now` you need a **JSON schedule** in TV `yandexmaps_working_hours`.

Day keys: `mon` … `sun`. Value: array of `"HH:MM-HH:MM"` intervals. Empty array: closed. Overnight intervals (`22:00-06:00`) are supported.

Example (Mon-Thu 09-21, Fri 09-22, Sat 10-22, Sun 10-20):

```json
{
  "mon": ["09:00-21:00"],
  "tue": ["09:00-21:00"],
  "wed": ["09:00-21:00"],
  "thu": ["09:00-21:00"],
  "fri": ["09:00-22:00"],
  "sat": ["10:00-22:00"],
  "sun": ["10:00-20:00"]
}
```

24/7:

```json
{
  "mon": ["00:00-23:59"],
  "tue": ["00:00-23:59"],
  "wed": ["00:00-23:59"],
  "thu": ["00:00-23:59"],
  "fri": ["00:00-23:59"],
  "sat": ["00:00-23:59"],
  "sun": ["00:00-23:59"]
}
```

Two intervals per day:

```json
{
  "mon": ["09:00-14:00", "16:00-20:00"],
  "tue": ["09:00-14:00", "16:00-20:00"],
  "wed": ["09:00-14:00", "16:00-20:00"],
  "thu": ["09:00-14:00", "16:00-20:00"],
  "fri": ["09:00-14:00", "16:00-20:00"],
  "sat": [],
  "sun": []
}
```

Free text like "Mon-Fri 10-19" still shows on the card, but open-now status is **not computed** for it. The location is treated as closed for the filter.

## Snippet

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'filters' => 'working_now'
]}
```

```modx
[[!YandexMapsLocator? &parents=`42` &filters=`working_now`]]
```

:::

In the location chunk after Pro `AfterStorePrepare`, `{$is_open_now}` (boolean) is available.

Status markup as in default `yandexmapslocator.store`:

```fenom
{if isset($is_open_now)}
    <span class="yml-store__status {if $is_open_now}is-open{else}is-closed{/if}">
        {if $is_open_now}
            {'yandexmapslocator_open_now' | lexicon}
        {else}
            {'yandexmapslocator_closed_now' | lexicon}
        {/if}
    </span>
{/if}
```

## REST

Open locations only:

```text
/assets/components/yandexmapslocatorpro/api.php?route=api/v1/locations&parents=42&filters=working_now&fields=id,title,is_open_now,working_hours_schedule
```

```json
{
  "success": true,
  "data": [
    {
      "id": 15,
      "title": "Pharmacy #3",
      "is_open_now": true,
      "working_hours_schedule": {
        "mon": ["09:00-21:00"],
        "tue": ["09:00-21:00"],
        "wed": ["09:00-21:00"],
        "thu": ["09:00-21:00"],
        "fri": ["09:00-22:00"],
        "sat": ["10:00-22:00"],
        "sun": ["10:00-20:00"]
      }
    }
  ],
  "meta": { "total": 2, "limit": 20, "offset": 0 }
}
```

```javascript
const base = '/assets/components/yandexmapslocatorpro/api.php';
const url = `${base}?route=api/v1/locations&parents=42&filters=working_now&fields=id,title,address,is_open_now`;

const res = await fetch(url, {
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer YOUR_TOKEN',
  },
});
const { data } = await res.json();
```

Pro fields `is_open_now` and `working_hours_schedule` appear in the response only when listed in `fields`.

## UI

Module `pro.js` adds a badge on the card and an "Open only" button in the filter panel.

Requires installed Pro and capability `pro` in map config.
