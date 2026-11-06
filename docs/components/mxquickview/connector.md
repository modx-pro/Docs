---
title: Connector API
description: Точка входа mxQuickView — AJAX-коннектор для отрисовки чанков, сниппетов и шаблонов
---

# Connector API

Единая точка входа: `assets/components/mxquickview/connector.php`. Коннектор принимает только `POST` и только `action=render`. Ответ — JSON `{ success, html?, message? }`.

**Пример успешного ответа:**

```json
{
  "success": true,
  "html": "<div class=\"qv-product\">...</div>",
  "message": null
}
```

**Пример ошибки:**

```json
{
  "success": false,
  "html": null,
  "message": "Chunk 'mxqv_product' not found in whitelist"
}
```

См. подробное описание полей запроса, ответов и ошибок: [API и интерфейсы](/components/mxquickview/api) → раздел «Коннектор».
