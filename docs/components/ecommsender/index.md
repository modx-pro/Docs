---
title: eCommSender
description: Электронная коммерция для miniShop2 — события dataLayer (GA4, Яндекс Метрика, GTM) и серверная отправка покупок по Measurement Protocol.
categories: other
outline: [ 2,3 ]
lastUpdated: true
logo: https://modstore.pro/assets/extras/ecommsender/logo.jpg
author: ShevArtV
modstore: https://modstore.pro/packages/integration/ecommsender
repository: https://github.com/ShevArtV/ecommsender
items: [
  { text: 'Начало работы', link: 'index' },
  { text: 'Системные события', link: 'events' },
]
---

# eCommSender

Отправка данных электронной коммерции из магазина на miniShop2 в системы аналитики:
просмотры и клики по товарам, работа с корзиной, оформление и оплата заказа. Данные
формируются чанками, поэтому структуру события под GA4, Яндекс Метрику или
серверный GTM вы задаёте сами.

- События в браузере уходят в `dataLayer` (имя массива настраивается).
- Покупка и создание заказа дополнительно отправляются **с сервера** по Measurement
  Protocol — даже если покупатель не вернулся на сайт после оплаты.
- Контакты покупателя (email, телефон) передаются только sha256-хешами.

## Требования

- MODX 2.6–2.8, PHP 7.4+;
- miniShop2, pdoTools;
- [UniversalEventBus](https://modstore.pro/packages/utilities/universaleventbus) — шина
  событий, через которую серверные события доставляются в браузер.

## Быстрый старт

1. Установите пакет из modstore.
2. Скопируйте `core/components/ecommsender/services/config.inc.php` в своё место (например,
   в каталог своего компонента) и укажите путь к копии в настройке `ecs_config_path`.
3. Скопируйте чанки пакета (`ecsSingleProductTpl`, `ecsListProductsTpl`, `ecsOrderTpl`,
   `ecsMeasurementTpl`) под своими именами, поправьте структуру данных и укажите их имена
   в конфигурации.
4. Установите на сайт код счётчика (Метрика, GTM или gtag).

## Конфигурация

Файл конфигурации — PHP-массив:

| Ключ | Назначение |
|---|---|
| `chunks` | событие → имя чанка. Чанк должен вернуть валидный JSON. Пустое имя — событие не отправляется |
| `templateIds` | id шаблонов ключевых страниц: `orderForm`, `cart`, `successPay` |
| `payedStatuses` | id способа оплаты → id статуса (или массив статусов), при переходе в который заказ считается оплаченным |
| `paymentKeyParams` | id способа оплаты → параметр ссылки на оплату, в котором лежит ключ оплаты |
| `savedCookiesOnCreatingOrder` | куки аналитики, которые сохраняются в свойства заказа при его создании (`_ga`, `_ym_uid`, `_fbp` и т. п.) |
| `hashedKeys` | поля покупателя и заказа, которые хешируются sha256 (`email`, `phone` …) |
| `redefinedSubmit` | переопределять ли отправку формы заказа miniShop2, чтобы `order_created` успел попасть в `dataLayer` |
| `measurementProtocol` | серверная отправка: `events` (событие → чанк), `requestUrl`, `token`, `counterId`, `clientIdKey`, `sessionIdKey` |

Для GTM в `requestUrl` можно использовать плейсхолдер `{site_url}`:
`{site_url}/tm42/g/collect`.

### События

`click`, `detail`, `impressions`, `add`, `remove`, `view_minicart`, `view_cart`,
`initiate_fast_order`, `initiate_checkout`, `add_shipping_info`, `add_payment_info`,
`order_created`, `dl_purchase`, `purchase`.

::: warning
`dl_purchase` и `purchase` взаимоисключающие: если отправлено одно, второе для этого
заказа не отправляется.
:::

`add_shipping_info` отправляется, когда выбрана доставка и заполнены все её обязательные
поля (`msDelivery.requires`). Список полей можно подменить событием
[`ecsOnGetRequires`](events#ecsongetrequires).

## Системные настройки

| Настройка | Назначение |
|---|---|
| `ecs_config_path` | путь к файлу конфигурации |
| `ecs_frontend_js` | путь к скрипту фронтенда |
| `ecs_product_selector` | CSS-селектор карточки товара (по умолчанию `.ms2_form`) |
| `ecs_product_link_selector` | CSS-селекторы ссылок на товар для события `click`; пусто — клики не отслеживаются |
| `ecs_list_attr_name` | data-атрибут списка товаров (по умолчанию `data-ecs-list`) |
| `ecs_data_param_name` | имя массива для пушей (по умолчанию `dataLayer`) |
| `ecs_redirect_timeout` | задержка перед переходом на оплату или страницу «Спасибо», мс |
| `ecs_debug`, `ecs_log_level` | логирование через mxLogger (если установлен) |

## Разметка

Просмотр списка товаров (`impressions`) — атрибуты на обёртке списка:

```html
<div data-ecs-list="catalog|Каталог" data-ueb-event="show" data-ueb-once="1">
  …карточки товаров…
</div>
```

Открытие мини-корзины в модальном окне и окна быстрого заказа:

```html
<button data-ueb-event="open" data-ueb-params="eventName:ecsViewMiniCart">Корзина</button>
<button data-ueb-event="open" data-ueb-params="eventName:ecsFastOrderWithCart">Купить в 1 клик</button>
```

Отключить отслеживание целиком можно, сняв привязку плагина `ecsEventWatcher` к нужным
системным событиям.

## Защита от дублей

С версии 1.2.0:

- События, привязанные к заказу (`order_created`, `dl_purchase`, `purchase`),
  захватываются атомарно: под блокировкой MySQL (`GET_LOCK`) флаг заказа перечитывается
  из базы и ставится до отправки. Параллельные запросы — вебхук платёжной системы и
  возврат покупателя на сайт — больше не отправляют покупку дважды.
- Каждый пуш получает поля `event_uid` (уникальный идентификатор) и `event_time` (время
  формирования на сервере, мс). Скрипт не кладёт в `dataLayer` пуш, `event_uid` которого
  уже встречался в этой вкладке (`sessionStorage`, ключ `ecsSeenEvents`), и пуш старше
  30 минут. Так повторная доставка из очереди шины при перезагрузке страницы или в новой
  вкладке не создаёт дублей.
- Measurement Protocol кодирует строку запроса по RFC 3986 (пробел — `%20`).

::: tip
Поле называется `event_uid`, а не `event_id`: `event_id` зарезервирован для склейки
браузерного и серверного событий в системах аналитики.
:::

## Порядок плагинов на событиях корзины

С версии 1.2.0 плагин `ecsEventWatcher` подписан на `msOnAddToCart`, `msOnChangeInCart`
и `msOnRemoveFromCart` с приоритетом `10` — после скидочных плагинов, которые меняют цену
позиции на тех же событиях. Благодаря этому `add` уходит с ценой уже со скидкой.
