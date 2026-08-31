---
title: Troubleshooting
description: Common mxHeadless failures and what to check
---

# Troubleshooting

## 404 on `/api/v1`

- Friendly URLs and rewrite to `index.php`
- Prefix `mxheadless_api_prefix` matches the URL
- mxHeadless plugin is active
- Fallback: `api.php?route=/v1/health`

## 503 `service_disabled`

`mxheadless_enabled=false`. Re-enable or keep only health for maintenance.

## 401 / 403

- Protected route needs credentials
- Key scope does not cover the action → `scope_denied`
- Invalid or revoked key → `invalid_token`

## 429

Rate limit. Check `X-RateLimit-*`. Raise global or per-key limit. Verify trusted proxies (otherwise everyone behind LB shares one IP).

## 422

Unknown field/filter/sort, bad JSON, `page`+`offset` together, max_fields exceeded.

## CORS not working

- `mxheadless_cors_enabled=true` and the SPA origin is in `mxheadless_cors_allowed_origins`
- Do not combine `*` with `mxheadless_cors_allow_credentials=true`
- Preflight `OPTIONS` reaches MODX (rewrite, not blocked by WAF)
- Compare the origin with `data.cors` in discovery (`GET /api/v1`)
- With CORS disabled, cross-origin fetch from the browser fails on the client: expected, not "open access"

Details: [CORS](/components/mxheadless/configuration/cors).

## Webhooks not firing

- Worker in cron
- URL passes SSRF check
- Subscription is active
- Check `mxheadless_webhook_deliveries`

## CSRF on POST from mgr

Send `X-CSRF-Token`. Bearer API keys do not need CSRF.

## Logs

Enable `mxheadless_debug` temporarily on staging only. For request history, see [audit-log](audit-log).
