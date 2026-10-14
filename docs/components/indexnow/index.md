---
title: IndexNow
description: Очередь URL и уведомление поисковиков по протоколу IndexNow
categories: utilities
author: Ibochkarev
logo: https://modstore.pro/assets/extras/indexnow/logo.png
modstore: https://modstore.pro/packages/utilities/indexnow
compatibility:
  - modx2
  - modx3
  - php72
items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'Ключ и key file', link: 'key' },
  { text: 'Менеджер', link: 'manager' },
  { text: 'Очередь и отправка', link: 'queue' },
  { text: 'Контексты и домены', link: 'contexts' },
  { text: 'Решение проблем', link: 'troubleshooting' },
  { text: 'FAQ', link: 'faq' },
]
---

# IndexNow

IndexNow ставит URL страниц MODX в очередь и сообщает о них поисковым системам по протоколу [IndexNow](https://www.indexnow.org/). По умолчанию endpoint Яндекса: `https://yandex.com/indexnow`. Документация Яндекса: [Поддержка протокола IndexNow](https://yandex.ru/support/webmaster/ru/indexing-options/index-now).

Один transport package ставится на MODX Revolution **2.x и 3.x**.

IndexNow **не индексирует** страницу. Он только уведомляет поисковик, что URL изменился. Появление в выдаче решает поисковая система.

## Как устроено

1. Вы сохраняете, публикуете, снимаете с публикации или удаляете ресурс.
2. Плагин добавляет URL в очередь (или обновляет уже существующую запись).
3. После ответа HTTP срабатывает **queue tick**: до 25 due-URL за один shutdown. См. [Очередь и отправка](queue). Дополнительно: [Scheduler](/components/scheduler/) по cron или кнопка **Обработать очередь**.
4. Результат пишется в историю.

Ошибки IndexNow не мешают сохранению ресурса: работа плагина обёрнута в try/catch.

## Возможности

- очередь при создании, изменении, снятии с публикации и удалении
- ключ и файл `{key}.txt` в корне сайта
- batch по host, retry при временных ошибках
- история отправок
- ручная постановка URL в очередь (`update`)
- фоновая обработка: queue tick, опционально Scheduler, кнопка в менеджере

## Требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 2.8+ или 3.x |
| PHP | 7.2+ |
| curl | рекомендуется |
| [Scheduler](/components/scheduler/) | опционально, запасной cron для очереди |

Интерфейс менеджера на ExtJS. Composer на сервере не нужен.

## Установка

В Package Manager нужен провайдер modstore.pro (URL сервиса `https://modstore.pro/extras/`). Иначе установка падает с `[encryptedVehicle] package provider not found` (или аналогичным сообщением про provider). Как подключить: [инструкция ModStore](https://modstore.pro/info/connection).

1. [Подключите репозиторий ModStore](https://modstore.pro/info/connection), если его ещё нет.
2. **Extras → Installer** (на MODX 3: **Пакеты**) → найдите **IndexNow** → **Download** → **Install**.
3. Откройте **Extras → IndexNow** и проверьте вкладку **Статус**.

При установке пакет регистрируется в системной настройке `extension_packages`. Дальше: [Быстрый старт](quick-start).
