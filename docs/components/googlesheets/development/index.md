# Разработка

## Запуск экспорта/импорта с фронта

Сниппет:

```modx
[[!GoogleSheetsFront?
  &mode=`export`
  &id=`5`
]]
```

Ответ:

```php
Array (
  [status] => 1
  [message] => Все получилось!
  [total] => 26
  [error] => 0
  [time] => 0,923s
)
```

### Параметры сниппета

| Поле     | Описание                       | Возможные значения.                                  |
|----------|--------------------------------|------------------------------------------------------|
| **id**   | идентификатор экспорта/импорта |                                                      |
| **mode** | режим работы                   | `export \|\| import \|\| migxExport \|\| migxImport` |

### Javascript (jQuery)

```js
$.ajax({
  url: '/assets/components/googlesheets/action.php',
  type: 'POST',
  data: { id: 5, mode: 'export', auth_code: 'значение системной настройки googlesheets_auth_code' },
  success: function (data, textStatus, jqXHR) { console.log(JSON.parse(data)) },
  dataType: 'text',
});
```

Ответ:

```js
{
  message: "Все получилось!"
  status: true
  total: 26
  error: 0
  time: "0,998s"
}
```

## Получение данных с таблицы

### Сниппет GoogleSheets

```modx
[[!GoogleSheets?
  &table=`https://docs.google.com/spreadsheets/d/16AXIj1Dw0Cnx0neYHavZUuuDDmDMNkp8/edit#gid=0`
  &range=`Manhattan`
]]
```

#### Параметры сниппета GoogleSheets

| Имя    | Описание                                                                                | По умолчанию                         |
|--------|-----------------------------------------------------------------------------------------|--------------------------------------|
| table  | Ссылка гугл таблицы                                                                     |                                      |
| range  | Название листа гугл таблицы, также можно добавить диапазон ячеек для выборки (!A1:J10); |                                      |
| tpl    | Чанк для вывода результатов. Если не указан, то будет выведен массив результатов.       |                                      |
| fields | Название переменных, через запятую.                                                     | Название ячеек первой строке таблицы |
| ignore | Список номеров строк, которые нужно пропустить. (начинаются с 1)                        |                                      |

Примеры можно посмотреть в разделе **Сниппеты** в соответствующем сниппете.

## Javascript (jQuery)

```js
$.ajax({
  url: '/assets/components/googlesheets/action.php',
  type: 'POST',
  data: {
    table: 'https://docs.google.com/spreadsheets/d/16AXIj1Dw0Cnx0neYHavZUuuDDmDMNkp8/edit#gid=0',
    range: 'Manhattan',
    auth_code: 'значение системной настройки googlesheets_auth_code',
  },
  success: function (data, textStatus, jqXHR) { console.log(JSON.parse(data)) },
  dataType: 'text',
});
```
