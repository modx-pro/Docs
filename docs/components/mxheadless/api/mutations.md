---
title: Мутации
description: Write API и Idempotency-Key в mxHeadless
---

# Мутации

`POST`, `PUT`, `PATCH`, `DELETE` на resources и objects требуют identity и write-scopes.

## Тело

`Content-Type: application/json`. Размер ограничен `mxheadless.max_body_bytes` (1 MB).

```bash
curl -s -X POST https://example.com/api/v1/resources \
  -H 'Authorization: Bearer mxh_...' \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: create-about-001' \
  -d '{"pagetitle":"About","template":1,"published":1}'
```

Сессионные мутации требуют заголовок `X-CSRF-Token`.

## Idempotency

При `mxheadless.idempotency.enabled=true` (default) на **POST** можно передать:

```text
Idempotency-Key: <unique-string>
```

Повтор с тем же ключом и тем же телом возвращает сохранённый ответ (заголовок `Idempotency-Replayed`). Другое тело или параллельный запрос → `409` `idempotency_conflict`.

TTL: `mxheadless.idempotency_ttl` (86400 с).

## Soft delete

`DELETE` на resources обычно soft. Permanent: `?force=1`. Restore через PATCH `deleted: 0` + `include_deleted=1`.

## Webhooks

После успешной мутации core ставит события в outbox (`resources.created` и т.д.). Доставка идёт через CLI worker. См. [Webhooks](/components/mxheadless/operations/webhooks).
