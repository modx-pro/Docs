---
title: Каталог Web API
description: "Публичный product и category API MiniShop3 для headless"
---

# Каталог

Эндпоинты каталога публичные, API-токен не нужен. Видимость по группам ресурсов — общая со сниппетом каталога. Состав JSON задаёт `ProductCatalogService`, а не pdoFetch сниппета.

## Product

| Метод | Путь | Назначение |
| --- | --- | --- |
| `GET` | `/product/get/{id}` | Товар по ID |
| `GET` | `/product/get` | Resolve: параметры `alias` или `uri`, необязательно `context` |
| `GET` | `/product/list` | Список товаров (PLP) |
| `GET` | `/product/filters` | Фасеты |
| `GET` | `/product/{id}/images` | Галерея |

Параметры `get` и resolve: `context`, `include_images` (0\|1, по умолчанию 0), `include_seo` (по умолчанию 1).

Основные параметры `list`:

| Параметр | Назначение |
| --- | --- |
| `parent` / `category` | ID категории. Игнорируется, если задан `parents`. Оставлен для совместимости |
| `parents` | CSV или массив ID категорий. Условие OR, причём товар попадает в выдачу и по основной категории, и по дополнительным привязкам (`msCategoryMember`) |
| `nested` | 0\|1. Раскрывает дерево при `parents` |
| `price_min`, `price_max` | Диапазон цены |
| `in_stock`, `stock_min` | Наличие |
| `vendor_id`, `new`, `popular`, `favorite` | Производитель и флаги товара |
| `options` | JSON с опциями |
| `limit`, `offset` / `page` | Пагинация. `limit` по умолчанию 20, максимум 100 |
| `sort`, `dir`, `query`, `context` | Сортировка и поиск |
| `include_options`, `include_content`, `include_images` | Вложения. `include_images` по умолчанию 0. В списке не больше 10 файлов на товар |
| `include_seo` | [SEO-блок](#seo). У `list` по умолчанию 0, у `get` 1 |

Ответ `list`:

```json
{
  "success": true,
  "message": null,
  "data": {
    "items": [
      { "id": 12, "pagetitle": "Кружка" }
    ],
    "total": 1,
    "limit": 20,
    "offset": 0
  }
}
```

Эндпоинт `filters` принимает те же фильтры, что `list`, плюс `keys`, `include_price` (по умолчанию 1) и `include_vendors` (по умолчанию 0).

`GET /product/{id}/images` и карточка товара отдают до 50 файлов галереи.

## Category

| Метод | Путь | Назначение |
| --- | --- | --- |
| `GET` | `/category/get/{id}` | Категория по ID |
| `GET` | `/category/get` | Resolve по `alias` / `uri` |
| `GET` | `/category/list` | Список |
| `GET` | `/category/tree` | Дерево |

Параметры `get`: `context`, `include_hidden`, `include_content`, `include_breadcrumbs`, `include_children`, `include_seo` (по умолчанию 1).

Параметры `list`: `parent`, `limit`, `offset` или `page`, `sort`, `dir`, `context`, `include_hidden`, `include_content`, `include_seo` (по умолчанию 0).

Параметры `tree`: `parent`, `depth`, `context`, `include_hidden`, `sort`, `dir`, `include_seo` (по умолчанию 0).

При `include_children=1` вложенные категории в `children` тоже получают `seo` — если `include_seo` не выключен.

## SEO-блок {#seo}

SEO-блок приходит в поле `seo`, когда включён `include_seo`. Порядок сборки:

1. Базовые значения из полей ресурса.
2. `canonical`.
3. Переопределения из карты TV.
4. Событие `msOnGetPublicSeo`.

| Ключ | Откуда |
| --- | --- |
| `title`, `description` | Поля ресурса, при наличии — переопределения из карты TV |
| `canonical` | Через `makeUrl` MODX. При выключенных дружественных адресах получается вид `index.php?id=N`, поэтому ссылка остаётся рабочей |
| `robots` | `index,follow` либо `noindex,nofollow` — см. [`searchable`](#searchable) |
| `og.*` | Из карты TV: `og.title`, `og.description`, `og.image`, `og.type` |

Карта TV задаётся системной настройкой `ms3_public_seo_tv_map` — это JSON, где ключу SEO сопоставляется имя TV. Допустимые ключи: `title`, `description`, `canonical`, `robots`, `og.title`, `og.description`, `og.image`, `og.type`. Некорректный JSON игнорируется. По умолчанию настройка пустая: без неё SEO-блок собирается только из полей ресурса.

### Поле `searchable` {#searchable}

В ответе товара и категории есть `searchable` (признак «Доступен для поиска» у ресурса MODX). Когда он выключен, `robots` в SEO-блоке становится `noindex,nofollow`. Больше ни на что он не влияет: из выдачи API запись не исчезает.

## ACL групп ресурсов

```mermaid
flowchart TD
  both{"access_resource_group_enabled и ms3_web_catalog_respect_resource_groups"}
  both -->|нет| open["Фильтр выключен"]
  both -->|да| who{"Кто смотрит?"}
  who -->|гость| anon["Разрешение без пользователя"]
  who -->|покупатель| groups["Группы из msCustomerGroup"]
  anon --> any{"Хотя бы одна группа открыта?"}
  groups --> any
  any -->|да| visible["Документ в выдаче"]
  any -->|нет| hidden["Документ скрыт"]
```

Фильтр включён, только если истинны обе настройки: `access_resource_group_enabled` в MODX (по умолчанию включена) и `ms3_web_catalog_respect_resource_groups` (установщик пишет `true`).

Для гостя сервер ищет разрешение без привязки к пользователю, а покупателю добавляет группы из `msCustomerGroup` через ACL групп пользователей MODX.

Членство считается по принципу «хотя бы одна»: документ виден, если доступ даёт любая из его групп, даже когда другая закрыта.

Выключите `ms3_web_catalog_respect_resource_groups`, чтобы каталог отдавал товары без учёта групп ресурсов.

## Пример

```bash
curl -sS 'https://shop.example/assets/components/minishop3/api.php?route=/api/v1/product/list&parents=10&limit=20'
```

См. также: [Примеры](examples), [Frontend: каталог](/components/minishop3/frontend/catalog).
