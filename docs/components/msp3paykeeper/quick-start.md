---
title: Быстрый старт
description: Установка msp3PayKeeper, демо-кабинет, webhook и боевой режим
---

# Быстрый старт

Как принять первый платёж через PayKeeper на сайте с MiniShop3.

## Требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 3.x |
| MiniShop3 | beta с `ms3_payment_lifecycle` |
| PHP | 8.2+ |
| Сайт | HTTPS на webhook без 301 |

Для чека 54-ФЗ в заказе нужен email покупателя.

## Шаг 1: Провайдер modstore и установка пакета

Пакет зашифрован. Без провайдера установка завершится ошибкой `Package provider not found`.

1. **Система → Управление пакетами → Провайдеры** → добавьте **modstore.pro**:
   - URL: `https://modstore.pro/extras/`
   - Email и API-ключ из личного кабинета modstore.pro
2. Убедитесь, что установлен **MiniShop3**.
3. **Управление пакетами** → установите **msp3PayKeeper** (в **Show Details** укажите провайдер **modstore.pro**).
4. **Управление → Очистить кэш**.

Резолвер создаёт два способа оплаты:

| Название | Класс |
| --- | --- |
| Оплата через PayKeeper | `Msp3PayKeeper\Payment\PayKeeperPayment` |
| Оплата через PayKeeper (двухстадийная) | `Msp3PayKeeper\Payment\PayKeeperTwoStagePayment` |

Секреты положите в `msPayment.properties` способа. Если properties пусты, пакет читает системные настройки.

## Шаг 2: Демо-кабинет

В [примерах JSON API](https://docs.paykeeper.ru/vozmozhnosti-i-primery-ispolzovaniya/poluchenie-informatsii-o-spiske-platezhnyh-sistem-s-pomoshhyu-json-api/) PayKeeper публикует стенд:

- URL: `https://demo.paykeeper.ru`
- логин и пароль API: `demo` / `demo`

`GET /info/settings/token/` и `POST /change/invoice/preview/` на этой паре отвечают 200. `https://demo.server.paykeeper.ru` на те же логин и пароль токен не отдаёт.

Секретное слово POST-оповещений в открытой документации нет. Его задают в кабинете. Без него webhook не проверить. `send()` уже работает.

Карты смотрите на форме после перехода на `invoice_url`.

Проверка API на своём сервере: `GET {server_url}/info/settings/token/` с Basic Auth должен вернуть JSON с `token`.

## Шаг 3: Ключи в MODX

1. **Настройки → Системные настройки**, фильтр по пространству имён **`msp3paykeeper`**.
2. Для демо заполните:
   - **`msp3paykeeper_server_url`**: `https://demo.paykeeper.ru` (без `/` в конце)
   - **`msp3paykeeper_api_login`**: `demo`
   - **`msp3paykeeper_api_password`**: `demo`
   - **`msp3paykeeper_secret_word`**: слово из кабинета PayKeeper. Это не пароль API.

Те же имена без префикса можно положить в properties способа: `server_url`, `api_login`, `api_password`, `secret_word`. Properties имеют приоритет над системными настройками.

Подробнее: [Системные настройки](settings).

## Шаг 4: URL уведомлений в кабинете PayKeeper

Без этого шага заказ в MODX не перейдёт в оплаченный после успешной оплаты.

Укажите URL **с вашим доменом и HTTPS**:

```text
https://ваш-домен.ru/assets/components/msp3paykeeper/webhook.php
```

HTTPS без Basic Auth и без 301. PayKeeper шлёт form POST. Ядро MiniShop3 на `/api/v1/payment/webhook/{id}` ждёт JSON, этот адрес в кабинет не ставьте.

## Шаг 5: Способ оплаты в MiniShop3

1. В админке MiniShop3 откройте **Настройки → Оплаты**.
2. Включите **Оплата через PayKeeper**. Для холда включите **Оплата через PayKeeper (двухстадийная)** и двухэтапный режим в кабинете PayKeeper.
3. Привяжите способ к сценарию оформления заказа.

## Шаг 6: Боевой режим

1. Боевой сервер, логин API, пароль API, секретное слово POST-оповещений.
2. URL уведомлений на пакетный `webhook.php`.
3. Если нужна двухстадийка, включите её в кабинете и используйте второй способ оплаты.
4. Контрольный платёж. Проверьте `OK` в ответе webhook и статус заказа.
5. Выключите **`msp3paykeeper_debug`**.

Двухстадийный заказ не станет оплаченным, пока не спишете холд. Подробнее: [Интеграция](integration).
