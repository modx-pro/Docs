---
title: Установка
description: Сборка transport-пакета mxHeadless, gateway и проверка
---

# Установка

mxHeadless рассчитан на MODX Revolution **3.2.3+** и PHP **8.1+**.

## Через Package Manager

### С modstore.pro

Если transport зашифрован, без провайдера установка падает с `Package provider not found`.

1. **Система → Управление пакетами → Провайдеры** → добавьте **modstore.pro**:
   - URL: `https://modstore.pro/extras/`
   - Email и API-ключ из [личного кабинета modstore.pro](https://modstore.pro/)
2. **Управление пакетами** → найдите и установите **mxHeadless**. В **Show Details** укажите провайдер **modstore.pro**.
3. **Управление → Очистить кэш**.

Создаются namespace `mxheadless`, плагин `OnHandleRequest`, меню, системные настройки, таблицы и право `mxheadless_apikeys`.

### Из локального transport.zip

1. Соберите пакет из исходников или скачайте релиз с [GitHub](https://github.com/Ibochkarev/mxHeadless):

   ```bash
   cd _build
   php build.php
   ```

2. В Manager: **Пакеты → Установить пакет**, загрузите `.transport.zip`.

3. Завершите установку и очистите кэш.

## Обновление с 1.0.42

Ключи настроек перешли с точек (`mxheadless.cors.enabled`) на подчёркивания (`mxheadless_cors_enabled`). Resolver при upgrade копирует значения и удаляет старые строки. После обновления очистите кэш MODX.

Добавлена настройка `mxheadless_context` (default `web`): bootstrap-контекст для gateway и `api.php`. Значение `mgr` игнорируется.

## Вручную (разработка)

Скопируйте или смонтируйте `core/components/mxheadless/` в установку MODX:

```bash
cd core/components/mxheadless
composer install --no-dev --optimize-autoloader
```

Проверьте namespace `mxheadless` в **Система → Пространства имён**.

## HTTP-шлюз

### Основной путь: плагин `OnHandleRequest`

Префикс по умолчанию: `/api` (`mxheadless_api_prefix`). Запросы `/api/v1/...` обрабатывает приложение пакета.

| Настройка | По умолчанию | Назначение |
| --- | --- | --- |
| `mxheadless_api_prefix` | `/api` | Префикс URL до `/v1` |
| `mxheadless_context` | `web` | Bootstrap-контекст MODX для API. `mgr` игнорируется |
| `mxheadless_enabled` | `true` | Kill switch |
| `mxheadless_debug` | `false` | Подробные ошибки (только dev) |

### Запасной путь: `api.php`

Без ЧПУ. С PATH_INFO:

```text
https://your-site.example/assets/components/mxheadless/api.php/v1/health
```

На nginx/Herd (часто без PATH_INFO у вложенных `.php`) используйте query `route`:

```text
https://your-site.example/assets/components/mxheadless/api.php?route=/v1/health
https://your-site.example/assets/components/mxheadless/api.php?route=/api/v1/resources&limit=5
```

Голый `api.php` ведёт на discovery. Оба входа используют один pipeline middleware.

## Что создаётся

| Что | Подробности |
| --- | --- |
| Таблицы | `mxheadless_api_keys`, `mxheadless_oauth_clients`, `mxheadless_oauth_tokens`, `mxheadless_webhook_subscriptions`, `mxheadless_webhook_deliveries`, `mxheadless_api_log` |
| Право | `mxheadless_apikeys` (по умолчанию у Administrator) |
| Меню | **Компоненты → mxHeadless** |
| Событие | `OnMxHeadlessRegister` |

## ЧПУ

Включите friendly URLs. Отдельный ресурс MODX для API не нужен. За балансировщиком настройте [trusted proxies](configuration/trusted-proxies).

## Проверка

```bash
curl -s https://your-site.example/api/v1 | jq
curl -s https://your-site.example/api/v1/health | jq
curl -s 'https://your-site.example/api/v1/resources?limit=5&filter[published]=1' | jq
```

## Дальше

- [Веб-сервер](web-server)
- [Системные настройки](settings)
- [Быстрый старт](quick-start)
