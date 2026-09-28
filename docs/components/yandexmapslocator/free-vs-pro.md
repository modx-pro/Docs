---
title: Free и Pro
description: Матрица возможностей YandexMapsLocator Free и YandexMapsLocatorPro
---

# Free и Pro

Два пакета. **Free** закрывает карту, список, поиск и геолокацию. **Pro** на том же интерфейсе добавляет «открыто сейчас», карту самовывоза MiniShop3, CSV в менеджере и REST для внешних клиентов. Без Free Pro не встанет.

## Матрица

| Возможность | Free | Pro |
|-------------|------|-----|
| Карта + список + поиск по адресу | да | да (тот же интерфейс) |
| Геолокация, «Все точки», маршрут | да | да |
| Фильтр `category`, сортировка по `distance` | да | да |
| `return=chunks` / `data` / `json` | да | да |
| `search.php` (запрос с той же страницы) | да | запасной вариант, если REST выключен или задан `api_token` |
| Кнопка геокода в менеджере | да | да |
| Extension API (контракт для extras) | да | использует Free |
| REST API v1 (`api.php`, CORS, Bearer, `fields`/`include`) | - | да |
| `GET …/meta` (filters, apiFields) | - | да |
| Фильтр `working_now` | - | да |
| Бейдж «Открыто» / «Закрыто» + «Только открытые» | - | да |
| Поля `is_open_now`, `status_hint`, `closes_at`, `next_open_at` | - | да (витрина и `search.php`) |
| `working_hours_schedule` | - | да (только REST) |
| Пояс на точке (`yandexmaps_timezone`) | - | да |
| Фильтры `amenity`, `brand` | - | да |
| CSV и массовый геокод в менеджере | - | да |
| MiniShop3: карта «где забрать этот товар» | - | да (`ms3_product_ids` / `ms3_product_id` + `productId`) |

## Когда какой пакет

`return=json` и `search.php` в Free не заменяют REST: нет CORS для чужого сайта, нет `fields`/`include`, нет Bearer. Nuxt и Next: только Pro.

## Часовой пояс (`working_now`)

Расписание в TV `yandexmaps_working_hours`: местное время точки, не UTC сервера.

1. На точке: TV `yandexmaps_timezone` (IANA), например `Europe/Moscow` или `Asia/Omsk`.
2. Запасной вариант сети: Free-настройка `yandexmapslocator_timezone` (по умолчанию `Europe/Moscow`).

От этого зависят фильтр `working_now`, бейджи и поля `is_open_now`, `status_hint`, `closes_at`, `next_open_at`.

Для `working_now` / `is_open_now` нужен JSON в TV. Произвольный текст (в том числе «выходной») показывается в карточке, но «открыто сейчас» для него не считается: точка считается закрытой.

Подробнее: [Открыто сейчас](pro/working-now).

## Фильтры amenity и brand

REST и `search.php`: `amenity=wifi,card` (или `amenities`) и `brand=…`. Параметры можно передавать без явного `filters=amenity` / `filters=brand`.

На точке: TV `yandexmaps_amenities` (через запятую) и `yandexmaps_brand`. В сниппете: `amenities` / `amenity`, `brand`.

## MiniShop3 (Pro)

Free показывает всю сеть. На карточке товара MiniShop3 нужна карта только с точками, где товар доступен.

На точке: TV `ms3_product_ids` (ID через запятую или JSON-массив) или прежний `ms3_product_id`. Если `ms3_product_ids` заполнен, он важнее одиночного ID. Подробнее: [MiniShop3](pro/minishop3).

## Менеджер Pro

**Компоненты → YandexMapsLocator Pro**: импорт и экспорт CSV по ID контейнера, массовый геокод, превью расписания на форме точки.

Колонки CSV (14): `id`, `pagetitle`, `address`, `latitude`, `longitude`, `phone`, `email`, `category`, `working_hours`, `timezone`, `ms3_product_id`, `ms3_product_ids`, `amenities`, `brand`.

Экспорт: UTF-8 с BOM. Импорт из менеджера уходит на сервер в base64 (кириллица не ломается в POST). См. [CSV в менеджере](pro/manager).

## REST и настройки API

Ключи `yandexmapslocator_api_*` ставит Free (общий лимит запросов для `search.php`). URL и выключатель `api_enabled` работают после установки Pro.

Пустой `api_token`: публичный REST, удобно на стенде. На рабочем сайте задайте Bearer: его читают серверные клиенты. Локатор на странице токен не получает и при заданном секрете ходит в `search.php`.

```text
/assets/components/yandexmapslocatorpro/api.php?route=api/v1/locations
/assets/components/yandexmapslocatorpro/api.php?route=api/v1/meta
```

PATH_INFO вида `api.php/v1/...` на многих хостингах отдаёт HTML 404. Используйте query `route=`.

## Совместимость

| Free | Pro |
|------|-----|
| 1.0.0-pl7+ | 1.1.0-pl2 |
| 1.0.x | 1.0.x / 1.1.x |

Pro 1.1.0-pl2 рассчитан на Free ≥ 1.0.0-pl7. Ограничение в пакете: `yandexmapslocator >=1.0.0-pl7 <2.0.0`.

Дальше: [Что даёт Pro](pro/), [REST API](pro/api), [Открыто сейчас](pro/working-now).
