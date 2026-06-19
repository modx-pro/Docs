---
title: Управление валютами
description: Админка msCurrency, дашборд курсов, connector API, провайдеры, cron, права доступа
---

# Управление валютами

Пункт меню: **MiniShop3 → Валюты (msCurrency)**.

Интерфейс на **Vue 3 + PrimeVue 4** (как вкладки MS3). Нужен **[VueTools](https://docs.modx.pro/components/vuetools/)** — без него контроллер покажет предупреждение и не загрузит ESM-модуль.

Артефакты сборки: `assets/components/mscurrency/js/mgr/vue-dist/mscurrency-admin.min.{js,css}`. При установке из transport бандл уже включён.

## Вкладки

| Вкладка | Назначение |
|---------|------------|
| **Дашборд курсов** | KPI (валют в списке, последний sync, **устаревшие курсы**), журнал последних sync, таблица: предыдущий курс, **Δ**, дата обновления, дней без sync (порог — `mscurrency_stale_rate_days`). Только **активные не-базовые** валюты; без единого sync — тег **«Нет sync»** |
| **Валюты** | CRUD, флаги base/active, rate/coefficient/val, **округление цены** (`price_rounding`), колонка **Авто**, кнопка «Синхронизировать курсы», поиск и сортировка |
| **Поставщики курсов** | Включение провайдеров; колонка **«Валюта котировок»** — в какой валюте источник отдаёт курсы; при несовпадении с базовой — предупреждение (провайдер будет пропущен при sync) |
| **Привязки** | Связь `provider_id` + `currency_id` + `external_code`; провайдер и валюта проверяются на существование |

### Поля валюты

| Поле | Описание |
|------|----------|
| `code` | Три латинские буквы (USD, EUR, RUB) |
| `rate` | Курс от провайдера или ручной (должен быть > 0) |
| `coefficient` | Множитель к курсу (наценка/скидка) |
| `val` | `rate × coefficient`, пересчитывается при сохранении и синхронизации |
| `price_rounding` | `none`, `round`, `ceil`, `floor`, `to_99` — округление на витрине |
| `base` | Ровно одна базовая валюта в системе |
| `active` | Показывать на витрине и в переключателе |

Базовую валюту удалить нельзя. Колонка **Авто** = есть привязка к **активному** поставщику.

## Валюты и поставщики по умолчанию

При установке пакета резолвер добавляет (если записей ещё нет):

| Код | Активна | Базовая |
|-----|---------|---------|
| RUB | да | да |
| USD | да | нет |
| EUR | да | нет |
| UAH, BYN, KZT | нет | нет |

Поставщики (классы в `Infrastructure\Rates\`):

| Поставщик | Код (`getKey`) | По умолчанию |
|-----------|----------------|--------------|
| ЦБ РФ | `cbr_ru` | **включён** |
| ECB (котировки в EUR) | `ecb_euro` | выключен; sync только при базовой валюте EUR |
| НБУ | `nbu_ua` | выключен |
| НБРБ | `nbrb_by` | выключен |
| НБК | `nbk_kz` | выключен |

Привязки для автообновления создаются автоматически (CBR → USD/EUR; НБУ → UAH; НБРБ → BYN; НБК → KZT). После установки нажмите **Синхронизировать курсы** или настройте cron.

> Для Беларуси используйте код **BYN** (актуальный ISO), не **BYR**.

## Права доступа

Connector проверяет `mscurrency_user_can_manage()`:

- право **`mscurrency_save`** (рекомендуется контент-менеджеру магазина), **или**
- стандартное право MODX **`save`**.

Право **`view`** не даёт изменять валюты и курсы.

## Ключ API и авторизация

### Встроенные поставщики

**Отдельный ключ в msCurrency не вводится.** Классы ходят на открытые официальные URL:

| Поставщик | Код | Источник |
|-----------|-----|----------|
| ЦБ РФ | `cbr_ru` | cbr.ru/scripts/XML_daily.asp |
| ECB | `ecb_euro` | ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml |
| НБУ | `nbu_ua` | bank.gov.ua (JSON) |
| НБРБ | `nbrb_by` | nbrb.by/api/exrates |
| НБК | `nbk_kz` | nationalbank.kz/rss |

Нужен исходящий HTTPS с сервера MODX. `HttpRateClient` предпочитает cURL. При блокировке доменов ошибки попадут в `errors[]` после синхронизации — отключите неиспользуемого поставщика.

Колонка «Код провайдера» — **внутренний идентификатор**, не API-ключ.

### Свой поставщик курсов

1. PHP-файл в `core/components/mscurrency/providers/`, namespace `mscurrency\Providers\`.
2. Класс — наследник `AbstractMscRateProvider`: `getKey()`, `getCodes()`, `getCourse()`, `run()` / `fetchRates()`.
3. **Поставщики курсов → Добавить поставщика** → выбор класса (action `mgr/provider/scan`).
4. При необходимости — вкладка **Привязки** (`external_code` ≠ `code` сайта).

Секрет платного API храните в системной настройке MODX или JSON в `msc_providers.properties` — не в git.

Пример: `providers/ExampleStaticRateProvider.php`.

## Connector API

URL: `assets/components/mscurrency/connector.php`
Метод: **POST**, параметр `action`.

### Валюты

| action | Параметры |
|--------|-----------|
| `mgr/currency/getlist` | — |
| `mgr/currency/create` | `code`, `name`, `rate`, `coefficient`, `val`, `rank`, `active`, `base`, `symbol_*`, `price_rounding` |
| `mgr/currency/update` | `id` + поля |
| `mgr/currency/remove` | `id` (нельзя удалить base) |

### Поставщики и привязки

| action | Параметры |
|--------|-----------|
| `mgr/provider/getlist` | — (в ответе `reference_currency`, `reference_mismatch`) |
| `mgr/provider/get` | `id` |
| `mgr/provider/scan` | — |
| `mgr/provider/create` | `name`, `class` |
| `mgr/provider/update` | `id`, `name`, `active` |
| `mgr/providerlink/getlist` | — |
| `mgr/providerlink/create` | `provider_id`, `currency_id`, `external_code` |
| `mgr/providerlink/remove` | `id` |

### Курсы

| action | Параметры | Ответ `object` |
|--------|-----------|----------------|
| `mgr/rates/sync` | `provider_key` (опционально) | `updated`, `errors[]` |
| `mgr/rates/dashboard` | — | `last_sync`, `recent_syncs[]`, `currencies[]`, `stale_after_days`, `stale_count` |

Синхронизация идёт по **активным** провайдерам. С привязками обновляются только связанные валюты; без привязок — сопоставление по коду (`USD` → `USD`).

Перед обновлением проверяется **валюта котировок** провайдера: несовпадение с базовой → провайдер пропускается, ошибка в `errors[]`. Курсы `≤ 0` игнорируются.

После каждого sync пишется **`msc_sync_log`**. В `msc_currency` сохраняются **`previous_rate`** и **`rate_updated_at`** — для дашборда и колонки Δ.

### Витрина

| action | Параметры | Ответ |
|--------|-----------|-------|
| `web/currency/set` | `id` или `currency_id`; при AJAX — `pids[]` | `{ success }` или полный `object` при `mscurrency_ajax_switch=1` |

Вызывается из `default.min.js`. Connector для web задаёт `ctx=web`, иначе MODX ответит **401**.

## Cron

```bash
php core/components/mscurrency/cron/sync_rates.php
php core/components/mscurrency/cron/course.php
```

Пример crontab (два раза в день):

```bash
0 8,20 * * * /usr/bin/php /path/to/modx/core/components/mscurrency/cron/sync_rates.php
```

Выборочный провайдер: `mscurrency_default_provider` = `cbr_ru` или POST `provider_key=cbr_ru` в `mgr/rates/sync`. Код выхода `1`, если в ответе sync есть ошибки.

## См. также

- [Быстрый старт](quick-start)
- [Системные настройки](settings)
- [События MODX](events)
