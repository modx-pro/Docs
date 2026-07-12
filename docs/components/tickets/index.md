---
title: Tickets
description: Компонент для создания и комментирования пользовательских страниц
logo: https://modstore.pro/assets/extras/tickets/logo-lg.jpg
author: bezumkin
modstore: https://modstore.pro/packages/users/tickets
repository: https://github.com/modx-pro/Tickets

items: [
  {
    text: 'Интерфейс',
    items: [
      { text: 'Создание раздела с Тикетами', link: 'interface/create-ticket-section' },
      { text: 'Создание тикета', link: 'interface/create-ticket' },
      { text: 'Настройка прав пользователей', link: 'interface/setup-permissions' },
    ],
  },
  { text: 'Системные настройки', link: 'settings' },
  {
    text: 'Сниппеты',
    items: [
      { text: 'getTickets', link: 'snippets/gettickets' },
      { text: 'getTicketsSections', link: 'snippets/getticketssections' },
      { text: 'getComments', link: 'snippets/getcomments' },
      { text: 'getStars', link: 'snippets/getstars' },
      { text: 'TicketComments', link: 'snippets/ticketcomments' },
      { text: 'TicketForm', link: 'snippets/ticketform' },
      { text: 'TicketLatest', link: 'snippets/ticketlatest' },
      { text: 'TicketMeta', link: 'snippets/ticketmeta' },
      { text: 'subscribeAuthor', link: 'snippets/subscribeauthor' },
    ],
  },
  { text: 'TicketFormit', link: 'ticketformit' },
]
---
# Tickets

Компонент для публикации пользовательских страниц (тикетов) и комментариев к ним. Актуальная версия пакета: **1.14.0**.

## Что умеет

- Разделы и тикеты в админке со своими формами, вкладками и счётчиками комментариев.
- Создание и редактирование тикетов с фронтенда с проверкой прав.
- Ajax-комментарии к тикетам и к любым ресурсам MODX.
- Несколько веток комментариев на одной странице (обёртка `.comments-thread`).
- Плоский список комментариев через `&tree=`0`` и пагинацию `limit`/`offset`.
- Права на публикацию в раздел (`section_add_children`) и на комментирование.
- Кэш тикетов, фильтрация Jevix при выводе, MarkItUp на фронтенде.
- Почтовые уведомления автору, ответившим и подписчикам; BCC администраторам.
- Загрузка файлов к тикетам и комментариям, редактирование описания изображений в mgr.
- Лента последних тикетов и комментариев (`TicketLatest`), избранное (`getStars`).

## Быстрый старт

1. Создайте [раздел с тикетами](interface/create-ticket-section).
2. Настройте [права пользователей](interface/setup-permissions) (`TicketUserPolicy`).
3. Проверьте [системные настройки](settings) namespace `tickets`.
4. Выведите на сайте `getTickets`, `TicketMeta`, `TicketComments` или `TicketForm`.

## Зависимости

- [pdoTools](/components/pdotools/) — выборки в сниппетах списков.
- [FormIt](/components/formit/) — опционально, для `&validate` в [TicketFormit](ticketformit).
