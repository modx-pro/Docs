# GoogleSheetsSaveForm

Сохраняет данные с формы в таблицу.

## Настройка

-   Добавляем хук **GoogleSheetsSaveForm**

Дополнительные параметры:

| Имя            | Описание                                        | По умолчанию                                 |
| -------------- | ----------------------------------------------- | -------------------------------------------- |
| **formFields** | Cписок полей, которые нужно сохранить           |                                              |
| **gsUri**      | URL таблицы.                                    | Сис. настройка: **googlesheets_form_table**  |
| **gsRange**    | Имя листа.                                      | Сис. настройка:: **googlesheets_form_range** |
| **gsFields**   | Список полей, которые находятся в гугл таблице. | Сис. настройка: **googlesheets_form_fields** |

## Примеры:

1.Будут сохранены поля **name, email, message** в таблицу, которая указанная в системной настройке **googlesheets_form_table** в лист, который указан в системной настройке **googlesheets_form_range**

```php
[[!AjaxForm?
    &hooks = `spam,email,GoogleSheetsSaveForm`
    &formFields = `name,email,message`
]]
```

2.Будут сохранены поля **name, email, message** в таблицу, которая указанная в системной настройке **googlesheets_form_table** в лист, который указан в параметре **gsRange**.

```php
[[!AjaxForm?
    &hooks = `spam,email,GoogleSheetsSaveForm`
    &formFields = `name,email,message`
    &gsRange = `DataForm`
]]
```

3.Будут сохранены поля **name, email, message** в таблицу, которая указанная в параметре **gsUri** в лист, который указан в параметре **gsRange**.

```php
[[!AjaxForm?
    &hooks = `spam,email,GoogleSheetsSaveForm`
    &formFields = `name,email,message`
    &gsUri = `https://docs.google.com/spreadsheets/d/16eyRFL94Dtqm30lBXVIpKGbw/edit#gid=0`
    &gsRange = `DataForm`
]]
```
