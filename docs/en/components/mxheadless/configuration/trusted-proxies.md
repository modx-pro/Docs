---
title: Trusted proxies
description: Trusted proxies and X-Forwarded-For for mxHeadless
---

# Trusted proxies

Setting `mxheadless.trusted_proxies` holds a list of IPs (comma or newline separated) you trust for forwarded headers.

## Behavior

If `REMOTE_ADDR` is in the list, client IP comes from the first hop in `X-Forwarded-For`. Otherwise the package uses only `REMOTE_ADDR`.

IP affects rate limit and audit. Empty list is the safe default for direct connections.

## Limitations

- CIDR may not parse in core: specify concrete load balancer IPs
- mxHeadless does not read `X-Forwarded-Proto` for URL building. Configure HTTPS on the reverse proxy

## Example

```text
203.0.113.10,203.0.113.11
```
