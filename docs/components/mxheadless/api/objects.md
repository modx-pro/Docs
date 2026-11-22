---
title: Objects
description: Generic CRUD /objects/{name} для зарегистрированных xPDO-объектов
---

# Objects

Универсальный CRUD для объектов из `ObjectRegistry`. В URL — имя (`products`, `orders`), не PHP-класс.

| Метод | Path | Scope | Успех |
| --- | --- | --- | --- |
| GET | `/objects/{name}` | `{name}.read` | `200` |
| GET | `/objects/{name}/{id}` | `{name}.read` | `200` |
| POST | `/objects/{name}` | `{name}.create` | `201` |
| PUT / PATCH | `/objects/{name}/{id}` | `{name}.update` | `200` |
| DELETE | `/objects/{name}/{id}` | `{name}.delete` | `200` |

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

Те же правила [querying](querying) и [mutations](mutations), что у resources. Поля и фильтры из определения объекта.

Два отличия от `resources`:

- каскадного удаления нет: `DELETE` трогает одну запись, даже если в объекте есть поле `parent`
- правила валидации записей применяются одинаково, но проверки `alias`, `parent`, `class_key`, `template`, `content_type` имеют смысл только для ресурсов. Для extras-объектов реальны проверки типов, `immutable`, `hidden` и `required`.
