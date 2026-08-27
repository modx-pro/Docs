---
title: GeoLocation2Initialize
description: Подключение CSS/JS модалки GeoLocation2 и конфиг action.php
---

# GeoLocation2Initialize

Подключает ассеты модалки и задаёт глобальный конфиг для `modal.js`. Сам по себе на странице ничего не показывает: в HTML попадают только `<link>`, `<script>` и объект `window.GeoLocation2Web`.

Вызывайте **один раз** на странице, где есть [GeoLocation2Modal](GeoLocation2Modal) или блоки с `data-gl2-data-live`.

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `loadBootstrap` | `0` | Bootstrap 5.3 с jsDelivr (CSS + bundle JS) |
| `loadCss` | `1` | `assets/.../css/web/modal.css` |
| `loadJs` | `1` | `assets/.../js/web/modal.js` (defer) |
| `toPlaceholder` | `0` | Записать вывод в плейсхолдер вместо echo |

Если Bootstrap 5 уже в теме, оставьте `loadBootstrap=0`.

## Вызов

::: code-group

```modx
[[!GeoLocation2Initialize]]
[[!GeoLocation2Initialize? &loadBootstrap=`1`]]
```

```fenom
{'!GeoLocation2Initialize' | snippet}
{'!GeoLocation2Initialize' | snippet : ['loadBootstrap' => 1, 'loadCss' => 1, 'loadJs' => 1]}
```

:::

## Что попадает в HTML

Фрагмент (упрощённо):

```html
<link rel="stylesheet" href="/assets/components/geolocation2/css/web/modal.css?v=…">
<script>window.GeoLocation2Web = Object.assign({}, window.GeoLocation2Web || {}, {"actionUrl":"/assets/components/geolocation2/action.php","messages":{"networkError":"…"}});</script>
<script src="/assets/components/geolocation2/js/web/modal.js?v=…" defer></script>
```

С `loadBootstrap=1` добавляются CDN-ссылки Bootstrap 5.3.3.

`actionUrl` и текст сетевой ошибки читает `modal.js` при POST на `action.php`.

## Связь с другими сниппетами

| Сниппет | Зависимость |
|---------|-------------|
| GeoLocation2Modal | Нужны CSS/JS; без Initialize используйте `includeAssets=1` у модалки (legacy) |
| GeoLocation2Data + `liveUpdate` | `modal.js` после смены города дергает `action=data` |
| GeoLocation2Current | Не зависит от Initialize |

## Типичные ошибки

- Модалка не открывается: нет Initialize и `includeAssets=0` у Modal.
- Дубли Bootstrap: и тема, и `loadBootstrap=1` — конфликт стилей.

См. [GeoLocation2Modal](GeoLocation2Modal), [FAQ](../faq).
