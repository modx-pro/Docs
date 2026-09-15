---
title: Каталог Web API
description: "Публичный product и category API MiniShop3 для headless"
---

# Каталог

Публичные эндпоинты без customer token. Тот же набор данных, что у витрины SSR.

## Product

| Метод | Путь | Назначение |
| --- | --- | --- |
| `GET` | `/product/get/{id}` | Товар по ID |
| `GET` | `/product/get` | Resolve: query `alias` или `uri`, опционально `context` |
| `GET` | `/product/list` | Список / PLP |
| `GET` | `/product/filters` | Фасеты (те же фильтры, что list) |
| `GET` | `/product/{id}/images` | Галерея |

Query для `get` / resolve: `context`, `include_images` (0\|1, default 0), `include_seo` (default 1).

Query для `list` (основные):

| Параметр | Смысл |
| --- | --- |
| `parent` / `category` | ID категории (BC; игнорируется, если задан `parents`) |
| `parents` | CSV / массив ID категорий (OR + members) |
| `nested` | 0\|1 раскрыть дерево при `parents` |
| `price_min`, `price_max` | Диапазон цены |
| `in_stock`, `stock_min` | Наличие |
| `vendor_id`, `new`, `popular`, `favorite` | Флаги / производитель |
| `options` | JSON опций |
| `limit`, `offset` / `page` | Пагинация |
| `sort`, `dir`, `query`, `context` | Сортировка и поиск |
| `include_options`, `include_content`, `include_images` | Вложения (`include_images` default 0, cap 10 файлов на товар) |

Ответ list: `{ items, total, limit, offset }` внутри `data`.

`filters`: те же фильтры list + `keys`, `include_price` (default 1), `include_vendors` (default 0).

Поля товара режутся allowlist в `ProductCatalogService`.

## Category

| Метод | Путь | Назначение |
| --- | --- | --- |
| `GET` | `/category/get/{id}` | Категория по ID |
| `GET` | `/category/get` | Resolve по `alias` / `uri` |
| `GET` | `/category/list` | Список |
| `GET` | `/category/tree` | Дерево |

## ACL групп ресурсов

Настройка `ms3_web_catalog_respect_resource_groups`: если включена, публичный каталог скрывает товары и категории из групп ресурсов MODX с ACL для контекста запроса (анонимный MVP). Выключите, чтобы вернуть поведение до #659 / #666.

## Пример

```bash
curl -sS 'https://shop.example/assets/components/minishop3/api.php?route=/api/v1/product/list&parents=10&limit=20'
```

См. также [Примеры](examples), [Frontend: каталог](/components/minishop3/frontend/catalog).
