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
- **Баланс** — в [личном кабинете](https://dadata.ru/profile/#info) и на **Dashboard** в **Extras → mxDadata**. Отказы API при нулевом балансе зависят от DaData. Смотрите **Network** и [Логи](/components/mxdadata/admin-ui).
- Рост нагрузки: таблица **`mxdadata_cache`** (TTL **`mxdadata_cache_ttl`**) снижает повторы. При пиках трафика согласуйте тариф с [условиями DaData](https://dadata.ru/pricing/).

## «Payment is not configured» / ошибки не о том

Такой текст относится к **платёжным** модулям, не к mxDadata. Ищите в ответе API и в логе MODX строки с **mxDadata** / **DaData**.

## Заказ не создаётся после подсказки

Проверьте **`mxdadata_strict_validation`**, **`mxdadata_block_order_on_error`**, **обязательный FIAS** / **индекс** в [системных настройках](/components/mxdadata/settings#minishop3). Временно ослабьте настройки и повторите тест. Сообщение об ошибке приходит в **ответе** JSON API оформления заказа.

Повторная нормализация того же телефона, email или адреса читает **`body`** из **`mxdadata_cache`**. Чтобы сбросить ответы, нажмите **Очистить кеш** на Dashboard или уменьшите TTL.

## Админка не открывается

Установите **VueTools** (в `requires` транспорта) и выдайте право **`mxdadata_view`**. На витрину это **не** влияет.

## Логи раздуваются

В **Extras → mxDadata → Логи** есть фильтры по типу запроса, статусу и дате и просмотр request/response. **Ротация** удаляет записи старше **N** дней (**`mxdadata_log_retention_days`**, по умолчанию **30**). Ротация вручную или задача Scheduler **`mxdadata_rotate_logs`**. Если таблица растёт, уменьшите срок хранения.

**`mxdadata_log_level`**: `warning` (по умолчанию) и `error` пишут в **`mxdadata_log`** только статус ≠ 200. `debug` и **`mxdadata_debug_mode`** пишут и успешные запросы. **`LoggerService::debug()`** в лог MODX — только при уровне `debug`.

## Нужна универсальная форма без MS3

Сниппет **`mxDadataForm`** с **`suggestions`** или **`suggestionsChunk`**. См. [mxDadataForm](/components/mxdadata/snippets/mxDadataForm). В Fenom для большого JSON удобнее **чанк** с чистым JSON, чем длинный параметр. В шаблонах с `{extends}` / `{block}` чаще передают **`suggestionsChunk`**, чтобы JSON не терялся при отрисовке.

## Нужен список полей `name` и демо

См. [Имена полей формы MiniShop3](/components/mxdadata/frontend#имена-полей-формы-minishop3) и [Демо чанка](/components/mxdadata/frontend#демо-чанка).
