---
title: FAQ
description: "Частые вопросы по msp3Sberbank: modstore, callback, errorCode 5, чеки, deposit"
---

# FAQ

## Покупка и совместимость

### Для чего это дополнение?

Платёжный способ **Сбербанка** для **MiniShop3** на **MODX 3**: `register.do`, redirect на formUrl, callback, смена статуса заказа, deposit / reverse / refund, опционально `orderBundle` для 54-ФЗ.

### Работает с miniShop2 / MODX 2?

**Нет.** Только MODX Revolution **3.x** и **MiniShop3**.

### Что входит в пакет, чего нет

| Есть | Нет из коробки |
| --- | --- |
| Одностадийная и двухстадийная оплата | Кнопка Deposit/Refund в карточке заказа MS3 |
| Callback + checksum (HMAC / RSA) | Письма «заказ оплачен» (это MS3 / уведомления) |
| 54-ФЗ через `orderBundle` | Настройка онлайн-кассы в СберБизнес (делает банк) |
| Примеры сниппетов «оплата из ЛК» и `msp3SberbankOrderAction` | Готовый шаблон личного кабинета |
| Сертификаты НУЦ в `certs/` | Договор эквайринга и логины `-api` |

Deposit, Reverse и Refund (списание, отмена холда, возврат): [Интеграция](integration#deposit-reverse-refund-из-кода).

### Пакет не ставится / «Package provider not found»

Пакет зашифрован. Добавьте провайдер **modstore.pro** (URL `https://modstore.pro/extras/`, email и API-ключ из ЛК modstore) и укажите его в **Show Details** при Install. Подробно: [Быстрый старт](quick-start#шаг-1-провайдер-modstore-и-установка-пакета).

## Оплата и статус заказа

### Заказ не переходит в «оплачен»

Проверьте по порядку:

1. **Callback URL** в ЛК Сбербанка совпадает с `https://ваш-домен.ru/assets/components/msp3sberbank/callback.php`.
2. Сайт доступен по **HTTPS** снаружи (не только localhost).
3. Фаервол и WAF не блокируют POST от банка.
4. В `msp3sberbank_api_login` логин **`-api`**, пароль актуален.
5. `msp3sberbank_api_url` совпадает с контуром учётки (ecomtest / ecommerce).
6. Верный **`msp3sberbank_paid_status_id`** или **`ms3_status_paid`**.
7. Включите **`msp3sberbank_debug`** и посмотрите лог после тестовой оплаты.

Источник истины: **callback**, а не только возврат браузера на `returnUrl`.

### Покупатель закрыл вкладку после оплаты

Если callback настроен, банк сам дернёт `callback.php` и статус обновится. Без callback статус меняется только при `receive()` на `returnUrl`. **Настройте callback.**

### Покупатель сразу уходит на Сбербанк. Как оплачивать после проверки менеджером?

Отдельной галочки в настройках **нет**. Нужно не вызывать оплату сразу после оформления и добавить кнопку в ЛК со сниппетом `send()`.

Готовый код: [Интеграция, оплата после проверки](integration#оплата-после-проверки-менеджером).

### Чем одностадийная отличается от двухстадийной?

| | Одностадийная | Двухстадийная |
| --- | --- | --- |
| API | `register.do` | `registerPreAuth.do` |
| После оплаты | Списание → `paid_status_id` | Холд → `authorized_status_id` |
| Дальше | — | Deposit (списание) или Reverse (отмена холда) |

Обе ведут покупателя на форму Сбербанка при `send()`. Двухстадийная **не** заменяет сценарий «сначала менеджер».

## Банк и доступы

### Где взять login и password?

Только из **вашего** договора / ЛК мерчанта. Публичные демо с developers.sber.ru на ecomtest часто дают **errorCode 5**.

В API: логин с суффиксом **`-api`**, не `-operator`. Пошагово: [Быстрый старт, шаг 2](quick-start#шаг-2-ключи-api-в-modx).

### errorCode 5 «Доступ запрещён»

Чаще всего: в `api_login` попал `-operator`, устарел пароль после смены в ЛК, или тестовая учётка на боевом URL (и наоборот). Письмо: `Support_ecomm@sberbank.ru`.

### curl error 60 / 35

Нет доверия к сертификатам НУЦ. В пакете `certs/russian-trusted-chain.pem`. Если ошибка остаётся: системные корни или `msp3sberbank_ssl_ca_file`. Подробнее: [Системные настройки, TLS](settings#tls-и-сертификаты-нуц).

## Callback и безопасность

### Callback **400 Invalid checksum**

Тип подписи в ЛК совпадает с ключом в MODX. Включены уведомления **с контрольной суммой**. Токен callback не путать с паролем `-api`.

### Callback **404**

После `register` в `payment_data` должен быть `sber_order_id` = `mdOrder`. Поле `orderNumber` = id заказа MS3.

### Сумма не совпадает

`receive()` и callback сверяют шлюз с `order.cost` (±1 коп.). Не меняйте сумму заказа после register.

## 54-ФЗ и чеки

### Как включить чек?

`msp3sberbank_send_order_bundle = 1`, ФФД и `tax_type` в настройках. У покупателя в заказе **email или телефон**. Кассу настраивает банк / СберБизнес.

Коды НДС: [Системные настройки, чеки](settings#чеки-54-фз).

### Ошибка «нужен email или телефон» / bundle amount mismatch

- Контакт: заполните адрес заказа MS3 или профиль.
- Сумма позиций ≠ `order.cost` (±1 коп.): проверьте скидки, доставку, округление.

## Возвраты и холд

### Где в админке кнопка «Вернуть» / «Списать холд»?

Отдельного UI в карточке заказа **пока нет**. Создайте сниппет `msp3SberbankOrderAction` или вызовите процессоры из своего кода. Примеры: [Интеграция](integration#deposit-reverse-refund-из-кода).

### Deposit с одностадийного заказа

Не сработает: процессор вернёт, что способ оплаты не двухстадийный.

## Письма и статусы

### Почему не пришло письмо об оплате?

Компонент **не шлёт** почту. Он меняет `status_id`. Письма настраивают в MiniShop3 / Центр уведомлений. Сверьте `msp3sberbank_paid_status_id` со статусом в правилах.

### После установки нет способов оплаты

Проверьте плагин `msp3sberbank_bootstrap`, namespace `msp3sberbank`, каталог `core/components/msp3sberbank/`. В **MiniShop3 → Оплаты** должны быть «Оплата через Сбербанк» и «Оплата через Сбербанк (двухстадийная)». Переустановите пакет, очистите кэш.

## Хостинг и сеть

### Можно ли тестировать на localhost?

`register` и форма оплаты работают, если сервер ходит в интернет. **Callback с банка на `http://localhost` не придёт.** Для полного цикла нужен публичный HTTPS или туннель (ngrok) и этот URL в ЛК Сбера.

## Сообщения об ошибках на витрине

| Ключ лексикона | Когда |
| --- | --- |
| `msp3sberbank.error_access_denied` | Ответ шлюза код 5 |
| `msp3sberbank.error_connection` | Сеть / TLS / НУЦ |
| `msp3sberbank.error_register_failed` | Register отклонён |
| `msp3sberbank.error_fiscal_contact` | Нет email/phone при orderBundle |
| `msp3sberbank.error_bundle_amount_mismatch` | Сумма корзины ≠ заказу |
| `msp3sberbank.error_amount_mismatch` | Сумма в банке ≠ `order.cost` |
| `msp3sberbank.error_payment_not_completed` | Статус ещё не deposited/authorized |
| `msp3sberbank.error_invalid_amount` | Нулевая или битая сумма заказа |

Включите `msp3sberbank_debug = 1` и смотрите `core/cache/logs/error.log` (`[msp3Sberbank]`).

## Поддержка

1. [Быстрый старт](quick-start) и таблицы выше.
2. `msp3sberbank_debug = 1`, фрагмент лога `[msp3Sberbank]` (пароли маскируются).
3. Автор пакета: [t.me/ibochkarev](https://t.me/ibochkarev).
4. Учётки API / ЛК банка: `Support_ecomm@sberbank.ru`, `support@ecom.sberbank.ru`.
