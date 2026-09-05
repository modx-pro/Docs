---
title: FAQ
description: Индексация, Scheduler, delete, endpoint и совместимость MODX 2/3
---

# FAQ

## Страница не появилась в поиске

IndexNow только уведомляет поисковую систему. Срок и факт индексации решает поисковик. У Яндекса: [Поддержка протокола IndexNow](https://yandex.ru/support/webmaster/ru/indexing-options/index-now).

## Нужен ли Scheduler

Для фона Scheduler удобнее. Без него очередь копится, а отправка идёт кнопкой **Обработать очередь** или ручной вкладкой.

## Что уходит при удалении страницы

URL с действием `delete`. Снятие с публикации тоже ставит `delete`.

## Можно ли слать чужие сайты

Нет. Ручная отправка принимает только host ваших контекстов.

## Какой endpoint по умолчанию

`https://yandex.com/indexnow` ([документация Яндекса](https://yandex.ru/support/webmaster/ru/indexing-options/index-now)). Другой IndexNow-совместимый URL задаётся в `indexnow_endpoint`.

## IndexNow ломает сохранение ресурса

Не должен. Если ресурс не сохраняется, ищите причину в другом плагине или валидации. Сообщения IndexNow в логе сами по себе сохранение не блокируют.

## Где смотреть историю отправок

**Extras → IndexNow → История**. Срок хранения задаёт `indexnow_history_retention_days`.

## Пакет для MODX 2 и 3 разный

Нет. Один transport package.
