---
title: Connector API
description: Справочник actions connector.php — SPA менеджера и API витрины PremiumAccess
---
<!-- TODO: translate from docs/components/premiumaccess/development/api.md -->

# Connector API

URL: `{assets_url}components/premiumaccess/connector.php`

Список разрешённых actions задаётся в `connector.php` пакета. Неизвестный `action` → `{ "success": false, "message": "Unknown action" }`.

## Общие правила

| Контекст | ctx | Авторизация |
| --- | --- | --- |
| SPA менеджера | `mgr` | MODX permission `view` + право на action |
| Витрина | `web` | Web-сессия; изменяющие запросы — POST + `HTTP_MODAUTH` |

Изменяющие запросы (POST): header **`HTTP_MODAUTH`** = user token (`mgr` или `web`).

Списки менеджера: query `start`, `limit`, `sort`, `dir` → `{ success, total, items }`.

Скачивание файлов — отдельно: `download.php?token=…` (не connector).

## API витрины

| action | Method | Авторизация | Описание |
| --- | --- | --- | --- |
| `web/access/check` | GET/POST | web (гость OK) | `{ allowed, reason }` для target |
| `web/access/status` | GET/POST | web | `{ enabled, authenticated, user_id, cabinet_available }` |
| `web/access/renew-link` | GET/POST | пользователь web | Ссылка на продление (с проверкой на сервере) |
| `web/cabinet/list` | GET/POST | пользователь web | Список выдач доступа (JSON) |
| `web/files/issue-token` | POST | пользователь web + MODAUTH | Токен скачивания protected file |
| `web/promo/redeem` | POST | пользователь web + MODAUTH | Активация промокода |

### web/access/check

```text
?action=web/access/check&target_type=resource&target_identifier=2046
```

Ответ:

```json
{
  "success": true,
  "allowed": false,
  "reason": "premiumaccess_access_denied"
}
```

### web/access/renew-link

См. [PremiumAccessRenew](../snippets/PremiumAccessRenew#запрос-renew-link) и [Когда продление доступно](../integration#когда-доступно-продление).

## API менеджера

Требуется MODX **`view`**. Изменяющие actions — POST + право из таблицы.

| action | Method | Право | Описание |
| --- | --- | --- | --- |
| `mgr/dashboard/summary` | GET | view_products / manage_access | Показатели панели |
| `mgr/products/list` | GET | view_products | Список продуктов |
| `mgr/products/create` | POST | manage_products | Создание тарифа |
| `mgr/products/update` | POST | manage_products | Обновление |
| `mgr/products/archive` | POST | manage_products | Архивация |
| `mgr/minishop3/products/list` | GET | view_products | Выбор товара MS3 в мастере/продуктах |
| `mgr/groups/list` | GET | view_groups | Список групп |
| `mgr/groups/get` | GET | view_groups | Одна группа + items |
| `mgr/groups/create` | POST | manage_groups | Создание |
| `mgr/groups/update` | POST | manage_groups | Обновление |
| `mgr/groups/archive` | POST | manage_groups | Архивация |
| `mgr/rules/list` | GET | view_rules | Список правил |
| `mgr/rules/create` | POST | manage_rules | Создание rule |
| `mgr/rules/update` | POST | manage_rules | Обновление |
| `mgr/rules/disable` | POST | manage_rules | Отключение |
| `mgr/accesses/list` | GET | view_accesses | Список выдач |
| `mgr/clients/list` | GET | view_accesses | Клиенты с доступами |
| `mgr/access/grant` | POST | manage_access | Выдача (`user_id` в modUser) |
| `mgr/access/revoke` | POST | manage_access | Отзыв |
| `mgr/access/extend` | POST | manage_access | Продление на N дней |
| `mgr/access/update` | POST | manage_access | Редактирование дат |
| `mgr/logs/list` | GET | view_logs | Журнал |
| `mgr/settings/get` | GET | view_products / manage_access | Текущие настройки |
| `mgr/settings/update` | POST | manage_settings | Сохранение настроек |
| `mgr/wizard/create-access` | POST | manage_groups / manage_rules / manage_products | Мастер (атомарное создание) |
| `mgr/resources/tree` | GET | view_groups | Дерево ресурсов MODX |
| `mgr/files/upload` | POST | manage_rules | Загрузка в protected_path |
| `mgr/resource/tariffs/list` | GET | view_rules | Тарифы ресурса |
| `mgr/resource/tariffs/attach` | POST | manage_rules | Привязка тарифа |
| `mgr/resource/tariffs/detach` | POST | manage_rules | Отвязка тарифа |
| `mgr/promocodes/list` | GET | manage_rules | Список промокодов |
| `mgr/promocodes/create` | POST | manage_rules | Создание промокода |
| `mgr/promocodes/disable` | POST | manage_rules | Отключение |
| `mgr/premiumblocks/list-all` | GET | manage_rules | Список premium blocks |
| `mgr/premiumblocks/create` | POST | manage_rules | Создание block |
| `mgr/premiumblocks/update` | POST | manage_rules | Обновление |
| `mgr/premiumblocks/archive` | POST | manage_rules | Архивация |

### mgr/dashboard/summary

Ответ `object`:

| Поле | Тип | Описание |
| --- | --- | --- |
| `activeAccesses` | int | Активные выдачи |
| `salesToday` | int | Выдачи через MS3 за сегодня |
| `revenueMinor` | int | Выручка в минорных единицах (копейки) |
| `currency` | string | Валюта MS3 |
| `expiringSoon` | int | Истекают в ближайшие N дней |
| `recentEvents` | array | Последние записи журнала |
| `health.status` | string | `ok` / warning |
| `health.label` | string | Текст для UI |

Элемент `recentEvents[]`: `id`, `createdAt`, `event`, `target`, `status`, `statusSeverity`.

## См. также

- [Интерфейс менеджера](../interface/index)
- [Интеграция — API витрины](../integration#api-витрины)
- [События MODX](events)
