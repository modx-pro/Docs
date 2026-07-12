# TicketForm

Форма создания и редактирования тикета на фронтенде. Только для авторизованных пользователей.

**Вызывайте некэшированным:** `[[!TicketForm]]`.

Редактирование: параметр `&tid=` или `?tid=` в URL. Удаление и восстановление обрабатывает `Tickets::deleteTicket()` с редиректами `&redirectDeleted` / `&redirectUnDeleted`.

## Параметры

| Название | По умолчанию | Описание |
| --- | --- | --- |
| **&allowedFields** | `parent,pagetitle,content` | Поля, которые пользователь может менять; можно указать TV |
| **&requiredFields** | `parent,pagetitle,content` | Обязательные поля |
| **&bypassFields** | | Поля без санитизации при сохранении |
| **&parents** | | ID родителей секций через запятую; `-id` исключает |
| **&resources** | | ID секций через запятую; `-id` исключает |
| **&context** | | Контексты поиска секций |
| **&sortby** | `pagetitle` | Сортировка списка секций |
| **&sortdir** | `ASC` | Направление сортировки секций |
| **&tid** | | ID тикета для режима редактирования |
| **&redirectUnpublished** | `0` | ID ресурса после сохранения неопубликованного тикета |
| **&redirectDeleted** | `0` | Редирект после удаления |
| **&redirectUnDeleted** | `0` | Редирект после восстановления |
| **&allowDelete** | | Разрешить кнопку удаления в форме обновления |
| **&allowFiles** | `1` | Загрузка файлов к тикету |
| **&source** | `0` | Источник медиа; иначе `tickets_source_default` |
| **&tplFormCreate** | `tpl.Tickets.form.create` | Чанк создания |
| **&tplFormUpdate** | `tpl.Tickets.form.update` | Чанк редактирования |
| **&tplPreview** | `tpl.Tickets.form.preview` | Предпросмотр |
| **&tplSectionRow** | `@INLINE <option...>` | Строка `<option>` в списке секций |
| **&tplTicketEmailBcc** | `tpl.Tickets.ticket.email.bcc` | BCC о новом тикете |
| **&tplTicketEmailSubscription** | `tpl.Tickets.ticket.email.subscription` | Письмо подписчику секции |
| **&tplFiles** | `tpl.Tickets.form.files` | Блок файлов |
| **&tplFile** | `tpl.Tickets.form.file` | Строка файла |
| **&tplImage** | `tpl.Tickets.form.image` | Строка изображения |
| **&validate** | | Правила FormIt; см. [TicketFormit](/components/tickets/ticketformit) |

Список секций в форме фильтруется политикой `section_add_children` на ресурсе. Параметра для смены этой проверки в сниппете нет.

## Примеры

### Создание тикета

::: code-group

```fenom
{'!TicketForm' | snippet}
```

```modx
[[!TicketForm]]
```

:::

### Редактирование по ID

::: code-group

```fenom
{'!TicketForm' | snippet : ['tid' => 15]}
```

```modx
[[!TicketForm? &tid=`15`]]
```

:::
