---
title: Быстрый старт
description: Установка msp3Prodamus, демо-страница payform, webhook и боевой режим
---

# Быстрый старт

Как принять первый платёж через Prodamus на сайте с MiniShop3.

## Требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 3.0+ |
| MiniShop3 | 1.14.0-beta1 и новее |
| PHP | 8.2+ |
| pdoTools | 3.0.0+ |
| Кабинет | URL страницы payform и секрет со страницы настроек |
| Сайт | HTTPS на webhook без 301 |

В заказе нужен email или телефон. Без телефона Prodamus покажет предварительную форму.

## Шаг 1: Провайдер modstore и установка пакета

1. **Система → Управление пакетами → Провайдеры** → добавьте **modstore.pro**:
   - URL: `https://modstore.pro/extras/`
   - Email и API-ключ из личного кабинета modstore.pro
2. Убедитесь, что установлен **MiniShop3**.
3. **Управление пакетами** → установите **msp3Prodamus** (в **Show Details** укажите провайдер **modstore.pro**).
4. **Управление → Очистить кэш**.

Резолвер создаёт способ **Оплата через Prodamus**, класс `Msp3Prodamus\Payment\ProdamusPayment`.

Секрет и URL для ссылки можно положить в `msPayment.properties`. Поля: `secret`, `secret_key`, `payform_url`. При миграции: `form_url`, `webhook_secret`. Непустые properties перекрывают системные настройки.

Секрет нужен и для ссылки, и для `webhook.php`. Достаточно одного места: properties способа или **`msp3prodamus_secret_key`**.

Заказ дешевле 1 копейки пакет на оплату не отправляет.

## Откуда брать ключи {#откуда-брать-ключи}

Демо-страница описана в [шаге 3](#шаг-3-демо-страница).

| Что | Откуда |
| --- | --- |
| URL страницы | **`msp3prodamus_payform_url`**: адрес страницы, с которой покупатель платит. Скопируйте из адресной строки. Обычно `https://имя.payform.ru/`. |
| Секрет | Войдите на платёжную страницу как владелец. Нижнее меню: **Настройки**. Скопируйте ключ в **`msp3prodamus_secret_key`**. В properties способа: `secret` или `secret_key`. |
| `sys` | **`msp3prodamus_sys`**: код интеграции. Согласуют с поддержкой Prodamus. У всех магазинов одной интеграции код один и тот же. |
| URL уведомлений | **Настройки**, поле **Настройка уведомлений**. После ввода нажмите **сохранить**. |

Как войти на страницу: инструкция Prodamus в ссылке ниже. Новый ключ на этой странице не генерируется. Его выдаёт поддержка Prodamus. Поля и кнопка сохранения URL: [где найти секрет и URL уведомлений](https://help.prodamus.ru/payform/integracii/rest-api/url-dlya-uvedomlenii-i-sekretnyi-klyuch). Описание `sys`: [самостоятельная интеграция](https://help.prodamus.ru/payform/integracii/rest-api/instrukcii-dlya-samostoyatelnaya-integracii-servisov).

HMAC считают секретом именно этой страницы. Секрет другой страницы, в том числе демо, к ней не подойдёт.

**`msp3prodamus_test_mode`** = Да только добавляет в ссылку `demo_mode=1`. Секрет HMAC от этого не меняется.

Если на стороне Prodamus у страницы выключен боевой режим, подпись считают другим ключом, с суффиксом `demo`. Такой webhook не должен проходить как боевой.

Без `sys` пакет не передаёт `urlNotification`. Prodamus не примет URL из запроса.

URL уведомлений:

```text
https://ваш-домен.ru/assets/components/msp3prodamus/webhook.php
```

HTTPS, без Basic Auth и без 301. HTTP на `*.test` часто отвечает 301, и тело POST пропадает.

Переход покупателя на `urlSuccess` заказ не оплачивает. Оплату подтверждает только webhook с верным заголовком `Sign`.

## Шаг 2: Куда вписать в MODX

1. **Настройки → Системные настройки**, фильтр **`msp3prodamus`**.
2. Либо properties способа: `payform_url`, `secret` или `secret_key`, при необходимости `sys`. Непустые properties перекрывают системные настройки для ссылки и `webhook.php`.
3. Очистите кэш MODX.

Список полей: [Системные настройки](settings).

## Шаг 3: Демо-страница

`https://demo.payform.ru/`. Секрет демо-формы лежит в примере кода в [статье про самостоятельную интеграцию](https://help.prodamus.ru/payform/integracii/rest-api/instrukcii-dlya-samostoyatelnaya-integracii-servisov). Доступ к демо менеджеры Prodamus выдают по запросу.

В MODX для проверки:

- **`msp3prodamus_payform_url`**: `https://demo.payform.ru/`
- **`msp3prodamus_secret_key`**: секрет из той статьи
- **`msp3prodamus_test_mode`**: Да, если нужна ссылка с `demo_mode=1`

## Шаг 4: Способ оплаты в MiniShop3

1. В админке MiniShop3 откройте **Настройки → Оплаты**.
2. Включите **Оплата через Prodamus**.
3. Привяжите способ к сценарию оформления заказа.

Отдельного двухстадийного способа нет.

## Шаг 5: Боевой режим

1. Своя страница payform и секрет с её страницы **Настройки**.
2. **`msp3prodamus_test_mode`** = Нет, если не хотите `demo_mode=1` в ссылке.
3. Код `sys`, если уведомление должно уходить на URL из запроса.
4. URL в поле **Настройка уведомлений** сохранён.
5. Контрольный платёж. Проверьте HTTP 200 и текст `success`, попытку `paid`.
6. Выключите **`msp3prodamus_debug`**.
