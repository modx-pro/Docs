---
title: Разработка
---
# Разработка

```mermaid
flowchart TB
  need[Задача]
  need -->|Вмешаться в процесс| events[События]
  need -->|Headless или SPA| webapi[Web API /api/v1]
  need -->|Свои роуты и middleware| router[API Router]
  need -->|Фоновые задачи| scheduler[Scheduler]
  need -->|CRUD сущностей из PHP| backend[Backend API]
  need -->|Замена классов| services[ServiceRegistry]
  need -->|Свои вкладки в админке| tabs["Вкладки товара и заказа"]
  webapi --> router
```

## Содержание

- [События](events) — точки подключения плагинов
- [Web API](api) — фронтенд и Nuxt, [карта эндпоинтов](web-api/endpoints)
- [API Router](routing) — маршрутизация, middleware, свои роуты
- [Scheduler](scheduler) — фоновые задачи
- [Модели и схема БД](models) — модели xPDO
- [Сервисный слой](services) — DI-контейнер, расширение и замена сервисов
- [JavaScript API](javascript) — Headless API для SPA (Vue, React, Vanilla JS)
- [Frontend JavaScript](frontend-js) — модули на стороне сайта, включая UI-слой
- [Интеграция вкладок товара](product-tabs-integration)
- [Интеграция вкладок заказа](order-tabs-integration)
- [Backend API](backend-api/) — товары, заказы, опции и покупатели из PHP-кода

## Manager API и процессоры

```mermaid
flowchart TB
  vue[Vue-экраны админки] --> mgrapi[Manager REST API]
  shop[Фронтенд] --> webapi["Web API /api/v1"]
  php["runProcessor, импорт, галерея"] --> proc[Процессоры]
  mgrapi --> svc[Сервисный слой]
  svc --> ev[События MODX]
  vuecrud[Vue-CRUD производителя] --> db[(База)]
```

С **1.10+** экраны заказов, покупателей, настроек и утилит работают через **Manager REST API** (`Controllers\Api\Manager\*` на FastRoute). Карточка товара и категории остаются обычным экраном ресурса MODX. Vue там только во вкладках.

**Процессоры** (`MiniShop3\Processors\*`) остались в работе у:

- прежнего коннектора и вызова `runProcessor()` из PHP;
- утилит, где контроллер вызывает процессор явно: `ImportController` (импорт товаров) и `UtilitiesGalleryController` (массовые операции с галереей), оба через трейт `RunsMs3Processors`;
- авторизации покупателя в Web API: вход, регистрация, выход, запрос и сброс пароля идут через `Processors\Api\Customer\*`.

Остальные контроллеры Manager API процессоры не вызывают — они работают через сервисный слой.

События при этом теряются не везде. Заказы, их статусы и позиции идут через сервисы, которые поднимают события сами: плагин на `msOnChangeOrderStatus` из админки сработает.

Vue-CRUD справочников пишет в базу напрямую, минуя `Processors/Settings/Vendor/*`, поэтому плагины на CRUD-события производителя из админки не сработают. У доставок и оплат в `events.php` зарегистрированы события стоимости, не CRUD. У типов связей CRUD-событий нет. См. [События производителей](events/vendor).

Headless-фронтенд работает через Web API (`/api/v1/*`). Процессоры там остались только в авторизации покупателя — плагины на её события из headless-клиента сработают.
