---
title: Диагностика
description: Типовые сбои mxHeadless и что проверить
---

# Диагностика

## 404 на `/api/v1`

- Friendly URLs и rewrite в `index.php`
- Префикс `mxheadless_api_prefix` совпадает с URL
- Плагин mxHeadless активен
- Fallback: `api.php?route=/v1/health`

## 503 `service_disabled`

`mxheadless_enabled=false`. Включите или оставьте только health для maintenance.

## 401 / 403

- Нужны credentials на защищённом маршруте
- Scope ключа не покрывает действие → `scope_denied`
- Неверный / отозванный ключ → `invalid_token`

## 429

Rate limit. Смотрите `X-RateLimit-*`. Поднимите global или per-key лимит. Проверьте trusted proxies (иначе все за LB делят один IP).

## 422

Неизвестное field/filter/sort, битый JSON, `page`+`offset` вместе, превышение max_fields.

## CORS не работает

- `mxheadless_cors_enabled=true` и origin SPA в `mxheadless_cors_allowed_origins`
- Не сочетайте `*` с `mxheadless_cors_allow_credentials=true`
- Preflight `OPTIONS` доходит до MODX (rewrite, не блокируется WAF)
- Сверьте origin с `data.cors` в discovery (`GET /api/v1`)
- При выключенном CORS cross-origin fetch из браузера падает на клиенте: это ожидаемо, не «открытый доступ»

Подробнее: [CORS](/components/mxheadless/configuration/cors).

## Webhooks не уходят

- Worker в cron
- URL проходит SSRF-проверку
- Подписка active
- Смотрите `mxheadless_webhook_deliveries`

## CSRF на POST из mgr

Нужен `X-CSRF-Token`. Bearer API key CSRF не требует.

## Логи

Включите временно `mxheadless_debug` только на staging. Журнал audit: [audit-log](audit-log).
