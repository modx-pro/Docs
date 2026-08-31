---
title: Ротация ключей
description: API keys, OAuth clients и webhook secrets mxHeadless
---

# Ротация ключей

Ротируйте API keys и секреты OAuth client по расписанию или после подозрения на утечку. mxHeadless хранит только хеши. Старый secret из базы не восстановить.

## API keys (`mxh_*`)

Формат: `mxh_{lookupId}_{secret}`. В базе: `lookup_id`, `secret_hash`, scopes и опциональные rate limits.

1. Создайте новый ключ с теми же или более узкими scopes ([API keys](/components/mxheadless/api-keys) или Manager).
2. Разверните новый secret во всех consumer (CI, frontend server, интеграции).
3. Убедитесь, что трафик идёт с нового ключа (`last_used_on` или audit log).
4. Отзовите старый ключ (`revoked = 1`).

Не отзывайте ключ, пока все caller не перешли.

После revoke Bearer со старым secret вернёт `401`. Кэшированные anonymous GET могут жить до `mxheadless_cache_ttl`. На время ротации снизьте TTL или выключите cache.

## OAuth clients (`mxt_*`)

При `mxheadless_oauth_enabled=true`:

1. Создайте нового client через [OAuth](/components/mxheadless/oauth).
2. Обновите сервисы, которые вызывают `POST /api/v1/auth/token`.
3. Отзовите старую строку client.

Access tokens истекают через `mxheadless_oauth_token_ttl` (default 3600 с). Смена client secret блокирует новые обмены. Уже выданные tokens живут до expiry.

## Секреты webhook

Секреты лежат в `mxheadless_webhook_subscriptions.secret`.

1. Обновите secret в subscription.
2. Обновите env на subscriber (например `MXHEADLESS_WEBHOOK_SECRET`).
3. Сделайте тестовую мутацию и проверьте подпись.

Pending outbox хранит snapshot secret на момент enqueue.

## См. также

- [Чеклист production](production-checklist)
- [Webhooks](/components/mxheadless/operations/webhooks)
