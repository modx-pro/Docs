# getComments

Список комментариев из БД через pdoFetch для лент, виджетов и выборок по веткам.

**Вызывайте некэшированным.**

## Параметры

| Название | По умолчанию | Описание |
| --- | --- | --- |
| **&tpl** | `tpl.Tickets.comment.list.row` | Чанк одного комментария |
| **&tplCommentDeleted** | `tpl.Tickets.comment.one.deleted` | Удалённый комментарий |
| **&threads** | | ID веток через запятую, `-id` исключает |
| **&comments** | | ID комментариев через запятую, `-id` исключает |
| **&parents** | | ID родительских секций и тикетов для отбора веток |
| **&resources** | | ID тикетов для отбора веток |
| **&depth** | `10` | Глубина обхода при фильтре по `parents` |
| **&limit** | `10` | Лимит (pdoFetch) |
| **&offset** | `0` | Смещение |
| **&user** | | ID или логин авторов комментариев |
| **&sortby** | `createdon` | Поле сортировки |
| **&sortdir** | `DESC` | Направление сортировки |
| **&includeContent** | `0` | Выбирать поля `content` тикета и секции |
| **&fastMode** | `1` | Только значения из БД |
| **&showUnpublished** | `0` | Показывать неопубликованные комментарии |
| **&showDeleted** | `0` | Показывать удалённые комментарии |
| **&where** | | Дополнительные условия в JSON |
| **&outputSeparator** | перенос строки | Разделитель между строками |
| **&toPlaceholder** | | Имя плейсхолдера вместо вывода |
| **&tplWrapper** | | Обёртка с плейсхолдером `output` |
| **&wrapIfEmpty** | | Выводить `&tplWrapper`, даже если результат пустой |
| **&showLog** | `0` | Отладочный лог для сессии `mgr` |

<!--@include: ../parts/tip-general-properties.md-->

## Примеры

### Лента с пагинацией

::: code-group

```fenom
{'!pdoPage' | snippet : [
  'element' => 'getComments',
  'parents' => 5,
  'limit' => 10,
]}
{$_modx->getPlaceholder('page.nav')}
```

```modx
[[!pdoPage?
  &element=`getComments`
  &parents=`5`
  &limit=`10`
]]

[[!+page.nav]]
```

:::

### Последние комментарии раздела

::: code-group

```fenom
{'!getComments' | snippet : [
  'parents' => 5,
  'limit' => 5,
  'sortby' => 'createdon',
  'sortdir' => 'DESC',
]}
```

```modx
[[!getComments?
  &parents=`5`
  &limit=`5`
  &sortby=`createdon`
  &sortdir=`DESC`
]]
```

:::
