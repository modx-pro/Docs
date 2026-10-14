---
title: Ротация ключей
description: API keys, OAuth clients и webhook secrets mxHeadless
---

# Ротация ключей

Ротируйте API keys, секреты OAuth client и webhook по расписанию или после подозрения на утечку.

## Как mxHeadless хранит секреты

| Секрет | Хранилище |
| --- | --- |
| API key | `mxheadless_api_keys.secret_hash`, `password_hash`, исходный secret не восстановить |
| OAuth client | `mxheadless_oauth_clients.client_secret_hash`, `password_hash` |
| OAuth access token | `mxheadless_oauth_tokens.token_hash` |
| Webhook subscription | `mxheadless_webhook_subscriptions.secret` открытым текстом |

Webhook secret в базе читается: он копируется в каждую запись `mxheadless_webhook_deliveries.secret` и печатается в stdout скриптом `bin/webhook-subscribe.php`.

## API keys (`mxh_*`)

Формат: `mxh_{lookupId}_{secret}`. В базе: `lookup_id`, `secret_hash`, scopes и опциональные rate limits.

1. Создайте новый ключ с теми же или более узкими scopes ([API keys](/components/mxheadless/api-keys) или Manager).
2. Разверните новый secret во всех consumer (CI, frontend server, интеграции).
3. Убедитесь, что трафик идёт с нового ключа (`last_used_on` или audit log).
4. Отзовите старый ключ (`revoked = 1`).

Не отзывайте ключ, пока все caller не перешли.

После revoke Bearer со старым secret вернёт `401`. Кэшированные anonymous GET могут жить до `mxheadless_cache_ttl`. На время ротации снизьте TTL или выключите cache.

## OAuth clients

При `mxheadless_oauth_enabled=true`:

1. Создайте нового client через [OAuth](/components/mxheadless/oauth).
2. Обновите сервисы, которые вызывают `POST /api/v1/auth/token`.
3. Отзовите старую строку client.

`client_id` задаётся вами в `bin/oauth-client-create.php --client-id=` и хранится как есть в колонке `client_id varchar(64)`. Префикса у него нет: `mxh_` относится к API key, `mxt_` к access-токену.

Access tokens истекают через `mxheadless_oauth_token_ttl` (default 3600 с). Смена client secret блокирует новые обмены. Уже выданные tokens живут до expiry.

## Секреты webhook

Секрет лежит в `mxheadless_webhook_subscriptions.secret` открытым текстом и копируется в записи доставок.

1. Обновите secret в subscription.
2. Обновите env на subscriber (например `MXHEADLESS_WEBHOOK_SECRET`).
3. Сделайте тестовую мутацию через API mxHeadless и проверьте подпись.

Pending outbox хранит snapshot secret на момент enqueue, поэтому смена секрета не влияет на уже поставленные в очередь доставки: их подпишет старый секрет.

Как ограничить утечку:

- Закройте CLI-вывод: не пишите `webhook-subscribe.php` в общий лог, перенаправляйте в файл с правами на пользователя сайта.
- Ограничьте доступ к базе: у пользователя MySQL, которому пакет пишет подписки, нет доступа на чтение `mxheadless_webhook_subscriptions` и `mxheadless_webhook_deliveries` из копий базы и панелей админки.
- Не храните секрет подписки в репозитории и не дублируйте его в открытые конфиги фронта.

## См. также

- [Чеклист production](production-checklist)
- [Webhooks](/components/mxheadless/operations/webhooks)
