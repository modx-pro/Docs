---
title: Development
---
# Development

Section for developers extending MiniShop3 functionality.

## Contents

- [Events](events) — event system for plugins
- [REST API](api) — Web API for frontend integration
- [API Router](routing) — routing, middleware, custom routes
- [Scheduler](scheduler) — background tasks and Scheduler integration
- [Models and DB schema](models) — xPDO models and table structure
- [Service layer](services) — DI container, extending and replacing services
- [JavaScript API](javascript) — Headless API for SPA (Vue, React, Vanilla JS)
- [Frontend JavaScript](frontend-js) — full documentation including UI layer
- [Product tabs integration](product-tabs-integration) — adding tabs to the product page
- [Order tabs integration](order-tabs-integration) — adding tabs to the order page
- [Backend API](backend-api/) — programmatic API for working with entities from PHP (products, orders, options, customers)

## Manager API and processors

As of **1.10+**, most manager screens use the **Manager REST API** (`Controllers\Api\Manager\*` via FastRoute). Legacy **processors** (`MiniShop3\Processors\*`) remain for:

- legacy connector / `runProcessor()` from PHP;
- utilities where the controller explicitly calls a processor (`RunsMs3Processors`: import, bulk gallery updates);
- some settings where events are still tied to the processor lifecycle.

Vue CRUD (vendors, deliveries, payments, etc.) does **not** call `Processors/Settings/Vendor/*` — plugins on `msOnVendorCreate` from the admin UI will not run. See [Vendor events](events/vendor).

The headless storefront uses **Web API** (`/api/v1/*`), not processors.
