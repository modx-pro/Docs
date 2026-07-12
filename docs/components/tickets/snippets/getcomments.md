# getComments

Список комментариев из БД через pdoFetch. Для лент, виджетов и выборок по веткам.

**Вызывайте некэшированным.**

## Параметры

| Название | По умолчанию | Описание |
| --- | --- | --- |
| **&tpl** | `tpl.Tickets.comment.list.row` | Чанк одного комментария |
| **&tplCommentDeleted** | `tpl.Tickets.comment.one.deleted` | Удалённый комментарий |
| **&threads** | | ID веток через запятую; `-id` исключает |
| **&parents** | | ID родительских секций/тикетов для отбора веток |
| **&resources** | | ID тикетов для отбора веток |
| **&depth** | `10` | Глубина обхода при фильтре по `parents` |
| **&sortby** | `createdon` | Сортировка |
| **&sortdir** | `DESC` | Направление |
| **&includeContent** | `0` | Поля `content` тикета и секции |
| **&showUnpublished** | `0` | Неопубликованные комментарии |
| **&showDeleted** | `0` | Удалённые комментарии |
| **&where** | | Доп. условия JSON |
| **&outputSeparator** | перенос строки | Разделитель строк |
| **&toPlaceholder** | | Плейсхолдер вместо вывода |
| **&showLog** | `0` | Лог для `mgr` |

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
