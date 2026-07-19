---
title: Быстрый старт
description: Минимальная выкладка Tickets на сайте
---

# Быстрый старт

Пакет не ставит готовый шаблон сайта. Ниже минимальная схема после [установки](index) и [прав](interface/setup-permissions).

## 1. Раздел и права

1. Создайте [раздел с тикетами](interface/create-ticket-section) в дереве ресурсов.
2. На секции включите политику **TicketSectionPolicy** (или дайте группе `section_add_children` на ресурс).
3. Пользователям фронтенда назначьте **TicketUserPolicy** в контексте `web`.

## 2. Шаблоны

| Шаблон | Назначение | Сниппеты |
| --- | --- | --- |
| Секция | список тикетов раздела | `getTickets` + `pdoPage` |
| Тикет | страница записи | `TicketMeta`, контент, `TicketComments` |
| Создание | форма с фронтенда | `TicketForm` |

Стили и скрипты подключает плагин Tickets из `tickets_frontend_css` и `tickets_frontend_js`. Подробнее: [Фронтенд](frontend).

## 3. Шаблон секции

::: code-group

```fenom
<h1>{$_modx->resource.pagetitle}</h1>

{'!pdoPage' | snippet : [
  'element' => 'getTickets',
  'parents' => $_modx->resource.id,
  'limit' => 10,
]}
{$_modx->getPlaceholder('page.nav')}
```

```modx
<h1>[[*pagetitle]]</h1>

[[!pdoPage?
  &element=`getTickets`
  &parents=`[[*id]]`
  &limit=`10`
]]

[[!+page.nav]]
```

:::

Чанк строки по умолчанию: `tpl.Tickets.list.row`. Список чанков: [Чанки](chunks).

## 4. Шаблон тикета

::: code-group

```fenom
{'!TicketMeta' | snippet}

{$_modx->resource.content}

{'!TicketComments' | snippet}
```

```modx
[[!TicketMeta]]

[[*content]]

[[!TicketComments]]
```

:::

`TicketMeta` выводит автора, просмотры, рейтинг и кнопки голоса/избранного. Контент тикета — поле `content` ресурса (после Jevix на выводе).

## 5. Страница создания тикета

Отдельный ресурс с формой:

::: code-group

```fenom
{'!TicketForm' | snippet}
```

```modx
[[!TicketForm]]
```

:::

Проверьте `tickets_default_template` и шаблон дочерних тикетов в настройках секции.

## 6. Проверка

- [Системные настройки](settings): почта, редактор, `tickets_source_default`
- Тестовый тикет из mgr и с фронтенда
- Комментарий и письмо (или очередь `tickets_mail_queue`)

Дальше: [FAQ](faq), [FormIt](ticketformit), [настройки секции](interface/create-ticket-section#nastrojki-razdela).
