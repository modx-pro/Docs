---
title: Objects
description: Generic CRUD /objects/{name} для зарегистрированных xPDO-объектов
---

# Objects

Универсальный CRUD для объектов из `ObjectRegistry`. В URL — имя (`products`, `orders`), не PHP-класс.

| Метод | Path | Scope |
| --- | --- | --- |
| GET | `/objects/{name}` | `{name}.read` |
| GET | `/objects/{name}/{id}` | `{name}.read` |
| POST | `/objects/{name}` | `{name}.create` |
| PUT / PATCH | `/objects/{name}/{id}` | `{name}.update` |
| DELETE | `/objects/{name}/{id}` | `{name}.delete` |

Шаблон фиксирован в `RoutesRegistrar`: `{name}.{action}`. Не `objects.{name}.read`.

```bash
curl -s 'https://example.com/api/v1/objects/products?limit=10' \
  -H 'Authorization: Bearer mxh_...'
```

## Registry

Объект появляется в API только после регистрации через core bootstrap или событие `OnMxHeadlessRegister`. См. [Расширение](/components/mxheadless/extensions/overview).

Незарегистрированное имя возвращает `404`.

## MiniShop3

Типичные имена: `products`, `ms_categories`, `orders`. Имя `categories` в core — элементы `modCategory`. Заказы обычно `protected`. Подробнее: [MiniShop3](/components/mxheadless/extensions/minishop3).

## Query и мутации

Те же правила [querying](querying) и [mutations](mutations), что у resources. Поля и фильтры — из определения объекта.
