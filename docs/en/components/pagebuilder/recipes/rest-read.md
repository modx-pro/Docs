---
title: REST token
description: "A read-only Bearer token: GET /pages and the section catalog. Pro layer"
---

# REST token

Result: another site reads published pages with Bearer auth. This token cannot write pages. Requires PageBuilder Pro. The Free [Public API](../public-api) (`api.php`) stays separate.

## Before you start

1. `pagebuilder_rest_api_enabled` is on.
2. PageBuilder Pro is installed. Tokens are issued on the **API tokens** tab.

## Steps

1. In the CMP **API tokens** tab issue a token. The secret is shown once. `pagebuilder_rest_tokens` keeps the prefix and the hash.
2. Grant scopes `pages.read` and, if you need the type catalog, `catalog.read`.
3. Request:

```http
GET /assets/components/pagebuilder/api/v1.php?path=/pages/42
Authorization: Bearer <secret>
```

`pages.read` opens `GET /pages` and `GET /pages/{id-or-alias}`. `catalog.read` opens `GET /health` and `GET /catalog/sections`. The page list does not include the document body. A repeat with `If-None-Match` returns `304`.

A revoked token returns `401`. `pagebuilder_rest_throttle_per_minute` (default 120) returns `429` and `Retry-After` when the limit is passed.

## Example fields

The id `42` in the path is an example. Use the id or alias of a published resource.

Scope `pages.read` only: `GET /pages/42` returns the document. `GET /catalog/sections` without `catalog.read` is not available. With both scopes the type catalog opens on the same Bearer token.

## What to check

The first request with the secret returns the page body and an `ETag` header. A repeat with `If-None-Match` returns `304`. After revoke the same secret returns `401`. Past `pagebuilder_rest_throttle_per_minute` (default 120) the response is `429` and `Retry-After`.

## Rollback

Revoke the token on the **API tokens** tab.

## See also

- [REST API v1](../rest-api)
- [Public API](../public-api)
