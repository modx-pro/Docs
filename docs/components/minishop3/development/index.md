---
title: Разработка
---
# Разработка

Раздел для разработчиков, расширяющих функциональность MiniShop3.

## Содержание

- [События](events) — система событий для плагинов
- [REST API](api) — Web API для интеграций с фронтендом
- [API Router](routing) — маршрутизация, middleware, кастомизация роутов
- [Scheduler](scheduler) — фоновые задачи и интеграция с Scheduler
- [Модели и схема БД](models) — xPDO модели и структура таблиц
- [Сервисный слой](services) — DI контейнер, расширение и замена сервисов
- [JavaScript API](javascript) — Headless API для SPA (Vue, React, Vanilla JS)
- [Frontend JavaScript](frontend-js) — полная документация включая UI-слой
- [Интеграция вкладок товара](product-tabs-integration) — добавление вкладок на страницу товара
- [Интеграция вкладок заказа](order-tabs-integration) — добавление вкладок на страницу заказа
- [Backend API](backend-api/) — программный интерфейс для работы с сущностями из PHP-кода (товары, заказы, опции, покупатели)

## Manager API и процессоры

С **1.10+** большинство экранов менеджера ходит в **Manager REST API** (`Controllers\Api\Manager\*` через FastRoute). Старые **процессоры** (`MiniShop3\Processors\*`) остаются для:

- legacy connector / `runProcessor()` из PHP;
- утилит, где контроллер явно вызывает процессор (`RunsMs3Processors`: импорт, массовое обновление галереи);
- части настроек, где события ещё привязаны к processor lifecycle.

Vue-CRUD (производители, доставки, оплаты и т.д.) **не** вызывает `Processors/Settings/Vendor/*` — плагины на `msOnVendorCreate` из админки не сработают. См. [События производителей](events/vendor).

Headless витрина — **Web API** (`/api/v1/*`), не процессоры.
