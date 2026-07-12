# Интеграция с FormIt

При установленном FormIt валидация работает в `TicketForm` и `TicketComments` через параметры `&validate` и `&customValidators`. FormIt в зависимости пакета нет.

## Правила

- Ошибки выводятся в `<span class="error"></span>` рядом с полем или в `#имя_поля-error`
- Правила FormIt: [документация FormIt](/components/formit/)
- Для комментариев валидируется поле `text`

Разметка поля:

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

## Пользовательский валидатор

Сниппет **mycensore**:

```php
<?php

$success = !preg_match_all('~(путин|трамп|розенбаум)~ui', $value, $match);
if (!$success) {
  $validator->addError($key, 'В тексте заявки обнаружены непотребные слова');
}
return (bool)$success;
```

### TicketForm

::: code-group

```fenom
{'!TicketForm' | snippet : [
  'customValidators' => 'mycensore',
  'validate' => 'pagetitle:required:minLength=^3^,content:minLength=^50^:mycensore',
  'content.vTextMinLength' => 'Содержимое заявки должно быть не короче 50 знаков',
  'tplFormCreate' => 'tpl.myTicket',
]}
```

```modx
[[!TicketForm?
  &customValidators=`mycensore`
  &validate=`pagetitle:required:minLength=^3^,content:minLength=^50^:mycensore`
  &content.vTextMinLength=`Содержимое заявки должно быть не короче 50 знаков`
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
  'text.vTextMinLength' => 'Комментарий должен быть не короче 20 знаков',
]}
```

```modx
[[!TicketComments?
  &allowGuest=`1`
  &autoPublishGuest=`0`
  &customValidators=`mycensore`
  &validate=`text:minLength=^20^:mycensore`
  &text.vTextMinLength=`Комментарий должен быть не короче 20 знаков`
]]
```

:::
