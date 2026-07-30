# getTickets

Outputs a list of tickets.

**Call uncached.** Comment count in the chunk may link to `#first_unread`.

## Parameters

| Name | Default | Description |
| --- | --- | --- |
| **&depth** | `10` | Search depth from each parent |
| **&fastMode** | `0` | DB values only; strips unprocessed MODX tags |
| **&includeContent** | `0` | Include resource `content` |
| **&includeTVs** | | Comma-separated TV names |
| **&limit** | `10` | Result limit |
| **&offset** | `0` | Skip results from the start |
| **&outputSeparator** | | Separator between rows |
| **&parents** | | Parent IDs; `0` removes parent limit |
| **&resources** | | Resource IDs; prefix `-` to exclude |
| **&showDeleted** | `0` | Include deleted resources |
| **&showHidden** | `1` | Include resources hidden in menu |
| **&showLog** | `0` | Debug log for `mgr` session |
| **&showUnpublished** | `0` | Include unpublished resources |
| **&sortby** | `createdon` | Sort field |
| **&sortdir** | `DESC` | Sort direction |
| **&toPlaceholder** | | Store output in a placeholder |
| **&tpl** | `tpl.Tickets.list.row` | Row chunk |
| **&tplWrapper** | | Wrapper chunk with `output` placeholder |
| **&tvPrefix** | | TV placeholder prefix |
| **&user** | | Filter by author user ID |
| **&where** | | Extra JSON conditions |

<!--@include: ../parts/tip-general-properties.md-->

## Examples

### List with pagination

::: code-group

```fenom
{'!pdoPage' | snippet : ['element' => 'getTickets']}
{$_modx->getPlaceholder('page.nav')}
```

```modx
[[!pdoPage?
  &element=`getTickets`
]]

[[!+page.nav]]
```

:::

### Tickets in a section

::: code-group

```fenom
{'!getTickets' | snippet : [
  'parents' => $_modx->resource.id,
  'limit' => 10,
  'sortby' => 'createdon',
  'sortdir' => 'DESC',
]}
```

```modx
[[!getTickets?
  &parents=`[[*id]]`
  &limit=`10`
  &sortby=`createdon`
  &sortdir=`DESC`
]]
```

:::
