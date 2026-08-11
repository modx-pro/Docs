---
title: Заказы
description: Список заказов в менеджере, черновики, статусы и пересчёт стоимости
---
# Заказы

Откройте **Extras → MiniShop3 → Заказы**. Слева грид всех заказов, по клику открывается карточка (Vue 3 + PrimeVue).

![Список заказов](/components/minishop3/screenshots/mgr-orders.png)

## Список

Грид `OrdersGrid` фильтрует и сортирует строки. Поиск идёт по номеру, email, телефону и другим колонкам из конфигурации грида. Клик по строке открывает карточку.

### Черновики

Пока покупатель на витрине не нажал «Оформить», в БД лежит заказ со статусом черновика (`ms3_status_draft`). Системная настройка `ms3_order_show_drafts` задаёт, показывать ли черновики в гриде по умолчанию.

В тулбаре есть переключатель «Показывать черновики». Браузер пишет выбор в `localStorage` (`ms3_orders_show_drafts`) и шлёт в API параметр `show_drafts`.

Старые черновики чистит Scheduler по `ms3_delete_drafts_after`. См. [Scheduler](/components/minishop3/development/scheduler).

## Карточка

Карточка `OrderView` держит вкладки: состав, покупатель, доставка и оплата, комментарии, плюс вкладки аддонов, если вы их зарегистрировали.

![Карточка заказа](/components/minishop3/screenshots/mgr-order.png)

### Статус

Меняйте `status_id` в форме. Сохранение уходит как `PUT /api/mgr/orders/{id}`. Смена статуса может запустить письма и Telegram по правилам [Центра уведомлений](/components/minishop3/interface/notifications).

Черновик в «настоящий» заказ переводите кнопкой финализации: `POST /api/mgr/orders/{id}/finalize`. Это не тот же путь, что submit на витрине.

### Пересчёт стоимости

На сводке сохранённого заказа нажмите пересчёт. Запрос:

`POST /api/mgr/orders/{id}/recalculate-cost`

Режимы: `auto`, `manual`, `force_provider`. Кнопка неактивна, пока идёт сохранение, уже крутится пересчёт или вы не сохранили правки доставки и оплаты.

Пересчёт заново считает корзину, доставку и оплату по текущим провайдерам. Детали ответа: [Backend API заказа](/components/minishop3/development/backend-api/order).

### Доставка и оплата

Выберите пару, которую связали в карточке доставки. Иначе сохранение или финализация вернут ошибку недопустимой пары.

## Права и API

Все операции идут через Manager API `/api/mgr/orders/*` под сессией MODX. Каркас маршрутов: [API Router](/components/minishop3/development/routing).

## См. также

- [Клиенты](/components/minishop3/interface/customers)
- [Статусы и события](/components/minishop3/development/events/status)
- [Системные настройки: заказы](/components/minishop3/settings)
