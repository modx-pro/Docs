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
| MiniShop3 | [1.14.0-beta1](https://github.com/modx-pro/MiniShop3/releases/tag/v1.14.0-beta1) и новее |
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

## Откуда брать ключи {#откуда-брать-ключи}

Для демо хватает публичного стенда из [шага 3](#шаг-3-демо-кабинет). Ниже путь в кабинете, которым вы сами управляете.

### URL сервера

**`msp3paykeeper_server_url`** это адрес кабинета PayKeeper без `/` в конце. Его видно в адресной строке, когда вы открываете личный кабинет.

Публичный демо-стенд: `https://demo.paykeeper.ru`. Тот же логин `demo` на `https://demo.server.paykeeper.ru` токен не получает.

### Логин и пароль API

JSON API ходит с Basic Auth. Логин и пароль те же, что у пользователя кабинета. PayKeeper рекомендует отдельного пользователя, не тот, под которым вы правите настройки каждый день.

1. Откройте [страницу настроек](https://docs.paykeeper.ru/lichnyj-kabinet/stranitsa-nastrojki/) кабинета.
2. Раздел **Доступ к панели администратора**.
3. Создайте пользователя и задайте пароль.
4. В MODX это **`msp3paykeeper_api_login`** и **`msp3paykeeper_api_password`**.

Проверка пары: `GET {server_url}/info/settings/token/` с Basic Auth. Ответ 200 содержит JSON с полем `token`. Ответ 401 значит, что логин или пароль не те. Как устроен токен: [безопасность JSON API](https://docs.paykeeper.ru/dokumentatsiya-json-api/token-bezopasnosti/).

### Секретное слово

**`msp3paykeeper_secret_word`** подписывает POST-оповещения. Пароль API для этого не подходит.

1. **Настройки → Получение информации о платежах**.
2. Способ получения уведомлений: **POST-оповещения**.
3. URL обработчика: `https://ваш-домен.ru/assets/components/msp3paykeeper/webhook.php`. Только HTTPS, без Basic Auth и без 301.
4. Секретное слово впишите сами или нажмите генерацию. Допустимы латинские буквы, цифры и знаки препинания.

Формула подписи и ответ `OK`: [приём POST-оповещений](https://docs.paykeeper.ru/metody-integratsii/priyom-post-opoveshhenij/).

На публичном демо-стенде готового секретного слова в документации нет. Его задают в кабинете этого стенда. Без слова webhook не проверить. Счёт через `send()` при этом уже создаётся.

Ядро MiniShop3 на `/api/v1/payment/webhook/{id}` ждёт JSON. В кабинет PayKeeper этот адрес не ставьте.

### Холд

Отдельной настройки в MODX нет. В кабинете PayKeeper включите двухэтапный режим и в MiniShop3 выберите способ **Оплата через PayKeeper (двухстадийная)**.

## Шаг 2: Куда вписать в MODX

1. **Настройки → Системные настройки**, фильтр **`msp3paykeeper`**.
2. Либо properties способа: `server_url`, `api_login`, `api_password`, `secret_word`. Непустые properties перекрывают системные настройки.
3. Очистите кеш MODX.

Список полей: [Системные настройки](settings).

## Шаг 3: Демо-кабинет

В [примерах JSON API](https://docs.paykeeper.ru/vozmozhnosti-i-primery-ispolzovaniya/poluchenie-informatsii-o-spiske-platezhnyh-sistem-s-pomoshhyu-json-api/) PayKeeper публикует стенд:

- **`msp3paykeeper_server_url`**: `https://demo.paykeeper.ru`
- **`msp3paykeeper_api_login`** и **`msp3paykeeper_api_password`**: `demo` / `demo`

`GET /info/settings/token/` и `POST /change/invoice/preview/` на этой паре отвечают 200.

Карты смотрите на форме после перехода на `invoice_url`.

## Шаг 4: Способ оплаты в MiniShop3

1. В админке MiniShop3 откройте **Настройки → Оплаты**.
2. Включите **Оплата через PayKeeper**. Для холда включите **Оплата через PayKeeper (двухстадийная)** и двухэтапный режим в кабинете PayKeeper.
3. Привяжите способ к сценарию оформления заказа.

## Шаг 5: Боевой режим

1. Боевой `server_url`, логин и пароль отдельного пользователя, секретное слово из раздела **Получение информации о платежах**.
2. URL уведомлений на пакетный `webhook.php`.
3. Контрольный платёж. Проверьте `OK` в ответе webhook и статус заказа.
4. Выключите **`msp3paykeeper_debug`**.

Двухстадийный заказ не станет оплаченным, пока не спишете холд. Подробнее: [Интеграция](integration).
