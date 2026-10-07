---
title: Каталог Web API
description: "Публичный product и category API MiniShop3 для headless"
---

# Каталог

Публичные эндпоинты, API-токен не нужен. Набор данных тот же, что у фронтенда с серверной отрисовкой (SSR).

## Product

| Метод | Путь | Назначение |
| --- | --- | --- |
| `GET` | `/product/get/{id}` | Товар по ID |
| `GET` | `/product/get` | Resolve: параметры `alias` или `uri`, необязательно `context` |
| `GET` | `/product/list` | Список / PLP |
| `GET` | `/product/filters` | Фасеты (те же фильтры, что у `list`) |
| `GET` | `/product/{id}/images` | Галерея |

Параметры запроса для `get` и resolve: `context`, `include_images` (0\|1, по умолчанию 0), `include_seo` (по умолчанию 1).

Основные параметры запроса для `list`:

| Параметр | Смысл |
| --- | --- |
| `parent` / `category` | ID категории (оставлен для совместимости; игнорируется, если задан `parents`) |
| `parents` | CSV / массив ID категорий (OR + members) |
| `nested` | 0\|1 — раскрыть дерево при `parents` |
| `price_min`, `price_max` | Диапазон цены |
| `in_stock`, `stock_min` | Наличие |
| `vendor_id`, `new`, `popular`, `favorite` | Флаги / производитель |
| `options` | JSON опций |
| `limit`, `offset` / `page` | Пагинация |
| `sort`, `dir`, `query`, `context` | Сортировка и поиск |
| `include_options`, `include_content`, `include_images` | Вложения (`include_images` по умолчанию 0, не более 10 файлов на товар) |
| `include_seo` | SEO-блок; у `list` по умолчанию **0**, у `get` — `1` |

Ответ `list`: `{ items, total, limit, offset }` внутри `data`.

`filters`: те же фильтры, что у `list`, плюс `keys`, `include_price` (по умолчанию 1), `include_vendors` (по умолчанию 0).

Поля товара отдаются по allowlist из `ProductCatalogService`.

## Category

| Метод | Путь | Назначение |
| --- | --- | --- |
| `GET` | `/category/get/{id}` | Категория по ID |
| `GET` | `/category/get` | Resolve по `alias` / `uri` |
| `GET` | `/category/list` | Список |
| `GET` | `/category/tree` | Дерево |

## ACL групп ресурсов

Настройка `ms3_web_catalog_respect_resource_groups`: если включена, публичный каталог скрывает товары и категории из групп ресурсов MODX, закрытых ACL для контекста запроса.

Проверка учитывает и анонимных посетителей, и авторизованных покупателей: гостю ищется разрешение, выданное без привязки к пользователю, а покупателю добавляются группы, выведенные из `msCustomerGroup` через ACL групп пользователей MODX. Членство считается по принципу «хотя бы одна»: документ остаётся видимым, если доступ даёт любая из его групп, даже когда другая закрыта.

Выключите настройку, чтобы каталог отдавал товары без оглядки на группы ресурсов.

## Пример

```bash
curl -sS 'https://shop.example/assets/components/minishop3/api.php?route=/api/v1/product/list&parents=10&limit=20'
```

См. также [Примеры](examples), [Frontend: каталог](/components/minishop3/frontend/catalog).
