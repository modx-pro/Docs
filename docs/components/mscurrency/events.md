---
title: События MODX
description: События msCurrency для кастомной логики цен и валют
---

# События MODX

msCurrency вызывает собственные события и подписан на события MiniShop3 через плагины.

## События компонента

| Событие | Когда | Параметры |
|---------|--------|-----------|
| `mscOnToggleCurrency` | Пользователь сменил валюту на витрине | `currency` — массив/объект валюты |
| `mscOnGetPrice` | После конвертации в `getPrice()` | `price`, `newPrice`, `currencyId`, `course` |
| `mscOnBeforeUpdateProductPrice` | Перед записью `price` / `old_price` из `msc_*` при сохранении товара | `product`, `msc_price`, `price`, `oldPrice`, `currencyId`, `setId` (`0`). Можно изменить `price` / `oldPrice` в `$modx->event->params` |

### mscOnGetPrice

Пример: округление вверх для USD:

```php
switch ($modx->event->name) {
    case 'mscOnGetPrice':
        if ((int) $modx->event->params['currencyId'] === 2) {
            $modx->event->params['newPrice'] = ceil($modx->event->params['newPrice']);
        }
        break;
}
```

### mscOnBeforeUpdateProductPrice

Аналог «перехвата» пересчёта базовой цены перед сохранением. Плагин может скорректировать `$modx->event->params['price']`.

## Плагины и события MS3

| Плагин | События | Роль |
|--------|---------|------|
| `mscurrency_autoload` | `OnMODXInit` | Автозагрузка, сервис |
| `mscurrency_frontend` | `OnLoadWebDocument` | CSS/JS, плейсхолдеры |
| `mscurrency_product_price` | `msOnGetProductPrice` | Цена в валюте покупателя |
| `mscurrency_cart_display` | события корзины MS3 | Отображение в корзине |
| `mscurrency_order_snapshot` | `msOnCreateOrder`, `msOnSubmitOrder` | Снимок `properties.msc` |
| `mscurrency_product_save` | сохранение документа | `msc_price` → `price` в базовой валюте |
| `mscurrency_product_mgr` | `msOnManagerCustomCssJs` | Форма товара в админке |
| `mscurrency_payment_currency` | `msOnChangeOrderStatus` | Код валюты в опцию платёжки |
| `mscurrency_mfilter` | `OnMFilterInit` | Тип фильтра `currency_price` |

Оформление заказа также обрабатывает `MscOrderSubmitHandler` через `core/config/ms3.services.d/50-mscurrency.php`.

## Публичный API

```php
$msc = msc_get_service($modx);
$msc->getPrice($price, $productId, $currencyId, $course, $isFormat);
$msc->setSelectedCurrencyId(2);
$msc->refreshPlaceholders();
```

DI-контейнер: `\mscurrency\Application\ServiceContainer::get($modx)`.

## См. также

- [Интеграция](integration#getprice-в-php)
- [mFilter](mfilter)
