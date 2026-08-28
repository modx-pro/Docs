---
title: Что даёт Pro
description: 'YandexMapsLocatorPro: REST, открыто сейчас, CSV, MiniShop3'
---

# Что даёт Pro

**YandexMapsLocatorPro** — платный пакет поверх Free. Свой сниппет и чанки он не возит: на сайте вы продолжаете звать `YandexMapsLocator`, а Pro добавляет фильтры, `pro.js`, CMP и REST через Extension API Free.

Матрица: [Free и Pro](../free-vs-pro).

## Возможности

| Функция | Где | Раздел |
|---------|-----|--------|
| Фильтр `working_now`, бейджи, `is_open_now` | сайт | [Открыто сейчас](working-now) |
| Карта на карточке товара MiniShop3 | сайт | [MiniShop3](minishop3) |
| CSV import/export | менеджер | [CSV в менеджере](manager) |
| REST API v1 (`locations`, `geocode`) | HTTP | [REST API](api) |
| CORS, Bearer, rate limit, kill switch | HTTP | [Безопасность API](api-security) |

## Как устроено

```text
Free: сервис yandexmapslocator, сниппет, search.php, chunks, Extension API
  └── Pro: сервис yandexmapslocatorpro, api.php, CMP, фильтры, pro.js
```

Плагин Pro слушает:

- `OnYandexMapsLocatorRegisterFeatureProviders`
- `OnYandexMapsLocatorRegisterFilters`
- `OnYandexMapsLocatorAfterStorePrepare`
- `OnYandexMapsLocatorSerializeLocation`

Capability `pro` включает REST v1. Модуль `/assets/components/yandexmapslocatorpro/js/pro.js` рисует бейджи и кнопку «Только открытые».

## Установка

1. Free уже стоит и отвечает на сайте.
2. Поставьте Pro через ModStore.
3. Задайте `yandexmapslocator_timezone` под вашу сеть.
4. На production: `api_token` и `api_cors_origins`.

Зависимость: `yandexmapslocator >=1.0.0 <2.0.0`.
