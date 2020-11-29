# Разработка

## Запуск экспорта/импорта с фронта

### Сниппет

```php
[[!GoogleSheetsFront?
    &mode = `export`
    &id = 5
]]
```

Ответ:

```json
Array(
    [status] => 1
    [message] => Все получилось!
    [total] => 26
    [error] => 0
    [time] => 0,923s
)
```

#### Параметры сниппета

| Поле | Описание                       | Возможные значения.                                |
| ---- | ------------------------------ | -------------------------------------------------- |
| id   | идентификатор экспорта/импорта |                                                    |
| mode | режим работы                   | export \|\| import \|\| migxExport \|\| migxImport |

### Javascript (jQuery)

```javascript
$.ajax({
    url: "/assets/components/googlesheets/action.php",
    type: "POST",
    data: {
        id: 5,
        mode: "export",
        auth_code: "значение системной настройки googlesheets_auth_code",
    },
    success: function (data, textStatus, jqXHR) {
        console.log(JSON.parse(data));
    },
    dataType: "text",
});
```

Ответ:

```json
{
message: "Все получилось!"
status: true
total: 26
error: 0
time: "0,998s"
}
```

## Получение данных с таблицы

### Сниппет

```php
[[!GoogleSheets?
    &table = `https://docs.google.com/spreadsheets/d/16AXIj1Dw0Cnx0neYHavZUuuDDmDMNkp8/edit#gid=0`
    &range = `Manhattan`
]]
```

#### Параметры сниппета:

| Имя    | Описание                                                                                | По умолчанию                         |
| ------ | --------------------------------------------------------------------------------------- | ------------------------------------ |
| table  | Ссылка гугл таблицы                                                                     |                                      |
| range  | Название листа гугл таблицы, также можно добавить диапазон ячеек для выборки (!A1:J10); |                                      |
| tpl    | Чанк для вывода результатов. Если не указан, то будет выведен массив результатов.       |                                      |
| fileds | Название переменных, через запятую.                                                     | Название ячеек первой строке таблицы |
| ignore | Cписок номеров строк, которые нужно пропустить. (начинаются с 1)                        |                                      |

Примеры можно посмотреть в разделе **Сниппеты** в соответсвующем сниппете.

### Javascript (jQuery)

```javascript
$.ajax({
    url: "/assets/components/googlesheets/action.php",
    type: "POST",
    data: {
        table:
            "https://docs.google.com/spreadsheets/d/16AXIj1Dw0Cnx0neYHavZUuuDDmDMNkp8/edit#gid=0",
        range: "Manhattan",
        auth_code: "значение системной настройки googlesheets_auth_code",
    },
    success: function (data, textStatus, jqXHR) {
        console.log(JSON.parse(data));
    },
    dataType: "text",
});
```
