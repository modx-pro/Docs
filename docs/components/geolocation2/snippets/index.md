---
title: Сниппеты
description: Обзор сниппетов GeoLocation2
---

# Сниппеты GeoLocation2

| Сниппет | Назначение |
|---------|------------|
| [GeoLocation2Initialize](GeoLocation2Initialize) | CSS/JS модалки и `window.GeoLocation2Web` |
| [GeoLocation2Current](GeoLocation2Current) | Текущий город в шапке или JSON состояния |
| [GeoLocation2Modal](GeoLocation2Modal) | Модалка подтверждения и смены города |
| [GeoLocation2](GeoLocation2) | Список городов из `gl_cities` |
| [GeoLocation2Location](GeoLocation2Location) | Город/регион/страна по IP через SxGeo |
| [GeoLocation2Data](GeoLocation2Data) | Контакты и адрес из `gl_data` |

## Порядок на странице

1. [GeoLocation2Initialize](GeoLocation2Initialize) — один раз в шаблоне.
2. [GeoLocation2Current](GeoLocation2Current) — виджет «Ваш город».
3. [GeoLocation2Modal](GeoLocation2Modal) — разметка модалки (часто в футере).
4. [GeoLocation2Data](GeoLocation2Data) с `forCurrent=1`, если нужны контакты выбранного города.

[GeoLocation2](GeoLocation2) и [GeoLocation2Location](GeoLocation2Location) к модалке не привязаны: первый рисует статический список, второй показывает сырые данные SxGeo.

Вызовы на фронте — **некэшированные** (`[[!...]]`, `{'!...' | snippet}`). Иначе CSRF и город из сессии застрянут в кеше страницы.

## MODX / Fenom

| Задача | MODX | Fenom |
|--------|------|-------|
| Инициализация | `[[!GeoLocation2Initialize]]` | `{'!GeoLocation2Initialize' \| snippet}` |
| Текущий город | `[[!GeoLocation2Current]]` | `{'!GeoLocation2Current' \| snippet}` |
| Модалка | `[[!GeoLocation2Modal]]` | `{'!GeoLocation2Modal' \| snippet}` |
| Список городов | `[[!GeoLocation2? &limit=`0`]]` | `{'!GeoLocation2' \| snippet : ['limit' => 0]}` |
| SxGeo | `[[!GeoLocation2Location]]` | `{'!GeoLocation2Location' \| snippet}` |
| Данные города | `[[!GeoLocation2Data? &forCurrent=`1`]]` | `{'!GeoLocation2Data' \| snippet : ['forCurrent' => 1]}` |

## См. также

- [Web API](../api-action)
- [Быстрый старт](../quick-start)
- [Интеграция](../integration)
