---
title: Веб-сервер
description: Apache, Nginx и fallback api.php для mxHeadless
---

# Веб-сервер

Префикс gateway по умолчанию `/api` (`mxheadless_api_prefix`). Запросы `/api/v1/*` должны попадать в `index.php` MODX, где плагин `OnHandleRequest` перехватывает API.

## Apache

Включите `mod_rewrite`. Friendly URLs MODX уже направляют неизвестные пути в `index.php`. Отдельный rewrite-блок для `/api` обычно не нужен.

## Nginx

```nginx
location / {
    try_files $uri $uri/ /index.php?$args;
}
```

Путь `/api/v1/*` не должен отдаваться статикой и не должен обходить PHP.

## Резервный вход

Без rewrite используйте `assets/components/mxheadless/api.php`.

- С PATH_INFO: `.../api.php/v1/health`
- Без PATH_INFO (типичный nginx/Herd): `.../api.php?route=/v1/health`
- Второй query-параметр, если `route` занят: `.../api.php?path=/v1/health`

Приоритет разбора: `PATH_INFO`, `ORIG_PATH_INFO`, путь после `api.php` в URL, `?route=`, `?path=`. Голый `api.php` отдаёт discovery. `route` и `path` вырезаются из query и в обработчик не попадают.

См. [Установку](installation).

## Прокси и HTTPS

За load balancer заполните `mxheadless_trusted_proxies`, иначе rate limit считает всех клиентов одним адресом прокси. IP ни в чём, кроме rate limit, не используется: в журнал `mxheadless_api_log` он не пишется. Пакет не подменяет схему URL из `X-Forwarded-Proto`. HTTPS настраивайте на веб-сервере или reverse proxy.
