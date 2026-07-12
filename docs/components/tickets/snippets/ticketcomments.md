# TicketComments

Выводит ветку комментариев и форму добавления. Работает с тикетами и с любым ресурсом MODX.

**Вызывайте некэшированным:** `[[!TicketComments]]`.

На странице можно разместить несколько веток: задайте разные `&thread=`. Каждая оборачивается в `<div class="comments-thread" id="...">`.

## Параметры

| Название | По умолчанию | Описание |
| --- | --- | --- |
| **&thread** | `resource-[[*id]]` | Имя ветки комментариев |
| **&threadUrl** | | Абсолютный URL страницы комментария; для ресурсов вне текущего документа |
| **&tree** | `1` | `1` — дерево ответов; `0` — плоский список с пагинацией `limit`/`offset` |
| **&depth** | `0` | Максимальная глубина вложенности (`0` — без ограничения при `tree=1`) |
| **&sortby** | `TicketComment.id` | Поле сортировки |
| **&sortdir** | `ASC` | `ASC` или `DESC` |
| **&limit** | `0` | Лимит комментариев; `0` — все |
| **&offset** | `0` | Смещение выборки |
| **&where** | | Доп. условия в JSON |
| **&fastMode** | `1` | Только значения из БД, без необработанных тегов MODX |
| **&outputSeparator** | перенос строки | Разделитель между комментариями |
| **&toPlaceholder** | | Имя плейсхолдера вместо вывода |
| **&separatePlaceholder** | `0` | `1` — форма в `{toPlaceholder}_form`, список в `{toPlaceholder}_thread` |
| **&formBefore** | `0` | Форма перед списком комментариев |
| **&showLog** | `0` | Лог pdoFetch для сессии `mgr` |
| **&showUnpublished** | `0` | Показывать неопубликованные комментарии |
| **&allowGuest** | `0` | Комментарии без авторизации |
| **&allowGuestEdit** | `1` | Гостям редактировать свои комментарии |
| **&allowGuestEmails** | `0` | Письма гостям об ответах |
| **&requiredFields** | `name,email` | Обязательные поля формы гостя |
| **&autoPublish** | `1` | Публиковать комментарии авторизованных без премодерации |
| **&autoPublishGuest** | `1` | То же для гостей |
| **&enableCaptcha** | `1` | Капча для гостей |
| **&minCaptcha** | `1` | Минимум в арифметической капче |
| **&maxCaptcha** | `10` | Максимум в арифметической капче |
| **&allowFiles** | `0` | Загрузка файлов в комментарий |
| **&source** | `0` | ID источника медиа; иначе `tickets_source_default` |
| **&gravatarIcon** | `mm` | Заглушка Gravatar |
| **&gravatarSize** | `24` | Размер аватара |
| **&gravatarUrl** | `https://www.gravatar.com/avatar/` | URL Gravatar |
| **&tplComments** | `tpl.Tickets.comment.wrapper` | Обёртка ветки; плейсхолдер `[[+total]]` — счётчик из `TicketThread` |
| **&tplCommentForm** | `tpl.Tickets.comment.form` | Форма для авторизованных |
| **&tplCommentFormGuest** | `tpl.Tickets.comment.form.guest` | Форма для гостей |
| **&tplCommentAuth** | `tpl.Tickets.comment.one.auth` | Один комментарий (авторизованный) |
| **&tplCommentGuest** | `tpl.Tickets.comment.one.guest` | Один комментарий (гость) |
| **&tplCommentDeleted** | `tpl.Tickets.comment.one.deleted` | Удалённый комментарий |
| **&tplLoginToComment** | `tpl.Tickets.comment.login` | Требование войти |
| **&tplCommentEmailOwner** | `tpl.Tickets.comment.email.owner` | Письмо автору тикета |
| **&tplCommentEmailReply** | `tpl.Tickets.comment.email.reply` | Письмо автору ответа |
| **&tplCommentEmailSubscription** | `tpl.Tickets.comment.email.subscription` | Письмо подписчику темы |
| **&tplCommentEmailBcc** | `tpl.Tickets.comment.email.bcc` | BCC администраторам |
| **&tplCommentEmailUnpublished** | `tpl.Tickets.comment.email.unpublished` | Письмо о неопубликованном комментарии |
| **&tplFiles** | `tpl.Tickets.comment.form.files` | Блок загрузчика файлов |
| **&tplFile** | `tpl.Tickets.form.file` | Строка файла |
| **&tplImage** | `tpl.Tickets.form.image` | Строка изображения |
| **&validate** | | Правила FormIt для поля `text`; см. [TicketFormit](/components/tickets/ticketformit) |
| **&customValidators** | | Сниппеты-валидаторы FormIt |

Счётчик комментариев в списках тикетов ведёт на `#first_unread` или `#comments` (с 1.14.0).

## Примеры

### Стандартный вызов

::: code-group

```fenom
{'!TicketComments' | snippet}
```

```modx
[[!TicketComments]]
```

:::

### Гости и премодерация

::: code-group

```fenom
{'!TicketComments' | snippet : [
  'allowGuest' => 1,
  'autoPublishGuest' => 0,
]}
```

```modx
[[!TicketComments? &allowGuest=`1` &autoPublishGuest=`0`]]
```

:::

### Плоский список

::: code-group

```fenom
{'!TicketComments' | snippet : [
  'tree' => 0,
  'limit' => 20,
  'offset' => 0,
]}
```

```modx
[[!TicketComments? &tree=`0` &limit=`20` &offset=`0`]]
```

:::

### Вторая ветка на странице

::: code-group

```fenom
{'!TicketComments' | snippet : [
  'thread' => 'sidebar-' ~ $_modx->resource.id,
]}
```

```modx
[[!TicketComments? &thread=`sidebar-[[*id]]`]]
```

:::
