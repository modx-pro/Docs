---
title: GeoLocation2Current
description: Текущий город из сессии GeoLocation2 — чанк или JSON
---

# GeoLocation2Current

Показывает город, который компонент считает текущим: из сессии, из SxGeo (если сессии ещё нет) или город по умолчанию из `gl_cities`. Данные берёт из `buildWebPlaceholders()` сервиса GeoLocation2.

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `tpl` | `tpl.GeoLocation2.current` | Чанк HTML |
| `asJson` | `0` | Вернуть JSON плейсхолдеров `gl2_*` вместо чанка |
| `toPlaceholder` | `0` | Записать вывод в плейсхолдер |

## Вызов

::: code-group

```modx
[[!GeoLocation2Current]]
[[!GeoLocation2Current? &tpl=`tpl.GeoLocation2.current`]]
[[!GeoLocation2Current? &asJson=`1`]]
```

```fenom
{'!GeoLocation2Current' | snippet}
{'!GeoLocation2Current' | snippet : ['asJson' => 1]}
```

:::

## Плейсхолдеры `gl2_*`

Доступны в чанке и в JSON при `asJson=1`:

| Плейсхолдер | Смысл |
|-------------|--------|
| `gl2_current_id` | ID города в `gl_cities` |
| `gl2_current_name_ru` | Название (RU) |
| `gl2_current_name_en` | Название (EN) |
| `gl2_display_name_ru` | Имя в тексте модалки (может подставить SxGeo) |
| `gl2_real_name_ru` | Город из SxGeo |
| `gl2_default_id` / `gl2_default_name_ru` | Город с флагом default |
| `gl2_confirmed` / `gl2_prompt_done` | `1`, если пользователь подтвердил выбор |
| `gl2_csrf` | Токен для POST в `action.php` |

## Пример вывода (чанк по умолчанию)

Чанк `tpl.GeoLocation2.current`:

```html
<span class="gl2-current-city" data-city-id="1" data-confirmed="0">Москва</span>
```

`data-confirmed="0"` до первого подтверждения в модалке, `"1"` после.

Свой чанк — кнопка с `data-gl2-open="1"`, чтобы открыть [GeoLocation2Modal](GeoLocation2Modal):

::: code-group

```modx
<button type="button" class="btn btn-link" data-gl2-open="1">[[+gl2_current_name_ru]]</button>
```

```fenom
<button type="button" class="btn btn-link" data-gl2-open="1">{$gl2_current_name_ru}</button>
```

:::

## Пример JSON (`asJson=1`)

```json
{
  "gl2_current_id": "1",
  "gl2_current_name_ru": "Москва",
  "gl2_current_name_en": "Moscow",
  "gl2_display_name_ru": "Москва",
  "gl2_real_name_ru": "Москва",
  "gl2_confirmed": "0",
  "gl2_csrf": "a1b2c3…"
}
```

Удобно для SPA или своего JS без разметки модалки.

## MODX / Fenom в чанке

| Поле | MODX | Fenom |
|------|------|-------|
| ID города | `[[+gl2_current_id]]` | `{$gl2_current_id}` |
| Название | `[[+gl2_current_name_ru]]` | `{$gl2_current_name_ru}` |
| Подтверждён | `[[+gl2_confirmed]]` | `{$gl2_confirmed}` |

См. [GeoLocation2Modal](GeoLocation2Modal), [Web API](../api-action).
