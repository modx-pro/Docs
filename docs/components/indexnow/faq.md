---
title: FAQ
description: Индексация, Scheduler, delete, endpoint и совместимость MODX 2/3
---

# FAQ

## Страница не появилась в поиске

IndexNow только уведомляет поисковую систему. Срок и факт индексации решает поисковик. У Яндекса: [Поддержка протокола IndexNow](https://yandex.ru/support/webmaster/ru/indexing-options/index-now).

## Нужен ли Scheduler?

Нет. Scheduler только подстраховывает tick на сайтах без HTTP-трафика.

| Способ | Когда | Лимит за проход |
| --- | --- | --- |
| Queue tick | После постановки URL: сохранение ресурса, загрузка менеджера, **Отправить** (shutdown того же запроса) | 25 due-URL |
| Scheduler | Минутный cron, если пакет установлен | `indexnow_batch_size` |
| **Обработать очередь** | Кнопка на вкладке Статус | `indexnow_batch_size` |

Без Scheduler и без трафика нажмите **Обработать очередь**. Подробнее: [Очередь и отправка](/components/indexnow/queue).

## Вкладка «Отправка URL» сразу шлёт на Яндекс?

Нет прямого POST на Яндекс из формы. URL попадают в очередь с `update`. `kickQueue()` планирует tick, если очередь включена. Если выключена, сразу вызывается worker.

## Что уходит при удалении страницы

URL с действием `delete`. Снятие с публикации тоже ставит `delete`.

## Можно ли слать чужие сайты

Нет. Ручная отправка принимает только host ваших контекстов. Localhost и private IP в URL тоже отклоняются.

## Какой endpoint по умолчанию

`https://yandex.com/indexnow` ([документация Яндекса](https://yandex.ru/support/webmaster/ru/indexing-options/index-now)). Другой IndexNow-совместимый URL задаётся в [`indexnow_endpoint`](/components/indexnow/settings).

## IndexNow ломает сохранение ресурса?

Не должен. Если ресурс не сохраняется, ищите причину в другом плагине или валидации. Сообщения IndexNow в логе сами по себе сохранение не блокируют.

## Где смотреть историю отправок

**Extras → IndexNow → История**. Срок хранения задаёт [`indexnow_history_retention_days`](/components/indexnow/settings).

## Пакет для MODX 2 и 3 разный?

Нет. Один transport package.
