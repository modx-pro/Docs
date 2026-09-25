---
title: msp3AlfaBank
description: "Приём оплаты через Альфа-Банк для MiniShop3: ссылка на оплату, callback, одно- и двухстадийная схема"
author: Ibochkarev
dependencies: miniShop3
categories: minishop3

compatibility:
  - modx3
  - php82
  - minishop3
items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'Интеграция и сценарии', link: 'integration' },
  { text: 'FAQ', link: 'faq' },
]
---

# msp3AlfaBank

**msp3AlfaBank** подключает [интернет-эквайринг Альфа-Банка](https://alfabank.ru/sme/payservice/internet-acquiring/docs/documentation/) к [MiniShop3](/components/minishop3/) в MODX Revolution 3. Статус «оплачен» выставляет MiniShop3. Пакет сам статус заказа не меняет. Письма покупателю шлёт Центр уведомлений MiniShop3.

Старый пакет `mspAlfaBank` при установке не удаляется.

В заказе сумма в рублях. В банк пакет отправляет её в копейках. Отдельной подписи у колбэка нет: пакет сверяет логин с паролем и сумму с попыткой оплаты.

- [Документация банка](https://alfabank.ru/sme/payservice/internet-acquiring/docs/documentation/)

Пространство имён настроек: **`msp3alfabank`**. Адрес уведомлений: `assets/components/msp3alfabank/webhook.php`.

## Возможности

- Обычная оплата, деньги списываются сразу: способ **Оплата через Альфа-Банк**.
- Холд, деньги сначала блокируются: способ **Оплата через Альфа-Банк (двухстадийная)**. Списание кнопкой во вкладке заказа.
- Банк присылает колбэк на сайт. Пакет не верит тексту колбэка и сам спрашивает статус платежа у банка.
- Номер платежа в банке пакет сохраняет у попытки оплаты. Списание, отмена холда и возврат работают и до колбэка, если номер уже есть.
- Во вкладке заказа: попытки, возврат, списание холда, отмена холда, синхронизация.

Публичного демо-кабинета у банка нет. Логин и пароль приходят в письме.

## Системные требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 3.0+ |
| MiniShop3 | 1.14.0-beta1 и новее |
| PHP | 8.2+ |
| Доступ | логин с суффиксом `-api` и пароль из письма банка |
| Сайт | HTTPS на webhook без 301 |

### Зависимости

- [MiniShop3](/components/minishop3/): заказы и способы оплаты.

## Установка

1. Установите **MiniShop3**.
2. Добавьте провайдер **modstore.pro** (**Система → Управление пакетами → Провайдеры**): URL `https://modstore.pro/extras/`, email и API-ключ из личного кабинета modstore.
3. Установите пакет **msp3AlfaBank** через **Управление пакетами** (в **Show Details** выберите провайдер **modstore.pro**).
4. **Очистите кэш** MODX.

Резолвер создаёт два активных способа:

| Название | Класс |
| --- | --- |
| Оплата через Альфа-Банк | `Msp3AlfaBank\Payment\AlfaBankPayment` |
| Оплата через Альфа-Банк (двухстадийная) | `Msp3AlfaBank\Payment\AlfaBankTwoStagePayment` |

Логин и пароль положите в `msPayment.properties` (`user_name` или `login`, `password` или `secret`). Если properties пусты, пакет читает системные настройки.

Откуда брать логин и какой адрес шлюза выбрать: [Быстрый старт](quick-start#откуда-брать-ключи).

Заказ дешевле 1 копейки пакет на оплату не отправляет.

## Быстрая настройка webhook

Пакет сам передаёт адрес колбэка при создании платежа. В кабинете банка укажите тот же URL:

```text
https://ваш-домен.ru/assets/components/msp3alfabank/webhook.php
```

HTTPS без 301. JSON-адрес ядра MiniShop3 для колбэка Альфа-Банка не подходит.

## Архитектура

```mermaid
flowchart LR
  Buyer[Покупатель]
  MS3[MiniShop3]
  Pkg[msp3AlfaBank]
  Bank[AlfaBank]
  Buyer -->|оформление| MS3
  MS3 -->|send| Pkg
  Pkg -->|register| Bank
  Bank -->|formUrl| Pkg
  Pkg -->|redirect| MS3
  Buyer -->|оплата| Bank
  Bank -->|callback| Pkg
  Pkg -->|статус платежа| Bank
  Pkg -->|статус заказа| MS3
```

## Быстрые ссылки

| Нужно | Документ |
| --- | --- |
| Установить и принять первый платёж | [Быстрый старт](quick-start) |
| Все ключи `msp3alfabank_*` | [Системные настройки](settings) |
| Колбэк, холд, переход со старого пакета | [Интеграция](integration) |
| Логин, 401, кеш | [FAQ](faq) |
| Оформление заказа MS3 | [MiniShop3: заказ](/components/minishop3/frontend/order) |
