# Интеграция с FormIt

При наличии установленного компонента FormIt возможно использовать валидацию входных данных по тем же правилам.
*Компонент FormIt не находится в зависимостях компонента Tickets. При необходимости использования этого функционала Вы должны установить FormIt самостоятельно.*

## Правила использования

Валидация доступна для сниппетов TicketForm (создание/редактирование тикета), TicketComments (написание комментария).
Валидация будет использоваться при указании полей в параметре сниппета validate.
Возможно указание собственных валидаторов через параметр customValidators и собственных текстов для ошибки.
Все существующие правила валидации FormIt можно найти на официальной странице документации компонента.

Для вывода сообщения об ошибке в одном div-е с проверяемый полем должен находится элемент **<span class="error"></span>** для вывода ошибки

```php
    <div class="form-group">
        <label for="ticket-pagetitle">[[%ticket_pagetitle]]</label>
        <input type="text" class="form-control" placeholder="[[%ticket_pagetitle]]" name="pagetitle" value=""
               maxlength="50" id="ticket-pagetitle"/>
        <span class="error"></span>
    </div>
```

Либо элемент может находиться в произвольной месте HTML-разметки с уникальным id вида **имя_поля-error**

```php
    <span class="error" id="content-error"></span>
```

## Примеры использования

* Использование пользовательского валидатора для цензурирования

Создаётся сниппет с именем **mycensore**

```php
<?php
    $success = !preg_match_all('~(путин|трамп|розенбаум)~ui',$value,$match);
    if (!$success) {
        $validator->addError($key,'В тексте заявки обнаружены непотребные слова');
    }
    return (bool)$success;
```

Сниппет TicketForm вызывается с параметрами. В чанке tpl.myTicket для формы добавлены например собственные поля date, email, username, которые также валидируются стандартными правилами из FormIt.

```php
{'!TicketForm' | snippet: [
    'customValidators'=>'mycensore',
    'validate'=>'date:required:isDate=^%m/%d/%Y^,
        email:email:required,
        username:required:islowercase,
        pagetitle:required:contains=^Hello^,
        content:minLength=^50^:mycensore',
    'content.vTextMinLength' => 'Содержимое заявки должно быть не короче 50 знаков',
    'tplFormCreate'=>'tpl.myTicket'
]}
```

* Цензурирование пользовательских комментариев
  
```php
{'!TicketComments' | snippet: [
    'allowGuest' => 1,
    'autoPublishGuest' => 0,
    'customValidators'=>'mycensore',
    'validate'=>'text:minLength=^20^:mycensore',
    'text.vTextMinLength' => 'Комментарий должен быть не короче 20 знаков',
]}
```
