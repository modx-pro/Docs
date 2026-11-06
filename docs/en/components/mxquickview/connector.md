---
title: Connector API
description: 'Точка входа mxQuickView — AJAX-коннектор для отрисовки чанков, сниппетов и шаблонов'
---
<!-- TODO: translate from docs/components/mxquickview/connector.md -->


# Connector API

![Ответ connector render (JSON)](screenshots/connector_response.png)

Единая точка входа: `assets/components/mxquickview/connector.php`. Коннектор принимает только `POST` и только `action=render`. Ответ — JSON `{ success, html?, message? }`.

См. подробное описание полей запроса, ответов и ошибок: [API и интерфейсы](/components/mxquickview/api) → раздел «Коннектор».
