---
title: Trusted proxies
description: Доверенные прокси и X-Forwarded-For для mxHeadless
---

# Trusted proxies

Настройка `mxheadless_trusted_proxies`: список IP через запятую. Перенос строки и CIDR не читаются.

## Поведение

Если `REMOTE_ADDR` входит в список, IP клиента берётся из первого адреса `X-Forwarded-For`. Иначе используется только `REMOTE_ADDR`.

IP влияет на rate limit и журнал. Пустой список безопасен при прямом подключении.

## Ограничения

- CIDR не поддерживается: указывайте точные IP балансировщика
- mxHeadless не читает `X-Forwarded-Proto` для построения URL. HTTPS настраивайте на reverse proxy.

## Пример

```text
203.0.113.10,203.0.113.11
```
