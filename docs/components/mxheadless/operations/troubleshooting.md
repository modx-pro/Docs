---
title: Диагностика
description: Типовые сбои mxHeadless и что проверить
---

# Диагностика

## 404 на `/api/v1`

- Friendly URLs и rewrite в `index.php`
- Префикс `mxheadless.api.prefix` совпадает с URL
- Плагин mxHeadless активен
- Fallback: `api.php?route=/v1/health`

## 503 `service_disabled`

`mxheadless.enabled=false`. Включите или оставьте только health для maintenance.

## 401 / 403

- Нужны credentials на защищённом маршруте
- Scope ключа не покрывает действие → `scope_denied`
- Неверный / отозванный ключ → `invalid_token`

## 429

Rate limit. Смотрите `X-RateLimit-*`. Поднимите global или per-key лимит. Проверьте trusted proxies (иначе все за LB делят один IP).

## 422

Неизвестное field/filter/sort, битый JSON, `page`+`offset` вместе, превышение max_fields.

## CORS не работает

`mxheadless.cors.enabled=true`, origin в allowlist, не `*` с credentials. Preflight OPTIONS доходит до MODX.

## Webhooks не уходят

- Worker в cron
- URL проходит SSRF-проверку
- Подписка active
- Смотрите `mxheadless_webhook_deliveries`

## CSRF на POST из mgr

Нужен `X-CSRF-Token`. Bearer API key CSRF не требует.

## Логи

Включите временно `mxheadless.debug` только на staging. Журнал audit: [audit-log](audit-log).
