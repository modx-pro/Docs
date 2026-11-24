---
title: Установка
description: Установка msYandexCommerce из modstore и первая проверка
---

# Установка

## Требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 2.8+ |
| PHP | 7.4+ |
| miniShop2 | ≥ 2.4.0 |
| pdoTools | для сниппета кнопки (в `requires` транспорта нет) |
| HTTPS | по умолчанию обязателен для публичного API (`https_required`). Исключение: `GET /health` |

## Установка пакета

Удобный путь: провайдер **modstore.pro** в менеджере пакетов. Пакет публикуется на [modstore.pro](https://modstore.pro/).

1. **Система → Управление пакетами → Провайдеры** → добавьте **modstore.pro**:
   - URL: `https://modstore.pro/extras/`
   - Email и API-ключ из [личного кабинета modstore.pro](https://modstore.pro/)
2. Убедитесь, что установлены **miniShop2** и (для кнопки на витрине) **pdoTools**.
3. **Управление пакетами** → установите **msYandexCommerce**. Если ставите с витрины, в **Show Details** укажите провайдер **modstore.pro**.
4. **Управление → Очистить кэш**.
5. Плагин **`msyandexcommerce_bootstrap`** на событии **`OnMODXInit`** после установки должен оставаться **включённым**: он подключает автозагрузку классов. Точки входа API, CMP и сниппет сами подключают `bootstrap.php`, поэтому выключенный плагин эти входы не останавливает.

### Обновление с `ms2yandexcommerce`

При установке поверх старого пакета резолвер:

- переименует таблицы `ms2_yandexcommerce_*` → `ms_yandexcommerce_*`
- скопирует настройки `ms2yandexcommerce_*` → `msyandexcommerce_*`
- выключит плагин `ms2yandexcommerce_bootstrap`
- удалит меню `ms2yandexcommerce`

На чистой установке этот резолвер ничего не меняет.

## После установки

1. Откройте меню **Yandex Commerce (YCP)** → **Обновить**. «Обновить» показывает только `api_token_configured`, не сам токен. Ответ `diagnostics/check` (JSON в `object`):
   - `status`, `enabled`, `mode`, `timestamp`
   - `minishop2`, `api_token_configured`, `tables` (флаги по таблицам пакета)
   - `ready` = `enabled` && токен задан && miniShop2 доступен && все `tables` true
2. Нажмите **Сгенерировать API-токен** в CMP. CMP покажет его открытым текстом один раз. Скопируйте значение в кабинет YCP. Если токен уже записал резолвер при установке, без этой кнопки CMP его не показывает. Повторное нажатие заменяет токен.
3. Включите `msyandexcommerce_enabled` и заполните склады / delivery / payment. См. [Конфигурация](configuration).

Проверка: `GET …/assets/components/msyandexcommerce/api.php/health` → `{"status":"ok"}`. Ответ не означает `ready`.
