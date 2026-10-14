---
title: Быстрый старт
description: Установка msp3CloudPayments, Public ID, API Secret и шесть адресов уведомлений
---

# Быстрый старт

Первый платёж через CloudPayments на сайте с MiniShop3.

## Требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 3.0+ |
| MiniShop3 | 1.14.0-beta1 и новее |
| PHP | 8.2+ |
| pdoTools | 3.0.0 и новее |
| Доступ | Public ID и API Secret сайта |
| Чек 54-ФЗ | email или телефон в адресе заказа |
| Сайт | HTTPS на webhook без редиректа 301 |

Тестовые и боевые ключи не смешивайте. Public ID виджета `test_api_00000000000000000000001` для создания счетов не подходит.

## Шаг 1: Провайдер modstore и установка пакета

1. **Система → Управление пакетами → Провайдеры** → добавьте **modstore.pro**:
   - URL: `https://modstore.pro/extras/`
   - Email и API-ключ из личного кабинета modstore.pro
2. Убедитесь, что установлен **MiniShop3**.
3. **Управление пакетами** → установите **msp3CloudPayments** (в **Show Details** укажите провайдер **modstore.pro**).
4. **Управление → Очистить кэш**.

Резолвер создаёт два активных способа. Старый `mspCloudPayments`, если он уже стоит, не удаляется.

| Название | Класс |
| --- | --- |
| Оплата через CloudPayments | `Msp3CloudPayments\Payment\CloudPaymentsPayment` |
| Оплата через CloudPayments (двухстадийная) | `Msp3CloudPayments\Payment\CloudPaymentsTwoStagePayment` |

## Откуда брать ключи {#откуда-брать-ключи}

Public ID и API Secret берутся в [кабинете CloudPayments](https://merchant.cloudpayments.ru/) у сайта. Точный пункт меню в README пакета не назван.

В MODX это **`msp3cloudpayments_public_id`** и **`msp3cloudpayments_api_secret`**. В `properties` способа те же значения можно положить как `public_id` или `login`, `api_secret`, `secret`, `webhook_secret`, `secret_key`. При `send()`, запросах вкладки и `webhook.php` непустые `properties` перекрывают системные настройки, затем идут ключи `mspcloudpayments_*`.

Подпись на `webhook.php` берёт секрет из `properties` способа, затем `msp3cloudpayments_api_secret`, затем `mspcloudpayments_api_secret`. Пустой секрет во всех трёх местах даёт код `13`.

Если свой адрес API пуст, пакет использует `https://api.cloudpayments.ru`.

## Шаг 2: Куда вписать в MODX

1. **Настройки → Системные настройки**, фильтр **`msp3cloudpayments`**.
2. Вставьте Public ID и API Secret. Для теста берите тестовые ключи сайта, не ключ виджета из примеров.
3. После сохранения: **Управление → Очистить весь кеш**.

Список полей: [Системные настройки](settings).

## Шаг 3: Шесть адресов уведомлений {#шаг-3-шесть-адресов-уведомлений}

В кабинете укажите все шесть. HTTPS без редиректа 301.

| Тип | URL |
| --- | --- |
| Pay | `https://ваш-домен.ru/assets/components/msp3cloudpayments/webhook.php?event=pay` |
| Check | `https://ваш-домен.ru/assets/components/msp3cloudpayments/webhook.php?event=check` |
| Fail | `https://ваш-домен.ru/assets/components/msp3cloudpayments/webhook.php?event=fail` |
| Confirm | `https://ваш-домен.ru/assets/components/msp3cloudpayments/webhook.php?event=confirm` |
| Refund | `https://ваш-домен.ru/assets/components/msp3cloudpayments/webhook.php?event=refund` |
| Cancel | `https://ваш-домен.ru/assets/components/msp3cloudpayments/webhook.php?event=cancel` |

Неверная подпись или пустое тело Pay отвечают кодом `13`.

## Шаг 4: Способ оплаты в MiniShop3

1. В админке MiniShop3 откройте **Настройки → Оплаты**.
2. Включите **Оплата через CloudPayments** или **Оплата через CloudPayments (двухстадийная)**.
3. Привяжите способ к доставке.

Если рядом стоит старый `mspCloudPayments`, выключите его и пропишите новые адреса. Подробнее: [Переход](integration#переход-со-старого-mspcloudpayments).

## Шаг 5: Тестовая карта и бой

Тестовая карта: 4242 4242 4242 4242. Это успешная оплата с 3-D Secure. Срок и CVC любые корректные.

На бою:

1. Боевые Public ID и API Secret.
2. Те же шесть адресов из [шага 3](#шаг-3-шесть-адресов-уведомлений).
3. Контрольный платёж. Уведомление Pay со статусом Completed должно отметить попытку оплаченной.
4. Выключите **`msp3cloudpayments_debug`**.

Холд не делает заказ оплаченным, пока не спишете его во вкладке заказа или не придёт Confirm.
