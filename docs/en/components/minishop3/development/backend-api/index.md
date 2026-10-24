---
title: Backend API
description: MiniShop3 programmatic API for working with store entities from PHP
---

# Backend API

MiniShop3 programmatic API for working with store entities from PHP: plugins, snippets, console scripts, third-party components.

## Processors (MODX Manager)

Processors live in `core/components/minishop3/src/Processors/` and use the namespace `MiniShop3\Processors\`. Call them by **full class name** — in PHP via `$modx->runProcessor()`, in connector and vueManager via the `action` parameter:

```php
$modx->runProcessor('MiniShop3\\Processors\\Gallery\\Upload', ['id' => $productId, 'file' => $path]);
```

A short path like `Gallery\Upload` with a `processors_path` option does not work: given a short name, MODX looks for a file with the `.class.php` suffix, and MiniShop3 processors have none. The call then answers "Requested processor not found", and the expected path goes to the MODX error log.

::: warning A processor checks its permission wherever you call it from
Almost every MS3 processor declares a `$permission` (`msproductfile_save` for `Gallery\Upload`), and `ModelProcessor::checkPermissions()` boils down to `$modx->hasPermission($this->permission)`. The check runs inside `run()`, **before** `process()` — a PHP call is no exception.

So a frontend snippet, where no manager permissions are in play, gets a refusal rather than a result: `isError()` is true and the message is `permission_denied_processor` with the permission name. When the operation has to run on behalf of a visitor, call a service (`$ms3->product`, `ProductImageService` and the rest) instead of a processor — services check no permissions, which makes the check your responsibility.
:::

## Manager API vs processors

| Layer | When to use |
| --- | --- |
| `Controllers\Api\Manager\*` | Vue manager UI (orders, customers, settings) |
| `Controllers\Api\Web\*` | Frontend, SPA, mobile apps |
| `MiniShop3\Processors\*` | `runProcessor()` from PHP, legacy connector, utilities with `RunsMs3Processors` |

Processor groups:

| Group | What is inside |
| --- | --- |
| `Product/*`, `Product/ProductLink/*` | Products and the links between them |
| `Category/*` | Product categories |
| `Gallery/*`, `Utilities/Gallery/*` | Product images and gallery utilities |
| `Customer/*`, `Customer/Address/*` | Customers and their addresses |
| `Api/Customer/*` | Login, registration, password reset, email verification — Web API delegates authentication here |
| `Settings/Vendor/*`, `Settings/Delivery/*`, `Settings/Payment/*`, `Settings/Status/*`, `Settings/Link/*` | Reference data: vendors, delivery methods, payment methods, statuses, link types |
| `Utilities/Import/*` | Product import from CSV |
| `System/*`, `System/Element/*`, `System/User/*` | Service operations |
| `Resource/*` | MODX resources |

Exception — Vue settings CRUD: it does **not** call `Processors/Settings/Vendor/*`, see [Vendor events](../events/vendor).

## Contents

- [Product API](product) — create, update, options, images, categories, links, vendors
- [Order API](order) — checkout, statuses, cost, addresses, items, log
- [Options API](options) — create options, assign to categories, read/write values
- [Customer API](customer) — authentication, registration, verification, addresses, tokens
