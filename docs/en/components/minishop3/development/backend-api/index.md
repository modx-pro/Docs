---
title: Backend API
description: MiniShop3 programmatic API for working with store entities from PHP
---

# Backend API

This section describes the MiniShop3 programmatic API for working with store entities from PHP: plugins, snippets, console scripts, third-party components.

## Processors (MODX Manager)

Processors live in `core/components/minishop3/src/Processors/` and use the namespace `MiniShop3\Processors\`. Call them by **full class name** — in PHP via `$modx->runProcessor()`, in connector and vueManager via the `action` parameter:

```php
$modx->runProcessor('MiniShop3\\Processors\\Gallery\\Upload', ['id' => $productId, 'file' => $path]);
```

The short path `Gallery\Upload` with `processors_path` is not used — pass the full class name.

## Contents

- [Product API](product) — create, update, options, images, categories, links, vendors
- [Order API](order) — checkout, statuses, cost, addresses, items, log
- [Options API](options) — create options, assign to categories, read/write values
- [Customer API](customer) — authentication, registration, verification, addresses, tokens
