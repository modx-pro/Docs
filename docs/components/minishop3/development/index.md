---
title: Разработка
---
# Разработка

```mermaid
flowchart TB
  need[Задача]
  need -->|Плагин на процесс| events[События]
  need -->|Headless / SPA| webapi[Web API /api/v1]
  need -->|Маршруты и middleware| router[API Router]
  need -->|Фон| scheduler[Scheduler]
  need -->|PHP CRUD сущностей| backend[Backend API]
  need -->|Замена классов| services[ServiceRegistry]
  need -->|Вкладки mgr| tabs[product / order tabs]
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
  vue[Vue-экраны mgr] --> mgrapi[Manager REST API]
  shop[Витрина] --> webapi["Web API /api/v1"]
  php["runProcessor и импорт, галерея"] --> proc[Процессоры]
  mgrapi --> svc[Сервисный слой]
  svc --> ev[События MODX]
  vuecrud[Vue-CRUD производителя] --> db[(База)]
```

С **1.10+** экраны заказов, покупателей, настроек и утилит работают через **Manager REST API** (`Controllers\Api\Manager\*` на FastRoute). Карточка товара и категории остаются обычным экраном ресурса MODX. Vue там только во вкладках.

Старые **процессоры** (`MiniShop3\Processors\*`) остаются только для:

- прежнего коннектора и вызова `runProcessor()` из PHP;
- утилит, где контроллер вызывает процессор явно: `ImportController` (импорт товаров) и `UtilitiesGalleryController` (массовые операции с галереей), оба через трейт `RunsMs3Processors`.

Остальные восемнадцать контроллеров процессоры не вызывают. Они работают через сервисный слой.

События теряются не всегда. Заказы, их статусы и позиции идут через сервисы, которые поднимают события сами. Плагин на `msOnChangeOrderStatus` из админки сработает.

Vue-CRUD справочников пишет в базу напрямую, минуя `Processors/Settings/Vendor/*`. Плагины на CRUD-события производителя из админки не сработают. У доставок и оплат в `events.php` зарегистрированы события стоимости, не CRUD. У типов связей CRUD-событий нет. См. [События производителей](events/vendor).

Headless-фронтенд вызывает Web API (`/api/v1/*`). Вход, регистрация, выход, запрос и сброс пароля внутри делегируют в `MiniShop3\Processors\Api\Customer\*`.
