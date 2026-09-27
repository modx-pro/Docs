---
title: Админка в MODX
---

# Админка в MODX

Раздел **Extras → mxDadata**: вкладки **Dashboard**, **Юрлица** и **Логи**. Ключи DaData, MiniShop3, лимит запросов и TTL кэша задаются только в [системных настройках](/components/mxdadata/settings) (`mxdadata`).

## Требования и доступ

- **[VueTools](https://docs.modx.pro/components/vuetools/)** входит в `requires` транспорта для админки. Без VueTools resolver пишет предупреждение. Сниппеты на **витрине** работают независимо.
- Пункт **Extras → mxDadata** виден при праве **`mxdadata_view`**. Шаблон политики **`mxDadataUserPolicyTemplate`**, политика **`mxDadataUserPolicy`** (права из пакета):

| Право | Назначение |
|-------|------------|
| **`mxdadata_view`** | Открыть раздел mxDadata в Extras |
| **`mxdadata_edit`** | Редактирование (зарезервировано под настройки через менеджер) |
| **`mxdadata_logs`** | Работа с журналом на вкладке **Логи** |
| **`mxdadata_cache_clear`** | Кнопка очистки кэша на Dashboard |

Подменю **Настройки** ведёт в **Системные настройки** с `ns=mxdadata` (те же 18 ключей, что в [справочнике](/components/mxdadata/settings)).

## Вкладки

| Вкладка | Назначение |
|---------|------------|
| **Dashboard** | KPI: статус API, баланс (руб.), запросы и ошибки за сегодня. Карточка **Подключение**: **Тест соединения**, текущий TTL кэша (`mxdadata_cache_ttl`), **Очистить кеш** |
| **Юрлица** | Поиск организации по ИНН (Party), таблица полей автозаполнения, сырой JSON |
| **Логи** | Таблица запросов, фильтры, просмотр request/response, **Ротация логов** |

Отдельных Vue-вкладок **API**, **miniShop3**, **Кеш** и **Общие** в интерфейсе нет (лексиконы и методы сохранения в коде остались без разметки).

## Dashboard → Подключение

1. [Кабинет DaData](https://dadata.ru/profile/#info) — **Token** и **Secret** задаются в [системных настройках](/components/mxdadata/settings), не на Dashboard.
2. **Тест соединения** проверяет доступ к API с текущими ключами.
3. **Очистить кеш** удаляет строки **`mxdadata_cache`**. Кэш MODX и счётчик **`RateLimiter`** не трогает.

## Логи

- **Фильтры:** тип запроса, статус, даты
- **Просмотр:** модальное окно с request/response
- **Ротация:** удаление записей старше N дней (`mxdadata_log_retention_days`, по умолчанию 30). В **Scheduler** можно включить задачу **`mxdadata_rotate_logs`** (процессор **`Logs/Rotate`**)

Уровень **`mxdadata_log_level`** режет INSERT в **`mxdadata_log`**: при `warning` и `error` успешные ответы (200) в таблицу не попадают.

## Юрлица (Party)

Проверка API и справочника: введите ИНН. Увидите поля, которые **mxDadataPartySuggest** подставляет в форму (`inn`, `company_name`, `kpp`, `ogrn`, юр. адрес и т.д.). Party при **оформлении заказа** плагином **не** вызывается.

## Режим разработки

**`mxdadata_debug_mode`** усиливает **`LoggerService::debug()`** (лог MODX). Отладка на **витрине**: `?mxdadata_debug=1` в [Интеграции](/components/mxdadata/integration#отладка-на-витрине). Ответы **`connector-web.php`** без текста исключения в JSON.
