# Производители (msVendor)

## Стандартные поля

| Поле        | Название |
| ----------- | -------- |
| id          | id       |
| name        | Название |
| resource    | Ресурс    |
| country     | Страна   |
| logo        | Логотип  |
| address     | Адрес    |
| phone       | Телефон  |
| fax         | Факс     |
| email       | Почта    |
| description | Описание |

## Пример экспорта

**Поля экспорта:** id,name,description,logo

**Результат:**

![Результат](https://file.modx.pro/files/5/b/9/5b9cd1ed172608f9521ba6898508d3cb.jpg)

## Системные события

Класс **gsVendor** генерирует следующие события:

```php
<?php
switch ($modx->event->name) {
  // получение списка производителей
  case 'gsOnBeforeGetVendors':
    // $query - запрос выборки
    // $range - название листа таблицы, куда будут экспортироваться данные
    break;
  case 'gsOnGetVendors':
    // $vendors - массив производителей со всеми полями
    // $range - название листа
    break;
}
```

### Примеры

1. Выбираем производителей, у которых есть логотип

    ```php
    <?php
    if ($modx->event->name == 'gsOnBeforeGetVendors') {
      $query->where(array('logo:!=' => ''));
    }
    ```

2. Добавляем страну по умолчанию, если у производителя она не указана

    ```php
    <?php
    if ($modx->event->name == 'gsOnGetVendors') {
      $modx->event->params['vendors'] = array_map(function ($vendor) {
        if (empty($vendor['country'])) {
          $vendor['country'] = 'Китай';
        }
        return $vendor;
      }, $vendors);
    }
    ```
