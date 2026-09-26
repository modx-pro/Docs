---
title: Trusted proxies
description: Trusted proxies and X-Forwarded-For for mxHeadless
---

# Trusted proxies

Setting `mxheadless_trusted_proxies` holds a comma-separated list of IPs. Newlines and CIDR are not parsed.

## Behavior

If `REMOTE_ADDR` is in the list, client IP comes from the first address in `X-Forwarded-For`. Otherwise the package uses only `REMOTE_ADDR`.

IP affects rate limit and the audit log. An empty list is safe for direct connections.

## Limitations

- CIDR is not supported: specify exact load balancer IPs
- mxHeadless does not read `X-Forwarded-Proto` for URL building. Configure HTTPS on the reverse proxy

## Example

```text
203.0.113.10,203.0.113.11
```
