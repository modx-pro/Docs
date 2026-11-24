---
title: msYandexCommerce
description: "Yandex Commerce Protocol (YCP) для miniShop2: API кнопки «Купить в 1 клик», заказы, webhook Яндекс Пэй"
author: Ibochkarev
dependencies: miniShop2
categories: orders
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

Пространство имён: **`msyandexcommerce`**. Точка входа: `assets/components/msyandexcommerce/api.php`.

С чего начать: [Установка](installation) → [Конфигурация](configuration) → [План тестирования](testing).

## Возможности

- HTTP API для YCP: корзина, доставка, checkout, placed, cancel, delivered, `GET /health`, склады и чтение заказа. Полный список маршрутов на странице [YCP API](ycp).
- Сессии checkout, soft-reserve остатков, идемпотентность критичных POST
- Создание `msOrder` через xPDO + события MS2 + `changeOrderStatus` (без `$order->submit()`)
- JWT webhook Яндекс Пэй (`POST /v1/webhook`) со сменой статуса при `CAPTURED`
- Сниппет `msYandexCommerceButton` на карточке товара
- CMP-диагностика и регенерация `api_token`

## Что не входит

- Генератор товарного фида (`offer_id` в фиде = id ресурса `msProduct`)
- Полноценный платёжный шлюз Яндекс Пэй (Merchant `order/create` не реализован, есть сопоставление `msPayment` и приём webhook)
- Отдельный sandbox-хост YCP у Яндекса

## Требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 2.8+ |
| PHP | 7.4+ |
| miniShop2 | ≥ 2.4.0 |
| pdoTools | для кнопки на витрине (в `requires` транспорта нет) |
| HTTPS | по умолчанию обязателен для публичного API (`https_required`). Исключение: `GET /health` |
