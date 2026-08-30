---
title: Production checklist
description: Before putting mxHeadless into production
---

# Production checklist

- [ ] HTTPS on site and API
- [ ] `mxheadless.debug=false`
- [ ] `mxheadless.enabled=true` (or a deliberate kill switch)
- [ ] CORS: specific origins, no `*` + credentials
- [ ] `mxheadless.trusted_proxies` set behind load balancer
- [ ] Rate limit enabled. Set per-key limits if needed
- [ ] Swagger: disable UI on the public internet (`mxheadless.swagger.enabled=false`) if external docs are not needed (OpenAPI JSON may still be reachable)
- [ ] Enable OAuth only when needed. Keep the `password` grant off
- [ ] Webhooks: `allow_private_urls=false`. Run the worker in cron
- [ ] Enable audit for compliance. Configure prune
- [ ] Keep key secrets out of git. Follow a rotation procedure
- [ ] Friendly URLs / rewrite verified with curl health + resources
