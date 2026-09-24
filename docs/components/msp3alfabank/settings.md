---
title: Системные настройки
description: Логин и пароль Альфа-Банка, тестовый и боевой шлюз, валюта и URL возврата
---

# Системные настройки msp3AlfaBank

Установка и ключи: [Быстрый старт](quick-start).

Ключ в MODX: `msp3alfabank_<имя>`. Логин и пароль можно положить в `msPayment.properties` (`user_name` или `login`, `password` или `secret`). Если properties пусты, пакет читает системные настройки.

После смены настроек очистите кеш MODX. Иначе создание платежа идёт со старыми значениями.

Где взять логин и какой адрес шлюза выбрать: [Быстрый старт](quick-start#откуда-брать-ключи).

| Ключ | Тип | По умолчанию | Назначение |
| --- | --- | --- | --- |
| `msp3alfabank_user_name` | text | пусто | Логин API с суффиксом `-api` |
| `msp3alfabank_password` | password | пусто | Пароль из письма банка |
| `msp3alfabank_test_mode` | bool | да | Да: `alfa.rbsuat.com`. Нет: `pay.alfabank.ru` |
| `msp3alfabank_api_base_url` | text | пусто | Свой адрес шлюза. Для логина `r-` часто `payment.alfabank.ru` |
| `msp3alfabank_currency` | text | `643` | Числовой код валюты. `643` это рубль |
| `msp3alfabank_json_params_extra` | textarea | пусто | Дополнительный JSON к служебным полям платежа |
| `msp3alfabank_success_url` | text | пусто | Куда вернуть покупателя после оплаты. Пусто: страница благодарности MS3 |
| `msp3alfabank_fail_url` | text | пусто | Куда вернуть после ошибки. Пусто: та же страница с `payment_fail=1` |
| `msp3alfabank_debug` | bool | нет | Подробный лог создания платежа и успешного колбэка. На бою выключите |
