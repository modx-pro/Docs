---
title: ms3FirstTimeBuyerDiscount
description: Скидка на первый заказ для MiniShop3 — автоматическое применение при 0 оплаченных заказов (процент или фикс)
dependencies: miniShop3
categories: minishop3

items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'API и события', link: 'api' },
  { text: 'Интеграция с MiniShop3', link: 'integration' },
  { text: 'Расширение', link: 'extension' },
]
---
# ms3FirstTimeBuyerDiscount

Компонент для [MiniShop3](/components/minishop3/): автоматическая скидка на первый заказ. При нуле оплаченных заказов к стоимости корзины применяется скидка (процент или фиксированная сумма). Для авторизованных учитывается `user_id`, для гостей — `email`/`phone` из `Address` черновика заказа. Оплаченные заказы определяются по настройке MiniShop3 `ms3_status_for_stat`.

**Именование:** для пользователя — **ms3FirstTimeBuyerDiscount**; в коде (папки, namespace, плагины) — **ms3firsttimebuyerdiscount**.

## Возможности

- **Скидка на первый заказ** — применяется при расчёте корзины (событие `msOnGetCartCost`), без правки шаблонов
- **Тип скидки** — процент от суммы или фиксированная сумма в валюте магазина
- **Определение «первого» покупателя** — для пользователя по `user_id`, для гостя по `email`/`phone`, с учётом статусов из `ms3_status_for_stat`
- **События** — `ftbOnBeforeApply` (отмена или подмена суммы), `ftbOnApply` (логирование, аналитика)
- **Интеграция с фронтендом** — в ответ `getCost()` добавляется `ftb_discount` (`amount`, `message`) для показа уведомления
- **Расширяемость** — подмена сервиса в контейнере `ms3ftb_discount`, наследование `FtbDiscountService`

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.x |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

### Зависимости

- **[MiniShop3](/components/minishop3/)** — корзина, заказы, событие `msOnGetCartCost`, настройка `ms3_status_for_stat`

## Установка

### Через ModStore

1. [Подключите репозиторий ModStore](https://modstore.pro/info/connection)
2. Перейдите в **Extras → Installer** и нажмите **Download Extras**
3. Убедитесь, что установлен **MiniShop3**
4. Найдите **ms3FirstTimeBuyerDiscount** в списке и нажмите **Download**, затем **Install**
5. **Управление → Очистить кэш**

### После установки

Включите плагин **ms3FirstTimeBuyerDiscount** и привяжите его к событию **msOnGetCartCost**. Задайте настройки скидки в **Настройки → ms3firsttimebuyerdiscount**.

Подробнее: [Быстрый старт](quick-start).

## Термины

| Термин | Описание |
|--------|----------|
| **First-Time Buyer** | Авторизованный пользователь или гость с нулём заказов в статусах из настройки MiniShop3 `ms3_status_for_stat` |
| **Оплаченный заказ** | Заказ в одном из статусов, перечисленных в `ms3_status_for_stat` (например, «Оплачен», «Доставлен») |
| **Скидка** | Сумма или процент, вычитаемые из стоимости корзины при расчёте в `msOnGetCartCost`; дополнительно в API-ответ добавляется `ftb_discount` |
