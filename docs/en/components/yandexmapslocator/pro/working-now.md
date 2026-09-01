---
title: Open now
description: working_now filter, per-location TZ, and badges in YandexMapsLocator Pro
---

# Open now

**Pro.** On the site you get "Open" / "Closed" badges, an "Open only" button, and fields `is_open_now`, `status_hint`, `closes_at`, `next_open_at`. In the snippet and REST the same behavior uses filter `working_now` (or query `working_now=1`).

## Timezone

Store **local time** in TV `yandexmaps_working_hours`, not server UTC.

1. On the location: TV `yandexmaps_timezone` (IANA), e.g. `Europe/Moscow` or `Asia/Omsk`.
2. Network fallback: Free setting `yandexmapslocator_timezone` (default `Europe/Moscow`).

Timezone drives the filter, badges, and status fields.

## TV format

For `working_now` / `is_open_now` you need **JSON** in `yandexmaps_working_hours`.

Day keys: `mon` … `sun`. Value: array of intervals `"HH:MM-HH:MM"`. Empty array is a day off. Intervals past midnight (`22:00-06:00`) work too.

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

Plain text like "Mon-Fri 10-19" shows in the card, but **open now** is not computed. The location counts as closed for the filter.

On the resource form the Pro "Check schedule" button shows status and next open/close without saving.

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

In the location chunk after Pro `AfterStorePrepare` you get `{$is_open_now}`, and optionally `{$status_hint}`, `{$closes_at}`, `{$next_open_at}`.

Status markup like default `yandexmapslocator.store`:

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
/assets/components/yandexmapslocatorpro/api.php?route=api/v1/locations&parents=42&filters=working_now&fields=id,title,is_open_now,status_hint,closes_at,working_hours_schedule
```

```json
{
  "success": true,
  "data": [
    {
      "id": 15,
      "title": "Аптека №3",
      "is_open_now": true,
      "status_hint": "Закроется в 21:00",
      "closes_at": "2026-09-01T21:00:00+06:00",
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

Pro fields appear in the response only when listed in `fields`.

## UI

Module `pro.js` adds a badge on the card and an "Open only" button in the filter panel.

Requires installed Pro and capability `pro` in map config.
