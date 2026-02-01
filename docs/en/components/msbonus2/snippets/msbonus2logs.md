# msBonus2Logs

Outputs bonus logs and user info: balance, level, accrual percent, etc.

The snippet runs only for an authenticated user in the current context.

## Parameters

| Name     | Default                 | Description              |
|----------|-------------------------|--------------------------|
| **user** | `$modx->user->get('id')`| User ID.                 |
| **limit**| `10`                    | Max number of log rows.  |
| **tpl**  | `tpl.msBonus2.logs`     | Chunk for output.        |

## Examples

### All logs on one page

```fenom
{'!msBonus2Logs' | snippet: [
  'limit' => 0,
]}
```

### Logs with pagination

```fenom
{'!pdoPage' | snippet: [
  'element' => 'msBonus2Logs',
]}

{'page.nav' | placeholder}
```
