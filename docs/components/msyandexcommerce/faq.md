---
title: FAQ
description: Частые вопросы по msYandexCommerce и YCP
---

# FAQ

## Это Яндекс Пэй?

YCP — checkout (корзина, сессия, заказ). Оплата через Яндекс Пэй приходит отдельно: JWT на `POST /v1/webhook`. Включите `yapay_webhook_enabled`, укажите `yapay_merchant_id`, Callback URL = base `api.php`. Подробнее: [payment](payment).

Пакет не является форком `mspYapay`. Если Callback URL Yapay и YCP Pay указывают на один и тот же `/v1/webhook` на хосте — конфликт путей.

## Почему не `$order->submit()`?

`submit()` завязан на сессионную корзину и может вызвать `payment->send()` / редирект / `die()`. YCP без сессии браузера создаёт заказ через xPDO + события MS2 + `changeOrderStatus`.

## Soft-reserve уменьшает remains в каталоге?

Нет. Резерв живёт в `ms_yandexcommerce_reservations` и влияет на `available` в `basket/check`. Поле остатка в каталоге пакет не декрементирует. Откуда берётся остаток: [stock](stock).

## Где кнопка «Обновить склады через YCP»? В MODX её нет

В админке сайта этой кнопки нет. Она в кабинете [Яндекс Товаров](https://merchants.yandex.ru/shop?tab=checkout): **Магазин** → **Кнопка «Купить»** → способ **YCP протокол (API)** → склады / логистика → **Обновить склады через YCP**.

Поля `msyandexcommerce_warehouse_*` задаёте в MODX. Кабинет забирает их через `GET /api/v1/warehouses`. Путь и curl: [configuration](configuration#где-кнопка-обновить-склады-через-ycp).

## Остаток только в TV. Это сработает?

Нет. Пакет читает `msProductData.remains`, иначе `ms2_product_remains`. TV не используется. Подробности: [stock](stock).

## Как выбрать Москву / область / СДЭК?

Не в настройках пакета. Плагин на событие `ms2ycpOnDeliveryOptions`. Примеры: [plugins](plugins). Контракт: [delivery](delivery).

## Почему в option цена странная?

`price` в копейках. `35000` = 350 ₽. Если плагин пишет `350`, кабинет увидит 3,50 ₽.

## Есть ли поддержка MiniShop3 / MODX 3?

Нет. Этот пакет только для miniShop2 + MODX 2.

## Пакет не ставится / «Package provider not found»

Пакет зашифрован. Добавьте провайдер **modstore.pro** (URL `https://modstore.pro/extras/`, email и API-ключ из ЛК modstore) и в **Show Details** при Install укажите этот провайдер. Подробно: [Установка](installation).
