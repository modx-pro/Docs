---
title: Connector API
description: Точка входа mxQuickView — AJAX-коннектор для отрисовки чанков, сниппетов и шаблонов
---

# Connector API

<!-- MEDIA: Ответ connector render (JSON) | DevTools → Network → assets/components/mxquickview/connector.php, POST → `{ success: true, html: "..." }` -->

Единая точка входа: `assets/components/mxquickview/connector.php`. Коннектор принимает только `POST` и только `action=render`. Ответ — JSON `{ success, html?, message? }`.

См. подробное описание полей запроса, ответов и ошибок: [API и интерфейсы](/components/mxquickview/api) → раздел «Коннектор».
