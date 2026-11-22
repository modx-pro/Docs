---
title: Чеклист production
description: Перед выводом mxHeadless в production
---

# Чеклист production

- [ ] HTTPS на сайте и API
- [ ] `mxheadless_debug=false`
- [ ] `mxheadless_enabled=true` (или осознанный kill switch)
- [ ] CORS: конкретные origins, без `*` + credentials
- [ ] `mxheadless_trusted_proxies` заполнен за LB
- [ ] Rate limit включён. При необходимости задайте per-key лимиты
- [ ] Swagger: отключите UI в публичном интернете (`mxheadless_swagger_enabled=false`), если docs не нужны снаружи (OpenAPI JSON всё ещё может быть доступен)
- [ ] OAuth включайте только если нужен. Grant `password` оставьте выключенным
- [ ] Webhook: `allow_private_urls=false`. Worker повесьте в cron
- [ ] Секрет webhook подписки лежит в базе открытым текстом. Ограничьте доступ к таблице и не пишите вывод `webhook-subscribe.php` в общий лог
- [ ] Сброс кэша фронта: помните, что события дают только мутации через API. Правки из админки кэш не инвалидируют
- [ ] Audit включите при compliance. Настройте prune
- [ ] Секреты ключей не в git. Проведите ротацию по процедуре
- [ ] Friendly URLs и rewrite проверены через `curl` health и resources
