---
title: Интерфейс менеджера
description: 'SPA PremiumAccess в менеджере MODX — вкладки, права и connector API'
---
<!-- TODO: translate from docs/components/premiumaccess/interface/index.md -->

# Интерфейс менеджера

**Компоненты → PremiumAccess** — SPA на Vue 3 + PrimeVue 4. Требуется **[VueTools](/components/vuetools/)** 1.1.2-pl+.

Без VueTools контроллер покажет предупреждение. Артефакты: `assets/components/premiumaccess/js/mgr/vue-dist/premiumaccess-admin.min.{js,css}`.

![Вкладки SPA PremiumAccess](/components/premiumaccess/screenshots/navigation.png)

## Карта вкладок

| Вкладка | Маршрут | Документ |
| --- | --- | --- |
| **Панель** | `/dashboard` | [Панель](#панель) |
| **Продукты** | `/products` | [Продукты и правила — тариф](products-and-rules#access-product) |
| **Промокоды** | `/promo-codes` | [Промокоды](accesses-and-clients#промокоды) |
| **Правила** | `/rules` | [Продукты и правила — правило](products-and-rules#access-rule) |
| **Группы** | `/groups` | [Продукты и правила — группа](products-and-rules#access-group) |
| **Premium-блоки** | `/premium-blocks` | [Premium blocks](resources-and-blocks#premium-blocks) |
| **Ресурсы** | `/resources` | [Ресурсы и premium blocks](resources-and-blocks#ресурсы) |
| **Мастер** | `/wizard` | [Мастер доступа](wizard) |
| **Клиенты** | `/clients` | [Клиенты](accesses-and-clients#вкладка-клиенты) |
| **Доступы** | `/accesses` | [Доступы](accesses-and-clients#вкладка-доступы) |
| **Журнал** | `/logs` | [Журнал](#журнал) |
| **Настройки** | `/settings` | [Настройки SPA](#настройки-spa) |

Отдельной вкладки на форме ресурса MODX нет. Вся настройка в SPA.

## Панель {#панель}

![Панель PremiumAccess — показатели и последние события](/components/premiumaccess/screenshots/dashboard.png)

`GET mgr/dashboard/summary`:

| Поле | Описание |
| --- | --- |
| `activeAccesses` | Число активных выдач доступа |
| `salesToday` | Выдачи через MS3 за сегодня |
| `revenueMinor` | Выручка в минорных единицах (копейки) |
| `currency` | Валюта из MS3 |
| `expiringSoon` | Доступы, истекающие в ближайшие N дней |
| `health.status` / `health.label` | Состояние компонента (ok / warning) |
| `recentEvents` | Последние записи журнала |

Элемент `recentEvents[]`: `id`, `createdAt`, `event`, `target`, `status`, `statusSeverity`.

Право: `premiumaccess_view_products` или `manage_access`.

JSON-схема: [Connector API — dashboard/summary](../development/api#mgrdashboardsummary).

## Журнал {#журнал}

![Журнал PremiumAccess](/components/premiumaccess/screenshots/logs.png)

`pa_access_logs`. Список с пагинацией: `mgr/logs/list`.

Примеры `event`: `promo_redeem`, `access_expired`, `auto_renewal_reminder`, выдача и отзыв.

Фильтры по дате, пользователю, продукту. Компактный формат даты в таблице.

## Права доступа

Namespace `premiumaccess`:

| Право | Назначение |
| --- | --- |
| `premiumaccess_view_products` | Продукты, чтение панели |
| `premiumaccess_manage_products` | Создание и редактирование продуктов |
| `premiumaccess_view_groups` | Группы, дерево ресурсов |
| `premiumaccess_manage_groups` | Группы, мастер |
| `premiumaccess_view_rules` | Правила, список тарифов |
| `premiumaccess_manage_rules` | Правила, блоки, промокоды, тарифы |
| `premiumaccess_view_accesses` | Доступы, клиенты |
| `premiumaccess_manage_access` | Выдача, отзыв, продление |
| `premiumaccess_view_logs` | Журнал |
| `premiumaccess_manage_settings` | Сохранение настроек |

Вход в CMP: MODX **`view`**.

Изменяющие запросы: **POST** + header **`HTTP_MODAUTH`** + право на action.

## Connector

URL: `assets/components/premiumaccess/connector.php`

| ctx | Назначение |
| --- | --- |
| `mgr` | SPA (см. вкладки выше) |
| `web` | check, status, renew-link, cabinet, files, promo |

Полный справочник actions и прав: [Connector API](../development/api).

Скачивание файлов — отдельно: `download.php?token=…`

Пагинация списков менеджера: `start`, `limit`, `sort`, `dir` → `{ success, total, items }`.

## Настройки SPA и системные настройки {#настройки-spa}

![Настройки PremiumAccess](/components/premiumaccess/screenshots/settings.png)

**Настройки** в SPA: включение компонента, статусы MS3, каталог защищённых файлов, TTL кэша, секция **«Уведомления и cron»**.

**Только системные настройки MODX:** `core_path`, `assets_url`, `locked_cta_chunk`, `front_css`, `front_js`, `working_templates`.

## Рекомендуемый порядок работы

1. [Мастер](wizard) — новый платный раздел.
2. [Ресурсы](resources-and-blocks) — одна страница.
3. [Premium-блоки](resources-and-blocks) — частично платная статья.
4. [Промокоды](accesses-and-clients#промокоды) — подарочный доступ без оплаты.
5. [Доступы](accesses-and-clients) — ручная выдача для B2B.

## См. также

- [Быстрый старт](../quick-start)
- [События MODX](../development/events)
- [FAQ](../faq)
