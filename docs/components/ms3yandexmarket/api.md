---
title: Маршруты менеджера
description: Маршруты коннектора MiniShop3 для ms3YandexMarket
---

# Маршруты менеджера

<!-- MEDIA: output | must | Примеры тел ответа коннектора: успешный GET /ping и ошибка 403 access_denied с полями success, message, code | На тестовом стенде выполнить запросы из сессии mgr с CSRF; обезличить домен и cookie -->

Запросы в коннектор MiniShop3: `/api/mgr/ms3yandexmarket`, только контекст `mgr`. Нужны сессия менеджера и CSRF. Открытого URL нет.

Ошибка: `success: false`, `message`, `code`. Успех: тело процессора.

| HTTP | `code` | Когда |
| --- | --- | --- |
| 403 | `access_denied` | Нет права процессора, своего XML или Fenom |
| 404 | `not_found` | Прайс не найден |
| 409 | `version_conflict` | Чужая `version` при сохранении тега |
| 409 | `generation_locked` | Этот прайс уже пишется |
| 422 | `domain_error` | Правило компонента, в том числе битый XML |
| 400 | `request_failed` | Прочий сбой |

| Метод | Путь | Действие |
| --- | --- | --- |
| GET | `/ping` | Проверка, что маршруты подключены |
| GET | `/pricelists` | Список прайсов |
| GET | `/pricelists/{id}` | Один прайс |
| POST | `/pricelists/create` | Создать |
| POST | `/pricelists/update` | Сохранить |
| POST | `/pricelists/remove` | Удалить |
| GET | `/categories/tree` | Дерево категорий |
| GET | `/fields` | Теги прайса. Параметр `pricelist_id` |
| GET | `/fields/{id}` | Один тег |
| GET | `/fields/available` | Поля для условий и список операторов |
| POST | `/fields/create` | Создать тег |
| POST | `/fields/update` | Сохранить тег. Нужна актуальная `version` |
| POST | `/fields/remove` | Удалить тег |
| POST | `/fields/reorder` | Порядок тегов |
| POST | `/attributes/create` | Атрибут тега |
| POST | `/attributes/update` | Сохранить атрибут |
| POST | `/attributes/remove` | Удалить атрибут |
| GET | `/conditions` | Условия |
| POST | `/conditions/create` | Добавить условие |
| POST | `/conditions/update` | Сохранить условие |
| POST | `/conditions/remove` | Удалить условие |
| GET | `/lists/sources` | Группы источников для редактора |
| GET | `/lists/values` | Разные значения колонки |
| GET | `/diagnostics` | Снимок диагностики |
| GET | `/offers` | Страница предложений. `total` это все подходящие, `items` это порция |
| GET | `/offers/product` | Один товар для предпросмотра |
| POST | `/generate/run` | Записать один прайс |
| POST | `/generate/run-all` | То же, что задача планировщика: активные прайсы не в режиме `manual`, которым пора обновиться |
| GET | `/generate/log/{id}` | Живой журнал запуска |
| POST | `/generate/preview` | Предпросмотр в памяти, без замены файла |
| GET | `/generate/preview-shop` | Фрагмент магазина |
| GET | `/generate/preview-categories` | Фрагмент категорий |
| GET | `/generate/preview-offer` | Фрагмент одного предложения |
| GET | `/logs` | Журнал. Фильтр `pricelist_id` |
| GET | `/logs/{id}` | Одна запись журнала |
| GET | `/yml` | Прочитать файл прайса |
| GET | `/yml/download` | Скачать файл. Путь проверяется внутри сайта |

Чужая `version` при сохранении тега, атрибута или условия возвращает 409. Повторите чтение и сохранение.

## Что принимает запись

Кнопки менеджера и тела этих маршрутов совпадают. Полный разбор кнопок: [действия](/components/ms3yandexmarket/actions).

`POST /pricelists/create` и `POST /pricelists/update` принимают `name`, `description`, `active`, `offer_source`, `stock_source`, `generation_mode`, `offer_type`, `marketplace`, `feed_purpose`, `generate_interval`, `file_path`, `file_url`, `managed_fields`, `categories`. У update нужен `id`. Элемент `categories`: `category_id`, `excluded`, `custom_name`. Смена `marketplace` или `feed_purpose` стирает дерево тегов и заполняет его профилем заново.

`POST /fields/create` и `POST /fields/update` принимают `name`, `value`, `handler`, `type`, `active`, `rank`, `parent_id`, `properties`. У create нужен `pricelist_id`, у update `id` и `version`.

`POST /fields/reorder` принимает `pricelist_id`, `parent_id` и `items`: список id или объектов `{id, rank}`.

`POST /attributes/create` принимает `field_id`, `name`, `value`, `type` (по умолчанию `text`), `handler`. Update и remove требуют `id` и `version`.

`POST /conditions/create` принимает `pricelist_id`, `column`, `operator`, `value`, `target` (`resource` или `offer`). Update принимает те же поля плюс `id` и `version`.

`POST /generate/run` принимает `id` (так шлёт менеджер) или `pricelist_id`. `POST /generate/run-all` без тела пишет активные прайсы не в режиме `manual`, которым пора обновиться. Кнопки на это в менеджере нет.

Фрагменты: `pricelist_id`, для предложения ещё `product_id` и `variant_id`. Список предложений: `pricelist_id`, `search`, `offset`, `limit` (в менеджере 20). Журнал: `pricelist_id` необязателен.
