# GoogleSheets

Используется для вывода данных

## Параметры сниппета:

| Имя    | Описание                                                                                | По умолчанию                         |
| ------ | --------------------------------------------------------------------------------------- | ------------------------------------ |
| table  | Ссылка гугл таблицы, с которой будут браться данные                                     |                                      |
| range  | Название листа гугл таблицы, также можно добавить диапазон ячеек для выборки (!A1:J10); |                                      |
| tpl    | Чанк для вывода результатов. Если не указан, то будет выведен массив результатов.       |
| fileds | Название переменных, через запятую.                                                     | Название ячеек первой строке таблицы |
| ignore | Cписок номеров строк, которые нужно пропустить. (начинаются с 1)                        |                                      |

## Примеры

1.Будет выбраны данные ячеек A1:J20 листа Manhattan из таблицы указной в параметре table. Выводит массив результатов.

```php
[[!GoogleSheets?
    &table = `https://docs.google.com/spreadsheets/d/16AXIj1Dw0Cnx0neYHavZUuuDDmDMNkp8/edit#gid=0`
    &range = `Manhattan!A1:J10`
]]
```

2.Будет выбраны все данные(кроме 1 строки), листа Manhattan из таблицы указной в параметре table.
Переменные **name** и **email** должны быть в первой строке таблицы.

```php
[[!GoogleSheets?
    &table = `https://docs.google.com/spreadsheets/d/16AXIj1Dw0Cnx0neYHavZUuuDDmDMNkp8/edit#gid=0`
    &range = `Manhattan`
    &ignore = `1`
    &tpl' = `@INLINE <li>{$name} - {$email}</li>`
]]
```

3.Присваиваем свои переменные для ячеек.
Первая ячейка будет соответствовать переменной **name**, вторая — **phone**.

```php
[[!GoogleSheets?
    &table = `https://docs.google.com/spreadsheets/d/16AXIj1Dw0Cnx0neYHavZUuuDDmDMNkp8/edit#gid=0`
    &range = `Manhattan`
    &ignore = `1`
    &fields = `name,phone`
    &tpl' = `@INLINE <li>{$name} - {$email}</li>`
]]
```

## Модификатор table

В компоненте присутствует модификатор fenom: table для преобразования массива в таблицу.

**Пример:**
Данные будет оформлены в таблицу с классами table tabe-hover.

```php
{'!GoogleSheets' | snippet: [
    'table' => 'https://docs.google.com/spreadsheets/d/16AXIj1Dw0Cnx0neYHavZUuuDDmDMNkp8/edit#gid=0',
    'range' = 'Manhattan!A1:J10'
] | table: 'table table-hover'}
```
