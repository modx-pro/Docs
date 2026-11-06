---
title: Connector API
description: 'Точка входа mxQuickView — AJAX-коннектор для отрисовки чанков, сниппетов и шаблонов'
---
<!-- TODO: translate from docs/components/mxquickview/connector.md -->

# Connector API

Single entry point: `assets/components/mxquickview/connector.php`. Connector accepts only `POST` with `action=render`. Response is JSON `{ success, html?, message? }`.

**Success response example:**

```json
{
  "success": true,
  "html": "<div class=\"qv-product\">...</div>",
  "message": null
}
```

**Error response example:**

```json
{
  "success": false,
  "html": null,
  "message": "Chunk 'mxqv_product' not found in whitelist"
}
```

См. подробное описание полей запроса, ответов и ошибок: [API и интерфейсы](/components/mxquickview/api) → раздел «Коннектор».
