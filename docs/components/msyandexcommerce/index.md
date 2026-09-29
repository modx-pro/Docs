---
title: msYandexCommerce
description: "Yandex Commerce Protocol (YCP) для miniShop2: API кнопки «Купить в 1 клик», заказы, webhook Яндекс Пэй"
author: Ibochkarev
dependencies: miniShop2
categories: catalog
compatibility:
  - modx2
  - php74
  - minishop2
items: [
  { text: 'Установка', link: 'installation' },
  { text: 'Конфигурация', link: 'configuration' },
  { text: 'YCP API', link: 'ycp' },
  { text: 'Checkout и заказ', link: 'checkout' },
  { text: 'Остатки', link: 'stock' },
  { text: 'Доставка', link: 'delivery' },
  { text: 'Плагины доставки', link: 'plugins' },
  { text: 'Оплата', link: 'payment' },
  { text: 'Статусы', link: 'statuses' },
  { text: 'Кнопка', link: 'button' },
  { text: 'План тестирования', link: 'testing' },
  { text: 'Выход на прод', link: 'production-go-live' },
  { text: 'Устранение неисправностей', link: 'troubleshooting' },
  { text: 'FAQ', link: 'faq' },
]
---

# msYandexCommerce

**msYandexCommerce** — серверная часть [Yandex Commerce Protocol (YCP)](https://yandex.ru/support/merchants-ru-ycp/ru/) для [miniShop2](/components/minishop2/) на MODX Revolution 2.x. Яндекс вызывает API магазина при оформлении через кнопку «Купить в 1 клик».

Пространство имён: **`msyandexcommerce`**. Вход: `assets/components/msyandexcommerce/api.php`. Версия пакета: `0.1.2-beta`. Пакет платный, установка с [modstore.pro](https://modstore.pro/) ([автор](https://modstore.pro/authors/ibochkarev)).

С чего начать: [Установка](installation) → [Конфигурация](configuration) → [План тестирования](testing).

## Возможности

- HTTP API для YCP (корзина, доставка, checkout, placed, cancel, delivered)
- Сессии checkout, soft-reserve остатков, идемпотентность критичных POST
- Создание `msOrder` через xPDO + события MS2 + `changeOrderStatus` (без `$order->submit()`)
- JWT webhook Яндекс Пэй (`POST /v1/webhook`) со сменой статуса при `CAPTURED`
- Сниппет кнопки на карточке товара
- CMP-диагностика и регенерация `api_token`

## Что не входит

- Генератор товарного фида (`offer_id` в фиде = id ресурса `msProduct`)
- Полноценный платёжный шлюз Яндекс Пэй (Merchant `order/create` не реализован; есть mapping `msPayment` и приём webhook)
- Отдельный sandbox-хост YCP у Яндекса

## Требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 2.8+ |
| PHP | 7.4+ |
| miniShop2 | ≥ 2.4.0 |
| pdoTools | 2.x (для кнопки на витрине) |
| HTTPS | обязателен для публичного API в production |
