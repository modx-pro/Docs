---
title: FAQ
description: "Частые сбои msp3PayKeeper: ключи, webhook, возврат, токен"
---

# FAQ

## Payment is not configured

Пустые `server_url`, логин или пароль. Проверьте properties способа, затем системные настройки, затем кеш.

## Webhook 401 / Error

Неверный `secret_word` или обработчик недоступен по HTTPS. Секрет оповещений и пароль API это разные поля.

URL в кабинете:

```text
https://ваш-домен.ru/assets/components/msp3paykeeper/webhook.php
```

HTTPS без Basic Auth и без 301.

## Нет идентификатора платежа на возврате

Возврат идёт по `id` из уведомления. `invoice_id` для reverse не подходит. Пока попытка `pending` или `authorized`, вкладка не зовёт `reverse`: сначала webhook или capture.

## Настройки заполнены, токен не берётся

`GET {server_url}/info/settings/token/` с Basic Auth. Если 401, логин или пароль API не те.

Для демо используйте `https://demo.paykeeper.ru` и пару `demo` / `demo`. `https://demo.server.paykeeper.ru` на эти логин и пароль токен не отдаёт.
