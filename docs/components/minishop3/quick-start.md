---
title: Быстрый старт
description: Установка MiniShop3, служебные страницы, первый товар и тестовый заказ
---
# Быстрый старт

Поставьте пакет, заведите служебные страницы, создайте товар и проведите тестовый заказ на витрине.

## Системные требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |
| Composer | 2.x |

### Зависимости

| Пакет | Зачем |
| --- | --- |
| **pdoTools 3.x** | Сниппеты и Fenom |
| **[VueTools](/components/vuetools/)** | Vue 3 и PrimeVue в админке |
| **[Scheduler](/components/scheduler/)** (опционально) | Фон: импорт, уведомления, очистка черновиков |

## Установка

1. [Подключите репозиторий modstore.pro](https://modstore.pro/info/connection).
2. Откройте **Пакеты → Установщик**, поставщик Modstore.pro, **Загрузить пакеты**.
3. Скачайте и установите по очереди: **pdoTools**, **VueTools**, затем **MiniShop3**. **Scheduler** ставьте, если нужны фоновые задачи.

Другие способы установки: [главная страница](index).

### Что создаёт установка

1. Таблицы через Phinx (каталог, заказы, клиенты, `ms3_grid_fields` и др.).
2. Сниппеты, плагины, чанки.
3. Системные настройки с префиксом `ms3_`.
4. Пять статусов заказа (id 1–5: черновик, новый, оплачен, отправлен, отменён). Ключи `ms3_status_new` / `paid` / `canceled` получают id 2, 3, 5.
5. Доставка «Самовывоз» (id 1) и оплата «Наличными» (id 1) со связью в `ms3_delivery_payments`.
6. Задачи Scheduler (`ms3_cleanup_tokens`, `ms3_cleanup_drafts`) — активируются после включения `ms3_use_scheduler`.

После установки откройте **System → System Settings → minishop3** и проверьте `ms3_status_*`, если меняли статусы вручную.

## Служебные страницы

Создайте ресурсы и вызовите сниппеты **некэшированно**.

| Страница | Сниппет | Пример |
| --- | --- | --- |
| Корзина | `msCart` | `{'!msCart' \| snippet}` |
| Оформление | `msOrder` | `{'!msOrder' \| snippet}` |
| Спасибо / заказ | `msGetOrder` | `{'!msGetOrder' \| snippet}` |
| Мини-корзина в шапке | `msOrderTotal` | `{'!msOrderTotal' \| snippet}` |
| ЛК (профиль) | `msCustomer` | `service=profile` |
| История заказов | `msCustomer` | `service=orders` |
| Адреса | `msCustomer` | `service=addresses` |

Гость на любой странице `msCustomer` видит формы входа и регистрации (`tpl.msCustomer.unauthorized`). Отдельная настройка: [Вход и регистрация](frontend/customer-auth).

Готовые шаблоны лежат в `core/components/minishop3/elements/templates/`:

- `catalog.tpl`, `product.tpl`, `cart.tpl`, `order.tpl`, `thanks.tpl`, `customer.tpl`

Скопируйте разметку в свои шаблоны MODX и подгоните под дизайн.

### Страница «Спасибо»

На URL с `?msorder=`:

- `msOrder` возвращает пустую строку — форма оформления не дублируется.
- `msGetOrder` показывает детали заказа (UUID или числовой id в query).
- `msCart` по умолчанию **рендерится** (блок корзины в layout работает). Чтобы скрыть конкретный вызов корзины, передайте `hideOnThanks=1`.

Обычно на одной странице «Спасибо» достаточно `msGetOrder` + `msOrderTotal` в шапке.

::: code-group

```fenom
{'!msCart' | snippet}
```

```modx
[[!msCart]]
```

:::

## Системные настройки page_id

**Системные настройки** → namespace `minishop3` (поиск `page_id`):

<!-- ![Настройки page_id](/components/minishop3/screenshots/mgr-system-settings.png) -->

| Настройка | Что указать |
| --- | --- |
| `ms3_cart_page_id` | ID корзины |
| `ms3_order_page_id` | ID оформления |
| `ms3_order_redirect_thanks_id` | ID «Спасибо» |
| `ms3_order_success_page_id` | Редирект после успешной оплаты |
| `ms3_customer_profile_page_id` | Профиль |
| `ms3_customer_orders_page_id` | История заказов |
| `ms3_customer_addresses_page_id` | Адреса |
| `ms3_customer_login_page_id` | Обычно тот же профиль |
| `ms3_customer_register_page_id` | Обычно тот же профиль |

Полный список: [Системные настройки](settings).

`ms3_cart_page_id` и `ms3_order_page_id` используют JS витрины для ссылок «В корзину» и «Оформить заказ». Без них редирект после submit всё равно сработает через `ms3_order_redirect_thanks_id`.

## Scheduler (опционально)

Если нужны фоновый импорт CSV, отложенные уведомления и автоудаление черновиков:

1. Установите [Scheduler](/components/scheduler/) и настройте cron.
2. Включите `ms3_use_scheduler`.
3. При необходимости задайте `ms3_delete_drafts_after` (например `-2 weeks`).

Подробнее: [Интеграция с Scheduler](development/scheduler).

## Web API (headless)

Точка входа: `/assets/components/minishop3/api.php?route=/api/v1/...`.

| Сценарий | Эндпоинт |
| --- | --- |
| Токен гостя | `GET /api/v1/customer/token/get` |
| Каталог без токена | `GET /api/v1/product/list`, `GET /api/v1/product/get/{id}` |
| Корзина | `/api/v1/cart/*` |
| Checkout | `/api/v1/order/*` |
| ЛК | `/api/v1/customer/*` (login, addresses, orders) |
| Health | `GET /api/v1/health` |

На группу `/api/v1` действуют CORS и rate limit. Полная карта: [REST API](development/api).

## Категория и товар

1. **Ресурсы** → новый ресурс, тип **Категория товаров**, шаблон каталога, сохранить.
2. В категории: **Добавить товар**, шаблон товара, сохранить.
3. Вкладка **Свойства товара**: артикул, цена, вес, изображение.
4. Отметьте **Опубликовано**.

<!-- ![Категория](/components/minishop3/screenshots/mgr-category-products.png) -->

## Доставка и оплата

В **Extras → MiniShop3 → Настройки** проверьте, что есть хотя бы один активный способ доставки и один способ оплаты. После установки resolver создаёт «Самовывоз» (id 1) и «Наличными» (id 1) с правилами `first_name`, `last_name`, `email` для самовывоза.

Без связки delivery↔payment оформление на витрине упадёт с ошибкой пары.

## Первый тестовый заказ

1. Откройте витрину категории, добавьте товар в корзину.
2. Перейдите в корзину, затем в оформление.
3. Заполните обязательные поля выбранной доставки.
4. Выберите оплату, совместимую с доставкой.
5. Отправьте заказ. Должна открыться страница «Спасибо» с `msGetOrder`.
6. В админке **Заказы** появится заказ со статусом «Новый» (не черновик). Черновики видны только при `ms3_order_show_drafts=1`.

Гостевой заказ может сам создать `msCustomer`, если включены `ms3_customer_auto_register_on_order` и `ms3_customer_auto_login_on_order`.

Онлайн-оплату даёт отдельный платёжный extra (ЮKassa, Сбер и т.д.). Базовый способ в MS3 без класса `class` только фиксирует выбор оплаты. См. [Способы оплаты](interface/settings/payments).

## Дальше

- [Вход и регистрация](frontend/customer-auth)
- [Оформление заказа](frontend/order)
- [Заказы в админке](interface/orders)
- [Сниппеты](snippets/)
- [REST API](development/api)
