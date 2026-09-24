---
title: Системные настройки
description: Ключи msp3PayKeeper, URL сервера, Basic Auth, секретное слово, чеки и URL возврата
---

# Системные настройки msp3PayKeeper

Краткая последовательность шагов: [Быстрый старт](quick-start).

Ключ в MODX: `msp3paykeeper_<имя>`. В properties способа те же имена без префикса (`server_url`, `api_login`, `api_password`, `secret_word`). Секреты сначала читаются из properties, иначе из системных настроек.

Где взять URL, логин и секретное слово: [Быстрый старт](quick-start#откуда-брать-ключи).

| Ключ | Тип | По умолчанию | Назначение |
| --- | --- | --- | --- |
| `msp3paykeeper_server_url` | text | пусто | Базовый URL без `/` в конце |
| `msp3paykeeper_api_login` | text | пусто | Basic Auth для токена |
| `msp3paykeeper_api_password` | password | пусто | Пароль API |
| `msp3paykeeper_secret_word` | password | пусто | Секрет POST-оповещений. Это не пароль API |
| `msp3paykeeper_payment_receipt` | bool | нет | Корзина 54-ФЗ в `service_name` |
| `msp3paykeeper_vat_code` | list | `1` | 1-10: none / vat0 / vat10 / vat20 и остальные из списка |
| `msp3paykeeper_success_url` | text | пусто | Возврат с оплаты. Пусто: страница благодарности MS3 |
| `msp3paykeeper_fail_url` | text | пусто | Возврат после ошибки |
| `msp3paykeeper_debug` | bool | нет | Подробный лог MODX. На бою выключите |

Проверка пары логин и пароль: `GET {server_url}/info/settings/token/` с Basic Auth. Ответ 200 содержит JSON с `token`. Ответ 401 значит, что логин или пароль API не те. Секретное слово на этот запрос не влияет.
