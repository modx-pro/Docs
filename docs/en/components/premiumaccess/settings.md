---
title: Системные настройки
description: 'Ключи premiumaccess_* — движок, MS3, безопасность, уведомления и cron истечения'
---
<!-- TODO: translate from docs/components/premiumaccess/settings.md -->

# Системные настройки

Все ключи в namespace **`premiumaccess`**.

Часть параметров редактируется во вкладке **Компоненты → PremiumAccess → Настройки**. Ключи **`core_path`**, **`assets_url`**, **`locked_cta_chunk`**, **`front_css`**, **`front_js`**, **`working_templates`** — только в **Система → Системные настройки** → фильтр `premiumaccess`.

При обновлении пакета PremiumAccess пользовательские значения настроек сохраняются.

## Основные (premiumaccess_main)

### В настройках SPA

| Ключ | По умолчанию | Описание |
| --- | --- | --- |
| `premiumaccess.enabled` | Да | Глобальный выключатель выдачи, отзыва и проверок |
| `premiumaccess.paid_order_statuses` | `3` | ID статусов оплаты MS3 (через запятую) |
| `premiumaccess.revoked_order_statuses` | `5` | ID статусов отмены/возврата MS3 |

### Только системные настройки MODX

| Ключ | По умолчанию | Описание |
| --- | --- | --- |
| `premiumaccess.core_path` | `{core_path}components/premiumaccess/` | Путь к core компонента |
| `premiumaccess.assets_url` | `{assets_url}components/premiumaccess/` | URL assets |
| `premiumaccess.locked_cta_chunk` | `paLockedCta` | Chunk закрытого CTA для контента |
| `premiumaccess.front_css` | `css/web/main.css` | CSS витрины относительно assets |
| `premiumaccess.front_js` | (пусто) | Дополнительный JS (опционально) |
| `premiumaccess.working_templates` | (пусто) | ID шаблонов для подключения assets (пусто = все) |

### paid_order_statuses и revoked_order_statuses

- Значения — ID из miniShop3 (`ms3_status_paid`, статусы отмены).
- Списки **не должны пересекаться** (валидация в SPA «Настройки»).
- После смены статусов проверьте выдачу и отзыв на тестовом стенде.

## Безопасность (premiumaccess_security)

Редактируется в SPA **Настройки** (секция «Безопасность») и через `mgr/settings/*`.

| Ключ | По умолчанию | Описание |
| --- | --- | --- |
| `premiumaccess.protected_path` | `{core_path}uploads/protected/` | Каталог **защищённых файлов** вне document root |
| `premiumaccess.download_token_ttl` | `300` | TTL download token (сек) |

Файлы в `protected_path` не должны быть доступны по прямому URL. Скачивание только через `download.php?token=…`.

## Производительность (premiumaccess_performance)

Редактируется в SPA **Настройки** (секция «Производительность»).

| Ключ | По умолчанию | Описание |
| --- | --- | --- |
| `premiumaccess.access_cache_ttl` | `300` | TTL кэша отказов (сек); кэшируется только отказ, разрешение всегда из БД |

## Уведомления и cron (premiumaccess_notifications)

Секция **«Уведомления и cron»** в SPA **Настройки** и в **Системные настройки MODX** (area `premiumaccess_notifications`). Значения одни и те же; удобнее править в SPA.

| Ключ | По умолчанию | Описание |
| --- | --- | --- |
| `premiumaccess.notifications_enabled` | Нет | Включить email, webhook и Telegram |
| `premiumaccess.notify_user_email` | Да | Email владельцу доступа |
| `premiumaccess.notify_admin_emails` | (пусто) | Admin emails через запятую |
| `premiumaccess.notify_webhook_url` | (пусто) | POST JSON с полями события (как в email) |
| `premiumaccess.notify_telegram_bot_token` | (пусто) | Telegram bot token |
| `premiumaccess.notify_telegram_chat_id` | (пусто) | Telegram chat ID |
| `premiumaccess.expire_cron_enabled` | Да | Обработка истёкших доступов |
| `premiumaccess.expire_cron_interval` | `3600` | Минимальный интервал (сек) для `OnSiteRefresh` и CLI |
| `premiumaccess.auto_renewal_enabled` | Нет | Email-напоминания до `expires_at` |
| `premiumaccess.auto_renewal_remind_days` | `7` | За сколько дней до истечения напомнить |

### Включение уведомлений

1. Плагины `premiumaccess_notifications` и `premiumaccess_expire_cron` включены.
2. `premiumaccess.notifications_enabled = true`.
3. Настроен SMTP MODX (`emailsender`, mail service).
4. Email-чанки `paEmailGrant*`, `paEmailRevoke*`, … поставляются с пакетом PremiumAccess.

Email-шаблоны: суффиксы `User` и `Admin` для выдачи, отзыва, продления, истечения и напоминания о продлении.

### Cron истечения {#expire-cron}

- **OnSiteRefresh:** плагин `premiumaccess_expire_cron` (не чаще интервала `expire_cron_interval`).
- **CLI:** `php core/components/premiumaccess/bin/expire-accesses.php` для system crontab.

Пример crontab:

```bash
0 * * * * /usr/bin/php /path/to/modx/core/components/premiumaccess/bin/expire-accesses.php
```

Пока первый CLI-запуск ещё идёт, второй завершится с кодом **0** (`another run is in progress`) — истёкшие доступы не обработаются дважды.

Stdout:

```text
PremiumAccess expire cron: expired=2, auto_renewal_reminders=1
```

- `expired` — записи с прошедшим `expires_at`, в журнале `access_expired`.
- `auto_renewal_reminders` — напоминания при `auto_renewal_enabled`, в журнале `auto_renewal_reminder`.

При включённых напоминаниях о продлении и указанном **ID товара MS3** у тарифа отправляется email за N дней до окончания доступа. Автоматического списания с карты через MS3 **нет** — только повторная покупка.

Подробнее: [Интеграция — уведомления](integration#уведомления-и-cron-истечения).

## Рекомендуемый профиль production

- `premiumaccess.enabled` = Да
- `protected_path` вне web root, каталог существует и доступен PHP
- `paid_order_statuses` совпадает со статусом «Оплачен» MS3
- `revoked_order_statuses` = статусы отмены/возврата MS3
- HTTPS для connector и `download.php`
- Права менеджера по принципу минимальных привилегий (см. [Интерфейс](interface/index#права-доступа))

## См. также

- [Быстрый старт](quick-start)
- [Интеграция](integration)
- [FAQ](faq)
