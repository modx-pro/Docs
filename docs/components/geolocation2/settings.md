---
title: Системные настройки
description: Ключи namespace geolocation2 в MODX
---

# Системные настройки

Namespace: **geolocation2**. В БД ключи с префиксом `geolocation2_`.

## Основные

| Ключ | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `geolocation2_debug` | boolean | `0` | Логирование в MODX error log |
| `geolocation2_detect_method` | text | `sxgeo` | Первичное определение: `sxgeo` (IP → SxGeo) или `session` (только сохранённая сессия) |

## SxGeo

| Ключ | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `geolocation2_sxgeo_auto_update` | boolean | `1` | Автообновление базы через Scheduler |
| `geolocation2_sxgeo_update_interval_days` | number | `14` | Интервал между проверками обновления (дней) |
| `geolocation2_sxgeo_last_run_at` | text | *(пусто)* | Служебное: время последнего запуска задачи |
| `geolocation2_sxgeo_last_status` | text | *(пусто)* | Служебное: статус последнего обновления |
| `geolocation2_sxgeo_last_message` | text | *(пусто)* | Служебное: сообщение последнего обновления |
| `geolocation2_sxgeo_last_header_time` | text | *(пусто)* | Служебное: дата из заголовка скачанного файла |

Ключи `geolocation2_sxgeo_last_*` пишет компонент при автоматическом обновлении и CLI. Вручную их обычно не меняют.

## Права доступа

| Идентификатор | Назначение |
|---------------|------------|
| `geolocation2_save` | Сохранение записей в менеджере GeoLocation2 |

Обновление SxGeo вручную и через Scheduler не требует отдельного права на фронте: достаточно доступа к файловой системе или задаче планировщика.

См. также: [Интеграция → обновление SxGeo](integration#obnovlenie-sxgeo).
