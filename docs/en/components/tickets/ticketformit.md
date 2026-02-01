# FormIt integration

When FormIt is installed, you can validate input using the same rules.
*FormIt is not a dependency of Tickets. Install FormIt separately if you need this.*

## Usage rules

Validation is available for the TicketForm (create/edit ticket) and TicketComments (write comment) snippets.
Validation runs when you specify fields in the snippet parameter **validate**.
You can add custom validators via **customValidators** and custom error messages.

FormIt validation rules are documented on the [FormIt documentation page](https://docs.modx.com/current/en/extras/formit).

To show an error next to a field, put `<span class="error"></span>` in the same block as the field:

```modx
<div class="form-group">
  <label for="ticket-pagetitle">[[%ticket_pagetitle]]</label>
  <input type="text" class="form-control" placeholder="[[%ticket_pagetitle]]" name="pagetitle" value=""
      maxlength="50" id="ticket-pagetitle"/>
  <span class="error"></span>
</div>
```

Or place the error element anywhere in the markup with a unique id **fieldname-error**:

```html
<span class="error" id="content-error"></span>
```

## Examples

- Custom validator for censoring

Create a snippet named **mycensore**:

```php
<?php

$success = !preg_match_all('~(word1|word2|word3)~ui', $value, $match);
if (!$success) {
  $validator->addError($key, 'The text contains disallowed words');
}
return (bool)$success;
```

Call TicketForm with parameters. In chunk tpl.myTicket you can add your own fields (e.g. date, email, username) and validate them with FormIt rules:

```fenom
{'!TicketForm' | snippet: [
  'customValidators' => 'mycensore',
  'validate' => 'date:required:isDate=^%m/%d/%Y^,
      email:email:required,
      username:required:islowercase,
      pagetitle:required:contains=^Hello^,
      content:minLength=^50^:mycensore',
  'content.vTextMinLength' => 'Content must be at least 50 characters',
  'tplFormCreate' => 'tpl.myTicket',
]}
```

- Censoring user comments

    ```fenom
    {'!TicketComments' | snippet: [
      'allowGuest' => 1,
      'autoPublishGuest' => 0,
      'customValidators' => 'mycensore',
      'validate' => 'text:minLength=^20^:mycensore',
      'text.vTextMinLength' => 'Comment must be at least 20 characters',
    ]}
    ```
