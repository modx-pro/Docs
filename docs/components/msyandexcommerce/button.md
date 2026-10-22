---
title: Кнопка
description: Сниппет msYandexCommerceButton на карточке товара
---

# Кнопка «Купить в 1 клик»

Сниппет `msYandexCommerceButton` ставит кнопку рядом с «В корзину» на карточке товара. По клику браузер уходит на чекаут Яндекса.

Для отрисовки нужен **pdoTools** 2.x. В transport `requires` пакета его нет: только для сниппета и чанка кнопки. YCP API без pdoTools работает. Чанк по умолчанию — `{$checkout_url}`.

## Вызов

В шаблоне карточки товара (pdoTools / Fenom или классический вызов):

```fenom
{'!msYandexCommerceButton' | snippet : [
  'product_id' => $_modx->resource.id,
  'quantity' => 1,
  'tpl' => 'msYandexCommerce.button',
]}
```

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `product_id` | id текущего ресурса | Товар miniShop2 |
| `quantity` | `1` | Количество |
| `tpl` | `msYandexCommerce.button` | Имя чанка разметки. Свой чанк: скопируйте стандартный и укажите `&tpl=` / `'tpl' => '…'` |
| `debug` | нет | При ошибке вернуть HTML-комментарий с текстом |

При `product_id < 1`, выключенной кнопке или ошибке сервиса сниппет возвращает пустую строку (без `debug`).

## Данные

`ButtonService::buildForProduct`:

1. Грузит товар через тот же путь цен, что и cart check.
2. Собирает JSON:

```json
{
  "items": [
    {
      "id": "50",
      "quantity": 1,
      "price": 1999.0,
      "final_price": 1799.0
    }
  ]
}
```

`price` это цена до скидки (`regular_price`). `final_price` берётся после `getPrice()`.

1. Кодирует JSON в Base64.
2. Строит URL по инструкции Яндекса:

```text
https://checkout.kit.yandex.ru/express?host=<домен>&data=<BASE64>
```

Домен берётся из `site_url`.

В JS и чанк токен API не попадает. Скрипт только читает `data-checkout-url` и делает `location.href`.

## Чанк и стили

```fenom
<button type="button"
    class="ms2ycp-button"
    data-ms2ycp-button
    data-checkout-url="{$checkout_url}"
    data-product-id="{$product_id}">
    Купить в 1 клик
</button>
```

Переменные чанка: `product_id`, `product_name`, `price`, `final_price`, `quantity`, `checkout_url`, `payload`.

Дополнительно сниппет выставляет плейсхолдеры `ms2ycp.*` с теми же значениями для соседней разметки шаблона.

CSS: `assets/components/msyandexcommerce/css/button.css`, класс `.ms2ycp-button`.

JS: `assets/components/msyandexcommerce/js/button.js`, селектор `[data-ms2ycp-button]`.

Переопределяйте чанк и CSS под тему магазина. Официальные переменные Яндекса (`--yakit-button-*`) можно добавить в свой CSS, если нужно совпасть с [гайдом «Кнопка на сайте»](https://yandex.ru/support/merchants/ru/buy-button-site#button-styles).

## Метрика

Инструкция Яндекса допускает `metric_client_id`, `from=button`, `src`. Текущий `ButtonService` эти query-параметры не добавляет. При необходимости расширьте URL в своём чанке/JS после получения `checkout_url`, либо доработайте сервис.
