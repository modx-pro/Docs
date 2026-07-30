# subscribeAuthor

Выводит форму подписки на автора. Подписка доступна только для авторизованных пользователей.

## Параметры

| Название | По умолчанию | Описание |
| --- | --- | --- |
| **&createdby** | `0` | Обязательный ID автора (user) для подписки |
| **&tpl** | `tpl.Tickets.author.subscribe` | Чанк формы; допустимы `@INLINE` и `@FILE` |
| **&TicketsInit** | `0` | `1` — подключить frontend Tickets на произвольных страницах |

## Примеры

### В чанке списка тикетов

В `tpl.Tickets.list.row` у строки уже есть плейсхолдер `createdby`:

::: code-group

```fenom
{'!subscribeAuthor' | snippet : ['createdby' => $createdby]}
```

```modx
[[!subscribeAuthor? &createdby=`[[+createdby]]`]]
```

:::

### Карточка автора

На странице, где передан `author.id`, подключите скрипты Tickets:

::: code-group

```fenom
{'!subscribeAuthor' | snippet : [
  'createdby' => $author.id,
  'TicketsInit' => 1,
]}
```

```modx
[[!subscribeAuthor? &createdby=`[[+author.id]]` &TicketsInit=`1`]]
```

:::
