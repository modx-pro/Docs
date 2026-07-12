# getComments

Comment list from the database via pdoFetch. For feeds, widgets, and thread filters.

**Call uncached.**

## Parameters

| Name | Default | Description |
| --- | --- | --- |
| **&tpl** | `tpl.Tickets.comment.list.row` | Single comment chunk |
| **&tplCommentDeleted** | `tpl.Tickets.comment.one.deleted` | Deleted comment |
| **&threads** | | Thread IDs, comma-separated; `-id` excludes |
| **&parents** | | Parent section/ticket IDs to pick threads |
| **&resources** | | Ticket IDs to pick threads |
| **&depth** | `10` | Depth when filtering by `parents` |
| **&sortby** | `createdon` | Sort field |
| **&sortdir** | `DESC` | Sort direction |
| **&includeContent** | `0` | Ticket and section `content` fields |
| **&showUnpublished** | `0` | Unpublished comments |
| **&showDeleted** | `0` | Deleted comments |
| **&where** | | Extra JSON conditions |
| **&outputSeparator** | newline | Row separator |
| **&toPlaceholder** | | Placeholder instead of output |
| **&showLog** | `0` | Log for `mgr` |

<!--@include: ../parts/tip-general-properties.md-->

## Examples

### Feed with pagination

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

### Latest comments in a section

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
