# FormIt integration

With FormIt installed, validation works in `TicketForm` and `TicketComments` via `&validate` and `&customValidators`. FormIt is not a package dependency.

## Rules

- Errors render in `<span class="error"></span>` next to the field or in `#field_name-error`
- FormIt rules: [FormIt docs](https://docs.modx.com/current/en/extras/formit)
- For comments, validate field `text`

Field markup:

::: code-group

```fenom
<label for="ticket-pagetitle">{$_modx->lexicon('ticket_pagetitle')}</label>
<input type="text" name="pagetitle" id="ticket-pagetitle" />
<span class="error"></span>
```

```modx
<label for="ticket-pagetitle">[[%ticket_pagetitle]]</label>
<input type="text" name="pagetitle" id="ticket-pagetitle" />
<span class="error"></span>
```

:::

## Custom validator

Snippet **mycensore**:

```php
<?php

$success = !preg_match_all('~(bad|words)~ui', $value, $match);
if (!$success) {
  $validator->addError($key, 'Forbidden words in text');
}
return (bool)$success;
```

### TicketForm

::: code-group

```fenom
{'!TicketForm' | snippet : [
  'customValidators' => 'mycensore',
  'validate' => 'pagetitle:required:minLength=^3^,content:minLength=^50^:mycensore',
  'content.vTextMinLength' => 'Content must be at least 50 characters',
  'tplFormCreate' => 'tpl.myTicket',
]}
```

```modx
[[!TicketForm?
  &customValidators=`mycensore`
  &validate=`pagetitle:required:minLength=^3^,content:minLength=^50^:mycensore`
  &content.vTextMinLength=`Content must be at least 50 characters`
  &tplFormCreate=`tpl.myTicket`
]]
```

:::

### TicketComments

::: code-group

```fenom
{'!TicketComments' | snippet : [
  'allowGuest' => 1,
  'autoPublishGuest' => 0,
  'customValidators' => 'mycensore',
  'validate' => 'text:minLength=^20^:mycensore',
  'text.vTextMinLength' => 'Comment must be at least 20 characters',
]}
```

```modx
[[!TicketComments?
  &allowGuest=`1`
  &autoPublishGuest=`0`
  &customValidators=`mycensore`
  &validate=`text:minLength=^20^:mycensore`
  &text.vTextMinLength=`Comment must be at least 20 characters`
]]
```

:::
