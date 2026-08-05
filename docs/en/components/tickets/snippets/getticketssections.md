# getTicketsSections

Outputs a list of ticket sections.

**Call uncached.**

## Parameters

| Name | Default | Description |
| --- | --- | --- |
| **&depth** | `0` | Search depth from each parent |
| **&fastMode** | `0` | DB values only; strips unprocessed MODX tags |
| **&includeContent** | `0` | Include resource `content` |
| **&includeTVs** | | Comma-separated TV names |
| **&limit** | `10` | Result limit |
| **&offset** | `0` | Skip results from the start |
| **&outputSeparator** | | Separator between rows |
| **&parents** | | Parent IDs; `0` removes parent limit |
| **&resources** | | Resource IDs; prefix `-` to exclude |
| **&showDeleted** | `0` | Include deleted resources |
| **&showHidden** | `0` | Include resources hidden in menu |
| **&showLog** | `0` | Debug log for `mgr` session |
| **&showUnpublished** | `0` | Include unpublished resources |
| **&sortby** | `views` | Sort field |
| **&sortdir** | `DESC` | Sort direction |
| **&toPlaceholder** | | Store output in a placeholder |
| **&tpl** | `tpl.Tickets.sections.row` | Row chunk |
| **&tvPrefix** | | TV placeholder prefix |
| **&where** | | Extra JSON conditions |

<!--@include: ../parts/tip-general-properties.md-->

## Examples

### Simple call

::: code-group

```fenom
{'!getTicketsSections' | snippet}
```

```modx
[[!getTicketsSections?]]
```

:::

### Sort by views

::: code-group

```fenom
{'!getTicketsSections' | snippet : [
  'parents' => 0,
  'limit' => 20,
  'sortby' => 'views',
  'sortdir' => 'DESC',
]}
```

```modx
[[!getTicketsSections?
  &parents=`0`
  &limit=`20`
  &sortby=`views`
  &sortdir=`DESC`
]]
```

:::
