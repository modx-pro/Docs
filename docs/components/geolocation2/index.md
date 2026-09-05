---
title: GeoLocation2
description: Геоданные MODX — справочник gl_*, SxGeo, модалка выбора города, REST action.php
author: Ibochkarev
repository: https://github.com/Ibochkarev/GeoLocation2
logo: https://modstore.pro/assets/extras/geolocation2/logo.png
modstore: https://modstore.pro/packages/utilities/geolocation2
categories: utilities
items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'Интеграция', link: 'integration' },
  { text: 'Web API (action.php)', link: 'api-action' },
  {
    text: 'Сниппеты',
    link: 'snippets',
    items: [
      { text: 'GeoLocation2Initialize', link: 'snippets/GeoLocation2Initialize' },
      { text: 'GeoLocation2Current', link: 'snippets/GeoLocation2Current' },
      { text: 'GeoLocation2Modal', link: 'snippets/GeoLocation2Modal' },
      { text: 'GeoLocation2', link: 'snippets/GeoLocation2' },
      { text: 'GeoLocation2Location', link: 'snippets/GeoLocation2Location' },
      { text: 'GeoLocation2Data', link: 'snippets/GeoLocation2Data' },
    ],
  },
  { text: 'FAQ', link: 'faq' },
]
---

# GeoLocation2

Справочник стран, регионов и городов в таблицах `gl_*`, определение локации по IP через SxGeo, выбор города на фронте (модалка Bootstrap 5) и REST-эндпоинт `action.php`.

## Возможности

- Таблицы `gl_countries`, `gl_regions`, `gl_cities`, `gl_data` и менеджер в админке MODX
- SxGeo (локальная база `.dat`, без внешних API на каждый запрос)
- Сессия `$_SESSION['gl2']`: выбранный город, флаг подтверждения, CSRF-токен
- Сниппеты для списка городов, SxGeo-lookup, `gl_data`, модалки
- CSV-импорт и экспорт справочников из менеджера
- Задача Scheduler для автообновления SxGeo (опционально)

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0+ |
| PHP | 8.2+ |

## Установка

1. [Подключите репозиторий ModStore](https://modstore.pro/info/connection).
2. **Extras → Installer** → **Download Extras** — **GeoLocation2** → **Download** → **Install**.
3. **Настройки → Очистить кэш**.
4. Откройте **Компоненты → GeoLocation2** и проверьте вкладки справочника.
5. Убедитесь, что файл SxGeo на месте: `assets/components/geolocation2/vendor/sypexgeo/data/SxGeoCity.dat`.
6. Подключите сниппеты на сайте — см. [Быстрый старт](quick-start).

Пакет в каталоге [modstore.pro](https://modstore.pro/packages/utilities/geolocation2). Исходники: [GitHub](https://github.com/Ibochkarev/GeoLocation2).

## Быстрые ссылки

| Раздел | Описание |
|--------|----------|
| [Быстрый старт](quick-start) | Минимальная выкладка на сайт |
| [Системные настройки](settings) | Ключи `geolocation2_*` |
| [Интеграция](integration) | Менеджер, модель данных, CSV, PHP-сервис, SxGeo |
| [Web API](api-action) | GET/POST `action.php` |
| [Сниппеты](snippets/) | Параметры и чанки |
| [FAQ](faq) | Типовые ошибки |
