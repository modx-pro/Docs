---
title: FAQ
description: Частые ошибки msYandexDelivery — Base URL, test API, виджет ПВЗ, отмена заявки
---

# FAQ

## Ошибка валидации / пустой Base URL

Компонент требует `msyandexdelivery_base_url`. Без host клиент не ходит в API. Укажите test или prod host из [доступа к API](https://yandex.com/support/delivery-profile/ru/api/other-day/access). Метка `environment` host не выбирает.

## Test connection падает с 401 / 403

Проверьте Bearer в `msyandexdelivery_oauth_token` и что `base_url` соответствует контуру токена (test vs prod).

## На test API «Not found station»

Test API знает ограниченный набор точек (в основном Москва). CDN-виджет ПВЗ показывает prod-каталог. Точка с карты может отсутствовать в tst API.

Для ручной проверки берите `platform_station_id` из ответа `pickup-points/list` или из `docs/testing.md` в репозитории компонента.

## Цена на карте виджета и в заказе различаются

Виджет показывает публичные тарифы карты. Итоговая стоимость заказа берётся из вашего `pricing-calculator` после `calculate` / `select_option`.

## При выключенном компоненте чекаут «ломается»

При `msyandexdelivery_enabled = Нет` вызовы Яндекса не выполняются. MiniShop3 должен работать как без пакета. Если способ доставки Яндекса всё ещё выбран у покупателя, отключите или скройте эти способы в MS3.

## Нет вкладки / CMP в менеджере

Нужен установленный и рабочий **VueTools**. Без него Vue-экраны компонента не загрузятся.

## Как отменить заявку из менеджера?

Кнопка отмены через connector пока не работает: action `cancel_request` не реализован в `switch`. API-метод `request/cancel` в клиенте есть. Отмену делайте в кабинете Яндекса или дождитесь доработки UI.

## Где webhook?

Его нет. Other-day API не шлёт callback. Обновляйте статус кнопкой **Refresh** на вкладке заказа.
