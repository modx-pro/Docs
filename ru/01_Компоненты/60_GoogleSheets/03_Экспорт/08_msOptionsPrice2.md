# msOptionsPrice2

Дополнительные опции товара

## Стандартные поля:

| Поле         | Название             |
| ------------ | -------------------- |
| name         | Название модификации |
| rid          | id ресурса           |
| type         | тип модификации      |
| price        | Цена                 |
| old_price    | Старая цена          |
| article      | Артикул              |
| weight       | Вес                  |
| count        | Количество           |
| image        | Картинка             |
| active       | Активная модификация |
| modification | Опции модификации    |

---

## Пример экспорта:

**Поля экспорта:** `rid,article,name,price,modification`

**Таблица:**

![](https://file.modx.pro/files/0/5/a/05a0e708fd2ff5baa6b40ba49b209362.jpg)

## Системные события

Класс **gsOptionsPrice2** генерирует следующие события:

```php
<?php
switch($modx->event->name) {
    // получение списка модификаций товара
    case 'gsOnBeforeGetOptionsPrice2':
        // $query - запрос выборки
        // $range - название листа таблицы, куда будут экспортироваться данные
        break;
    case 'gsOnGetOptionsPrice2':
        // $options - массив модификаций со всеми полями
        // $range - название листа
        break;
}
```

### Примеры

1.Выбираем все модификации определенного товара

```php
<?php
if($modx->event->name == 'gsOnBeforeGetOptionsPrice2') {
  $query->where(array('rid' => 3)); // 3  - id товара
}
```
