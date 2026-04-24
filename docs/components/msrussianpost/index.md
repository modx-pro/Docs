---
title: msRussianPost
description: Расчёт доставки Почтой России для MODX 3 и MiniShop3
logo: https://modstore.pro/assets/extras/msrussianpost/logo.png
author: ibochkarev

items:
  - text: Быстрый старт
    link: quick-start
  - text: Админка в MODX
    link: admin-ui
  - text: Системные настройки
    link: settings
  - text: Сниппеты
    link: snippets
    items:
      - text: msRussianPost
        link: snippets/msRussianPost
      - text: msrpLexiconScript
        link: snippets/msrpLexiconScript
  - text: Подключение на сайте
    link: frontend
  - text: Интеграция и кастомизация
    link: integration
  - text: FAQ и траблшутинг
    link: faq
---
# msRussianPost

**msRussianPost** — дополнение для расчёта стоимости и сроков доставки **Почтой России** в связке **[MODX Revolution 3](https://modx.com/)** и **[MiniShop3](/components/minishop3/)**. Используются два API: публичный (`tariff.pochta.ru`) и персональный (`otpravka.pochta.ru`).

## Возможности

- **Интеграция с доставками MiniShop3** — класс `msrussianpost\Delivery\RussianPostDelivery`, привязка виджета к доставке через настройку `delivery_id` (или авто по классу в БД)
- **Виджет на оформлении заказа** — ввод индекса, список методов с ценой и сроком. Показ и скрытие при смене способа доставки (обёртка `.msrp__wrapper` или `[data-msrp-widget]`)
- **Плагины** — **msRussianPost Autoload** (`OnMODXInit`) подключает класс доставки; **msRussianPost Delivery** (`msOnGetDeliveryCost`) подставляет стоимость выбранного метода; **msRussianPost Order tariff** (`msOnSubmitOrder`, `msOnBeforeCreateOrder`, `msOnCreateOrder`) сохраняет код тарифа в свойствах заказа для карточки в менеджере MiniShop3
- **Кэш ответов API** — настраиваемый TTL, очистка из панели компонента в MODX
- **Админ-панель (Vue 3, PrimeVue 4)** — раздел **Extras → Почта России**: тестовый расчёт, журнал запросов к API, справочник кодов объектов, очистка кэша (нужен [VueTools](https://docs.modx.pro/components/vuetools/)) — см. [Админка в MODX](admin-ui)
- **Фронтенд** — ES-модульный скрипт без jQuery, хуки `ms3Hooks`, кастомные DOM-события
- **Локализация** — лексиконы MODX (ru, en, uk). Для JavaScript сначала подключайте сниппет `msrpLexiconScript`, затем `msRussianPost`
- **Кастомизация** — Fenom-чанки `tplRussianPostStatus`, `tplRussianPostMethods`, BEM-префикс `msrp__`, CSS-переменные

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |
| MySQL / MariaDB | версии, совместимые с MODX 3 |

### Зависимости

- **[MiniShop3](/components/minishop3/)** — корзина, заказ, доставки.
- **[VueTools](https://docs.modx.pro/components/vuetools/)** — открывает в панели управления MODX раздел **Extras → Почта России** (тест расчёта, журнал, справочник). Для оформления заказа на сайте VueTools **не нужен**: виджет расчёта доставки работает без этого пакета.

## Установка

Кратко: пакет через **Extras → Installer**, затем создание способа доставки в MiniShop3 и системные настройки. Подробности — в разделе [Быстрый старт](quick-start).

### Через ModStore

1. [Подключите репозиторий ModStore](https://modstore.pro/info/connection), если ещё не подключён
2. **Extras → Installer → Download Extras** — найдите **msRussianPost**, установите пакет
3. Убедитесь, что установлен **MiniShop3**. Установите **VueTools** отдельно, если нужен раздел **Extras → Почта России** в панели управления MODX
4. **Настройки → Очистить кэш**

### После установки

Создайте способ доставки с классом `msrussianpost\Delivery\RussianPostDelivery`, укажите `delivery_id` и индекс отправителя, вставьте блок виджета в чанк заказа (лексикон → сниппет → чанки). См. [Быстрый старт](quick-start) и [Подключение на сайте](frontend).

## Термины

| Термин | Описание |
|--------|----------|
| **Код объекта** | Код услуги Почты России в API (например `23030` — посылка онлайн, `27030` — EMS RT) |
| **Режим API** | `tariff` — публичный калькулятор. `otpravka` — персональные тарифы по договору |
| **Fallback** | При сбое или лимите otpravka расчёт по конкретным кодам добирается через публичный API |
| **Виджет** | Блок статуса + список методов на странице оформления заказа |
