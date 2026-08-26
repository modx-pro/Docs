---
title: FAQ
description: Частые ошибки msYandexDelivery — Base URL, test API, виджет ПВЗ, статусы и отмена
---

# FAQ

## Ошибка валидации / пустой Base URL

Компонент требует `msyandexdelivery_base_url`. Без host клиент не ходит в API. Укажите test или prod host из [доступа к API](https://yandex.com/support/delivery-profile/ru/api/other-day/access). Метка `environment` host не выбирает.

## 401 / 403 от API

Проверьте Bearer в `msyandexdelivery_oauth_token` и что `base_url` соответствует контуру токена (test vs prod).

## На test API «Not found station»

Test API знает ограниченный набор точек (в основном Москва). CDN-виджет ПВЗ показывает prod-каталог. Точка с карты может отсутствовать в tst API.

Для ручной проверки берите `platform_station_id` из ответа `pickup-points/list` или из `docs/testing.md` в репозитории компонента.

## Цена на карте виджета и в заказе различаются

Виджет показывает публичные тарифы карты. Итоговая стоимость заказа берётся из вашего `pricing-calculator` после `calculate` / `select_option`.

## В заказе `delivery_cost = 0`, хотя в properties есть price

При сохранении опции `delivery_cost` синхронизируется из `option.price`, а tariff выравнивается по `delivery_id`. Проверьте новый заказ после расчёта на чекауте.

Старые заказы с нулевым `delivery_cost` пакет сам не пересчитывает. Если нужна аналитика по ним, выравнивайте вручную (в репозитории пакета есть helper `msyd_sync_order_delivery_cost_from_offer()`).

## Адрес в форме есть, а виджет просит указать адрес

Нужна форма с классом `ms3_order_form` и загруженный `ms3.js`. Виджет слушает `change`/`input`, хук `afterAddOrder` и `ms3:ready`. После обновления пакета очистите кэш MODX и сделайте жёсткий refresh на чекауте.

## При выключенном компоненте чекаут «ломается»

При `msyandexdelivery_enabled = Нет` вызовы Яндекса не выполняются. MiniShop3 должен работать как без пакета. Если способ доставки Яндекса всё ещё выбран у покупателя, отключите или скройте эти способы в MS3.

## Нет вкладки в менеджере

Нужен установленный и рабочий **VueTools**. Отдельного CMP у пакета нет: меню открывает только системные настройки.

## Как отменить заявку?

На вкладке заказа нажмите **Отменить**. Connector вызывает `cancel_request` → `POST …/request/cancel`. Кнопка недоступна после передачи курьеру и на терминальных статусах. Альтернатива: кабинет Яндекс Доставки.

## Где webhook?

Его нет. Other-day API не шлёт callback. Обновляйте статус кнопкой **Refresh** или пакетным опросом ([Scheduler / cron](integration#опрос-статусов)).
