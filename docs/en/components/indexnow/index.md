---
title: IndexNow
description: Очередь URL и уведомление поисковиков по протоколу IndexNow
author: ibochkarev
categories: utilities
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

IndexNow ставит URL страниц MODX в очередь и сообщает о них поисковым системам по протоколу [IndexNow](https://www.indexnow.org/). По умолчанию endpoint Яндекса: `https://yandex.com/indexnow`. Как это устроено у Яндекса: [Поддержка протокола IndexNow](https://yandex.ru/support/webmaster/ru/indexing-options/index-now).

Один transport package ставится на MODX Revolution **2.x и 3.x**.

IndexNow **не индексирует** страницу. Он только уведомляет поисковик, что URL изменился. Появление в выдаче решает поисковая система.

## Как устроено

1. Вы сохраняете, публикуете, снимаете с публикации или удаляете ресурс.
2. Плагин добавляет URL в очередь (или обновляет уже существующую запись).
3. [Scheduler](/components/scheduler/) или кнопка **Обработать очередь** отправляет batch на endpoint.
4. Результат пишется в историю.

Ошибки IndexNow не мешают сохранению ресурса: работа плагина обёрнута в try/catch.

## Возможности

- очередь при создании, изменении, снятии с публикации и удалении
- ключ и файл `{key}.txt` в корне сайта
- batch по host, retry при временных ошибках
- история отправок
- ручная отправка URL
- фоновая обработка через Scheduler или вручную

## Требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 2.8+ или 3.x |
| PHP | 7.2+ |
| curl | рекомендуется |
| [Scheduler](/components/scheduler/) | для фона (без него очередь обрабатывают вручную) |

Интерфейс менеджера на ExtJS. Composer на сервере не нужен.

## Установка

В Package Manager нужен провайдер modstore.pro (URL сервиса `https://modstore.pro/extras/`), иначе установка падает с `Package provider not found`. Как подключить: [инструкция ModStore](https://modstore.pro/info/connection).

1. [Подключите репозиторий ModStore](https://modstore.pro/info/connection), если его ещё нет.
2. **Extras → Installer** → найдите **IndexNow** → **Download** → **Install**.
3. Откройте **Extras → IndexNow** и проверьте вкладку **Статус**.

Дальше: [Быстрый старт](quick-start).
