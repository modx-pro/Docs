---
title: Что даёт Pro
description: 'YandexMapsLocatorPro: REST, открыто сейчас, CSV, MiniShop3'
---

# Что даёт Pro

**YandexMapsLocatorPro**: платный пакет поверх Free. Свой сниппет и чанки он не кладёт: на сайте вы по-прежнему вызываете `YandexMapsLocator`. Pro добавляет фильтры, `pro.js`, страницу в менеджере и REST через Extension API Free.

Матрица: [Free и Pro](../free-vs-pro).

## Возможности

| Функция | Где | Раздел |
|---------|-----|--------|
| Фильтр `working_now`, бейджи, пояс на точке | сайт | [Открыто сейчас](working-now) |
| Фильтры `amenity`, `brand` | сайт / REST | [Free и Pro](../free-vs-pro) |
| Карта на карточке товара MiniShop3 | сайт | [MiniShop3](minishop3) |
| CSV, массовый геокод, превью расписания | менеджер | [CSV в менеджере](manager) |
| REST API v1 (`locations`, `geocode`, `meta`) | HTTP | [REST API](api) |
| CORS, Bearer, лимит запросов, выключатель | HTTP | [Безопасность API](api-security) |

## Как устроено

```text
Free: сервис yandexmapslocator, сниппет, search.php, chunks, Extension API
  └── Pro: сервис yandexmapslocatorpro, api.php, менеджер, фильтры, pro.js
```

Плагин Pro слушает:

- `OnYandexMapsLocatorRegisterFeatureProviders`
- `OnYandexMapsLocatorRegisterFilters`
- `OnYandexMapsLocatorBeforeStorePrepare`
- `OnYandexMapsLocatorAfterStorePrepare`
- `OnYandexMapsLocatorSerializeLocation`
- `OnDocFormRender`

Capability `pro` включает REST v1. Модуль `/assets/components/yandexmapslocatorpro/js/pro.js` рисует бейджи и кнопку «Только открытые».

## Установка

1. Free уже стоит и отвечает на сайте (рекомендуется ≥ 1.0.0-pl7).
2. Поставьте Pro через ModStore (1.1.0-pl2).
3. Задайте `yandexmapslocator_timezone` под сеть и при необходимости TV `yandexmaps_timezone` на точках.
4. На рабочем сайте: `api_token` (серверные клиенты) и `api_cors_origins`. Локатор на сайте при заданном токене остаётся на `search.php`.

Зависимость: `yandexmapslocator >=1.0.0-pl7 <2.0.0`.
