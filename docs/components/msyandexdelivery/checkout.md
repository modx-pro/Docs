---
title: Чекаут и сниппеты
description: Сниппеты msYandexDelivery и msydLexiconScript, виджет ПВЗ на чекауте MiniShop3
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

Сниппет `msYandexDelivery` подключает CSS/JS чекаута, скрипт виджета ПВЗ и конфиг `window.msYandexDeliveryFrontend`. Контейнер `data-msyd-widget` рисует выбор тарифа, адрес (до двери) и карту ПВЗ.

Чанк **`tplYandexDeliveryMethods`** — обёртка `<div class="msyd-methods" data-msyd-methods>` для списка методов (используется фронтом компонента).

## Сниппет `msYandexDelivery`

Назначение: зарегистрировать assets и конфиг фронта. Возвращает пустую строку.

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `connectorUrl` | `{assets_url}components/msyandexdelivery/connector.php` | URL AJAX-коннектора |
| `widgetScriptUrl` | из `msyandexdelivery_widget_script_url` или CDN v2 | URL скрипта виджета |
| `city` | из `msyandexdelivery_widget_city` | Город карты |
| `height` | из `msyandexdelivery_widget_height` | Высота виджета, px (минимум 200) |

Параметры `widgetScriptUrl`, `city`, `height` читаются из сниппета, даже если их нет в карточке свойства в build.

Пример с override города:

::: code-group

```modx
[[!msYandexDelivery?
  &city=`Санкт-Петербург`
  &height=`500`
]]
```

```fenom
{'!msYandexDelivery' | snippet : [
  'city' => 'Санкт-Петербург',
  'height' => 500,
]}
```

:::

## Сниппет `msydLexiconScript`

Без параметров. Выводит `window.msydLexicon` с ключами фронта (подписи тарифов, кнопки, подсказки). Вызывайте **до** `msYandexDelivery`.

## Поведение на чекауте

1. Покупатель выбирает способ доставки Яндекса в MiniShop3.
2. Блок `data-msyd-widget` показывает тарифы **до двери** (`time_interval`) и **ПВЗ** (`self_pickup`).
3. **До двери:** адрес → `connector.php?action=calculate` → `select_option`.
4. **ПВЗ:** официальный виджет → событие `YaNddWidgetPointSelected` → `calculate` + `select_option` с `platform_station_id`.
5. Выбор уходит в сессию и в `msOrder.properties.msyandexdelivery` (tariff, platform_station_id, address, price, delivery_days).
6. Плагин на `msOnGetDeliveryCost` и `YandexDelivery::getCost()` подставляют стоимость в заказ.

Публичные actions коннектора (без mgr-auth): `calculate`, `select_option`, `list_pickup_points`.

## Виджет ПВЗ

Скрипт по умолчанию: `https://widget-pvz.dostavka.yandex.net/widget.js?v=2`.

CDN-виджет показывает **prod-каталог** точек. Test API (`b2b.taxi.tst.yandex.net`) знает только часть московских станций. Если карта отдала точку, которой нет в test API, сервис пробует сопоставить адрес через `pickup-points/list`. Иначе покупатель увидит сообщение о расхождении каталогов.

ID ПВЗ с виджета часто приходит с дефисами. Platform API для части точек ждёт id без дефисов. Нормализация: `MsYandexDelivery\Support\StationId::normalize()`.
