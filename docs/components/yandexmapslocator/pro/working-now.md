---
title: Открыто сейчас
description: Фильтр working_now, TZ на точке и бейджи YandexMapsLocator Pro
---

# Открыто сейчас

**Pro.** На сайте появляются бейджи «Открыто» / «Закрыто», кнопка «Только открытые» и поля `is_open_now`, `status_hint`, `closes_at`, `next_open_at`. В сниппете и REST тот же смысл даёт фильтр `working_now` (или query `working_now=1`).

## Часовой пояс

В TV `yandexmaps_working_hours` храните **местное время точки**, не UTC сервера.

1. На точке: TV `yandexmaps_timezone` (IANA), например `Europe/Moscow` или `Asia/Omsk`.
2. Fallback сети: Free-настройка `yandexmapslocator_timezone` (по умолчанию `Europe/Moscow`).

От пояса зависят фильтр, бейджи и поля статуса.

## Формат TV

Для `working_now` / `is_open_now` в `yandexmaps_working_hours` нужен **JSON**.

Ключи дней: `mon` … `sun`. Значение: массив интервалов `"HH:MM-HH:MM"`. Пустой массив — выходной. Интервал через полночь (`22:00-06:00`) тоже ок.

Пример (пн-чт 09-21, пт 09-22, сб 10-22, вс 10-20):

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

Круглосуточно:

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

Два интервала в день:

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

Произвольный текст вроде «пн-пт 10-19» в карточке покажется, но статус «открыто сейчас» для него **не считается**. Точка для фильтра закрыта.

На форме ресурса кнопка Pro «Проверить расписание» показывает статус и ближайшее открытие/закрытие без сохранения.

## Сниппет

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

В чанке точки после Pro `AfterStorePrepare` доступны `{$is_open_now}`, при необходимости `{$status_hint}`, `{$closes_at}`, `{$next_open_at}`.

Разметка статуса как в default `yandexmapslocator.store`:

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

Список только открытых:

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

Поля Pro попадают в ответ только если их перечислили в `fields`.

## UI

Модуль `pro.js` добавляет бейдж на карточке и кнопку «Только открытые» в панели фильтров.

Нужны установленный Pro и capability `pro` в map config.
