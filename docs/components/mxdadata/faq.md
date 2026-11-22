---
title: FAQ
---

# FAQ

Пошаговая установка: [Быстрый старт](/components/mxdadata/quick-start). Админка: [Админка в MODX](/components/mxdadata/admin-ui). Поля формы и демо: [Подключение на сайте](/components/mxdadata/frontend).

## Подсказки не появляются

1. Заполнены **`mxdadata_api_token`** (и **Secret** для Clean/Party на сервере).
2. **`mxdadata_enabled`** = «Да».
3. Сниппет вызван **некэшированно** (`[[!…]]` или Fenom `!snippet`).
4. Селектор поля совпадает с разметкой: задайте **`input`** для адреса / **`innInput`** для ИНН. Значение **`input`** по умолчанию из транспорта: `[name="address"], #address, [name="address_text_address"]`, без `#mxdadata-order-address`.
5. Во вкладке **Network** запросы к `connector-web.php` возвращают JSON без 403/500. При проблемах с квотой DaData смотрите кабинет и [Логи](/components/mxdadata/admin-ui).
6. Поле для подсказки **уже в DOM** в момент инициализации скрипта (порядок сниппетов и AJAX-вставка формы).

## 429, лимиты и баланс DaData {#429-лимиты-и-баланс-dadata}

- **HTTP 429** (Too Many Requests): превышен лимит запросов **к DaData** или **внутренняя** защита. Увеличивайте [`mxdadata_throttle_rpm`](/components/mxdadata/settings#основные) только если понимаете последствия. Проверьте лишние вызовы с одной страницы: дубли сниппетов, автокомплит в цикле.
- **Баланс** — в [личном кабинете](https://dadata.ru/profile/#info) и на вкладке **Обзор** в **Extras → mxDadata**. Отказы API при нулевом балансе зависят от DaData. Смотрите **Network** и [Логи](/components/mxdadata/admin-ui).
- Рост нагрузки: таблица **`mxdadata_cache`** (TTL **`mxdadata_cache_ttl`**) снижает повторы. При пиках трафика согласуйте тариф с [условиями DaData](https://dadata.ru/pricing/).

## «Payment is not configured» / ошибки не о том

Такой текст относится к **платёжным** модулям, не к mxDadata. Ищите в ответе API и в логе MODX строки с **mxDadata** / **DaData**.

## Заказ не создаётся после подсказки

Проверьте **`mxdadata_strict_validation`**, **`mxdadata_block_order_on_error`**, **обязательный FIAS** / **индекс** в [системных настройках](/components/mxdadata/settings#minishop3). Временно ослабьте настройки и повторите тест. Сообщение об ошибке приходит в **ответе** JSON API оформления заказа.

Повторная нормализация того же телефона, email или адреса читает **`body`** из **`mxdadata_cache`**. Чтобы сбросить ответы, нажмите **Очистить кеш** на вкладке **Обзор** или уменьшите TTL.

## Как удалить данные

При удалении пакета таблицы `mxdadata_cache` и `mxdadata_log` сохраняются. Снесите их вручную:

```sql
DROP TABLE {prefix}mxdadata_cache, {prefix}mxdadata_log;
```

Колонка `fias_id` в `{prefix}ms3_order_addresses`, добавленная резолвером, остаётся: пакет её не удаляет.

## Обновление с ранних сборок

Резолвер переименовывает legacy-таблицы `msdadata2_cache` и `msdadata2_log` в `mxdadata_*`, так что кэш и журнал переживают обновление.

## Админка не открывается

Установите **VueTools** ≥ 1.1.1 (в `requires` транспорта) и выдайте право **`mxdadata_view`**. На витрину это **не** влияет.

## Установка падает с `Package provider not found`

Транспорт зашифрован, ключ расшифровки берётся с [modstore.pro](https://modstore.pro/extras/). Подключите этот репозиторий в **Extras → Installer → Управлять репозиториями** и повторите установку. Без провайдера `EncryptedVehicle` не может расшифровать пакет и установка обрывается.

Проверьте также расширения PHP: пакету нужны `curl`, `mbstring`, `openssl`.

## Настройки не сохраняются из админки

Так и задумано: в панели нет полей и кнопки сохранения, процессор `Settings/Save` из интерфейса не вызывается. Меняйте ключи в **Настройки → Системные настройки** (`ns=mxdadata`). Вкладки **API**, **miniShop3**, **Кеш**, **Общие** есть только в лексиконе, панелей для них в интерфейсе нет.

## Логи раздуваются

В **Extras → mxDadata → Логи** есть фильтры по типу запроса, статусу и дате и просмотр request/response. **Ротация** удаляет записи старше **N** дней (**`mxdadata_log_retention_days`**, по умолчанию **30**). Ротация вручную или задача Scheduler **`mxdadata_rotate_logs`**, которую резолвер создаёт процессорной: она вызывает `Logs/Rotate` в пространстве `mxdadata` без расписания, задайте его в Scheduler.

**`mxdadata_log_level`**: `warning` (по умолчанию) и `error` работают одинаково и пишут в **`mxdadata_log`** только записи со статусом ≠ 200. `debug` и **`mxdadata_debug_mode`** пишут и успешные запросы. **`LoggerService::debug()`** в лог MODX пишет только при уровне `debug`.

## Кто видит Secret

Любой менеджер, которому доступен пункт **Extras → mxDadata**: процессор `Settings/Get` возвращает `mxdadata_api_secret` в JSON, и админка кладёт его в состояние компонента. Права `mxdadata_edit`, `mxdadata_logs` и `mxdadata_cache_clear` объявлены, но код их не проверяет. Не выдавайте `mxdadata_view` пользователям, которым Secret не нужен. Подробности: [Для разработчиков](/components/mxdadata/developer#ключи-в-браузере).

## Язык интерфейса

Локализация `ru` и `en` полные, `ua` частичная. У менеджера с украинским языком часть подписей, включая названия вкладок, выведется сырыми ключами лексикона (`mxdadata_tab_dashboard` и другие).

## Нужна универсальная форма без MS3

Сниппет **`mxDadataForm`** с **`suggestions`** или **`suggestionsChunk`**. См. [mxDadataForm](/components/mxdadata/snippets/mxDadataForm). В Fenom для большого JSON удобнее **чанк** с чистым JSON, чем длинный параметр. В шаблонах с `{extends}` / `{block}` чаще передают **`suggestionsChunk`**, чтобы JSON не терялся при отрисовке.

## Нужен список полей `name` и демо

См. [Имена полей формы MiniShop3](/components/mxdadata/frontend#имена-полей-формы-minishop3) и [Демо чанка](/components/mxdadata/frontend#демо-чанка).
