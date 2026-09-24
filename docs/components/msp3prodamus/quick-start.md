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
| MiniShop3 | [1.14.0-beta1](https://github.com/modx-pro/MiniShop3/releases/tag/v1.14.0-beta1) и новее |
| PHP | 8.2+ |
| Кабинет | URL страницы payform и секрет со страницы настроек |
| Сайт | HTTPS на webhook без 301 |

В заказе нужен email или телефон. Без телефона Prodamus покажет предварительную форму.

## Шаг 1: Провайдер modstore и установка пакета

Пакет зашифрован. Без провайдера установка завершится ошибкой `Package provider not found`.

1. **Система → Управление пакетами → Провайдеры** → добавьте **modstore.pro**:
   - URL: `https://modstore.pro/extras/`
   - Email и API-ключ из личного кабинета modstore.pro
2. Убедитесь, что установлен **MiniShop3**.
3. **Управление пакетами** → установите **msp3Prodamus** (в **Show Details** укажите провайдер **modstore.pro**).
4. **Управление → Очистить кэш**.

Резолвер создаёт способ **Оплата через Prodamus**, класс `Msp3Prodamus\Payment\ProdamusPayment`.

Секрет и URL страницы положите в `msPayment.properties` (`secret` или `secret_key`, `payform_url`). Если properties пусты, пакет читает системные настройки.

`send()` отклоняет заказ дешевле 0.01 ₽.

## Шаг 2: Демо-страница

`https://demo.payform.ru/` и секрет из [статьи про самостоятельную интеграцию](https://help.prodamus.ru/payform/integracii/rest-api/instrukcii-dlya-samostoyatelnaya-integracii-servisov). Доступ к демо менеджеры Prodamus выдают по запросу.

**`msp3prodamus_test_mode`** = Да только добавляет в ссылку `demo_mode=1`. HMAC считает секрет той страницы, с которой создали ссылку. Боевой ключ от этого не меняется.

Переход на `urlSuccess` оплату не подтверждает. Факт оплаты это только webhook с верным `Sign`.

## Шаг 3: Ключи в MODX

1. **Настройки → Системные настройки**, фильтр по пространству имён **`msp3prodamus`**.
2. Заполните:
   - **`msp3prodamus_payform_url`**: адрес страницы, например `https://demo.payform.ru/`
   - **`msp3prodamus_secret_key`**: секрет со страницы настроек
   - **`msp3prodamus_sys`**: код интеграции, если Prodamus должен принять `urlNotification` из запроса

Подробнее: [Системные настройки](settings).

## Шаг 4: URL уведомлений в кабинете Prodamus

Без webhook заказ в MODX не станет оплаченным. Переход покупателя на страницу успеха этого не делает.

```text
https://ваш-домен.ru/assets/components/msp3prodamus/webhook.php
```

HTTPS без Basic Auth и без 301. HTTP на `*.test` часто отвечает 301, и тело POST пропадает.

## Шаг 5: Способ оплаты в MiniShop3

1. В админке MiniShop3 откройте **Настройки → Оплаты**.
2. Включите **Оплата через Prodamus**.
3. Привяжите способ к сценарию оформления заказа.

Отдельного двухстадийного способа нет.

## Шаг 6: Боевой режим

1. Своя страница payform, секрет со страницы настроек, при необходимости код `sys`.
2. **`msp3prodamus_test_mode`** = Нет, если не хотите `demo_mode=1` в ссылке.
3. URL уведомлений в кабинете на пакетный `webhook.php`.
4. Контрольный платёж. Проверьте HTTP 200 и текст `success`, попытку `paid`.
5. Выключите **`msp3prodamus_debug`**.
