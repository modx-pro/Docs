# socDialogList

Snippet for outputting a list of messages.

## Parameters

| Name             | Default        | Description                                                                                                                                     |
|------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **&action**          | `inbox`             | Which list to show: **inbox** - incoming, **outbox** - outgoing.                          |
| **&inboxTpl**        | `soc.listRowInbox`  | Chunk for an incoming message row.                                                                                                                |
| **&outboxTpl**       | `soc.listRowOutbox` | Chunk for an outgoing message row.                                                                                                               |
| **&limit**           | `10`                | Maximum number of results.                                                                                                                       |
| **&offset**          | `0`                 | Number of results to skip.                                                                                                                      |
| **&outputSeparator** | `\n`                | Separator between rows.                                                                                                                         |
| **&sortby**          | `date_sent`         | Sort field (options: `subject`, `message`, `sender` - user id, `recipient` - user id, `date_sent`, `is_read`) |
| **&sortdir**         | `DESC`              | Sort direction: descending or ascending.                                                                                                         |
| **&totalVar**        | `total`             | Placeholder name for total result count.                                                                                                         |

### Examples

Example with pagination for incoming messages

> This example uses pdoPage; you can use getPage

```modx
[[!pdoPage?
  &element=`socDialogList`
  &action=`inbox`
]]

[[+page.nav]]
```

Example with pagination for outgoing messages is similar

> This example uses pdoPage; you can use getPage

```modx
[[!pdoPage?
  &element=`socDialogList`
  &action=`outbox`
]]

[[+page.nav]]
```
