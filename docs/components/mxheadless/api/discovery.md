---
title: Discovery
description: GET /api/v1 и снимок capabilities mxHeadless
---

# Discovery

`GET /api/v1` отдаёт базовые метаданные API. Удобно проверить gateway и узнать версию перед подключением фронта или CI.

Аутентификация не нужна. Работает и при kill switch (вместе с `/health`).

```bash
curl -s https://your-site.example/api/v1 | jq
```

Префикс задаёт `mxheadless_api_prefix` (default `/api`). Сегмент `v1` зашит в роутер.

## Ответ

```json
{
  "data": {
    "name": "mxHeadless",
    "version": "1.0.42",
    "api": "/api/v1",
    "cors": {
      "enabled": true,
      "allowed_origins": ["http://localhost:3000"]
    },
    "links": {
      "health": "/api/v1/health",
      "schema": "/api/v1/schema",
      "docs": "/api/v1/docs",
      "endpoints": "/api/v1/meta/endpoints",
      "openapi": "/api/v1/meta/openapi",
      "openapi_json": "/api/v1/meta/openapi.json",
      "resources": "/api/v1/resources",
      "pages": "/api/v1/pages/{uri}"
    }
  },
  "meta": {}
}
```

| Поле | Смысл |
| --- | --- |
| `version` | Версия пакета на сайте |
| `cors` | Включение CORS и snapshot origins |
| `links` | Публичные URL meta и content API |

Discovery не перечисляет все маршруты. Полный список: `GET /meta/endpoints`. Формы параметров: [Swagger и OpenAPI](swagger) или `/schema`.

## Когда вызывать

- Мониторинг «API жив»
- Скрипты сборки клиентов
- Первая проверка после установки

## См. также

- [Обзор API](overview)
- [Schema](schema)
- [CORS](/components/mxheadless/configuration/cors)
