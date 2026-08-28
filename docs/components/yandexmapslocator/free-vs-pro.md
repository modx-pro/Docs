---
title: Free и Pro
description: Матрица возможностей YandexMapsLocator Free и YandexMapsLocatorPro
---

# Free и Pro

Два пакета. **Free** закрывает карту, список, поиск и геолокацию. **Pro** на том же UI добавляет «открыто сейчас», карту самовывоза MiniShop3, CSV в менеджере и REST для внешних клиентов. Без Free Pro не встанет.

## Матрица

| Возможность | Free | Pro |
|-------------|------|-----|
| Карта + список + поиск по адресу | да | да (тот же UI) |
| Геолокация, «Все точки», маршрут | да | да |
| Фильтр `category`, сортировка по `distance` | да | да |
| `return=chunks` / `data` / `json` | да | да |
| `search.php` (same-origin AJAX) | да | fallback, если REST выключен |
| Кнопка геокода в mgr | да | да |
| Extension API (контракт для extras) | да | использует Free |
| Фильтр `working_now` | - | да |
| Бейдж «Открыто» / «Закрыто» + «Только открытые» | - | да |
| Поля `is_open_now`, `working_hours_schedule` | - | да |
| MiniShop3: карта «где забрать этот товар» | - | да (`ms3_product_id` + `productId`) |
| CSV import/export (CMP) | - | да |
| REST API v1 (`api.php`, CORS, Bearer, `fields`/`include`) | - | да |

## Что даёт Pro на сайте

Тот же сниппет и разметка Free. Pro подключает `pro.js` и свои фильтры:

- бейджи «Открыто» / «Закрыто» на карточках
- кнопка «Только открытые» и фильтр `working_now`
- плейсхолдер `{$is_open_now}` в чанке точки
- на странице товара MiniShop3 карта только с точками, где есть этот товар (`productId` + TV `ms3_product_id`)

В менеджере: CSV (**Компоненты → YandexMapsLocator Pro**).

Отдельно REST v1 (`api.php`) с CORS и Bearer для Nuxt, Next и похожих клиентов. Free-режимы `return=json` и `search.php` сюда не подходят: нет CORS, `fields`/`include` и Bearer.

## Когда хватает Free

Нужны карта, поиск и категории. Не нужны статус «открыто сейчас», самовывоз на карточке товара и массовый CSV.

## Порядок установки

1. YandexMapsLocator (Free)
2. YandexMapsLocatorPro

Ключи `yandexmapslocator_api_*` ставит Free. REST-endpoint и kill switch `api_enabled` оживают после установки Pro.

## Совместимость

| Free | Pro |
|------|-----|
| 1.0.x | 1.0.x |

Pro: `yandexmapslocator >=1.0.0 <2.0.0`.

Дальше: [Что даёт Pro](pro/), [REST API](pro/api), [Открыто сейчас](pro/working-now).
