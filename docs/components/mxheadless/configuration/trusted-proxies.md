---
title: Trusted proxies
description: Доверенные прокси и X-Forwarded-For для mxHeadless
---

# Trusted proxies

Настройка `mxheadless_trusted_proxies`: список IP (через запятую или перенос строки), которым вы доверяете forwarded headers.

## Поведение

Если `REMOTE_ADDR` входит в список, client IP берётся из первого hop `X-Forwarded-For`. Иначе используется только `REMOTE_ADDR`.

IP влияет на rate limit и audit. Пустой список безопасен при прямом подключении.

## Ограничения

- CIDR в core может не парситься: указывайте конкретные IP балансировщика
- mxHeadless не читает `X-Forwarded-Proto` для построения URL. HTTPS настраивайте на reverse proxy.

## Пример

```text
203.0.113.10,203.0.113.11
```
