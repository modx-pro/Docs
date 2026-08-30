---
title: Mutations
description: Write API and Idempotency-Key in mxHeadless
---

# Mutations

`POST`, `PUT`, `PATCH`, `DELETE` on resources and objects require identity and write scopes.

## Body

`Content-Type: application/json`. Size limited by `mxheadless_max_body_bytes` (1 MB).

```bash
curl -s -X POST https://example.com/api/v1/resources \
  -H 'Authorization: Bearer mxh_...' \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: create-about-001' \
  -d '{"pagetitle":"About","template":1,"published":1}'
```

Session mutations also need `X-CSRF-Token`.

## Idempotency

When `mxheadless_idempotency_enabled=true` (default), on POST you can send:

```text
Idempotency-Key: <unique-string>
```

A repeat with the same key and body returns the stored response (header `Idempotency-Replayed`). Different body or concurrent request → `409` `idempotency_conflict`.

TTL: `mxheadless_idempotency_ttl` (86400 s).

## Soft delete

`DELETE` on resources is usually soft. Permanent: `?force=1`. Restore via PATCH `deleted: 0` + `include_deleted=1`.

## Webhooks

After a successful mutation, core enqueues events in the outbox (`resources.created`, etc.). Delivery runs via CLI worker. See [Webhooks](/components/mxheadless/operations/webhooks).
