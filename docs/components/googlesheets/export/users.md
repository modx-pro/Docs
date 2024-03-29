# Пользователи (modUser)

## Стандартные поля

| Поле             | Название                   |
| ---------------- | -------------------------- |
| id               | id пользователя            |
| username         | Имя пользователя           |
| fullname         | Полное имя                 |
| email            | Адрес электронной почты    |
| phone            | Номер телефона             |
| mobilephone      | Номер мобильного телефона  |
| fax              | Факс                       |
| address          | Адрес                      |
| city             | Город                      |
| state            | Регион / область           |
| zip              | Почтовый индекс            |
| country          | Страна                     |
| website          | Сайт                       |
| photo            | Фотография пользователя    |
| dob              | Дата рождения              |
| gender           | Пол                        |
| active           | Активный                   |
| blocked          | Заблокирован               |
| sudo             | Неограниченные права       |
| blockeduntil     | Заблокирован до            |
| blockedafter     | Заблокирован после         |
| logincount       | Количество входов          |
| lastlogin        | Последний вход             |
| failedlogincount | Ошибки входа               |
| createdon        | Дата создания пользователя |
| primary_group    | Группа пользователей       |

## Пример

**Поля экспорта:** id,username,email

**Результат в таблице:**

![Результат в таблице](https://file.modx.pro/files/2/9/a/29ac130b7161d6f5ed704038a0d63679.jpg)

## Системные события

Класс **gsUser** генерирует следующие события:

```php
<?php
switch ($modx->event->name) {
  // получение списка пользователей
  case 'gsOnBeforeGetUsers':
    // $query - запрос выборки
    // $range - название листа таблицы, куда будут экспортироваться данные
    break;
  case 'gsOnGetUsers':
    // $resources - массив ресурсов со всеми полями
    // $range - название листа
    break;
}
```

### Примеры

1. Выбираем пользователей, которые состоят в группе **Администраторы**

    ```php
    <?php
    if ($modx->event->name == 'gsOnBeforeGetUsers') {
      $query->where(array('primary_group' => 1));
    }
    ```

2. Меняем значение поля createdon (дата создания пользователя)

    ```php
    <?php
    if ($modx->event->name == 'gsOnGetUsers') {
      $modx->event->params['users'] = array_map(function($user){
        if (!empty($user['createdon'])) {
          $user['createdon'] = date("d-m-Y",$user['createdon']);
        }
        return $user;
      }, $users);
    }
    ```
