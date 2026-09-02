---
title: FAQ
description: Типовые проблемы GeoLocation2 — SxGeo, модалка, CSRF, справочник
---

# FAQ

## Модалка не открывается

- Вызван ли `[[!GeoLocation2Initialize]]` на странице?
- Подключён ли Bootstrap 5 (своим шаблоном или через `loadBootstrap=1` у Initialize)?
- В чанке текущего города есть атрибут `data-gl2-open="1"`?

## SxGeo определяет не тот город

- Обновите `SxGeoCity.dat` — [CLI или Scheduler](integration#obnovlenie-sxgeo).
- Проверьте названия в `gl_cities`: сопоставление идёт со справочником, не с произвольным текстом.
- На локальном `127.0.0.1` SxGeo часто не даёт осмысленный город; тестируйте с реальным IP или задайте город вручную через модалку.

## Файл SxGeo отсутствует

Путь: `assets/components/geolocation2/vendor/sypexgeo/data/SxGeoCity.dat`.

Запустите:

```bash
php assets/components/geolocation2/bin/update-sxgeo.php
```

или переустановите assets пакета.

## POST action.php возвращает ошибку CSRF

- Сессия PHP должна работать на фронте (cookie, один домен).
- Берите актуальный `csrf` из `action=state` после перезагрузки страницы.
- Не кешируйте страницу с формой модалки через полный page cache без исключения для сессии.

## Пустой список городов в модалке

- Заполните `gl_cities` в менеджере или импортируйте CSV.
- Для `action=search` проверьте параметр `query` и активность записей в БД.

## Package provider not found

Пакет с modstore: в **Установщике** добавьте провайдер `modstore.pro` → `https://modstore.pro/extras/`.

## geolocation2_debug

Поставьте `geolocation2_debug = 1`, воспроизведите проблему, смотрите **Управление → Журнал ошибок**. На проде верните `0`.

## Права в менеджере

Редактирование справочника требует права `geolocation2_save` для политики пользователя.
