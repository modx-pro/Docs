---
title: Заказы
description: Список заказов в менеджере, черновики, статусы и пересчёт стоимости
---
# Заказы

Откройте **Extras → MiniShop3 → Заказы**. Слева грид всех заказов, по клику открывается карточка.

<!-- ![Список заказов](/components/minishop3/screenshots/mgr-orders.png) -->

## Список

Грид `OrdersGrid` фильтрует и сортирует строки. Поиск идёт по номеру, email, телефону и другим колонкам из конфигурации грида. Клик по строке открывает карточку.

Сводка по фильтрам (счётчики статусов, суммы) подгружается отдельно: `GET /api/mgr/orders/stats` с теми же query-параметрами, что и список.

### Создание заказа из менеджера

Кнопка «Создать заказ» вызывает `POST /api/mgr/orders` — пустой или частично заполненный заказ без витрины. Дальше добавляют позиции и завершают оформление. События: `msOnBeforeMgrCreateOrder`, `msOnMgrCreateOrder`.

### Черновики

Пока покупатель на витрине не нажал «Оформить», в БД лежит заказ со статусом черновика (`ms3_status_draft`). Системная настройка `ms3_order_show_drafts` задаёт, показывать ли черновики в гриде по умолчанию.

В тулбаре есть переключатель «Показывать черновики». Браузер пишет выбор в `localStorage` (`ms3_orders_show_drafts`) и шлёт в API параметр `show_drafts`.

Старые черновики чистит Scheduler по `ms3_delete_drafts_after`. См. [Scheduler](/components/minishop3/development/scheduler).

## Карточка

Карточка `OrderView` держит вкладки: состав, покупатель, доставка и оплата, комментарии, плюс вкладки аддонов, если вы их зарегистрировали.

<!-- ![Карточка заказа](/components/minishop3/screenshots/mgr-order.png) -->

### Статус

Меняйте `status_id` в форме. Сохранение уходит как `PUT /api/mgr/orders/{id}`. Смена статуса может запустить письма и Telegram по правилам [Центра уведомлений](/components/minishop3/interface/notifications).

Черновик в «настоящий» заказ переводите кнопкой финализации: `POST /api/mgr/orders/{id}/finalize`. Это не тот же путь, что submit на витрине.

### Дополнительные поля заказа

Свои колонки на заказе создают через [extra fields](/components/minishop3/manager/examples/order-custom-field). В БД и при POST класс — `MiniShop3\Model\msOrder`. Карточка заказа в 1.13.x запрашивает `GET /api/mgr/extra-fields?class=msOrder` (короткий алиас): фильтр точный, поэтому секция может быть пустой при корректно созданном поле. Подробности и workaround — в troubleshooting примера.

Сохранение: `PUT /api/mgr/orders/{id}` ключом поля на верхнем уровне JSON (`msorder_save`). Метаданные extra fields грузятся только с правом `mssetting_save`.

<!-- ![Секция дополнительных полей на карточке заказа](/components/minishop3/screenshots/mgr-order-extra-field.png) -->

### Пересчёт стоимости

На сводке сохранённого заказа нажмите пересчёт. Запрос:

`POST /api/mgr/orders/{id}/recalculate-cost`

Режимы: `auto`, `manual`, `force_provider`. Кнопка неактивна, пока идёт сохранение, уже крутится пересчёт или вы не сохранили правки доставки и оплаты.

Пересчёт заново считает корзину, доставку и оплату по текущим провайдерам. Детали ответа: [Backend API заказа](/components/minishop3/development/backend-api/order).

### Доставка и оплата

Выберите пару, которую связали в карточке доставки. Иначе сохранение или финализация вернут ошибку недопустимой пары.

## Права и API

Все операции идут через Manager API `/api/mgr/orders/*` под сессией MODX. Чтение — право `msorder_list`, изменения — `msorder_save`. Каркас маршрутов: [API Router](/components/minishop3/development/routing).

События позиций заказа (`msOnBeforeCreateOrderProduct` и др.) при добавлении строк из карточки: [События позиций заказа](/components/minishop3/development/events/order-product).

## См. также

- [Клиенты](/components/minishop3/interface/customers)
- [Статусы и события](/components/minishop3/development/events/status)
- [Системные настройки: заказы](/components/minishop3/settings)
