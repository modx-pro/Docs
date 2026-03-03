---
title: ReachGoal
description: Управление целями (Яндекс, Google) через админку
logo: https://modstore.pro/assets/extras/reachgoal/logo-lg.png
author: tventos
modstore: https://modstore.pro/packages/ecommerce/reachgoal
repository: https://github.com/tventos/modx-reachgoal
---
# ReachGoal

**ReachGoal** — Настройка/управление целями для **Яндекс.Метрики**, **Google.Analytics**, **Google tag manager** через админку.

![ReachGoal](https://file.modx.pro/files/b/d/c/bdc375985bd23943731129ed3b337b57.png)

Компонент позволяет управлять целями из админки, цели добавляются на такие события как:

- Добавление в корзину
- Удаление из корзины
- Оформление заказа
- Отправка форм через компонент AjaxForm (по id формы)

## Пример использования

Переходим в компонент **ReachGoal** нажимаем **Добавить**

### Добавление цели Яндекс.Метрики на Оформление заказа

Выбираем событие **Добавление в корзину**, и сервис **Яндекс.Метрика**, пишем название цели, и если нужно **Номер счетчика** (можно оставить пустым если заполнено `reachgoal_yacounter_default`, см. пункт **Настройки**)

![Добавление цели Яндекс.Метрики на Оформление заказа](https://file.modx.pro/files/3/0/3/3036389349861e3bcfd86f4d296c8bcb.png)

### Добавление цели Global Site Tag на отправку формы (AjaxForm)

Выбираем событие **Отправка формы (AjaxForm)**, и сервис **Global Site Tag**, заполняем `id` формы, Действие, Категорию (опционально)

![Добавление цели Global Site Tag на отправку формы - 1](https://file.modx.pro/files/0/8/b/08b1fb694ad2bcceaae9ee6a29fcf815.png)

Получиться примерно так:

![Добавление цели Global Site Tag на отправку формы - 2](https://file.modx.pro/files/7/e/c/7eca53a10577657148fff74f2fd0ca3a.png)

## Настройки компонента

`reachgoal_yacounter_default` — Номер счетчика по умолчанию (только для Яндекс.Метрики)
