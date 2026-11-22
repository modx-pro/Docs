---
title: Права доступа
description: Разрешение ms3remains_manage для меню, API и вкладки остатков
---

# Права доступа

Компонент добавляет одно разрешение: `ms3remains_manage`.

Страница CMP откроется и при праве `settings`. Запросы API без `ms3remains_manage` вернут 403. Меню без этого разрешения скрыто.

Разрешение нужно для:

- пункта меню ms3Remains
- всех маршрутов `/api/mgr/ms3remains/*`
- загрузки и правки вкладки **Остатки** на странице товара

## Выдача

1. Откройте группу пользователей в manager.
2. В политике доступа включите `ms3remains_manage`.
3. Очистите кэш и перелогиньте пользователя.

Пакет ставит шаблон политики и политику при установке. Разрешение доступно сразу.

## Manager API

Префикс: `/api/mgr/ms3remains`. Нужны сессия manager и `ms3remains_manage`. Это маршруты экрана, не публичный API витрины.

| Метод | Путь | Назначение |
| --- | --- | --- |
| `GET` | `/stocks` | список остатков. Параметры запроса ниже |
| `GET` | `/stocks/by-product/{productId}` | сетка вкладки товара |
| `POST` | `/stocks/set` | записать количество |
| `GET` | `/stocks/csv/export` | выгрузка CSV |
| `POST` | `/stocks/csv/preview` | проверка CSV |
| `POST` | `/stocks/csv/commit` | применить CSV |
| `GET` | `/settings` | прочитать настройки |
| `PUT` | `/settings` | сохранить настройки |
| `POST` | `/settings/disable-ms3variants-deduction` | обнулить списание ms3Variants |
| `GET` | `/sync/status` | состояние проекции |
| `POST` | `/sync/rebuild` | пересчитать проекцию |
| `GET` | `/dictionary/products` | список товаров |
| `GET` | `/dictionary/categories` | список категорий |
| `GET` | `/dictionary/order-statuses` | статусы заказов |
| `GET` | `/dictionary/variants` | варианты ms3Variants |

### Параметры `GET /stocks`

| Параметр | Назначение |
| --- | --- |
| `category_id` | id категории |
| `product_id` | id товара |
| `variant_id` | id варианта |
| `search` | строка поиска |
| `availability` | `in_stock` или `out_of_stock`. Другое значение процессор отбрасывает |
| `page` | номер страницы, с 1 |
| `limit` | размер страницы. Без параметра процессор берёт 25, больше 100 не отдаёт. Экран открывается с 20 |
| `sort_field` | поле сортировки. Пустое значение читается из `sort`, по умолчанию `updatedon`. Принимаются `quantity`, `status`, `product_id`, `productId`, `product_name`, `productName`, `pagetitle`, `variant_sku`, `variantSku`, `options`, `id`, `updated`, `updated_at`, `updatedAt`, `updatedon`. Другое имя молча становится `updatedon` |
| `sort_order` | `ASC` или `DESC`. Пустое значение читается из `dir`, по умолчанию `DESC`. Всё, кроме `ASC`, становится `DESC` |

`GET /stocks/csv/export` принимает `category_id`, `product_id`, `variant_id` и `search`. Фильтр `availability` при выгрузке не применяется.

Сервисный PHP API для скриптов: [Обмен с внешними системами](external-sync).

## Витрина

Сниппет `ms3Remains` и проверки корзины разрешений не требуют: они работают для всех посетителей.
