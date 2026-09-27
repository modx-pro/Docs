---
title: FAQ
---

# FAQ

Пошаговая установка: [Быстрый старт](quick-start). Админка: [Админка в MODX](admin-ui). Поля формы и демо: [Подключение на сайте](frontend).

## Подсказки не появляются

1. Заполнены **`mxdadata_api_token`** (и **Secret** для Clean/Party на сервере).
2. **`mxdadata_enabled`** = «Да».
3. Сниппет вызван **некэшированно** (`[[!…]]` или Fenom `!snippet`).
4. Селектор поля совпадает с разметкой: задайте **`input`** для адреса / **`innInput`** для ИНН. Значение **`input`** по умолчанию из транспорта: `[name="address"], #address, [name="address_text_address"]`, без `#mxdadata-order-address`.
5. Во вкладке **Network** запросы к `connector-web.php` возвращают JSON без 403/500. При проблемах с квотой DaData смотрите кабинет и [Логи](admin-ui).
6. Поле для подсказки **уже в DOM** в момент инициализации скрипта (порядок сниппетов и AJAX-вставка формы).

## 429, лимиты и баланс DaData {#429-лимиты-и-баланс-dadata}

- **HTTP 429** (Too Many Requests): превышен лимит запросов **к DaData** или **внутренняя** защита. Увеличивайте [`mxdadata_throttle_rpm`](/components/mxdadata/settings#основные) только если понимаете последствия. Проверьте, что с одной страницы нет лишних вызовов (дубли сниппетов, автокомплит в цикле).
- **Баланс** — в [личном кабинете](https://dadata.ru/profile/#info) и на **Dashboard** в **Extras → mxDadata**. Отказы API при нулевом балансе зависят от DaData. Смотрите **Network** и [Логи](admin-ui).
- Рост нагрузки: кэш **`cacheManager`** (`mxdadata_*`) снижает повторы. При пиках трафика согласуйте тариф с [условиями DaData](https://dadata.ru/pricing/).

## «Payment is not configured» / ошибки не о том

Такой текст относится к **платёжным** модулям, не к mxDadata. Ищите в ответе API и в логе MODX строки с **mxDadata** / **DaData**.

## Заказ не создаётся после подсказки

Проверьте **`mxdadata_strict_validation`**, **`mxdadata_block_order_on_error`**, **обязательный FIAS** / **индекс** в [системных настройках](settings#minishop3). Временно ослабьте настройки и повторите тест. Сообщение об ошибке приходит в **ответе** JSON API оформления заказа.

Если валидация Clean срабатывает повторно на те же данные, возможен конфликт формата **кэш-hit** Clean без **`body[0]`** ([issue #4](https://github.com/Ibochkarev/mxDadata/issues/4)).

## Админка не открывается

Установите **VueTools** (в `requires` транспорта) и выдайте право **`mxdadata_view`**. На витрину это **не** влияет.

## Логи раздуваются

В **Extras → mxDadata → Логи** есть фильтры по типу запроса, статусу и дате и просмотр request/response. **Ротация** удаляет записи старше **N** дней (**`mxdadata_log_retention_days`**, по умолчанию **30**). Ротация вручную или задача Scheduler **`mxdadata_rotate_logs`**. Если таблица растёт, уменьшите срок хранения.

**`mxdadata_log_level`** **не** отключает запись Suggest/Clean/Party в **`mxdadata_log`** ([issue #5](https://github.com/Ibochkarev/mxDadata/issues/5)). Он влияет на **`LoggerService::debug()`** в лог MODX.

## Нужна универсальная форма без MS3

Сниппет **`mxDadataForm`** с **`suggestions`** или **`suggestionsChunk`**. См. [mxDadataForm](snippets/mxDadataForm). В Fenom для большого JSON удобнее **чанк** с чистым JSON, чем длинный параметр. В шаблонах с `{extends}` / `{block}` чаще передают **`suggestionsChunk`**, чтобы JSON не «терялся» при отрисовке.

## Нужен список полей `name` и демо

См. [Имена полей формы MiniShop3](frontend#имена-полей-формы-minishop3) и [Демо чанка](frontend#демо-чанка).
