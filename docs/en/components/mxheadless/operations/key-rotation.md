---
title: Key rotation
description: API keys, OAuth clients, and webhook secrets in mxHeadless
---

# Key rotation

Rotate API keys and OAuth client secrets on a schedule or after a suspected leak. mxHeadless stores hashes only. You cannot recover an old secret from the database.

## API keys (`mxh_*`)

Format: `mxh_{lookupId}_{secret}`. In the database: `lookup_id`, `secret_hash`, scopes, and optional rate limits.

1. Create a new key with the same or tighter scopes ([API keys](/components/mxheadless/api-keys) or Manager).
2. Deploy the new secret to every consumer (CI, frontend server, integrations).
3. Confirm traffic uses the new key (`last_used_on` or audit log).
4. Revoke the old key (`revoked = 1`).

Do not revoke until every caller has switched.

After revoke, Bearer with the old secret returns `401`. Cached anonymous GET responses may live until `mxheadless_cache_ttl`. Lower TTL or disable cache during rotation.

## OAuth clients (`mxt_*`)

When `mxheadless_oauth_enabled=true`:

1. Create a new client via [OAuth](/components/mxheadless/oauth).
2. Update services that call `POST /api/v1/auth/token`.
3. Revoke the old client row.

Access tokens expire after `mxheadless_oauth_token_ttl` (default 3600 seconds). Changing the client secret blocks new token exchanges. Issued tokens live until expiry.

## Webhook secrets

Secrets live in `mxheadless_webhook_subscriptions.secret`.

1. Update the secret on the subscription.
2. Update env on the subscriber (for example `MXHEADLESS_WEBHOOK_SECRET`).
3. Run a test mutation and verify the signature.

Pending outbox rows store the secret snapshot at enqueue time.

## See also

- [Production checklist](production-checklist)
- [Webhooks](/components/mxheadless/operations/webhooks)
