# Покупатели (msClient)

## Поля экспорта

Поддерживаются все стандартные поля пользователя, но с префиксом **user_**.
Например: user_email,user_fullname

## Пример экспорта

**Поля экспорта:** id,user_id,user_username,user_email

**Результат в таблице:**

![Результат в таблице](https://file.modx.pro/files/0/8/8/0882e77d3b6de64e7588f29f4ae95398.jpg)

## Системные события

Класс **gsUser** генерирует следующие события:

```php
<?php
switch ($modx->event->name) {
  // получение списка покупателей
  case 'gsOnBeforeGetClients':
    // $query - запрос выборки
    // $range - название листа таблицы, куда будут экспортироваться данные
    break;
  case 'gsOnGetClients':
    // $users - массив покупателей со всеми полями
    // $range - название листа
    break;
}
```
