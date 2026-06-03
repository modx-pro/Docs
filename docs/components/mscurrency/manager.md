---
title: Управление валютами
description: Админка msCurrency, connector API, провайдеры курсов, cron, права доступа
---

# Управление валютами

Пункт меню: **MiniShop3 → Валюты (msCurrency)**.

Интерфейс на **Vue 3 + PrimeVue 4** (как вкладки MS3). Нужен **[VueTools](https://docs.modx.pro/components/vuetools/)** — без него контроллер покажет предупреждение и не загрузит ESM-модуль.

## Вкладки

| Вкладка | Назначение |
|---------|------------|
| **Валюты** | CRUD, флаги base/active, ручные rate/coefficient/val, колонка **Авто**, кнопка «Синхронизировать курсы», поиск по коду/названию |
| **Поставщики курсов** | Включение провайдеров из `msc_providers` |
| **Привязки** | Связь `provider_id` + `currency_id` + `external_code` (код валюты у источника) |

### Поля валюты

| Поле | Описание |
|------|----------|
| `code` | Три латинские буквы (USD, EUR, RUB) |
| `rate` | Курс от провайдера или ручной |
| `coefficient` | Множитель к курсу (наценка/скидка) |
| `val` | `rate × coefficient`, пересчитывается при сохранении и синхронизации |
| `base` | Ровно одна базовая валюта в системе |
| `active` | Показывать на витрине и в переключателе |

Базовую валюту удалить нельзя.

## Валюты по умолчанию

При установке пакета резолвер добавляет (если записей ещё нет):

| Код | Активна | Базовая |
|-----|---------|---------|
| RUB | да | да |
| USD | да | нет |
| EUR | да | нет |
| UAH, BYN, KZT | нет | нет |

Поставщики: **ЦБ РФ** (включён), НБУ, НБРБ, НБК. Привязки для автообновления создаются автоматически (CBR → USD/EUR и т.д.).

> Для Беларуси используйте код **BYN** (актуальный ISO), не **BYR** (снят с ISO).

## Права доступа

Connector проверяет `mscurrency_user_can_manage()`:

- право **`mscurrency_save`** (рекомендуется контент-менеджеру магазина), **или**
- стандартное право MODX **`save`**.

Право **`view`** не даёт изменять валюты и курсы.

## Ключ API и авторизация

### Встроенные поставщики

**Отдельный ключ в msCurrency не вводится.** Классы ходят на открытые официальные URL:

| Поставщик | Код (`getKey`) | Источник |
|-----------|----------------|----------|
| ЦБ РФ | `cbr_ru` | cbr.ru/scripts/XML_daily.asp |
| НБУ | `nbu_ua` | bank.gov.ua (JSON) |
| НБРБ | `nbrb_by` | nbrb.by/api/exrates |
| НБК | `nbk_kz` | nationalbank.kz/rss |

Нужен исходящий HTTPS с сервера MODX. При блокировке доменов ошибки попадут в `errors[]` после синхронизации.

Колонка «Код провайдера» в админке — **внутренний идентификатор**, не API-ключ.

### Свой поставщик курсов

1. PHP-файл в `core/components/mscurrency/providers/`, namespace `mscurrency\Providers\`.
2. Класс — наследник `AbstractMscRateProvider`: `getKey()`, `getCodes()`, `getCourse()`, `run()`.
3. **Поставщики курсов → Добавить поставщика** → выбор класса.
4. При необходимости — вкладка **Привязки** (`external_code` ≠ `code` сайта).

Секрет платного API храните в системной настройке MODX или JSON в `msc_providers.properties` — не в git.

Пример в репозитории: `providers/ExampleStaticRateProvider.php`.

## Connector API

URL: `assets/components/mscurrency/connector.php`
Метод: **POST**, параметр `action`.

### Валюты

| action | Параметры |
|--------|-----------|
| `mgr/currency/getlist` | — |
| `mgr/currency/create` | `code`, `name`, `rate`, `coefficient`, `val`, `rank`, `active`, `base`, `symbol_*` |
| `mgr/currency/update` | `id` + поля |
| `mgr/currency/remove` | `id` |

### Поставщики и привязки

| action | Параметры |
|--------|-----------|
| `mgr/provider/getlist` | — |
| `mgr/provider/get` | `id` |
| `mgr/provider/scan` | — |
| `mgr/provider/create` | `name`, `class` |
| `mgr/provider/update` | `id`, `name`, `active` |
| `mgr/providerlink/getlist` | — |
| `mgr/providerlink/create` | `provider_id`, `currency_id`, `external_code` |
| `mgr/providerlink/remove` | `id` |

### Курсы

| action | Параметры | Ответ |
|--------|-----------|-------|
| `mgr/rates/sync` | `provider_key` (опционально) | `object.updated`, `object.errors[]` |

Синхронизация идёт по **активным** провайдерам. Если заданы привязки, обновляются только связанные валюты. Без привязок сопоставление идёт по коду (`USD` → `USD`).

### Витрина

| action | Параметры |
|--------|-----------|
| `web/currency/set` | `id` или `currency_id` — ID валюты |

Вызывается из `default.min.js`. Connector для web задаёт `ctx=web`, иначе MODX ответит **401**.

## Cron

```bash
php core/components/mscurrency/cron/sync_rates.php
php core/components/mscurrency/cron/course.php
```

Пример crontab (два раза в день):

```cron
0 8,20 * * * /usr/bin/php /path/to/modx/core/components/mscurrency/cron/sync_rates.php
```

Выборочный провайдер: `mscurrency_default_provider` = `cbr_ru` или POST `provider_key=cbr_ru` в `mgr/rates/sync`.

## См. также

- [Быстрый старт](quick-start)
- [Системные настройки](settings)
- [События MODX](events)
