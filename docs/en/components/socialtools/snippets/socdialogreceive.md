# socDialogReceive

Snippet outputs a message read form.

Checks for **msgID** and **action** in `$_REQUEST`. If missing or the message does not belong to the logged-in user, the snippet returns an error.

Example link to the read resource:

```modx
<a href='[[~1? &msgID=`[[+id]]` &action=`inbox`]]'>Message</a>
```

## Parameters

| Parameter            | Default              | Description                         |
|----------------------|----------------------|-------------------------------------|
| **&tplFormReadInbox**  | `soc.readFormInbox`  | Chunk for inbox messages            |
| **&tplFormReadOutbox** | `soc.readFormOutbox` | Chunk for outbox messages           |

### Examples

Simple form output:

```modx
[[!socDialogReceive]]
```
