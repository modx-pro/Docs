---
title: Чекаут и сниппеты
description: Сниппеты msYandexDelivery и msydLexiconScript, виджет ПВЗ и связка с формой MiniShop3
---

# Чекаут и сниппеты

## Разметка

В чанк оформления заказа:

::: code-group

```modx
[[!msydLexiconScript]]
[[!msYandexDelivery]]
<div data-msyd-widget></div>
```

```fenom
{'!msydLexiconScript' | snippet}
{'!msYandexDelivery' | snippet}
<div data-msyd-widget></div>
```

:::

Сниппет `msYandexDelivery` подключает CSS/JS чекаута и конфиг `window.msYandexDeliveryFrontend`. Скрипт CDN виджета ПВЗ грузится по требованию, когда активен тариф `self_pickup`. Контейнер `data-msyd-widget` скрыт, пока не выбран способ доставки Яндекса.

Чанк **`tplYandexDeliveryMethods`** — обёртка `<div class="msyd-methods" data-msyd-methods>` для списка методов.

## Сниппет `msYandexDelivery`

Назначение: зарегистрировать assets и конфиг фронта. Возвращает пустую строку.

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `connectorUrl` | `{assets_url}components/msyandexdelivery/connector.php` | URL AJAX-коннектора |
| `widgetScriptUrl` | из `msyandexdelivery_widget_script_url` или CDN v2 | URL скрипта виджета |
| `city` | из резолва города | Фиксированное имя города для карты. Для витрины надёжнее `&geoId=` |
| `geoId` | из `msyandexdelivery_widget_geo_id` | `geo_id` центра карты. Алиас: `geo_id` |
| `height` | из `msyandexdelivery_widget_height` | Высота виджета, px (минимум 200) |

Приоритет города карты:

1. `&city=`
2. `&geoId=` / `widget_geo_id`
3. Город из адреса черновика заказа
4. `widget_city`
5. Москва (`213`)

Пример для витрины в СПб:

::: code-group

```modx
[[!msYandexDelivery?
  &geoId=`2`
  &height=`500`
]]
```

```fenom
{'!msYandexDelivery' | snippet : [
  'geoId' => 2,
  'height' => 500,
]}
```

:::

## Сниппет `msydLexiconScript`

Без параметров. Выводит `window.msydLexicon` с ключами фронта (подписи тарифов, кнопки, подсказки). Вызывайте **до** `msYandexDelivery`.

## Поведение на чекауте

1. Покупатель выбирает способ доставки Яндекса в MiniShop3.
2. Блок `data-msyd-widget` показывает панель **до двери** (`time_interval`) или карту **ПВЗ** (`self_pickup`) по тарифу выбранного `msDelivery`.
3. **До двери:** адрес из `form.ms3_order_form` → `connector.php?action=calculate` → `select_option`.
4. **ПВЗ:** официальный виджет → событие `YaNddWidgetPointSelected` → `calculate` + `select_option` с `platform_station_id`.
5. Выбор уходит в сессию и в `msOrder.properties.msyandexdelivery` (tariff, platform_station_id, address, price, delivery_days).
6. Плагин на `msOnGetDeliveryCost` и `YandexDelivery::getCost()` подставляют стоимость. При сохранении опции `delivery_cost` синхронизируется из `option.price`, а tariff выравнивается по `delivery_id`.

Публичные actions коннектора (без mgr-auth): `calculate`, `select_option`, `list_pickup_points`.

### Связка с формой MS3

`yandexdelivery.js` слушает:

- `ms3Hooks.addHook('afterAddOrder', …)` при смене доставки и полей адреса (регистрация с retry, пока `ms3Hooks` не загрузился)
- событие `ms3:ready` при открытии чекаута
- `change` и `input` на полях адреса формы

Перед «Рассчитать» виджет читает адрес из формы. Если адрес в форме есть, а виджет просит указать адрес, проверьте класс `ms3_order_form`, загрузку `ms3.js` и свежий `?v=` у JS сниппета.

## Виджет ПВЗ

![Чекаут: карта ПВЗ](/components/msyandexdelivery/screenshots/fe-checkout-pvz.png)

Скрипт по умолчанию: `https://widget-pvz.dostavka.yandex.net/widget.js?v=2`.

CDN-виджет показывает **prod-каталог** точек. Test API (`b2b.taxi.tst.yandex.net`) знает только часть московских станций. Если карта отдала точку, которой нет в test API, сервис пробует сопоставить адрес через `pickup-points/list`. Иначе покупатель увидит сообщение о расхождении каталогов.

ID ПВЗ с виджета часто приходит с дефисами. Platform API для части точек ждёт id без дефисов. Нормализация: `MsYandexDelivery\Support\StationId::normalize()`.

### Откуда взять `geoId`

Это `geo_id` региона/города из [location/detect](https://yandex.ru/support/delivery-profile/ru/api/other-day/ref/2.-Tochki-samoprivoza-i-PVZ/apib2bplatformlocationdetect-post), не id ПВЗ и не id склада.

Частые значения: Москва `213`, Санкт-Петербург `2`, Казань `43`, Екатеринбург `54`, Новосибирск `65`.
