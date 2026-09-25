---
title: Права доступа
description: Разрешение ms3remains_manage для меню, API и вкладки остатков
---

# Права доступа

Компонент добавляет одно разрешение: `ms3remains_manage`.

Страница CMP откроется и с правом `settings`. Запросы API без `ms3remains_manage` вернут 403. Меню без этого разрешения не показывается.

Разрешение нужно для:

- пункта меню ms3Remains
- всех маршрутов `/api/mgr/ms3remains/*`
- загрузки и правки вкладки **Остатки** на странице товара

## Выдача

<!-- MEDIA: screenshot-admin | must | Политика доступа группы пользователей: включённое разрешение ms3remains_manage | MODX 3, тестовый стенд, группа с политикой ms3Remains -->

1. Откройте группу пользователей в manager.
2. В политике доступа включите `ms3remains_manage`.
3. Очистите кэш и перелогиньте пользователя.

Пакет ставит policy template и policy при установке, так что разрешение доступно сразу.

## Manager API

Префикс: `/api/mgr/ms3remains`. Нужны сессия manager и `ms3remains_manage`. Это маршруты экрана, не публичный API витрины.

| Метод | Путь | Назначение |
| --- | --- | --- |
| `GET` | `/stocks` | список остатков |
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

Сервисный PHP API для скриптов: [Обмен с внешними системами](external-sync).

## Витрина

Сниппет `ms3Remains` и проверки корзины разрешений не требуют: они работают для всех посетителей.
