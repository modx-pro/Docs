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

Компонент для [MiniShop3](/components/minishop3/): автоматическая скидка на первый заказ. При нуле оплаченных заказов к стоимости корзины применяется скидка (процент или фиксированная сумма). Для авторизованных учитывается `user_id`, для гостей — `email`/`phone` из `Address` черновика заказа. Статусы оплаченных заказов берутся из `ms3_status_for_stat` с учётом `ms3_status_new`.

## Возможности

- **Скидка на первый заказ** — применяется при расчёте корзины (событие `msOnGetCartCost`), без правки шаблонов
- **Тип скидки** — процент от суммы или фиксированная сумма в валюте магазина
- **Определение «первого» покупателя** — для пользователя по `user_id`, для гостя по `email`/`phone`, с учётом статусов из `ms3_status_for_stat`
- **Контроль комбинации скидок** — настройка `ftb_allow_combination` позволяет запретить применение FTB, если в корзине уже есть скидка
- **События** — `ftbOnBeforeApply` (отмена или подмена суммы), `ftbOnApply` (логирование, аналитика)
- **Плашка на странице заказа** — сниппет `ms3ftbDiscountBanner` + frontend-логика проверки eligibility по email/phone
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

Задайте настройки скидки в **Настройки → ms3firsttimebuyerdiscount**.

Подробнее: [Быстрый старт](quick-start).

## Термины

| Термин | Описание |
|--------|----------|
| **First-Time Buyer** | Авторизованный пользователь или гость с нулём заказов в статусах из `ms3_status_for_stat` (с учётом `ms3_status_new`) |
| **Оплаченный заказ** | Заказ в одном из статусов, перечисленных в `ms3_status_for_stat` (например, «Оплачен», «Доставлен») |
| **Скидка** | Сумма или процент, вычитаемые из стоимости корзины при расчёте в `msOnGetCartCost` |
