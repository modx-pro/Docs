---
title: Быстрый старт
description: Установка msp3Tochka, песочница, webhook и боевой режим
---

# Быстрый старт

Как принять первый платёж через Точка Банк на сайте с MiniShop3.

## Требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 3.0+ |
| MiniShop3 | beta с `ms3_payment_lifecycle` |
| PHP | 8.2+, расширение openssl |
| Сайт | HTTPS на webhook. 301 с HTTP часто роняет тело POST |

## Шаг 1: Провайдер modstore и установка пакета

Пакет зашифрован. Без провайдера установка завершится ошибкой `Package provider not found`.

1. **Система → Управление пакетами → Провайдеры** → добавьте **modstore.pro**:
   - URL: `https://modstore.pro/extras/`
   - Email и API-ключ из личного кабинета modstore.pro
2. Убедитесь, что установлен **MiniShop3**.
3. **Управление пакетами** → установите **msp3Tochka** (в **Show Details** укажите провайдер **modstore.pro**).
4. **Управление → Очистить кэш**.

Резолвер создаёт два активных способа. Старый `mspTochka`, если он уже стоит, не удаляется.

| Название | Класс |
| --- | --- |
| Оплата через Точка Банк | `Msp3Tochka\Payment\TochkaPayment` |
| Оплата через Точка Банк (двухстадийная) | `Msp3Tochka\Payment\TochkaTwoStagePayment` |

JWT и `customerCode` положите в `msPayment.properties` (`jwt_token`, `token` или `secret`). Если properties пусты, пакет читает системные настройки.

`send()` отклоняет заказ дешевле 0.01 ₽. `paymentLinkId` не длиннее 45 символов.

## Шаг 2: Песочница

**`msp3tochka_test_mode`** = Да. Хост: `https://enter.tochka.com/sandbox/v2`.

Публичные значения из [документации Точки](https://developers.tochka.com/docs/tochka-api/pesochnica):

- JWT: `sandbox.jwt.token`
- `customerCode`: `1234567ab`
- `merchantId`: `200000000001097`

В песочнице нет платёжной формы. `paymentLink` ведёт на `merch.example.com`. `getPayment` отдаёт фикстуру 2022 года: статус APPROVED, сумма 100 ₽, без `paymentLinkId`. Пакет тогда берёт `paymentLinkId` из JWT. Webhook `apply` проходит, только если сумма заказа тоже 100 ₽.

Покупатели картой здесь заплатить не могут.

## Шаг 3: Ключи в MODX

1. **Настройки → Системные настройки**, фильтр по пространству имён **`msp3tochka`**.
2. Для песочницы:
   - **`msp3tochka_test_mode`**: Да
   - **`msp3tochka_jwt_token`**: `sandbox.jwt.token`
   - **`msp3tochka_customer_code`**: `1234567ab`
   - **`msp3tochka_merchant_id`**: `200000000001097`

После смены настроек очистите кеш MODX. Подробнее: [Системные настройки](settings).

## Шаг 4: URL уведомлений

В кабинете Точки событие `acquiringInternetPayment`:

```text
https://ваш-домен.ru/assets/components/msp3tochka/webhook.php
```

HTTPS без Basic Auth и без 301.

## Шаг 5: Способ оплаты в MiniShop3

1. В админке MiniShop3 откройте **Настройки → Оплаты**.
2. Включите **Оплата через Точка Банк** или **Оплата через Точка Банк (двухстадийная)**.
3. Привяжите способ к доставке.

Если рядом стоит старый `mspTochka`, выключите его и смените URL webhook. Подробнее: [Переход](integration#переход-со-старого-msptochka).

## Шаг 6: Боевой режим

1. Открытый счёт в Точке и подключённый интернет-эквайринг.
2. JWT в кабинете: **Интеграции и API → JWT-ключи**. Скопируйте токен сразу. Повторно его не показывают.
3. В MODX: **`msp3tochka_test_mode`** = Нет, боевой JWT, `customer_code`, при нескольких точках ещё `merchant_id`.
4. Хост боя: `https://enter.tochka.com/uapi`, если не задали `msp3tochka_api_base_url`.
5. Активируйте нужный способ оплаты и привяжите к доставке.
6. Пропишите webhook в кабинете Точки.
7. Первый платёж лучше на 1 ₽. Проверьте попытку `paid`, статус `ms3_status_paid` и письмо из Центра уведомлений.
8. Выключите **`msp3tochka_debug`**.

Права JWT: `MakeAcquiringOperation` и `ReadAcquiringData`.
