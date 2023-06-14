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
  {
    text: 'Сниппеты',
    items: [
      { text: 'getTickets', link: 'snippets/gettickets' },
      { text: 'getTicketsSections', link: 'snippets/getticketssections' },
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

Компонент для создания и комментирования пользовательских страниц.

## Основные возможности

- Создание особых разделов для тикетов в админке, со своим интерфейсом.
- Создание тикетов в админке, тоже со своими панелями и табами.
- Создание страниц с фронтенда.
- Редактирование страниц с фронтенда, с проверкой прав.
- Чумовые ajax-комментарии.
- Редактирование\удаление комментариев с админки.
- Права доступа на добавление страниц в раздел и создание комментариев.
- Собственное кэширование тикетов.
- Принудительная фильтрация тикетов при выводе на экран Jevix.
- Автоматическая установка и настройка Jevix при инсталляции пакета. 2 набора параметров, раздельно для тикетов и комментариев.
- Удобный редактор [MarkItUp](https://markitup.jaysalvat.com/home/) для тикетов и комментариев.
- Почтовые уведомления о комментариях автору тикета, и тем, кому ответили на его комментарий.
- Вывод последних комментариев и тикетов, с разбивкой по разделам и возможностью кэширования.
- Все нужные чанки оформления, прописанные параметры у сниппетов, 2 языка — русский и английский.
